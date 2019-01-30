import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import App from './App';


describe('<App />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BrowserRouter><App /></BrowserRouter>);
  })

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})
