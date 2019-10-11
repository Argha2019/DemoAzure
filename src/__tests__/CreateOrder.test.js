import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import CreateOrder from '../components/pages/CreateOrder.jsx';
import Cookies from 'js-cookie';
import {encryptByAES, decryptByAES} from '../components/pages/Encryption.jsx';
const dummyData = {
    firstName: "test",
    lastName: "test",
    dateOfBirth: "yyyy-mm-dd",
    phone: encryptByAES("1234567890"),
    mail: encryptByAES("test@test.com"),
    addressLine1: "test",
    addressLine2: "test",
    state: "test",
    country: "test",
    pincode: "test",
    role: "AGENT VIEW",
    username: encryptByAES("test123")
};
describe('Create Order Component', () => {
    it('should render snapshot', () => {
        // Cookies.set('viewData', encryptByAES(JSON.stringify([dummyData])));
        const component = shallow(<CreateOrder />);
        expect(toJson(component)).toMatchSnapshot();
    });
    it('back to cart', ()=>{
        const wrapper = shallow(<CreateOrder />);
        wrapper.setState({
                 details: true
               });
                wrapper.update();
                expect(wrapper.state('details')).toEqual(true);
                expect(wrapper.find('#backToCart').length).toBe(1);
                const button = wrapper.find('#backToCart');
                button.simulate('click');
                   expect(wrapper.state('cart')).toEqual(true);
                   expect(wrapper.state('details')).toEqual(false);
                   expect(wrapper.state('percentForProgress')).toEqual(0);
    });
    it('Should render form', ()=>{
        Cookies.set('agentData', encryptByAES(JSON.stringify([dummyData])));
        const wrapper = shallow(<CreateOrder />);
        wrapper.setState({details:true});
        wrapper.update();
        const form = wrapper.find('#shippingDetails');
        expect(wrapper.find('#shippingDetails').length).toBe(1);
        const event = {
            preventDefault: () => {}
                    }
        wrapper.setState({
            name2:"Swati",
            addressLine1: "Mumbai",
            addressLine2:"India",
            city:"Delhi",
            pincode:"401105",
            myState2:"Maharashtra",
            contactNumber:"123456789",
            email:"a.@g.com"
        });
        wrapper.update();
        expect(wrapper.state('contactNumber')).toEqual('123456789');
        form.simulate('submit',event);
        expect(wrapper.state('phErrorMessage')).toEqual('Enter 10 a digit number');
        wrapper.setState({
            contactNumber:'1234567890'
        });
        wrapper.update();
        expect(wrapper.state('contactNumber')).toEqual('1234567890');
        form.simulate('submit',event);
        expect(wrapper.state('phErrorMessage')).toEqual('');
        expect(wrapper.state('percentForProgress')).toEqual(100);
    });
    it('Should render name input field from form', ()=>{
        const wrapper = shallow(<CreateOrder />);
        wrapper.setState({details:true});
        wrapper.update();
        const form = wrapper.find('#shippingDetails');
        expect(wrapper.find('#shippingDetails').length).toBe(1);
        const input = form.find('#name2');
        const event = {
                target: {
                    value:"Swati"
                }
            }
        input.simulate('change', event);
        expect(wrapper.state('name2')).toEqual('Swati');
    });
    it('Should render addressLine1 input field from form', ()=>{
        const wrapper = shallow(<CreateOrder />);
        wrapper.setState({details:true});
        wrapper.update();
        const form = wrapper.find('#shippingDetails');
        expect(wrapper.find('#shippingDetails').length).toBe(1);
        const input = form.find('#addressLine1');
        const event = {
                target: {
                    name:"addressLine1",
                    value:"Swati"
                }
            }
        input.simulate('change', event);
        expect(wrapper.state('addressLine1')).toEqual('Swati');
    });
    it('Should render addressLine2 input field from form', ()=>{
        const wrapper = shallow(<CreateOrder />);
        wrapper.setState({details:true});
        wrapper.update();
        const form = wrapper.find('#shippingDetails');
        expect(wrapper.find('#shippingDetails').length).toBe(1);
        const input = form.find('#addressLine2');
        const event = {
                target: {
                    value:"Swati"
                }
            }
        input.simulate('change', event);
        expect(wrapper.state('addressLine2')).toEqual('Swati');
    });
    it('Should render city input field from form', ()=>{
        const wrapper = shallow(<CreateOrder />);
        wrapper.setState({details:true});
        wrapper.update();
        const form = wrapper.find('#shippingDetails');
        expect(wrapper.find('#shippingDetails').length).toBe(1);
        const input = form.find('#city');
        const event = {
                target: {
                    name:"city",
                    value:"Swati"
                }
            }
        input.simulate('change', event);
        expect(wrapper.state('city')).toEqual('Swati');
    });
    
    it('Should render pincode input field from form', ()=>{
        const wrapper = shallow(<CreateOrder />);
        wrapper.setState({details:true});
        wrapper.update();
        const form = wrapper.find('#shippingDetails');
        expect(wrapper.find('#shippingDetails').length).toBe(1);
        const input = form.find('#pincode');
        const event = {
                target: {
                    name:"pincode",
                    value:"401105"
                }
            }
        input.simulate('change', event);
        expect(wrapper.state('pincode')).toEqual('401105');
    });
    it('Should render email input field from form', ()=>{
        const wrapper = shallow(<CreateOrder />);
        wrapper.setState({details:true});
        wrapper.update();
        const form = wrapper.find('#shippingDetails');
        expect(wrapper.find('#shippingDetails').length).toBe(1);
        const input = form.find('#email');
        const event = {
                target: {
                    name:"email",
                    value:"a@g.com"
                }
            }
        input.simulate('change', event);
        expect(wrapper.state('email')).toEqual('a@g.com');
    });
    it('Should render contact input field from form', ()=>{
        const wrapper = shallow(<CreateOrder />);
        wrapper.setState({details:true});
        wrapper.update();
        const form = wrapper.find('#shippingDetails');
        expect(wrapper.find('#shippingDetails').length).toBe(1);
        const input = form.find('#contactNumber');
        const event = {
                target: {
                    name:"contactNumber",
                    value:"1234567890"
                }
            }
        input.simulate('change', event);
        expect(wrapper.state('contactNumber')).toEqual('1234567890');
    });
    it('Should render search input field from form', ()=>{
        const wrapper = shallow(<CreateOrder />);
        wrapper.setState({cart:true,
        role:"AGENT",
        guest: false});
        wrapper.update();
        const form = wrapper.find('#searchCustomer');
        expect(wrapper.find('#searchCustomer').length).toBe(1);
        const input = form.find('#searchCustInput');
        const event = {
                target: {
                    value:"kasjain"
                }
            }
        input.simulate('change', event);
        expect(wrapper.state('customerUsername')).toEqual('kasjain');
    });
    it('Refresh button', () => {
        const historyMock = { push: jest.fn() };
        const wrapper = shallow(<CreateOrder history={historyMock}/>);
        expect(wrapper.find('#refreshButton').length).toEqual(0);
        
        wrapper.setState({showDetails:true});
        wrapper.update();
        const b = wrapper.find('#refreshButton');
        b.simulate('click',historyMock);
        expect(wrapper.state('cart')).toBe(true);
    });
    
    it('Should render following elements', () => {
        const wrapper = shallow(<CreateOrder />);
        const form = wrapper.find('ForwardRef');
        expect(form.length).toBe(4);
        expect(form.find('input').length).toBe(1);
        expect(form.find('Button').length).toBe(2);
        expect(form.find('Col').length).toBe(6);
        const b = wrapper.find('#nextButton');
        expect(b.length).toBe(1);
    });
    it('Should remove items from list', () => {
        const wrapper = shallow(<CreateOrder />);
        wrapper.setState({itemss:[
            {
                
                    productId:"PROD006", storeId:"dadsd", price:500, quantity:1
                
            
            }
		],
        noItems:"",
    pageTitle:"Oops...Your Cart is Empty.",
cart:true});
        wrapper.update();
        expect(wrapper.state('itemss').length).toBe(1);
        const button=wrapper.find('#removeButton');
        button.simulate('click')
        expect(wrapper.state('itemss').length).toEqual(0);
       
    });
});
describe('search Customer', () => {
    it('search customer functionality', () => {
        const wrapper = shallow(<CreateOrder />);
        wrapper.setState({ cart : true,
        guest: false,
        role:"AGENT"});
        wrapper.update();
        const form = wrapper.find('#searchCustomer');
        expect(wrapper.find('#searchCustomer').length).toBe(1);
        const input = wrapper.find('#searchCustInput');
        input.simulate('submit');
        //expect(wrapper.state('loadingCustomer')).toEqual("loading");
    });
});
describe('Shipping detail page', () => {
    it('goto save page is called', () => {
    const wrapper = shallow(<CreateOrder />);
        wrapper.setState({
            details: false,
            cart: true,
            pagetitle: "Shopping Cart",
            percentForProgress: 0
    });
      expect(wrapper.find('#nextButton').length).toBe(1);
      const button = wrapper.find('#nextButton');
      button.simulate('click');
      wrapper.update();
      expect(wrapper.state('loading')).toEqual(true);
    });
    it('Should render productId input field from form', ()=>{
        const wrapper = shallow(<CreateOrder />);
        wrapper.setState({details:true});
        wrapper.update();
        const form = wrapper.find('#inputProduct');
        expect(wrapper.find('#inputProduct').length).toBe(1);
        const input = form.find('#inputProduct');
        const event = {
                preventDefault: () => {},
                target: {
                    value:"123"
                }
            }
        input.simulate('change', event);
        expect(wrapper.state('productId')).toEqual('123');
    });
    it('Should handlechange input field from form', ()=>{
        const wrapper = shallow(<CreateOrder />);
        wrapper.setState({cart:true,
            itemss:[
            {
                itemss:[{
                    productId:"PROD006", storeId:"dadsd", price:500, quantity:1
                }
			]}],
        noItems:"",
        pageTitle:"Oops...Your Cart is Empty.",});
        wrapper.update();
        const input = wrapper.find('#quantInp');
        expect(wrapper.find('#quantInp').length).toBe(1);
        const event = {
                preventDefault: () => {},
                target: {
                    value:"2"
                }
            }
        input.simulate('change', event,"2","PROD006",500);
        expect(wrapper.state('typed')).toEqual('2');
    });

	it('Should show error message when product id is empty', () => {
        const wrapper = shallow(<CreateOrder />);
        wrapper.setState({productId:"",
            errorMessage:"You need to enter an item name"});
        wrapper.update();
        //expect(wrapper.state('itemss').length).toBe(1);
        const button=wrapper.find('#handle');
        button.simulate('click')
        //expect(wrapper.state('itemss').length).toEqual(0);
        expect(wrapper.state('errorMessage')).toEqual('You need to enter an item name');
    });

	it('Search customer is called', () => {
        const wrapper = shallow(<CreateOrder />);
        const event = {
            preventDefault:()=>{ }
        }
        wrapper.setState({guest:false,
        });
        wrapper.update();
        const form=wrapper.find('#searchCustomer');
        form.simulate('submit',event);
        expect(wrapper.state('loadingCustomer')).toEqual('loading');
    });
    
});
