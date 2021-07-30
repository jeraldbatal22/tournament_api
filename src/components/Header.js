import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useHistory } from 'react-router-dom'

const Header = () => {
  const history = useHistory()
  const getRoute = () => {
    history.push('/')
  }
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="">TournaMatch</Navbar.Brand>
        <Nav className="me-auto" >
          <Nav.Link href="" onClick={getRoute}>Home</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Header
