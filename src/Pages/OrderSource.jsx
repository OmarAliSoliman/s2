import React, { Component } from 'react'

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

class OrderSource extends Component {
  state = {
    data: [],
    lodintable: true,
  };

  componentDidMount() {
    // console.log("hi");
    axios
      .get(
        "http://sal7lly-001-site1.ctempurl.com/api/OrderType/GetOrderTypes"
      )
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            lodintable: false,
          });
        }
        var newData = res.data.data.reverse();
        newData.map((dat, index) => {

          var datem = dat.dateCreated.split("T")[0];
          dat.dateC = datem;

          dat.option = (
            <div className="option-parent">
              <button
                onClick={() => this.deleteOrderSource(dat)}
                color="red"
                className="tableOption op-delete"
                size="sm"
              >
                <i className="fi-rr-trash"></i>
              </button>

              <Link
                to={"/edit-order-source/" + dat.id}
                className="tableOption op-edit"
              >
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


  deleteOrderSource = async (dat) => {
    this.setState({
      lodintable: true,
    })
    let oldData = [...this.state.data];

    const newData = this.state.data.filter((ords) => ords.id != dat.id);
    this.setState({
      data: newData
    })

    try{
      await axios.delete("http://sal7lly-001-site1.ctempurl.com/api/OrderType/DeleteOrderType/" + dat.id).then((res)=>{
        if(res.status === 200){
          toast.success("تم الحذف بنجاح");
          this.setState({
            lodintable: false
          })
          this.props.history.replace('/order-sources')
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
        { label: "الاسم", field: "name" },
        { label: "تاريخ الانشاء", field: "dateC" },
        { label: "الاختيارات", field: "option" },
      ],
      rows: this.state.data,
    };
    return (
      <div>
        <div>
          <div className="main-content">
            <div className="dashboard-header">
              <h5>مصادر الطلب</h5>
              <div class="add-new-user">
                <Link to="/add-new-order-source">
                  <i class="fas fa-plus"></i>
                  <span>اضافة مصدر استقبال</span>
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
      </div>
    );
  }
}

export default OrderSource;
