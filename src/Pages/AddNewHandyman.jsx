import React, { Component } from "react";

import TopHeader from "../Components/TopHeader";

// joi
import joi from "joi-browser";

// axios
import axios from "axios";
import { toast } from "react-toastify";

class AddNewHandyman extends Component {
  state = {
    fullName: "",
    password: "",
    mobile: "",
    email: "",
    address: "",
    cityId: "",
    cardId: "",
    isMale: true,
    cities: [],
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
    cardId: joi.string().alphanum().min(14).max(14).required(),
    // email: joi.string().email().required(),
    address: joi.string().required(),
    cityId: joi.required(),
    isMale: joi.required(),
  };

  async componentDidMount() {
    // const customerId = this.props.match.params.id;
    // await axios
    //   .get(
    //     "http://sal7lly-001-site1.ctempurl.com/api/HandyMan/GetHandyMen/" +
    //       customerId
    //   )
    //   .then((res) => {
    //     // if (res.status == 200) {
    //     //   this.setState({
    //     //     fullName: res.data.data.fullName,
    //     //     mobile: res.data.data.mobile,
    //     //     password: res.data.data.password,
    //     //     email: res.data.data.email,
    //     //     address: res.data.data.address,
    //     //     cityId: res.data.data.cityId,
    //     //     isMale: res.data.data.isMale,
    //     //     lodintable: false,
    //     //   });
    //     // }
    //     console.log(res);
    //   });

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
  }

  validate = () => {
    let state = { ...this.state };
    delete state.errors;
    delete state.loading;
    delete state.disabled;
    delete state.cities;
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
        var ismale = stringToBoolean(state.isMale);
        state.isMale = ismale;
        if(state.email === ""){
          delete state.email;
        }
        // console.log(state);
        try {
          await axios
            .post(
              "http://sal7lly-001-site1.ctempurl.com/api/HandyMan/Create",
              state
            )
            .then((res) => {
              // console.log(res);
              if (res.status === 200) {
                toast.success("تم اضافة الفني بنجاح");
                this.setState({
                  loading: false,
                  disabled: false,
                });
                this.props.history.push("/handyMan");
              }
            });
        } catch (ex) {
          toast("تاكد من المعلومات");
          // console.log(ex);
          this.setState({
            loading: false,
            disabled: false,
          });
        }
      } else {
        toast.error("هناك بعض الاخطاء");
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
            <h5>اضافة فني جديد</h5>
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
                      <label htmlFor="card-id">الرقم القومي</label>
                      <input
                        type="text"
                        placeholder="الرقم القومي"
                        name="cardId"
                        id="card-id"
                        className="form-control"
                        value={this.state.cardId}
                        onChange={handelChange}
                      />
                      <span className="error">{this.state.errors.cardId}</span>
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
                        {this.state.cities.map((city, index) => (
                          <option value={city.id} key={city.id}>{city.name}</option>
                        ))}
                      </select>
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

export default AddNewHandyman;
