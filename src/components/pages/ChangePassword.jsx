import React from 'react';
import axios from 'axios';
import AgentTemplate from "../templates/AgentTemplate/Template.jsx";
import AdminTemplate from "../templates/AdminTemplate/Template.jsx";
import CustomerTemplate from "../templates/CustomerTemplate/Template.jsx";
import {Button, Form, Col, Row} from 'react-bootstrap';
import Cookies from 'js-cookie';
import '../../css/global.css';
import '../../css/registerCSS.css';
import { decryptByAES, encryptByAES } from './Encryption.jsx';
import Config from "../../config/urls.jsx";


const passwordRegex = RegExp(/^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%!]).{8,40}$/);

const formValid = ({ formErrors, ...rest }) => {
	let valid = true;
	Object.values(formErrors).forEach(val => {
    	val.length > 0 && (valid = false);
  	});

  	Object.values(rest).forEach(val => {
    	val === null && (valid = false);
  	});
	return valid;
};

export default class ChangePassword extends React.Component {
	constructor(props){
    	super(props)
    	this.changePassword=this.changePassword.bind(this);
  		this.handleChange=this.handleChange.bind(this);

	    this.state = {
    		username: '',
			oldPassword: '',
			newPassword: '',
			confirmPassword: '',
			validCredential: '',
			changePasswordResultMsg: '',
			formErrors: {
      			oldPassword:'',
				newPassword: '',
				confirmPassword: ''
    		}
  		};
	}

	handleChange(e) {
  		e.preventDefault();
  		const {name, value} = e.target;
  		let formErrors = { ...this.state.formErrors};
  		switch(name) {
    		case "oldPassword":
    			formErrors.oldPassword =
    			(oldPassword.value === newPassword.value) ? "New Password must not match Old Password" : "";
    		break;
    		case "newPassword":
	   			formErrors.confirmPassword =
				(newPassword.value !== confirmPassword.value) ? "Entered password doesn't match with New Password" : "";
      			formErrors.newPassword =
	  			!(passwordRegex.test(value)) ? "Password must have 8 or more characters and must have at least a uppercase letter, lowercase letter, number and special character" : '';
      			formErrors.oldPassword =
      			(oldPassword.value === newPassword.value) ? "New Password must not match Old Password" : "";
      		break;
    		case "confirmPassword":
      			formErrors.confirmPassword =
      			(newPassword.value !== confirmPassword.value) ? "Entered password doesn't match with New Password" : "";
	  		break;
    		default:
      		break;
 		}
    	this.setState({validCredential: ""});
    	this.setState({ formErrors, [name]: value });
	}

	changePassword(e) {
  		e.preventDefault();
  		if(formValid(this.state)) {
			let username = '';
			if(Cookies.get('adminData')) {
				username = decryptByAES(JSON.parse(decryptByAES(Cookies.get('adminData')))[0].username)
			}
			else if(Cookies.get('agentData')) {
				username = decryptByAES(JSON.parse(decryptByAES(Cookies.get('agentData')))[0].username)
			}
		 	else {
				username = decryptByAES(JSON.parse(decryptByAES(Cookies.get('customerData')))[0].username)
			}
    	let oldPassword = encryptByAES(this.state['oldPassword']);
   		let newPassword = encryptByAES(this.state['newPassword']);
		const password = {
        	"username" : encryptByAES(username),
			"currentPassword" : oldPassword,
			"newPassword" : newPassword
    	};
		var url = Config.serverUrl + '/signup/password';
		axios.put(url, password)
     	.then(res => {
   			if(res.data===true) {
				this.setState({changePasswordResultMsg: "Password changed successfully!"});
				this.setState({validCredential: ""});
	   			if(Cookies.get('adminData')) {
   					Cookies.remove('adminData');
	   	 		}
	   			else if(Cookies.get('agentData')) {
		   			Cookies.remove('agentData');
	    		}
				else {
					Cookies.remove('customerData');
				}
				setTimeout(() => {
					this.props.history.push('/')
				  }, 1500);
			}
			else {
    			this.setState({validCredential: "Old password is not correct!"});
 			}
 		}
 		).catch(err => {
         	this.setState({validCredential: "Old password is not correct!"});
			});
  		}

   	 	else {
    		this.setState({validCredential: "Please enter valid Credentials"});
   		}
	}

	render(){
  		const { formErrors } = this.state;

  		if(Cookies.get('adminData')) {
			return (
				<AdminTemplate>
				
				<div className="register-wrap" style={{height: "600px"}}>
					<br/>
					<br/>
					<br/>
					<br/>
				<h1 className="fontWhite">Change Password</h1>
  				<div align="center" className="Oms register-html">
			    <span className="bigSuccessMessage">{this.state.changePasswordResultMsg}</span>
				<span className="bigErrorMessage">{this.state.validCredential}</span>
				<Form className="MyForm register-form" onSubmit={this.changePassword}>
				<Form.Group as={Row} controlId="oldPassword">
				<Col sm={5} md={5}>
				<Form.Label className="Labelling label">Old Password*</Form.Label>
				</Col>
				<Col  sm={7} md={7}>
				<Form.Control name="oldPassword" type="password" placeholder="Old Password" ref="username" onChange={this.handleChange} required/>
				</Col>
				</Form.Group>
				{formErrors.oldPassword.length > 0 && (
	  				<span className="errorMessage">{formErrors.oldPassword}</span>
				)}
				<Form.Group as={Row} controlId="newPassword">
				<Col sm={5} md={5}>
				<Form.Label className="Labelling label">New Password*</Form.Label>
				</Col>
				<Col sm={7} md={7}>
				<Form.Control name="newPassword" type="password" onCopy="return false" onCut="return false" placeholder="New Password" ref="newPassword" onChange={this.handleChange} required/>
				</Col>
				</Form.Group>
				{formErrors.newPassword.length > 0 && (
	  				<span className="errorMessage">{formErrors.newPassword}</span>
				)}
				<Form.Group as={Row} controlId="confirmPassword">
				<Col sm={5} md={5}>
				<Form.Label className="Labelling label">Confirm Password*</Form.Label>
				</Col>
				<Col sm={7} md={7}>
				<Form.Control name="confirmPassword" type="password" placeholder="Confirm Password" ref="confirmPassword" onChange={this.handleChange} required/>
				</Col>
				</Form.Group>
				{formErrors.confirmPassword.length > 0 && (
	  				<span className="errorMessage">{formErrors.confirmPassword}</span>
				)}
				<br></br>
				<br></br>
				<p className="mandatoryFields">* Fields are mandatory</p>
				<Button className="signIn" variant="primary" type="submit">Save Changes</Button>
				</Form>
				</div>
				</div>
				  </AdminTemplate>
			);
		}

 		else if(Cookies.get('agentData')){
    		return(
        		<AgentTemplate>
				<div className="register-wrap" style={{height: "650px"}}>
				<br/>
					<br/>
					<br/>
					<br/>
          		<h1 className="fontWhite">Change Password</h1>
				 
        		<div align="center" className="Oms register-html">
				<span className="bigSuccessMessage">{this.state.changePasswordResultMsg}</span>
				<span className="bigErrorMessage">{this.state.validCredential}</span>
				<Form className="MyForm register-form" onSubmit={this.changePassword}>
          		<Form.Group as={Row} controlId="oldPassword">
         		<Col sm={5} md={5}>
          		<Form.Label className="Labelling label">Old Password*</Form.Label>
          		</Col>
          		<Col  sm={7} md={7}>
          		<Form.Control name="oldPassword" type="password" placeholder="Old Password" ref="username" onChange={this.handleChange} required/>
          		</Col>
          		</Form.Group>
          		{formErrors.oldPassword.length > 0 && (
            		<span className="errorMessage">{formErrors.oldPassword}</span>
		  		)}
          		<Form.Group as={Row} controlId="newPassword">
          		<Col sm={5} md={5}>
          		<Form.Label className="Labelling label">New Password*</Form.Label>
          		</Col>
          		<Col sm={7} md={7}>
          		<Form.Control name="newPassword" type="password" onCopy="return false" onCut="return false" placeholder="New Password" ref="newPassword" onChange={this.handleChange} required/>
          		</Col>
          		</Form.Group>
          		{formErrors.newPassword.length > 0 && (
            		<span className="errorMessage">{formErrors.newPassword}</span>
		  		)}
		  		<Form.Group as={Row} controlId="confirmPassword">
          		<Col sm={5} md={5}>
          		<Form.Label className="Labelling label">Confirm Password*</Form.Label>
          		</Col>
          		<Col sm={7} md={7}>
          		<Form.Control name="confirmPassword" type="password" placeholder="Confirm Password" ref="confirmPassword" onChange={this.handleChange} required/>
          		</Col>
          		</Form.Group>
          		{formErrors.confirmPassword.length > 0 && (
           			<span className="errorMessage">{formErrors.confirmPassword}</span>
          		)}
          		<br></br>
		  		<br></br>
		  		<p className="mandatoryFields">* Fields are mandatory</p>
          		<Button className="signIn" variant="primary" type="submit">Save Changes</Button>
      			</Form>
      			</div>
				  </div>
        		</AgentTemplate>
			);
		}

		else {
			return(
				<CustomerTemplate>
				<div className="register-wrap" style={{height: "600px"}}>
				<br/>
					<br/>
					<br/>
					<br/>
	  			<h1 className="fontWhite">Change Password</h1>
				 
				<div align="center" className="Oms register-html">
				<span className="bigSuccessMessage">{this.state.changePasswordResultMsg}</span>
				<span className="bigErrorMessage">{this.state.validCredential}</span>
				<Form className="MyForm register-form" onSubmit={this.changePassword}>
	  			<Form.Group as={Row} controlId="oldPassword">
	  			<Col sm={5} md={5}>
	  			<Form.Label className="Labelling label">Old Password*</Form.Label>
	  			</Col>
	  			<Col  sm={7} md={7}>
	  			<Form.Control name="oldPassword" type="password" placeholder="Old Password" ref="username" onChange={this.handleChange} required/>
	  			</Col>
	  			</Form.Group>
	  			{formErrors.oldPassword.length > 0 && (
					<span className="errorMessage">{formErrors.oldPassword}</span>
	  			)}
	  			<Form.Group as={Row} controlId="newPassword">
	  			<Col sm={5} md={5}>
	  			<Form.Label className="Labelling label">New Password*</Form.Label>
	 			</Col>
	  			<Col sm={7} md={7}>
	  			<Form.Control name="newPassword" type="password" onCopy="return false" onCut="return false" placeholder="New Password" ref="newPassword" onChange={this.handleChange} required/>
	  			</Col>
	  			</Form.Group>
	  			{formErrors.newPassword.length > 0 && (
					<span className="errorMessage">{formErrors.newPassword}</span>
	  			)}
	  			<Form.Group as={Row} controlId="confirmPassword">
	  			<Col sm={5} md={5}>
	  			<Form.Label className="Labelling label">Confirm Password*</Form.Label>
	  			</Col>
	  			<Col sm={7} md={7}>
	  			<Form.Control name="confirmPassword" type="password" placeholder="Confirm Password" ref="confirmPassword" onChange={this.handleChange} required/>
	  			</Col>
	  			</Form.Group>
	  			{formErrors.confirmPassword.length > 0 && (
					<span className="errorMessage">{formErrors.confirmPassword}</span>
	  			)}
	  			<br></br>
	  			<br></br>
	  			<p className="mandatoryFields">* Fields are mandatory</p>
	  			<Button className="signIn" variant="primary" type="submit">Save Changes</Button>
  				</Form>
  				</div>
				  </div>
				</CustomerTemplate>
			);
		}
	}
}



