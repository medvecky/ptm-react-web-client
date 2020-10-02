import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from "react";
import ProjectForm from "../components/ProjectForm";
// @ts-ignore
import configureStore from 'redux-mock-store';
import {Provider, useDispatch} from "react-redux";
import {HashRouter} from "react-router-dom";

configure({adapter: new Adapter()});

jest.mock("react-redux", () => {
    const { Provider, useSelector } = jest.requireActual("react-redux");

    return {
        useDispatch: jest.fn(),
        useSelector,
        Provider
    };
});


describe('<ProjectFrorm />', () => {
    const initialState = {output: 100}
    const mockStore = configureStore();
    // @ts-ignore
    let wrapper;
    // @ts-ignore
    let store;
    // @ts-ignore
    let dispatchMock;
    const onDeleteMockHandler = jest.fn();
    beforeEach(() => {
        dispatchMock = jest.fn();
        // @ts-ignore
        dispatchMock.mockImplementation(action => store.dispatch(action));
        // @ts-ignore
        useDispatch.mockReturnValue(dispatchMock);

        store = mockStore(initialState);
        wrapper = mount(
            <Provider store={store}>
                <HashRouter>
                <ProjectForm
                    project={{
                        id: 'xxx',
                        title: 'test_title',
                        description: 'test_desc'
                    }}
                    onDeleteProject={onDeleteMockHandler}
                />
                </HashRouter>
            </Provider>
        );
    });

    it('should render <Card.Title>', () => {
        // @ts-ignore
        expect(wrapper.find('CardTitle')).toHaveLength(1);
    });

    it('should render <Card.Title> with correct text', () => {
        // @ts-ignore
        expect(wrapper.find('CardTitle').text()).toEqual('test_title');
    });

    it('should render <Card.Text>', () => {
        // @ts-ignore
        expect(wrapper.find('CardText')).toHaveLength(1);
    });

    it('should render <Card.Text> with correct text', () => {
        // @ts-ignore
        expect(wrapper.find('CardText').text()).toEqual('test_desc');
    });

    it('should render two <Button>', () => {
        // @ts-ignore
        expect(wrapper.find('Button')).toHaveLength(2);
    });

    it('should render Edit <Button>', () => {
        // @ts-ignore
        expect(wrapper.find('Button').at(0).text()).toEqual('Edit');
    });

    it('should render Edit <Button> with link to project', () => {
        // @ts-ignore
        expect(wrapper.find('Button').at(0).find('Link').find({to: "/project/xxx"})).toHaveLength(1);
    });

    it('should render Delete <Button>', () => {
        // @ts-ignore
        expect(wrapper.find('Button').at(1).text()).toEqual('Delete');
    });

    it('should call on delete handler when  Delete <Button> pressed', () => {
        // @ts-ignore
        wrapper.find('Button').at(1).simulate('click');
        expect(onDeleteMockHandler).toHaveBeenCalled();
    });

    it('should set project filter when <Card.Title> pressed', () => {
        // @ts-ignore
        wrapper.find('CardTitle').find('div').simulate('click');
        // @ts-ignore
        expect(dispatchMock).toHaveBeenCalledWith({"payload": "xxx", "type": "projects/setProjectsFilter"});
    });
});
