import React from 'react';
import HomePageTemplate from "../templates/HomePageTemplate/Template.jsx";
import AgentTemplate from "../templates/AgentTemplate/Template.jsx";
import AdminTemplate from "../templates/AdminTemplate/Template.jsx";
import Cookies from 'js-cookie';
import RegistrationTemplate from '../templates/RegistrationTemplate/Template.jsx';


class Registration extends React.Component {

	render() {

		if (Cookies.get('adminData')) {
			return (
				<AdminTemplate>
					<RegistrationTemplate isAdmin />
				</AdminTemplate>
			);
		}

		else if (Cookies.get('agentData')) {
			return (
				<AgentTemplate>
					<RegistrationTemplate />
				</AgentTemplate>
			);
		}

		else {
			return (
				<HomePageTemplate>
					<RegistrationTemplate />
				</HomePageTemplate>
			)
		}
	}
}

export default Registration;
