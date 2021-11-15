import React, { Component } from "react";

import { MDBDataTable } from "mdbreact";

//  axios
import axios from "axios";

// component
import TopHeader from "../Components/TopHeader";
import MdTable from "../Components/MdTable";

// react-router-dom
import { Link } from "react-router-dom";

// react-toastify
import { toast } from "react-toastify";

// react bootstrap
import { OverlayTrigger, Tooltip } from "react-bootstrap";

class Customers extends Component {
  state = {
    data: [],
    lodintable: true,
  };

  componentDidMount() {
    // console.log("hi");
    axios.get("http://sal7lly-001-site1.ctempurl.com/api/Customer/GetAllCustomer").then((res) => {
      if (res.status === 200) {
        this.setState({
          lodintable: false,
        });
      }
      var newData = res.data.data.reverse();
      // console.log(newData[0].city.name)
      newData.map((dat, index) => {
        dat.option = (
          <div className="option-parent">
            <OverlayTrigger
              overlay={
                <Tooltip id="tooltip-disabled" className="tooltipcalss">
                  تعديل
                </Tooltip>
              }
            >
              <Link
                to={"/edit-customer-info/" + dat.id}
                className="tableOption op-edit"
              >
                <i className="fi-rr-edit"></i>
              </Link>
            </OverlayTrigger>
            <OverlayTrigger
              overlay={
                <Tooltip id="tooltip-disabled" className="tooltipcalss">
                  حذف
                </Tooltip>
              }
            >
              <button
                onClick={()=>this.deleteCustomer(dat)}
                className="tableOption op-delete"
              >
                <i className="fi-rr-trash"></i>
              </button>
            </OverlayTrigger>
          </div>
        );
        var gender  = dat.isMale ? "ذكر" : "انثى";
        dat.isMale = gender;

        if(dat.customerType != null){
          var customertype = dat.customerType.name;
          dat.customertype = customertype;
        }

        if(dat.city != null){
          var city = dat.city.name;
          dat.city = city;
        }

      });
      this.setState({
        data: newData,
      });
    });
  }

  deleteCustomer = async (dat) => {
    const oldData = [...this.state.data];

    let newUsers = this.state.data.filter((user) => user.id !== dat.id);
    this.setState({
      data: newUsers,
    });

    try {
      await axios
        .delete("http://sal7lly-001-site1.ctempurl.com/api/Customer/Delete/" + dat.id)
        .then((res) => {
          // console.log(res.status);
          if (res.status === 200) {
            toast.success("تم حذف العنصر بنجاح", { toastId: dat.id });
            
          } else {
            toast.error("لا يمكن حذف العنصر", {
              toastId: dat.id,
              pauseOnHover: false,
            });
            this.setState({
              data: oldData,
            });
          }
        });
    } catch (ex) {
      toast.error("لا يمكن حذف العنصر", { toastId: dat.id });
      this.setState({
        data: oldData,
      });
    }
  };

  render() {
    const datatable = {
      columns: [
        { label: "الاسم", field: "fullName" },
        { label: "رقم الهاتف", field: "mobile" },
        // { label: "الايميل", field: "email" },
        { label: "المدينة", field: "city" },
        { label: "العنوان", field: "address" },
        { label: "النوع", field: "isMale" },
        { label: "نوع العميل", field: "customertype" },
        { label: "اختيارات", field: "option" },
      ],
      rows: this.state.data
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

export default Customers;
