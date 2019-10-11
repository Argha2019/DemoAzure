import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import AgentTemplate from "../templates/AgentTemplate/Template.jsx";
import { Row, Col, Form, Button } from 'react-bootstrap';
import { encryptByAES, decryptByAES } from './Encryption.jsx';
import Config from "../../config/urls.jsx";

const alphabetRegex = RegExp(/^[A-Za-z]{1,20}$/);
const placeRegex = RegExp(/^[a-zA-Z ]{1,49}$/);
const mailRegex = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_/'{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

const formValid = ({ formErrors, ...rest }) => {
	let valid = true;

	// validate form errors being empty
	Object.values(formErrors).forEach(val => {
		val.length > 0 && (valid = false);
	});

	// validate the form was filled out
	Object.values(rest).forEach(val => {
		val === null && (valid = false);
	});

	return valid;
};

export default class AgentProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = { readOnly: true }
		this.handleChange = this.handleChange.bind(this);
		this.editProfile = this.editProfile.bind(this);
		this.cancelProfile = this.cancelProfile.bind(this);
		this.submitProfile = this.submitProfile.bind(this);
		let profileData = {};
		try {
			profileData = JSON.parse(decryptByAES(Cookies.get('agentData')))[0];
		}
		catch (e) {
			profileData = {
				firstName: '',
				lastName: '',
				username: '',
				role: '',
				phone: '',
				mail: '',
				addressLine1: '',
				addressLine2: '',
				state: '',
				country: '',
				pincode: '',
				dateOfBirth: '',
				status: ''
			};
		}
		this.state = {
			successMessage: '',
			errorMessage: '',
			firstName: profileData.firstName,
			lastName: profileData.lastName,
			dateOfBirth: profileData.dob,
			phone: decryptByAES(profileData.phone),
			mail: decryptByAES(profileData.mail),
			addressLine1: profileData.addressLine1,
			addressLine2: profileData.addressLine2,
			state: profileData.state,
			country: profileData.country,
			pincode: profileData.pinCode,
			role: profileData.roles,
			username: decryptByAES(profileData.username),
			status: profileData.status,
			password: profileData.password,
			edit: false,
			submit: false,
			user: {},
			formErrors: {
				firstName: '',
				lastName: '',
				username: '',
				role: '',
				phone: '',
				mail: '',
				addressLine1: '',
				addressLine2: '',
				state: '',
				country: '',
				pincode: '',
				dateOfBirth: ''
			}

		};
	}

	dateValidator() {
		var date = new Date();
		date.setDate(date.getDate() - 1);
		var dateEntered = new Date(document.getElementById('dob1').value);
		if (date.getFullYear() - dateEntered.getFullYear() < 18) {
			return true;
		}

		if (date.getFullYear() - dateEntered.getFullYear() == 18) {

			//CD: 11/06/2018 and DB: 15/07/2000. Will turned 18 on 15/07/2018.
			if (dateEntered.getMonth() > date.getMonth()) {
				return true;
			}
			if (dateEntered.getMonth() == date.getMonth()) {
				//CD: 11/06/2018 and DB: 15/06/2000. Will turned 18 on 15/06/2018.
				if (dateEntered.getDate() > date.getDate()) {
					return true;
				}
			}
		}
	}

	handleChange(e) {
		e.preventDefault();
		const { name, value } = e.target;
		let formErrors = { ...this.state.formErrors };
		switch (name) {
			case "firstName":
				formErrors.firstName =
					!(alphabetRegex.test(value)) ? "Name should contain only alphabets and character limit is (2-20) characters" : "";
				break;
			case "lastName":
				formErrors.lastName =
					!(alphabetRegex.test(value)) ? "Name should contain only alphabets and character limit is (2-20) characters" : "";
				break;
			case "phone":
				formErrors.phone =
					(value.length == 10) ? "" : "Number of digit must be 10";
				break;
			case "mail":
				formErrors.mail =
					!(mailRegex.test(value)) ? "Enter valid mail" : "";
				break;
			case "addressLine1":
				formErrors.addressLine1 =
					(value.length > 50) ? "Exceeded the characters limit of 50" : "";
				break;
			case "addressLine2":
				formErrors.addressLine2 =
					(value.length > 50) ? "Exceeded the characters limit of 50" : "";
				break;
			case "state":
				formErrors.state =
					!(placeRegex.test(value)) ? "Only alphabets allowed and character limit is 50" : "";
				break;
			case "country":
				formErrors.country =
					!(placeRegex.test(value)) ? "Only alphabets allowed and character limit is 50" : "";
				break;
			case "pincode":
				formErrors.pincode =
					(value.length === 6) ? "" : "Number of digit must be 6";
				break;
			case "dateOfBirth":
				formErrors.dateOfBirth =
					(this.dateValidator()) ? "Current or future date is not allowed. The user must be 18 years old." : "";
				break;
			default:
				break;
		}
		this.setState({ formErrors, [name]: value });
	}

	editProfile(e) {
		e.preventDefault();
		this.setState({
			edit: !this.state.edit

		})
		this.setState(prevState => ({ readOnly: !prevState.readOnly }))

	}
	cancelProfile(e) {
		e.preventDefault();
		this.setState({
			edit: !this.state.edit
		})
		this.setState(prevState => ({ readOnly: !prevState.readOnly }))

	}

	submitProfile(e) {
		e.preventDefault();
		if (formValid(this.state)) {
			let user = {
				"id": encryptByAES((JSON.parse(decryptByAES(Cookies.get('agentData')))[0].id)),
				"firstName": this.state['firstName'],
				"lastName": this.state['lastName'],
				"mail": encryptByAES(this.state['mail']),
				"username": encryptByAES(this.state['username']),
				"roles": this.state['role'],
				"phone": encryptByAES(this.state['phone']),
				"addressLine1": this.state['addressLine1'],
				"addressLine2": this.state['addressLine2'],
				"state": this.state['state'],
				"country": this.state['country'],
				"pinCode": this.state['pincode'],
				"dob": this.state['dateOfBirth'],
				"status": JSON.parse(decryptByAES(Cookies.get('agentData')))[0].status,
				"password": encryptByAES("Abcde@123"),
				"accessToken": JSON.parse(decryptByAES(Cookies.get('agentData')))[0].accessToken,
				"refreshToken": JSON.parse(decryptByAES(Cookies.get('agentData')))[0].refreshToken,
				"expireTime": JSON.parse(decryptByAES(Cookies.get('agentData')))[0].expireTime
			}

			var url = Config.serverUrl + '/signup/update';

			axios.put(url, user)
				.then(
					response => {
						this.setState({ user: response.data });
						this.setState({ submit: true });
						Cookies.set('agentData', encryptByAES(JSON.stringify([user])));

						if (response.data === true) {
							this.setState({ successMessage: "You have successfully updated the profile." });
							this.setState({errorMessage : ""});
							window.scrollTo({
								top: 0,
								behavior: 'smooth'
							  });
						}
						else {
							this.setState({ errorMessage: "Please try again." });
							window.scrollTo({
								top: 0,
								behavior: 'smooth'
							  });
						}
					}

				)

			this.setState({
				edit: !this.state.edit
			})
			this.setState(prevState => ({ readOnly: !prevState.readOnly }))
		}
		else {
			this.setState({ errorMessage: "Please fill all fields correctly." });
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			  });
		}
	}


	render() {
		const { formErrors } = this.state;

		return (
			<AgentTemplate>
				<div className="register-wrap">
					<br />
					<br />
					<br />
					<br />
					<h1 className="fontWhite">Profile</h1>
					<div className="Oms register-html">

						{this.state.successMessage.length > 0 && (
							<span className="successMessage">{this.state.successMessage}</span>
						)}

						{this.state.errorMessage.length > 0 && (
							<span className="errorMessage">{this.state.errorMessage}</span>
						)}
						<br/><br/>
						<Form className="MyForm register-form">
							<Form.Group as={Row} controlId="username">
								<Col sm={4} md={3} className="alignLabel">
									<Form.Label className="Labelling label">Username</Form.Label>
								</Col>
								<Col sm={8} md={9}>
									<Form.Control name="username" type="text" defaultValue={this.state.username} ref="username" readOnly required />
								</Col>
							</Form.Group>

							<Form.Group as={Row} controlId="role">
								<Col sm={4} md={3} className="alignLabel">
									<Form.Label className="Labelling label">Role</Form.Label>
								</Col>
								<Col sm={8} md={9}>
									<Form.Control name="role" type="text" defaultValue={this.state.role} ref="role" readOnly required />
								</Col>
							</Form.Group>

							<Form.Group as={Row} controlId="firstName">
								<Col sm={4} md={3} className="alignLabel">
									<Form.Label className="Labelling label">First Name</Form.Label>
								</Col>
								<Col sm={8} md={9}>
									<Form.Control className="firstName" name="firstName" type="text" defaultValue={this.state.firstName} ref="firstName" readOnly={!this.state.readOnly} onChange={this.handleChange} required />
									{formErrors.firstName.length > 0 && (
										<span className="errorMessage">{formErrors.firstName}</span>
									)}
								</Col>
							</Form.Group>

							<Form.Group as={Row} controlId="lastName">
								<Col sm={4} md={3} className="alignLabel">
									<Form.Label className="Labelling label">Last Name</Form.Label>
								</Col>
								<Col sm={8} md={9}>
									<Form.Control className="lastName" name="lastName" type="text" defaultValue={this.state.lastName} ref="lastName" readOnly={!this.state.readOnly} onChange={this.handleChange} required />
									{formErrors.lastName.length > 0 && (
										<span className="errorMessage">{formErrors.lastName}</span>
									)}
								</Col>
							</Form.Group>

							<Form.Group as={Row} controlId="dateOfBirth">
								<Col sm={4} md={3} className="alignLabel">
									<Form.Label className="Labelling label">Date of Birth</Form.Label>
								</Col>
								<Col sm={8} md={9}>
									<Form.Control id="dob1" className="dateOfBirth" name="dateOfBirth" type="date" defaultValue={this.state.dateOfBirth} ref="dateOfBirth" readOnly={!this.state.readOnly} onChange={this.handleChange} required />
									{formErrors.dateOfBirth.length > 0 && (
										<span className="errorMessage">{formErrors.dateOfBirth}</span>
									)}
								</Col>
							</Form.Group>

							<Form.Group as={Row} controlId="phone">
								<Col sm={4} md={3} className="alignLabel">
									<Form.Label className="Labelling label">Phone</Form.Label>
								</Col>
								<Col sm={8} md={9}>
									<Form.Control className="phone" name="phone" type="number" defaultValue={this.state.phone} ref="phone" readOnly={!this.state.readOnly} onChange={this.handleChange} required />
									{formErrors.phone.length > 0 && (
										<span className="errorMessage">{formErrors.phone}</span>
									)}
								</Col>
							</Form.Group>

							<Form.Group as={Row} controlId="mail">
								<Col sm={4} md={3} className="alignLabel">
									<Form.Label className="Labelling label">Mail ID</Form.Label>
								</Col>
								<Col sm={8} md={9}>
									<Form.Control className="mail" name="mail" type="email" defaultValue={this.state.mail} ref="mail" readOnly={!this.state.readOnly} onChange={this.handleChange} required />
									{formErrors.mail.length > 0 && (
										<span className="errorMessage">{formErrors.mail}</span>
									)}
								</Col>
							</Form.Group>

							<Form.Group as={Row} controlId="addressLine1">
								<Col sm={4} md={3} className="alignLabel">
									<Form.Label className="Labelling label">Address Line 1</Form.Label>
								</Col>
								<Col sm={8} md={9}>
									<Form.Control className="addressLine1" name="addressLine1" type="text" defaultValue={this.state.addressLine1} ref="addressLine1" readOnly={!this.state.readOnly} onChange={this.handleChange} required />
									{formErrors.addressLine1.length > 0 && (
										<span className="errorMessage">{formErrors.addressLine1}</span>
									)}
								</Col>
							</Form.Group>

							<Form.Group as={Row} controlId="addressLine2">
								<Col sm={4} md={3} className="alignLabel">
									<Form.Label className="Labelling label">Address Line 2</Form.Label>
								</Col>
								<Col sm={8} md={9}>
									<Form.Control className="addressLine2" name="addressLine2" type="text" defaultValue={this.state.addressLine2} ref="addressLine2" readOnly={!this.state.readOnly} onChange={this.handleChange} required />
									{formErrors.addressLine2.length > 0 && (
										<span className="errorMessage">{formErrors.addressLine2}</span>
									)}
								</Col>
							</Form.Group>

							<Form.Group as={Row} controlId="state">
								<Col sm={4} md={3} className="alignLabel">
									<Form.Label className="Labelling label">State</Form.Label>
								</Col>
								<Col sm={8} md={9}>
									<Form.Control className="state" name="state" type="text" defaultValue={this.state.state} ref="state" readOnly={!this.state.readOnly} onChange={this.handleChange} required />
									{formErrors.state.length > 0 && (
										<span className="errorMessage">{formErrors.state}</span>
									)}
								</Col>
							</Form.Group>

							<Form.Group as={Row} controlId="country">
								<Col sm={4} md={3} className="alignLabel">
									<Form.Label className="Labelling label">Country</Form.Label>
								</Col>
								<Col sm={8} md={9}>
									<Form.Control className="country" name="country" type="text" defaultValue={this.state.country} ref="country" readOnly={!this.state.readOnly} onChange={this.handleChange} required />
									{formErrors.country.length > 0 && (
										<span className="errorMessage">{formErrors.country}</span>
									)}
								</Col>
							</Form.Group>

							<Form.Group as={Row} controlId="pincode">
								<Col sm={4} md={3} className="alignLabel">
									<Form.Label className="Labelling label">Pincode</Form.Label>
								</Col>
								<Col sm={8} md={9}>
									<Form.Control className="pincode" name="pincode" type="number" defaultValue={this.state.pincode} ref="pincode" readOnly={!this.state.readOnly} onChange={this.handleChange} required />
									{formErrors.pincode.length > 0 && (
										<span className="errorMessage">{formErrors.pincode}</span>
									)}
								</Col>
							</Form.Group>
							{this.state.edit == false && (
								<div className="editButtonDiv">
									<Button className="RegisterButton" variant="primary" type="submit" onClick={this.editProfile}>Edit</Button>
								</div>
							)}

							{this.state.edit == true && (
								<div className="editProfileDiv">
									<Button className="RegisterButton" id="submit1" variant="primary" type="submit" onClick={this.submitProfile}>Submit</Button>
									<span></span>

									<Button className="RegisterButton" variant="primary" type="submit" onClick={this.cancelProfile}>Cancel</Button>
								</div>
							)}
						</Form>
					</div>
				</div>
			</AgentTemplate>
		);
	}
}
