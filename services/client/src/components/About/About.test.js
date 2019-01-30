import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import About from './About';

describe('<About />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<About />);
  })

  it('Renders properly', () => {
    const element = wrapper.find('p');
    expect(element.length).toBe(1);
    expect(element.text()).toBe('Add something relevant here.');
  })

  it('About renders a snapshot properly', () => {
    const tree = renderer.create(<About />).toJSON();
    expect(tree).toMatchSnapshot();
  });
})