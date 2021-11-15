import React, { Component } from "react";


// component
// import TopHeader from "../Components/TopHeader";
import Statistic from "../Components/Statistic";
import ChartInfo from "../Components/ChartInfo";

class Home extends Component {
  // state and functions

  // state
  state = {
    cardnumber: [1, 2, 3, 4, 5, 6],
  };

  render() {
    return (
      <div>
        <div className="main-content">
          <div className="">
            <div className="dashboard-header">
              <h5>الرئيسية</h5>
            </div>
            <div className="main-statistics">
              <div className="row">
                {this.state.cardnumber.map((item, index) => (
                  <div className="col-sm-12 col-md-6 col-lg-4" key={index}>
                   <Statistic carditem = {item} />
                  </div>
                ))}
              </div>
            </div>

            <div className="allcharts">
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-7">
                  <div className="chart-card">
                    <ChartInfo />
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-5">
                  <div className="chart-card">
                    <canvas
                      id="myChartCities"
                      width="100"
                      height="100"
                    ></canvas>
                  </div>
                  <div className="most-tech-orders">
                    <div
                      className="card-img"
                      style={{ backgroundImage: "url(./images/persons.png)" }}
                    ></div>
                    <h5 className="card-title">الفني الاكثر طلبا</h5>
                    <p className="card-text">عمر علي سليمان</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="report">
              <div className="card-rebort">
                <h5>قم بتنزيل تقرير أرباحك</h5>
                <a href="">تحميل الان</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
