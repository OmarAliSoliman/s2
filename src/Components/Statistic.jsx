import React, { Component } from "react";

class Statistic extends Component {
  render() {
    var {carditem} = this.props;
    return (
      <div>
        <div className="stati-card">
          <div className="card-icon">
            <i className="fi-rr-shopping-cart"></i>
          </div>
          <h5 className="card-title">طلبات اليوم</h5>
          <p className="card-text"> {carditem} </p>
        </div>
      </div>
    );
  }
}

export default Statistic;