import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Input from './Input';

let testProps;
let componenet;

describe('<Input />', () => {

  beforeEach(() => {
    testProps = {
      label: 'test-label',
      name: 'test-name',
      type: 'text',
      icon: 'test-icon',
      value: 'test-value',
      handleChange: jest.fn(),
      size: 'large',
      placeholder: 'enter some',
      required: true
    }
    componenet = <Input {...testProps} />
  })

  it('Input calls handleChange properly', () => {
    const wrapper = shallow(componenet);
    expect(testProps.handleChange).toHaveBeenCalledTimes(0);
    const input = wrapper.find('input');
    expect(input.length).toBe(1);
    input.simulate('change',
      {target: {name: 'test-name', value: 'hello there'} });
    expect(testProps.handleChange).toHaveBeenCalledTimes(1);
  });

  it('renders a snapshot properly', () => {
    const tree = renderer.create(componenet).toJSON();
    expect(tree).toMatchSnapshot();
  })

});
