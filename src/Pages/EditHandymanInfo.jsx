import axios from "axios";
import React, { Component } from "react";
import { toast } from "react-toastify";

class EditHandymanInfo extends Component {
  state = {
    fullName: "",
    mobile: "",
    password: "",
    email: "",
    city: "",
    cardId: "",
    cityId: "",
    cardId: "",
    isMale: true,
    cities: [],
    loading: false,
    lodintable: true,
  };

  async componentDidMount() {
    const customerId = this.props.match.params.id;
    await axios
      .get(
        "http://sal7lly-001-site1.ctempurl.com/api/HandyMan/GetHandyMen/"+
          customerId
      )
      .then((res) => {
        // console.log(res);
        if (res.status == 200) {
          this.setState({
            fullName: res.data.data.fullName,
            mobile: res.data.data.mobile,
            password: res.data.data.password,
            email: res.data.data.email,
            cardId: res.data.data.cardId,
            cityId: res.data.data.cityId,
            isMale: res.data.data.isMale,
            lodintable: false,
          });
        }
      });

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

  render() {
    const {
      fullName,
      loading,
      mobile,
      password,
      email,
      cityId,
      isMale,
      cardId,
      cities,
    } = this.state;

    const handelChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    };

    const stringToBoolean = (string) =>{
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
      });
      const customerId = this.props.match.params.id;
      const state = { ...this.state };
      delete state.loading;
      delete state.lodintable;
      delete state.cities;
      var ismale = stringToBoolean(state.isMale);
      state.isMale = ismale;
      // console.log(state);
      await axios
        .put(
          "http://sal7lly-001-site1.ctempurl.com/api/HandyMan/Update/" +
            customerId,
          state
        )
        .then((res) => {
          if (res.status === 200) {
            toast.success("تم التعديل بنجاح");
            this.setState({
              loading: false,
            });
            this.props.history.replace("/handyMan");
          }
        });
      // console.log(fullName);
    };

    return (
      <div>
        <div className="main-content">
          <div className="dashboard-header">
            <h5>تعديل بينات العميل</h5>
          </div>
          <div className="new-order">
            <div className="cardForm">
              <form action="" onSubmit={submitForm}>
                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group">
                      <label htmlFor="customer-name">الاسم</label>
                      <input
                        type="text"
                        name="fullName"
                        id="customer-name"
                        className="form-control"
                        value={fullName}
                        onChange={handelChange}
                      />
                    </div>
                    <span className="error"></span>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group">
                      <label htmlFor="customer-phone">رقم الهاتف</label>
                      <input
                        type="number"
                        name="mobile"
                        id="customer-phone"
                        className="form-control"
                        value={mobile}
                        onChange={handelChange}
                      />
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group">
                      <label htmlFor="customer-password">كلمة المرور</label>
                      <input
                        type="password"
                        name="password"
                        id="customer-password"
                        className="form-control"
                        value={password}
                        onChange={handelChange}
                      />
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group">
                      <label htmlFor="customer-email">الايميل</label>
                      <input
                        type="email"
                        name="email"
                        id="customer-email"
                        className="form-control"
                        value={email}
                        onChange={handelChange}
                      />
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group">
                      <label htmlFor="customer-city">المدينة</label>
                      <select
                        name="cityId"
                        value={cityId}
                        className="form-control"
                        id="customer-city"
                        onChange={handelChange}
                      >
                        {cities.map((city) => (
                          <option value={city.id} key={city.id}>{city.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group">
                      <label htmlFor="customer-gender">النوع</label>
                      <select
                        id="customer-gender"
                        name="isMale"
                        className="form-control"
                        value={isMale}
                        onChange={handelChange}
                      >
                        <option value={true}>ذكر</option>
                        <option value={false}>انثى</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="form-group">
                      <label htmlFor="customer-cardId">الرقم القومي</label>
                      <input
                        type="text"
                        name="cardId"
                        id="customer-cardId"
                        className="form-control"
                        value={cardId}
                        onChange={handelChange}
                      />
                    </div>
                  </div>
                  <div className="col-sm-12 col-lg-12">
                    <div className="btn-submit text-center">
                      <button type="submit">
                        {loading ? (
                          <div
                            className="spinner-border text-light"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : (
                          "تعديل"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <div
                className={
                  this.state.lodintable ? "seeloading" : "seelodingdnone"
                }
              >
                <div class="spinner-border text-white" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
                <div>يتم التحميل</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditHandymanInfo;
