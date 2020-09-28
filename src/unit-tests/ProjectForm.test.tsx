import {configure, mount, shallow, ShallowWrapper} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from "react";
import ProjectForm from "../components/ProjectForm";
import {Card} from 'react-bootstrap';
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import store from '../store/store';
configure({adapter: new Adapter()});

describe('<ProjectFrorm />', () => {
    let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
    beforeEach(() => {

        wrapper = shallow(
            <Provider store={store}>
                <ProjectForm
                    project={{
                        id: 'xxx',
                        title: 'test_title',
                        description: 'test_desc'
                    }}
                    onDeleteProject={() => {
                    }}/>
            </Provider>).dive().dive();
    });

    it('should render <Card.Title>', () => {
        // @ts-ignore
        console.log(component.debug());

        // @ts-ignore
        expect(component.find(Card)).toHaveLength(1);
    });

});