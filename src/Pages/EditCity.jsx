import React, { Component } from "react";

// axios
import axios from "axios";

// joi
import joi, { errors } from "joi-browser";

// react-toastify
import { toast } from "react-toastify";

class EditCity extends Component {
  state = {
    cityId: "",
    cityName: "",
    loading: false,
    errors: {},
  };

  async componentDidMount() {
    const citId = this.props.match.params.id;
    await axios
      .get("http://sal7lly-001-site1.ctempurl.com/api/City/GetCity/" + citId)
      .then((res) => {
        this.setState({
          cityName: res.data.data.name,
          cityId: citId,
        });
      });
  }

  shema = {
    cityName: joi.string().required()
  }

  validate = () =>{
    const state = {...this.state};
    delete state.cityId;
    delete state.loading;
    delete state.errors;
    const res = joi.validate(state, this.shema, { abortEarly: false });
    if(res.error === null){
      return res.error
    }

    const newError = {};
    res.error.details.map((er, index)=>{
      newError[er.path] = er.message
    })

    this.setState({
      errors: newError
    })

    return res.error;
  }

  render() {
    const { cityName, newCityName, loading, errors } = this.state;

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
        const cityName = this.state.cityName;
        const cityid = this.state.cityId;
        // console.log(newcityName, cityid);
        try {
          await axios
            .put(
              "http://sal7lly-001-site1.ctempurl.com/api/City/UpdateCity/" +
                cityid,
              { name: cityName }
            )
            .then((res) => {
              // console.log(res);
              if (res.status === 200) {
                this.setState({
                  loading: false,
                });
                toast.success("تم تعديل المدينة بنجاح", { theme: "colored"});
                this.props.history.replace("/cities");
              }
            });
        } catch (ex) {
          toast("" + ex);
          this.setState({
            loading: false
          })
        }
      }else{  
        toast.error("هناك بعض الاخطاء");
        this.setState({
          loading: false
        })
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
                  <label htmlFor="city-name">اسم المدينة </label>
                  <input
                    type="text"
                    name="cityName"
                    id="city-name"
                    className="form-control"
                    value={cityName}
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditCity;
