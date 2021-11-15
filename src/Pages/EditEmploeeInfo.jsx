import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";

class EditEmploeeInfo extends Component {
  state = {
    fullName: "",
    mobile: "",
    password: "",
    email: "",
    city: "",
    cityId: "",
    phoneValue: "",
    adress: "",
    cities: [],
    isMale: true,
    loading: false,
    lodintable: true,
  };

  async componentDidMount() {
    const customerId = this.props.match.params.id;
    await axios
      .get(
        "http://sal7lly-001-site1.ctempurl.com/api/Employee/GetEmployee/" +
          customerId
      )
      .then((res) => {
        if (res.status == 200) {
          this.setState({
            fullName: res.data.data.fullName,
            mobile: res.data.data.mobile,
            phoneValue: res.data.data.mobile,
            password: res.data.data.password,
            email: res.data.data.email,
            adress: res.data.data.adress,
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
      adress,
      phoneValue,
      isMale,
      cities,
    } = this.state;

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
      });
      const customerId = this.props.match.params.id;
      const state = { ...this.state };
      delete state.loading;
      delete state.lodintable;
      delete state.cities;
      delete state.phoneValue;
      var ismale = stringToBoolean(state.isMale);
      state.isMale = ismale;

      if(this.state.phoneValue == this.state.mobile){
        try {
          await axios
            .put(
              "http://sal7lly-001-site1.ctempurl.com/api/Employee/Update/" +
                customerId,
              state
            )
            .then((res) => {
              if (res.status === 200) {
                toast.success("تم التعديل بنجاح");
                this.setState({
                  loading: false,
                });
                this.props.history.replace("/emploeyee");
              }
            });
        } catch (ex) {
          toast.error("" + ex);
          this.setState({
            lodintable: false,
            loading: false,
          });
        }
      }else{
        axios.get("http://sal7lly-001-site1.ctempurl.com/api/Employee/GetAllEmployee").then((res)=>{
          const fire = res.data.data.filter((em)=>em.mobile == this.state.mobile);
          // console.log(state)
          if(fire.length == 0){
            try {
               axios
                .put(
                  "http://sal7lly-001-site1.ctempurl.com/api/Employee/Update/" +
                    customerId,
                  state
                )
                .then((res) => {
                  if (res.status === 200) {
                    toast.success("تم التعديل بنجاح");
                    this.setState({
                      loading: false,
                    });
                    this.props.history.replace("/emploeyee");
                  }
                });
            } catch (ex) {
              toast.error("" + ex);
              this.setState({
                lodintable: false,
                loading: false,
              });
            }
          }else{
            toast.error("هناك شخص مسجل بهذا الرقم");
            this.setState({
              lodintable: false,
              loading: false,
            });
          }
        })
      }


    };

    return (
      <div>
        <div className="main-content">
          <div className="dashboard-header">
            <h5>تعديل بينات العميل</h5>
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
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group">
                      <label htmlFor="employy-city"></label>
                      <select
                        name="cityId"
                        className="form-control"
                        id="employy-city"
                        value={cityId}
                        onChange={handelChange}
                      >
                        {/* <option value={} selected disabled>اختار المدينة</option> */}
                        {cities.map((city)=>(
                          <option value={city.id} key={city.id}>{city.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="form-group">
                      <label htmlFor="customer-email">العنوان</label>
                      <input
                        type="adress"
                        name="adress"
                        id="customer-adress"
                        className="form-control"
                        value={adress}
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
                <div className="spinner-border text-white" role="status">
                  <span className="sr-only">Loading...</span>
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

export default EditEmploeeInfo;
