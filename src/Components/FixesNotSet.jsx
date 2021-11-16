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
import Select from "react-select";

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
    const date = this.state.datevalue;
    this.setState({
      lodintable: true,
    })
    axios
      .get(
        `http://sal7lly-001-site1.ctempurl.com/api/Orders/GetAllOrdersByStep?OrderSteps=8938780e-4080-4a45-4fa5-08d99d6e3e93${date == "" ? "" : `&date=${date}`}`
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

          var datem = dat.dateCreated.split("T")[0];
          dat.dateC = datem;

          var timep = dat.dateCreated.split("T")[1];
          var splittedString = timep.split(":");
          timep = splittedString.slice(0, -1).join(':');
          timep = timep.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [timep];

          if (timep.length > 1) { // If time format correct
            timep = timep.slice(1);  // Remove full string match value
            // timep[5] = +timep[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
            timep[0] = +timep[0] % 12 || 12; // Adjust hours
          }
          timep.join('');
          dat.timeT = timep;


          var timepr = dat.datePrefered.split("T")[1];
          var time = timepr
            .toString()
            .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [timepr];
          if (time.length > 1) {
            // If time format correct
            time = time.slice(1); // Remove full string match value
            // time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
          }
          time.join("");
          dat.timepre = time;


        });



        this.setState({
          data: newData,
          // allDates: uniq,
        });
      });

    axios
      .get(
        "http://sal7lly-001-site1.ctempurl.com/api/Orders/GetAllOrdersByStep?OrderSteps=8938780e-4080-4a45-4fa5-08d99d6e3e93"
      )
      .then((res) => {
        var newData = res.data.data;
        var newallDates = [];
        newData.map((dat, index) => {
          var datem = dat.dateCreated.split("T")[0];
          dat.dateC = datem;
          newallDates.push(datem);
        });
        var uniq = [...new Set(newallDates)];
        uniq.sort();
        uniq.unshift("all")
        this.setState({
          allDates: uniq,
        });
      });
  }

  render() {
    const { allDates } = this.state;

    function formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [month, day, year].join("-");
    }

    const fiterDate = (value, action) => {
      var date = value.value;
      var newd = "";
      if (date == "all") {
        newd = "";
      } else {
        date = formatDate(date);
        newd = date;
      }
      this.setState(
        {
          datevalue: newd,
        },
        () => {
          console.log(this.state.datevalue, "sds");
          this.componentDidMount();
        }
      );
      // window.location.reload();
    };

    const options = this.state.allDates.map((item) => ({
      value: item,
      label: item,
    }));

    const onSelectChange = (value, action) => {
      console.log(action.name, value.value)
      this.setState({
        [action.name]:value.value
      })
    };

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
        { label: "وقت الطلب", field: "timeT" },
        { label: "وقت تنفيذ الطلب", field: "timepre" },
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
          <Select
            id="state-select"
            options={options}
            clearable={true}
            // name="handymanId"
            placeholder={"اختر التاريخ"}
            onChange={fiterDate}
          />
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
