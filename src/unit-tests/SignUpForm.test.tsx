import React from 'react';

import {configure, shallow, ShallowWrapper} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SignUpForm from "../components/SignUpForm/SignUpForm";
import {Form, Button, Card} from 'react-bootstrap';

configure({adapter: new Adapter()});


describe('<SignUpForm />', () => {

    let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    beforeEach(() => {
        // @ts-ignore
        wrapper = shallow(<SignUpForm/>);
    });

    it('should render <Form />', () => {
        expect(wrapper.find(Form)).toHaveLength(1);
    });

    it('should render 2 Form group as error not present', () => {
        expect(wrapper.find(Form.Group)).toHaveLength(3);
    });

    it('should render 3 Form group as error present', () => {
        wrapper.setProps({error: "Sample error"});
        expect(wrapper.find(Form.Group)).toHaveLength(4);
    });

    it('should render  <Form.Label>Email</Form.Label>', () => {
        expect(wrapper.contains(<Form.Label>Email</Form.Label>)).toEqual(true);
    });

    it('should render <Form.Control type="email" placeholder="Enter email" required/>', () => {
        expect(wrapper.contains(<Form.Control type='email' placeholder='Enter email' required/>)).toEqual(true);
    });

    it('should render <Form.Label>Password</Form.Label>', () => {
        expect(wrapper.contains(<Form.Label>Password</Form.Label>)).toEqual(true);
    });

    it('should render <Form.Control type="password" placeholder="password" required/>', () => {
        expect(wrapper.contains(<Form.Control type="password" placeholder="password" required/>)).toEqual(true);
    });

    it('should render <Form.Label>Confirm password</Form.Label>', () => {
        expect(wrapper.contains(<Form.Label>Confirm password</Form.Label>)).toEqual(true);
    });

    it('should render <Form.Control type="password" placeholder="confirm password" required/>', () => {
        expect(wrapper.contains(<Form.Control type="password" placeholder="confirm password" required/>))
            .toEqual(true);
    });

    it('should render <Card.Body>error</Card.Body>) as error present', () => {
        wrapper.setProps({error: 'Error'});
        expect(wrapper.contains(
            <Card border='danger' text='danger'>
                <Card.Body>Error</Card.Body>
            </Card>
        )).toEqual(true);
    });

    it('should render sign in button', () => {
        expect(wrapper.contains(
            <Button variant="outline-info" type="submit" size='sm'>
                Sign Up
            </Button>
        )).toEqual(true);
    });
});