import React from 'react';

import {configure, shallow, ShallowWrapper} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavBarNoAuth from "../components/NavBarNoAuth";
import {Nav, Navbar} from 'react-bootstrap';
import {NavLink} from "react-router-dom";

configure({adapter: new Adapter()});

describe('<NavBarNoAuth/>', () => {
    let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
    const onSignOutMock = jest.fn();
    beforeEach(() => {
        wrapper = shallow(<NavBarNoAuth />);
    });

    it('should render <Navbar/>', () => {
        expect(wrapper.find(Navbar)).toHaveLength(1);
    });

    it('should render <Navbar.Brand>', () => {
        expect(wrapper.contains(<Navbar.Brand href="#home">PTM</Navbar.Brand>)).toBe(true);
    });

    it('should render <Navbar.Toggle>', () => {
        expect(wrapper.contains(<Navbar.Toggle aria-controls="basic-navbar-nav"/>)).toBe(true);
    });

    it('should render <Navbar.Collapse>', () => {
        expect(wrapper.find(Navbar.Collapse)).toHaveLength(1);
    });

    it('should render link to sign in', () => {
        expect(wrapper.contains(<Nav.Link as={NavLink} to='/signin' exact>Sign In</Nav.Link>)).toBe(true);
    });

    it('should render link to sign out', () => {
        expect(wrapper.contains(<Nav.Link as={NavLink} to='/signup'>Sign Up</Nav.Link>)).toBe(true);
    });

});