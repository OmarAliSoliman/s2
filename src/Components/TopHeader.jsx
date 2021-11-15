import React, { Component } from "react";

class TopHeader extends Component {
  render() {
    return (
      <div>
        <div className="top-header">
          <div className="container">
            <div className="row">
              <div className="col-6 col-md-6 col-lg-12">
                <div className="mob-icon">
                  <button className="mobileIcon" onClick={this.props.openMobSideMenu}>
                    <i className="fi-rr-align-right"></i>
                  </button>
                </div>
              </div>
              <div className="col-6 col-md-6 col-lg-12">
                <div className="person-info">
                  <span className="notification">
                    <a className="">
                      <i className="fi-rr-bell"></i>
                    </a>
                    <div className="notification-box">
                      <h5 className="notification-header">الاشعارات</h5>
                      <a href="" className="noti-card">
                        <div className="card-img"></div>
                        <h5 className="card-title">
                          تم اضافه هذا الطلب من قبل العميل كود D4df3
                        </h5>
                        <span className="date">
                          <i></i>
                          <span>منذ 3 ساعات</span>
                        </span>
                      </a>
                      <a className="noti-card">
                        <div className="card-img"></div>
                        <h5 className="card-title">
                          تم اضافه هذا الطلب من قبل العميل كود D4df3
                        </h5>
                        <span className="date">
                          <i></i>
                          <span>منذ 3 ساعات</span>
                        </span>
                      </a>
                      <a href="" className="noti-card">
                        <div className="card-img"></div>
                        <h5 className="card-title">
                          تم اضافه هذا الطلب من قبل العميل كود D4df3
                        </h5>
                        <span className="date">
                          <i></i>
                          <span>منذ 3 ساعات</span>
                        </span>
                      </a>
                      <a href="" className="noti-card">
                        <div className="card-img"></div>
                        <h5 className="card-title">
                          تم اضافه هذا الطلب من قبل العميل كود D4df3
                        </h5>
                        <span className="date">
                          <i></i>
                          <span>منذ 3 ساعات</span>
                        </span>
                      </a>
                      <a href="" className="noti-card">
                        <div className="card-img"></div>
                        <h5 className="card-title">
                          تم اضافه هذا الطلب من قبل العميل كود D4df3
                        </h5>
                        <span className="date">
                          <i></i>
                          <span>منذ 3 ساعات</span>
                        </span>
                      </a>
                    </div>
                  </span>
                  <span className="persong-img">
                    <div className="person-img-info">
                      <h5>Eng:Omar Ali</h5>
                      <ul className="links list-unstyled">
                        <li>
                          <a href="">setting</a>
                          <i className="fi-rr-settings-sliders"></i>
                        </li>
                        <li>
                          <a href="">sign out</a>
                          <i className="fi-rr-sign-out"></i>
                        </li>
                      </ul>
                    </div>
                  </span>
                </div>
                <div className="clear"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TopHeader;
