import React from 'react';
import {Nav, Navbar} from "react-bootstrap";
import {NavLink} from 'react-router-dom';

const NavBarNoAuth: React.FC = () => {
    return (
        <Navbar bg="info" variant='dark' expand='md'>
            <Navbar.Brand href="#home">PTM</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
                <Nav>
                    <Nav.Link as={NavLink} to='/signin' exact>Sign In</Nav.Link>
                    <Nav.Link as={NavLink} to='/signup'>Sign Up</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBarNoAuth;