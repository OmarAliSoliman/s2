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

export default class Offers extends Component {

  state = {
    data: [],
    lodintable: true,
  };

  componentDidMount() {
    // console.log("hi");
    axios
      .get("http://sal7lly-001-site1.ctempurl.com/api/Offer/GetAllOffers")
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
                    Delete
                  </Tooltip>
                }
              >
                <button
                  onClick={() => this.deleteOffer(dat, index)}
                  className="tableOption op-delete"
                >
                  <i className="fi-rr-trash"></i>
                </button>
              </OverlayTrigger>

              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-disabled" className="tooltipcalss">
                    Edit
                  </Tooltip>
                }
              >
                <Link
                  to={"/edit-offer-info/" + dat.id}
                  className="tableOption op-edit"
                >
                  <i className="fi-rr-edit"></i>
                </Link>
              </OverlayTrigger>
            </div>
          );
          dat.index = index+1;
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

  deleteOffer = async (dat) => {
    this.setState({
      lodintable: true,
    })
    let oldData = [...this.state.data];

    const newData = this.state.data.filter((serv) => serv.id != dat.id);
    this.setState({
      data: newData
    })

    try{
      await axios.delete("http://sal7lly-001-site1.ctempurl.com/api/Offer/DeleteOffer/" + dat.id).then((res)=>{
        if(res.status === 200){
          toast.success("تم الحذف بنجاح");
          this.setState({
            lodintable: false
          })
        }else{
          toast.error("لا يمكن حذف هذا العنصر");
          this.setState({
            lodintable: false,
            data: oldData,
          })
        }
      })
    }catch(ex){
      toast.error("لا يمكن حذف هذا العنصر");
      this.setState({
        lodintable: false,
        data: oldData,
      })
    }

  };

  render() {
    const datatable = {
      columns: [
        { label: "الترتيب", field: "index" },
        { label: "الكوبون", field: "offerCouponCode" },
        { label: "القيمة", field: "offerAmount" },
        { label: "option", field: "option" },
      ],
      rows: this.state.data,
    };
    return (
      <div>
        <div className="main-content">
          <div className="dashboard-header">
            <h5>المستخدمين</h5>
            <div class="add-new-user">
              <Link to="/add-new-offer">
                <i class="fas fa-plus"></i>
                <span>اضافة عرض</span>
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
