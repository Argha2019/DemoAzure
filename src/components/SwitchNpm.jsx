import React, { Component } from "react";
import Switch from "react-switch";

export default class SwitchNpm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			checkedIcon: false,
			checked: false,
			uncheckedIcon: true
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(checked) {
		this.setState({ checked });
	}

	render() {
		return (
			<label>
				<Switch
					onChange={this.handleChange}
					checked={this.state.checked}
					checkedIcon={this.state.checkedIcon}
					uncheckedIcon={this.state.uncheckedIcon}
				/>
			</label>
		);
	}
}
