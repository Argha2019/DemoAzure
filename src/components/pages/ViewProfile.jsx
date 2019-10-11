import React from 'react';
import Cookies from 'js-cookie';
import ViewTemplate from "../templates/ViewTemplate/Template.jsx";
import { Row, Col, Form } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { decryptByAES } from './Encryption.jsx';

/**
 * @author Arghadeep Mandal
 * This file is responsible for making the header and footer template for role:"VIEW"
 * which is always rendered in every page. 
 */


export default class ViewProfile extends React.Component {
	constructor(props) {
		super(props);
		let profileData = {};
		try {
			profileData = JSON.parse(decryptByAES(Cookies.get('viewData')))[0];
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
				dateOfBirth: ''
			};
		}
		this.state = {
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
		};
	}




	render() {
		return (
			<ViewTemplate>
				<div className="register-wrap" style={{ height: "1000px" }}>
				<br />
					<br />
					<br />
					<br />
					<h1 className="fontWhite">Profile</h1>
					<div className="Oms register-html">
					<Form className="MyForm register-form">
						<Form.Group as={Row} controlId="username">
							<Col sm={4} md={3} className="alignLabel">
								<Form.Label className="label Labelling">Username</Form.Label>
							</Col>
							<Col sm={8} md={9}>
								<Form.Control name="username" type="text" defaultValue={this.state.username} ref="username" readOnly required />
							</Col>
						</Form.Group>

						<Form.Group as={Row} controlId="role">
							<Col sm={4} md={3} className="alignLabel">
								<Form.Label className="label Labelling">Role</Form.Label>
							</Col>
							<Col sm={8} md={9}>
								<Form.Control name="role" type="text" defaultValue={this.state.role} ref="role" readOnly required />
							</Col>
						</Form.Group>

						<Form.Group as={Row} controlId="firstName">
							<Col sm={4} md={3} className="alignLabel">
								<Form.Label className="label Labelling">First Name</Form.Label>
							</Col>
							<Col sm={8} md={9}>
								<Form.Control className="firstName" name="firstName" type="text" defaultValue={this.state.firstName} ref="firstName" readOnly required />
							</Col>
						</Form.Group>

						<Form.Group as={Row} controlId="lastName">
							<Col sm={4} md={3} className="alignLabel">
								<Form.Label className="label Labelling">Last Name</Form.Label>
							</Col>
							<Col sm={8} md={9}>
								<Form.Control className="lastName" name="lastName" type="text" defaultValue={this.state.lastName} ref="lastName" readOnly required />
							</Col>
						</Form.Group>

						<Form.Group as={Row} controlId="dateOfBirth">
							<Col sm={4} md={3} className="alignLabel">
								<Form.Label className="label Labelling">Date of Birth</Form.Label>
							</Col>
							<Col sm={8} md={9}>
								<Form.Control name="dateOfBirth" type="date" defaultValue={this.state.dateOfBirth} ref="dateOfBirth" readOnly required />
							</Col>
						</Form.Group>

						<Form.Group as={Row} controlId="phone">
							<Col sm={4} md={3} className="alignLabel">
								<Form.Label className="label Labelling">Phone</Form.Label>
							</Col>
							<Col sm={8} md={9}>
								<Form.Control className="phone" name="phone" type="number" defaultValue={this.state.phone} ref="phone" readOnly required />
							</Col>
						</Form.Group>

						<Form.Group as={Row} controlId="mail">
							<Col sm={4} md={3} className="alignLabel">
								<Form.Label className="label Labelling">Mail ID</Form.Label>
							</Col>
							<Col sm={8} md={9}>
								<Form.Control className="mail" name="mail" type="email" defaultValue={this.state.mail} ref="mail" readOnly required />
							</Col>
						</Form.Group>

						<Form.Group as={Row} controlId="addressLine1">
							<Col sm={4} md={3} className="alignLabel">
								<Form.Label className="label Labelling">Address Line 1</Form.Label>
							</Col>
							<Col sm={8} md={9}>
								<Form.Control className="addressLine1" name="addressLine1" type="text" defaultValue={this.state.addressLine1} ref="addressLine1" readOnly required />
							</Col>
						</Form.Group>

						<Form.Group as={Row} controlId="addressLine2">
							<Col sm={4} md={3} className="alignLabel">
								<Form.Label className="label Labelling">Address Line 2</Form.Label>
							</Col>
							<Col sm={8} md={9}>
								<Form.Control className="addressLine2" name="addressLine2" type="text" defaultValue={this.state.addressLine2} ref="addressLine2" readOnly required />
							</Col>
						</Form.Group>

						<Form.Group as={Row} controlId="state">
							<Col sm={4} md={3} className="alignLabel">
								<Form.Label className="label Labelling">State</Form.Label>
							</Col>
							<Col sm={8} md={9}>
								<Form.Control className="state" name="state" type="text" defaultValue={this.state.state} ref="state" readOnly required />
							</Col>
						</Form.Group>

						<Form.Group as={Row} controlId="country">
							<Col sm={4} md={3} className="alignLabel">
								<Form.Label className="label Labelling">Country</Form.Label>
							</Col>
							<Col sm={8} md={9}>
								<Form.Control className="country" name="country" type="text" defaultValue={this.state.country} ref="country" readOnly required />
							</Col>
						</Form.Group>

						<Form.Group as={Row} controlId="pincode">
							<Col sm={4} md={3} className="alignLabel">
								<Form.Label className="label Labelling">Pincode</Form.Label>
							</Col>
							<Col sm={8} md={9}>
								<Form.Control className="pincode" name="pincode" type="number" defaultValue={this.state.pincode} ref="pincode" readOnly required />
							</Col>
						</Form.Group>
					</Form>
				</div>
				</div>
			</ViewTemplate>
		);
	}
}
