import React, { useEffect } from "react";
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
import useState from "react-usestateref";
import Pagination from "react-js-pagination";

function Home() {
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
  const [
    AccountHolderNameErr,
    SetAccountHolderNameErr,
    AccountHolderNameErrref,
  ] = useState(false);
  const [AccountNumberErr, SetAccountNumberErr, AccountNumberErrref] =
    useState(false);
  const [IFSCCodeErr, SetIFSCCodeErr, IFSCCodeErrref] = useState(false);
  const [BankNameErr, SetBankNameErr, BankNameErrref] = useState(false);
  const [BranchNameErr, SetBranchNameErr, BranchNameErrref] = useState(false);
  const [gpayNumber, setgpayNumber, gpayNumberref] = useState(false);
  const [paytmNumber, setpaytmNumber, paytmNumberref] = useState(false);
  const [validationnErr, setvalidationnErr] = useState("");
  const [BranchAddressErr, SetBranchAddressErr, BranchAddressErrref] =
    useState(false);
  const [Bankdetails, SetBankdetails] = useState([]);
  const [loading, setloading] = useState(false);
  const [pageLoader, setPageloader] = useState(false);

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

  const navigate = useNavigate();

  const handleChange = async (e) => {
    console.log("e====", e);
    e.preventDefault();
    const { name, value } = e.target;
    let formData = { ...formValue, ...{ [name]: value } };
    console.log("formData====", formData);
    setFormValue(formData);
  };

  const validate = async (values) => {
    const errors = {};
    if (values.AccountHolderName == "") {
      errors.AccountHolderName = "Holder Name is require !";
      SetAccountHolderNameErr(true);
    }
    // else if (
    //     values.AccountHolderName.length < 5 ||
    //     values.AccountHolderName.length > 25
    // ) {
    //     errors.AccountHolderName =
    //         "Account Holder Name must hava an 5 to 25 characters!";
    //     SetAccountHolderNameErr(true);
    // }
    else {
      SetAccountHolderNameErr(false);
    }
    if (values.AccountNumber == "") {
      errors.AccountNumber = "Account Number is require !";
      SetAccountNumberErr(true);
    }
    // else if (
    //     values.AccountNumber.length < 5 ||
    //     values.AccountNumber.length > 25
    // ) {
    //     errors.AccountNumber = "Account Number  must hava an 5 to 25 Digits!";
    //     SetAccountNumberErr(true);
    // }
    else {
      SetAccountNumberErr(false);
    }
    if (values.IFSCCode == "") {
      errors.IFSCCode = "IFSC Code is require !";
      SetIFSCCodeErr(true);
    }
    // else if (values.IFSCCode.length < 5 || values.IFSCCode.length > 25) {
    //     errors.IFSCCode = "IFSC Code must have an 5 to 25 characters!";
    //     SetIFSCCodeErr(true);
    // }
    else {
      SetIFSCCodeErr(false);
    }
    if (values.BankName == "") {
      errors.BankName = "Bank Name is require !";
      SetBankNameErr(true);
    }
    // else if (values.BankName.length < 5 || values.BankName.length > 25) {
    //     errors.BankName = "Bank Name must have an 5 to 25 characters!";
    //     SetBankNameErr(true);
    // }
    else {
      SetBankNameErr(false);
    }
    if (values.BranchName == "") {
      errors.BranchName = "Branch Name is require !";
      SetBranchNameErr(true);
    }
    // else if (values.BranchName.length < 5 || values.BranchName.length > 25) {
    //     errors.BranchName = "Branch Name must have an 5 to 25 !";
    //     SetBranchNameErr(true);
    // }
    else {
      SetBranchNameErr(false);
    }
    if (values.BranchAddress == "") {
      errors.BranchAddress = "Branch Address is require !";
      SetBranchAddressErr(true);
    }
    // else if (
    //     values.BranchAddress.length < 5 ||
    //     values.BranchAddress.length > 150
    // ) {
    //     errors.BranchAddress = "Branch Address must have an 5 to 150 characters!";
    //     SetBranchAddressErr(true);
    // }
    else {
      SetBranchAddressErr(false);
    }
    // if (values.gpay_number == "") {
    //     errors.gpay_number = "Gpay Details is require !";
    //     setgpayNumber(true);
    // }

    // if (values.paytm_number == "") {
    //     errors.paytm_number = "Paytm Details is require !";
    //     setpaytmNumber(true);
    // }

    setvalidationnErr(errors);
    return errors;
  };

  useEffect(() => {
    setPageloader(true);

    setTimeout(() => {
      setPageloader(false);
    }, 1000);

    getbankdetails(1);
  }, [0]);

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
      if (resp.status) {
        toast(resp.Message);
        getbankdetails();
      } else {
        toast(resp.Message);
      }
    } catch (error) {}
  };

  //======================================================================//

  const [currTabs, setcurrTabs] = useState("one");
  const [editpage, seteditpage] = useState(false);

  const [currentPagebankdetails, setcurrentPagebankdetails] = useState(1);
  const [totalbankdetails, settotalbankdetails] = useState([]);
  const recordPerPagebankdetails = 2;
  const pageRangebankdetails = 2;

  const handlePageChangebankdetails = (pagenumber) => {
    console.log(pagenumber, "=-=-=-=pagenumber");
    setcurrentPagebankdetails(pagenumber);
    getbankdetails(pagenumber);
  };
  const getbankdetails = async (page) => {
    try {
      var data = {
        apiUrl: apiService.Getbankdetails,
        payload: { perpage: 2, page: page },
      };
      var resp = await postMethod(data);
      if (resp.status == true) {
        SetBankdetails(resp.obj);
        settotalbankdetails(resp.total);
      }
    } catch (error) {
      console.log(error, "=-=error=-=-=");
    }
  };

  const back = (e) => {
    e.preventDefault();
    seteditpage(false);
    set_page_status(false);
  };

  const submitID = async (e) => {
    try {
      e.preventDefault();
      validate(formValue);
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
          apiUrl: apiService.Bankdetails,
          payload: formValue,
        };

        var resp = await postMethod(data);
        console.log(resp, "=-=-resp=--=-=");
        formValue.AccountHolderName = "";
        formValue.AccountNumber = "";
        formValue.IFSCCode = "";
        formValue.BankName = "";
        formValue.BranchName = "";
        formValue.BranchAddress = "";
        formValue.gpay_number = "";
        formValue.paytm_number = "";
        if (resp.status) {
          getbankdetails();
          toast.success(resp.Message);
          set_page_status(false);
          seteditpage(false);
          // navigate("/Historynew");
        } else {
          toast.error(resp.Message);
        }
      } else {
        toast.error("Please fill all the require  fields");
        console.log("ALL FIELD NEED");
      }
    } catch (error) {}
  };
  const [page_status, set_page_status] = useState(false);
  const pagestatus = () => {
    set_page_status(true);
    seteditpage(false);
    formValue.AccountHolderName = "";
    formValue.AccountNumber = "";
    formValue.IFSCCode = "";
    formValue.BankName = "";
    formValue.BranchName = "";
    formValue.BranchAddress = "";
    formValue.gpay_number = "";
    formValue.paytm_number = "";
  };

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

  const deletebank = async (deleteData) => {
    console.log(deleteData, "deleteData");
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
          seteditpage(false);
          set_page_status(false);
        } else {
          toast.error(resp.Message);
        }
      } catch (error) {}
    }
  };
  const update = async (e) => {
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
        formValue.AccountHolderName = "";
        formValue.AccountNumber = "";
        formValue.IFSCCode = "";
        formValue.BankName = "";
        formValue.BranchName = "";
        formValue.BranchAddress = "";
        formValue.gpay_number = "";
        formValue.paytm_number = "";
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
        <Account_Header />

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
              <Grid item xs={12} sm={12} md={8} lg={9} xl={9}>
                <Grid container spacing={2} justifyContent={"center"}>
                  <Grid item xs={12} sm={12} md={12} lg={8} xl={7}>
                    <div className="heading_card_new mt-5">
                      <h1>
                        Payment Methods
                        <i className="ri-arrow-right-line"></i>
                      </h1>
                      <div className="object_header">
                        <Button className="primary_butn" onClick={pagestatus}>
                          Add a Payment Method
                        </Button>
                      </div>
                    </div>
                    <div className="card_logoki pading_cardd payment_card mt-5 p-0">
                      {page_status == true && editpage == false ? (
                        <div className="step-5 ">
                          <div className="form register_login  marhing_pading">
                            <form className="form_pading_s mb-5">
                              <Button onClick={back} className="back_butn">
                                <i
                                  onClick={back}
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
                                    Save
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
                                  <div>
                                    {AccountHolderNameErrref.current == true ? (
                                      <p className="text-danger">
                                        {" "}
                                        {validationnErr.AccountHolderName}{" "}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                  </div>
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
                                  <div>
                                    {AccountNumberErrref.current == true ? (
                                      <p className="text-danger">
                                        {" "}
                                        {validationnErr.AccountNumber}{" "}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                  </div>
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
                                  <div>
                                    {IFSCCodeErrref.current == true ? (
                                      <p className="text-danger">
                                        {" "}
                                        {validationnErr.IFSCCode}{" "}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                  </div>
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
                                  <div>
                                    {BankNameErrref.current == true ? (
                                      <p className="text-danger">
                                        {" "}
                                        {validationnErr.BankName}{" "}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                  </div>
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
                                  <div>
                                    {BranchNameErrref.current == true ? (
                                      <p className="text-danger">
                                        {" "}
                                        {validationnErr.BranchName}{" "}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                  </div>
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
                                  <div>
                                    {BranchAddressErrref.current == true ? (
                                      <p className="text-danger">
                                        {" "}
                                        {validationnErr.BranchAddress}{" "}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                  </div>
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
                                  <div>
                                    {gpayNumberref.current == true ? (
                                      <p className="text-danger">
                                        {" "}
                                        {validationnErr.gpay_number}{" "}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                  </div>
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
                                  <div>
                                    {paytmNumberref.current == true ? (
                                      <p className="text-danger">
                                        {" "}
                                        {validationnErr.paytm_number}{" "}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      ) : page_status == false && editpage == false ? (
                        <>
                          <div className="step-5 ">
                            <div className="form register_login  marhing_pading">
                              {Bankdetails && Bankdetails.length > 0 ? (
                                Bankdetails.map((item, i) => {
                                  return (
                                    <form className="form_pading_s mb-5">
                                      <div className="form_content payment_form">
                                        <h1 className="mb-3 Launch_pad_steps m-0 padding_botn payment_heading">
                                          Bank Transfer
                                        </h1>
                                        <div className="buttons_edit edit_delete_btn">
                                          <Button
                                            onClick={() => editbankData(item)}
                                            className="primary_one"
                                          >
                                            Edit
                                          </Button>
                                          <Button
                                            type="button"
                                            onClick={() => {
                                              deletebank(item);
                                            }}
                                            className=" payment_delete"
                                          >
                                            Delete
                                          </Button>
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
                                            value={item.Accout_HolderName}
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
                                            value={item.Account_Number}
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
                                            value={item.IFSC_code}
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
                                            value={item.Bank_Name}
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
                                            value={item.Branch_Name}
                                            onChange={handleChange}
                                          />
                                        </div>
                                      </div>
                                    </form>
                                  );
                                })
                              ) : (
                                <div className="table-cell_no">
                                  <div className="data_inner">
                                    No Records found
                                  </div>
                                </div>
                              )}

                              <div>
                                {Bankdetails.length > 0 ? (
                                  <Pagination
                                    itemClass="page-item" // add it for bootstrap 4
                                    linkClass="page-link" // add it for bootstrap 4
                                    activePage={currentPagebankdetails}
                                    itemsCountPerPage={recordPerPagebankdetails}
                                    totalItemsCount={totalbankdetails}
                                    pageRangeDisplayed={pageRangebankdetails}
                                    onChange={handlePageChangebankdetails}
                                  />
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      ) : page_status == false && editpage == true ? (
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
                                Edit Payment Method
                              </Button>
                              <div className="form_content payment_form">
                                <h1 className="mb-3 Launch_pad_steps m-0 padding_botn">
                                  Bank Transfer(India)
                                </h1>
                                {/* <div className="buttons_edit">
                                <Button
                                  onClick={update}
                                  className="primary_one"
                                >
                                  Update
                                </Button>
                                {/* <Button>Delete</Button> */}
                                {/* </div> */}
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
                            <Button
                              className="primary_butn"
                              onClick={pagestatus}
                            >
                              Cancel
                            </Button>
                            <Button className="primary_butn" onClick={update}>
                              Save
                            </Button>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </Grid>
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
