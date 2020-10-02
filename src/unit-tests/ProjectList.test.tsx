import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from "react";
// @ts-ignore
import configureStore from 'redux-mock-store';
import {Provider, useDispatch} from "react-redux";
import ProjectsList from "../components/ProjectsList";
import {HashRouter} from "react-router-dom";

configure({adapter: new Adapter()});

jest.mock("react-redux", () => {
    const {Provider, useSelector} = jest.requireActual("react-redux");

    return {
        useDispatch: jest.fn(),
        // we ensure that these are original
        useSelector,
        Provider
    };
});


describe('<ProjectList />', () => {
    const initialState = {output: 100}
    const mockStore = configureStore();
    // @ts-ignore
    let wrapper;
    // @ts-ignore
    let store;
    // @ts-ignore
    let dispatchMock;
    const onDeleteMockHandler = jest.fn();
    const onEditMockHandler = jest.fn();
    beforeEach(() => {
        dispatchMock = jest.fn();
        // @ts-ignore
        dispatchMock.mockImplementation(action => store.dispatch(action));
        // @ts-ignore
        useDispatch.mockReturnValue(dispatchMock);

        store = mockStore(initialState);
        wrapper = mount(
            <Provider store={store}>
                <ProjectsList items={[]} onDeleteProject={onDeleteMockHandler} onEditProject={onEditMockHandler}/>
            </Provider>
        );
    });

    it('should render PROJECTS <Badge>', () => {
        // @ts-ignore
        expect(wrapper.find('Badge').text()).toEqual('PROJECTS');
    });

    it('should render <Button>', () => {
        // @ts-ignore
        expect(wrapper.find('Button')).toHaveLength(2);
    });

    it('should render Clear Filter <Button>', () => {
        // @ts-ignore
        expect(wrapper.find('Button').at(0).text()).toEqual('Clear Filter');
    });

    it('should render Tasks without project <Button>', () => {
        // @ts-ignore
        expect(wrapper.find('Button').at(1).text()).toEqual('Tasks without project');
    });

    it('should clear filter when button pressed', () => {
        // @ts-ignore
        wrapper.find('Button').at(0).simulate('click');
        // @ts-ignore
        expect(dispatchMock).toBeCalledWith({"payload": "", "type": "projects/setProjectsFilter"});
    });

    it('should set filter to task without project when button pressed', () => {
        // @ts-ignore
        wrapper.find('Button').at(1).simulate('click');
        // @ts-ignore
        expect(dispatchMock).toBeCalledWith({"payload": "-", "type": "projects/setProjectsFilter"});
    });

    it('should not render project form if project not present', () => {
        // @ts-ignore
        expect(wrapper.find('ProjectForm')).toHaveLength(0);
    });

    it('should render project forms if projects npresent', () => {
        store = mockStore(initialState);
        wrapper = mount(
            <Provider store={store}>
                <HashRouter>
                <ProjectsList
                    items={[
                        {
                            id: 'id01',
                            title: 'title01',
                            description: 'desc01'
                        },
                        {
                            id: 'id02',
                            title: 'title02',
                            description: 'desc02'
                        }
                    ]}
                    onDeleteProject={onDeleteMockHandler}
                    onEditProject={onEditMockHandler}/>
                </HashRouter>
            </Provider>
        );
        expect(wrapper.find('ProjectForm')).toHaveLength(2);
        expect(wrapper.find('ProjectForm').at(0).find('CardTitle').text()).toEqual('title01');
        expect(wrapper.find('ProjectForm').at(0).find('CardText').text()).toEqual('desc01');
        expect(wrapper.find('ProjectForm').at(1).find('CardTitle').text()).toEqual('title02');
        expect(wrapper.find('ProjectForm').at(1).find('CardText').text()).toEqual('desc02');
    });

});
