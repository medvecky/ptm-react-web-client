import React, {useRef} from 'react';

import {configure, shallow, ShallowWrapper} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Button, Card, Form} from "react-bootstrap";
import EditTaskForm from "../components/EditTaskForm/EditTaskForm";

configure({adapter: new Adapter()});

jest.mock('react', () => {
    const originReact = jest.requireActual('react');
    const mUseRef = jest.fn();
    return {
        ...originReact,
        useRef: mUseRef,
    };
});

describe('<EditTaskForm />', () => {
    let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    beforeEach(() => {
        // @ts-ignore
        wrapper = shallow(
            <EditTaskForm
                // @ts-ignore
                task={{title: 'test_title', description: 'test_description', status: 'test_status', projectId: 'xxx'}}
                projects={[]}
            />);
    });

    it('should render <Form />', () => {
        expect(wrapper.find(Form)).toHaveLength(1);
    });

    it('should render 4 Form group as error not present', () => {
        expect(wrapper.find(Form.Group)).toHaveLength(4);
    });

    it('should render 5 Form group as error present', () => {
        wrapper.setProps({error: "Sample error"});
        expect(wrapper.find(Form.Group)).toHaveLength(5);
    });

    it('should render <Form.Label>Title</Form.Label>', () => {
        expect(wrapper.contains(<Form.Label>Title</Form.Label>)).toEqual(true);
    });

    it('should render <Form.Control type="text" placeholder="Enter task\'s title" required />', () => {
        expect(wrapper.contains(
            <Form.Control
                type="text"
                placeholder="Enter task's title"
                defaultValue="test_title"/>
        )).toEqual(true);
    });

    it('should render  <Form.Label>Description</Form.Label>', () => {
        expect(wrapper.contains(<Form.Label>Description</Form.Label>))
            .toEqual(true);
    });

    it('should render  <Form.Control type="text" placeholder="Enter task\'s description" required />', () => {
        expect(wrapper.contains(
            <Form.Control
                type="text"
                placeholder="Enter task's description"
                defaultValue="test_description"/>
        )).toEqual(true);
    });


    it('should render task status', () => {
        expect(wrapper.contains(
            <Form.Group controlId="formStatus">
                <Form.Label>test_status</Form.Label>
            </Form.Group>
        )).toEqual(true);
    });

    it('should render empty project name as task without project', () => {
        expect(wrapper.contains(
            <Form.Group controlId="formProject">
                <Form.Label>{''}</Form.Label>
            </Form.Group>
        )).toEqual(true);
    });

    it('should render project name', () => {
        wrapper.setProps({projects: [{title: 'test_project', id: 'xxx'}]});
        expect(wrapper.contains(
            <Form.Group controlId="formProject">
                <Form.Label>test_project</Form.Label>
            </Form.Group>
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

    it('should render save changes button', () => {
        expect(wrapper.contains(
            <Button variant="outline-info" type="submit" size='sm'>
                Save changes
            </Button>
        )).toEqual(true);
    });

    it('should call edit task handler', () => {
        const titleInputRef = {current: {value: "test_title"}};
        const descriptionInputRef = {current: {value: "test_description"}};
        // @ts-ignore
        useRef.mockReturnValueOnce(titleInputRef)
            .mockReturnValueOnce(descriptionInputRef);
        const onSubmitMock = jest.fn();
        wrapper.setProps({onSubmit: onSubmitMock});

        wrapper.find(Form).simulate('submit', {
            preventDefault() {
            }
        });

        expect(onSubmitMock)
            .toHaveBeenCalledWith(
                {
                    "description": "test_description",
                    "title": "test_title",
                    "id": undefined,
                    "projectId": "xxx",
                    "status": "test_status",
                });
    });
});