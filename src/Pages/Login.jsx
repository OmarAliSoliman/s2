import React, { Component } from "react";

export default class Login extends Component {
  render() {
    return (
      <div>
        <div className="login">
          <img src="./images/login-af.png" className="loginImgBf" alt="" />
          <div className="container">
            <div className="login-form">
              <h5 className="login-head">تسجيل الدخول للاعضاء</h5>
              <div className="row">
                <div className="col-sm-12 col-lg-12">
                  <div className="form-group">
                    <input
                      type="text"
                      name=""
                      id=""
                      className="form-control"
                      placeholder="اسم المستخدم"
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-lg-12">
                  <div className="form-group">
                    <input
                      type="password"
                      name=""
                      id=""
                      className="form-control"
                      placeholder="كلمة المرور"
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-lg-12">
                  <div className="btn-subm">
                    <button type="submit" className="btn btn-block btn-black">تسجيل الدخول</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
