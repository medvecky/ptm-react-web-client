import React from 'react';

import {configure, shallow, ShallowWrapper} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavBar from "../components/NavBar";
import {Button, Nav, Navbar} from 'react-bootstrap';
import {NavLink} from "react-router-dom";

configure({adapter: new Adapter()});

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));

describe('<NavBar/>', () => {
    let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
    const onSignOutMock = jest.fn();
    beforeEach(() => {
        wrapper = shallow(<NavBar onSignOut={onSignOutMock}/>);
    });

    it('should render <Navbar/>', () => {
        expect(wrapper.find(Navbar)).toHaveLength(1);
    });

    it('should render <NavbarBrand/>', () => {
        expect(wrapper.contains(<Navbar.Brand href="#home">PTM</Navbar.Brand>)).toBe(true);
    });

    it('should render <NavbarBrand/>', () => {
        expect(wrapper.contains(<Navbar.Brand href="#home">PTM</Navbar.Brand>)).toBe(true);
    });

    it('should render <NavbarToggle/>', () => {
        expect(wrapper.find(Navbar.Toggle)).toHaveLength(1);
    });

    it('should render <NavbarCollapse/>', () => {
        expect(wrapper.find(Navbar.Collapse)).toHaveLength(1);
    });

    it('should render <Nav.Link> to new-task', () => {
        expect(wrapper.contains(<Nav.Link as={NavLink} to='/new-task'>New Task</Nav.Link>)).toBe(true);
    });

    it('should render <Nav.Link> to new-project', () => {
        expect(wrapper.contains(<Nav.Link as={NavLink} to='/new-project'>New Project</Nav.Link>)).toBe(true);
    });

    it('should render <Button> Sign Out', () => {
        expect(wrapper.find(Button).text()).toEqual('Sign Out')
    });

    it('click to sign out button leads to sign out procedure', ()=>{
        wrapper.find(Button).simulate('click');
        expect(onSignOutMock).toHaveBeenCalled();
        expect(mockHistoryPush).toHaveBeenCalledWith('/');
    });

});