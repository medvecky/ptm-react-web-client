import React, {useRef} from 'react';

import {configure, shallow, ShallowWrapper} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CreateProjectForm from "../components/CreateProjectForm/CreateProjectForm";
import {Form} from "react-bootstrap";

configure({adapter: new Adapter()});

jest.mock('react', () => {
    const originReact = jest.requireActual('react');
    const mUseRef = jest.fn();
    return {
        ...originReact,
        useRef: mUseRef,
    };
});

describe('<CreateProjectForm />', () => {
    let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    beforeEach(() => {
        // @ts-ignore
        wrapper = shallow(<CreateProjectForm />);
    });

    it('should render <Form />', () => {
        expect(wrapper.find(Form)).toHaveLength(1);
    });

    it('should render 2 Form group as error not present', () => {
        expect(wrapper.find(Form.Group)).toHaveLength(2);
    });

    it('should render 3 Form group as error present', () => {
        wrapper.setProps({error: "Sample error"});
        expect(wrapper.find(Form.Group)).toHaveLength(3);
    });
});