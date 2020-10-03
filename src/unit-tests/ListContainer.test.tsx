import React from 'react';

import {configure, shallow, ShallowWrapper} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ListsContainer from "../components/ListsContainer";
import { Container, Row, Col } from 'react-bootstrap';
import TasksList from "../components/TasksList/TasksList";
import ProjectsList from "../components/ProjectsList";

configure({adapter: new Adapter()});

describe('<ListContainer/>', () => {
    let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    beforeEach(() => {
        // @ts-ignore
        wrapper = shallow(<ListsContainer
            tasks={[]}
            projects={[]}
            deleteTaskHandler={()=>{}}
            changeTaskStatusHandler={()=>{}}
            deleteProjectHandler={()=>{}}
            editProjectHandler={()=>{}}
            error={''}/>);
    });

    it('should render <Container/>', ()=>{
        expect(wrapper.find(Container)).toHaveLength(1);
    });

    it('should render <Row/>', ()=>{
        expect(wrapper.find(Row)).toHaveLength(1);
    });

    it('should render <Col/>', ()=>{
        expect(wrapper.find(Col)).toHaveLength(4);
    });

    it('should render <TaskList/>', ()=>{
        expect(wrapper.find(TasksList)).toHaveLength(3);
    });

    it('should render <ProjectList/>', ()=>{
        expect(wrapper.find(ProjectsList)).toHaveLength(1);
    });

    it('should contain first row as OPEN tasks', () => {
        expect(
            wrapper
                .find(TasksList)
                .at(0)
                .findWhere(n => n.prop('status') === 'OPEN'))
            .toHaveLength(1);
    });

    it('should contain second row as IN_PROGRESS tasks', () => {
        expect(
            wrapper
                .find(TasksList)
                .at(1)
                .findWhere(n => n.prop('status') === 'IN_PROGRESS'))
            .toHaveLength(1);
    });

    it('should contain third row as DONE tasks', () => {
        expect(
            wrapper
                .find(TasksList)
                .at(2)
                .findWhere(n => n.prop('status') === 'DONE'))
            .toHaveLength(1);
    });
});