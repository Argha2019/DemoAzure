import React from 'react';
import { Navbar } from "react-bootstrap";
import '../../../css/global.css';
import pic from '../../../OMSFinal.png';

type Props = {
	children: React.Node,
	className: string,
}
const Header = (props: Props): React.Element<*> => (
	
	<Navbar bg="dark" variant="dark" fixed="top">
	    <Navbar.Brand className="imgtry">
	    	<img alt="Company Logo" src={pic} width="30px" />
	    	<span className="font">Welcome to Order Management System</span>
	    </Navbar.Brand>
    </Navbar>

)
Header.defaultProps = {
	className: '',
  }
export default Header;