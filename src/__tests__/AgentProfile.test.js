import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import AgentProfile from '../components/pages/AgentProfile.jsx';


describe('Agent Profile' , () => {
    it('render component' , () => {
        const wrapper = shallow(<AgentProfile />);
        expect(toJson(wrapper)). toMatchSnapshot();
    });

    it('on change of firstName field' , () => {
        const event = {
            preventDefault: () => {},
            target : {
                name : "firstName",
                value : "Yashika",
				readOnly : false,
            }
        };
         const wrapper = shallow(<AgentProfile />);
		 wrapper.setState({
            edit: true,
			readOnly : false,

          });
         const input = wrapper.find('.firstName');

         input.simulate('change', event);
         expect(input.length).toBe(1);
         expect(wrapper.state('firstName')).toBe("Yashika");
    });

    
    it('on change of lastName field' , () => {
        const event = {
            preventDefault: () => {},
            target : {
                name : "lastName",
                value : "Gupta",
            }
        };
         const wrapper = shallow(<AgentProfile />);
		 wrapper.setState({
            edit: true,
			readOnly : false,

          });
         const input = wrapper.find('.lastName');

         input.simulate('change', event);
         expect(input.length).toBe(1);
         expect(wrapper.state('lastName')).toBe("Gupta");
    });

    it('on change of phone field' , () => {
        const event = {
            preventDefault: () => {},
            target : {
                name : "phone",
                value : "0000000000",
            }
        };
         const wrapper = shallow(<AgentProfile />);
		 wrapper.setState({
            edit: true,
			readOnly : false,

          });
         const input = wrapper.find('.phone');

         input.simulate('change', event);
         expect(input.length).toBe(1);
         expect(wrapper.state('phone')).toBe("0000000000");
    });

    it('on change of mail field' , () => {
        const event = {
            preventDefault: () => {},
            target : {
                name : "mail",
                value : "yashi@123",
            }
        };
         const wrapper = shallow(<AgentProfile />);
		 wrapper.setState({
            edit: true,
			readOnly : false,

          });
         const input = wrapper.find('.mail');

         input.simulate('change', event);
         expect(input.length).toBe(1);
         expect(wrapper.state('mail')).toBe("yashi@123");
    });

    it('on change of addressLine1 field' , () => {
        const event = {
            preventDefault: () => {},
            target : {
                name : "addressLine1",
                value : "abcd",
            }
        };
         const wrapper = shallow(<AgentProfile />);
		 wrapper.setState({
            edit: true,
			readOnly : false,

          });
         const input = wrapper.find('.addressLine1');

         input.simulate('change', event);
         expect(input.length).toBe(1);
         expect(wrapper.state('addressLine1')).toBe("abcd");
    });

    it('on change of addressLine2 field' , () => {
        const event = {
            preventDefault: () => {},
            target : {
                name : "addressLine2",
                value : "abcd",
            }
        };
         const wrapper = shallow(<AgentProfile />);
		 wrapper.setState({
            edit: true,
			readOnly : false,

          });
         const input = wrapper.find('.addressLine2');

         input.simulate('change', event);
         expect(input.length).toBe(1);
         expect(wrapper.state('addressLine2')).toBe("abcd");
    });

    it('on change of state field' , () => {
        const event = {
            preventDefault: () => {},
            target : {
                name : "state",
                value : "def",
            }
        };
         const wrapper = shallow(<AgentProfile />);
		 wrapper.setState({
            edit: true,
			readOnly : false,

          });
         const input = wrapper.find('.state');

         input.simulate('change', event);
         expect(input.length).toBe(1);
         expect(wrapper.state('state')).toBe("def");
    });

    it('on change of country field' , () => {
        const event = {
            preventDefault: () => {},
            target : {
                name : "country",
                value : "abcd",
            }
        };
         const wrapper = shallow(<AgentProfile />);
         const input = wrapper.find('.country');
         input.simulate('change', event);
         expect(input.length).toBe(1);
         expect(wrapper.state('country')).toBe("abcd");
    });

    it('on change of pincode field' , () => {
        const event = {
            preventDefault: () => {},
            target : {
                name : "pincode",
                value : "123456",
            }
        };
         const wrapper = shallow(<AgentProfile />);
         const input = wrapper.find('.pincode');

         input.simulate('change', event);
         expect(input.length).toBe(1);
         expect(wrapper.state('pincode')).toBe("123456");
    });
    it('cancelProfile is called', () => {
            const wrapper = shallow(<AgentProfile />);
           
            const event = {
              preventDefault: () => {},
            }
 
            wrapper.setState({
             edit:true
			});
            wrapper.update();
            const form = wrapper.find('.MyForm');
            wrapper.find('.RegisterButton').last().simulate('click', event);
            expect(wrapper.state('edit')).toEqual(false);      
      });

	  it('edit button on form 1', () => {
                 const wrapper = shallow(<AgentProfile />);
                 const form = wrapper.find('.MyForm');
                 const event = {
                   preventDefault: () => {}
                 }
                 wrapper.setState({
                   edit:false
                 });
                 wrapper.update();

                 const button = form.find('.RegisterButton');
                 button.simulate('click', event);
                 
                   expect(wrapper.state('edit')).toEqual(true);
                  //  expect(wrapper.state('noField')).toEqual("Please enter value in atleast one field");
      });


	  it('edit function', () => {
                 const wrapper = shallow(<AgentProfile />);
                 const form = wrapper.find('.MyForm');
                 const event = {
                   preventDefault: () => {}
                 }
                 wrapper.setState({
                   edit:true
                 });
                 wrapper.update();
                 const button = form.find('.RegisterButton').last();
                 button.simulate('click', event);                 
                   expect(wrapper.state('edit')).toEqual(false);
                  //  expect(wrapper.state('noField')).toEqual("Please enter value in atleast one field");
      });
})
