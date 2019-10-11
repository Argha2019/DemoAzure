
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import RegistrationTemplate from '../components/templates/RegistrationTemplate/Template.jsx';
import Registration from '../components/pages/Registration.jsx'
import Cookies from 'js-cookie';


describe('test Registration', () => {
    it('render Registration snapshot', () => {
        const wrapper = shallow(<RegistrationTemplate />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('Render requiered Register Form elements', () => {
       
        const wrapper = shallow(<RegistrationTemplate />);
        
        const form = wrapper.find('.MyForm');
        expect(form.length).toBe(1);
        expect(form.find('Button').length).toBe(1);
        expect(form.find('FormControl').length).toBe(13); 
        expect(form.find('#firstName').length).toBe(1);
       
    });

    it('on change of firstName field' , () => {
        const wrapper = shallow(<RegistrationTemplate />);
        const form = wrapper.find('.MyForm');
        expect(form.find('#firstName').length).toBe(1);
        const event = {
            preventDefault: () => {},
            target : {
                name : "firstName",
                value : "Yashika",
            }
        };
         
         const input = form.find('#firstName');

         input.simulate('change', event);
         expect(input.length).toBe(1);
         expect(wrapper.state('firstName')).toBe("Yashika");
    });
    
    it('on change of lastName field' , () => {
       
        const wrapper = shallow(<RegistrationTemplate />);
        const form = wrapper.find('.MyForm');
        expect(form.find('#lastName').length).toBe(1);
        const event = {
            preventDefault: () => {},
            target : {
                name : "lastName",
                value : "Gupta",
            }
        };
         
         const input = form.find('#lastName');

         input.simulate('change', event);
         expect(input.length).toBe(1);
         expect(wrapper.state('lastName')).toBe("Gupta");
    });

    it('on change of phone field' , () => {
       
        const wrapper = shallow(<RegistrationTemplate />);
        const form = wrapper.find('.MyForm');
        expect(form.find('#phone').length).toBe(1);
        const event = {
            preventDefault: () => {},
            target : {
                name : "phone",
                value : "000000",
            }
        };
         
         const input = form.find('#phone');

         input.simulate('change', event);
         expect(input.length).toBe(1);
         expect(wrapper.state('phone')).toBe("000000");
    });

    it('on change of mail field' , () => {
        
        const wrapper = shallow(<RegistrationTemplate />);
        const form = wrapper.find('.MyForm');
        expect(form.find('#mail').length).toBe(1);
        const event = {
            preventDefault: () => {},
            target : {
                name : "mail",
                value : "abcd@123",
            }
        };
         
         const input = form.find('#mail');

         input.simulate('change', event);
         expect(input.length).toBe(1);
         expect(wrapper.state('mail')).toBe("abcd@123");
    });

    it('on change of addressLine1 field' , () => {
       
        const wrapper = shallow(<RegistrationTemplate />);
        const form = wrapper.find('.MyForm');
        expect(form.find('#addressLine1').length).toBe(1);
        const event = {
            preventDefault: () => {},
            target : {
                name : "addressLine1",
                value : "xyz",
            }
        };
         
         const input = form.find('#addressLine1');

         input.simulate('change', event);
         expect(input.length).toBe(1);
         expect(wrapper.state('addressLine1')).toBe("xyz");
    });

    it('on change of addressLine2 field' , () => {
       
        const wrapper = shallow(<RegistrationTemplate />);
        const form = wrapper.find('.MyForm');
        expect(form.find('#addressLine2').length).toBe(1);
        const event = {
            preventDefault: () => {},
            target : {
                name : "addressLine2",
                value : "xyz",
            }
        };
         
         const input = form.find('#addressLine2');

         input.simulate('change', event);
         expect(input.length).toBe(1);
         expect(wrapper.state('addressLine2')).toBe("xyz");
    });

    it('on change of state field' , () => {
        const wrapper = shallow(<RegistrationTemplate />);
        const form = wrapper.find('.MyForm');
        expect(form.find('#state').length).toBe(1);
        const event = {
            preventDefault: () => {},
            target : {
                name : "state",
                value : "xyz",
            }
        };
         
         const input = form.find('#state');

         input.simulate('change', event);
         expect(input.length).toBe(1);
         expect(wrapper.state('state')).toBe("xyz");
    });

    it('on change of country field' , () => {
        const wrapper = shallow(<RegistrationTemplate />);
        const form = wrapper.find('.MyForm');
        expect(form.find('#country').length).toBe(1);
        const event = {
            preventDefault: () => {},
            target : {
                name :  "country",
                value : "xyz",
            }
        };
         
         const input = form.find('#country');

         input.simulate('change', event);
         expect(input.length).toBe(1);
         expect(wrapper.state('country')).toBe("xyz");
    });

    it('on change of username field' , () => {
        const wrapper = shallow(<RegistrationTemplate />);
        const form = wrapper.find('.MyForm');
        expect(form.find('#username').length).toBe(1);
        const event = {
            preventDefault: () => {},
            target : {
                name :  "username",
                value : "abcd",
            }
        };
         
         const input = form.find('#username');

         input.simulate('change', event);
         expect(input.length).toBe(1);
         expect(wrapper.state('username')).toBe("abcd");
    });

    it('Change in input field', () => {
        const wrapper = shallow(<RegistrationTemplate />);
        const event = {
          preventDefault: () => {},
        }
        wrapper.setState({
          loginPage: " Login Here"
        });
        wrapper.update();
        const form = wrapper.find('.MyForm');
        form.simulate('submit', event);
        expect(wrapper.state('loginPage')).toBe(' Login Here');
    });
    
})

