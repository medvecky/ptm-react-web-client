import React from 'react';

import {configure, mount, shallow, ShallowWrapper} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TasksList from "../components/TasksList/TasksList";
// @ts-ignore
import configureStore from 'redux-mock-store';
import {Provider, useSelector} from "react-redux";
import {HashRouter} from "react-router-dom";

configure({adapter: new Adapter()});

jest.mock("react-redux", () => {
    const { Provider} = jest.requireActual("react-redux");

    return {
        useDispatch: jest.fn(),
        useSelector: jest.fn(),
        Provider
    };
});


jest.mock('../components/TasksList/TaskListFunction');
const {filterTasks} = require('../components/TasksList/TaskListFunction');
filterTasks.mockImplementationOnce(() => []);
// @ts-ignore
let store;
describe('<TasksList/>', () => {
    // @ts-ignore
    const initialState = {output: 100}
    const mockStore = configureStore();
    // @ts-ignore
    let wrapper;
    const onChangeStatusMock = jest.fn();
    beforeEach(() => {
        store = mockStore(initialState);
        filterTasks.mockImplementationOnce(() => []);
        // @ts-ignore
        wrapper = mount(
            <Provider store={store}>
                <TasksList
                    tasks={[]}
                    projects={[]}
                    onDeleteTask={() => {
                    }}
                    onChangeTaskStatus={() => {
                    }}
                    status={'OPEN'}/>
            </Provider>
        );
    });

    it('should call use selector and filterTask', () => {
        expect(useSelector).toHaveBeenCalled();
        expect(filterTasks).toHaveBeenCalled();
    });

    it('should render <Container/>', () => {
        // @ts-ignore
        expect(wrapper.find('Container')).toHaveLength(1);
    });

    it('should render <Badge/> with status', () => {
        // @ts-ignore
        expect(wrapper.find('Badge').text()).toEqual('OPEN');
    });

    it('should not render <TaskForm> if tasks list is empty', () => {
        // @ts-ignore
        expect(wrapper.find('TaskForm')).toHaveLength(0);
    });

    it('should render two <TaskForm> if tasks list contains two tasks', () => {
        filterTasks.mockReturnValueOnce([
            {
                id: 'id_01',
                title: 'title_01',
                description: 'desc_01',
                status: 'OPEN'
            },
            {
                id: 'id_02',
                title: 'title_02',
                description: 'desc_02',
                status: 'OPEN'
            }
        ]);
        // @ts-ignore
        wrapper = mount(
            // @ts-ignore
            <Provider store={store}>
                <HashRouter>
                <TasksList
                    tasks={[]}
                    projects={[]}
                    onDeleteTask={() => {
                    }}
                    onChangeTaskStatus={() => {
                    }}
                    status={'OPEN'}/>
                </HashRouter>
            </Provider>
        );
        // @ts-ignore
        expect(wrapper.find('TaskForm')).toHaveLength(2);
    });

    it('should <TaskForm> with Add project link if project not present', () => {
        filterTasks.mockReturnValueOnce([
            {
                id: 'id_01',
                title: 'title_01',
                description: 'desc_01',
                status: 'OPEN'
            }
        ]);
        // @ts-ignore
        wrapper = mount(
            // @ts-ignore
            <Provider store={store}>
                <HashRouter>
                    <TasksList
                        tasks={[]}
                        projects={[]}
                        onDeleteTask={() => {
                        }}
                        onChangeTaskStatus={() => {
                        }}
                        status={'OPEN'}/>
                </HashRouter>
            </Provider>
        );
        // @ts-ignore
        expect(wrapper.find('TaskForm')).toHaveLength(1);
        expect(wrapper.find('Link')).toHaveLength(2);
        expect(wrapper.find('Link').at(1).text()).toEqual('Add Project');
    });

    it('should <TaskForm> with  project link if project present', () => {
        filterTasks.mockReturnValueOnce([
            {
                id: 'id_01',
                title: 'title_01',
                description: 'desc_01',
                status: 'OPEN',
                projectId: 'project01'
            }
        ]);
        // @ts-ignore
        wrapper = mount(
            // @ts-ignore
            <Provider store={store}>
                <HashRouter>
                    <TasksList
                        tasks={[]}
                        projects={[
                            {
                                id: 'project01',
                                title: 'project_title',
                                description: 'project_description'
                            }
                        ]}
                        onDeleteTask={() => {
                        }}
                        onChangeTaskStatus={() => {
                        }}
                        status={'OPEN'}/>
                </HashRouter>
            </Provider>
        );
        // @ts-ignore
        expect(wrapper.find('TaskForm')).toHaveLength(1);
        expect(wrapper.find('Link')).toHaveLength(2);
        expect(wrapper.find('Link').at(1).text()).toEqual('project_title');
    });
});