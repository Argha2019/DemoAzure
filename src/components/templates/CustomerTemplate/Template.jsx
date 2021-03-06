import * as React from "react";
import Card from "./../../atoms/card/card.jsx";
import Header from "./../../molecules/header/Customer.jsx";
import Footer from "./../../molecules/footer/footer.jsx";
import Cookies from "js-cookie";
import axios from "axios";
import { Button } from "react-bootstrap";
import { encryptByAES,decryptByAES } from "../../pages/Encryption.jsx";
import Config from "../../../config/urls.jsx";


/**
 * @author kasjain(Kashish Jain)
 * This file is responsible for making the header and footer template for role:"CUSTOMER"
 * which is always rendered in every page.
 */

class CustomerTemplate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: "loading"
		};
	}

	componentDidMount = () => {
		if (Cookies.get("customerData") === undefined) {
			this.setState({ user: false });
			return;
		} else {
			this.setState({ user: true });
			try {

				var url = Config.serverUrl + '/signin/isvalid';
				axios.post(url,'"' + encryptByAES(JSON.parse(decryptByAES(Cookies.get('customerData')))[0].accessToken) + '"', {headers: {'Content-Type': 'application/json'}})
					.then(res => {
						if (res.data) {
							this.setState({ user: true });
						} else {
							Cookies.remove("customerData");
							this.setState({ user: false });
						}
					});
			} catch (e) {
				console.log("Request not found!!");
			}
		}
	};

	render() {
		if (this.state.user == true) {
			return (
				<Card className={this.props.className}>
					<Header></Header>
					{this.props.children}
					<Footer></Footer>
				</Card>
			);
		} else if (this.state.user == false) {
			return (
				<div>
					<br/>
					<p align="center">You must Login!!</p>
					<Button className="editButtonDiv" variant="primary" href="#/">
						Sign In
					</Button>
				</div>
			);
		} else {
			return <div />;
		}
	}
}

export default CustomerTemplate;
