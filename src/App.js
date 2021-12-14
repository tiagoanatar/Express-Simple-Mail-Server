import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Search } from './components/search'

function App() {
  return (
    <>
    <Container>
      <Row>
        <Col>
          <Search />
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default App;
