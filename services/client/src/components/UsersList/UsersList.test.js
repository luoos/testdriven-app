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

  it('should render properly', () => {
    expect(wrapper.find('h1').get(0).props.children).toBe('All Users');
    // table
    const table = wrapper.find('table');
    expect(table.length).toBe(1);
    // table head
    expect(wrapper.find('thead').length).toBe(1);
    const th = wrapper.find('th');
    expect(th.length).toBe(4);
    expect(th.get(0).props.children).toBe('ID');
    expect(th.get(1).props.children).toBe('Email');
    expect(th.get(2).props.children).toBe('Username');
    expect(th.get(3).props.children).toBe('Active');
    // table body
    expect(wrapper.find('tbody').length).toBe(1);
    expect(wrapper.find('tbody > tr').length).toBe(2);
    const td = wrapper.find('tbody > tr > td');
    expect(td.length).toBe(8);
    expect(td.get(0).props.children).toBe(1);
    expect(td.get(1).props.children).toBe('greatjohn@doe.com');
    expect(td.get(2).props.children).toBe('John Doe');
    expect(td.get(3).props.children).toBe('true');
  });

  it('should render a snapshot properly', () => {
    const tree = renderer.create(<UsersList users={users} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});