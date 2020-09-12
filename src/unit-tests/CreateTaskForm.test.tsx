import React, {useRef} from 'react';

import {configure, shallow, ShallowWrapper} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Button, Card, Form} from "react-bootstrap";
import CreateTaskForm from "../components/CreateTaskForm/CreateTaskForm";

configure({adapter: new Adapter()});

jest.mock('react', () => {
    const originReact = jest.requireActual('react');
    const mUseRef = jest.fn();
    return {
        ...originReact,
        useRef: mUseRef,
    };
});

describe('<CreateTaskForm />', () => {
    let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    beforeEach(() => {
        // @ts-ignore
        wrapper = shallow(<CreateTaskForm projects={[]}/>);
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

    it('should render <Form.Label>Title</Form.Label>', () => {
        expect(wrapper.contains(<Form.Label>Title</Form.Label>)).toEqual(true);
    });

    it('should render <Form.Control type="text" placeholder="Enter task\'s title" required />', () => {
        expect(wrapper.contains(<Form.Control type="text" placeholder="Enter task's title" required/>))
            .toEqual(true);
    });

    it('should render  <Form.Label>Description</Form.Label>', () => {
        expect(wrapper.contains(<Form.Label>Description</Form.Label>))
            .toEqual(true);
    });

    it('should render  <Form.Control type="text" placeholder="Enter task\'s description" required />', () => {
        expect(wrapper.contains(<Form.Control type="text" placeholder="Enter task's description" required/>))
            .toEqual(true);
    });

    it('should render  <Form.Label>Project</Form.Label>', () => {
        expect(wrapper.contains(<Form.Label>Project</Form.Label>))
            .toEqual(true);
    });

    it('should render   <Form.Control as="select" custom>', () => {
        expect(wrapper.contains(
            <Form.Control as="select" custom>
                <option value=''>none</option>
            </Form.Control>
        )).toEqual(true);
    });

    it('should render   <Form.Control as="select" custom> with project', () => {
        wrapper.setProps({projects: [{id: 'test_id', title: 'test_title'}]});
        expect(wrapper.contains(
            <Form.Control as="select" custom>
                <option value=''>none</option>
                <option value='test_id'>test_title</option>
            </Form.Control>
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

    it('should render create project button button', () => {
        expect(wrapper.contains(
            <Button variant="outline-info" type="submit" size='sm'>
                Create task
            </Button>
        )).toEqual(true);
    });

    it('should call create task handler', () => {
        const titleInputRef = {current: {value: "test_title"}};
        const descriptionInputRef = {current: {value: "test_description"}};
        const projectInputRef = {current: {value: "test_project"}};
        // @ts-ignore
        useRef.mockReturnValueOnce(titleInputRef)
            .mockReturnValueOnce(descriptionInputRef)
            .mockReturnValueOnce(projectInputRef);
        const onCreateTaskMock = jest.fn();
        wrapper.setProps({onCreateTask: onCreateTaskMock});

        wrapper.find(Form).simulate('submit', {
            preventDefault() {
            }
        });

        expect(onCreateTaskMock)
            .toHaveBeenCalledWith(
                {
                    "description": "test_description",
                    "title": "test_title",
                    "projectId": "test_project"
                });
    });
});