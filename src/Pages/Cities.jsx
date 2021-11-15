import React, { Component } from "react";

// component
import TopHeader from "../Components/TopHeader";
import MdTable from "../Components/MdTable";

// axios
import axios from "axios";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class Cities extends Component {
  state = {
    data: [],
    lodintable: true,
  };

  componentDidMount() {
    // console.log("hi");
    axios
      .get("http://sal7lly-001-site1.ctempurl.com/api/City/GetAllCities")
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
              <button
                onClick={() => this.deleteCity(dat)}
                color="red"
                className="tableOption op-delete"
                size="sm"
              >
                <i className="fi-rr-trash"></i>
              </button>

              <Link to={"/edit-city/" + dat.id} className="tableOption op-edit">
                <i className="fi-rr-edit"></i>
              </Link>
            </div>
          );
          dat.index = index + 1;
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

  deleteCity = async (dat) => {
    // console.log(dat.id);
    try {
      await axios
        .delete(
          "http://sal7lly-001-site1.ctempurl.com/api/City/DeleteCity/"+
          dat.id
        )
        .then((res) => {
          if (res.status === 200) {
            toast.success("تم الحذف بنجاح");
          } else {
            toast.error("هناك بعض الاخطاء");
          }
        });
    } catch (ex) {
      toast.error("هناك بعض الاخطاء");
    }

    let newCities = this.state.data.filter((city)=>city.id !== dat.id);
    this.setState({
      data: newCities
    })

  };

  render() {
    const datatable = {
      columns: [
        { label: "الترتيب", field: "index" },
        { label: "الاسم", field: "name" },
        { label: "الاختيارات", field: "option" },
      ],
      rows: this.state.data,
    };

    return (
      <div>
        <div className="main-content">
          <div className="dashboard-header">
            <h5>المدن</h5>
            <div class="add-new-user">
              <Link to="/add-new-city">
                <i class="fas fa-plus"></i>
                <span>اضافة مدينة</span>
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

export default Cities;
