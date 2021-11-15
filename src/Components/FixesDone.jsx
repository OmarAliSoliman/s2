import React, { Component } from "react";

// data MDBDataTable from mdbreact
import { MDBDataTable } from "mdbreact";

// component
import TopHeader from "../Components/TopHeader";

// axios
import axios from "axios";
import { Link } from "react-router-dom";
import MdTable from "../Components/MdTable";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

// mdreact
import { MDBBtn } from "mdbreact";
import ModalAddHandymanToOrder from "./ModalAddHandymanToOrder";
// import FixesNotSet from "../Components/FixesNotSet";

class FixesDone extends Component {
  state = {
    data: [],
    names: [],
    lodintable: true,
  };

  handleShow = () => {
    this.setState({
      show: true,
    });
  };

  async componentDidMount() {
    // console.log("hi");
    // var name= {};
    await axios
      .get(
        "http://sal7lly-001-site1.ctempurl.com/api/Orders/GetAllOrdersByStep?OrderSteps=5345faca-e21c-4661-4fa7-08d99d6e3e93&OrderSteps=12e7270a-d8c3-4451-4fa8-08d99d6e3e93"
      )
      .then((res) => {
        // console.log(res);
        var newData = res.data.data;
        newData.map((dat, index) => {
          var dataDate = dat.dateCreated.split("T")[0];
          dat.dateMod = dataDate;

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

          if (dat.handyMan != null) {
            dat.handymen = dat.handyMan.fullName;
          }

          if(dat.city != null){
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
        });
        if (res.status === 200) {
          this.setState({
            lodintable: false,
            data: newData,
          });
        }
      });

    // axios
    //   .get(
    //     "http://sal7lly-001-site1.ctempurl.com/api/Orders/GetAllOrdersByStep/ad4b9ffc-3d58-44c3-156d-08d9821c839c"
    //   )
    //   .then((res) => {
    //     console.log(res.data.data);
    //     var newDa = this.state.data;
    //     // newDa.concat(res.data.data);
    //     var newDa2 = newDa.concat(res.data.data);
    //     this.setState({
    //       data: newDa2
    //     })
    //   });
  }

  render() {
    const datatable = {
      columns: [
        { label: "العميل", field: "fullName" },
        { label: "المدينة", field: "city" },
        { label: "الفني", field: "handymen" },
        { label: "الخدمة", field: "service" },
        { label: "السعر", field: "price" },
        { label: "تسجيل", field: "employyrigister" },
        { label: "نوع الطلب", field: "customertype" },
        { label: "المصدر", field: "ordersource" },
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

    const handelChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    };

    const submitForm = (e) => {
      e.preventDefault();
    };

    return (
      <div>
        <h5 class="mb-3 text-center font-weight-bold h4">منتهية</h5>

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
          submitForm={submitForm}
        />
      </div>
    );
  }
}

export default FixesDone;

{
  /* <div
className={
  this.state.lodintable ? "seeloading" : "seelodingdnone"
}
>
<div class="spinner-grow text-primary" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div>يتم التحميل</div>
</div> */
}