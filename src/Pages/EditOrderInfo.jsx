import React, { Component } from "react";

import axios from "axios";
import { toast } from "react-toastify";

export default class EditOrderInfo extends Component {
  state = {
    // lodintable: true,
    loading: false,
    // loadingbtn: false,
    fullName: "",
    mobile: "",
    address: "",
    isMale: "",
    lodintable: true,
    empfullName: "",
    date: "",
    time: "",
    allHandyman: [],
    orderTypeId: "",
    ordersTypes:[],
    cityId: "",
    cities: [],
    services: [],
    allSteps: [],
    customerId: "",
    employeeId: "",
    handyManId: "",
    datePrefered: "",
    serviceId: "",
    orderStepId: "",
    offerId: "",
    orderDetails: "",
    orderComments: "",
    orderNotes: "",
    price: 0,
    offerPrice: 0,
    priceAfterOffer: 0,
  };

  componentDidMount() {
    const orderId = this.props.match.params.id;
    axios
      .get(
        "http://sal7lly-001-site1.ctempurl.com/api/Orders/GetAllOrders"
      )
      .then((res) => {
        const orderInfo = res.data.data.filter((da) => da.id === orderId);
        // console.log(orderInfo[0].datePrefered.split("T")[0]);
        this.setState({
          cityId: orderInfo[0].cityId,
          date: orderInfo[0].datePrefered.split("T")[0],
          time: orderInfo[0].datePrefered.split("T")[1],
          serviceId: orderInfo[0].serviceId,
          handyManId: orderInfo[0].handyManId,
          orderStepId: orderInfo[0].orderStepId,
          orderDetails: orderInfo[0].orderDetails,
          customerId: orderInfo[0].customerId,
          employeeId: orderInfo[0].employeeId,
          price: orderInfo[0].price,
          orderNotes: orderInfo[0].orderNotes,
          orderComments: orderInfo[0].orderComments,
          orderTypeId: orderInfo[0].orderTypeId,
          lodintable: false,
        });
        // console.log(orderInfo);
        axios
          .get(
            "http://sal7lly-001-site1.ctempurl.com/api/Customer/GetCustomer/" +
              orderInfo[0].customerId
          )
          .then((res) => {
            // console.log(res.data.data);
            this.setState({
              fullName: res.data.data.fullName,
              mobile: res.data.data.mobile,
              address: res.data.data.address,
              isMale: res.data.data.isMale,
            });
          });

        axios
          .get(
            "http://sal7lly-001-site1.ctempurl.com/api/Employee/GetEmployee/" +
              orderInfo[0].employeeId
          )
          .then((res) => {
            // console.log(res);
            this.setState({
              empfullName: res.data.data.fullName,
            });
          });

        axios
          .get("http://sal7lly-001-site1.ctempurl.com/api/City/GetAllCities")
          .then((res) => {
            if (res.status === 200) {
              this.setState({
                cities: res.data.data,
              });
            }
          });

        axios
          .get(
            "http://sal7lly-001-site1.ctempurl.com/api/MainService/GetAllMainService"
          )
          .then((res) => {
            this.setState({
              services: res.data.data,
            });
          });

        axios
          .get(
            "http://sal7lly-001-site1.ctempurl.com/api/HandyMan/GetAllHandyMen"
          )
          .then((res) => {
            this.setState({
              allHandyman: res.data.data,
            });
          });

        axios
          .get(
            "http://sal7lly-001-site1.ctempurl.com/api/OrderStep/GetAllOrderSteps"
          )
          .then((res) => {
            this.setState({
              allSteps: res.data.data,
            });
          });

          axios
          .get(
            "http://sal7lly-001-site1.ctempurl.com/api/OrderType/GetOrderTypes"
          )
          .then((res) => {
            this.setState({
              ordersTypes: res.data.data,
            });
          });
      });
  }

  render() {
    const {
      cityId,
      fullName,
      mobile, 
      address, 
      isMale,
      empfullName,
      date,
      time,
      cities,
      services,
      serviceId,
      handyManId,
      allHandyman,
      orderTypeId,
      ordersTypes,
      allSteps,
      orderNotes,
      orderComments,
      price,
      orderStepId,
      orderDetails,
    } = this.state;
    const handelChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    };

    const submitForm = (e) => {
      e.preventDefault();
      this.setState({
        loading: true,
      });
      const state = { ...this.state };
      delete state.loading;
      delete state.lodintable;
      delete state.allHandyman;
      delete state.allSteps;
      delete state.cities;
      delete state.ordersTypes;
      delete state.empfullName;
      delete state.fullName;
      delete state.mobile;
      delete state.address;
      delete state.isMale;
      delete state.services;
      delete state.time;
      delete state.date;

      // state.
      let newDate = this.state.date + "T" + this.state.time + "Z";
      state.datePrefered = newDate;
      // state.offerId="368e49fa-f934-4aed-14a6-08d968be4776";
      delete state.offerId;
      const newPrice = parseInt(state.price);
      state.price = newPrice;
      // console.log(state);
      const orderId = this.props.match.params.id;
      if(state.orderStepId == "8938780e-4080-4a45-4fa5-08d99d6e3e93"){
        state.handyManId = null;
        console.log("yes");
      }
      try{
        axios
        .post(
          "http://sal7lly-001-site1.ctempurl.com/api/Orders/UpdateOrder/" +
            orderId,
          state
        )
        .then((res) => {
          // console.log(res);
          if(res.status === 200){
            toast.success("تم التعديل بنجاح");
            this.setState({
              loading: false,
            });
            this.props.history.replace("/fixes-orders");
          }
        });
      }catch(ex){
        toast.error("" + ex);
        this.setState({
          loading: false,
        });
      }
    };

    return (
      <div>
        <div className="main-content">
          <div className="dashboard-header">
            <h5>تعديل الطلب</h5>
          </div>
          <div className="new-order">
            <div className="cardForm">
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
              <form action="" onSubmit={submitForm}>
                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group">
                      <label className="" htmlFor="user-name">
                        اسم العميل
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        id="user-name"
                        className="form-control"
                        onChange={handelChange}
                        value={fullName}
                        readOnly={true}
                      />
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group">
                      <label className="" htmlFor="user-phone">
                        رقم العميل
                      </label>
                      <input
                        type="text"
                        name="mobile"
                        id="user-phone"
                        className="form-control"
                        onChange={handelChange}
                        value={mobile}
                        readOnly={true}
                      />
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group">
                      <label htmlFor="your-gender">النوع</label>
                      <select
                        className="form-control"
                        name="isMale"
                        value={isMale}
                        onChange={handelChange}
                        id="your-city"
                        readOnly={true}
                        disabled={true}
                      >
                        <option value="" selected disabled>
                           النوع
                        </option>
                        <option value="true">ذكر</option>
                        <option value="false">انثى</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group">
                      <label htmlFor="your-city">المدينة</label>
                      <select
                        className="form-control"
                        name="cityId"
                        value={cityId}
                        onChange={handelChange}
                        id="your-city"
                        readOnly={true}
                        disabled={true}
                      >
                        <option value="" selected disabled>
                          اختار المدينة
                        </option>
                        {cities.map((city) => (
                          <option value={city.id} key={city.id}>{city.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="form-group">
                      <label className="" htmlFor="user-address">
                        عنوان العميل
                      </label>
                      <input
                        type="text"
                        name="address"
                        id="user-address"
                        className="form-control"
                        onChange={handelChange}
                        value={address}
                        readOnly={true}
                      />
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group">
                      <label htmlFor="employee-name" className="">
                        اسم الموظف
                      </label>
                      <input
                        type="text"
                        name="empfullName"
                        id="employee-name"
                        className="form-control"
                        onChange={handelChange}
                        value={empfullName}
                        readOnly={true}
                      />
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-6 col-lg-6">
                    <div className="form-group">
                    <label htmlFor="source-name" className="">
                        مصدر الاستقبال
                      </label>
                      <select
                        name="orderTypeId"
                        id="source-name"
                        className="customSelect form-control"
                        value={orderTypeId}
                        onChange={handelChange}
                      >
                        <option value="" selected disabled>
                          مصدر استقبال الطلب{" "}
                        </option>
                        {ordersTypes.map((ords) => (
                          <option value={ords.id} key={ords.id}>
                            {ords.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group">
                      <label htmlFor="order-date">التاريخ</label>
                      <input
                        type="date"
                        name="date"
                        id="order-date"
                        className="form-control"
                        value={date}
                        onChange={handelChange}
                      />
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group">
                      <label htmlFor="order-time">الوقت</label>
                      <input
                        type="time"
                        name="time"
                        id="order-time"
                        className="form-control"
                        value={time}
                        onChange={handelChange}
                      />
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group">
                      <label htmlFor="order-type">نوع الخدمة</label>
                      <select
                        className="form-control"
                        name="serviceId"
                        value={serviceId}
                        onChange={handelChange}
                        id="order-type"
                      >
                        <option value="" selected disabled>
                          اختار نوع الخدمة
                        </option>
                        {services.map((serv) => (
                          <option value={serv.id} key={serv.id}>{serv.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group">
                      <label htmlFor="order-handyman">الفني</label>
                      <select
                        name="handyManId"
                        className="form-control"
                        id="order-handyman"
                        onChange={handelChange}
                        value={handyManId}
                      >
                        <option value="" selected disabled>
                          اختار الفني
                        </option>
                        {allHandyman.map((handyman) => (
                          <option value={handyman.id} key={handyman.id}>
                            {handyman.fullName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group">
                      <label htmlFor="order-status">حالة الطلب</label>
                      <select
                        name="orderStepId"
                        id="order-status"
                        className="form-control"
                        value={orderStepId}
                        onChange={handelChange}
                      >
                        <option value="" selected disabled>
                          حالة الاوردر
                        </option>
                        {allSteps.map((step) => (
                          <option value={step.id} key={step.id}>{step.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group">
                      <label className="" htmlFor="order-price">
                        السعر
                      </label>
                      <input
                        type="text"
                        name="price"
                        id="order-price"
                        className="form-control"
                        onChange={handelChange}
                        value={price}
                      />
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group">
                      <label className="" htmlFor="order-rate">
                        التقيم من 1 ل 10
                      </label>
                      <input
                        type="number"
                        name="orderComments"
                        id="order-rate"
                        className="form-control"
                        onChange={handelChange}
                        value={orderComments}
                        min = "1"
                        max = "10"
                      />
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group">
                      <label className="" htmlFor="order-not">
                        التقيم
                      </label>
                      <input
                        type="text"
                        name="orderNotes"
                        id="order-not"
                        className="form-control"
                        onChange={handelChange}
                        value={orderNotes}
                      />
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="form-group">
                      <label htmlFor="order-detials">تفاصيل الطلب</label>
                      <textarea
                        name="orderDetails"
                        id="order-detials"
                        className="form-control"
                        value={orderDetails}
                        onChange={handelChange}
                        // cols="30"
                        // rows="10"
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-sm-12 col-lg-12">
                    <div class="btn-submit">
                      <button type="submit" disabled={this.state.disabled}>
                        {this.state.loading ? (
                          <div class="spinner-border text-light" role="status">
                            <span class="sr-only">Loading...</span>
                          </div>
                        ) : (
                          "تعديل"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
