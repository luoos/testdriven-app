import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';

import Logout from './Logout';

const logoutUser = jest.fn();

describe('<Logout />', () => {
  it('Logout renders properly', () => {
    const wrapper = shallow(<Logout logUserOut={logoutUser} />);
    const element = wrapper.find('p');
    expect(element.length).toBe(1);
    expect(element.get(0).props.children[0]).toContain('You are now logged out.');
  });

  it('Logout renders a snapshot properly', () => {
    const tree = renderer.create(
      <MemoryRouter><Logout logUserOut={logoutUser} /></MemoryRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});