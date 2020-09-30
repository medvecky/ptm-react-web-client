import {configure, mount, shallow, ShallowWrapper} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from "react";
import ProjectForm from "../components/ProjectForm";
// @ts-ignore
import configureStore from 'redux-mock-store';
import {Provider} from "react-redux";
import {HashRouter} from "react-router-dom";

configure({adapter: new Adapter()});

describe('<ProjectFrorm />', () => {
    const initialState = {output: 100}
    const mockStore = configureStore();
    // @ts-ignore
    let wrapper;
    let store;
    beforeEach(() => {
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
                    onDeleteProject={() => {
                    }}/>
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

    it('should render Delete <Button>', () => {
        // @ts-ignore
        expect(wrapper.find('Button').at(1).text()).toEqual('Delete');
    });

});