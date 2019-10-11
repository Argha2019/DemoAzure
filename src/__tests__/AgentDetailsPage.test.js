import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AgentDetailsTemplate from '../components/templates/AgentListTemplate/AgentDetailsTemplate.jsx';
import Cookies from 'js-cookie';

//test suite for AgentDetailsPage Search
describe('AgentDetailsPage Search Component', () => {

  //generate snapshot
   it('should render snapshot', () => {
      const wrapper = shallow(<AgentDetailsTemplate />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    //check DOM elements of AgentDetailsPage search
    it('should render required form elements', () => {
	 Cookies.set('adminData' , "Manjeet");
     const wrapper = shallow(<AgentDetailsTemplate />);
     const form = wrapper.find('.MyForm1');
     expect(form.length).toBe(1);
     expect(form.find('.RegisterButton').length).toBe(1);
     
  });
 
 //check the onChange function for right format of last name input
         it('onChange is called for country', () => {
		 	 Cookies.set('adminData' , "Manjeet");

           const wrapper = shallow(<AgentDetailsTemplate />);

          
           const event = {
             preventDefault: () => {},
             target: {
               name: "country",
               value: "India",
             }
           }

           wrapper.setState({
            edit: true,
			readOnly : false,

          });
          wrapper.update();
          const form = wrapper.find('#MyForm1');
             wrapper.find('#country1').simulate('change', event);
             expect(wrapper.state('country')).toEqual('India');
     
           });

          it('onChange is called for first name', () => {
		  	 Cookies.set('adminData' , "Manjeet");

           const wrapper = shallow(<AgentDetailsTemplate />);
          
           const event = {
             preventDefault: () => {},
             target: {
               name: "firstName",
               value: "Kartikey",
             }
           }

           wrapper.setState({
            edit:true
          });
          wrapper.update();
          const form = wrapper.find('.MyForm1');
             wrapper.find('#firstName1').simulate('change', event);
             expect(wrapper.state('firstName')).toEqual('Kartikey');
     
           });

          it('onChange is called for last name', () => {
		  	 Cookies.set('adminData' , "Manjeet");

           const wrapper = shallow(<AgentDetailsTemplate />);
          
           const event = {
             preventDefault: () => {},
             target: {
               name: "lastName",
               value: "Ghai",
             }
           }

           wrapper.setState({
            edit:true
          });
          wrapper.update();
          const form = wrapper.find('.MyForm1');
             wrapper.find('#lastName1').simulate('change', event);
             expect(wrapper.state('lastName')).toEqual('Ghai');
     
           });

          it('onChange is called for state', () => {
		  	 Cookies.set('adminData' , "Manjeet");

           const wrapper = shallow(<AgentDetailsTemplate />);
          
           const event = {
             preventDefault: () => {},
             target: {
               name: "state",
               value: "Punjab",
             }
           }

           wrapper.setState({
            edit:true
          }); 
          wrapper.update();
          const form = wrapper.find('.MyForm1');
             wrapper.find('#state1').simulate('change', event);
             expect(wrapper.state('state')).toEqual('Punjab');
     
           });

          it('onChange is called for phone', () => {
		  	 Cookies.set('adminData' , "Manjeet");

           const wrapper = shallow(<AgentDetailsTemplate />);
          
           const event = {
             preventDefault: () => {},
             target: {
               name: "phone",
               value: "1234567890",
             }
           }

           wrapper.setState({
            edit:true
          }); 
          wrapper.update();
          const form = wrapper.find('.MyForm1');
             wrapper.find('#phone1').simulate('change', event);
             expect(wrapper.state('phone')).toEqual('1234567890');
     
           });

          it('onChange is called for mail', () => {
		  	 Cookies.set('adminData' , "Manjeet");

           const wrapper = shallow(<AgentDetailsTemplate />);
          
           const event = {
             preventDefault: () => {},
             target: {
               name: "mail",
               value: "abcd@gmail.com",
             }
           }

           wrapper.setState({
            edit:true
          }); 
          wrapper.update();
          const form = wrapper.find('.MyForm1');
             wrapper.find('#mail1').simulate('change', event);
             expect(wrapper.state('mail')).toEqual('abcd@gmail.com');
           });

          it('onChange is called for addressLine1', () => {
		  	 Cookies.set('adminData' , "Manjeet");

           const wrapper = shallow(<AgentDetailsTemplate />);
          
           const event = {
             preventDefault: () => {},
             target: {
               name: "addressLine1",
               value: "Gurgaon",
             }
           }

           wrapper.setState({
            edit:true
          }); 
          wrapper.update();
          const form = wrapper.find('.MyForm1');
             wrapper.find('#addressLine11').simulate('change', event);
             expect(wrapper.state('addressLine1')).toEqual('Gurgaon');
           });

          it('onChange is called for addressLine2', () => {
		  	 Cookies.set('adminData' , "Manjeet");

           const wrapper = shallow(<AgentDetailsTemplate />);
          
           const event = {
             preventDefault: () => {},
             target: {
               name: "addressLine2",
               value: "Gurgaon",
             }
           }

           wrapper.setState({
            edit:true
          }); 
          wrapper.update();
          const form = wrapper.find('.MyForm1');
             wrapper.find('#addressLine21').simulate('change', event);
             expect(wrapper.state('addressLine2')).toEqual('Gurgaon');
           });

          it('onChange is called for pin code', () => {
		  	 Cookies.set('adminData' , "Manjeet");

           const wrapper = shallow(<AgentDetailsTemplate />);
          
           const event = {
             preventDefault: () => {},
             target: {
               name: "pincode",
               value: "123456",
             }
           }

           wrapper.setState({
            edit:true
          }); 
          wrapper.update();
          const form = wrapper.find('.MyForm1');
             wrapper.find('#pincode1').simulate('change', event);
             expect(wrapper.state('pincode')).toEqual('123456');
           });

         
			//cancel button
           it('cancelProfile is called', () => {
		   	 Cookies.set('adminData' , "Manjeet");

            const wrapper = shallow(<AgentDetailsTemplate/>);
           
            const event = {
              preventDefault: () => {},
            }
 
            wrapper.setState({
             edit:true
           });
           wrapper.update();
           const form = wrapper.find('.MyForm');
              wrapper.find('#cancel1').last().simulate('click', event);
              expect(wrapper.state('edit')).toEqual(false);
      
            });


			//Submit button
			it('submit button is called', () => {
		   	 Cookies.set('adminData' , "Manjeet");

            const wrapper = shallow(<AgentDetailsTemplate/>);
           
            const event = {
              preventDefault: () => {},
            }
 
            wrapper.setState({
             edit:true
           });
           wrapper.update();
           const form = wrapper.find('.MyForm');
              wrapper.find('#submit1').last().simulate('click', event);
              expect(wrapper.state('edit')).toEqual(false);
      
            });


			//Edit Button
			it('edit button is called', () => {
		   	 Cookies.set('adminData' , "Manjeet");

            const wrapper = shallow(<AgentDetailsTemplate/>);
           
            const event = {
              preventDefault: () => {},
            }
 
            wrapper.setState({
             edit:false
           });
           wrapper.update();
           const form = wrapper.find('.MyForm');
              wrapper.find('#edit1').last().simulate('click', event);
              expect(wrapper.state('edit')).toEqual(true);
      
            });
 
 });
