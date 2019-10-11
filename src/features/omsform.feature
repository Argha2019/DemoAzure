Feature: OMSForm Testing

	Scenario: Rendering Snapshot
		Given snapshot given
		When mounting snapshot
		Then it should render the snapshot

	Scenario: Should render required form elements
		Given snapshot given
		When finding Form
		Then it should find FormControl And Buttons

	Scenario: Should render the OMSForm and find div and buttons
		Given snapshot given
		When finding div and buttons
		Then it should get 1 div and 2 buttons

	Scenario: Register Button Definition
		Given snapshot given
		When finding button register
		Then it should be defined

	Scenario: OnChange function
		Given snapshot given
		When changing values in fields
		Then onChange should be called and state should be updated

	Scenario: on Button Click
		Given snapshot given
		When submit button is clicked
		Then check valid credentials

