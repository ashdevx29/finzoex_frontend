import React, { useState, useEffect, useMemo } from "react";
// import Header from "../../Newcomponent/Header";
import Account_Header from "../../Newcomponent/Account_Header";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiService from "../../../core/service/detail";
import { getMethod, postMethod } from "../../../core/service/common.api";
import Footernew from "../../footer_buttom";
import { Grid, Paper, Container } from "@mui/material";
import { Button } from "semantic-ui-react";
import { Dropdown } from "semantic-ui-react";
import Select from "react-select";
import SidebarNew from "./SidebarNew";
import countryList from "react-select-country-list";
import useStateref from "react-usestateref";
import QRCode from "react-qr-code";
import { socket } from "../../Pages/socket/socket";
import countrylist from "../../country.json";

function Home() {
  const initialFormValue = {
    email: "",
    month: "",
  };

  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [emailValidate, setemailValidate] = useState(false);
  const [passwordValidate, setpasswordValidate] = useState(false);
  const [validationnErr, setvalidationnErr] = useState("");
  const [formValue, setFormValue] = useState(initialFormValue);
  const [buttonLoader, setbuttonLoader] = useState(false);
  const [passHide, setPasshide] = useState(false);
  const [inputType, setinputType] = useState("password");
  const { email, isTerms, password, confirmPassword } = formValue;

  //========================New KYC AUTH : Prakash ==============//

  const inputValue = {
    fullname: "",
    homeAddress: "",
    apartment_number: "",
    city: "",
    state: "",
    pancard_number: "",
  };
  const [getValue, setgetValue] = useState(inputValue);
  const [step, setstep] = useState(0);
  const [id_proof, setid_proof, id_proofref] = useStateref("");
  const [loader, setloader] = useState(false);

  useEffect(() => {
    var token = localStorage.getItem("user_token");
    if (!token) {
      navigate("/login");
    }
    getKycDeatils();
    socket.off("socketResponse");
    socket.on("scanmy_device", function (res) {
      console.log(res, "=-=-=-=res");
      if (res.status == 1) {
        setstage8("step8");
        setstage7("step7 d-none");
      }
      if (res.status == 2) {
        setstage9("step9");
        setstage8("step8 d-none");
      }
    });
  }, [socket]);

  const getIdvalue = (idValue) => {
    setid_proof(idValue);
    setstage6("step6");
    setstage5("step5 d-none");
  };
  const [kycStatus, setkycStatus] = useState(false);
  const getKycDeatils = async () => {
    var data = {
      apiUrl: apiService.getKycDeatil2,
    };
    setloader(true);
    var resp = await postMethod(data);
    setloader(false);
    if (resp.status == true) {
      if (resp.data != 0) {
        setdateValue(resp.data.DOB);
        setqrvalue(resp.data.qrcode);
        setstep(resp.data.step);
        setkycStatus(resp.data.kycStatus)
        if(resp.data.kycStatus == 1)
        {
          setstage9("step9");
          setstage8("step8 d-none");
          setstage7("step7 d-none");
          setstage6("step6 d-none");
          setstage5("step5 d-none");
          setstage4("step4 d-none");
          setstage3("step3 d-none");
          setstage2("step2 d-none");
          setstage1("step1 d-none");
        }
        else
        {
          if(resp.data.kycStatus == 2)
          {
            setstage9("step9");
            setstage8("step8 d-none");
            setstage7("step7 d-none");
            setstage6("step6 d-none");
            setstage5("step5 d-none");
            setstage4("step4 d-none");
            setstage3("step3 d-none");
            setstage2("step2 d-none");
            setstage1("step1 d-none");
          }
          else
          {
            if (resp.data.step == 3) {
              setstage3("step3");
              setstage1("step1 d-none");
            } else if (resp.data.step == 4) {
              setstage4("step4");
              setstage1("step1 d-none");
            } else if (resp.data.step == 5) {
              setstage5("step5");
              setstage1("step1 d-none");
            } else if (resp.data.step == 6) {
              setstage7("step7");
              setstage1("step1 d-none");
            } else if (resp.data.step == 7) {
              setstage9("step9  d-none");
              setstage1("step1 ");
            }
          }
          

        }
        
        

      }
    } else {
    }
  };
  const getFormvalue = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formData = { ...getValue, ...{ [name]: value } };
    setgetValue(formData);
    console.log(formData);
  };

  //================validate State===========================//
  const [locationvalidate, setlocationvalidate] = useState(false);
  const [fullnamevalidate, setfullnamevalidate] = useState(false);
  const [datevalidate, setdatevalidate] = useState(false);
  const [homeAddressValidate, sethomeAddressValidate] = useState(false);
  const [cityValidate, setcityValidate] = useState(false);
  const [apartment_numberValidate, setapartment_numberValidate] = useState(
    false
  );
  const [stateValidate, setstateValidate] = useState(false);
  const [pincodeValidate, setpincodeValidate] = useState(false);
  const [pancard_numberValidate, setpancard_numberValidate] = useState(false);

  const [stage1, setstage1] = useState("step1");
  const [stage2, setstage2] = useState("step2 d-none");
  const [stage3, setstage3] = useState("step3 d-none");
  const [stage4, setstage4] = useState("step4 d-none");
  const [stage5, setstage5] = useState("step5 d-none");
  const [stage6, setstage6] = useState("step6 d-none");
  const [stage7, setstage7] = useState("step7 d-none");
  const [stage8, setstage8] = useState("step8 d-none");
  const [stage9, setstage9] = useState("step9 d-none");

  const validate = () => {
    const errors = {};
    console.log(getValue.fullname, "=-=-=-=getValue.fullname  ");
    if (getValue.fullname == "") {
      errors.fullname = "Fullname is required field";
      setfullnamevalidate(true);
    } else {
      setfullnamevalidate(false);
    }

    if (dateValue == "" || monthValue == "" || yearValue == "") {
      errors.date = "Date is required field";
      setdatevalidate(true);
    } else {
      setdatevalidate(false);
    }

    setvalidationnErr(errors);
    return errors;
  };

  const validate2 = () => {
    const errors = {};
    if (getValue.homeAddress == "") {
      errors.homeAddress = "Home address is required field";
      sethomeAddressValidate(true);
    } else {
      sethomeAddressValidate(false);
    }
    // if (getValue.apartment_number == "") {
    //   errors.apartment_number = "Apartment Number is required field";
    //   setapartment_numberValidate(true);
    // } else {
    //   setapartment_numberValidate(false);
    // }
    if (getValue.city == "") {
      errors.city = "City is required field";
      setcityValidate(true);
    } else {
      setcityValidate(false);
    }
    if (getValue.state == "") {
      errors.state = "State is required field";
      setstateValidate(true);
    } else {
      setstateValidate(false);
    }
    if (getValue.pincode == "") {
      errors.pincode = "Pincode is required field";
      setpincodeValidate(true);
    } else {
      setpincodeValidate(false);
    }

    setvalidationnErr(errors);
    return errors;
  };
  const validate3 = () => {
    console.log("getValue.pancard_number.toString().length",getValue.pancard_number.toString().length);
    const errors = {};
    if (getValue.pancard_number == "") {
      errors.pancard_number = "Pan card Number is required field";
      setpancard_numberValidate(true);
    }
    else if(getValue.pancard_number.toString().length != 10){
      errors.pancard_number = "Pan card Number must be in 10 characters";
      setpancard_numberValidate(true);
    }
     else {
      setpancard_numberValidate(false);
    }
    setvalidationnErr(errors);
    return errors;
  };

  const [qrvalue, setqrvalue] = useState(false);
  const [pincode, setpincode,pincoderef] = useStateref("");

  const picodeHanlde = (value) => {
     if(value.toString().length > 10){

     }else{
      setpincode(value)
     }
  }
  const formSubmit = async (value) => {
    if (value == "step1") {
      if (locationref.current != "") {
        setlocationvalidate(false);
        setstage2("step2");
        setstage1("step1 d-none");
      } else {
        setlocationvalidate(true);
      }
    } else if (value == "step2") {
      validate();
      if (
        getValue.fullname != "" &&
        dateValue != "" &&
        monthValue != "" &&
        yearValue != ""
      ) {
        setfullnamevalidate(false);
        setstage3("step3");
        setstage2("step2 d-none");
      }
    } else if (value == "step3") {
      validate2();
      if (
        getValue.homeAddress != "" &&
        // getValue.apartment_number != "" &&
        getValue.city != "" &&
        getValue.state != "" &&
        pincoderef.current != ""
      ) {
        setstage4("step4");
        setstage3("step3 d-none");
      }
    } else if (value == "step4") {
      validate3();
      if (getValue.pancard_number != "" && getValue.pancard_number.toString().length == 10) {
        setstage5("step5");
        setstage4("step4 d-none");
      }
    } else if (value == "step6") {
      var data = {
        apiUrl: apiService.updateKyc,
        payload: {
          date:
            dateValue.toString() +
            "/" +
            monthValue.toString() +
            "/" +
            yearValue.toString(),
          fullName: getValue.fullname,
          homwAddress: getValue.homeAddress,
          apartment_number: getValue.apartment_number,
          city: getValue.city,
          state: getValue.state,
          pincode: pincoderef.current,
          pancard_number: getValue.pancard_number,
          location: locationref.current,
          id_proof: id_proofref.current,
          step: 6,
        },
      };
      var resp = await postMethod(data);
      if (resp.status == true) {
        getKycDeatils();
        setqrvalue(resp.qrcode);
        setstage7("step7");
        setstage6("step6 d-none");
      }
    } else if (value == "step7") {
      setstage8("step8");
      setstage7("step7 d-none");
    } else if (value == "step8") {
      setstage9("step9");
      setstage8("step8 d-none");
    }
    if (value == "step9") {
      navigate("/Userprofile");
    }
  };

  const formupdate = async (value) => {
    if (value == "step1") {
      if (locationref.current != "") {
        setlocationvalidate(false);
        setstage2("step2");
        setstage1("step1 d-none");
      } else {
        setlocationvalidate(true);
      }
    } else if (value == "step2") {
      validate();
      if (
        getValue.fullname != "" &&
        dateValue != "" &&
        monthValue != "" &&
        yearValue != "" &&
        locationref.current != ""
      ) {
        var obj = {
          fullName: getValue.fullname,
          date:
            dateValue.toString() +
            ":" +
            monthValue.toString() +
            ":" +
            yearValue.toString(),
          location: locationref.current,
          step: 3,
        };
        var data = {
          apiUrl: apiService.updateKyc,
          payload: obj,
        };
        var resp = await postMethod(data);
        if (resp.status == true) {
          navigate("/Userprofile");
          getKycDeatils();
          setfullnamevalidate(false);
          // navigate("/");
          toast.success(resp.Message);
        } else {
          toast.error(resp.Message);
        }
      }
    } else if (value == "step3") {
      validate2();
      if (
        getValue.homeAddress != "" &&
        // getValue.apartment_number != "" &&
        getValue.city != "" &&
        getValue.state != "" &&
        getValue.pincode != ""
      ) {
        var obj2 = {
          fullName: getValue.fullname,
          date:
            dateValue.toString() +
            ":" +
            monthValue.toString() +
            ":" +
            yearValue.toString(),
          location: locationref.current,
          homwAddress: getValue.homeAddress,
          apartment_number: getValue.apartment_number,
          city: getValue.city,
          state: getValue.state,
          pincode: getValue.pincode,
          step: 4,
        };
        var data2 = {
          apiUrl: apiService.updateKyc,
          payload: obj2,
        };
        var resp2 = await postMethod(data2);
        if (resp2.status == true) {
          navigate("/Userprofile");
          getKycDeatils();
          toast.success(resp2.Message);
          setstage4("step4");
          setstage3("step3 d-none");
        } else {
          toast.error(resp2.Message);
        }
      }
    } else if (value == "step4") {
      validate3();
      if (getValue.pancard_number != "") {
        var obj3 = {
          fullName: getValue.fullname,
          date:
            dateValue.toString() +
            "/" +
            monthValue.toString() +
            "/" +
            yearValue.toString(),
          location: locationref.current,
          homwAddress: getValue.homeAddress,
          apartment_number: getValue.apartment_number,
          city: getValue.city,
          state: getValue.state,
          pincode: getValue.pincode,
          pancard_number: getValue.pancard_number,
          step: 5,
        };
        var data3 = {
          apiUrl: apiService.updateKyc,
          payload: obj3,
        };
        var resp3 = await postMethod(data3);
        if (resp3.status == true) {
          navigate("/Userprofile");
          getKycDeatils();
          setstage5("step5");
          setstage4("step4 d-none");
          toast.success(resp3.Message);
        } else {
          toast.error(resp3.Message);
        }
      }
    } else if (value == "step5") {
      setstage6("step6");
      setstage5("step5 d-none");
    } else if (value == "step6") {
      setstage7("step7");
      setstage6("step6 d-none");
    } else if (value == "step7") {
      setstage8("step8");
      setstage7("step7 d-none");
    } else if (value == "step8") {
      setstage9("step9");
      setstage8("step8 d-none");
    }
  };

  const backSubmit = async (value) => {
    if (value == "step2") {
      setstage2("step2 d-none");
      setstage1("step1 ");
    } else if (value == "step3") {
      setstage3("step3 d-none");
      setstage2("step2");
    } else if (value == "step4") {
      setstage4("step4 d-none");
      setstage3("step3");
    } else if (value == "step5") {
      setstage5("step5 d-none");
      setstage4("step4");
    } else if (value == "step6") {
      setstage6("step6 d-none");
      setstage5("step5");
    } else if (value == "step7") {
      setstage7("step7 d-none");
      setstage6("step6");
    } else if (value == "step8") {
      setstage8("step8 d-none");
      setstage7("step7");
    } else if (value == "step9") {
      setstage9("step9 d-none");
      setstage8("step8");
    }
  };

  const [location, setlocation, locationref] = useStateref("");

  const changeHandler = (e, option) => {
    let obj = countryOptions.find((o) => o.value === option.value);
    setlocation(obj.text);
    console.log(locationref.current);
  };

  const [dateValue, setdateValue] = useState("");
  const [monthValue, setmonthValue] = useState("");
  const [yearValue, setyearValue] = useState("");
  const dateHandler = (value) => {
    console.log(value);
    if (value.toString().length > 2) {
    } else {
      setdateValue(value);
    }
  };
  const monthHandler = (value) => {
    if (value.toString().length > 2) {
    } else {
      setmonthValue(value);
    }
  };
  const yesrHandler = (value) => {
    if (value.toString().length > 4) {
    } else {
      setyearValue(value);
    }
  };

  const countryOptions = countrylist.data.map((country) => ({
    key: country.name,
    text: country.name,
    value: country.name,
  }));
 
  
  return (
    <div className="">
      <main className="main-content tradepage-bg  bg-cover onlywhitee new_login_bb">
        <Account_Header/>
        <Container maxWidth="xl" className="container-lg">
          <Grid container spacing={2} justifyContent={"center"}>
            {/* Item for xs (extra small) screens */}
            <Grid item xs={12} sm={12} md={8} lg={3} xl={3}>
              <SidebarNew />
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={9} xl={9}>
              <Grid container spacing={2} justifyContent={"center"}>
                {loader == false ? (
                  <Grid item xs={12} sm={12} md={8} lg={7} xl={7}>
                    <div className="card_logoki pading_cardd">

                      <div className={stage1}>
                        <div className="form_content">
                          <h1 className="mb-2">Let’s get you verified </h1>
                          <p className="form_lable_botton mb-5">
                            Select your residency and follow the steps
                          </p>
                        </div>

                        <div className="form_login_section p-0">
                          <div className="form register_login p-0">
                            <form className="form_pading_s">
                              <div className="form-group">
                                <label>Location</label>
                                <Dropdown
                                  placeholder="Select your location"
                                  fluid
                                  selection
                                  className="text_memu"
                                  // value={locationref.current}
                                  onChange={changeHandler}
                                  options={countryOptions}
                                  search
                                />
                              </div>
                              <div className="red_alert">
                                {locationvalidate == true ? (
                                  <p className="text-danger">
                                    Location is required
                                  </p>
                                ) : (
                                  ""
                                )}
                              </div>
                              <div className="register_login2">
                                <p className="form_lable_botton mt-3 mb-0 right-margjs">
                                  Complete the following steps to verify your
                                  account.
                                </p>
                              </div>
                              <div className="register_login2 check mt-2">
                                <p>
                                  <i className="ri-file-text-line mr-2"></i>Personal
                                  information
                                  <br />
                                </p>
                                <p>
                                  <i className="ri-news-line mr-2"></i>Government
                                  issued ID
                                  <br />
                                </p>
                              </div>
                            </form>
                            {buttonLoader == false ? (
                              <button
                                type="button"
                                className="btn btn-primary w-100"
                                onClick={() => formSubmit("step1")}
                              >
                                Continue
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="btn btn-primary w-100"
                              >
                                loading...
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className={stage2}>
                        <div className="form_content">
                          <Button
                            onClick={() => backSubmit("step2")}
                            className="back_butn"
                          >
                            <i
                              onClick={() => backSubmit("step2")}
                              className="ri-arrow-left-line"
                            ></i>{" "}
                            Back
                          </Button>
                          <h1 className="mb-2">Personal Information</h1>
                          <p className="form_lable_botton">
                            Please provide the following information as shown on
                            your passport or ID card.
                          </p>
                        </div>
                        <div className="form_login_section p-0">
                          <div className="form register_login p-0">
                            <form className="form_pading_s">
                              <div className="form-group">
                                <label>Full Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter your full name"
                                  name="fullname"
                                  maxLength={25}
                                  onChange={getFormvalue}
                                />
                              </div>
                              <div>
                                {fullnamevalidate == true ? (
                                  <p className="text-danger">
                                    Full name is required
                                  </p>
                                ) : (
                                  ""
                                )}
                              </div>
                              <div className="form-group">
                                <label>Date of Birth</label>
                                <div className="input_flex_propery">
                                  <input
                                    type="number"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="DD"
                                    name="date"
                                    value={dateValue}
                                    onChange={(e) =>
                                      dateHandler(e.target.value)
                                    }
                                  />
                                  <input
                                    type="number"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="MM"
                                    value={monthValue}
                                    name="month"
                                    onChange={(e) =>
                                      monthHandler(e.target.value)
                                    }
                                  />
                                  <input
                                    type="number"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="YYYY"
                                    name="year"
                                    value={yearValue}
                                    onChange={(e) =>
                                      yesrHandler(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                              <div>
                                {datevalidate == true ? (
                                  <p className="text-danger">
                                    {" "}
                                    {validationnErr.date}{" "}
                                  </p>
                                ) : (
                                  ""
                                )}
                              </div>
                            </form>

                            {buttonLoader == false ? (
                              <button
                                type="button"
                                className="btn btn-primary w-100"
                                onClick={() => formSubmit("step2")}
                              >
                                Submit
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="btn btn-primary w-100"
                              >
                                loading...
                              </button>
                            )}
                            <Link
                              to=""
                              onClick={() => formupdate("step2")}
                              className="cancel_butn"
                            >
                              Save and Exit
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className={stage3}>
                        <div className="form_content">
                          {step != 3 ? (
                            <Button
                              onClick={() => backSubmit("step3")}
                              className="back_butn"
                            >
                              <i
                                onClick={() => backSubmit("step3")}
                                className="ri-arrow-left-line"
                              ></i>{" "}
                              Back
                            </Button>
                          ) : (
                            ""
                          )}
                          <h1 className="mb-2">Home Address</h1>
                          <p className="form_lable_botton">
                            Please provide the following information as shown on
                            your passport or ID card.
                          </p>
                        </div>
                        <div className="form_login_section p-0">
                          <div className="form register_login p-0">
                            <form className="form_pading_s">
                              <div className="form-group">
                                <label>Home address</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleInputPassword1"
                                  maxLength={70}
                                  placeholder="Enter your address"
                                  name="homeAddress"
                                  onChange={getFormvalue}
                                />
                                <div>
                                  {homeAddressValidate == true ? (
                                    <p className="text-danger">
                                      {" "}
                                      {validationnErr.homeAddress}{" "}
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div className="form-group">
                                <label>
                                  Unit or apartment number (optional)
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleInputPassword1"
                                  maxLength={25}
                                  placeholder="Enter unit or apartment number"
                                  name="apartment_number"
                                  onChange={getFormvalue}
                                />
                                <div>
                                  {apartment_numberValidate == true ? (
                                    <p className="text-danger">
                                      {" "}
                                      {validationnErr.apartment_number}{" "}
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div className="form-group">
                                <label>City</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  maxLength={30}
                                  id="exampleInputPassword1"
                                  placeholder="Enter city, town, or subdivision"
                                  name="city"
                                  onChange={getFormvalue}
                                />
                                <div>
                                  {cityValidate == true ? (
                                    <p className="text-danger">
                                      {" "}
                                      {validationnErr.city}{" "}
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div className="form-group">
                                <label>State</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleInputPassword1"
                                  placeholder="Enter state"
                                  name="state"
                                  maxLength={25}
                                  onChange={getFormvalue}
                                />
                                <div>
                                  {stateValidate == true ? (
                                    <p className="text-danger">
                                      {" "}
                                      {validationnErr.state}{" "}
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div className="form-group">
                                <label>Pin code</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  id="exampleInputPassword1"
                                  placeholder="Pin code"
                                  name="pincode"
                                  value={pincode}
                                  onChange={(e) => picodeHanlde(e.target.value)}
                                />
                                <div>
                                  {pincodeValidate == true ? (
                                    <p className="text-danger">
                                      {" "}
                                      {validationnErr.pincode}{" "}
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            </form>

                            {buttonLoader == false ? (
                              <button
                                type="button"
                                className="btn btn-primary w-100"
                                onClick={() => formSubmit("step3")}
                              >
                                Continue
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="btn btn-primary w-100"
                              >
                                loading...
                              </button>
                            )}
                            <Link
                              to=""
                              onClick={() => formupdate("step3")}
                              className="cancel_butn"
                            >
                              Save and Exit
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className={stage4}>
                        <div className="form_content">
                          {step != 4 ? (
                            <Button
                              onClick={() => backSubmit("step4")}
                              className="back_butn"
                            >
                              <i
                                onClick={() => backSubmit("step4")}
                                className="ri-arrow-left-line"
                              ></i>{" "}
                              Back
                            </Button>
                          ) : (
                            ""
                          )}
                          <h1 className="mb-2">Add Pan Card Details</h1>
                        </div>
                        <div className="form_login_section p-0">
                          <div className="form register_login p-0">
                            <form className="form_pading_s">
                              <div className="form-group">
                                <label>Pan Card Number</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  maxLength={10}
                                  id="exampleInputPassword1"
                                  placeholder="Enter Pan Card Number"
                                  name="pancard_number"
                                  onChange={getFormvalue}
                                />
                              </div>
                              <div>
                                {pancard_numberValidate == true ? (
                                  <p className="text-danger">
                                    {" "}
                                    {validationnErr.pancard_number}{" "}
                                  </p>
                                ) : (
                                  ""
                                )}
                              </div>
                            </form>

                            {buttonLoader == false ? (
                              <button
                                type="button"
                                className="btn btn-primary w-100"
                                onClick={() => formSubmit("step4")}
                              >
                                Submit
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="btn btn-primary w-100"
                              >
                                loading...
                              </button>
                            )}
                            <Link
                              onClick={() => formupdate("step4")}
                              className="cancel_butn"
                            >
                              Save and Exit
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className={stage5}>
                        <div className="form_content">
                          {step != 5 ? (
                            <Button
                              onClick={() => backSubmit("step5")}
                              className="back_butn"
                            >
                              <i
                                onClick={() => backSubmit("step5")}
                                className="ri-arrow-left-line"
                              ></i>{" "}
                              Back
                            </Button>
                          ) : (
                            ""
                          )}
                          <h1 className="mb-2">Identity Verification</h1>
                          <p className="form_lable_botton">
                            Follow the steps below for verifying your identity.
                            This is required for security purposes.
                          </p>
                        </div>
                        <div className="form_login_section p-0">
                          <div className="form register_login p-0">
                            <form className="form_pading_s">
                              <h2 className="text_inner_card">
                                Which type of photo ID would you like to
                                provide?
                              </h2>
                              <div className="form-group">
                                <label>Accepted documents</label>
                                {/* <a href="" className="accepte mb-2"> */}
                                <div
                                  onClick={() => getIdvalue("Passport")}
                                  className="accepte a mb-2 cursor-pointer"
                                >
                                  <div className="grow_1">
                                    <p>Passport</p>
                                    <span>Photo page</span>
                                  </div>
                                  <div className="icon">
                                    <i className="ri-arrow-right-s-line"></i>
                                  </div>
                                </div>
                                {/* </a> */}
                                {/* <a href="" className="accepte mb-2"> */}
                                <div
                                  onClick={() => getIdvalue("license")}
                                  className="accepte a mb-2 cursor-pointer"
                                >
                                  <div className="grow_1 license">
                                    <p>Driver’s license</p>
                                    <span>Front and back</span>
                                  </div>
                                  <div className="icon">
                                    <i className="ri-arrow-right-s-line"></i>
                                  </div>
                                </div>
                                {/* </a> */}

                                {/* <a href="" className="accepte mb-2"> */}
                                <div
                                  onClick={() => getIdvalue("NationalId")}
                                  className="accepte a mb-2 cursor-pointer"
                                >
                                  <div className="grow_1">
                                    <p>National ID</p>
                                    <span>Front and back</span>
                                  </div>
                                  <div className="icon">
                                    <i className="ri-arrow-right-s-line"></i>
                                  </div>
                                </div>
                                {/* </a> */}
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                      <div className={stage6}>
                        <div className="form_content">
                          <Button
                            onClick={() => backSubmit("step6")}
                            className="back_butn"
                          >
                            <i
                              onClick={() => backSubmit("step6")}
                              className="ri-arrow-left-line"
                            ></i>{" "}
                            Back
                          </Button>
                          <h1 className="mb-2">Identity Verification</h1>
                          <p className="form_lable_botton">
                            Take pictures of both sides of your government
                            issued ID card
                          </p>
                        </div>
                        <div className="form_login_section p-0">
                          <div className="form register_login p-0">
                            <ul className="option_instruction image-marker">
                              <li>
                                Upload a complete image if your ID document.
                              </li>
                              <li>
                                Ensure all details are readable in the image you
                                upload.
                              </li>
                              <li>
                                Ensure the document is the original and has not
                                expired.
                              </li>
                              <li>
                                Place document against a solid-coloured
                                background.
                              </li>
                            </ul>

                            {buttonLoader == false ? (
                              <button
                                type="button"
                                className="btn btn-primary w-100"
                                onClick={() => formSubmit("step6")}
                              >
                                Continue
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="btn btn-primary w-100"
                              >
                                loading...
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className={stage7}>
                        <div className="form_content">
                          {step != 6 ? (
                            <Button
                              onClick={() => backSubmit("step7")}
                              className="back_butn"
                            >
                              <i
                                onClick={() => backSubmit("step7")}
                                className="ri-arrow-left-line"
                              ></i>{" "}
                              Back
                            </Button>
                          ) : (
                            ""
                          )}
                          <h1 className="mb-2">Scan With Your Phone</h1>
                          <p className="form_lable_botton">
                            Scan the QR code with your mobile phone, and finish
                            your verification on your mobile device
                          </p>
                        </div>
                        <div className="form_login_section">
                          <div className="form register_login p-0 w-100">
                            <div className="qr_mage d-flex justify-content-center">
                              <img src={qrvalue} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={stage8}>
                        <div className="form_content">
                          <h1 className="mb-2">Connected to Your Phone</h1>
                          <p className="form_lable_botton">
                            Once you have finished on your mobile, we’ll take
                            you to the next step.
                          </p>
                        </div>
                        <hr className="hr_line" />
                        <div className="form_login_section p-0">
                          <div className="form register_login p-0">
                            <ul className="option_instruction image-marker">
                              <li>
                                Please keep this window open to view the real
                                time verification result.
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className={stage9}>
                        <div className="form_content Proprer_center">
                          <img
                            src={new URL("../../../img/New_images/pennding.png", import.meta.url).href}
                            className="img-fluid "
                          />
                          {kycStatus == 1 ?
                            <h1 className="mb-1" style={{ color: "green" }}>verified</h1> :
                            <h1 className="mb-1">Under Review!</h1>}
                          {kycStatus == 1 ? "" :
                            <p className="form_lable_botton">
                              You will receive an email once review is completed.
                            </p>}
                        </div>
                        {kycStatus == 1 ? "" :
                          <>
                            <hr className="hr_line" />

                            <div className="form_login_section p-0">
                              <div className="form register_login p-0">
                                <ul className="option_instruction image-marker">
                                  <li>
                                    Please keep this window open to view the real
                                    time verification result.
                                  </li>
                                </ul>
                                {buttonLoader == false ? (
                                  <button
                                    type="button"
                                    className="btn btn-primary w-100"
                                    onClick={() => formSubmit("step9")}
                                  >
                                    Go to Home
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    className="btn btn-primary w-100"
                                  >
                                    loading...
                                  </button>
                                )}
                              </div>
                            </div>
                          </>}
                      </div>
                    </div>
                  </Grid>
                ) : (
                  <Grid item xs={12} sm={12} md={8} lg={7} xl={7}>
                    <div className="card_logoki pading_cardd loading">
                      <i className="fa-solid fa-spinner fa-spin-pulse  loading_icon"></i>
                    </div>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
          {/* Your other components and content */}
        </Container>
      </main>
    </div>
  );
}

export default Home;




// import React, { useState, useEffect, useMemo } from "react";
// // import Header from "../../Newcomponent/Header";
// import Account_Header from "../../Newcomponent/Account_Header";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import apiService from "../../../core/service/detail";
// import { getMethod, postMethod } from "../../../core/service/common.api";
// import Footernew from "../../footer_buttom";
// import { Grid, Paper, Container } from "@mui/material";
// import { Button } from "semantic-ui-react";
// import { Dropdown } from "semantic-ui-react";
// import Select from "react-select";
// import SidebarNew from "./SidebarNew";
// import countryList from "react-select-country-list";
// import useStateref from "react-usestateref";
// import QRCode from "react-qr-code";
// import { socket } from "../../Pages/socket/socket";
// import countrylist from "../../country.json";

// function Home() {
//   const initialFormValue = {
//     email: "",
//     month: "",
//   };

//   const navigate = useNavigate();
//   // const dispatch = useDispatch();
//   const [emailValidate, setemailValidate] = useState(false);
//   const [passwordValidate, setpasswordValidate] = useState(false);
//   const [validationnErr, setvalidationnErr] = useState("");
//   const [formValue, setFormValue] = useState(initialFormValue);
//   const [buttonLoader, setbuttonLoader] = useState(false);
//   const [passHide, setPasshide] = useState(false);
//   const [inputType, setinputType] = useState("password");
//   const { email, isTerms, password, confirmPassword } = formValue;

//   //========================New KYC AUTH : Prakash ==============//

//   const inputValue = {
//     fullname: "",
//     homeAddress: "",
//     apartment_number: "",
//     city: "",
//     state: "",
//     pancard_number: "",
//   };
//   const [getValue, setgetValue] = useState(inputValue);
//   const [step, setstep] = useState(0);
//   const [id_proof, setid_proof, id_proofref] = useStateref("");
//   const [loader, setloader] = useState(false);

//   useEffect(() => {
//     var token = localStorage.getItem("user_token");
//     if (!token) {
//       navigate("/login");
//     }
//     getKycDeatils();
//     socket.off("socketResponse");
//     socket.on("scanmy_device", function (res) {
//       console.log(res, "=-=-=-=res");
//       if (res.status == 1) {
//         setstage8("step8");
//         setstage7("step7 d-none");
//       }
//       if (res.status == 2) {
//         setstage9("step9");
//         setstage8("step8 d-none");
//       }
//     });
//   }, [socket]);

//   const getIdvalue = (idValue) => {
//     setid_proof(idValue);
//     setstage6("step6");
//     setstage5("step5 d-none");
//   };
//   const [kycStatus, setkycStatus] = useState(false);
//   const getKycDeatils = async () => {
//     var data = {
//       apiUrl: apiService.getKycDeatil2,
//     };
//     setloader(true);
//     var resp = await postMethod(data);
//     setloader(false);
//     if (resp.status == true) {
//       if (resp.data != 0) {
//         setdateValue(resp.data.DOB);
//         setqrvalue(resp.data.qrcode);
//         setstep(resp.data.step);
//         setkycStatus(resp.data.kycStatus)
//         if(resp.data.kycStatus == 1)
//         {
//           setstage9("step9");
//           setstage8("step8 d-none");
//           setstage7("step7 d-none");
//           setstage6("step6 d-none");
//           setstage5("step5 d-none");
//           setstage4("step4 d-none");
//           setstage3("step3 d-none");
//           setstage2("step2 d-none");
//           setstage1("step1 d-none");
//         }
//         else
//         {
//           if(resp.data.kycStatus == 2)
//           {
//             setstage9("step9");
//             setstage8("step8 d-none");
//             setstage7("step7 d-none");
//             setstage6("step6 d-none");
//             setstage5("step5 d-none");
//             setstage4("step4 d-none");
//             setstage3("step3 d-none");
//             setstage2("step2 d-none");
//             setstage1("step1 d-none");
//           }
//           else
//           {
//             if (resp.data.step == 3) {
//               setstage3("step3");
//               setstage1("step1 d-none");
//             } else if (resp.data.step == 4) {
//               setstage4("step4");
//               setstage1("step1 d-none");
//             } else if (resp.data.step == 5) {
//               setstage5("step5");
//               setstage1("step1 d-none");
//             } else if (resp.data.step == 6) {
//               setstage7("step7");
//               setstage1("step1 d-none");
//             } else if (resp.data.step == 7) {
//               setstage9("step9  d-none");
//               setstage1("step1 ");
//             }
//           }
          

//         }
        
        

//       }
//     } else {
//     }
//   };
//   const getFormvalue = async (e) => {
//     e.preventDefault();
//     const { name, value } = e.target;
//     let formData = { ...getValue, ...{ [name]: value } };
//     setgetValue(formData);
//     console.log(formData);
//   };

//   //================validate State===========================//
//   const [locationvalidate, setlocationvalidate] = useState(false);
//   const [fullnamevalidate, setfullnamevalidate] = useState(false);
//   const [datevalidate, setdatevalidate] = useState(false);
//   const [homeAddressValidate, sethomeAddressValidate] = useState(false);
//   const [cityValidate, setcityValidate] = useState(false);
//   const [apartment_numberValidate, setapartment_numberValidate] = useState(
//     false
//   );
//   const [stateValidate, setstateValidate] = useState(false);
//   const [pincodeValidate, setpincodeValidate] = useState(false);
//   const [pancard_numberValidate, setpancard_numberValidate] = useState(false);

//   const [stage1, setstage1] = useState("step1");
//   const [stage2, setstage2] = useState("step2 d-none");
//   const [stage3, setstage3] = useState("step3 d-none");
//   const [stage4, setstage4] = useState("step4 d-none");
//   const [stage5, setstage5] = useState("step5 d-none");
//   const [stage6, setstage6] = useState("step6 d-none");
//   const [stage7, setstage7] = useState("step7 d-none");
//   const [stage8, setstage8] = useState("step8 d-none");
//   const [stage9, setstage9] = useState("step9 d-none");

//   const validate = () => {
//     const errors = {};
//     console.log(getValue.fullname, "=-=-=-=getValue.fullname  ");
//     if (getValue.fullname == "") {
//       errors.fullname = "Fullname is required field";
//       setfullnamevalidate(true);
//     } else {
//       setfullnamevalidate(false);
//     }

//     if (dateValue == "" || monthValue == "" || yearValue == "") {
//       errors.date = "Date is required field";
//       setdatevalidate(true);
//     } else {
//       setdatevalidate(false);
//     }

//     setvalidationnErr(errors);
//     return errors;
//   };

//   const validate2 = () => {
//     const errors = {};
//     if (getValue.homeAddress == "") {
//       errors.homeAddress = "Home address is required field";
//       sethomeAddressValidate(true);
//     } else {
//       sethomeAddressValidate(false);
//     }
//     // if (getValue.apartment_number == "") {
//     //   errors.apartment_number = "Apartment Number is required field";
//     //   setapartment_numberValidate(true);
//     // } else {
//     //   setapartment_numberValidate(false);
//     // }
//     if (getValue.city == "") {
//       errors.city = "City is required field";
//       setcityValidate(true);
//     } else {
//       setcityValidate(false);
//     }
//     if (getValue.state == "") {
//       errors.state = "State is required field";
//       setstateValidate(true);
//     } else {
//       setstateValidate(false);
//     }
//     if (getValue.pincode == "") {
//       errors.pincode = "Pincode is required field";
//       setpincodeValidate(true);
//     } else {
//       setpincodeValidate(false);
//     }

//     setvalidationnErr(errors);
//     return errors;
//   };
//   const validate3 = () => {
//     console.log("getValue.pancard_number.toString().length",getValue.pancard_number.toString().length);
//     const errors = {};
//     if (getValue.pancard_number == "") {
//       errors.pancard_number = "Pan card Number is required field";
//       setpancard_numberValidate(true);
//     }
//     else if(getValue.pancard_number.toString().length != 10){
//       errors.pancard_number = "Pan card Number must be in 10 characters";
//       setpancard_numberValidate(true);
//     }
//      else {
//       setpancard_numberValidate(false);
//     }
//     setvalidationnErr(errors);
//     return errors;
//   };

//   const [qrvalue, setqrvalue] = useState(false);
//   const [pincode, setpincode,pincoderef] = useStateref("");

//   const picodeHanlde = (value) => {
//      if(value.toString().length > 10){

//      }else{
//       setpincode(value)
//      }
//   }
//   const formSubmit = async (value) => {
//     if (value == "step1") {
//       if (locationref.current != "") {
//         setlocationvalidate(false);
//         setstage2("step2");
//         setstage1("step1 d-none");
//       } else {
//         setlocationvalidate(true);
//       }
//     } else if (value == "step2") {
//       validate();
//       if (
//         getValue.fullname != "" &&
//         dateValue != "" &&
//         monthValue != "" &&
//         yearValue != ""
//       ) {
//         setfullnamevalidate(false);
//         setstage3("step3");
//         setstage2("step2 d-none");
//       }
//     } else if (value == "step3") {
//       validate2();
//       if (
//         getValue.homeAddress != "" &&
//         // getValue.apartment_number != "" &&
//         getValue.city != "" &&
//         getValue.state != "" &&
//         pincoderef.current != ""
//       ) {
//         setstage4("step4");
//         setstage3("step3 d-none");
//       }
//     } else if (value == "step4") {
//       validate3();
//       if (getValue.pancard_number != "" && getValue.pancard_number.toString().length == 10) {
//         setstage5("step5");
//         setstage4("step4 d-none");
//       }
//     } else if (value == "step6") {
//       var data = {
//         apiUrl: apiService.updateKyc,
//         payload: {
//           date:
//             dateValue.toString() +
//             "/" +
//             monthValue.toString() +
//             "/" +
//             yearValue.toString(),
//           fullName: getValue.fullname,
//           homwAddress: getValue.homeAddress,
//           apartment_number: getValue.apartment_number,
//           city: getValue.city,
//           state: getValue.state,
//           pincode: pincoderef.current,
//           pancard_number: getValue.pancard_number,
//           location: locationref.current,
//           id_proof: id_proofref.current,
//           step: 6,
//         },
//       };
//       var resp = await postMethod(data);
//       if (resp.status == true) {
//         getKycDeatils();
//         setqrvalue(resp.qrcode);
//         setstage7("step7");
//         setstage6("step6 d-none");
//       }
//     } else if (value == "step7") {
//       setstage8("step8");
//       setstage7("step7 d-none");
//     } else if (value == "step8") {
//       setstage9("step9");
//       setstage8("step8 d-none");
//     }
//     if (value == "step9") {
//       navigate("/Userprofile");
//     }
//   };

//   const formupdate = async (value) => {
//     if (value == "step1") {
//       if (locationref.current != "") {
//         setlocationvalidate(false);
//         setstage2("step2");
//         setstage1("step1 d-none");
//       } else {
//         setlocationvalidate(true);
//       }
//     } else if (value == "step2") {
//       validate();
//       if (
//         getValue.fullname != "" &&
//         dateValue != "" &&
//         monthValue != "" &&
//         yearValue != "" &&
//         locationref.current != ""
//       ) {
//         var obj = {
//           fullName: getValue.fullname,
//           date:
//             dateValue.toString() +
//             ":" +
//             monthValue.toString() +
//             ":" +
//             yearValue.toString(),
//           location: locationref.current,
//           step: 3,
//         };
//         var data = {
//           apiUrl: apiService.updateKyc,
//           payload: obj,
//         };
//         var resp = await postMethod(data);
//         if (resp.status == true) {
//           navigate("/Userprofile");
//           getKycDeatils();
//           setfullnamevalidate(false);
//           // navigate("/");
//           toast.success(resp.Message);
//         } else {
//           toast.error(resp.Message);
//         }
//       }
//     } else if (value == "step3") {
//       validate2();
//       if (
//         getValue.homeAddress != "" &&
//         // getValue.apartment_number != "" &&
//         getValue.city != "" &&
//         getValue.state != "" &&
//         getValue.pincode != ""
//       ) {
//         var obj2 = {
//           fullName: getValue.fullname,
//           date:
//             dateValue.toString() +
//             ":" +
//             monthValue.toString() +
//             ":" +
//             yearValue.toString(),
//           location: locationref.current,
//           homwAddress: getValue.homeAddress,
//           apartment_number: getValue.apartment_number,
//           city: getValue.city,
//           state: getValue.state,
//           pincode: getValue.pincode,
//           step: 4,
//         };
//         var data2 = {
//           apiUrl: apiService.updateKyc,
//           payload: obj2,
//         };
//         var resp2 = await postMethod(data2);
//         if (resp2.status == true) {
//           navigate("/Userprofile");
//           getKycDeatils();
//           toast.success(resp2.Message);
//           setstage4("step4");
//           setstage3("step3 d-none");
//         } else {
//           toast.error(resp2.Message);
//         }
//       }
//     } else if (value == "step4") {
//       validate3();
//       if (getValue.pancard_number != "") {
//         var obj3 = {
//           fullName: getValue.fullname,
//           date:
//             dateValue.toString() +
//             "/" +
//             monthValue.toString() +
//             "/" +
//             yearValue.toString(),
//           location: locationref.current,
//           homwAddress: getValue.homeAddress,
//           apartment_number: getValue.apartment_number,
//           city: getValue.city,
//           state: getValue.state,
//           pincode: getValue.pincode,
//           pancard_number: getValue.pancard_number,
//           step: 5,
//         };
//         var data3 = {
//           apiUrl: apiService.updateKyc,
//           payload: obj3,
//         };
//         var resp3 = await postMethod(data3);
//         if (resp3.status == true) {
//           navigate("/Userprofile");
//           getKycDeatils();
//           setstage5("step5");
//           setstage4("step4 d-none");
//           toast.success(resp3.Message);
//         } else {
//           toast.error(resp3.Message);
//         }
//       }
//     } else if (value == "step5") {
//       setstage6("step6");
//       setstage5("step5 d-none");
//     } else if (value == "step6") {
//       setstage7("step7");
//       setstage6("step6 d-none");
//     } else if (value == "step7") {
//       setstage8("step8");
//       setstage7("step7 d-none");
//     } else if (value == "step8") {
//       setstage9("step9");
//       setstage8("step8 d-none");
//     }
//   };

//   const backSubmit = async (value) => {
//     if (value == "step2") {
//       setstage2("step2 d-none");
//       setstage1("step1 ");
//     } else if (value == "step3") {
//       setstage3("step3 d-none");
//       setstage2("step2");
//     } else if (value == "step4") {
//       setstage4("step4 d-none");
//       setstage3("step3");
//     } else if (value == "step5") {
//       setstage5("step5 d-none");
//       setstage4("step4");
//     } else if (value == "step6") {
//       setstage6("step6 d-none");
//       setstage5("step5");
//     } else if (value == "step7") {
//       setstage7("step7 d-none");
//       setstage6("step6");
//     } else if (value == "step8") {
//       setstage8("step8 d-none");
//       setstage7("step7");
//     } else if (value == "step9") {
//       setstage9("step9 d-none");
//       setstage8("step8");
//     }
//   };

//   const [location, setlocation, locationref] = useStateref("");

//   const changeHandler = (e, option) => {
//     let obj = countryOptions.find((o) => o.value === option.value);
//     setlocation(obj.text);
//     console.log(locationref.current);
//   };

//   const [dateValue, setdateValue] = useState("");
//   const [monthValue, setmonthValue] = useState("");
//   const [yearValue, setyearValue] = useState("");
//   const dateHandler = (value) => {
//     console.log(value);
//     if (value.toString().length > 2) {
//     } else {
//       setdateValue(value);
//     }
//   };
//   const monthHandler = (value) => {
//     if (value.toString().length > 2) {
//     } else {
//       setmonthValue(value);
//     }
//   };
//   const yesrHandler = (value) => {
//     if (value.toString().length > 4) {
//     } else {
//       setyearValue(value);
//     }
//   };

//   const countryOptions = countrylist.data.map((country) => ({
//     key: country.name,
//     text: country.name,
//     value: country.name,
//   }));
 
  
//   return (
//     <div className="">
//       <main className="main-content tradepage-bg  bg-cover onlywhitee new_login_bb">
//         <Account_Header/>
//         <Container maxWidth="xl" className="container-lg">
//           <Grid container spacing={2} justifyContent={"center"}>
//             {/* Item for xs (extra small) screens */}
//             <Grid item xs={12} sm={12} md={8} lg={3} xl={3}>
//               <SidebarNew />
//             </Grid>
//             <Grid item xs={12} sm={12} md={8} lg={9} xl={9}>
//               <Grid container spacing={2} justifyContent={"center"}>
//                 {loader == false ? (
//                   <Grid item xs={12} sm={12} md={8} lg={7} xl={7}>
//                     <div className="card_logoki pading_cardd">

//                       <div className={stage1}>
//                         <div className="form_content">
//                           <h1 className="mb-2">Let’s get you verified </h1>
//                           <p className="form_lable_botton mb-5">
//                             Select your residency and follow the steps
//                           </p>
//                         </div>

//                         <div className="form_login_section p-0">
//                           <div className="form register_login p-0">
//                             <form className="form_pading_s">
//                               <div className="form-group">
//                                 <label>Location</label>
//                                 <Dropdown
//                                   placeholder="Select your location"
//                                   fluid
//                                   selection
//                                   className="text_memu"
//                                   // value={locationref.current}
//                                   onChange={changeHandler}
//                                   options={countryOptions}
//                                   search
//                                 />
//                               </div>
//                               <div className="red_alert">
//                                 {locationvalidate == true ? (
//                                   <p className="text-danger">
//                                     Location is required
//                                   </p>
//                                 ) : (
//                                   ""
//                                 )}
//                               </div>
//                               <div className="register_login2">
//                                 <p className="form_lable_botton mt-3 mb-0 right-margjs">
//                                   Complete the following steps to verify your
//                                   account.
//                                 </p>
//                               </div>
//                               <div className="register_login2 check mt-2">
//                                 <p>
//                                   <i className="ri-file-text-line mr-2"></i>Personal
//                                   information
//                                   <br />
//                                 </p>
//                                 <p>
//                                   <i className="ri-news-line mr-2"></i>Government
//                                   issued ID
//                                   <br />
//                                 </p>
//                               </div>
//                             </form>
//                             {buttonLoader == false ? (
//                               <button
//                                 type="button"
//                                 className="btn btn-primary w-100"
//                                 onClick={() => formSubmit("step1")}
//                               >
//                                 Continue
//                               </button>
//                             ) : (
//                               <button
//                                 type="button"
//                                 className="btn btn-primary w-100"
//                               >
//                                 loading...
//                               </button>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                       <div className={stage2}>
//                         <div className="form_content">
//                           <Button
//                             onClick={() => backSubmit("step2")}
//                             className="back_butn"
//                           >
//                             <i
//                               onClick={() => backSubmit("step2")}
//                               className="ri-arrow-left-line"
//                             ></i>{" "}
//                             Back
//                           </Button>
//                           <h1 className="mb-2">Personal Information</h1>
//                           <p className="form_lable_botton">
//                             Please provide the following information as shown on
//                             your passport or ID card.
//                           </p>
//                         </div>
//                         <div className="form_login_section p-0">
//                           <div className="form register_login p-0">
//                             <form className="form_pading_s">
//                               <div className="form-group">
//                                 <label>Full Name</label>
//                                 <input
//                                   type="text"
//                                   className="form-control"
//                                   placeholder="Enter your full name"
//                                   name="fullname"
//                                   maxLength={25}
//                                   onChange={getFormvalue}
//                                 />
//                               </div>
//                               <div>
//                                 {fullnamevalidate == true ? (
//                                   <p className="text-danger">
//                                     Full name is required
//                                   </p>
//                                 ) : (
//                                   ""
//                                 )}
//                               </div>
//                               <div className="form-group">
//                                 <label>Date of Birth</label>
//                                 <div className="input_flex_propery">
//                                   <input
//                                     type="number"
//                                     className="form-control"
//                                     id="exampleInputPassword1"
//                                     placeholder="DD"
//                                     name="date"
//                                     value={dateValue}
//                                     onChange={(e) =>
//                                       dateHandler(e.target.value)
//                                     }
//                                   />
//                                   <input
//                                     type="number"
//                                     className="form-control"
//                                     id="exampleInputPassword1"
//                                     placeholder="MM"
//                                     value={monthValue}
//                                     name="month"
//                                     onChange={(e) =>
//                                       monthHandler(e.target.value)
//                                     }
//                                   />
//                                   <input
//                                     type="number"
//                                     className="form-control"
//                                     id="exampleInputPassword1"
//                                     placeholder="YYYY"
//                                     name="year"
//                                     value={yearValue}
//                                     onChange={(e) =>
//                                       yesrHandler(e.target.value)
//                                     }
//                                   />
//                                 </div>
//                               </div>
//                               <div>
//                                 {datevalidate == true ? (
//                                   <p className="text-danger">
//                                     {" "}
//                                     {validationnErr.date}{" "}
//                                   </p>
//                                 ) : (
//                                   ""
//                                 )}
//                               </div>
//                             </form>

//                             {buttonLoader == false ? (
//                               <button
//                                 type="button"
//                                 className="btn btn-primary w-100"
//                                 onClick={() => formSubmit("step2")}
//                               >
//                                 Submit
//                               </button>
//                             ) : (
//                               <button
//                                 type="button"
//                                 className="btn btn-primary w-100"
//                               >
//                                 loading...
//                               </button>
//                             )}
//                             <Link
//                               to=""
//                               onClick={() => formupdate("step2")}
//                               className="cancel_butn"
//                             >
//                               Save and Exit
//                             </Link>
//                           </div>
//                         </div>
//                       </div>
//                       <div className={stage3}>
//                         <div className="form_content">
//                           {step != 3 ? (
//                             <Button
//                               onClick={() => backSubmit("step3")}
//                               className="back_butn"
//                             >
//                               <i
//                                 onClick={() => backSubmit("step3")}
//                                 className="ri-arrow-left-line"
//                               ></i>{" "}
//                               Back
//                             </Button>
//                           ) : (
//                             ""
//                           )}
//                           <h1 className="mb-2">Home Address</h1>
//                           <p className="form_lable_botton">
//                             Please provide the following information as shown on
//                             your passport or ID card.
//                           </p>
//                         </div>
//                         <div className="form_login_section p-0">
//                           <div className="form register_login p-0">
//                             <form className="form_pading_s">
//                               <div className="form-group">
//                                 <label>Home address</label>
//                                 <input
//                                   type="text"
//                                   className="form-control"
//                                   id="exampleInputPassword1"
//                                   maxLength={70}
//                                   placeholder="Enter your address"
//                                   name="homeAddress"
//                                   onChange={getFormvalue}
//                                 />
//                                 <div>
//                                   {homeAddressValidate == true ? (
//                                     <p className="text-danger">
//                                       {" "}
//                                       {validationnErr.homeAddress}{" "}
//                                     </p>
//                                   ) : (
//                                     ""
//                                   )}
//                                 </div>
//                               </div>
//                               <div className="form-group">
//                                 <label>
//                                   Unit or apartment number (optional)
//                                 </label>
//                                 <input
//                                   type="text"
//                                   className="form-control"
//                                   id="exampleInputPassword1"
//                                   maxLength={25}
//                                   placeholder="Enter unit or apartment number"
//                                   name="apartment_number"
//                                   onChange={getFormvalue}
//                                 />
//                                 <div>
//                                   {apartment_numberValidate == true ? (
//                                     <p className="text-danger">
//                                       {" "}
//                                       {validationnErr.apartment_number}{" "}
//                                     </p>
//                                   ) : (
//                                     ""
//                                   )}
//                                 </div>
//                               </div>
//                               <div className="form-group">
//                                 <label>City</label>
//                                 <input
//                                   type="text"
//                                   className="form-control"
//                                   maxLength={30}
//                                   id="exampleInputPassword1"
//                                   placeholder="Enter city, town, or subdivision"
//                                   name="city"
//                                   onChange={getFormvalue}
//                                 />
//                                 <div>
//                                   {cityValidate == true ? (
//                                     <p className="text-danger">
//                                       {" "}
//                                       {validationnErr.city}{" "}
//                                     </p>
//                                   ) : (
//                                     ""
//                                   )}
//                                 </div>
//                               </div>
//                               <div className="form-group">
//                                 <label>State</label>
//                                 <input
//                                   type="text"
//                                   className="form-control"
//                                   id="exampleInputPassword1"
//                                   placeholder="Enter state"
//                                   name="state"
//                                   maxLength={25}
//                                   onChange={getFormvalue}
//                                 />
//                                 <div>
//                                   {stateValidate == true ? (
//                                     <p className="text-danger">
//                                       {" "}
//                                       {validationnErr.state}{" "}
//                                     </p>
//                                   ) : (
//                                     ""
//                                   )}
//                                 </div>
//                               </div>
//                               <div className="form-group">
//                                 <label>Pin code</label>
//                                 <input
//                                   type="number"
//                                   className="form-control"
//                                   id="exampleInputPassword1"
//                                   placeholder="Pin code"
//                                   name="pincode"
//                                   value={pincode}
//                                   onChange={(e) => picodeHanlde(e.target.value)}
//                                 />
//                                 <div>
//                                   {pincodeValidate == true ? (
//                                     <p className="text-danger">
//                                       {" "}
//                                       {validationnErr.pincode}{" "}
//                                     </p>
//                                   ) : (
//                                     ""
//                                   )}
//                                 </div>
//                               </div>
//                             </form>

//                             {buttonLoader == false ? (
//                               <button
//                                 type="button"
//                                 className="btn btn-primary w-100"
//                                 onClick={() => formSubmit("step3")}
//                               >
//                                 Continue
//                               </button>
//                             ) : (
//                               <button
//                                 type="button"
//                                 className="btn btn-primary w-100"
//                               >
//                                 loading...
//                               </button>
//                             )}
//                             <Link
//                               to=""
//                               onClick={() => formupdate("step3")}
//                               className="cancel_butn"
//                             >
//                               Save and Exit
//                             </Link>
//                           </div>
//                         </div>
//                       </div>
//                       <div className={stage4}>
//                         <div className="form_content">
//                           {step != 4 ? (
//                             <Button
//                               onClick={() => backSubmit("step4")}
//                               className="back_butn"
//                             >
//                               <i
//                                 onClick={() => backSubmit("step4")}
//                                 className="ri-arrow-left-line"
//                               ></i>{" "}
//                               Back
//                             </Button>
//                           ) : (
//                             ""
//                           )}
//                           <h1 className="mb-2">Add Pan Card Details</h1>
//                         </div>
//                         <div className="form_login_section p-0">
//                           <div className="form register_login p-0">
//                             <form className="form_pading_s">
//                               <div className="form-group">
//                                 <label>Pan Card Number</label>
//                                 <input
//                                   type="text"
//                                   className="form-control"
//                                   maxLength={10}
//                                   id="exampleInputPassword1"
//                                   placeholder="Enter Pan Card Number"
//                                   name="pancard_number"
//                                   onChange={getFormvalue}
//                                 />
//                               </div>
//                               <div>
//                                 {pancard_numberValidate == true ? (
//                                   <p className="text-danger">
//                                     {" "}
//                                     {validationnErr.pancard_number}{" "}
//                                   </p>
//                                 ) : (
//                                   ""
//                                 )}
//                               </div>
//                             </form>

//                             {buttonLoader == false ? (
//                               <button
//                                 type="button"
//                                 className="btn btn-primary w-100"
//                                 onClick={() => formSubmit("step4")}
//                               >
//                                 Submit
//                               </button>
//                             ) : (
//                               <button
//                                 type="button"
//                                 className="btn btn-primary w-100"
//                               >
//                                 loading...
//                               </button>
//                             )}
//                             <Link
//                               onClick={() => formupdate("step4")}
//                               className="cancel_butn"
//                             >
//                               Save and Exit
//                             </Link>
//                           </div>
//                         </div>
//                       </div>
//                       <div className={stage5}>
//                         <div className="form_content">
//                           {step != 5 ? (
//                             <Button
//                               onClick={() => backSubmit("step5")}
//                               className="back_butn"
//                             >
//                               <i
//                                 onClick={() => backSubmit("step5")}
//                                 className="ri-arrow-left-line"
//                               ></i>{" "}
//                               Back
//                             </Button>
//                           ) : (
//                             ""
//                           )}
//                           <h1 className="mb-2">Identity Verification</h1>
//                           <p className="form_lable_botton">
//                             Follow the steps below for verifying your identity.
//                             This is required for security purposes.
//                           </p>
//                         </div>
//                         <div className="form_login_section p-0">
//                           <div className="form register_login p-0">
//                             <form className="form_pading_s">
//                               <h2 className="text_inner_card">
//                                 Which type of photo ID would you like to
//                                 provide?
//                               </h2>
//                               <div className="form-group">
//                                 <label>Accepted documents</label>
//                                 {/* <a href="" className="accepte mb-2"> */}
//                                 <div
//                                   onClick={() => getIdvalue("Passport")}
//                                   className="accepte a mb-2 cursor-pointer"
//                                 >
//                                   <div className="grow_1">
//                                     <p>Passport</p>
//                                     <span>Photo page</span>
//                                   </div>
//                                   <div className="icon">
//                                     <i className="ri-arrow-right-s-line"></i>
//                                   </div>
//                                 </div>
//                                 {/* </a> */}
//                                 {/* <a href="" className="accepte mb-2"> */}
//                                 <div
//                                   onClick={() => getIdvalue("license")}
//                                   className="accepte a mb-2 cursor-pointer"
//                                 >
//                                   <div className="grow_1 license">
//                                     <p>Driver’s license</p>
//                                     <span>Front and back</span>
//                                   </div>
//                                   <div className="icon">
//                                     <i className="ri-arrow-right-s-line"></i>
//                                   </div>
//                                 </div>
//                                 {/* </a> */}

//                                 {/* <a href="" className="accepte mb-2"> */}
//                                 <div
//                                   onClick={() => getIdvalue("NationalId")}
//                                   className="accepte a mb-2 cursor-pointer"
//                                 >
//                                   <div className="grow_1">
//                                     <p>National ID</p>
//                                     <span>Front and back</span>
//                                   </div>
//                                   <div className="icon">
//                                     <i className="ri-arrow-right-s-line"></i>
//                                   </div>
//                                 </div>
//                                 {/* </a> */}
//                               </div>
//                             </form>
//                           </div>
//                         </div>
//                       </div>
//                       <div className={stage6}>
//                         <div className="form_content">
//                           <Button
//                             onClick={() => backSubmit("step6")}
//                             className="back_butn"
//                           >
//                             <i
//                               onClick={() => backSubmit("step6")}
//                               className="ri-arrow-left-line"
//                             ></i>{" "}
//                             Back
//                           </Button>
//                           <h1 className="mb-2">Identity Verification</h1>
//                           <p className="form_lable_botton">
//                             Take pictures of both sides of your government
//                             issued ID card
//                           </p>
//                         </div>
//                         <div className="form_login_section p-0">
//                           <div className="form register_login p-0">
//                             <ul className="option_instruction image-marker">
//                               <li>
//                                 Upload a complete image if your ID document.
//                               </li>
//                               <li>
//                                 Ensure all details are readable in the image you
//                                 upload.
//                               </li>
//                               <li>
//                                 Ensure the document is the original and has not
//                                 expired.
//                               </li>
//                               <li>
//                                 Place document against a solid-coloured
//                                 background.
//                               </li>
//                             </ul>

//                             {buttonLoader == false ? (
//                               <button
//                                 type="button"
//                                 className="btn btn-primary w-100"
//                                 onClick={() => formSubmit("step6")}
//                               >
//                                 Continue
//                               </button>
//                             ) : (
//                               <button
//                                 type="button"
//                                 className="btn btn-primary w-100"
//                               >
//                                 loading...
//                               </button>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                       <div className={stage7}>
//                         <div className="form_content">
//                           {step != 6 ? (
//                             <Button
//                               onClick={() => backSubmit("step7")}
//                               className="back_butn"
//                             >
//                               <i
//                                 onClick={() => backSubmit("step7")}
//                                 className="ri-arrow-left-line"
//                               ></i>{" "}
//                               Back
//                             </Button>
//                           ) : (
//                             ""
//                           )}
//                           <h1 className="mb-2">Scan With Your Phone</h1>
//                           <p className="form_lable_botton">
//                             Scan the QR code with your mobile phone, and finish
//                             your verification on your mobile device
//                           </p>
//                         </div>
//                         <div className="form_login_section">
//                           <div className="form register_login p-0 w-100">
//                             <div className="qr_mage d-flex justify-content-center">
//                               <img src={qrvalue} />
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       <div className={stage8}>
//                         <div className="form_content">
//                           <h1 className="mb-2">Connected to Your Phone</h1>
//                           <p className="form_lable_botton">
//                             Once you have finished on your mobile, we’ll take
//                             you to the next step.
//                           </p>
//                         </div>
//                         <hr className="hr_line" />
//                         <div className="form_login_section p-0">
//                           <div className="form register_login p-0">
//                             <ul className="option_instruction image-marker">
//                               <li>
//                                 Please keep this window open to view the real
//                                 time verification result.
//                               </li>
//                             </ul>
//                           </div>
//                         </div>
//                       </div>

//                       <div className={stage9}>
//                         <div className="form_content Proprer_center">
//                           <img
//                             src={new URL("../../../img/New_images/pennding.png", import.meta.url).href}
//                             className="img-fluid "
//                           />
//                           {kycStatus == 1 ?
//                             <h1 className="mb-1" style={{ color: "green" }}>verified</h1> :
//                             <h1 className="mb-1">Under Review!</h1>}
//                           {kycStatus == 1 ? "" :
//                             <p className="form_lable_botton">
//                               You will receive an email once review is completed.
//                             </p>}
//                         </div>
//                         {kycStatus == 1 ? "" :
//                           <>
//                             <hr className="hr_line" />

//                             <div className="form_login_section p-0">
//                               <div className="form register_login p-0">
//                                 <ul className="option_instruction image-marker">
//                                   <li>
//                                     Please keep this window open to view the real
//                                     time verification result.
//                                   </li>
//                                 </ul>
//                                 {buttonLoader == false ? (
//                                   <button
//                                     type="button"
//                                     className="btn btn-primary w-100"
//                                     onClick={() => formSubmit("step9")}
//                                   >
//                                     Go to Home
//                                   </button>
//                                 ) : (
//                                   <button
//                                     type="button"
//                                     className="btn btn-primary w-100"
//                                   >
//                                     loading...
//                                   </button>
//                                 )}
//                               </div>
//                             </div>
//                           </>}
//                       </div>
//                     </div>
//                   </Grid>
//                 ) : (
//                   <Grid item xs={12} sm={12} md={8} lg={7} xl={7}>
//                     <div className="card_logoki pading_cardd loading">
//                       <i className="fa-solid fa-spinner fa-spin-pulse  loading_icon"></i>
//                     </div>
//                   </Grid>
//                 )}
//               </Grid>
//             </Grid>
//           </Grid>
//           {/* Your other components and content */}
//         </Container>
//       </main>
//     </div>
//   );
// }

// export default Home;

