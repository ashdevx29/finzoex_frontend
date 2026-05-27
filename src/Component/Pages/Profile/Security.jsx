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
import useStateRef from "react-usestateref";

function Home() {
  const options = ["one", "two", "three"];
  const countryOptions = [
    { key: "m", text: "Male", value: "male" },
    { key: "f", text: "Female", value: "female" },
    { key: "o", text: "Other", value: "other" },
  ];
  const initialFormValue = {
    password: "",
    new_password: "",
    confirm_password: "",
  };

  const navigate = useNavigate();

  useEffect(() => {
    var token = localStorage.getItem("user_token");
    if (token) {
      fetchTfaData();
    } else {
      navigate("/login");
    }
  }, []);

  // const dispatch = useDispatch();
  const [emailValidate, setemailValidate] = useState(false);
  const [passwordValidate, setpasswordValidate, passwordValidateref] =
    useStateRef(false);
  const [
    new_passwordValidate,
    setnew_passwordValidate,
    new_passwordValidateref,
  ] = useStateRef(false);
  const [
    confirm_passwordValidate,
    setconfirm_passwordValidate,
    confirm_passwordValidateref,
  ] = useStateRef(false);
  const [validationnErr, setvalidationnErr] = useState("");
  const [formValue, setFormValue] = useState(initialFormValue);
  const [buttonLoader, setbuttonLoader] = useState(false);
  const [passHide, setPasshide] = useState(false);
  const [passHide1, setPasshide1] = useState(false);
  const [passHide2, setPasshide2] = useState(false);
  const [inputType, setinputType] = useState("password");
  const [inputType1, setinputType1] = useState("password");
  const [inputType2, setinputType2] = useState("password");
  const { email, isTerms, password, confirmPassword } = formValue;
  const [pageLoader, setpageLoader] = useState(false);

  const handleChange = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formData = { ...formValue, ...{ [name]: value } };
    setFormValue(formData);
    // validate(formData);
  };

  const passwordHide = (data) => {
    if (data == "hide") {
      setPasshide(true);
      setinputType("text");
    } else {
      setPasshide(false);
      setinputType("password");
    }
  };

  const passwordHide1 = (data) => {
    if (data == "hide") {
      setPasshide1(true);
      setinputType1("text");
    } else {
      setPasshide1(false);
      setinputType1("password");
    }
  };
  const passwordHide2 = (data) => {
    if (data == "hide") {
      setPasshide2(true);
      setinputType2("text");
    } else {
      setPasshide2(false);
      setinputType2("password");
    }
  };
  const validate = async () => {
    const errors = {};

    if (formValue.password == "") {
      setpasswordValidate(true);
      errors.password = "Password is required";
    } else if (
      formValue.password.length < 6 ||
      formValue.password.length > 25
    ) {
      setpasswordValidate(true);
      errors.password =
        "Password is required and shouldnot below 6 above 25 letters";
    } else if (!formValue.password.match(/[a-z]/g)) {
      setpasswordValidate(true);
      errors.password = "Please enter at least lower character";
    } else if (!formValue.password.match(/[A-Z]/g)) {
      setpasswordValidate(true);
      errors.password = "Please enter at least upper character";
    } else if (!formValue.password.match(/[0-9]/g)) {
      setpasswordValidate(true);
      errors.password = "Please enter at One digit character";
    } else if (!formValue.password.match(/[!@#$%^&*]/g)) {
      setpasswordValidate(true);
      errors.password = "Please enter at least one special character";
    } else if (formValue.password == formValue.new_password) {
      setpasswordValidate(true);
      errors.password = "Old and New password is match";
    } else {
      setpasswordValidate(false);
    }

    if (formValue.new_password == "") {
      setnew_passwordValidate(true);
      errors.new_password = "New password is required";
    } else if (
      formValue.new_password.length <= 6 ||
      formValue.new_password.length >= 25
    ) {
      setnew_passwordValidate(true);
      errors.new_password =
        "New password is required and shouldnot below 6 above 25 letters";
    } else if (!formValue.new_password.match(/[a-z]/g)) {
      setnew_passwordValidate(true);
      errors.new_password = "Please enter at least lower character";
    } else if (!formValue.new_password.match(/[A-Z]/g)) {
      setnew_passwordValidate(true);
      errors.new_password = "Please enter at least upper character";
    } else if (!formValue.new_password.match(/[0-9]/g)) {
      setnew_passwordValidate(true);
      errors.new_password = "Please enter at One digit character";
    } else if (!formValue.new_password.match(/[!@#$%^&*]/g)) {
      setnew_passwordValidate(true);
      errors.new_password = "Please enter at least one special character";
    } else {
      setnew_passwordValidate(false);
    }

    if (formValue.confirm_password == "") {
      errors.confirm_password = "Confirm password is a required field";
      setconfirm_passwordValidate(true);
    } else if (formValue.new_password !== formValue.confirm_password) {
      errors.confirm_password = "Password and Confirm password does not match";
      setconfirm_passwordValidate(true);
    } else {
      setconfirm_passwordValidate(false);
    }

    setvalidationnErr(errors);
    return errors;
  };

  const formSubmit = async () => {
    validate();
    console.log(
      passwordValidateref.current,
      "==",
      new_passwordValidateref.current,
      "===",
      confirm_passwordValidateref
    );
    if (
      passwordValidateref.current == false &&
      new_passwordValidateref.current == false &&
      confirm_passwordValidateref.current == false
    ) {
      var data = {
        apiUrl: apiService.changePassword,
        payload: formValue,
      };
      setbuttonLoader(true);
      var resp = await postMethod(data);
      setbuttonLoader(false);
      if (resp.status == true) {
        toast.success(resp.message);
        localStorage.clear();
        navigate("/login");
      } else {
        toast.error(resp.message);
      }
    }
  };

  //==================================2FA functions=====================================//

  const [tfaDetails, setTfaDetails] = useState({});
  const [addDetails, setaddDetails] = useState({});
  const [tfaCode, setTfaCode] = useState("");
  const [ValidationErrors, setValidationErrors] = useState({});

  const tfahand = (value) => {
    if (value.toString().length > 10) {
    } else {
      setTfaCode(value);
    }
  };
  const fetchTfaData = async () => {
    try {
      var data = {
        apiUrl: apiService.getTfaDetials,
      };
      var resp = await getMethod(data);
      setpageLoader(true);
      if(resp.status)
      {
        setpageLoader(false);
        console.log(resp.data.tfastatus, "--==-=resp-==-=-resp-=-");
        setTfaDetails(resp?.data.tfastatus);
        console.log(resp?.data);
        setaddDetails(resp?.data);
        console.log(resp?.data.tfa_url);
      }
     
    } catch (error) {}
  };

  const handleSubmit = async () => {
    setValidationErrors({});
    if (!tfaCode || tfaCode === "") {
      setValidationErrors({
        tfaCode: "2FA code is required",
      });
    } else {
      console.log(tfaDetails, "=--=tfaDetails");
      let tfaStatus = tfaDetails;
      var data = {
        apiUrl: apiService.changeTfaStatus,
        payload: {
          userToken: tfaCode,
          tfaStatus: tfaStatus,
        },
      };
      setbuttonLoader(true);
      var resp = await postMethod(data);
      setbuttonLoader(false);
      console.log(resp.status, "=-=-=-=-=-enter2");
      if (resp.status == true) {
        console.log("=-=-=-=-=-enter");
        toast.success(resp.Message);
        setTfaCode("");
        fetchTfaData();
        if (typeof resp?.errors !== "undefined") {
          const isErrorEmpty = Object.keys(resp?.errors).length === 0;
          if (!isErrorEmpty) {
            setValidationErrors(resp?.errors);
          }
        } else {
        }
      } else {
        toast.error(resp.Message);
      }
    }
  };

  return (
    <div className="">
      <main className="main-content tradepage-bg  bg-cover onlywhitee new_login_bb">
      <Account_Header/>
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
        <Container maxWidth="xl" className="container-lg">
          <Grid container spacing={2} justifyContent={"center"}>
            {/* Item for xs (extra small) screens */}
            <Grid item xs={12} sm={12} md={8} lg={3} xl={3}>
              <SidebarNew />
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={9} xl={9}>
              <Grid container spacing={2} justifyContent={"center"}>
                <Grid item xs={12} sm={12} md={8} lg={7} xl={7}>
                  <div className="card_logoki pading_cardd">
                    <div className="step-5 ">
                      <div className="form_content">
                        <h1 className="mb-3 Launch_pad_steps">
                          Account Security
                        </h1>
                      </div>
                      <div className="tabs_inside">
                        <ul className="nav nav-tabs">
                          <li className="active">
                            <a data-toggle="tab" href="#tFA" className="active">
                              2FA
                            </a>
                          </li>
                          <li>
                            <a data-toggle="tab" href="#menu1">
                              Change Password
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="tab-content">
                        <div id="tFA" className="tab-pane fade in active show">
                          <div className="form_login_section p-0 mt-4">
                            <div className="tfa_box mb-3">
                              <h3>
                                2FA <span className="alret_tfa">Disabled</span>
                              </h3>
                              <p>
                                If you want to turn off 2FA, input your account
                                password and the six-digit code provided by the
                                Google Authenticator app below, then click
                                "Disable 2FA".
                              </p>
                            </div>
                            <div className="tfa_box  mb-3">
                              <h3>Enable 2FA</h3>
                              <p>
                                Enter the six-digit code provided by the Google
                                Authenticator app to Disable the 2FA
                                verification
                              </p>
                            </div>
                            {tfaDetails === 0 ? (
                              <div className="qr_mage d-flex justify-content-start mb-3">
                                <img src={addDetails?.tfa_url} />
                              </div>
                            ) : (
                              ""
                            )}
                            <div className="form register_login p-0">
                              <form className="form_pading_s pl-0 pr-0 bg_tras pb-0">
                                <div className="form-group">
                                  <label>2FA Code</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="TFA Code"
                                    name="tfaCode"
                                    value={tfaCode}
                                    onChange={(e) => tfahand(e.target.value)}
                                  />
                                  <div>
                                    {ValidationErrors.tfaCode && (
                                      <p className="text-danger">
                                        {" "}
                                        {ValidationErrors.tfaCode}{" "}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </form>

                              {buttonLoader == false ? (
                                <button
                                  type="button"
                                  className="btn btn-primary w-100"
                                  onClick={handleSubmit}
                                >
                                  {tfaDetails === 0
                                    ? "Enable 2FA"
                                    : "Disable 2FA"}{" "}
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
                        <div id="menu1" className="tab-pane fade">
                          <div className="step-1">
                            <div className="form_content">
                              <h1 className="font_inner mb-3 mt-3">
                                Change Your Password
                              </h1>
                            </div>
                            <div className="form_login_section p-0">
                              <div className="form register_login p-0">
                                <form className="form_pading_s">
                                  <div className="form-group">
                                    <label>Old Password</label>
                                    <div className="postion_reletitt">
                                      <input
                                        type={inputType}
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        maxLength={40}
                                        placeholder="Enter old password"
                                        name="password"
                                        onChange={handleChange}
                                      />
                                      <div className="input-group-addon">
                                        {passHide == false ? (
                                          <i
                                            className="bi bi-eye-fill"
                                            onClick={() => passwordHide("hide")}
                                          ></i>
                                        ) : (
                                          <i
                                            className="bi bi-eye-slash-fill"
                                            onClick={() => passwordHide("show")}
                                          ></i>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    {passwordValidateref.current == true ? (
                                      <p className="text-danger">
                                        {" "}
                                        {validationnErr.password}{" "}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <div className="form-group">
                                    <label>New Password</label>
                                    <div className="postion_reletitt">
                                      <input
                                        type={inputType1}
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        maxLength={40}
                                        placeholder="Enter new password"
                                        name="new_password"
                                        onChange={handleChange}
                                      />
                                      <div className="input-group-addon">
                                        {passHide1 == false ? (
                                          <i
                                            className="bi bi-eye-fill"
                                            onClick={() =>
                                              passwordHide1("hide")
                                            }
                                          ></i>
                                        ) : (
                                          <i
                                            className="bi bi-eye-slash-fill"
                                            onClick={() =>
                                              passwordHide1("show")
                                            }
                                          ></i>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    {new_passwordValidateref.current == true ? (
                                      <p className="text-danger">
                                        {" "}
                                        {validationnErr.new_password}{" "}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <div className="form-group">
                                    <label>Confirm Password</label>
                                    <div className="postion_reletitt">
                                      <input
                                        type={inputType2}
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        maxLength={40}
                                        placeholder="Confirm password"
                                        name="confirm_password"
                                        onChange={handleChange}
                                      />
                                      <div className="input-group-addon">
                                        {passHide2 == false ? (
                                          <i
                                            className="bi bi-eye-fill"
                                            onClick={() =>
                                              passwordHide2("hide")
                                            }
                                          ></i>
                                        ) : (
                                          <i
                                            className="bi bi-eye-slash-fill"
                                            onClick={() =>
                                              passwordHide2("show")
                                            }
                                          ></i>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    {confirm_passwordValidateref.current ==
                                    true ? (
                                      <p className="text-danger">
                                        {" "}
                                        {validationnErr.confirm_password}{" "}
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
                                    onClick={formSubmit}
                                  >
                                    Save
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
                        </div>
                      </div>
                    </div>
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
