import React from "react";
import ViewTemplate from "../templates/ViewTemplate/Template.jsx";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ModalOMS from "../molecules/modalOMS/modalOMS.jsx";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-blue.css";
import { Dots } from "react-activity";
import "react-activity/dist/react-activity.css";
import Cookies from "js-cookie";
import { decryptByAES, encryptByAES } from "./Encryption.jsx";
import Config from "../../config/urls.jsx";


class ViewOrder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			showMore: false,
			tableWidth: {
				width: "85%",
				height: "450px"
			},
			buttonName: "Show more",
			loading: false,
			agentId: encryptByAES(JSON.parse(decryptByAES(Cookies.get("viewData")))[0].id),
			orderId: "",
			orderPlacedDate: "",
			orderAmount: "",
			orderStatus: "",
			modifyState: true,
			order: [],
			columnDefs: [
				{
					headerName: "ID",
					field: "orderId",
					sortable: true,
					filter: true,
					resizable: true,
					pinned: "left"
				},
				{
					headerName: "Placed Date",
					field: "orderPlacedDate",
					sortable: true,
					filter: true,
					resizable: true
				},
				{
					headerName: "Amount",
					field: "orderAmount",
					sortable: true,
					filter: true,
					resizable: true
				},
				{
					headerName: "Status",
					field: "orderStatus",
					sortable: true,
					filter: true,
					resizable: true
				},
				{
					headerName: "Customer ID",
					field: "customerId",
					sortable: true,
					filter: true,
					resizable: true
				},
				{
					headerName: "Dispatch Date",
					field: "orderDispatchDate",
					sortable: true,
					filter: true,
					resizable: true
				},
				{
					headerName: "Delivery Date",
					field: "orderDeliveryDate",
					sortable: true,
					filter: true,
					resizable: true
				},
				{
					headerName: "Payment method",
					field: "paymentMethod",
					sortable: true,
					filter: true,
					resizable: true
				},
				{
					headerName: "Address",
					field: "address",
					filter: true,
					resizable: true
				}
			],
			rowSelection: "single",
			productList: [],
			productDetails: []
		};
		this.modalFuncOpen = this.modalFuncOpen.bind(this);
		this.modalFuncClose = this.modalFuncClose.bind(this);
		this.getOrder = this.getOrder.bind(this);
		this.onGridReady = this.onGridReady.bind(this);
		this.getProductDetail = this.getProductDetail.bind(this);
		this.modifyOrder = this.modifyOrder.bind(this);
		//this.showMoreDetails = this.showMoreDetails.bind(this);
	}

	componentDidMount() {
		this.setState({ show: true });
		this.setState({ errors: {} });
		var url = Config.serverUrl + '/ordersearch/ordersearch/ordersByAgentId';

		axios.put(url, {"agentId" : this.state.agentId})

		.then(response => {
				let dataReceived = response.data;

                dataReceived.map(fields => {
                        fields.agentId = decryptByAES(fields.agentId);
                        fields.customerEmail = decryptByAES(fields.customerEmail);
                        fields.customerId = decryptByAES(fields.customerId);
						fields.customerPhone = decryptByAES(fields.customerPhone);
						fields.orderId = decryptByAES(fields.orderId);
					})
		        
				this.setState({ order: response.data });
				this.setState({ show: true });
			});
	}

	//To Fetch the data of selected row
	onGridReady(params) {
		this.gridApi = params.api;
		this.gridColumnApi = params.columnApi;
	}

	// To Extract orderId of selected Order and fetch product list from orderdetailstable
	getOrder() {
		var selectedRows = this.gridApi.getSelectedRows();
		var orderId = selectedRows[0].orderId;
		let orderIdEncr = encryptByAES(orderId);
		var url = Config.serverUrl + '/ordersearch/ordersearch/orderDetailsByOrderId';
		axios.put(url, { "orderId" : orderIdEncr})
		.then(response => {
				this.setState({ productList: response.data });
				this.getProductDetail();
			});
	}

	//To fecth product details from from product table
	getProductDetail() {
		var promises = [];
		var url = Config.serverUrl + '/products/products/getProduct/${input1}';
		this.setState({ loading: true }, () => {
			this.state.productList.map(p => {
				promises.push(
					axios.get(url)
				);
			});
			axios
				.all(promises)
				.then(results => {
					results.map(response => {
						this.setState({
							productDetails: [
								...this.state.productDetails,
								response.data
							]
						});
					});
					this.setState({ loading: false });
					this.modalFuncOpen();
				})
				.catch(error => {
					this.setState({ loading: false });
					//error page
				});
		});
	}

	modalFuncOpen() {
		this.setState({ showModal: true });
		if (this.state.order.orderStatus === "PLACED")
			this.setState({ modifyState: true });
		else this.setState({ modifyState: false });
	}

	modalFuncClose() {
		this.setState({ showModal: false });
	}

	modifyOrder() {
		console.log("This is modify order.Will be implemented in future.");
	}

	

	render() {
		if (this.state.loading) {
			return (
				<ViewTemplate>
					<div>
						<br />
						<br />
						<br />
						<br />
						<br />
						<Dots />
					</div>
				</ViewTemplate>
			);
		}

		return (
			<ViewTemplate>
				<h1>Order Details</h1>
				<div className="container-fluid">
					<div style={{ margin: "5%" }}>
						<div
							className="ag-theme-blue"
							style={this.state.tableWidth}
						>
							<AgGridReact
								columnDefs={this.state.columnDefs}
								rowSelection={this.state.rowSelection}
								onGridReady={this.onGridReady}
								onSelectionChanged={this.getOrder}
								rowData={this.state.order}
								pagination={true}
								paginationAutoPageSize={true}
							></AgGridReact>
						</div>
					</div>
				</div>
				{this.state.showModal && (
					<div className="divModal">
						<ModalOMS
							size="xl"
							onHide={this.modalFuncClose}
							onClick={this.modifyOrder}
							idCloseButton="closeModal"
							isDisable={this.state.modifyState}
							className="modalStyle"
							buttonName="Modify"
						>
							<Carousel showArrows={true}>
								{this.state.productDetails.map(p => (
									<div
										width="80%"
										key={p.productId}
										className="productTitle"
									>
										product#:{p.productId}
										<h2 className="productTitle">
											{p.productName}
										</h2>
										<img src={p.productImages} />
										<p className="legend">
											{p.productPrice}
										</p>
									</div>
								))}
							</Carousel>
						</ModalOMS>
					</div>
				)}
			</ViewTemplate>
		);
	}
}

export default ViewOrder;
