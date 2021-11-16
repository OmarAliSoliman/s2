import React, { Component } from "react";


// component
// import TopHeader from "../Components/TopHeader";
import Statistic from "../Components/Statistic";
import ChartInfo from "../Components/ChartInfo";
import axios from "axios";

class Home extends Component {
  // state and functions

  // state
  state = {
    // cardnumber: [1, 2, 3, 4, 5, 6],
    allOrderNumber: 0,
    allOrderSet: 0,
    allOrderCancel: 0,
    allIncome: 0,
  };

  componentDidMount() {
    axios.get(`http://sal7lly-001-site1.ctempurl.com/api/Orders/GetAllOrders`).then((res) => {
      if (res.status === 200) {
        this.setState({
          allOrderNumber: res.data.data.length
        })
      }
    })

    axios.get(`http://sal7lly-001-site1.ctempurl.com/api/Orders/GetAllOrdersByStep?OrderSteps=b06eab9a-162d-44c5-4fa6-08d99d6e3e93`).then((res) => {
      if (res.status === 200) {
        this.setState({
          allOrderSet: res.data.data.length
        })
      }
    })

    axios.get(`http://sal7lly-001-site1.ctempurl.com/api/Orders/GetAllOrdersByStep?OrderSteps=58938a89-3bc8-4f41-4fa9-08d99d6e3e93`).then((res) => {
      if (res.status === 200) {
        this.setState({
          allOrderCancel: res.data.data.length
        })
      }
    })

    axios.get(`http://sal7lly-001-site1.ctempurl.com/api/Statistics/GetAllStatistics`).then((res) => {
      if (res.status === 200) {
        this.setState({
          allIncome: res.data.data
        })
      }
    })
  }

  render() {

    const { allOrderNumber, allOrderSet, allOrderCancel, allIncome } = this.state;

    return (
      <div>
        <div className="main-content">
          <div className="">
            <div className="dashboard-header">
              <h5>الرئيسية</h5>
            </div>
            <div className="main-statistics">
              <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-3">
                  <Statistic carditem={allOrderNumber} title="جميع الطلبات" icon="fas fa-boxes" />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3">
                  <Statistic carditem={allOrderSet} title="جميع الطلبات المعينه" icon="fas fa-user-plus" />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3">
                  <Statistic carditem={allOrderCancel} title="جميع الطلبات الملغيه" icon="fas fa-window-close" />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3">
                  <Statistic carditem={allIncome} title="مجموع الدخل" icon="fas fa-money-bill-wave" />
                </div>
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
