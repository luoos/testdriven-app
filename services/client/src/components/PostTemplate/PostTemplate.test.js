import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import PostTemplate from './PostTemplate';

const postData = {
  title: 'a big name',
  content: 'what do you want to eat for lunch',
  created_time: new Date(),
  last_updated_time: new Date()
}

describe('<PostTemplate />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<PostTemplate {...postData} />)
  });

  it('PostTemplate renders properly', () => {
    const title = wrapper.find('h1');
    expect(title.length).toBe(1);
    expect(title.get(0).props.children).toBe(postData.title);
    const content = wrapper.find('p.content');
    expect(content.length).toBe(1);
    expect(content.get(0).props.children).toBe(postData.content);
  });

  it('renders a snapshot properly', () => {
    const tree = renderer.create(<PostTemplate {...postData} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
})