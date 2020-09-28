import {configure, shallow, ShallowWrapper} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from "react";
import EditTaskStatusForm from "../components/EditTaskStatusForm";
import TaskForm from "../components/TaskForm";
import {Card, Button} from "react-bootstrap";
import {Link} from "react-router-dom";


configure({adapter: new Adapter()})

describe('<TaskForm/>', () => {
    let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
    beforeEach(() => {
        wrapper = shallow(<TaskForm
            task={{
                id: 'xxx',
                title: 'test_title',
                description: 'test_description',
                // @ts-ignore
                status: 'test_status',
                projectId: ''
            }}
            projects={[]}
            onDeleteTask={() => {
            }}
            onChangeTaskStatus={() => {
            }}
            projectName={''}/>);
    });

    it('should render <Card.Title />', () => {
        expect(wrapper.find(Card.Title)).toHaveLength(1);
    });

    it('should render 3 <Card.Text /> ', () => {
        expect(wrapper.find(Card.Text)).toHaveLength(3);
    });

    it('should render 4 <Card.Text /> as begin date exits', () => {
        wrapper.setProps(
            {
                task: {
                    id: 'xxx',
                    title: 'test_title',
                    description: 'test_description',
                    // @ts-ignore
                    status: 'test_status',
                    projectId: '',
                    beginDate: '020303'
                }
            }
        );
        expect(wrapper.find(Card.Text)).toHaveLength(4);
    });

    it('should render 5 <Card.Text /> as begin date and end date exits', () => {
        wrapper.setProps(
            {
                task: {
                    id: 'xxx',
                    title: 'test_title',
                    description: 'test_description',
                    // @ts-ignore
                    status: 'test_status',
                    projectId: '',
                    beginDate: '020303',
                    endDate: '020303'
                }
            }
        );
        expect(wrapper.find(Card.Text)).toHaveLength(5);
    });

    it('should render <Button />', () => {
        expect(wrapper.find(Button)).toHaveLength(2);
    });

    it('should render <EditTaskStatusForm/> as edit button was pressed', () => {
        wrapper.find(Button).at(0).simulate('click');
        expect(wrapper.find(EditTaskStatusForm)).toHaveLength(1);
    });

    it('should render <Card.Title /> with content', () => {
        expect(wrapper.contains(
            <Card.Title
                as={Link}
                to={'/task/xxx'}
                style={{
                    color: "lightseagreen"
                }}
            >
                test_title
            </Card.Title>
        )).toEqual(true);

    });

    it('should render <Card.Text /> with description', () => {
        expect(wrapper.contains(
            <Card.Text>
                test_description
            </Card.Text>
        )).toEqual(true);
    });

    it('should render <Card.Text /> with description', () => {
        expect(wrapper.contains(
            <Card.Text>
                test_description
            </Card.Text>
        )).toEqual(true);
    });

    it('should render <Card.Text /> as project name exist ', () => {
        wrapper.setProps(
            {
                task: {
                    id: 'xxx',
                    title: 'test_title',
                    description: 'test_description',
                    // @ts-ignore
                    status: 'test_status',
                    projectId: 'yyy',
                    beginDate: '020303',
                    endDate: '020303'
                },
                projectName: 'test_project'
            });
        expect(wrapper.contains(
            <Card.Text
                as={Link}
                to={`/task/xxx/project`}
                style={{
                    color: "lightseagreen"
                }}
            >
                test_project
            </Card.Text>
        )).toEqual(true);
    });

    it('should render <Card.Text /> as project name not exist ', () => {
        expect(wrapper.contains(
            <Card.Text
                as={Link}
                to={`/task/xxx/project`}
                style={{
                    color: "lightseagreen"
                }}
            >
                Add Project
            </Card.Text>
        )).toEqual(true);
    });

    it('should render <Card.Text /> with task status ', () => {
        expect(wrapper.contains(
            <Card.Text>
                test_status
            </Card.Text>
        )).toEqual(true);
    });

    it('should render <Card.Text /> with begin date', () => {
        wrapper.setProps(
            {
                task: {
                    id: 'xxx',
                    title: 'test_title',
                    description: 'test_description',
                    // @ts-ignore
                    status: 'test_status',
                    projectId: 'yyy',
                    beginDate: '020303',
                    endDate: '020303'
                }
            });
        expect(wrapper.contains(
            <Card.Text>
                Begin: 020303
            </Card.Text>
        )).toEqual(true);
    });

    it('should render <Card.Text /> with end date', () => {
        wrapper.setProps(
            {
                task: {
                    id: 'xxx',
                    title: 'test_title',
                    description: 'test_description',
                    // @ts-ignore
                    status: 'test_status',
                    projectId: 'yyy',
                    beginDate: '020303',
                    endDate: '020303'
                }
            });
        expect(wrapper.contains(
            <Card.Text>
                End: 020303
            </Card.Text>
        )).toEqual(true);
    });

    it('should render <Button/> Change status', () => {
       expect(wrapper.find(Button).findWhere(x => x.text() === 'Change Status')).toHaveLength(2);
    });

    it('should render <Button/> Delete', () => {
        expect(wrapper.find(Button).findWhere(x => x.text() === 'Delete')).toHaveLength(2);
    });

    it('should call on delete task function', () => {
        const onDeleteMockHandler = jest.fn();
        wrapper.setProps(
            {
                onDeleteTask: onDeleteMockHandler
            }
        );
        wrapper.find(Button).at(1).simulate('click');
        expect(onDeleteMockHandler).toBeCalledWith("xxx");
    });

});