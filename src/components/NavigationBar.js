import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function NavigationBar() {
    return (
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Spongebob Frames</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
        </Nav>
    </Navbar>
    );
}

export default NavigationBar;