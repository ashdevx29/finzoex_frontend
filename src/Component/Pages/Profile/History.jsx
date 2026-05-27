import React, { useState, useEffect } from "react";
// import Header from "../../Newcomponent/Header";
import Account_Header from "../../Newcomponent/Account_Header";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiService from "../../../core/service/detail";
import { getMethod, postMethod } from "../../../core/service/common.api";
import Footernew from "../../footer_buttom";
import { Grid, Paper, Container } from "@mui/material";
import { setAuthorization } from "../../../core/service/axios";
import { Button } from "semantic-ui-react";
import { Checkbox } from "semantic-ui-react";
import { Dropdown } from "semantic-ui-react";
import SidebarNew from "./SidebarNew";
import moment from "moment";
import Pagination from "react-js-pagination";
import PaymentMethod from "./Paymentmethod";
import { PropTypes } from "prop-types";

function Home() {
  const navigate = useNavigate();

  const [pageLoader, setPageloader] = useState(false);
  const [depositLoader, setdepositLoader] = useState(false);
  const [launchpadLoader, setlaunchpadLoader] = useState(false);
  const [bankdetailsLoader, setbankdetailsLoader] = useState(false);
  const [notificaitonLoader, setnotificaitonLoader] = useState(false);
  const [p2ploader, setp2ploader] = useState(false);

  useEffect(() => {
    setPageloader(true);

    setTimeout(() => {
      setPageloader(false);
    }, 1000);
    // getProfile(1);
    getdeposit(1);
    getwithdraw(1);
    getbankdetails(1);
    getp2p(1);
    getlaunchpad(1);
    getNotifications(1);
  }, []);

  const [p2ptotalpage, setp2pTotalpages] = useState(0);

  const [depositHistory, setdepositHistory] = useState([]);
  const [currentPagedeposit, setcurrentPagedeposit] = useState(1);
  const [totaldeposit, settotaldeposit] = useState([]);
  const recordPerPagedeposit = 5;
  const pageRangedeposit = 5;
  const handlePageChangedeposit = (pagenum) => {
    console.log(pagenum, "=-=-=-=pagenum");
    setcurrentPagedeposit(pagenum);
    getdeposit(pagenum);
  };
  const getdeposit = async (page) => {
    var obj = {
      apiUrl: apiService.deposit_history,
      payload: { FilPerpage: 5, FilPage: page },
    };
    setdepositLoader(true);
    var deposit_history_list = await postMethod(obj);
    if (deposit_history_list.status == true) {
    setdepositLoader(false);
      setdepositHistory(deposit_history_list.result);
      settotaldeposit(deposit_history_list.pages);
    }
    setdepositLoader(false);
  };

  const [withdrawHistory, setwithdrawHistory] = useState([]);
  const [currentPagewithdraw, setcurrentPagewithdraw] = useState(1);
  const [totalwithdraw, settotalwithdraw] = useState([]);
  const recordPerPagewithdraw = 5;
  const pageRangewithdraw = 5;
  const handlePageChangewithdraw = (pagenum) => {
    console.log(pagenum, "=-=-=-=pagenum");
    setcurrentPagewithdraw(pagenum);
    getwithdraw(pagenum);
  };
  const getwithdraw = async (page) => {
    var data = {
      apiUrl: apiService.withdraw_history,
      payload: { FilPerpage: 5, FilPage: page },
    };
    var withdraw_history_list = await postMethod(data);
    if (withdraw_history_list.status == true) {
      setwithdrawHistory(withdraw_history_list.result);
      settotalwithdraw(withdraw_history_list.pages);
    }
  };

  const [p2pOrders, setp2pOrders] = useState([]);
  const [currentPagep2p, setcurrentPagep2p] = useState([]);
  const [totalp2p, settotalp2p] = useState([]);
  const recordPerPagep2p = 5;
  const pageRangep2p = 5;
  const handlePageChangep2p = (pagenum) => {
    console.log(pagenum, "=-=-=-=pagenum");
    setcurrentPagep2p(pagenum);
    getp2p(pagenum);
  };
  const getp2p = async (page) => {
    var data3 = {
      apiUrl: apiService.p2pHistory,
      payload: { FilPerpage: 5, FilPage: page },
    };
    var p2p_orders_list = await postMethod(data3);
    console.log("p2p_orders_list===", p2p_orders_list.returnObj.Message);
    if (p2p_orders_list.status == true) {
      setp2pOrders(p2p_orders_list.returnObj.Message);
      settotalp2p(p2p_orders_list.returnObj.total);
    }
  };

  const [records, setrecords] = useState([]);
  const [currentPagelaunchpad, setcurrentPagelaunchpad] = useState(1);
  const [totallaunchpad, settotallaunchpad] = useState([]);
  const recordPerPagelaunchpad = 5;
  const pageRangelaunchpad = 5;
  const handlePageChangelaunchpad = (pagenum) => {
    console.log(pagenum, "=-=-=-=pagenum");
    setcurrentPagelaunchpad(pagenum);
    getlaunchpad(pagenum);
  };
  const getlaunchpad = async (page) => {
    var data2 = {
      apiUrl: apiService.lauchPadHistory,
      payload: { perpage: 5, page: page },
    };
    setlaunchpadLoader(true);
    var resp = await postMethod(data2);
    setlaunchpadLoader(false);

    if (resp.status == true) {
      setrecords(resp.data.data);
      settotallaunchpad(resp.data.total);
    }
  };

  const [Bankdetails, setBankdetails] = useState([]);
  const [currentPagebank, setcurrentPagebank] = useState(1);
  const [totalbank, settotalbank] = useState([]);
  const recordPerPagebank = 5;
  const pageRangebank = 5;
  const handlePageChangebank = (pagenum) => {
    console.log(pagenum, "=-=-=-=pagenum");
    setcurrentPagebank(pagenum);
    getbankdetails(pagenum);
  };
  const getbankdetails = async (page) => {
    try {
      var data = {
        apiUrl: apiService.Getbankdetails,
        payload: { perpage: 5, page: page },
      };
      setbankdetailsLoader(true);

      var resp = await postMethod(data);
      setbankdetailsLoader(false);

      if (resp.status == true) {
        setBankdetails(resp.obj);
        settotalbank(resp.total);
      }
    } catch (error) {
      console.log(error, "=-=error=-=-=");
    }
  };

  const [notification, setnotification] = useState([]);
  const [currentPagenotification, setcurrentPagenotification] = useState(1);
  const [totalnotification, settotalnotification] = useState([]);
  const recordPerPagenotification = 5;
  const pageRangenotification = 5;
  const handlePageChangenotification = (pagenum) => {
    setcurrentPagenotification(pagenum);
    getNotifications(pagenum);
  };
  const getNotifications = async (page) => {
    try {
      var data = {
        apiUrl: apiService.getnotification,
        payload: { perpage: 5, page: page },
      };
      setnotificaitonLoader(true);

      var resp = await postMethod(data);
      setnotificaitonLoader(false);

      if (resp.status) {
        console.log(resp.Message, "=-=-=-=resp.Message");
        setnotification(resp.data.data);
        settotalnotification(resp.data.total);
        // setnotification(resp.Message);outer.post("/notifications", common.tokenmiddleware, async (req, res) => {
        //   try {
        //     var userId = req.userId;
        //     var perPage = Number(req.body.perpage ? req.body.perpage : 5);
        //     var page = Number(req.body.page ? req.body.page : 1);
        //     var skippage = perPage * page - perPage;

        //     let notifications = await notifyDB.find({
        //       to_user_id: ObjectId(userId),
        //       status: 0,
        //     }).skip(skippage)
        //     .limit(perPage)
        //     .sort({ _id: -1 }).exec();
        //     console.log(notifications,"======notifications")
        //     if (notifications.length > 0) {
        //       return res.json({status: true, Message: notifications, total : notifications.length});
        //     } else {
        //       return res.json({status: false, Message: [], total :  0});
        //     }
        //   } catch (error) {
        //     return res.json({
        //       status: false,
        //       Message: "Iternal server error, Please try again later",
        //     });
        //   }
        // });
        // settotalnotification(resp.total)
      } else {
      }
    } catch (error) {}
  };

  const [editpage, seteditpage] = useState();
  const initialFormValue = {
    AccountHolderName: "",
    AccountNumber: "",
    IFSCCode: "",
    BankName: "",
    BranchName: "",
    BranchAddress: "",
    gpay_number: "",
    paytm_number: "",
  };
  const [formValue, setFormValue] = useState(initialFormValue);
  const handleChange = async (e) => {
    console.log("e====", e);
    e.preventDefault();
    const { name, value } = e.target;
    let formData = { ...formValue, ...{ [name]: value } };
    console.log("formData====", formData);
    setFormValue(formData);
  };

  const {
    AccountHolderName,
    AccountNumber,
    IFSCCode,
    BankName,
    BranchName,
    BranchAddress,
    gpay_number,
    paytm_number,
  } = formValue;

  const editbankData = async (value) => {
    seteditpage(true);
    formValue.AccountHolderName = value.Accout_HolderName;
    formValue.AccountNumber = value.Account_Number;
    formValue.BankName = value.Bank_Name;
    formValue.BranchAddress = value.Branch_Address;
    formValue.BranchName = value.Branch_Name;
    formValue.IFSCCode = value.IFSC_code;
    formValue.gpay_number = value.Gpay_Number;
    formValue.paytm_number = value.Paytm_Number;
    formValue._id = value._id;
  };
  const defaultBank = async (editData) => {
    console.log(editData, "=-=-=-=defaultBank");
    try {
      var data = {
        apiUrl: apiService.defaultBanks,
        payload: editData,
      };
      console.log(data, "=-=datap-0-");
      var resp = await postMethod(data);
      console.log(resp, "=-=resp--=");
      if (resp.status == true) {
        toast.success(resp.Message);
        getbankdetails();
      } else {
        toast.error(resp.Message);
      }
    } catch (error) {}
  };

  const deletebank = async (deleteData) => {
    if (
      // eslint-disable-next-line no-restricted-globals
      confirm(
        "Are you sure you want to permanently delete this bank details ?"
      ) == true
    ) {
      try {
        var data = {
          apiUrl: apiService.deletbank,
          payload: deleteData,
        };
        var resp = await postMethod(data);
        if (resp.status == true) {
          getbankdetails();
          toast.success(resp.Message);
        } else {
          toast.error(resp.Message);
        }
      } catch (error) {}
    }
  };

  const submitID = async (e) => {
    e.preventDefault();
    try {
      if (
        formValue.AccountHolderName != "" &&
        // formValue.AccountHolderName.length >= 5 &&
        // formValue.AccountHolderName.length <= 25 &&
        formValue.AccountNumber != "" &&
        // formValue.AccountNumber.length >= 5 &&
        // formValue.AccountNumber.length <= 25 &&
        formValue.IFSCCode != "" &&
        // formValue.IFSCCode.length >= 5 &&
        // formValue.IFSCCode.length <= 25 &&
        formValue.BankName != "" &&
        // formValue.BankName.length >= 5 &&
        // formValue.BankName.length <= 25 &&
        formValue.BranchName != "" &&
        // formValue.BranchName.length >= 5 &&
        // formValue.BranchName.length <= 25 &&
        formValue.BranchAddress != ""
        // formValue.BranchAddress.length >= 5 &&
        // formValue.BranchAddress.length <= 150 &&
        // formValue.gpay_number != "" &&
        // formValue.paytm_number != ""
      ) {
        var data = {
          apiUrl: apiService.updateBankdetails,
          payload: formValue,
        };

        var resp = await postMethod(data);
        console.log(resp, "=-=-resp=--=-=");
        if (resp.status == true) {
          getbankdetails();
          toast.success(resp.Message);
          // navigate("/Historynew");
          window.location.reload();
        } else {
          toast.error(resp.Message);
        }
      } else {
        toast.error("Please fill all the require  fields");
        console.log("ALL FIELD NEED");
      }
    } catch (error) {}
  };

  return (
    <div className="">
      <main className="main-content tradepage-bg  bg-cover onlywhitee new_login_bb">
        <Account_Header/>
        {pageLoader == true ? (
          <Grid item xs={12} sm={12} md={8} lg={12} xl={12}>
            <div className="loading">
              <i className="fa-solid fa-spinner fa-spin-pulse "></i>
            </div>
          </Grid>
        ) : (
          <Container maxWidth="xl" className="container-lg">
            <Grid container spacing={2} justifyContent={"center"}>
              {/* Item for xs (extra small) screens */}
              <Grid item xs={12} sm={12} md={8} lg={3} xl={3}>
                <SidebarNew />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
                <Grid container spacing={2} justifyContent={"center"}>
                  {editpage == true ? (
                    <Grid item xs={12} sm={12} md={8} lg={7} xl={7}>
                      <div className="card_logoki pading_cardd mt-5 p-0">
                        <div className="step-5 ">
                          <div className="form register_login  marhing_pading">
                            <form className="form_pading_s mb-5">
                              <Button
                                onClick={() => seteditpage(false)}
                                className="back_butn"
                              >
                                <i
                                  onClick={() => seteditpage(false)}
                                  s
                                  className="ri-arrow-left-line"
                                ></i>{" "}
                                Back
                              </Button>
                              <div className="form_content payment_form">
                                <h1 className="mb-3 Launch_pad_steps m-0 padding_botn">
                                  Add Bank Transfer
                                </h1>
                                <div className="buttons_edit">
                                  <Button
                                    onClick={submitID}
                                    className="primary_one"
                                  >
                                    Update
                                  </Button>
                                  {/* <Button>Delete</Button> */}
                                </div>
                              </div>
                              <div className="account_setting">
                                <div className="form-group groow-1_widut ">
                                  <label>Account holder name</label>
                                  <input
                                    type="text"
                                    maxLength={30}
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Account holder name"
                                    name="AccountHolderName"
                                    value={AccountHolderName}
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="form-group groow-1_widut ">
                                  <label>Account no.</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Enter account number"
                                    name="AccountNumber"
                                    value={AccountNumber}
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="form-group groow-1_widut ">
                                  <label>IFSC code</label>
                                  <input
                                    type="text"
                                    maxLength={30}
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="IFSC code"
                                    name="IFSCCode"
                                    value={IFSCCode}
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="form-group groow-1_widut ">
                                  <label>Bank name</label>
                                  <input
                                    type="text"
                                    maxLength={40}
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Bank name"
                                    name="BankName"
                                    value={BankName}
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="form-group groow-1_widut ">
                                  <label>Account opening branch</label>
                                  <input
                                    type="text"
                                    maxLength={30}
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Account opening branch"
                                    name="BranchName"
                                    value={BranchName}
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="form-group groow-1_widut ">
                                  <label>Branch Address</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    maxLength={50}
                                    id="exampleInputPassword1"
                                    placeholder="Branch Address"
                                    name="BranchAddress"
                                    value={BranchAddress}
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="form-group groow-1_widut ">
                                  <label>UPI ID</label>
                                  <input
                                    type="text"
                                    maxLength={30}
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="UPI ID"
                                    name="gpay_number"
                                    value={gpay_number}
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="form-group groow-1_widut ">
                                  <label>Paytm</label>
                                  <input
                                    type="text"
                                    maxLength={30}
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Paytm"
                                    name="paytm_number"
                                    value={paytm_number}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </Grid>
                  ) : (
                    <Grid item xs={12} sm={12} md={12} lg={11} xl={11}>
                      <div className="card_logoki pading_cardd history pl-4 pr-4">
                        <div className="step-5 ">
                          <div className="form_content">
                            <h1 className="mb-3 Launch_pad_steps">History</h1>
                          </div>
                          <div className="tabs_inside">
                            <ul className="nav nav-tabs">
                              <li className="active">
                                <a
                                  data-toggle="tab"
                                  href="#tFA"
                                  className="active"
                                >
                                  Deposit
                                </a>
                              </li>
                              <li>
                                <a data-toggle="tab" href="#Withdraw">
                                  Withdraw
                                </a>
                              </li>
                              <li>
                                <a data-toggle="tab" href="#Launchpad">
                                  Launchpad
                                </a>
                              </li>
                              <li>
                                <a data-toggle="tab" href="#P2P">
                                  Notification
                                </a>
                              </li>
                              {/* <li>
                                <a data-toggle="tab" href="#bank">
                                  Bank Details
                                </a>
                              </li> */}
                            </ul>
                          </div>
                          <div className="tab-content">
                            <div id="tFA" className="tab-pane fade in active show">
                              <div className="table_responsive">
                                <div className="table_section">
                                  <div className="custom-table">
                                    <div className="table-row header">
                                      <div className="table-cell">
                                        Transaction ID
                                      </div>
                                      <div className="table-cell">Amount</div>
                                      <div className="table-cell">Currency</div>
                                      <div className="table-cell">Date</div>
                                      <div className="table-cell">Status</div>
                                    </div>
                                    {depositLoader == true ? (
                                      <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={8}
                                        lg={12}
                                        xl={12}
                                      >
                                        <div className="loading">
                                          <i className="fa-solid fa-spinner fa-spin-pulse "></i>
                                        </div>
                                      </Grid>
                                    ) : (
                                      <>
                                        {depositHistory.length > 0 ? (
                                          depositHistory.map((data, i) => {
                                            return (
                                              <div className="table-row border_table_row">
                                                <>
                                                  <div className="table-cell">
                                                    <div className="table-cell">
                                                      <div className="data_inner">
                                                        {data.txnid != undefined
                                                          ? data.txnid.slice(
                                                              0,
                                                              10
                                                            )
                                                          : ""}
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="table-cell">
                                                    <div className="data_inner">
                                                      {data.amount == undefined
                                                        ? 0
                                                        : data.amount.toFixed(
                                                            4
                                                          )}
                                                    </div>
                                                  </div>
                                                  <div className="table-cell">
                                                    <div className="data_inner">
                                                      {data.currencyName} (
                                                      {data.currencySymbol})
                                                    </div>
                                                  </div>
                                                  <div className="table-cell">
                                                    <div className="data_inner">
                                                      {moment(data.date).format(
                                                        "L"
                                                      )}
                                                    </div>
                                                  </div>
                                                  <div className="table-cell">
                                                    <div className="data_inner">
                                                      {data.txnid
                                                        ? "Completed"
                                                        : "Pending"}
                                                    </div>
                                                  </div>
                                                </>
                                              </div>
                                            );
                                          })
                                        ) : (
                                          <div className="table-cell_no">
                                            <div className="data_inner">
                                              No Data found
                                            </div>
                                          </div>
                                        )}
                                        {depositHistory.length > 0 ? (
                                          <Pagination
                                            itemClass="page-item" // add it for bootstrap 4
                                            linkClass="page-link" // add it for bootstrap 4
                                            activePage={currentPagedeposit}
                                            itemsCountPerPage={
                                              recordPerPagedeposit
                                            }
                                            totalItemsCount={totaldeposit}
                                            pageRangeDisplayed={
                                              pageRangedeposit
                                            }
                                            onChange={handlePageChangedeposit}
                                          />
                                        ) : (
                                          ""
                                        )}
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div id="Withdraw" className="tab-pane fade">
                              <div className="table_responsive">
                                <div className="table_section">
                                  <div className="custom-table">
                                    <div className="table-row header">
                                      <div className="table-cell">
                                        Transaction ID
                                      </div>
                                      <div className="table-cell">Amount</div>
                                      <div className="table-cell">Currency</div>
                                      <div className="table-cell">Date</div>
                                      <div className="table-cell">Status</div>
                                    </div>

                                    {pageLoader == true ? (
                                      <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={8}
                                        lg={12}
                                        xl={12}
                                      >
                                        <div className="loading">
                                          <i className="fa-solid fa-spinner fa-spin-pulse "></i>
                                        </div>
                                      </Grid>
                                    ) : (
                                      <>
                                        {withdrawHistory.length > 0 ? (
                                          withdrawHistory.map((data, i) => {
                                            return (
                                              <div className="table-row border_table_row">
                                                <>
                                                  <div className="table-cell">
                                                    <div className="table-cell">
                                                      <div className="data_inner">
                                                        {data.txnid != undefined
                                                          ? data.txnid.slice(
                                                              0,
                                                              10
                                                            )
                                                          : "-"}
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="table-cell">
                                                    <div className="data_inner">
                                                      {data.amount == undefined
                                                        ? 0
                                                        : data.amount.toFixed(
                                                            4
                                                          )}
                                                    </div>
                                                  </div>
                                                  <div className="table-cell">
                                                    <div className="data_inner">
                                                      {data.currency}
                                                    </div>
                                                  </div>
                                                  <div className="table-cell">
                                                    <div className="data_inner">
                                                      {moment(data.date).format(
                                                        "L"
                                                      )}
                                                    </div>
                                                  </div>
                                                  <div className="table-cell">
                                                    <div className="data_inner">
                                                      {data.txnid
                                                        ? "Completed"
                                                        : "Pending"}
                                                    </div>
                                                  </div>
                                                </>
                                              </div>
                                            );
                                          })
                                        ) : (
                                          <div className="table-cell_no">
                                            <div className="data_inner">
                                              No Data found
                                            </div>
                                          </div>
                                        )}
                                        {withdrawHistory.length > 0 ? (
                                          <Pagination
                                            itemClass="page-item" // add it for bootstrap 4
                                            linkClass="page-link" // add it for bootstrap 4
                                            activePage={currentPagewithdraw}
                                            itemsCountPerPage={
                                              recordPerPagewithdraw
                                            }
                                            totalItemsCount={totalwithdraw}
                                            pageRangeDisplayed={
                                              pageRangewithdraw
                                            }
                                            onChange={handlePageChangewithdraw}
                                          />
                                        ) : (
                                          ""
                                        )}
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div id="Launchpad" className="tab-pane fade">
                              <div className="table_responsive">
                                <div className="table_section">
                                  <div className="custom-table">
                                    <div className="table-row header">
                                      <div className="table-cell">Order ID</div>
                                      <div className="table-cell">Amount</div>
                                      <div className="table-cell">Currency</div>
                                      <div className="table-cell">Date</div>
                                      <div className="table-cell">Status</div>
                                    </div>
                                    {launchpadLoader == true ? (
                                      <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={8}
                                        lg={12}
                                        xl={12}
                                      >
                                        <div className="loading">
                                          <i className="fa-solid fa-spinner fa-spin-pulse "></i>
                                        </div>
                                      </Grid>
                                    ) : (
                                      <>
                                        {records.length > 0 ? (
                                          records.map((data, i) => {
                                            return (
                                              <div className="table-row border_table_row">
                                                <>
                                                  <div className="table-cell">
                                                    <div className="table-cell">
                                                      <div className="data_inner">
                                                        {data.orderid !=
                                                        undefined
                                                          ? data.orderid
                                                          : ""}
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="table-cell">
                                                    <div className="data_inner">
                                                      {data.tokenAmount ==
                                                      undefined
                                                        ? 0
                                                        : data.tokenAmount.toFixed(
                                                            4
                                                          )}
                                                    </div>
                                                  </div>
                                                  <div className="table-cell">
                                                    <div className="data_inner">
                                                      {data.tokenName} (
                                                      {data.tokenSymbol})
                                                    </div>
                                                  </div>
                                                  <div className="table-cell">
                                                    <div className="data_inner">
                                                      {moment(data.date).format(
                                                        "L"
                                                      )}
                                                    </div>
                                                  </div>
                                                  <div className="table-cell">
                                                    <div className="data_inner">
                                                      Completed
                                                    </div>
                                                  </div>
                                                </>
                                              </div>
                                            );
                                          })
                                        ) : (
                                          <div className="table-cell_no">
                                            <div className="data_inner">
                                              No Data found
                                            </div>
                                          </div>
                                        )}
                                        {records.length > 0 ? (
                                          <Pagination
                                            itemClass="page-item" // add it for bootstrap 4
                                            linkClass="page-link" // add it for bootstrap 4
                                            activePage={currentPagelaunchpad}
                                            itemsCountPerPage={
                                              recordPerPagelaunchpad
                                            }
                                            totalItemsCount={totallaunchpad}
                                            pageRangeDisplayed={
                                              pageRangelaunchpad
                                            }
                                            onChange={handlePageChangelaunchpad}
                                          />
                                        ) : (
                                          ""
                                        )}
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div id="P2P" className="tab-pane fade">
                              <div className="table_responsive">
                                <div className="table_section">
                                  <div className="custom-table">
                                    <div className="table-row header">
                                      <div className="table-cell number  ">
                                        S.No
                                      </div>
                                      <div className="table-cell number">
                                        Date / time
                                      </div>
                                      <div className="table-cell number">From</div>
                                      <div className="table-cell">Message</div>
                                    </div>
                                    {p2ploader == true ? (
                                      <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={8}
                                        lg={12}
                                        xl={12}
                                      >
                                        <div className="loading">
                                          <i className="fa-solid fa-spinner fa-spin-pulse "></i>
                                        </div>
                                      </Grid>
                                    ) : (
                                      <>
                                        {notification.length > 0 ? (
                                          notification.map((data, i) => {
                                            return (
                                              <div className="table-row border_table_row">
                                                <>
                                                  <div className="table-cell ">
                                                    <div className="table-cell number">
                                                      <div className="data_inner">
                                                        {i + 1}
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="table-cell number">
                                                    <div className="data_inner">
                                                      {moment(
                                                        data.createdAt
                                                      ).format("L")}
                                                    </div>
                                                  </div>
                                                  <div className="table-cell number">
                                                    <div className="data_inner">
                                                      {data.from_user_name}
                                                    </div>
                                                  </div>
                                                  <div className="table-cell data_msg">
                                                    <div className="data_inner">
                                                      {data.message}
                                                    </div>
                                                  </div>
                                                </>
                                              </div>
                                            );
                                          })
                                        ) : (
                                          <div className="table-cell_no">
                                            <div className="data_inner">
                                              No Data found
                                            </div>
                                          </div>
                                        )}
                                        {p2pOrders.length > 0 ? (
                                          <Pagination
                                            itemClass="page-item" // add it for bootstrap 4
                                            linkClass="page-link" // add it for bootstrap 4
                                            activePage={currentPagenotification}
                                            itemsCountPerPage={
                                              recordPerPagenotification
                                            }
                                            totalItemsCount={totalnotification}
                                            pageRangeDisplayed={
                                              pageRangenotification
                                            }
                                            onChange={
                                              handlePageChangenotification
                                            }
                                          />
                                        ) : (
                                          ""
                                        )}
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div id="bank" className="tab-pane fade">
                              <div className="table_responsive">
                                <div className="table_section">
                                  <div className="custom-table">
                                    <div className="table-row header">
                                      <div className="table-cell">Default</div>
                                      <div className="table-cell">
                                        Account Number
                                      </div>
                                      <div className="table-cell">IFSC code</div>
                                      <div className="table-cell">Bank name</div>
                                      <div className="table-cell">Branch name</div>
                                      <div className="table-cell">Action</div>
                                    </div>
                                    {bankdetailsLoader == true ? (
                                      <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={8}
                                        lg={12}
                                        xl={12}
                                      >
                                        <div className="loading">
                                          <i className="fa-solid fa-spinner fa-spin-pulse "></i>
                                        </div>
                                      </Grid>
                                    ) : (
                                      <>
                                        {Bankdetails.length > 0 ? (
                                          Bankdetails.map((item, i) => {
                                            return (
                                              <div className="table-row border_table_row">
                                                <>
                                                  <div className="table-cell">
                                                    <div className="table-cell">
                                                      <div className="data_inner">
                                                        <input
                                                          className="cursor-pointer"
                                                          type="radio"
                                                          name="flexRadioDefault"
                                                          id="flexRadioDefault2"
                                                          checked={
                                                            item.Status == 1
                                                          }
                                                          onClick={() => {
                                                            defaultBank(item);
                                                          }}
                                                        />
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="table-cell">
                                                    <div className="data_inner">
                                                      {item.Account_Number}
                                                    </div>
                                                  </div>
                                                  <div className="table-cell">
                                                    <div className="data_inner">
                                                      {item.IFSC_code}
                                                    </div>
                                                  </div>
                                                  <div className="table-cell">
                                                    <div className="data_inner">
                                                      {item.Bank_Name}
                                                    </div>
                                                  </div>
                                                  <div className="table-cell">
                                                    <div className="data_inner">
                                                      {item.Branch_Name}
                                                    </div>
                                                  </div>
                                                  <div className="table-cell">
                                                    <div className="data_inner cursor-pointer d-flex">
                                                      <span>
                                                        <a
                                                          onClick={() => {
                                                            deletebank(item);
                                                          }}
                                                        >
                                                          {" "}
                                                          <i
                                                            className="bi bi-trash-fill"
                                                            style={{
                                                              "font-size":
                                                                "20px",
                                                              color: "red",
                                                              cursor: "pointer",
                                                              "margin-left":
                                                                "10px",
                                                            }}
                                                          ></i>
                                                        </a>
                                                      </span>
                                                      <span>
                                                        <a>
                                                          <i
                                                            onClick={() =>
                                                              editbankData(item)
                                                            }
                                                            style={{
                                                              "font-size":
                                                                "20px",
                                                              color: "#fff",
                                                              cursor: "pointer",
                                                              "margin-left":
                                                                "10px",
                                                              marginTop: "6px",
                                                            }}
                                                            className="fas"
                                                          >
                                                            &#xf304;
                                                          </i>
                                                        </a>
                                                      </span>
                                                    </div>
                                                  </div>
                                                </>
                                              </div>
                                            );
                                          })
                                        ) : (
                                          <div className="table-cell_no">
                                            <div className="data_inner">
                                              No Data found
                                            </div>
                                          </div>
                                        )}
                                        {Bankdetails.length > 0 ? (
                                          <Pagination
                                            itemClass="page-item" // add it for bootstrap 4
                                            linkClass="page-link" // add it for bootstrap 4
                                            activePage={currentPagebank}
                                            itemsCountPerPage={
                                              recordPerPagebank
                                            }
                                            totalItemsCount={totalbank}
                                            pageRangeDisplayed={pageRangebank}
                                            onChange={handlePageChangebank}
                                          />
                                        ) : (
                                          ""
                                        )}
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div id="notification" className="tab-pane fade">
                              <div className="table_responsive">
                                <div className="table_section">
                                  <div className="custom-table">
                                    <div className="table-row header">
                                      <div className="table-cell">S.No</div>
                                      <div className="table-cell"> Date / time</div>
                                      <div className="table-cell">From</div>
                                      <div className="table-cell">Message</div>
                                    </div>
                                    {notificaitonLoader == true ? (
                                      <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={8}
                                        lg={12}
                                        xl={12}
                                      >
                                        <div className="loading">
                                          <i className="fa-solid fa-spinner fa-spin-pulse "></i>
                                        </div>
                                      </Grid>
                                    ) : (
                                      <>
                                        {notification.length > 0 ? (
                                          notification.map((data, i) => {
                                            return (
                                              <div className="table-row border_table_row">
                                                <>
                                                  <div className="table-cell">
                                                    <div className="data_inner">
                                                      {i + 1}
                                                    </div>
                                                  </div>
                                                  <div className="table-cell">
                                                    <div className="data_inner">
                                                      {moment(
                                                        data.createdAt
                                                      ).format("L")}
                                                    </div>
                                                  </div>
                                                  <div className="table-cell">
                                                    <div className="data_inner">
                                                      {data.from_user_name}
                                                    </div>
                                                  </div>
                                                  <div className="table-cell">
                                                    <div className="data_inner">
                                                      {data.message}
                                                    </div>
                                                  </div>
                                                </>
                                              </div>
                                            );
                                          })
                                        ) : (
                                          <div className="table-cell_no">
                                            <div className="data_inner">
                                              No Data found
                                            </div>
                                          </div>
                                        )}
                                        {notification.length > 0 ? (
                                          <Pagination
                                            itemClass="page-item" // add it for bootstrap 4
                                            linkClass="page-link" // add it for bootstrap 4
                                            activePage={currentPagenotification}
                                            itemsCountPerPage={
                                              recordPerPagenotification
                                            }
                                            totalItemsCount={totalnotification}
                                            pageRangeDisplayed={
                                              pageRangenotification
                                            }
                                            onChange={
                                              handlePageChangenotification
                                            }
                                          />
                                        ) : (
                                          ""
                                        )}
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Grid>
                  )}
                  <Grid item xs={12} sm={12} md={8} lg={12} xl={12}></Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* Your other components and content */}
          </Container>
        )}
      </main>
    </div>
  );
}

export default Home;
