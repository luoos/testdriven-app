import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import AddUser from './AddUser';

describe('<AddUser />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AddUser />);
  });

  it('should contain three inputs', () => {
    const element = wrapper.find('form');
    expect(element.find('input').length).toBe(3);
    expect(element.find('input').get(0).props.name).toBe('username')
    expect(element.find('input').get(1).props.name).toBe('email')
    expect(element.find('input').get(2).props.name).toBe('submit')
  });

  it('AddUser renders a snapshot properly', () => {
    const tree = renderer.create(<AddUser/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
})