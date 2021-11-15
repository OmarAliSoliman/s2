// import React, { Component } from 'react'

// import axios from 'axios';
// import { Link } from "react-router-dom";
// import MdTable from "../Components/MdTable";

// // mdreact
// import { MDBBtn } from "mdbreact";

// import { OverlayTrigger, Tooltip } from "react-bootstrap";
// import ModalAddHandymanToOrder from "./ModalAddHandymanToOrder";

// export default class FilterDate extends Component {

//   state = {
//     allDates: []
//   }


//   async componentDidMount() {
//     await axios
//       .get(
//         this.props.url
//       )
//       .then((res) => {
//         // console.log(res);
//         if (res.status === 200) {
//           this.setState({
//             lodintable: false,
//           });
//         }
//         var newData = res.data.data.reverse();
//         var nallDates = [];
//         newData.map((dat, index) => {
//           var datem = dat.datePrefered.split("T")[0];
//           dat.dateC = datem;
//           nallDates.push(datem);
//         });
//         var uniq = [...new Set(nallDates)];
//         uniq.sort();
//         this.setState({
//           data: newData,
//           allDates: uniq,
//         });
//       });
//   }


//   render() {
//     const { allDates } = this.state;


//     const fiterDate = async (e) => {
//       // console.log(e.target.value);
//       var newRes = [];
//       await axios
//         .get(
//           this.props.url
//         )
//         .then((res) => {
//           // var newDate = res.data.data.datePrefered.split("T")[0];
//           res.data.data.map((item) => {
//             var newDate = item.datePrefered.split("T")[0];
//             item.datePrefered = newDate;
//             // newArr.push(newDate);
//           });

//           res.data.data.map((dat) => {
//             // console.log(item.datePrefered);
//             if (dat.datePrefered == e.target.value) {
//               newRes.push(dat);
//               console.log(newRes)
//               dat.option = (
//                 <div className="option-parent">
//                   <OverlayTrigger
//                     overlay={
//                       <Tooltip id="tooltip-disabled" className="tooltipcalss">
//                         تعديل الطلب
//                       </Tooltip>
//                     }
//                   >
//                     <Link
//                       to={"/edit-order-info/" + dat.id}
//                       className="tableOption op-edit"
//                     >
//                       <i className="fi-rr-edit"></i>
//                     </Link>
//                   </OverlayTrigger>
//                 </div>
//               );
//               dat.technicals = (
//                 <div className="option-parent">
//                   <MDBBtn
//                     className="btnOpenModal"
//                     size="sm"
//                     onClick={() => this.handleShow(dat)}
//                   >
//                     <i className="fi-rr-pencil"></i>
//                     <span>اضف فني</span>
//                   </MDBBtn>
//                 </div>
//               );
    
//               if (dat.customer != null) {
//                 dat.fullName = dat.customer.fullName;
//                 dat.clientMop = dat.customer.mobile;
//               }
    
//               if (dat.employee != null) {
//                 dat.employyrigister = dat.employee.fullName;
//               }
    
//               if (dat.service != null) {
//                 dat.service = dat.service.name;
//               }
    
//               if (dat.step != null) {
//                 dat.orderstep = dat.step.name;
//               }
    
//               if (dat.orderType != null) {
//                 dat.ordersource = dat.orderType.name;
//               }
    
//               if (dat.customer != null) {
//                 dat.customertype = dat.customer.customerType.name;
//               }
    
//               var datem = dat.datePrefered.split("T")[0];
//               dat.dateC = datem;
    
//               var timep = dat.datePrefered.split("T")[1];
//               var time = timep
//                 .toString()
//                 .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [timep];
//               if (time.length > 1) {
//                 // If time format correct
//                 time = time.slice(1); // Remove full string match value
//                 // time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
//                 time[0] = +time[0] % 12 || 12; // Adjust hours
//               }
//               time.join("");
//               dat.timeT = time;
//             }
//           });

//           // newRes = res.data.data.filter((item)=> item.datePrefered == e.target.value);
//           this.setState({
//             data: newRes,
//           });
//         });
//     };


//     return (
//       <div className="filter">
//       <label htmlFor="date-filter">فلتر على حسب التاريخ</label>
//       <select
//         name=""
//         id="date-filter"
//         onChange={fiterDate}
//         className="dateFilter form-control"
//         id=""
//       >
//         <option value="all">الكل</option>
//         {allDates.map((item, index) => (
//           <option value={item} key={index}>
//             {item}
//           </option>
//         ))}
//       </select>
//     </div>
//     )
//   }
// }
