import React, { Component } from "react";

// component
import TopHeader from "../Components/TopHeader";
import MdTable from "../Components/MdTable";

// axios
import axios from "axios";

// react router dom
import { Link } from "react-router-dom";

// react-toastify
import { toast } from "react-toastify";

// react bootstrap
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default class Emploeyee extends Component {
  state = {
    data: [],
    lodintable: true,
  };

  componentDidMount() {
    // console.log("hi");
    axios
      .get("http://sal7lly-001-site1.ctempurl.com/api/Employee/GetAllEmployee")
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            lodintable: false,
          });
        }
        var newData = res.data.data.reverse();
        newData.map((dat, index) => {
          dat.option = (
            <div className="option-parent">
              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-disabled" className="tooltipcalss">
                    حذف
                  </Tooltip>
                }
              >
                <button
                  onClick={() => this.deleteUser(dat)}
                  className="tableOption op-delete"
                >
                  <i className="fi-rr-trash"></i>
                </button>
              </OverlayTrigger>

              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-disabled" className="tooltipcalss">
                    تعديل
                  </Tooltip>
                }
              >
                <Link
                  to={"/edit-emploee-info/" + dat.id}
                  className="tableOption op-edit"
                >
                  <i className="fi-rr-edit"></i>
                </Link>
              </OverlayTrigger>
            </div>
          );
          var gender = dat.isMale ? "ذكر" : "انثى";
          dat.isMale = gender;

          var dataDate = dat.dateModified.split("T")[0];
          dat.dateMod = dataDate;

          if(dat.city != null){
            dat.city = dat.city.name;
          }
        });



        this.setState(
          {
            data: newData,
          },
          () => {
            // console.log(this.state.data);
          }
        );
      });
  }

  deleteUser = async (dat) => {
    this.setState({
      lodintable: true,
    });

    const oldData = [...this.state.data];

    let newUsers = this.state.data.filter((user) => user.id !== dat.id);
    this.setState({
      data: newUsers,
    });

    try {
      await axios
        .delete(
          "http://sal7lly-001-site1.ctempurl.com/api/Employee/Delete/" + dat.id
        )
        .then((res) => {
          // console.log(res.status);
          if (res.status === 200) {
            toast.success("تم حذف العنصر بنجاح", { toastId: dat.id });
            this.setState({
              lodintable: false,
            });
          } else {
            toast.error("لا يمكن حذف العنصر", {
              toastId: dat.id,
              pauseOnHover: false,
            });
            this.setState({
              data: oldData,
              lodintable: false,
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
        { label: "تاريخ النشاء", field: "dateMod" },
        { label: "النوع", field: "isMale" },
        { label: "الاختيارات", field: "option" },
      ],
      rows: this.state.data,
    };

    return (
      <div>
        <div className="main-content">
          <div className="dashboard-header">
            <h5>المستخدمين</h5>
            <div className="add-new-user">
              <Link to="/add-new-employee">
                <i className="fas fa-plus"></i>
                <span>اضافة مستخدم </span>
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
