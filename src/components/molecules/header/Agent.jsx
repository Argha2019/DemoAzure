import React from 'react';
import { Navbar } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import '../../../css/global.css';
import { withRouter } from 'react-router-dom';
import pic from '../../../OMSFinal.png';
import search from '../../../images.png';
import { Row,Col } from "react-bootstrap";
import axios from 'axios';
import Cookies from 'js-cookie';
import { encryptByAES, decryptByAES } from '../../pages/Encryption.jsx';
import Config from "../../../config/urls.jsx";


/**
 * @author kasjain(Kashish Jain)
 * This file is responsible for making the header navigation bar for AGENT at molecule level.
 */

type Props = {
	children: React.Node,
	className: string,
}

/**
 * This function is called when the user clicks logout in navigation bar.
 */

function logout() {
	var url = Config.serverUrl + '/signin/logout';

	axios.post(url , encryptByAES(JSON.parse(decryptByAES(Cookies.get('agentData')))[0].accessToken), {headers: {'Content-Type': 'application/json'}})
		.then(res=>
			
	Cookies.remove('agentData'));
}

const Header = (props: Props): React.Element<*> => {

	return (
	/**
	* This gives the navigation bar.
	* @return navigation bar for AGENT.
	*/
		<div>
		<Navbar className="headerfont" bg="dark" expand="lg" variant="dark" fixed="top">
			<Navbar.Brand href="#/loginAgent"> 
				<img src={pic} width="40px" className = "headerImage" alt="Comapny Logo" />
				<span className= "font">OMS</span>
			</Navbar.Brand>
			<Navbar.Collapse id="basic-navbar-nav">
			</Navbar.Collapse>
			<Row className="rowAlign" md={12}>
				<Col className="nav" md={12}>
				<Navbar.Brand href="#/loginAgent">
					<img src={search} className = "searchHeader" alt="Search Button" />
				</Navbar.Brand>
				<div className = "font">Hi {JSON.parse(decryptByAES(Cookies.get('agentData')))[0].firstName}</div>
				<NavDropdown title="⚙️" id="basic-nav-dropdown">
					<i><NavDropdown.Item className="fa fa-user" href="#/agentProfile"> <span>My Profile</span></NavDropdown.Item></i>
					<i><NavDropdown.Item className="fa fa-plus-square" href="#/createOrder"  ><span>Create Order</span></NavDropdown.Item></i>
					<i><NavDropdown.Item className="fa fa-eye" href="#/viewOrder" > <span>View Order</span></NavDropdown.Item></i>
					<i><NavDropdown.Item className="fa fa-user-plus" href="#/register" ><span>Register User</span></NavDropdown.Item></i>
					<i><NavDropdown.Item className="fa fa-th" href="#/adjustInventory" > <span>Adjust Inventory</span></NavDropdown.Item></i>
					<i><NavDropdown.Item className="fa fa-key" href="#/changePassword" > <span>Change Password</span></NavDropdown.Item></i>
					<i><NavDropdown.Item className="fa fa-sign-out" href="#/" onClick = {() =>logout()}> <span>Log out</span></NavDropdown.Item></i>
				</NavDropdown>
				</Col>
			</Row>
		</Navbar>
		</div>
	)
}

Header.defaultProps = {
	className: '',
}
export default withRouter(Header);
