import React, { Component } from "react";

import TopHeader from "../Components/TopHeader";

// joi
import joi from "joi-browser";

// axios
import axios from "axios";
import { EnumerableOwnPropertyNames } from "es-abstract/es2019";
import { toast } from "react-toastify";

class AddNewCustomer extends Component {
  state = {
    fullName: "",
    password: "",
    mobile: "",
    email: "",
    address: "",
    isMale: true,
    cityId: "",
    cities:[],
    customertypes:[],
    customerTypeId: "",
    errors: {},
    loading: false,
    disabled: false,
  };

  shema = {
    fullName: joi.string().required(),
    password: joi
      .string()
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      .required(),
    mobile: joi.string().alphanum().min(11).max(11).required(),
    // email: joi.string().email().required(),
    address: joi.string().required(),
    cityId: joi.string().required(),
    customerTypeId: joi.string().required(),
    isMale: joi.required(),
  };

  async componentDidMount(){
    axios
    .get("http://sal7lly-001-site1.ctempurl.com/api/City/GetAllCities")
    .then((res) => {
      if (res.status === 200) {
        // console.log(res.data.data);
        this.setState({
          cities: res.data.data,
        });
      }
    });

    axios
    .get("http://sal7lly-001-site1.ctempurl.com/api/CustomerType/GetCustomerTypes")
    .then((res) => {
      if (res.status === 200) {
        // console.log(res.data.data);
        this.setState({
          customertypes: res.data.data,
        });
      }
    });
  }

  validate = () => {
    let state = { ...this.state };
    delete state.errors;
    delete state.loading;
    delete state.disabled;
    delete state.cities;
    delete state.customertypes;
    delete state.email;
    var res = joi.validate(state, this.shema, { abortEarly: false });

    if (res.error === null) {
      this.setState({
        errors: {},
      });
      return res.error;
    }

    let newError = {};
    res.error.details.map((er) => {
      if (er.path[0] == "password") {
        er.message =
          "Minimum eight characters, at least one letter and one number";
        newError[er.path] = er.message;
      } else {
        newError[er.path] = er.message;
      }
      // console.log(er);
    });

    // console.log(this.state.errors);
    // this.state.errors.password = "Minimum eight characters, at least one letter and one number:";

    this.setState({
      errors: newError,
    });

    return res.error;
  };

  render() {
    const handelChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    };

    const stringToBoolean = (string) => {
      switch (string) {
        case "true":
        case "yes":
        case "1":
          return true;
        case "false":
        case "no":
        case "0":
        case null:
          return false;
        default:
          return Boolean(string);
      }
    };

    const submitForm = async (e) => {
      e.preventDefault();
      this.setState({
        loading: true,
        disabled: true,
      });
      const errors = this.validate();
      if (errors === null) {
        let state = { ...this.state };
        delete state.errors;
        delete state.loading;
        delete state.disabled;
        delete state.cities;
        delete state.customertypes;
        var ismale = stringToBoolean(state.isMale);
        state.isMale = ismale;
        if(state.email === ""){
          delete state.email;
        }
        // console.log(state);
        try {
          await axios
            .post(
              "http://sal7lly-001-site1.ctempurl.com/api/Customer/Create",
              state
            )
            .then((res) => {
              // console.log(res);
              if (res.status === 200) {
                toast.success("Happy New Customer");
                this.setState({
                  loading: false,
                  disabled: false,
                });
                this.props.history.push("/customers");
              }
            });
        } catch (ex) {
          toast.error("برجاء التاكد من المعلومات وان العميل ليس مسجل من قبل");
          // console.log(ex);
          this.setState({
            loading: false,
            disabled: false,
          });
        }
      } else {
        toast.error("برجاء التاكد من المعلومات");
        this.setState({
          loading: false,
          disabled: false,
        });
        return;
      }

      // console.log(this.state);
    };

    return (
      <div>
        <div className="main-content">
          <div className="dashboard-header">
            <h5>اضافة عميل جديد</h5>
          </div>
          <div className="new-order">
            <div className="cardForm">
              <form action="" onSubmit={submitForm}>
                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group">
                      <label htmlFor="full-name">الاسم بالكامل</label>
                      <input
                        type="text"
                        placeholder="الاسم بالكامل"
                        name="fullName"
                        id="full-name"
                        className="form-control"
                        value={this.state.fullName}
                        onChange={handelChange}
                      />
                      <span className="error">
                        {this.state.errors.fullName}
                      </span>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group">
                      <label htmlFor="cu-password">الرقم السري</label>
                      <input
                        type="password"
                        placeholder="الرقم السري"
                        name="password"
                        id="cu-password"
                        className="form-control"
                        value={this.state.password}
                        onChange={handelChange}
                      />
                      <span className="error">
                        {this.state.errors.password}
                      </span>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group">
                      <label htmlFor="cu-mobile">رقم التلفون</label>
                      <input
                        type="number"
                        placeholder="رقم التلفون"
                        name="mobile"
                        id="cu-mobile"
                        className="form-control"
                        value={this.state.mobile}
                        onChange={handelChange}
                      />
                      <span className="error">{this.state.errors.mobile}</span>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group">
                      <label htmlFor="cu-email">الايميل</label>
                      <input
                        type="email"
                        placeholder="الايميل"
                        name="email"
                        id="cu-emeail"
                        className="form-control"
                        value={this.state.email}
                        onChange={handelChange}
                      />
                      <span className="error">{this.state.errors.email}</span>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group">
                      <label htmlFor="cu-adress">الجنس</label>
                      <select
                        name="isMale"
                        id=""
                        value={this.state.isMale}
                        onChange={handelChange}
                        className="form-control"
                      >
                        <option value={true}>ذكر</option>
                        <option value={false}>انثى</option>
                      </select>
                      <span className="error">{this.state.errors.isMale}</span>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group">
                      <label htmlFor="customer-city">المدينة</label>
                      <select
                        name="cityId"
                        value={this.state.cityId}
                        className="form-control"
                        id="customer-city"
                        onChange={handelChange}
                      >
                        <option selected>اختر المدينة</option>
                        {this.state.cities.map((city) => (
                          <option value={city.id} key={city.id}>{city.name}</option>
                        ))}
                      </select>
                      <span className="error">{this.state.errors.cityId}</span>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group">
                      <label htmlFor="customer-type">نوع العميل</label>
                      <select
                        name="customerTypeId"
                        value={this.state.customerTypeId}
                        className="form-control"
                        id="customer-type"
                        onChange={handelChange}
                      >
                        <option selected>اختر نوع العميل</option>
                        {this.state.customertypes.map((custype) => (
                          <option value={custype.id} key={custype.id}>{custype.name}</option>
                        ))}
                      </select>
                      <span className="error">{this.state.errors.customerTypeId}</span>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group">
                      <label htmlFor="cu-adress">العنوان</label>
                      <input
                        type="text"
                        placeholder="العنوان"
                        name="address"
                        id="cu-adress"
                        className="form-control"
                        onChange={handelChange}
                        value={this.state.address}
                      />
                      <span className="error">{this.state.errors.address}</span>
                    </div>
                  </div>
                  <div className="col-sm-12 col-lg-12">
                    <div className="btn-submit">
                      <button
                        type="submit"
                        className="btn"
                        disabled={this.state.disabled}
                      >
                        {this.state.loading ? (
                          <div class="spinner-border text-light" role="status">
                            <span class="sr-only">Loading...</span>
                          </div>
                        ) : (
                          "تسجيل"
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

export default AddNewCustomer;
