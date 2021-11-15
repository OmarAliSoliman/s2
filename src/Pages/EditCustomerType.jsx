import React, { Component } from "react";

// axios
import axios from "axios";

// joi
import joi, { errors } from "joi-browser";

// react-toastify
import { toast } from "react-toastify";

class EditCustomerType extends Component {
  state = {
    orderTypeId: "",
    orderTpeName: "",
    loading: false,
    lodintable: true,
    errors: {},
  };

  async componentDidMount() {
    const orderTypeid = this.props.match.params.id;
    await axios
      .get("http://sal7lly-001-site1.ctempurl.com/api/CustomerType/GetCustomerType/" + orderTypeid)
      .then((res) => {
        // console.log(res.data.data)
        this.setState({
          orderTpeName: res.data.data.name,
          orderTypeId: orderTypeid,
          lodintable: false
        });
      });
  }

  shema = {
    orderTpeName: joi.string().required(),
  };

  validate = () => {
    const state = { ...this.state };
    delete state.orderTypeId;
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
    const { orderTpeName, loading, errors } = this.state;

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
        const orderTpeName = this.state.orderTpeName;
        const orderTypeId = this.state.orderTypeId;
        // console.log(neworderTpeName, orderTypeId);
        try {
          await axios
            .put(
              "http://sal7lly-001-site1.ctempurl.com/api/CustomerType/UpdateCustomerType/" +
                orderTypeId,
              { name: orderTpeName }
            )
            .then((res) => {
              // console.log(res);
              if (res.status === 200) {
                this.setState({
                  loading: false,
                });
                toast.success("تم تعديل بنجاح", { theme: "colored" });
                this.props.history.replace("/customer-types");
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
                    name="orderTpeName"
                    id="order-type"
                    className="form-control"
                    value={orderTpeName}
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

export default EditCustomerType;
