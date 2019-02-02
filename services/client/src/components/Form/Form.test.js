import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Form from './Form';

const testData = [
  {
    formType: 'Register',
    title: 'Register',
    formData: {
      username: '',
      email: '',
      password: ''
    },
    handleUserFormSubmit: jest.fn(),
    handleFormValueChange: jest.fn(),
  },
  {
    formType: 'Login',
    title: 'Log In',
    formData: {
      email: '',
      password: ''
    },
    handleUserFormSubmit: jest.fn(),
    handleFormValueChange: jest.fn(),
  }
]

describe('<Form />', () => {

  testData.forEach((el) => {
    const component = <Form {...el} />;
    it(`${el.formType} Form renders properly`, () => {
      const wrapper = shallow(component);
      const h1 = wrapper.find('h1');
      expect(h1.length).toBe(1);
      expect(h1.get(0).props.children).toBe(el.title);
      const formGroup = wrapper.find('.control');
      expect(formGroup.length).toBe(Object.keys(el.formData).length);
      expect(formGroup.get(0).props.children[0].props.name).toBe(Object.keys(el.formData)[0]);
      expect(formGroup.get(0).props.children[0].props.value).toBe('');
    });

    it(`${el.formType} Form renders a snapshot properly`, () => {
      const tree = renderer.create(component).toJSON();
      expect(tree).toMatchSnapshot();
    })

    it(`${el.formType} Form submits the form properly`, () => {
      const wrapper = shallow(component);
      const input = wrapper.find('input[type="email"]');
      expect(el.handleUserFormSubmit).toHaveBeenCalledTimes(0);
      expect(el.handleFormValueChange).toHaveBeenCalledTimes(0);
      input.simulate('change');
      expect(el.handleFormValueChange).toHaveBeenCalledTimes(1);
      wrapper.find('form').simulate('submit', el.formData)
      expect(el.handleUserFormSubmit).toHaveBeenCalledWith(el.formData);
      expect(el.handleUserFormSubmit).toHaveBeenCalledTimes(1);
    })
  })

})
