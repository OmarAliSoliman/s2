import React, { Component } from "react";

import TopHeader from "../Components/TopHeader";

import axios from "axios";

import { toast } from "react-toastify";

import joi from "joi-browser";

export default class AddNewOffer extends Component {
  state = {
    offerAmount: "",
    offerCouponCode: "",
    loading: false,
    disabled: false,
    errors: {},
  };

  schema = {
    offerAmount: joi.string().alphanum().required(),
    offerCouponCode: joi.string().required(),
  };

  // vlidate inputs
  validate = () => {
    const state = { ...this.state };
    delete state.errors;
    delete state.loading;
    delete state.disabled;
    const res = joi.validate(state, this.schema, { abortEarly: false });

    if (res.error === null) {
      this.setState({
        errors: {},
      });
      return res.error;
    }

    let newError = {};
    res.error.details.map((er) => {
      newError[er.path] = er.message;
    });

    this.setState({
      errors: newError,
    });

    return res.error;
  };

  render() {
    const submitForm = async (e) => {
      e.preventDefault();

      this.setState({
        loading: true,
        disabled: true,
      });
      const error = this.validate();
      if (error === null) {
        const state = { ...this.state };
        delete state.loading;
        delete state.errors;
        delete state.disabled;
        var newPrice = parseInt(state.offerAmount);
        state.offerAmount = newPrice;
        // console.log(state);
        try {
         await axios
            .post(
              "http://sal7lly-001-site1.ctempurl.com/api/Offer/CreateOffer",
              state
            )
            .then((res) => {
              if (res.status === 200) {
                toast.success("تم الاضافه بنجاح");
                this.setState({
                  offerAmount: "",
                  offerCouponCode: "",
                  loading: false,
                  disabled: false,
                  name: "",
                });
                this.props.history.replace("/offers")
              }else{
                toast("Error");
                this.setState({
                  loading: false,
                  disabled: false,
                });
              }
            });
        } catch (ex) {
          toast("" + ex);
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
      }
    };

    const handelChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    };

    return (
      <div>
        <div className="main-content">
          <div className="dashboard-header">
            <h5>اضافة عرض جديد</h5>
          </div>
          <div className="new-order">
            <div className="cardForm">
              <form action="" onSubmit={submitForm}>
                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group">
                      <input
                        type="text"
                        name=""
                        id=""
                        className="form-control"
                        placeholder="الكوبون"
                        name="offerCouponCode"
                        onChange={handelChange}
                        value={this.state.offerCouponCode}
                      />
                      <span className="error">
                        {this.state.errors.offerCouponCode}
                      </span>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group">
                      <input
                        type="number"
                        name=""
                        id=""
                        className="form-control"
                        placeholder="القيمة"
                        name="offerAmount"
                        onChange={handelChange}
                        value={this.state.offerAmount}
                      />
                      <span className="error">
                        {this.state.errors.offerAmount}
                      </span>
                    </div>
                  </div>
                  <div className="col-sm-12 col-lg-12">
                    <div className="btn-submit text-center">
                      <button type="submit">
                        {this.state.loading ? (
                          <div class="spinner-border text-light" role="status">
                            <span class="sr-only">Loading...</span>
                          </div>
                        ) : (
                          "اضافة"
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
