import React from 'react';
import {Button, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {NavLink, useHistory} from 'react-router-dom';

interface  NavBarProps {
    onSignOut: () => void
}

const NavBar: React.FC<NavBarProps> = (props) => {
    const history = useHistory();

    const signOutHandler = () => {
        props.onSignOut();
        history.push('/');
    };

    return (
        <Navbar bg="info" variant='dark' expand='md'>
            <Navbar.Brand href="#home">PTM</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link
                        as={NavLink}
                        to='/'
                        exact
                    >
                        Home
                    </Nav.Link>
                    <Nav.Link as={NavLink} to='/new-task'>New Task</Nav.Link>
                    <Nav.Link as={NavLink} to='/new-project'>New Project</Nav.Link>
                </Nav>
                <Nav>
                    <Button
                        variant="outline-light"
                        type="submit" size='sm'
                        onClick={signOutHandler}
                    >
                       Sign Out
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;