import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AdjustInventory from '../components/pages/AdjustInventory.jsx';
import { JestEnvironment } from '@jest/environment';
import axios from 'axios';

jest.mock('axios');

describe('Adjust Inventory Component', () => {
	it('should render snapshot', () => {
		const component = shallow(<AdjustInventory />);
		expect(toJson(component)).toMatchSnapshot();
	});
	it('Buttons rendering', () => {
		const wrapper = shallow(<AdjustInventory />);
		const d = wrapper.find('div');
    expect(d.find('Button').length).toBe(2);
    expect(d.find('#checkButton').length).toBe(1);
	})

});



describe('Add Button', () => {
	it('initial size of list', () => {
		const wrapper = shallow(<AdjustInventory />);
		expect(wrapper.state().productid).toEqual('');
	});

	it('State Change after Proceed to Buy button', () => {
    const wrapper = shallow(<AdjustInventory />);
		const b = wrapper.find('#checkButton');
		b.simulate('click');
    expect(wrapper.state().stateChanged).toEqual(true);
  });
  

    it('onChange is called p', () => {
      const wrapper = shallow(<AdjustInventory />);
      const form = wrapper.find('#firstform');
      const event = {
        preventDefault: () => {},
        target: {
          name: "productid",
          value: "123a",
        }
      }
        wrapper.find('.productid').simulate('change', event);
        expect(wrapper.state('productid')).toEqual('123a');
  
      });

      it('onChange is called operation', () => {
        const wrapper = shallow(<AdjustInventory />);
        const form = wrapper.find('#secondform');
        const event = {
          preventDefault: () => {},
          target: {
            name: "operation",
            value: "Increase",

          }
        }
        wrapper.setState({
          disabledButton:false
        });

          wrapper.find('.operation').simulate('change', event);
          wrapper.update();
          expect(wrapper.state('operation')).toEqual('Increase');
    
        });
        
        it('onChange is called operation', () => {
          const wrapper = shallow(<AdjustInventory />);
          const form = wrapper.find('#secondform');
          const event = {
            preventDefault: () => {},
            target: {
              name: "changeInQuantity",
              value: "13",
  
            }
          }
          wrapper.setState({
            disabledButton:false
          });
  
            wrapper.find('.changeInQuantity').simulate('change', event);
            wrapper.update();
            expect(wrapper.state('changeInQuantity')).toEqual('13');
      
          });

          it('onChange is called operation', () => {
            const wrapper = shallow(<AdjustInventory />);
            const form = wrapper.find('#firstform');
            const event = {
              preventDefault: () => {},
            
            }
            wrapper.setState({
              productid:"123a",
              storeid:"123a"
            });
    
              wrapper.find('#checkButton').simulate('submit', event);
              wrapper.update();
              expect(wrapper.state('stateChanged')).toEqual(true);
        
            });


});
