// react
import React, { Component } from "react";

// react router
import { Link, NavLink } from "react-router-dom";

// bootstrap
import { Accordion, Card, Button } from "react-bootstrap";

import { Scrollbar } from "react-scrollbars-custom";

class Sidebar extends Component {
  render() {
    return (
      <Scrollbar>
        <div>
          <div className="Mysidebar">
            <button className="closeSideMenue" onClick={this.props.closeSideMenue}>
              <i className="fas fa-times"></i>
            </button>
            <div className="logo">
              <Link to="/">
                {" "}
                <img src="./images/logo.png" alt="" />{" "}
              </Link>
            </div>
            <Link to="/" className="firstLink">
              <i className="fas fa-home"></i>
              الرئيسية
            </Link>
            <Link to="/emploeyee" className="firstLink">
            <i className="fas fa-users"></i>
              المستخدمين
            </Link>
            <Accordion className="sidebarAccordion">
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  <i className="fas fa-box"></i>
                    ادارة الطلبات
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <div className="liSide">
                      <ul className="list-unstyled">
                        <li>
                          <i className="fi-rr-user-time"></i>
                          <Link to="/customers">العملاء</Link>
                        </li>
                        <li>
                          <i className="fi-rr-broom"></i>
                          <Link to="/fixes-orders">الصيانة</Link>
                        </li>
                        {/* <li>
                          <i className="fi-rr-apps"></i>
                          <Link to="/spare-parts-orders">الطلبات</Link>
                        </li> */}
                      </ul>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="1">
                  <i className="fas fa-cog"></i>
                    اعدادات النظام
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <div className="liSide">
                      <ul className="list-unstyled">
                        {/* <li>
                          <i className="fi-rr-subtitles"></i>
                          <Link to="/jop-titles">المسميات الوظيفية</Link>
                        </li> */}
                        {/* <li>
                          <i className="fi-rr-spinner-alt"></i>
                          <Link to="/order-status">حالات الطلب</Link>
                        </li> */}
                        <li>
                          <i className="fi-rr-world"></i>
                          <Link to="/cities">المدن</Link>
                        </li>
                        <li>
                          <i className="fi-rr-box"></i>
                          <Link to="/services">الخدمات</Link>
                        </li>
                        <li>
                          <i className="fi-rr-diploma"></i>
                          <Link to="/offers">العروض</Link>
                        </li>
                        <li>
                          <i className="fi-rr-earnings"></i>
                          <Link to="/customer-types">انواع العملاء</Link>
                        </li>
                        <li>
                          <i className="fi-rr-dart"></i>
                          <Link to="/order-sources">مصادر الطلب</Link>
                        </li>
                      </ul>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="2">
                  <i className="fas fa-clipboard"></i>
                    التقارير
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="2">
                  <Card.Body>
                    <div className="liSide">
                      <ul className="list-unstyled">
                        <li>
                          <i className="fi-rr-vector"></i>
                          <Link to="/handyMan">الفنيين</Link>
                        </li>
                        {/* <li>
                          <i className="fi-rr-earnings"></i>
                          <Link to="/most-sells-items">انواع الطلبات</Link>
                        </li> */}
                        {/* <li>
                          <i className="fi-rr-resize"></i>
                          <Link to="/most-services-order">
                            اكثر الخدمات طلبا
                          </Link>
                        </li> */}
                      </ul>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            <div className="sidebarOptions">
              <Link to="/new-fix-order">
                <i className="fi-rr-apps-add"></i>
                <span>طلب صيانة</span>
              </Link>
              {/* <Link to="/new-order">
                <i className="fi-rr-apps-add"></i>
                <span>طلب قطع غيار</span>
              </Link> */}
              <Link to="/add-new-handyman">
                <i className="fi-rr-user-add"></i>
                <span>اضافة فني</span>
              </Link>
              {/* <Link to="/add-fixer-supplier">
                <i className="fi-rr-user-add"></i>
                <span>اضافة مورد</span>
              </Link> */}
              <Link to="/add-new-customer">
                <i className="fi-rr-user-add"></i>
                <span>عميل جديد</span>
              </Link>
            </div>
          </div>
        </div>
      </Scrollbar>
    );
  }
}

export default Sidebar;
