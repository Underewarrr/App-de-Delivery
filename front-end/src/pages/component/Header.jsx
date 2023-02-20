import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img
            id="H_logo"
            // src={ logo }
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="login">Login</Nav.Link>
          <Nav.Link href="register">Register</Nav.Link>
          <Nav.Link href="balance">Carteira</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
