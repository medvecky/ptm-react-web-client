import React, {useRef} from 'react';

import {configure, shallow, ShallowWrapper} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Button, Card, Form} from "react-bootstrap";
import EditTaskStatusForm from "../components/EditTaskStatusForm";
import {TaskStatus} from "../task.status.enum";

configure({adapter: new Adapter()});

jest.mock('react', () => {
    const originReact = jest.requireActual('react');
    const mUseRef = jest.fn();
    return {
        ...originReact,
        useRef: mUseRef,
    };
});

describe('<EditTaskStatusForm />', () => {
    let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    beforeEach(() => {
        // @ts-ignore
        wrapper = shallow(
            <EditTaskStatusForm
                // @ts-ignore
                task={{
                    id: 'xxx',
                    title: 'test_title',
                    description: 'test_description',
                    // @ts-ignore
                    status: 'test_status',
                    projectId: 'xxx'}}
                projects={[]}
            />);
    });

    it('should render <Form />', () => {
        expect(wrapper.find(Form)).toHaveLength(1);
    });

    it('should render 4 Form group as error not present', () => {
        expect(wrapper.find(Form.Group)).toHaveLength(4);
    });

    it('should render <Form.Label>Title</Form.Label>', () => {
        expect(wrapper.contains(<Form.Label>test_title</Form.Label>)).toEqual(true);
    });

    it('should render  <Form.Label>Description</Form.Label>', () => {
        expect(wrapper.contains(<Form.Label>test_description</Form.Label>))
            .toEqual(true);
    })

    it('should render  <Form.Label>Project Name</Form.Label>', () => {
        wrapper.setProps({projectName: 'test_project'});
        expect(wrapper.contains(<Form.Label>test_project</Form.Label>))
            .toEqual(true);
    });


    it('should render task status', () => {
        expect(wrapper.contains(
            <Form.Group controlId="formStatus">
                <Form.Control as="select" defaultValue='test_status'>
                    <option>{TaskStatus.OPEN}</option>
                    <option>{TaskStatus.IN_PROGRESS}</option>
                    <option>{TaskStatus.DONE}</option>
                </Form.Control>
            </Form.Group>
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
        const onSubmitMock = jest.fn();
        const changeVisibilityMock = jest.fn();
        const statusInputRef = {current: {value: "test_status"}};
        // @ts-ignore
        useRef.mockReturnValue(statusInputRef);
        wrapper.setProps(
            {
                onSubmit: onSubmitMock,
                changeVisibility: changeVisibilityMock
            });

        wrapper.find(Form).simulate('submit', {
            preventDefault() {
            }
        });

        expect(onSubmitMock).toHaveBeenCalledWith(
            {
                description: "test_description",
                id: "xxx",
                projectId: "xxx",
                status: "test_status",
                title: "test_title"
            });
        expect(changeVisibilityMock).toHaveBeenCalled();
    });
});