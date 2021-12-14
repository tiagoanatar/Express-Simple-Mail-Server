import { useState } from 'react'
import { Form, Button, ListGroup } from 'react-bootstrap'

export const QuoteForm = ({ parts, setParts }) => {

  const [data, setData] = useState({name: '', email: '', company: '', message: '', parts: []})
  const [status, setStatus] = useState('Submit')

  const onSubmit = async (e) => {

    e.preventDefault()
    setStatus('Sending')

    if (!data.name) {
      alert('Please add a name')
      return
    } else if (!data.name.trim().match(/^[a-zA-Z]+$/)) {
      alert('Only letters')
    }

    if (!data.email) {
      alert('Please add a email')
      return
    } else if (data.email){
        let lastAtPos = data.email.lastIndexOf("@")
        let lastDotPos = data.email.lastIndexOf(".")
        if (
          !(
            lastAtPos < lastDotPos &&
            lastAtPos > 0 &&
            data.email.indexOf("@@") === -1 &&
            lastDotPos > 2 &&
            data.email.length - lastDotPos > 2
          )
        ) {
          alert('Email is not valid')
        }
    }

    if (!data.company) {
      alert('Please add a company')
      return
    }

    if (!data.message) {
      alert('Please add a message')
      return
    }

    if (!data.parts) {
      alert('Please select the parts')
      return
    } else {
      setData({...data, company: e.target.value})
    }

    //
    let response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
      "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    })

    let result = await response.json();
    alert(result.status);
    setData({name: '', email: '', company: '', message: '', parts: []})
}

  return (
    <Form onSubmit={onSubmit}>
      <h5>Request a Quote</h5>
      <Form.Group className='mb-3' controlId='nameForm'>
        <Form.Control type='text' placeholder='Name' value={data.name} onChange={(e) => setData({...data, name: e.target.value})} />
      </Form.Group>
      <Form.Group className='mb-3' controlId='emailForm'>
        <Form.Control type='email' placeholder='Email' value={data.email} onChange={(e) => setData({...data, email: e.target.value})} />
      </Form.Group>
      <Form.Group className='mb-3' controlId='companyForm'>
        <Form.Control type='text' placeholder='Company Name' value={data.company} onChange={(e) => setData({...data, company: e.target.value})} />
      </Form.Group>
      <Form.Group className='mb-3' controlId='messageForm'>
        <Form.Control as='textarea' placeholder='Message' rows={3} value={data.message} onChange={(e) => setData({...data, message: e.target.value})} />
      </Form.Group>
      <Form.Group controlId="formFile" className="pictureForm">
        <Form.Control type="file" accept="image/png, image/jpeg" />
      </Form.Group>
      <Form.Label column>Selected Parts</Form.Label>
      <ListGroup>
        {parts.map((item) => {
          return (<ListGroup.Item key={item+'a'}>
            {item} <button onClick={() => {
              const removedItem = parts.filter((subItem) => item !== subItem)
              setParts(removedItem)
            }
            }><strong style={{color: 'red', cursor: 'pointer'}}>X</strong></button>
          </ListGroup.Item>)
        })}
      </ListGroup>
      <Button variant='primary' type='submit' style={{marginTop:'15px'}}>
        Request Your Quote
      </Button>
    </Form>
  )
}