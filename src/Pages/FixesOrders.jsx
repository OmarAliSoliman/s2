import React, { Component } from "react";

// data MDBDataTable from mdbreact
import { MDBDataTable } from "mdbreact";

// component
import TopHeader from "../Components/TopHeader";

// axios
import axios from "axios";
import { Link } from "react-router-dom";
import MdTable from "../Components/MdTable";

// mdreact
import { MDBBtn } from "mdbreact";
import FixesNotSet from "../Components/FixesNotSet";
import FixesSet from "../Components/FixesSet";
import FixesDone from "../Components/FixesDone";
import FixesReturns from "../Components/FixesReturns";
import FixesCancel from '../Components/FixesCancel';
import FixesTracking from "../Components/FixesTracking";
import FixesPreview from "../Components/FixesPreview";

class FixesOrders extends Component {
  state = {
    lodintable: true,
  };

  render() {
    return (
      <div>
        <div className="main-content">
          <div className="dashboard-header">
            <h5>طلبات الصيانه</h5>
            <div class="add-new-user">
              <Link to="/new-fix-order">
                <i class="fas fa-plus"></i>
                <span>اضافة طلب</span>
              </Link>
            </div>
          </div>

          <div className="orders-table mb-3">
            <div className="orderTable">

              <FixesNotSet />
            </div>
          </div>

          <div className="orders-table mb-3">
            <div className="orderTable">
              <FixesSet />
            </div>
          </div>

          <div className="orders-table mb-3">
            <div className="orderTable">
              <FixesTracking />
            </div>
          </div>

          <div className="orders-table mb-3">
            <div className="orderTable">
              <FixesPreview />
            </div>
          </div>

          <div className="orders-table mb-3">
            <div className="orderTable">
              <FixesDone />
            </div>
          </div>

          <div className="orders-table mb-3">
            <div className="orderTable">
              <FixesReturns />
            </div>
          </div>

          <div className="orders-table mb-3">
            <div className="orderTable">
              <FixesCancel />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FixesOrders;
