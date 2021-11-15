import React, { Component } from "react";

import axios from "axios";

import MdTable from "../Components/MdTable";

// react-router-dom
import { Link } from "react-router-dom";

// react-toastify
import { toast } from "react-toastify";

export default class AllOrdersForCustomer extends Component {
  state = {
    data:[],
    lodintable: false,
  };

  async componentDidMount() {
    const customerId = this.props.match.params.id;
    await axios
      .get(
        "http://sal7lly-001-site1.ctempurl.com/api/Orders/GetAllOrdersByCustomer/" +
          customerId
      )
      .then((res) => {
        // console.log(res.data.data);
        this.setState({
          data: res.data.data
        })
      });


      axios
      .get("http://sal7lly-001-site1.ctempurl.com/api/Customer/GetCustomer/" + customerId)
      .then((res) => {
        var newDa = this.state.data;
        newDa.map((da) => {
          da.fullName = res.data.data.fullName;
        });
        this.setState({
          data: newDa,
        });
      });
  }

  render() {
    const datatable = {
      columns: [
        { label: "العميل", field: "fullName" },
        { label: "الفني", field: "technicals" },
        { label: "الخدمة", field: "service" },
        { label: "السعر", field: "price" },
        { label: "الحاله", field: "orderstep" },
        { label: "تاريخ الطلب", field: "dateCreated" },
      ],
      rows: this.state.data,
    };
    return (
      <div>
        <div className="main-content">
          <div className="dashboard-header">
            <h5>العملاء</h5>
            <div className="add-new-user">
              <Link to="/add-new-customer">
                <i className="fas fa-plus"></i>
                <span>اضافة عميل</span>
              </Link>
            </div>
          </div>
          <div className="orders-table">
            <div className="orderTable">
              <div
                className={
                  this.state.lodintable ? "seeloading" : "seelodingdnone"
                }
              >
                <div className="spinner-grow text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <div>يتم التحميل</div>
              </div>
              <MdTable datatable={datatable} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
