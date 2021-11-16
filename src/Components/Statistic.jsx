import React, { Component } from "react";

class Statistic extends Component {
  render() {
    var { carditem, title, icon } = this.props;
    return (
      <div>
        <div className="stati-card">
          <div className="card-icon">
            <i className={icon}></i>
          </div>
          <h5 className="card-title">{title}</h5>
          {carditem == 0 ? (<div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>) : (<p className="card-text"> {carditem} </p>)}

        </div>
      </div>
    );
  }
}

export default Statistic;