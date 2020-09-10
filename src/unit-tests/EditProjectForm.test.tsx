import React, {useRef} from 'react';

import {configure, shallow, ShallowWrapper} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Button, Card, Form} from "react-bootstrap";
import EditProjectForm from "../components/EditProjectForm/EditProjectForm";

configure({adapter: new Adapter()});

jest.mock('react', () => {
    const originReact = jest.requireActual('react');
    const mUseRef = jest.fn();
    return {
        ...originReact,
        useRef: mUseRef,
    };
});

describe('<EditProjectForm/>', () => {
    let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    const project = {title: 'test_title', description: 'test_description'};

    beforeEach(() => {
        // @ts-ignore
        wrapper = shallow(<EditProjectForm project={project}/>);
    });

    it('should render <Form />', () => {
        expect(wrapper.find(Form)).toHaveLength(1);
    });

    it('should render 2 Form group as error not present', () => {
        expect(wrapper.find(Form.Group)).toHaveLength(2);
    });

    it('should render 3 Form group as error present', () => {
        wrapper.setProps({error: "Sample error"});
        expect(wrapper.find(Form.Group)).toHaveLength(3);
    });

    it('should render <Form.Label>Title</Form.Label>', () => {
        expect(wrapper.contains(<Form.Label>Title</Form.Label>)).toEqual(true);
    });

    it('should render <Form.Control type="text" placeholder="Enter project\'s title" required/>', () => {
        expect(wrapper.contains(
            <Form.Control
                type="text"
                placeholder="Enter projects's title"
                defaultValue="test_title"
            />
        )).toEqual(true);
    });

    it('should render  <Form.Label>Description</Form.Label>', () => {
        expect(wrapper.contains(<Form.Label>Description</Form.Label>))
            .toEqual(true);
    });

    it('should render  <Form.Control type="text" placeholder="Enter projects\'s description"/>', () => {
        expect(wrapper.contains(
            <Form.Control
                type="text"
                placeholder="Enter project's description"
                defaultValue="test_description"/>
        )).toEqual(true);
    });

    it('should render <Card.Body>error</Card.Body>) as error present', () => {
        wrapper.setProps({error: 'Error'});
        expect(wrapper.contains(
            <Card border='danger' text='danger'>
                <Card.Body>Error</Card.Body>
            </Card>
        )).toEqual(true);
    });

    it('should render edit project button', () => {
        expect(wrapper.contains(
            <Button variant="outline-info" type="submit" size='sm'>
                Save changes
            </Button>
        )).toEqual(true);
    });

    it('should call edit project handler', () => {
        const titleInputRef = {current: {value: "test_title"}};
        const descriptionInputRef = {current: {value: "test_description"}};
        // @ts-ignore
        useRef.mockReturnValueOnce(titleInputRef).mockReturnValueOnce(descriptionInputRef);
        const onSubmitMock = jest.fn();
        wrapper.setProps({onSubmit: onSubmitMock});

        wrapper.find(Form).simulate('submit', {
            preventDefault() {
            }
        });

        expect(onSubmitMock)
            .toHaveBeenCalledWith({"description": "test_description", "title": "test_title"});
    });
});