import React, { Component } from "react";

// modal
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "react-select";

class ModalFormEditJopTitle extends Component {
  state = {
    handymanMobile: "",
    handymanNameChosen: "لم يتم اختيار فني",
    handymanId: "",
    loading: false,
    loadingbtn: false,
    cityId: "",
    // customerTypeId: "",
    allHandyMan: [],
    customerId: "",
    employeeId: "",
    handyManId: {},
    datePrefered: "",
    orderTypeId: "",
    serviceId: "",
    orderStepId: "",
    offerId: "",
    orderDetails: "",
    orderComments: "",
    orderNotes: "",
    // orderTypeId: "",
    price: 0,
    offerPrice: 0,
    priceAfterOffer: 0,
  };

  componentDidMount() {
    axios
      .get("http://sal7lly-001-site1.ctempurl.com/api/HandyMan/GetAllHandyMen")
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            allHandyMan: res.data.data,
          });
        }
      });
  }

  render() {
    const handelChange = (e) => {
      this.setState(
        {
          [e.target.name]: e.target.value,
          // handymanNameChosen: e.target.dataMobile,
        },
        () => {
          // console.log(this.state.handymanId)
        }
      );
    };

    const getHandyman = (e) => {
      e.preventDefault();
      this.setState({
        loading: true,
      });
      var handymenmobile = this.state.handymanMobile;
      // console.log(this.state.handymanCardId);
      axios
        .get(
          "http://sal7lly-001-site1.ctempurl.com/api/HandyMan/GetAllHandyMen"
        )
        .then((res) => {
          var newHandyMen = res.data.data;
          var handymen = res.data.data.filter(
            (hand) => hand.mobile == handymenmobile
          );
          if (handymen.length > 0) {
            this.setState({
              handymanNameChosen: handymen[0].fullName,
              handymanId: handymen[0].id,
              loading: false,
            });
            toast.success("تم ايجاد الفني بنجاح");
          } else {
            this.setState({
              handymanNameChosen: "لم يتم اختيار فني",
              loading: false,
            });
            toast.error("لا يوجد فني مسجل لدينا بهذا الرقم");
          }
          // console.log(handymen);
        });
    };


    const onSelectChange = (value, action) => {
      console.log(action.name, value.value)
      this.setState({
        [action.name]:value.value
      })
    };

    const submitForm = (e) => {
      e.preventDefault();
      const rowData = this.props.rowdata;
      const orderId = rowData.id;
      // console.log(rowData);
      this.setState(
        {
          cityId: rowData.cityId,
          customerId: rowData.customerId,
          employeeId: rowData.employeeId,
          handyManId: rowData.handyManId,
          datePrefered: rowData.datePrefered,
          serviceId: rowData.serviceId,
          orderStepId: rowData.orderStepId,
          offerId: rowData.offerId,
          orderDetails: rowData.orderDetails,
          orderComments: rowData.orderComments,
          orderNotes: rowData.orderNotes,
          price: rowData.price,
          offerPrice: rowData.offerPrice,
          priceAfterOffer: rowData.priceAfterOffer,
          orderTypeId: rowData.orderTypeId,
          // customerTypeId: rowData.customer.customerTypeId,

          // orderTypeId: rowData.orderTypeId,
        },
        () => {
          const state = { ...this.state };
          delete state.handymanMobile;
          delete state.handymanNameChosen;
          delete state.handymanId;
          delete state.loading;
          delete state.loadingbtn;
          state.orderStepId = "b06eab9a-162d-44c5-4fa6-08d99d6e3e93";
          // state.orderTypeId =  "3fa85f64-5717-4562-b3fc-2c963f66afa6";
          state.handyManId = this.state.handymanId;
          console.log(state);
          axios
            .post(
              "http://sal7lly-001-site1.ctempurl.com/api/Orders/UpdateOrder/" +
                orderId,
              state
            )
            .then((res) => {
              if (res.status === 200) {
                toast.success("تم التعديل برجاء برجاء انتظار تنشيط الصفحة");
                window.location.reload();
              }
            });
        }
      );
    };


    const options = this.state.allHandyMan.map((item) => ({
      value: item.id,
      label: item.fullName,
    }));

    return (
      <div>
        <Modal
          show={this.props.show}
          onHide={this.props.handleClose}
          className="modalChangejopTitle"
        >
          <Modal.Header closeButton>
            <Modal.Title>اختيار الفني</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form action="" onSubmit={submitForm}>
              <div className="row">
                <div className="col-sm-12 col-md-12">
                  <Select
                    id="state-select"
                    options={options}
                    clearable={true}
                    name="handymanId"
                    placeholder={"اختر الفني"}
                    onChange={onSelectChange}
                  />
                </div>
                {/* <div className="col-sm-12 col-md-12">
                  <select
                    name="handymanId"
                    id=""
                    className="form-control mb-3"
                    onChange={handelChange}
                  >
                    <option value="">اختر فني</option>
                    {this.state.allHandyMan.map((hand, index) => (
                      <option value={hand.id} key={index}>
                        {hand.fullName}
                      </option>
                    ))}
                  </select>
                </div> */}
                {/* <div className="col-sm-12 col-md-12">
                  <div className="form-group">
                    <input
                      type="text"
                      readOnly={true}
                      className="form-control"
                      value={this.state.handymanNameChosen}
                      name=""
                      id=""
                    />
                  </div>
                </div> */}
              </div>
              <button
                className="btn btn-block btn-dark-green"
                variant="primary"
                type="submit"
              >
                {this.state.loadingbtn ? (
                  <div class="spinner-border text-light" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                ) : (
                  "حفظ التغيرات"
                )}
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ModalFormEditJopTitle;
