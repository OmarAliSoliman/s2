import React, { Component } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { Joi } from "joi-browser";

export default class EditOfferInfo extends Component {
  state = {
    offerCouponCode: "",
    offerAmount: 0,
    loading: false,
    lodintable: false,
  };

  componentDidMount() {
    const offerId = this.props.match.params.id;
    this.setState({
      lodintable: true,
    });
    axios
      .get(
        "http://sal7lly-001-site1.ctempurl.com/api/Offer/GetOffers/" + offerId
      )
      .then((res) => {
        // console.log(res.data.data);
        if (res.status === 200) {
          this.setState({
            offerCouponCode: res.data.data.offerCouponCode,
            offerAmount: res.data.data.offerAmount,
            lodintable: false,
          });
        }
      });
  }

  render() {
    const { offerAmount, offerCouponCode, loading } = this.state;
    const handelChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    };

    const submitForm = (e) => {
      e.preventDefault();
      const offerId = this.props.match.params.id;
      this.setState({
        loading: true,
      });
      const state = { ...this.state };
      delete this.state.lodintable;
      delete this.state.loading;
      const newOfferAmoutn = parseInt(state.offerAmount);
      state.offerAmount = newOfferAmoutn;
      axios
        .put(
          "http://sal7lly-001-site1.ctempurl.com/api/Offer/UpdateOffer/" +
            offerId,
          state
        )
        .then((res) => {
          if (res.status === 200) {
            toast.success("تم التعديل بنجاح");
            this.setState({
              loading: false,
              // offerAmount: "",
              // offerCouponCode: ""
            });
            this.props.history.replace("/offers");
          }
        });
    };

    return (
      <div>
        <div className="main-content">
          <div className="dashboard-header">
            <h5>تعديل العرض</h5>
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
                      <label htmlFor="offer-copon">اسم العرض</label>
                      <input
                        type="text"
                        name="offerCouponCode"
                        id="offer-copon"
                        className="form-control"
                        onChange={handelChange}
                        value={offerCouponCode}
                      />
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="form-group">
                      <label htmlFor="offer-copon">قيمة العرض</label>
                      <input
                        type="number"
                        name="offerAmount"
                        id="offer-copon"
                        className="form-control"
                        onChange={handelChange}
                        value={offerAmount}
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
