import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Agent from '../components/pages/Agent.jsx';
import Admin from '../components/pages/Admin.jsx';
import Customer from '../components/pages/Customer.jsx';
import View from '../components/pages/View.jsx';


//test suite for Agent Search
describe('Agent Admin Component', () => {

  //generate snapshot
   it('should render snapshot of Agent page', () => {
      const wrapper = shallow(<Agent />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

	//generate snapshot
   it('should render snapshot of Admin page', () => {
      const wrapper = shallow(<Admin />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

		//generate snapshot
   it('should render snapshot of Customer page', () => {
      const wrapper = shallow(<Customer />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

			//generate snapshot
   it('should render snapshot of View page', () => {
      const wrapper = shallow(<View />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

     
});
