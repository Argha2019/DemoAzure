import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ButtonGroup from '../components/pages/try.jsx';

describe('ButtonGroup', () => {
  test('it renders three buttons with the first one active', () => {
    const wrapper = shallow(<ButtonGroup />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});