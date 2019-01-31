import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import NavBar from './NavBar';

describe('<NavBar />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavBar />);
  });

  it('NavBar renders properly', () => {
    const element = wrapper.find('strong');
    expect(element.length).toBe(1);
    expect(element.get(0).props.children).toBe('TestDriven.io')
  });

  it('Three navbar-start elements', () => {
    const element = wrapper.find('.navbar-start');
    expect(element.length).toBe(1);
    expect(element.get(0).props.children.length).toBe(3);
  });

  it('NavBar renders a snapshot properly', () => {
    const tree = renderer.create(
      <MemoryRouter location="/"><NavBar /></MemoryRouter>).toJSON();
    expect(tree).toMatchSnapshot();
  });
})