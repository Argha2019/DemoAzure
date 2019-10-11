import React from 'react';
import axios from 'axios';
import { Form, Button, Row, Col, Card, Spinner } from 'react-bootstrap';
import '../../css/loginCSS.css';
import '../../css/global.css';
import '../../css/createOrderCSS.css';
import '../../css/registerCSS.css';

import StepProgressbar from '../molecules/progressbar/StepProgressbar.jsx';
import CustomerTemplate from "../templates/CustomerTemplate/Template.jsx";
import { Dots } from 'react-activity';
import { decryptByAES, encryptByAES} from './Encryption.jsx';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-blue.css';
import ModalOMS from '../molecules/modalOMS/modalOMS.jsx';
import Cookies from 'js-cookie';
import { thisExpression } from '@babel/types';
import Config from "../../config/urls.jsx";

class CreateOrderCustomer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            noSearchError: '',
            custId: '',
            itemss: [],
            data:"",
            typed: 1,
            total: 0,
            inputNotNull: true,
            errorMessage: '',
            noItems: 'Shop Now',
            details: false,
            cart: true,
            showDetails: false,
            itemsss: [],
            phErrorMessage: '',
            percentForProgress: 0,
            orderId: '',
            address: '',
            pageTitle: 'Oops...Your Cart is Empty',
            availableQuantity: 0,
            productQuantity: [],
            notAvailable: '',
            loading: false,
            name2: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            pincode: '',
            myState2: '',
            contactNumber: '',
            email: '',
            loadingCustomer: "",
            customerUsername: "",
            show: false,
            showModal: false,
            productId: '',
            productName: '',
            role: '',
            prodList: [],
            rowSelection: 'single',
            modalProduct: [],
            columnDefs: [
                {
                    headerName: "Prod ID", field: "productId", sortable: true, filter: true, resizable: true
                },
                {
                    headerName: "Name", field: "productName", sortable: true, filter: true, resizable: true
                },
                {
                    headerName: "Price", field: "productPrice", sortable: true, filter: true, resizable: true
                },
                {
                    headerName: "Rating", field: "productRating", sortable: true, filter: true, resizable: true
                },

            ],
            gotoSavePageState: false,
        }
        this.handleList = this.handleList.bind(this);
        this.handleChangeProductId = this.handleChangeProductId.bind(this);
        this.handleChangeProductName = this.handleChangeProductName.bind(this);
        this.getComponent = this.getComponent.bind(this);
        this.modalFuncOpen = this.modalFuncOpen.bind(this);
        this.modalFuncClose = this.modalFuncClose.bind(this);
        this.modalFuncOpen2 = this.modalFuncOpen2.bind(this);
        this.modalFuncClose2 = this.modalFuncClose2.bind(this);
        this.handleButton = this.handleButton.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.removeCalled =this.removeCalled.bind(this);
        this.orderDetail=this.orderDetail.bind(this);
        this.refresh=this.refresh.bind(this);
        this.checkInventory=this.checkInventory.bind(this);
        this.validateQuantity=this.validateQuantity.bind(this);
        this.handleFormName=this.handleFormName.bind(this);
        this.handleFormState=this.handleFormState.bind(this);
        this.handleFormAddressLine1=this.handleFormAddressLine1.bind(this);
        this.handleFormAddressLine2=this.handleFormAddressLine2.bind(this);
        this.handleFormCity=this.handleFormCity.bind(this);
        this.handleFormContact=this.handleFormContact.bind(this);
        this.handleFormPincode=this.handleFormPincode.bind(this);
        this.handleFormEmail=this.handleFormEmail.bind(this);
        this.searchCustomer=this.searchCustomer.bind(this);
        this.handleSearchCustomer=this.handleSearchCustomer.bind(this);
        this.onAddition=this.onAddition.bind(this);
}

componentDidMount() {
    this.state.data= (JSON.parse(decryptByAES(Cookies.get('customerData')))[0]);
	const prodDetails = {
        productId: this.state["productId"],
        productName: this.state["productName"],
    }
	var url = Config.serverUrl + '/prodsearch/search';
	axios.put(url, prodDetails)
		.then(res => {
			this.setState({prodList : res.data});
		})

}

modalFuncOpen() {
    this.setState({ showModal: true });
    }

modalFuncOpen2() {
    this.setState({show: true});
    this.setState({showModal: false});
}


modalFuncClose() {
    this.setState({ showModal: false });
    this.setState({productId: ''});
    }

modalFuncClose2() {
    this.setState({show: false});
    this.setState({showModal:true});
    this.setState({productId: ''});
}

onAddition(){
    this.modalFuncClose2();
    var price1,subtotal1,total1;
    const quantity=1;
    let itemToBeAdded="";
    var input1=this.state.productId;
    document.getElementsByName('name1')[0].value="";
        var url = Config.serverUrl + '/products/products/getProduct/' + input1;
        axios.get(url)
        .then(      
             response => {
                     
                      this.state.productList=response.data;
                      price1=parseInt(response.data.productPrice,10);
                      subtotal1=price1*quantity;                  
            this.setState({inputNotNull:true});
            this.setState({errorMessage:'', noItems: false});
            subtotal1=price1*quantity;
            itemToBeAdded={productId:input1, storeId:"dadsd", price:price1, quantity:1};
            this.setState({ itemss: [...this.state.itemss, itemToBeAdded] });
            total1= this.state.total+subtotal1;
            this.setState({ total:total1});
            this.setState({productId: ''});
            this.setState({pageTitle : "Shopping Cart"});
        }
        );
}




    handleChangeProductId(e) {
        e.preventDefault();
        this.setState({ productId: e.target.value });
    }

    handleChangeProductName(e) {
        e.preventDefault();
        this.setState({ productName: e.target.value });
    }

handleList(e) {
	e.preventDefault();
    this.setState({noSearchError: ''});
    const prodDetails = {
        productId: this.state["productId"],
        productName: this.state["productName"],
    }
	var url = Config.serverUrl + '/prodsearch/search';
    axios.put(url, prodDetails)
    .then(res => {
        this.setState({prodList : res.data});
      if(this.state.prodList.length === 0) {
          this.setState({noSearchError: 'Enter Valid Product Name'});
      }
    });

}



getComponent() {
    if(this.state.showModal) {
        return(
            <ModalOMS size="xl" onHide={this.modalFuncClose} show={true} onClick={this.modalFuncClose} buttonName="Close" modalTitle="Product Details">
            <div>
                <Form className="MyForm" onSubmit={this.handleList}>
                {this.state.noSearchError.length > 0 && (
                    <span className="noSearchError">{this.state.noSearchError}</span>
                )}

                <Form.Group as={Row} controlId="username">
                <Col sm={4} md={3}>
                <Form.Label className="Labelling">Product Name</Form.Label>
                </Col>
                <Col sm={8} md={9}>
                <Form.Control name="prodName" type="text" placeholder="Product Name" ref="productName" onChange={this.handleChangeProductName} />
                </Col>
                </Form.Group>
                <Button className="editButtonDiv" variant="primary" type="submit">Search</Button>
                </Form>
        </div>

        <div
        className="ag-theme-blue"
        style={{
        width: "100%", height: "200px"}} >
            <AgGridReact
                onGridReady={ params => this.gridApi = params.api }
                columnDefs={this.state.columnDefs}
                rowData={this.state.prodList}
                pagination={true}
                paginationAutoPageSize={true}
                rowSelection = {this.state.rowSelection}
                animateRows={true}
                onSelectionChanged = {this.modalFuncOpen2}

            ></AgGridReact>
        </div>

    </ModalOMS>
        );
    }
    else {
        if(this.state.show){
            const selectedNodes = this.gridApi.getSelectedNodes();
            this.state.modalProduct = [];
            selectedNodes.map(node => this.state.modalProduct.push(node.data));
            this.state.productId=this.state.modalProduct[0].productId;
                return(
                    <div className="divModal">
                        <ModalOMS size="xl" onHide={this.modalFuncClose2} show={true} onClick={this.onAddition} buttonName="Add" modalTitle="Product Details">

                            <Card>
                                <Card.Body>
                                {this.state.modalProduct.map(value =>
                                        <Row key={value.productId}>

                                                <Col>

                                                        <img alt="Product Image" src={value.productImages} width="100%" height="300px" />

                                                </Col>
                                                <Col>
                                                <table width="100%">
                                                <tbody key={value.productId}>
                                                <tr>
                                                    <td><b>Product ID: </b>{value.productId}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>Name: </b>{value.productName}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>Description: </b>{value.productDescription}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>Price: </b>{value.productPrice}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>Rating: </b>{value.productRating}</td>
                                                </tr>
                                                </tbody>
                                                </table>
                                                </Col>

                                            </Row>
                                        )}
                                </Card.Body>
                            </Card>
                        </ModalOMS>
                    </div>
                );
            }
    }
}

    //Add to cart called
    handleButton(e) {
        var price1, subtotal1, total1;
        const quantity = 1;
        let itemToBeAdded = "";
        var input1 = this.state.productId;
        document.getElementsByName('name1')[0].value = "";
        if (this.state.productId.length < 1) {
            this.setState({ inputNotNull: false });
            this.setState({ errorMessage: 'You need to enter an item name' });
        }
        else {
			var url = Config.serverUrl + '/products/products/getProduct/' + input1;
            axios.get(url)
                .then(
                    response => {
                        this.state.productList = response.data;
                        price1 = parseInt(response.data.productPrice, 10);
                        subtotal1 = price1 * quantity,
                            this.setState({ inputNotNull: true }),
                            this.setState({ errorMessage: '', noItems: false }),
                            subtotal1 = price1 * quantity,
                            itemToBeAdded = { productId: input1, storeId: "dadsd", price: price1, quantity: 1 },
                            this.setState({ itemss: [...this.state.itemss, itemToBeAdded] }),
                            total1 = this.state.total + subtotal1,
                            this.setState({ total: total1 });
                            this.setState({productId: ''});
                            this.setState({pageTitle : "Shopping Cart"});

                    }
                );
        }
    }

    //OnHandle for quantity bar
    handleChange(e, value, id, price) {
        e.preventDefault();
        this.setState({ typed: value });
        var cloneArrayone = JSON.parse(JSON.stringify(this.state)).itemss;
        for (var i = 0; i < cloneArrayone.length; i++) {
            if (cloneArrayone[i].productId === id) {
                break;
            }
        }
        let total1;
        if (value > 0) {
            cloneArrayone[i].quantity = value;
            this.setState({ itemss: cloneArrayone });
            if (value > this.state.typed)
                total1 = this.state.total + price;
            else if (value < this.state.typed)
                total1 = this.state.total - price;
            this.setState({ total: total1, typed: value });
        }
        this.state.itemss[i].quantity = e.target.value;
        this.state.notAvailable = "";
    }

    //Checks Inventory
    checkInventory() {
        var promises = [];
		var url = Config.serverUrl + '/inventory/inventory/checkQuantity';
        this.setState({ loading: true }, () => {
            this.state.itemss.map(
                p => {
                    promises.push(axios.put(url, { productId: p.productId, storeId: 'store1' }))
                }
            );
            axios.all(promises)
                .then((results) => {
                    results.map((response) => {
                        this.setState({ productQuantity: [...this.state.productQuantity, response.data.quantity] })
                    }),
                        this.setState({ loading: false }),
                        this.validateQuantity();
                })
                .catch((error) => {
                    this.setState({ loading: false })
                    //error page
                });
        });

        this.state.name2 = (JSON.parse(decryptByAES(Cookies.get('customerData')))[0]).firstName;
            this.state.contactNumber = decryptByAES((JSON.parse(decryptByAES(Cookies.get('customerData')))[0]).phone);
            this.state.addressLine1 = (JSON.parse(decryptByAES(Cookies.get('customerData')))[0]).addressLine1;
            this.state.addressLine2 = (JSON.parse(decryptByAES(Cookies.get('customerData')))[0]).addressLine2;
            this.state.myState2 = (JSON.parse(decryptByAES(Cookies.get('customerData')))[0]).state;
            this.state.pincode = (JSON.parse(decryptByAES(Cookies.get('customerData')))[0]).pinCode;
            this.state.city = (JSON.parse(decryptByAES(Cookies.get('customerData')))[0]).country;
            this.state.email = decryptByAES((JSON.parse(decryptByAES(Cookies.get('customerData')))[0]).mail);


    }

    //Validates the quantity of products
    validateQuantity() {
        for (var i = 0; i < this.state.productQuantity.length; i++) {
            if (this.state.productQuantity[i] < this.state.itemss[i].quantity)
                this.setState({ notAvailable: "Items not in stock. Try decreasing the quantity" });
        }
        if (this.state.notAvailable !== 'Items not in stock. Try decreasing the quantity') {
            this.gotoSavePage();
        }
        this.setState({ productQuantity: [] });

    }

    //Submit button called
    gotoSavePage() {

        //if(this.state.gotoSavePageState){
        this.setState({ details: true, cart: false, pageTitle: "Shipping Details" });
        this.setState({ percentForProgress: 50 });
        //}
    }

    //Remove product called
    removeCalled(productId, price) {
        var quantity;
        const newItems = this.state.itemss.filter(itemss => {
            if (itemss.productId != productId) {
                quantity = itemss.quantity;
                return itemss;
            }
        });
        let subtotal1 = price * quantity;
        this.setState({ itemss: [...newItems], total: this.state.total - subtotal1 });
        if (this.state.itemss.length === 1) {
            this.setState({ pageTitle: "Oops...Your Cart is Empty " });
        }
    }

    //Back to cart clicked
    backtocart() {
        this.setState({ cart: true, details: false, percentForProgress: 0 });
    }

    //Shipping details form submit
    orderDetail(e) {
        e.preventDefault();
        if (this.state.contactNumber.length !== 10) {
            this.setState({ phErrorMessage: "Enter 10 a digit number" })
        }
        else {
            this.setState({ phErrorMessage: "" })
            const orderDetails = {
                "order": {
                    "customerId": encryptByAES(this.state.custId),
                    "customerEmail": encryptByAES(this.state.email),
                    "customerPhone": encryptByAES(this.state.contactNumber),
                    "agentId": "",
                    "orderDispatchDate": "123211",
                    "orderDeliveryDate": "123211",
                    "orderAmount": this.state.total,
                    "paymentMethod": "COD",
                    "address": this.state.addressLine1,
                    "city": this.state.city,
                    "state": this.state.myState2,
                    "pinCode": this.state.pincode,
                    "orderStatus": "PLACED"
                },
                "orderDetails": this.state.itemss
            }

            let finalAdd = "", add = "";
			var url = Config.serverUrl + '/orders/order/orderCreate';
            axios.post(url, orderDetails)
                .then(
                    response => {
                        finalAdd = add.concat(response.data.order.address, ", ", response.data.order.city, ", ", response.data.order.state),
                            this.setState({ showDetails: true, details: false, itemsss: response.data.orderDetails, orderId: decryptByAES(response.data.orderId), address: finalAdd });
                    }
                )
            this.setState({ percentForProgress: 100, pageTitle: "Order Details" });
        }
    }

    searchCustomer() {
        this.setState({ loadingCustomer: "loading" });
        let username1 ="";
        if(this.state.customerUsername!='')
            username1 = encryptByAES(this.state.customerUsername);
        const customer = {
            "id": "",
            "lastName": "",
            "phone": "",
            "mail": "",
            "username": username1
        }
		var url = Config.serverUrl + '/customersearch/customer/search';
            axios.put(url, customer)
                .then(
                    response => {
                        this.setState({
                            name2: response.data[0].firstName,
                            custId: response.data[0].id,
                            contactNumber: decryptByAES(response.data[0].phone),
                            email: decryptByAES(response.data[0].mail),
                            addressLine1: response.data[0].addressLine1,
                            addressLine2: response.data[0].addressLine2,
                            myState2: response.data[0].state,
                            pincode: response.data[0].pinCode,
                            city: response.data[0].country,
                        })
                        this.setState({ loadingCustomer: "verified" });
                    }
                )
    }

    //Refresh
    refresh() {
        this.setState({ cart: true });
        this.props.history.push('/loginCustomer');
    }

    handleFormName(e) {
        this.setState({ name2: e.target.value });
    }

    handleFormAddressLine1(e) {
        this.setState({ addressLine1: e.target.value });
    }

    handleFormAddressLine2(e) {
        this.setState({ addressLine2: e.target.value });
    }

    handleFormCity(e) {
        this.setState({ city: e.target.value });
    }

    handleFormState(e) {
        this.setState({ myState2: e.target.value });
    }

    handleFormContact(e) {
        this.setState({ contactNumber: e.target.value });
    }

    handleFormPincode(e) {
        this.setState({ pincode: e.target.value });
    }

    handleFormEmail(e) {
        this.setState({ email: e.target.value });
    }

    handleSearchCustomer(e) {
        this.setState({ customerUsername: e.target.value });
    }
    render() {
        if (this.state.loading) {
            return (
                <CustomerTemplate>
                    <div>
                        <br /><br /><br /><br /><br />
                        <Spinner animation="border" variant="secondary" className="loader"/>
                    </div>
                </CustomerTemplate>
            );
        }
        const { itemsss } = this.state;
        return (
            <CustomerTemplate>
                <br/>
                <br/>
                <br/>
                <br/>
                
                <h1>{this.state.pageTitle}</h1>
                <div>
                    
                    
                    {this.state.cart && 
                    <div style={{width:"100%", overflowX: "hidden"}}>
                    
                        
                    <div style={{background:"#dee2e6", padding: "20px",width:"100%"}}>
                         {this.state.noItems &&
                        <h1>{this.state.noItems}</h1>}
                    <br />
                     <div className="container" style={{marginLeft:"20%"}}>
                        




                         
                                
                                    <div className="wrapper2">
                                        
                                            <Row className="addProduct1">
                                                <div className="addProduct">
                                                    <input className="inputProduct" type="text" id="inputProduct" name="name1" value={this.state.productId} onChange={this.handleChangeProductId} placeholder="product ID" aria-label="Enter the Product ID" />
                                                    {(this.state.inputNotNull === false) && <h6 className="alert alert-danger alert-dismissible fade show">{this.state.errorMessage}</h6>}
                                                </div>
                                                <div style={{marginRight:"20px"}}>
                                                    <Button className="registerButton" id="handle" onClick={(e) => this.handleButton(e)} style={{width:"100px"}}>Add</Button>
                                                </div>
                                                <div>
                                                    <Button className="registerButton" onClick={this.modalFuncOpen} style={{width:"100px"}}>Explore</Button>
                                                </div>
                                            </Row>
                                       
                                    </div>
                            <br/>
                            <br/>
                       
                           
                            <br/>
                            <br/>
                            
                       
                           <div className="container">
                           <h4 > Order total: &#8377;{this.state.total} </h4>
                           
                            

                               {this.state.pageTitle!=='Oops...Your Cart is Empty' &&
                                    <table className="cartTable">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Price</th>
                                                <th style={{ width: "30%" }}>Qty</th>
                                                <th>Sub total</th>
                                                <th>X</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.itemss.map(
                                                it =>
                                                    <tr key={it.productId}>
                                                        <td>{it.productId}</td>
                                                        <td>&#8377;{it.price}</td>
                                                        <td><input type="number" id="quantInp" name="quant" value={it.quantity} onChange={e => this.handleChange(e, e.target.value, it.productId, (it.price))} style={{ width: "30%" }} /></td>
                                                        <td id="sub">&#8377;{it.price * it.quantity}</td>
                                                        <td><Button id="removeButton" onClick={() => this.removeCalled(it.productId, it.price)}>
                                                            X</Button>
                                                        </td>
                                                    </tr>
                                            )
                                            }
                                        </tbody>
                                    </table>
                                }
                            </div>
                      
                        <br />
                       
                        <br />
                        <section>
                            {this.state.notAvailable && <div className="alert alert-danger alert-dismissible fade show">{this.state.notAvailable}</div>}
                            <div className="container" style={{marginLeft:"25%"}}>
                                    <Button id="nextButton" className="registerButton proceedButton" style={{width:"200px"}} onClick={this.checkInventory} disabled={this.state.noItems}>Proceed to Buy</Button>
                            </div>
                        </section>
                    </div>
                    <div>
                    </div>
                    </div>
                     
                     </div>
                }






                    {/*Shipping detail page render*/}
                    {this.state.details &&
                        <div className="container" style={{marginTop:"-3%"}} >
                            <div className="container" style={{marginLeft:"9.5%"}}>
                                <Button onClick={() => this.backtocart()} id="backToCart" className="proceedButton" style={{marginLeft:"15px"}}>Back to Cart</Button>
                            </div>
                            <br />
                            <div className="register-wrap" style={{ height: "850px", width: "75%" }}>
                                <div className="register-html">
                            <Form className="register-form" id="shippingDetails" onSubmit={this.orderDetail}>
                                            <Form.Group as={Row}>
                                               
                                                    <Form.Label className="label">
                                                        Name
                                                    </Form.Label>
                                                
                                                    <Form.Control className="input" id="name2" name="name2" type="text" placeholder="Name" value={this.state.name2} onChange={this.handleFormName} required />              
                                                </Form.Group>

                                            <Form.Group as={Row}>
                                                
                                                    <Form.Label className="label">
                                                        Address Line 1
                                            </Form.Label>
                                                <Form.Control className="input" id="addressLine1" name="addressLine1" type="text" placeholder="Address line 1" value={this.state.addressLine1} onChange={this.handleFormAddressLine1} required />
                                               
                                            </Form.Group>

                                            <Form.Group as={Row}>
                                                
                                                    <Form.Label className="label">
                                                        Address Line 2
                                            </Form.Label>
                                                
                                                    <Form.Control className="input" id="addressLine2" name="addressLine2" type="text" placeholder="Address line 2" value={this.state.addressLine2} onChange={this.handleFormAddressLine2} required />
                                                
                                            </Form.Group>
                                            
                                            <Form.Group as={Row}>
                                           
                                                    <Form.Label className="label">
                                                        City
                                                    </Form.Label>
                                                    
                                                    <Form.Control className="input" id="city" name="city" type="text" placeholder="City" value={this.state.city} onChange={this.handleFormCity} required />
                                                    
                                                    
                                            </Form.Group>

                                            <Form.Group as={Row}>
                                                
                                                    <Form.Label className="label">
                                                        Pincode
                                                    </Form.Label>
                                                    
                                                    <Form.Control className="input" id="pincode" name="pincode" type="number" placeholder="Pincode" value={this.state.pincode} onChange={this.handleFormPincode} required />
                                                   
                                                
                                            </Form.Group>
                                           
                                            <Form.Group as={Row}>
                                            
                                            <Form.Label className="label">
                                                        State
                                            </Form.Label>
                                            
                                                    <Form.Control className="input" id="myState2" name="myState2" type="text" placeholder="State" value={this.state.myState2} onChange={this.handleFormState} required />
                                            
                                           
                                            </Form.Group>
                                            
                                            <Form.Group as={Row}>
                                           
                                            <Form.Label className="label">
                                                        Contact Number
                                            </Form.Label>
                                            
                                                    <Form.Control className="input" id="contactNumber" name="contactNumber" type="number" placeholder="Contact Number" value={this.state.contactNumber} onChange={this.handleFormContact} required />
                                           
                                           
                                            </Form.Group>
                                            
                                            <Form.Group as={Row}>
                                                
                                                    <Form.Label className="label">
                                                        Email
                                                    </Form.Label>
                                               
                                                    <Form.Control className="input" id="email" name="email" type="email" placeholder="Email" value={this.state.email} onChange={this.handleFormEmail} required />
                                               
                                            </Form.Group>
                                            <br/>
                                            <Button className="registerPageButton RegisterButton btn btn-primary" type="submit">Submit</Button>
                                        </Form>

                                        {this.state.phErrorMessage && <h3 className="alert alert-danger alert-dismissible fade show">{this.state.phErrorMessage}</h3>}
                                   
                                </div>
                            </div>
                        </div>}

                    {/*Order confirmation and detail page*/}
                    {this.state.showDetails &&
                        <div className="container">
                            <div className="orderDetails">
                                <img className="shippedImage" src="https://psi-oms-product-image-repo.s3.us-east-2.amazonaws.com/delivery.gif" width="200px" height="150px"/>
                                <h5>Order Id : {this.state.orderId}</h5>
                            </div>
                            
                            <Card>
                                <h4>Shipping to: {this.state.addressLine1}</h4>
                            </Card>
                            <Card>
                                <Card.Header><h4>Order Detail Page</h4></Card.Header>
                            </Card>
                            <Card>
                                <div className="container">
                                    <table className="orderTable">
                                        <thead>
                                            <tr>
                                                <th>ITEM</th>
                                                <th>PRICE</th>
                                                <th>QTY</th>
                                                <th>SUB</th>
                                                <th>TAX</th>
                                                <th>DISC</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                itemsss.map(
                                                    itt =>
                                                        <tr key={itt.productId}>
                                                            <td>{itt.productId}</td>
                                                            <td>&#8377;{itt.price}</td>
                                                            <td>{itt.quantity}</td>
                                                            <td id="sub">&#8377;{itt.price}*{itt.quantity}</td>
                                                            <td>0.00</td>
                                                            <td>0.00</td>
                                                        </tr>
                                                )
                                }
                            </tbody>
                        </table>        
                    </div>
                </Card>
                <Button onClick={this.refresh} className="proceedButton" style={{marginLeft:"50%", width:"100px"}} id="refreshButton">OK</Button>
            </div>
            }
        {this.getComponent()}
        {/* {this.getProductDetails()} */}
        </div>
        <br/>
        <br/>
    </CustomerTemplate>
       );
    }
}



export default CreateOrderCustomer;
