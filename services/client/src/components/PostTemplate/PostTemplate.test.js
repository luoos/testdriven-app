import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import PostTemplate from './PostTemplate';

const postData = {
  id: 1,
  title: 'a big name',
  content: 'what do you want to eat for lunch',
  created_time: new Date('2019-02-20'),
  last_updated_time: new Date('2019-02-22')
}

describe('<PostTemplate />', () => {

  it('PostTemplate renders properly title clickable', () => {
    const wrapper = shallow(<PostTemplate {...postData} />)
    const title = wrapper.find('Link');
    expect(title.length).toBe(1);
    expect(title.get(0).props.children).toBe(postData.title);
    const content = wrapper.find('p.content');
    expect(content.length).toBe(1);
    expect(content.get(0).props.children).toBe(postData.content);
  });

  it('PostTemplate renders properly title unclickable', () => {
    const wrapper = shallow(<PostTemplate {...postData} title_clickable={false} />)
    const title = wrapper.find('h1');
    expect(title.length).toBe(1);
    expect(title.get(0).props.children).toBe(postData.title);
    const content = wrapper.find('p.content');
    expect(content.length).toBe(1);
    expect(content.get(0).props.children).toBe(postData.content);
  });

  it('renders a snapshot properly', () => {
    const tree = renderer.create(<MemoryRouter location="/"><PostTemplate {...postData} /></MemoryRouter>).toJSON();
    expect(tree).toMatchSnapshot();
  });
})