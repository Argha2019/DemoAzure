import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-blue.css';
import '../../../css/global.css';
import Switch from 'react-switch';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Row, Col, Form } from 'react-bootstrap';
import { encryptByAES, decryptByAES } from '../../pages/Encryption.jsx';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Config from "../../../config/urls.jsx";
import "ag-grid-enterprise";

const nameRegex = RegExp(/^[a-zA-Z]*$/);
const idRegex = RegExp(/^[a-z0-9]*$/);
const mailRegex = RegExp(/^[a-z0-9.!#$%&’+/=?^_/'{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)$/);
const phoneRegex = RegExp(/^[0-9]{10}$/);

let agentStatus = false;
let flag = 0;
let toggle = "false";
let aag={};
class AgentListTemplate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            id: '',
            firstName: '',
            lastName: '',
            mail: '',
            noResults: 'No Results Found!',
            agent: {},
            firstNameError: '',
            lastNameError: '',
            idError: '',
            mailError: '',
            emptyResult: 'No Results Found!',
            customer: [],
            columnDefs: [
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
                    headerName: "Email", field: "mail", sortable: true, filter: true, resizable: true
                },
                {
                    headerName: "Status", field: "status", width: 220, cellRendererFramework: (params) => {

                        if (params.value == "true") {
                            agentStatus = true;
                        }
                        else if (params.value == "false") {
                            agentStatus = false;
                        }
                        if (Cookies.get('adminData')) {
                            return <Switch onChange={this.handleChangetoggle} checked={agentStatus} checkedIcon={false} uncheckedIcon={false} />
                        }

                        else {
                            return <Switch onChange={this.handleChangetoggle} checked={agentStatus} checkedIcon={false} uncheckedIcon={false} disabled={true} />
                        }

                    }
                },
                {
                    headerName: "Details", field: "details", width: 180, cellRendererFramework: () => {
                        return <Button onClick={this.handleAdp}>View</Button>
                    }
                }
            ],
            rowSelection: 'single',
            paginationPageSize: 10,
            json_length: ''
        }
        this.searchClicked = this.searchClicked.bind(this);
        this.resetClicked = this.resetClicked.bind(this);
        this.getComponent = this.getComponent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAdp = this.handleAdp.bind(this);
        this.handleChangetoggle = this.handleChangetoggle.bind(this);
        this.onPageSizeChanged = this.onPageSizeChanged.bind(this);
        this.serverSideDatasource= this.serverSideDatasource.bind(this);
    }

    componentDidMount() {
        this.setState({ show: false });
    }

    searchClicked(e) {
        e.preventDefault();

        this.setState({ emptyField: "" });
        this.state.agent = {
            id: this.state['id'],
            firstName: this.state['firstName'],
            lastName: this.state['lastName'],
            mail: this.state['mail']
        }
        aag= this.state.agent;
        var url = Config.serverUrl+ '/searchagent/search?page=0';
        axios.put(url, this.state.agent)
            .then(
                response => {
                    let dataReceived = response.data;
                    let response_length = response.data.content.length;

                    this.state.json_length = response_length;
                    let agentData = dataReceived.content;

                    agentData.map(fields => {
                        fields.id = decryptByAES(fields.id);
                        fields.mail = decryptByAES(fields.mail);
                        fields.username = decryptByAES(fields.username);
                        fields.phone = decryptByAES(fields.phone);
                    })

                    this.setState({ agent: agentData });
                    this.setState({ show: true });
                    window.scrollTo({
                        top: 1000,
                        left: 100,
                        behavior: 'smooth'
                    });
                },

            )


    }

    resetClicked(e) {
        e.preventDefault();
        this.state.id = "";
        this.state.firstName = "";
        this.state.lastName = "";
        this.state.mail = "";
        this.state.noField = "";
        this.state.firstNameError = "";
        this.state.lastNameError = "";
        this.state.mailError = "";
        this.state.idError = "";
        this.state.status = "";
        this.setState({ show: false });
        this.getComponent();
    }

    //Page Size
    onPageSizeChanged(newPageSize) {
        var value = document.getElementById("page-size").value;
        this.gridApi.paginationSetPageSize(Number(value));
    }

    serverSideDatasource = () => {
        return {
            getRows(params) {
                let page= params.request.endRow/10;
                let pag = page-1;
                const urls= Config.serverUrl +'/searchagent/search?page=' + pag;
                var header ={
                    'Accept':'application/json',
                    'Content-Type' : 'application/json'
                }
                var bod= JSON.stringify(aag);
                fetch(urls, {method: "PUT", headers: header, body: bod})
                .then(res => res.json())
                .then(rowData => {
                    if(rowData.content.length >0){
                        let lastRow= () =>{
                            if(rowData.totalPages <= 1) return rowData.totalElements;
                            else if(page <= rowData.totalPages -2) return -1;
                            else return rowData.totalPages;
                        };

                        let agentResult= rowData.content;
                        agentResult.map(fields => {
                            fields.id = decryptByAES(fields.id);
                            fields.mail = decryptByAES(fields.mail);
                            fields.username = decryptByAES(fields.username);
                            fields.phone = decryptByAES(fields.phone);
                        })

                        params.successCallback(agentResult, lastRow());
                    }
                    else{
                        params.successCallback([{columnNameField: "no results found"}], 1);
                    }
                })
                .catch(error => console.error("Error:", error));
            }
        };
    };

    onGridReady = params => {
        this.gridApi= params.api;
        this.gridColumnApi= params.columnApi;
        var datasource= this.serverSideDatasource();
        params.api.setServerSideDatasource(datasource);
    };


    getComponent() {
        if (this.state.show && this.state.agent.length > 0 && this.state.json_length <= 10) {
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
                    <div
                        className="ag-theme-blue"
                        style={{
                            width: "100%", height: "300px"
                        }} >
                        <AgGridReact
                            onGridReady={this.onGridReady}
                            columnDefs={this.state.columnDefs}
                            rowModelType= "serverSide"
                            cacheBlockSize= {10}
                            rowData={this.state.agent}
                            pagination={true}
                            paginationPageSize={this.state.paginationPageSize}
                            rowSelection={this.state.rowSelection}
                            animateRows={true}
                            rowHeight={45}
                            suppressCellSelection={true}
                        >
                        </AgGridReact>
                    </div>
                </div>
            );
        }
        else if (this.state.show && this.state.agent.length > 0 && this.state.json_length > 10 && this.state.json_length <= 20) {
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
                    <div
                        className="ag-theme-blue"
                        style={{
                            width: "100%", height: "300px"
                        }} >
                        <AgGridReact
                            onGridReady={this.onGridReady}
                            columnDefs={this.state.columnDefs}
                            rowModelType= "serverSide"
                            cacheBlockSize= {10}
                            rowData={this.state.agent}
                            pagination={true}
                            paginationPageSize={this.state.paginationPageSize}
                            rowSelection={this.state.rowSelection}
                            animateRows={true}
                            rowHeight={45}
                            suppressCellSelection={true}
                        >
                        </AgGridReact>
                    </div>
                </div>
            );
        }
        else if (this.state.show && this.state.agent.length > 0 && this.state.json_length > 20) {
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
                    <div
                        className="ag-theme-blue"
                        style={{
                            width: "100%", height: "300px"
                        }} >
                        <AgGridReact
                            onGridReady={this.onGridReady}
                            columnDefs={this.state.columnDefs}
                            rowModelType= "serverSide"
                            cacheBlockSize= {10}
                            rowData={this.state.agent}
                            pagination={true}
                            paginationPageSize={this.state.paginationPageSize}
                            rowSelection={this.state.rowSelection}
                            animateRows={true}
                            rowHeight={45}
                            suppressCellSelection={true}
                        >
                        </AgGridReact>
                    </div>
                </div>
            );
        }
        else {
            return '';
        }
    }

    handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        let error = '';
        switch (name) {
            case "id":
                error = !(idRegex.test(value)) ? "Please enter a valid agent id" : "";
                this.setState({ id: value });
                this.setState({ idError: error });
                break;
            case "firstName":
                error = !(nameRegex.test(value)) ? "Cannot contain numbers or special characters" : "";
                this.setState({ firstName: value });
                this.setState({ firstNameError: error });
                break;
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

    handleAdp() {
        const data = this.gridApi.getSelectedRows();
        if (flag == 1) {
            if (toggle == "true") {
                data[0].status = "true";
            }
            else if (toggle == "false")
                data[0].status = "false";
        }
        Cookies.set('adp', encryptByAES(JSON.stringify(data[0])));
        this.props.history.push({ pathname: '/agentDetailsPage' });
    }

    handleChangetoggle(checked) {
        const selectedNodes = this.gridApi.getSelectedRows();
        flag = 1;
        if (checked) {
            toggle = "true";
        }
        const user = {
            "id": encryptByAES("USR12345"),
            "firstName": selectedNodes[0].firstName,
            "lastName": selectedNodes[0].lastName,
            "mail": encryptByAES(selectedNodes[0].mail),
            "username": encryptByAES(selectedNodes[0].username),
            "roles": selectedNodes[0].roles,
            "phone": encryptByAES(selectedNodes[0].phone),
            "addressLine1": selectedNodes[0].addressLine1,
            "addressLine2": selectedNodes[0].addressLine2,
            "state": selectedNodes[0].state,
            "country": selectedNodes[0].country,
            "pinCode": selectedNodes[0].pinCode,
            "dob": selectedNodes[0].dob,
            "status": toggle,
            "password": encryptByAES("Welcome@123")
        }

        var url = Config.serverUrl + '/signup/update';
        axios.put(url, user)
            .then(
                response => {
                    if (response.data) {
                        this.setState({ status: toggle });
                        this.gridApi.refreshCells();
                        { this.getComponent() }
                    }
                }
            )
    }



    render() {
        return (
            <div>
                <h1>Agent Search</h1>
                <br />
                <div className="Main-page">
                    <br />
                    <div className="Search">
                        <Form id="Form1" className="MySearchForm">
                            <Row className="form-row" >
                                <label className="col-sm-2 col-form-label fontWhite" for="agentId">Agent Id</label>
                                <div className="col-sm-10">
                                    <input name="id" type="text" className="form-control id formInput" id="agentId" value={this.state.id} placeholder="Enter the agent ID" onChange={this.handleChange} />
                                    {this.state.id.length > 0 && this.state.idError.length > 0 && (
                                        <span className="errorMessage">{this.state.idError}</span>
                                    )}
                                </div>
                            </Row>
                            <br />
                            <Row className="form-row" >
                                <label className="col-sm-2 col-form-label fontWhite" for="firstName">First Name</label>
                                <div className="col-sm-10">
                                    <input name="firstName" className="form-control firstName formInput" type="text" id="firstName" value={this.state.firstName} onChange={this.handleChange} placeholder="Enter the first name" />
                                    {this.state.firstName.length > 0 && this.state.firstNameError.length > 0 && (
                                        <span className="errorMessage">{this.state.firstNameError}</span>
                                    )}
                                </div>
                            </Row>
                            <br />
                            <Row className="form-row">
                                <label className="col-sm-2 col-form-label fontWhite" for="lastName">Last Name</label>
                                <div className="col-sm-10">
                                    <input name="lastName" className="form-control lastName formInput" type="text" id="lastName" value={this.state.lastName} onChange={this.handleChange} placeholder="Enter the last name" />
                                    {this.state.lastName.length > 0 && this.state.lastNameError.length > 0 && (
                                        <span className="errorMessage">{this.state.lastNameError}</span>
                                    )}
                                </div>
                            </Row>
                            <br />
                            <Row className="form-row">
                                <label className="col-sm-2 col-form-label fontWhite" for="email">Email ID</label>
                                <div className="col-sm-10">
                                    <input name="mail" type="text" placeholder="Enter the mail id" id="email" value={this.state.mail} onChange={this.handleChange} className="form-control mail formInput" />
                                    {this.state.mail.length > 0 && this.state.mailError.length > 0 && (
                                        <span className="errorMessage">{this.state.mailError}</span>
                                    )}
                                </div>
                            </Row>
                            <br />
                            <br />
                            <div className="row">
                                <div className="col-sm-4 searchButtonDiv">
                                    <button className="btn btn-primary btn-block active SearchButton" id="search" type="submit" onClick={this.searchClicked}>Search</button>
                                </div>
                                <div className="col-sm-4">
                                    <button id="reset" className="btn btn-primary btn-block active SearchButton" onClick={this.resetClicked}>Reset</button>
                                </div>
                            </div>
                        </Form>
                    </div>
                    {this.state.agent.length === 0 && (
                        <h3>{this.state.noResults}</h3>
                    )}

                    {this.getComponent()}
                </div>
                <br />
                <br />
            </div>
        );
    }
}
export default withRouter(AgentListTemplate);
