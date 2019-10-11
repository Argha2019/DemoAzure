import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-blue.css';
import agentimage from '../../../css/agent.jpg';
import '../../../css/global.css';
import axios from 'axios';
import { Row, Col, Form } from 'react-bootstrap';
import { encryptByAES, decryptByAES } from '../../pages/Encryption.jsx';
import Config from "../../../config/urls.jsx";


const nameRegex = RegExp(/^[a-zA-Z]*$/);
const mailRegex = RegExp(/^[a-z0-9.!#$%&’+/=?^_/'{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)$/);
const phoneRegex = RegExp(/^[0-9]{10}$/);

export default class CustomerListTemplate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            status: '',
            id: '',
            lastName: "",
            mail: '',
            phoneNo: '',
            noField: '',
            noResults: 'No Results Found!',
            lastNameError: '',
            phoneNoError: '',
            idError: '',
            mailError: '',
            emptyResult: 'No Results Found!',
            customer: [],
            columnDefsCustomer: [
                {
                    headerName: "ID", field: "id", sortable: true, filter: true, resizable: true
                },
                {
                    headerName: "First Name", field: "firstName", sortable: true, filter: true, resizable: true
                },
                {
                    headerName: "Last Name", field: "lastName", sortable: true, filter: true, resizable: true
                },
                {
                    headerName: "DOB", field: "dob", sortable: true, filter: true, resizable: true
                },
                {
                    headerName: "Email", field: "mail", sortable: true, filter: true, resizable: true
                },
                {
                    headerName: "Address line 1", field: "addressLine1", sortable: true, filter: true, resizable: true
                },
                {
                    headerName: "Address Line 2", field: "addressLine2", sortable: true, filter: true, resizable: true
                },
                {
                    headerName: "State", field: "state", sortable: true, filter: true, resizable: true
                },
                {
                    headerName: "Country", field: "country", sortable: true, filter: true, resizable: true
                },
                {
                    headerName: "PinCode", field: "pinCode", sortable: true, filter: true, resizable: true
                }
            ],
            rowSelection: 'single',
            paginationPageSize: 10,
            json_length: ''

        }
        this.getResult = this.getResult.bind(this);
        this.searchClickedCustomer = this.searchClickedCustomer.bind(this);
        this.resetClickedCustomer = this.resetClickedCustomer.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onPageSizeChanged = this.onPageSizeChanged.bind(this);
    }
    componentDidMount() {
        this.setState({ show: false });
    }

    //Page Size
    onPageSizeChanged(newPageSize) {
        var value = document.getElementById("page-size").value;
        this.gridApi.paginationSetPageSize(Number(value));
    }



    //Search Results of Customer
    getResult() {
        if (this.state.show) {
            if (this.state.customer.length > 0 && this.state.json_length <= 10) {
                return (
                    <div style={{ margin: "5%" }}>
                        <div className="test-header">
                            No. of records : <span></span>
                            <select onChange={this.onPageSizeChanged.bind(this)} id="page-size">
                                <option value="10" selected="">
                                    10
							  </option>

                            </select>
                        </div>
                        <div className="ag-theme-blue" style={{ width: "100%", height: "300px" }}>
                            <AgGridReact
                                onGridReady={params => this.gridApi = params.api}
                                columnDefs={this.state.columnDefsCustomer}
                                rowData={this.state.customer}
                                pagination={true}
                                paginationPageSize={this.state.paginationPageSize}
                                rowSelection={this.state.rowSelection}
                                rowHeight={45}
                            />
                        </div>
                    </div>
                );
            }


            else if (this.state.customer.length > 0 && this.state.json_length > 10 && this.state.json_length <= 20) {
                return (
                    <div style={{ margin: "5%" }}>
                        <div className="test-header">
                        No. of records : <span></span>
                            <select onChange={this.onPageSizeChanged.bind(this)} id="page-size">
                                <option value="10" selected="">
                                    10
							  </option>
                                <option value="20">20</option>

                            </select>
                        </div>
                        <div className="ag-theme-blue" style={{ width: "100%", height: "300px" }}>
                            <AgGridReact
                                onGridReady={params => this.gridApi = params.api}
                                columnDefs={this.state.columnDefsCustomer}
                                rowData={this.state.customer}
                                pagination={true}
                                paginationPageSize={this.state.paginationPageSize}
                                rowSelection={this.state.rowSelection}
                                rowHeight={45}
                            />
                        </div>
                    </div>
                );
            }




            else if (this.state.customer.length > 0 && this.state.json_length > 20) {
                return (
                    <div style={{ margin: "5%" }}>
                        <div className="test-header">
                        No. of records : <span></span>
                            <select onChange={this.onPageSizeChanged.bind(this)} id="page-size">
                                <option value="10" selected="">
                                    10
							  </option>
                                <option value="20">20</option>
                                <option value="30">30</option>

                            </select>
                        </div>
                        <div className="ag-theme-blue" style={{ width: "100%", height: "300px" }}>
                            <AgGridReact
                                onGridReady={params => this.gridApi = params.api}
                                columnDefs={this.state.columnDefsCustomer}
                                rowData={this.state.customer}
                                pagination={true}
                                paginationPageSize={this.state.paginationPageSize}
                                rowSelection={this.state.rowSelection}
                                rowHeight={45}
                            />
                        </div>
                    </div>
                );
            }







            else {
                return (
                    <div>
                        <h3>No Results Found!</h3>
                    </div>
                );
            }
        }
        else {
            return '';
        }

    }

    //Search logic for Customer
    searchClickedCustomer(e) {
        e.preventDefault();
        let mail1 = "";
        let phone1 = "";
        if (this.state['mail'] != '')
            mail1 = encryptByAES(this.state['mail']);

        if (this.state['phoneNo'] != '')
            phone1 = encryptByAES(this.state['phoneNo']);

        const cust = {
            id: "",
            lastName: this.state['lastName'],
            mail: mail1,
            phone: phone1,
            username: ""
        }

        var url = Config.serverUrl + '/searchcustomer/customer/search';
        axios.put(url, cust)
            .then(
                response => {
                    let dataReceived = response.data;
                    let res_length = response.data.length;
                    this.state.json_length = res_length;
                    dataReceived.map(fields => {
                        fields.mail = decryptByAES(fields.mail);
                        fields.phone = decryptByAES(fields.phone);
                        fields.username = decryptByAES(fields.username);
                    })
                    this.setState({
                        customer: dataReceived,
                        show: true
                    });
                    this.getResult();
                    window.scrollTo({
                        top: 1000,
                        left: 100,
                        behavior: 'smooth'
                    });
                }
            ).catch(
                this.setState({
                    show: false
                })
            )

    }

    //Reset all the fields for Customer
    resetClickedCustomer(e) {
        e.preventDefault();
        this.setState({
            lastName: '',
            mail: '',
            phoneNo: '',
            lastNameError: '',
            mailError: '',
            phoneNoError: '',
            show: false
        });
    }

    handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        let error = '';
        switch (name) {
            case "lastName":
                error = !(nameRegex.test(value)) ? "Cannot contain numbers or special characters" : "";
                this.setState({ lastName: value });
                this.setState({ lastNameError: error });
                break;
            case "mail":
                error = !(mailRegex.test(value)) ? "Please enter a valid mail id" : "";
                this.setState({ mail: value });
                this.setState({ mailError: error });
                break;
            case "phoneNo":
                error = !(phoneRegex.test(value)) ? "Please enter 10 digit phone no.!" : "";
                this.setState({
                    phoneNo: value,
                    phoneNoError: error
                });
                break;
            default:
                break;
        }
    }


    render() {
        return (
            <div>
                <h1>Customer Search</h1>
                <br /><br />
                <div className="Main-page">
                    <div className="Search">
                        <Form className="MySearchForm" >
                            <Row className="form-row" >
                                <label className="col-sm-2 col-form-label fontWhite" for="lastName">Last Name</label>
                                <div className="col-sm-10">
                                    <input id="lastName2" name="lastName" type="text" id="lastName" className="form-control lastName formInput" value={this.state.lastName} placeholder="Enter the Customer Last name" onChange={this.handleChange} />
                                    {this.state.lastName.length > 0 && this.state.lastNameError.length > 0 && (
                                        <span className="searchErrorMessage">{this.state.lastNameError}</span>
                                    )}
                                </div>
                            </Row>
                            <br />
                            <Row className="form-row">
                                <label className="col-sm-2 col-form-label fontWhite" for="email">Email ID</label>
                                <div className="col-sm-10">
                                    <input id="mail2" name="mail" type="text" placeholder="Enter the mail id" id="email" value={this.state.mail} onChange={this.handleChange} className="form-control mail formInput" />
                                    {this.state.mail.length > 0 && this.state.mailError.length > 0 && (
                                        <span className="errorMessage">{this.state.mailError}</span>
                                    )}
                                </div>
                            </Row>
                            <br />
                            <Row className="form-row" >
                                <label className="col-sm-2 col-form-label fontWhite" for="phone">Phone No.</label>
                                <div className="col-sm-10">
                                    <input name="phoneNo" type="text" className="form-control phoneNo formInput" id="phone" value={this.state.phoneNo} placeholder="Enter the Customer Phone Number" onChange={this.handleChange} />
                                    {this.state.phoneNo.length > 0 && this.state.phoneNoError.length > 0 && (
                                        <span className="searchErrorMessage">{this.state.phoneNoError}</span>
                                    )}
                                </div>
                            </Row>
                            <br />
                            <br />
                            <div className="row">
                                <div className="col-sm-4 searchButtonDiv">
                                    <button className="btn btn-primary btn-block active SearchButton" id="search1" type="submit" onClick={this.searchClickedCustomer}>Search</button>
                                </div>
                                <div className="col-sm-4">
                                    <button id="reset2" className="btn btn-primary btn-block active SearchButton" onClick={this.resetClickedCustomer}>Reset</button>
                                </div>
                            </div>
                        </Form>
                    </div>
                    {this.state.customer.length === 0 && (
                        <h3>{this.state.emptyResults}</h3>
                    )}
                    {this.getResult()}
                </div>
                <br />
                <br />
            </div>
        );
    }
}
