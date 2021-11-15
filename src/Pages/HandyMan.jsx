import React, { Component } from "react";

// component
import TopHeader from "../Components/TopHeader";

// axios
import axios from "axios";

// react router dom
import { Link } from "react-router-dom";

// mdreact
import { MDBDataTable } from "mdbreact";
import MdTable from "../Components/MdTable";

import {toast} from 'react-toastify';

// react bootstrap
import { OverlayTrigger, Tooltip } from "react-bootstrap";

class HandyMan extends Component {
  state = {
    data: [],
    lodintable: true,
  };

  componentDidMount() {
    // console.log("hi");
    axios.get("http://sal7lly-001-site1.ctempurl.com/api/HandyMan/GetAllHandyMen  ").then((res) => {
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
                to={"/edit-handyman-info/" + dat.id}
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
                onClick={()=>this.deleteHandyMan(dat)}
                className="tableOption op-delete"
              >
                <i className="fi-rr-trash"></i>
              </button>
            </OverlayTrigger>
          </div>
        );
        var gender  = dat.isMale ? "ذكر" : "انثى";
        dat.isMale = gender;

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

  deleteHandyMan = async (dat) => {
    
    const oldData = [...this.state.data];

    this.setState({
      lodintable: true
    })

    let newUsers = this.state.data.filter((user) => user.id !== dat.id);
    this.setState({
      data: newUsers,
    });

    try {
      await axios
        .delete("http://sal7lly-001-site1.ctempurl.com/api/HandyMan/Delete/" + dat.id)
        .then((res) => {
          // console.log(res.status);
          if (res.status === 200) {
            toast.success("تم حذف العنصر بنجاح", { toastId: dat.id });
            this.setState({
              lodintable: false
            })
          } else {
            toast.error("لا يمكن حذف العنصر", {
              toastId: dat.id,
              pauseOnHover: false,
            });
            this.setState({
              data: oldData,
              lodintable: false
            });
          }
        });
    } catch (ex) {
      toast.error("لا يمكن حذف العنصر", { toastId: dat.id });
      this.setState({
        data: oldData,
        lodintable: false
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
        { label: "النوع", field: "isMale" },
        { label: "اختيارات", field: "option" },
      ],
      rows: this.state.data
    };

    return (
      <div>
        <div className="main-content">
          <div className="dashboard-header">
            <h5>الفنيين</h5>
            <div class="add-new-user">
              <Link to="/add-new-handyman">
                <i class="fas fa-plus"></i>
                <span>اضافة فني</span>
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
                <div class="spinner-grow text-primary" role="status">
                  <span class="sr-only">Loading...</span>
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

export default HandyMan;
