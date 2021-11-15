import React, { Component } from "react";

import "mdbreact/dist/css/mdb.css";

// css files
import "./Css/style.css";

// React Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// react-toastify
import { ToastContainer } from "react-toastify";
import "../node_modules/react-toastify/dist/ReactToastify.css";

// components
import Sidebar from "./Components/Sidebar";
import TopHeader from "./Components/TopHeader";

// pages
import Home from "./Pages/Home.jsx";
import Customers from "./Pages/Customers.jsx";
import FixesOrders from "./Pages/FixesOrders";
import AddNewFixOrder from "./Pages/AddNewFixOrder";
import HandyMan from "./Pages/HandyMan";
import Emploeyee from "./Pages/Emploeyee";
import Cities from "./Pages/Cities";
import Services from "./Pages/Services";
import AddNewService from "./Pages/AddNewService";
import AddNewCustomer from "./Pages/AddNewCustomer";
import AddNewHandyman from "./Pages/AddNewHandyman";
import AddNewCity from "./Pages/AddNewCity";
import AddNewEmploee from "./Pages/AddNewEmploee";
import Offers from "./Pages/Offers";
import AddNewOffer from "./Pages/AddNewOffer";
import EditCity from "./Pages/EditCity";
import EditCustomerInfo from "./Pages/EditCustomerInfo";
import AllOrdersForCustomer from "./Pages/AllOrdersForCustomer";
import EditEmploeeInfo from "./Pages/EditEmploeeInfo";
import EditHandymanInfo from "./Pages/EditHandymanInfo";
import EditOfferInfo from "./Pages/EditOfferInfo";
import EditOrderInfo from "./Pages/EditOrderInfo";
import CustomerTypes from "./Pages/CustomerTypes";
import AddNewCustomerType from "./Pages/AddNewCustomerType";
import EditCustomerType from "./Pages/EditCustomerType";
import EditServices from "./Pages/EditServices";
import OrderSource from "./Pages/OrderSource";
import AddNewOrderSource from "./Pages/AddNewOrderSource";
import EditOrderSources from "./Pages/EditOrderSources";
import Login from "./Pages/Login";

class App extends Component {
  state = {
    token: true,
  };

  render() {
    const openMobSideMenu = () => {
      var sidebar = (document.querySelector(".Mysidebar").style.right = 0);
    };

    const closeSideMenue = () => {
      var sidebar = (document.querySelector(".Mysidebar").style.right =
        "-300px");
    };

    if (!this.state.token) {
      return <Login />;
    }

    return (
      <>
        <ToastContainer autoClose={true} autoClose={5000} icon={true} />
        <Router>
          <div className="App">
            <Sidebar closeSideMenue={closeSideMenue} />
            <TopHeader openMobSideMenu={openMobSideMenu} />
            <Switch>
              <Route path="/customers" component={Customers} />
              <Route path="/fixes-orders" component={FixesOrders} />
              <Route path="/new-fix-order" component={AddNewFixOrder} />
              <Route path="/handyMan" component={HandyMan} />
              <Route path="/emploeyee" component={Emploeyee} />
              <Route path="/cities" component={Cities} />
              <Route path="/services" component={Services} />
              <Route path="/add-new-service" component={AddNewService} />
              <Route path="/add-new-customer" component={AddNewCustomer} />
              <Route path="/add-new-handyman" component={AddNewHandyman} />
              <Route path="/add-new-city" component={AddNewCity} />
              <Route path="/add-new-employee" component={AddNewEmploee} />
              <Route path="/offers" component={Offers} />
              <Route path="/add-new-offer" component={AddNewOffer} />
              <Route path="/edit-city/:id" component={EditCity} />
              <Route
                path="/edit-customer-info/:id"
                component={EditCustomerInfo}
              />
              <Route
                path="/all-order-for-customer/:id"
                component={AllOrdersForCustomer}
              />
              <Route
                path="/edit-emploee-info/:id"
                component={EditEmploeeInfo}
              />
              <Route
                path="/edit-handyman-info/:id"
                component={EditHandymanInfo}
              />
              <Route path="/edit-offer-info/:id" component={EditOfferInfo} />
              <Route path="/edit-order-info/:id" component={EditOrderInfo} />
              <Route path="/customer-types" component={CustomerTypes} />
              <Route
                path="/add-new-customer-type"
                component={AddNewCustomerType}
              />
              <Route
                path="/edit-customer-type/:id"
                component={EditCustomerType}
              />
              <Route path="/edit-service/:id" component={EditServices} />
              <Route path="/order-sources" component={OrderSource} />
              <Route
                path="/add-new-order-source"
                component={AddNewOrderSource}
              />
              <Route
                path="/edit-order-source/:id"
                component={EditOrderSources}
              />

              <Route path="/" component={Home} />
            </Switch>
          </div>
        </Router>
      </>
    );
  }
}

export default App;
