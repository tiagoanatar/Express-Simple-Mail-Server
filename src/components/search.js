import { useState, useEffect } from 'react'
import { dataFinal } from '../data/data'
import { Form, Table, Navbar, Nav, Modal, Button, Container, Row, Col } from 'react-bootstrap'
import Pagination from 'react-bootstrap/Pagination'
// components
import { PartItem } from '../components/partItem'
import { QuoteForm } from '../components/quoteForm'

function AboutModal(props) {
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          About
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Why Choose Wolters Motors & Drives as your Electric Motor Distributor?</h5>
        <p>
        For over 55 years, Wolters Motors and Drives has provided a one-stop solution for electric pump 
        motors, variable speed drives, bearings, gearboxes, power transmission components, inverter 
        duty motors, farm duty motors, and accessories.

        We can assure that you get the right motor package for your particular application. 
        Our sales engineers have over 60 years of combined experience in meeting the requirements 
        of our industrial customers, motor shops, OEMs, and government buyers. We offer motors and 
        controls for all industrial and process applications. Our strong relationship and sales volumes 
        with our top tier suppliers allow us to provide you great pricing along with the high level of 
        customer service customers have come to rely on.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export const Search = ()=> {

  // data source first load
  const [data, setData] = useState(dataFinal)

  // form search control
  const [search, setSearch] = useState(undefined)

  const [aboutmodalShow, aboutsetModalShow] = useState(false)

  const [parts, setParts] = useState([])

  // pagination
  const pageMultiplier = 200

  const [pages, setPages] = useState({prev: 0, next: pageMultiplier})

  function changePage(index){
    setPages({prev: index-pageMultiplier, next: index})
  }

  useEffect(() => {
    setPages({prev: 0, next: pageMultiplier})
  },[])

  return (
    <>
      <Container>

        <AboutModal
          show={aboutmodalShow}
          onHide={() => aboutsetModalShow(false)}
        />

        <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark' style={{marginBottom:'15px'}}>
          <Container>
          <Navbar.Brand href='#home'>Wolters</Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav>
              <Nav.Link href='#pricing' onClick={() => aboutsetModalShow(true)}>About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          </Container>
        </Navbar>

        <Form.Control 
          type='text' 
          placeholder='Search for description or catalog number' 
          value={search} onChange={(e) => setSearch(e.target.value)} 
          className='search-input'
        />
      
        <Row>
          <Col sm={9}>

            <Table striped bordered hover style={{tableLayout: 'fixed'}}>
              <thead>
                <tr>
                  <th width='15%'>Manufacturer</th>
                  <th width='22%'>Catalog Number</th>
                  <th>Description</th>
                  <th width='20%'>Select Part</th>
                </tr>
              </thead>
              <tbody>

                {/* search filter result */}
                {data.length > 0 && search !== undefined ? data.filter((item, index) => {
                    if (item['Description']
                          .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
                          .toLowerCase()
                          .includes(search.split(' ')
                          .join('')
                          .toLowerCase()) 
                          || item['Catalog or Item Number']
                          .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
                          .toLowerCase()
                          .includes(search.split(' ').join('').toLowerCase())) {
                      return true
                    }
                  }).slice(pages.prev,pages.next).map((item, index) => <PartItem key={index} item={item} parts={parts} setParts={setParts} />)
               : null}

                {data.length > 0 && search === undefined ? data.slice(pages.prev,pages.next).map((item, index) => <PartItem key={item["Catalog or Item Number"]} item={item} parts={parts} setParts={setParts} />) : null}

              </tbody>
            </Table>


          </Col>
          <Col sm={3}>

            <QuoteForm parts={parts} setParts={setParts} />
            
          </Col>
        </Row>
        
          <Pagination>

            {search === undefined || search === '' ? data.map((item, index) => {
              if(index % pageMultiplier === 0 && index < 5000){
                return (<Pagination.Item key={index} onClick={() => changePage(index)}>{index/pageMultiplier}</Pagination.Item>)
              }
            }) : null}

          </Pagination>

        </Container>
      </>
      );
    }

// style

const resultsForm = {
  backgroundColor: '#f1f1f1', 
  padding: '12px', 
  borderRadius: '5px', 
  marginTop:'10px', 
  marginBottom: '10px'
}