import React, { useEffect } from "react";

import { Button } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import Count from "./Countdown";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Header from "./Header";
import Footer from "./Footer";
import Arrow from "../img/ArrowRight.svg";
import glogo from "../img/google_logo.svg";
import useState from "react-usestateref";

import { GOOGLE } from "../core/config/";
import apiService from "../core/service/detail";
import { postMethod } from "../core/service/common.api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { setAuthToken, getAuthToken } from "../core/lib/localStorage";
import Footernew from "./footer_buttom";
import ReCAPTCHA from "react-google-recaptcha";

function Home() {
  const options = ["one", "two", "three"];

  const initialFormValue = {
    email: "",
    password: "",
    confirmPassword: "",
    isTerms: "",
    firstName: "",
    mobile: "",
    lastName: "",
    RefferedBy: "",
  };

  const [validationnErr, setvalidationnErr] = useState("");
  const [formValue, setFormValue] = useState(initialFormValue);
  const [emailValidate, setemailValidate, setemailValidateref] =
    useState(false);
  const [passwordValidate, setpasswordValidate] = useState(false);
  const [
    confirmPasswordValidate,
    setconfirmPasswordValidate,
    setconfirmPasswordValidateref,
  ] = useState("");
  const [passconfNotmatch, setpassconfNotmatch, setpassconfNotmatchref] =
    useState("");
  const [disableButton, setdisableButton] = useState(false);
  const [Terms, setTerms] = useState(false);
  const [termsValidation, setTermsValidation] = useState(false);
  const [buttonLoader, setbuttonLoader] = useState(false);
  const [firstNamevalidation, setfirstNamevalidation] = useState(false);
  const [lasttNamevalidation, setlasttNamevalidation] = useState(false);
  const [mobilevalidation, setmobilevalidation] = useState(false);
  const [passHide, setPasshide] = useState(false);
  const [inputType, setinputType] = useState("password");
  const [passHidconf, setPasshideconf] = useState(false);
  const [inputTypeconf, setinputTypeconf] = useState("password");
  const [captcha,setcaptcha] = useState("")
  const [RefferedBy, setRefferedBy] = useState("");

  const navigate = useNavigate();

  const {
    email,
    isTerms,
    password,
    confirmPassword,
    firstName,
    mobile,
    lastName,
  } = formValue;

  const handleChange = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formData = { ...formValue, ...{ [name]: value } };
    setFormValue(formData);
    // validate(formData);
  };

  const formSubmit = async (payload) => {
    // return
    if(captcha){

    validate(formValue);
    if (RefferedBy == "" || RefferedBy == undefined) {
      // console.log("Error");
      formValue["ReferelBy"] = "";
    } else {
      formValue["ReferelBy"] = RefferedBy;
      // console.log(RefferedBy, "success");
    }
    if (
      setemailValidateref.current == false &&
      setconfirmPasswordValidateref.current == false &&
      formValue.firstName != "" &&
      formValue.mobile != "" &&
      formValue.lastName != ""
    ) {
      // return false
      var data = {
        apiUrl: apiService.signup,
        payload: formValue,
      };
      setbuttonLoader(true);
      var resp = await postMethod(data);
      localStorage.setItem("useremail", resp.email);
      setbuttonLoader(false);
      if (resp.status) {
        toast(resp.Message);
        navigate("/otp");
      } else {
        toast(resp.Message);
      }
    } else {
      toast("all field requird");
    }
  }else{
    toast("Recaptcha not verified")
  }
  };

  const onChange = (value) => {
    var recaptcha = value
    if(recaptcha){
      setcaptcha(recaptcha)
    }

  }

  useEffect(() => {
    var currURL = window.location.href;
    var refferalId = currURL.split("invite/")[1];
    setRefferedBy(refferalId);
    // let user_token = await getAuthToken();
    // if (user_token) {
    //   navigate("/postad");
    // }
  }, []);

  const validate = async (values) => {
    const errors = {};
    if (values.email == "") {
      errors.email = "Email is a required field";
      setemailValidate(true);
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
      setemailValidate(true);
    } else {
      setemailValidate(false);
    }

    if (values.password == "") {
      errors.password = "Password is a required field";
      setpasswordValidate(true);
    }

    if (values.confirmPassword == "") {
      errors.confirmPassword = "Confirm password is a required field";
      setconfirmPasswordValidate(true);
    } else if (values.confirmPassword != values.password) {
      setconfirmPasswordValidate(true);
      errors.confirmPassword = "Confirm password and paswords does not same";
    } else {
      setconfirmPasswordValidate(false);
    }

    if (!Terms) {
      errors.terms = "Terms is a required field";
      setTermsValidation(true);
    }
    if (!values.firstName) {
      errors.firstName = "First Name is a required field";
      setfirstNamevalidation(true);
    }
    if (!values.lastName) {
      errors.lastName = "Last Name is a required field";
      setlasttNamevalidation(true);
    }
    if (!values.mobile) {
      errors.mobile = "mobile is a required field";
      setmobilevalidation(true);
    }

    setvalidationnErr(errors);
    return errors;
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
  const passwordHideconf = (data) => {
    if (data == "hide") {
      setPasshideconf(true);
      setinputTypeconf("text");
    } else {
      setPasshideconf(false);
      setinputTypeconf("password");
    }
  };

  return (
    <div className="">
      <main className="main-content tradepage-bg  bg-cover onlywhitee">
        <Header />
        <div className="container">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 padin_zero">
            <div className="header_pading">
              <div className="row justify-center">
                <div className="col-lg-5">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="card_logoki pading_cardd">
                        <div className="form_content">
                          <h1 className="gradion_text">Welcome to FinzoX</h1>
                          <p>
                            Let’s start by submitting your registration details.
                          </p>
                        </div>
                        <div className="form_login_section p-0">
                          <div className="form register_login p-0">
                            <form className="form_pading_s">
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  placeholder="First Name"
                                  name="firstName"
                                  value={firstName}
                                  onChange={handleChange}
                                />

                                <div>
                                  {firstNamevalidation == true ? (
                                    <p className="text-danger">
                                      {" "}
                                      {validationnErr.firstName}{" "}
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleInputPassword1"
                                  placeholder="Last Name"
                                  name="lastName"
                                  value={lastName}
                                  onChange={handleChange}
                                />
                                <div>
                                  {lasttNamevalidation == true ? (
                                    <p className="text-danger">
                                      {" "}
                                      {validationnErr.lastName}{" "}
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div className="form-group">
                                <input
                                  type="email"
                                  className="form-control"
                                  id="exampleInputPassword1"
                                  placeholder="Email ID"
                                  name="email"
                                  value={email}
                                  onChange={handleChange}
                                />
                                <div>
                                  {emailValidate == true ? (
                                    <p className="text-danger">
                                      {" "}
                                      {validationnErr.email}{" "}
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div className="form-group">
                                <input
                                  type="number"
                                  className="form-control"
                                  id="exampleInputPassword1"
                                  placeholder="Mobile Number"
                                  name="mobile"
                                  value={mobile}
                                  onChange={handleChange}
                                />

                                <div>
                                  {mobilevalidation == true ? (
                                    <p className="text-danger">
                                      {" "}
                                      {validationnErr.mobile}{" "}
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div className="form-group postion_reletitt">
                                <input
                                  type={inputType}
                                  className="form-control"
                                  id="exampleInputPassword1"
                                  placeholder="Password"
                                  className="form-control"
                                  name="password"
                                  value={password}
                                  onChange={handleChange}
                                />

                                <div className="input-group-addon">
                                  {passHide == false ? (
                                    <i
                                      className="bi bi-eye-slash-fill"
                                      onClick={() => passwordHide("hide")}
                                    ></i>
                                  ) : (
                                    <i
                                      className="bi bi-eye-fill"
                                      onClick={() => passwordHide("show")}
                                    ></i>
                                  )}
                                </div>
                                <div>
                                  {passwordValidate == true ? (
                                    <p className="text-danger">
                                      {" "}
                                      {validationnErr.password}{" "}
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              
                              <div className="form-group postion_reletitt">
                                <input
                                  type={inputTypeconf}
                                  className="form-control"
                                  id="exampleInputPassword1"
                                  placeholder="Confirm Password"
                                  name="confirmPassword"
                                  value={confirmPassword}
                                  onChange={handleChange}
                                />
                                <div className="input-group-addon">
                                  {passHidconf == false ? (
                                    <i
                                      className="bi bi-eye-slash-fill"
                                      onClick={() => passwordHideconf("hide")}
                                    ></i>
                                  ) : (
                                    <i
                                      className="bi bi-eye-fill"
                                      onClick={() => passwordHideconf("show")}
                                    ></i>
                                  )}
                                </div>

                                <div>
                                  {confirmPasswordValidate == true ? (
                                    <p className="text-danger">
                                      {" "}
                                      {validationnErr.confirmPassword}{" "}
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>  

                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleInputPassword1"
                                  placeholder="RefferalID(Optional)"
                                  name="RefferedBy"
                                  value={RefferedBy}
                                  maxLength={25}
                                  onChange={handleChange}
                                />
                              </div>

                              <div className="form-group postion_reletitt">
                                <ReCAPTCHA
                                  sitekey="6LfpJDojAAAAAGcC-Hrv9Mdlk8kiId6Y0roP5MMP"
                                  onChange={onChange}
                                />
                              </div>
                              <div className="row">
                                <div className="col-lg-12">
                                  {buttonLoader == false ? (
                                    <button
                                      type="button"
                                      className="btn btn-primary w-100"
                                      onClick={formSubmit}
                                    >
                                      Sign up
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      className="btn btn-primary w-100"
                                    >
                                      loading...
                                    </button>
                                  )}

                                  <p className="bottom_linnk">
                                    Already have an Account?
                                    <Link to="/login">
                                      <a className="gradion_text">LOGIN</a>
                                    </Link>
                                  </p>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <form className="">
            <div className="row justify-center">
              <div className="col-lg-5">
                <div className="card_logoki pading_cardd">
                  <div className="form_content">
                    <h1 className="gradion_text">Login to Taikonz</h1>
                    <p>Enter your email and password to login</p>
                  </div>
                  <div className="form_login_section p-0">
                    <div className="form register_login p-0">
                      <div className="form_pading_s">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="First Name"
                            name="firstName"
                            value={firstName}
                            onChange={handleChange}
                          />

                          <div>
                            {firstNamevalidation == true ? (
                              <p className="text-danger">
                                {" "}
                                {validationnErr.firstName}{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Last Name"
                            name="lastName"
                            value={lastName}
                            onChange={handleChange}
                          />
                          <div>
                            {lasttNamevalidation == true ? (
                              <p className="text-danger">
                                {" "}
                                {validationnErr.lastName}{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Email ID"
                            name="email"
                            value={email}
                            onChange={handleChange}
                          />
                          <div>
                            {emailValidate == true ? (
                              <p className="text-danger">
                                {" "}
                                {validationnErr.email}{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="form-group">
                          <input
                            type="number"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Mobile Number"
                            name="mobile"
                            value={mobile}
                            onChange={handleChange}
                          />

                          <div>
                            {mobilevalidation == true ? (
                              <p className="text-danger">
                                {" "}
                                {validationnErr.mobile}{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={handleChange}
                          />

                          <div>
                            {passwordValidate == true ? (
                              <p className="text-danger">
                                {" "}
                                {validationnErr.password}{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange}
                          />

                          <div>
                            {confirmPasswordValidate == true ? (
                              <p className="text-danger">
                                {" "}
                                {validationnErr.confirmPassword}{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            {buttonLoader == false ? (
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={formSubmit}
                              >
                                Sign up
                              </button>
                            ) : (
                              <button type="button" className="btn btn-primary">
                                loading...
                              </button>
                            )}

                            <p className="bottom_linnk">
                              Already have an account?{" "}
                              <Link to="/login">
                                <a>Login to continue</a>{" "}
                              </Link>
                            </p>
                          </div>
                        </div>
                        <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                        className="form-control"
                        name = "password"  
                        value={password}
                        onChange={handleChange}
                      />

                      <div>
                      {
                         passwordValidate == true ?  ( <p className= "text-danger"> {validationnErr.password} </p> ):""
                     }
                      </div>

                    </div>
                      </div>
                      <div className="col-lg-6">
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Last Name"
                        name="lastName"
                        value={lastName}
                        onChange={handleChange}
                      />
                      <div>
                        {lasttNamevalidation == true ? (
                          <p className="text-danger">
                            {validationnErr.lastName}
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Select a Language </label>
                      <select>
                        <option>English</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Referral Code</label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Referral Code"
                      />
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={handleChange}
                      />

                      <div>
                        {passwordValidate == true ? (
                          <p className="text-danger">
                            {validationnErr.password}
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                      />

                      <div>
                        {confirmPasswordValidate == true ? (
                          <p className="text-danger">
                            {validationnErr.confirmPassword}
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>

                      <div className="col-lg-12">
                    {buttonLoader == false ? (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={formSubmit}
                      >
                        Sign up
                      </button>
                    ) : (
                      <button type="button" className="btn btn-primary">
                        loading...
                      </button>
                    )}

                    <p className="bottom_linnk">
                      Already have an account?{" "}
                      <Link to="/login">
                        <a>Login to continue</a>{" "}
                      </Link>
                    </p>
                  </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form> */}
          {/* <div className="col-lg-12">
            <div className="register_login p-0">
              <div></div>
            </div>
          </div> */}
        </div>
        <Footernew />
      </main>
    </div>
  );
}

export default Home;
