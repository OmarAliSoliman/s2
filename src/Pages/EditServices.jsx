import React, { Component } from 'react'

// axios
import axios from "axios";

// joi
import joi, { errors } from "joi-browser";

// react-toastify
import { toast } from "react-toastify";

class EditServices extends Component {
  state = {
    serviceid: "",
    serviceName: "",
    loading: false,
    lodintable: true,
    errors: {},
  };

  async componentDidMount() {
    const serviceid = this.props.match.params.id;
    await axios
      .get("http://sal7lly-001-site1.ctempurl.com/api/MainService/GetMainService/" + serviceid)
      .then((res) => {
        // console.log(res.data.data)
        this.setState({
          serviceName: res.data.data.name,
          serviceid: serviceid,
          lodintable: false
        });
      });
  }

  shema = {
    serviceName: joi.string().required(),
  };

  validate = () => {
    const state = { ...this.state };
    delete state.serviceid;
    delete state.loading;
    delete state.errors;
    delete state.lodintable;
    const res = joi.validate(state, this.shema, { abortEarly: false });
    if (res.error === null) {
      return res.error;
    }

    const newError = {};
    res.error.details.map((er, index) => {
      newError[er.path] = er.message;
    });

    this.setState({
      errors: newError,
    });

    return res.error;
  };
  render() {
    const { serviceName, loading, errors } = this.state;

    const handelChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    };

    const submitForm = async (e) => {
      e.preventDefault();
      const error = this.validate();
      if (error === null) {
        this.setState({
          loading: true,
        });
        const serviceName = this.state.serviceName;
        const serviceid = this.state.serviceid;
        // console.log(newserviceName, serviceid);
        try {
          await axios
            .put(
              "http://sal7lly-001-site1.ctempurl.com/api/MainService/UpdateMainService/" +
                serviceid,
              { name: serviceName }
            )
            .then((res) => {
              // console.log(res);
              if (res.status === 200) {
                this.setState({
                  loading: false,
                });
                toast.success("تم تعديل بنجاح", { theme: "colored" });
                this.props.history.replace("/services");
              }
            });
        } catch (ex) {
          toast("" + ex);
          this.setState({
            loading: false,
          });
        }
      } else {
        toast.error("هناك بعض الاخطاء");
        this.setState({
          loading: false,
        });
      }
    };

    return (
      <div>
        <div className="main-content">
          <div className="dashboard-header">
            <h5>تعديل المدينة</h5>
          </div>
          <div className="new-order">
            <div className="cardForm">
              <form action="" onSubmit={submitForm}>
                <div className="form-group">
                  <label htmlFor="order-type">اسم نوع الاوردر</label>
                  <input
                    type="text"
                    name="serviceName"
                    id="order-type"
                    className="form-control"
                    value={serviceName}
                    onChange={handelChange}
                  />
                </div>
                <div className="btn-submit text-center">
                  <button type="submit">
                    {loading ? (
                      <div className="spinner-border text-light" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      "اضافة"
                    )}
                  </button>
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

export default EditServices;