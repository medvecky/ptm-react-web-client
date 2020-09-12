import React, {useRef} from 'react';

import {configure, shallow, ShallowWrapper} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Button, Card, Form} from "react-bootstrap";
import EditTaskProjectForm from "../components/EditTaskProjectForm/EditTaskProjectForm";

configure({adapter: new Adapter()});

jest.mock('react', () => {
    const originReact = jest.requireActual('react');
    const mUseRef = jest.fn();
    return {
        ...originReact,
        useRef: mUseRef,
    };
});

describe('<EditTaskProjectForm />', () => {
    let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    beforeEach(() => {
        // @ts-ignore
        wrapper = shallow(
            <EditTaskProjectForm
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

    it('should render empty select project element', () => {
        expect(wrapper.contains(
            <Form.Control as="select" custom>
                <option value=''>none</option>
            </Form.Control>
        )).toEqual(true);
    });

    it('should render project select without selected project', () => {
        wrapper.setProps({projects: [{title: 'test_project', id: 'yyy'}]});
        expect(wrapper.contains(
            <Form.Control as="select" custom>
                <option value=''>none</option>
                <option value='yyy'>test_project</option>
            </Form.Control>
        )).toEqual(true);
    });

    it('should render project select with selected project', () => {
        wrapper.setProps({projects: [{title: 'test_project', id: 'xxx'}]});
        expect(wrapper.contains(
            <Form.Control as="select" custom>
                <option value=''>none</option>
                <option value='xxx' selected>test_project</option>
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

    it('should render save changes button', () => {
        expect(wrapper.contains(
            <Button variant="outline-info" type="submit" size='sm'>
                Save changes
            </Button>
        )).toEqual(true);
    });

    it('should call edit task project handler', () => {
        const titleInputRef = {current: {value: "test_title"}};
        const descriptionInputRef = {current: {value: "test_description"}};
        const projectInputRef = {current: {value: "test_project"}};
        // @ts-ignore
        useRef.mockReturnValueOnce(titleInputRef)
            .mockReturnValueOnce(descriptionInputRef)
            .mockReturnValueOnce(projectInputRef);
        const onEditTaskProjectMock = jest.fn();
        const onDeleteTaskProjectMock = jest.fn();
        wrapper.setProps(
            {
                onEditTaskProject: onEditTaskProjectMock,
                onDeleteTaskProject: onDeleteTaskProjectMock,
                task: {id: 'task_id'}
            });

        wrapper.find(Form).simulate('submit', {
            preventDefault() {
            }
        });

        expect(onEditTaskProjectMock).toHaveBeenCalledWith("task_id", "test_project");
    });

    it('should call delete task project handler', () => {
        const titleInputRef = {current: {value: "test_title"}};
        const descriptionInputRef = {current: {value: "test_description"}};
        const projectInputRef = {current: {value: ""}};
        // @ts-ignore
        useRef.mockReturnValueOnce(titleInputRef)
            .mockReturnValueOnce(descriptionInputRef)
            .mockReturnValueOnce(projectInputRef);
        const onEditTaskProjectMock = jest.fn();
        const onDeleteTaskProjectMock = jest.fn();
        wrapper.setProps(
            {
                onEditTaskProject: onEditTaskProjectMock,
                onDeleteTaskProject: onDeleteTaskProjectMock,
                task: {id: 'task_id'}
            });

        wrapper.find(Form).simulate('submit', {
            preventDefault() {
            }
        });

        expect(onDeleteTaskProjectMock).toHaveBeenCalledWith("task_id");
    });
});