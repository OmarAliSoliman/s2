import React, { Component } from "react";

// component
import TopHeader from "../Components/TopHeader";

// axios
import axios from "axios";

// toast 
import { toast } from "react-toastify";

// joi
import joi from 'joi-browser'

class AddNewCity extends Component {
  state = {
    name: "",
    loading: false,
    error: {},
  };

  schema = {
    name: joi.string().required(),
  };

  // vlidate inputs
  validate = () => {
    const state = { ...this.state };
    delete state.error;
    delete state.loading;
    const res = joi.validate(state, this.schema, { abortEarly: false });

    if (res.error === null) {
      this.setState({
        error: {},
      });
      return res.error;
    }

    let newError = {};
    res.error.details.map((er) => {
      newError[er.path] = er.message;
    });

    this.setState({
      error: newError,
    });

    return res.error;
  };

  render() {
    // submit the form
    const submitForm = (e) => {
      e.preventDefault();

      this.setState({
        loading: true,
      });
      const error = this.validate();
      if (error === null) {
        const state = { ...this.state };
        delete state.loading;
        delete state.error;
        axios
          .post(
            "http://sal7lly-001-site1.ctempurl.com/api/City/AddCity",
            state
          )
          .then((res) => {
            if (res.status === 200) {
              toast.success("تم الاضافه بنجاح");
              this.setState({
                loading: false,
                name: "",
              });
            }
            this.props.history.replace("/cities")
          });
      } else {
        toast.error("هناك بعض الاخطاء");
        this.setState({
          loading: false,
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
            <h5>اضافة مدينة جديده</h5>
          </div>
          <div className="new-order">
            <div className="cardForm">
              <form action="" onSubmit={submitForm}>
                <div className="row">
                  <div className="col-sm-12 col-md-6 col-lg-6">
                    <div className="form-group">
                      <input
                        type="text"
                        name="name"
                        id=""
                        className="form-control"
                        placeholder="الاسم"
                        onChange={handelChange}
                        value={this.state.name}
                      />
                      <span className="error">{this.state.error.name}</span>
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

export default AddNewCity;
