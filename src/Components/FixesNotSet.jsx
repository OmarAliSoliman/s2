import React, { Component } from "react";

// data MDBDataTable from mdbreact
import { MDBDataTable } from "mdbreact";

// component
import TopHeader from "../Components/TopHeader";

// axios
import axios from "axios";
import { Link } from "react-router-dom";
import MdTable from "../Components/MdTable";

// mdreact
import { MDBBtn } from "mdbreact";

import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ModalAddHandymanToOrder from "./ModalAddHandymanToOrder";
import FilterDate from "./FilterDate";

class FixesNotSet extends Component {
  state = {
    data: [],
    names: [],
    allDates: [],
    lodintable: true,
    datevalue: "",
    rowdata: {},
  };

  handleShow = (dat) => {
    this.setState({
      show: true,
      rowdata: dat,
    });
  };

   componentDidMount() {
     axios
      .get(
        "http://sal7lly-001-site1.ctempurl.com/api/Orders/GetAllOrdersByStep?OrderSteps=8938780e-4080-4a45-4fa5-08d99d6e3e93&date=11-11-2021"
      )
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          this.setState({
            lodintable: false,
          });
        }
        var newData = res.data.data.reverse();
        var nallDates = [];
        newData.map((dat, index) => {
          dat.option = (
            <div className="option-parent">
              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-disabled" className="tooltipcalss">
                    تعديل الطلب
                  </Tooltip>
                }
              >
                <Link
                  to={"/edit-order-info/" + dat.id}
                  className="tableOption op-edit"
                >
                  <i className="fi-rr-edit"></i>
                </Link>
              </OverlayTrigger>
            </div>
          );
          dat.technicals = (
            <div className="option-parent">
              <MDBBtn
                className="btnOpenModal"
                size="sm"
                onClick={() => this.handleShow(dat)}
              >
                <i className="fi-rr-pencil"></i>
                <span>اضف فني</span>
              </MDBBtn>
            </div>
          );

          if (dat.customer != null) {
            dat.fullName = dat.customer.fullName;
            dat.clientMop = dat.customer.mobile;
          }

          if (dat.employee != null) {
            dat.employyrigister = dat.employee.fullName;
          }

          if (dat.service != null) {
            dat.service = dat.service.name;
          }

          if (dat.step != null) {
            dat.orderstep = dat.step.name;
          }

          if (dat.orderType != null) {
            dat.ordersource = dat.orderType.name;
          }

          if (dat.customer != null) {
            dat.customertype = dat.customer.customerType.name;
          }

          if (dat.city != null) {
            dat.city = dat.city.name;
          }

          var datem = dat.datePrefered.split("T")[0];
          dat.dateC = datem;

          var timep = dat.datePrefered.split("T")[1];
          var time = timep
            .toString()
            .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [timep];
          if (time.length > 1) {
            // If time format correct
            time = time.slice(1); // Remove full string match value
            // time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
          }
          time.join("");
          dat.timeT = time;
          nallDates.push(datem);
        });
        // var uniq = [...new Set(nallDates)];
        // uniq.sort();
        // this.setState({
        //   data: newData,
        //   allDates: uniq,
        // });
      });


      axios.get("http://sal7lly-001-site1.ctempurl.com/api/Orders/GetAllOrdersByStep?OrderSteps=8938780e-4080-4a45-4fa5-08d99d6e3e93").then((res)=>{
        var newData = res.data.data;
        var nallDates = [];
        newData.map((dat, index) => {
          var datem = dat.datePrefered.split("T")[0];
          dat.dateC = datem;

          var uniq = [...new Set(nallDates)];
          uniq.sort();
          this.setState({
            allDates: uniq,
          });
        })
      })
  }

  render() {
    const { allDates } = this.state;

    const fiterDate = (e) =>{
      this.setState({
        datevalue: e.target.value
      }, ()=>{
        console.log(this.state.datevalue)
      })
    }

    const datatable = {
      columns: [
        { label: "العميل", field: "fullName" },
        { label: "المدينة", field: "city" },
        { label: "الفني", field: "technicals" },
        { label: "الخدمة", field: "service" },
        { label: "السعر", field: "price" },
        { label: "المصدر", field: "ordersource" },
        { label: "نوع الطلب", field: "customertype" },
        { label: "تسجيل", field: "employyrigister" },
        { label: "الحاله", field: "orderstep" },
        { label: "رقم هاتف العميل", field: "clientMop" },
        { label: "تاريخ الطلب", field: "dateC" },
        { label: "وقت تنفيذ الطلب", field: "timeT" },
        { label: "الاختيارات", field: "option" },
      ],
      rows: this.state.data,
    };

    const handleClose = () => {
      this.setState({
        show: false,
      });
    };
    return (
      <div>
        <h5 class="mb-3 text-center font-weight-bold h4">لم يتم التعيين</h5>
        <div className="filter">
          <label htmlFor="date-filter">فلتر على حسب التاريخ</label>
          <select
            name=""
            id="date-filter"
            onChange={fiterDate}
            className="dateFilter form-control"
            id=""
          >
            <option value="all">الكل</option>
            {allDates.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div
          className={this.state.lodintable ? "seeloading" : "seelodingdnone"}
        >
          <div class="spinner-grow text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <div>يتم التحميل</div>
        </div>
        <MdTable datatable={datatable} />

        <ModalAddHandymanToOrder
          show={this.state.show}
          handleShow={this.handleShow}
          handleClose={handleClose}
          rowdata={this.state.rowdata}
          // handelChange={handelChange}
        />
      </div>
    );
  }
}

export default FixesNotSet;
