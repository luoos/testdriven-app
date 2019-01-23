import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import UsersList from './UsersList';

const users = [
  {
    'active': true,
    'email': 'greatjohn@doe.com',
    'id': 1,
    'username': 'John Doe'
  },
  {
    'active': true,
    'email': 'greatjohn@snow.com',
    'id': 2,
    'username': 'John Snow'
  }
];

describe('<UsersList />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<UsersList users={users}/>);
  });

  it('should render two h4 elements', () => {
    const element = wrapper.find('h4');
    expect(element.length).toBe(2);
    expect(element.get(0).props.children).toBe('John Doe');
  });

  it('should render a snapshot properly', () => {
    const tree = renderer.create(<UsersList users={users} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});