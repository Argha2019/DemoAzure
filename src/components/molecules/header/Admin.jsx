import React from 'react';
import { Navbar } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import { Row,Col } from "react-bootstrap";
import '../../../css/global.css';
import { withRouter } from 'react-router-dom';
import pic from '../../../OMSFinal.png';
import search from '../../../images.png';
import axios from 'axios';
import Cookies from 'js-cookie';
import { encryptByAES, decryptByAES } from '../../pages/Encryption.jsx';
import Config from "../../../config/urls.jsx";


/**
 * @author kasjain(Kashish Jain)
 * This file is responsible for making the header navigation bar for ADMIN at molecule level.
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

		axios.post(url, encryptByAES(JSON.parse(decryptByAES(Cookies.get('adminData')))[0].accessToken), {headers: {'Content-Type': 'application/json'}})
		.then(res=>

		Cookies.remove('adminData'));
}


const Header = (props: Props): React.Element<*> => {

	return (
	/**
	* This gives the navigation bar.
	* @return navigation bar for ADMIN.
	*/
		<Navbar bg="dark" expand="lg" variant="dark" fixed="top">
		<Navbar.Brand href="#/loginAdmin">
			<img src={pic} width="40px" className = "headerImage" alt="Company Logo" />
			<span className= "font">OMS</span>
		</Navbar.Brand>
		<Navbar.Collapse id="basic-navbar-nav">
		</Navbar.Collapse>
			<Row className="rowAlign" md={12}>
				<Col className="nav" md={12}>
					<Navbar.Brand href="#/loginAdmin">
						<img src={search} className = "searchHeader" alt="Search button" />
					</Navbar.Brand>
					<div className = "font">Hi {JSON.parse(decryptByAES(Cookies.get('adminData')))[0].firstName}</div>
					<NavDropdown title="⚙️" id="basic-nav-dropdown">
						<i><NavDropdown.Item className="fa fa-user" href="#/adminProfile"> <span>My Profile</span></NavDropdown.Item></i>
						<i><NavDropdown.Item className="fa fa-plus-square" href="#/register" ><span>Register User</span></NavDropdown.Item></i>
						<i><NavDropdown.Item className="fa fa-key" href="#/changePassword" > <span>Change Password</span></NavDropdown.Item></i>
						<i><NavDropdown.Item className="fa fa-sign-out" href="#/" onClick = {() =>logout()} > <span>Log out</span></NavDropdown.Item></i>
					</NavDropdown>
				</Col>
			</Row>
	</Navbar>
	);
}	
Header.defaultProps = {
	className: '',
  }
export default withRouter(Header);
