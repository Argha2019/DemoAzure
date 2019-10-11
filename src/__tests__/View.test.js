import React from 'react';
import { shallow } from 'enzyme';
// import App from '../App.jsx';
import toJson from 'enzyme-to-json';
import View from '../components/pages/View.jsx';

describe('View Component', () => {

    //generate snapshot
     it('should render snapshot', () => {
        const wrapper = shallow(<View />);
        expect(toJson(wrapper)).toMatchSnapshot();
      });
    })