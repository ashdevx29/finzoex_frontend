import React, { useState, useEffect } from "react";
import Header from "./Newcomponent/Header";
import Arrow from "../img/ArrowRight.svg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiService from "../core/service/detail";
import { postMethod } from "../core/service/common.api";
import { setAuthToken, getAuthToken } from "../core/lib/localStorage";
import Footernew from "./footer_buttom";
import { Grid, Paper, Container } from "@mui/material";
import { setAuthorization } from "../core/service/axios";
import { Button } from "semantic-ui-react";
import { Dropdown } from "semantic-ui-react";
import Country from "../Component/Newcomponent/Countrymenu";
function Home() {
  const options = ["one", "two", "three"];

  const initialFormValue = {
    email: "",
    password: "",
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

  const handleChange = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formData = { ...formValue, ...{ [name]: value } };
    setFormValue(formData);
    validate(formData);
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

  const validate = async (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email is a required field";
      setemailValidate(true);
    }

    if (!values.password) {
      errors.password = "Password is a required field";
      setpasswordValidate(true);
    }

    setvalidationnErr(errors);
    return errors;
  };

  const formSubmit = async () => {
    validate(formValue);
    if (formValue.email != "" && formValue.password != "") {
      var data = {
        apiUrl: apiService.signin,
        payload: formValue,
      };
      setbuttonLoader(true);
      var resp = await postMethod(data);
      setbuttonLoader(false);
      if (resp?.tfa === 1) {
        navigate("/verify-tfa", {
          state: {
            socketToken: resp?.socketToken,
          },
        });
      } else {
        if (resp.status) {
          toast(resp.Message);
          console.log(resp, "[--=-=resp");
          await setAuthorization(resp.token);
          localStorage.setItem("user_token", resp.token);
          localStorage.setItem("tfa_status", resp.tfa);
          localStorage.setItem("socket_token", resp.socketToken);
          localStorage.setItem("jwNkiKmttscotlox", resp.jwNkiKmttscotlox);
          navigate("/profile");
        } else {
          toast(resp.Message);
        }
      }
    }
  };
  const countryOptions = [
    { key: "af", value: "af", flag: "af", text: "Afghanistan" },
    { key: "ax", value: "ax", flag: "ax", text: "Åland Islands" },
    { key: "al", value: "al", flag: "al", text: "Albania" },
    { key: "dz", value: "dz", flag: "dz", text: "Algeria" },
    { key: "as", value: "as", flag: "as", text: "American Samoa" },
    { key: "ad", value: "ad", flag: "ad", text: "Andorra" },
    { key: "ao", value: "ao", flag: "ao", text: "Angola" },
    { key: "ai", value: "ai", flag: "ai", text: "Anguilla" },
    { key: "aq", value: "aq", flag: "aq", text: "Antarctica" },
    { key: "ag", value: "ag", flag: "ag", text: "Antigua & Barbuda" },
    { key: "ar", value: "ar", flag: "ar", text: "Argentina" },
    { key: "am", value: "am", flag: "am", text: "Armenia" },
    { key: "aw", value: "aw", flag: "aw", text: "Aruba" },
    { key: "au", value: "au", flag: "au", text: "Australia" },
    { key: "at", value: "at", flag: "at", text: "Austria" },
    { key: "az", value: "az", flag: "az", text: "Azerbaijan" },
    { key: "bs", value: "bs", flag: "bs", text: "Bahamas" },
    { key: "bh", value: "bh", flag: "bh", text: "Bahrain" },
    { key: "bd", value: "bd", flag: "bd", text: "Bangladesh" },
    { key: "bb", value: "bb", flag: "bb", text: "Barbados" },
    { key: "by", value: "by", flag: "by", text: "Belarus" },
    { key: "be", value: "be", flag: "be", text: "Belgium" },
    { key: "bz", value: "bz", flag: "bz", text: "Belize" },
    { key: "bj", value: "bj", flag: "bj", text: "Benin" },
    { key: "bm", value: "bm", flag: "bm", text: "Bermuda" },
    // ... (other countries)
    { key: "ye", value: "ye", flag: "ye", text: "Yemen" },
    { key: "zm", value: "zm", flag: "zm", text: "Zambia" },
    { key: "zw", value: "zw", flag: "zw", text: "Zimbabwe" },
  ];

  return (
    <div className="">
      <main className="main-content tradepage-bg  bg-cover onlywhitee new_login_bb">
        <Header />
        <Container maxWidth="xl">
          <Grid container spacing={2} justifyContent={"center"}>
            {/* Item for xs (extra small) screens */}
            <Grid item xs={12} sm={12} md={8} lg={6} xl={5}>
              <div className="card_logoki pading_cardd">
                <div className="step-1 d-none">
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
                            options={countryOptions}
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
                        <p className="form_lable_botton mt-3 mb-0 right-margjs ">
                          Complete the following steps to verify your account.
                        </p>
                        <div className="agrreement check mt-2">
                          <p>
                            <i className="ri-file-text-line mr-2"></i>Personal
                            information
                            <br />
                          </p>
                          <p>
                            <i className="ri-news-line mr-2"></i>Government issued
                            ID
                            <br />
                          </p>
                        </div>
                        {/* <div className="form-group">
                          
                               <div className="postion_reletitt">
                                 <input
                                  type={inputType}
                                  className="form-control"
                                  id="exampleInputPassword1"
                                  placeholder="Password"
                                  name="password"
                                  value={password}
                                  onChange={handleChange}
                                 />
                                 <div className="input-group-addon"  >
                                  {
                                    passHide == false ?
                                      <i className="bi bi-eye-slash-fill" onClick={() => passwordHide('hide')} ></i>
                                      :
                                      <i className="bi bi-eye-fill" onClick={() => passwordHide('show')} ></i>

                                  }
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
                              </div> */}

                        {/* <div className="custem_check">
                           
                                <div>
                                  <Link to="/forgot">
                                    <a className="forget gradion_text">
                                      Forgot Password?
                                    </a>
                                  </Link>
                                </div>
                              </div> */}

                        {/* <p className="bottom_linnk">
                                Don’t have an Account?
                                <Link to="/register">
                                  <a className="gradion_text">SIGN UP</a>
                                </Link>
                              </p> */}
                      </form>
                      {buttonLoader == false ? (
                        <button
                          type="button"
                          className="btn btn-primary w-100"
                          onClick={formSubmit}
                        >
                          Continue
                        </button>
                      ) : (
                        <button type="button" className="btn btn-primary w-100">
                          loading...
                        </button>
                      )}
                      <Link to="" className="cancel_butn">
                        Save and Exit
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="step-2 d-none">
                  <div className="form_content">
                    <Button className="back_butn">
                      <i className="ri-arrow-left-line"></i> Back
                    </Button>
                    <h1 className="mb-2">Personal Information</h1>
                    <p className="form_lable_botton">
                      Please provide the following information as shown on your
                      passport or ID card.
                    </p>
                  </div>
                  <div className="form_login_section p-0">
                    <div className="form register_login p-0">
                      <form className="form_pading_s">
                        <div className="form-group">
                          <label>Nationality</label>
                          <Dropdown
                            placeholder="Select your nationality"
                            fluid
                            selection
                            className="text_memu"
                            options={countryOptions}
                          />
                        </div>
                        <div className="form-group">
                          <label>Full Name</label>
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter your full name"
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
                          <label>Date of Birth</label>
                          <div className="input_flex_propery">
                            <input
                              type="number"
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="DD"
                              name="number"
                              value={email}
                            />
                            <input
                              type="number"
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="MM"
                              name="number"
                              value={email}
                            />
                            <input
                              type="number"
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="YY"
                              name="number"
                              value={email}
                            />
                          </div>
                        </div>
                      </form>

                      {buttonLoader == false ? (
                        <button
                          type="button"
                          className="btn btn-primary w-100"
                          onClick={formSubmit}
                        >
                          Submit
                        </button>
                      ) : (
                        <button type="button" className="btn btn-primary w-100">
                          loading...
                        </button>
                      )}
                      <Link to="" className="cancel_butn">
                        Save and Exit
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="step-3 d-none">
                  <div className="form_content">
                    <Button className="back_butn">
                      <i className="ri-arrow-left-line"></i> Back
                    </Button>
                    <h1 className="mb-2">Home Address</h1>
                    <p className="form_lable_botton">
                      Please provide the following information as shown on your
                      passport or ID card.
                    </p>
                  </div>
                  <div className="form_login_section p-0">
                    <div className="form register_login p-0">
                      <form className="form_pading_s">
                        <div className="form-group">
                          <label>Home address</label>
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter your address"
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
                          <label>Unit or apartment number (optional)</label>
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter unit or apartment number"
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
                          <label>City</label>
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter city, town, or subdivision"
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
                          <label>State</label>
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter state"
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
                          <label>Pin code</label>
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Pin code"
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
                      </form>

                      {buttonLoader == false ? (
                        <button
                          type="button"
                          className="btn btn-primary w-100"
                          onClick={formSubmit}
                        >
                          Continue
                        </button>
                      ) : (
                        <button type="button" className="btn btn-primary w-100">
                          loading...
                        </button>
                      )}
                      <Link to="" className="cancel_butn">
                        Save and Exit
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="step-4  d-none">
                  <div className="form_content">
                    <Button className="back_butn">
                      <i className="ri-arrow-left-line"></i> Back
                    </Button>
                    <h1 className="mb-2">Add Pan Card Details</h1>
                  </div>
                  <div className="form_login_section p-0">
                    <div className="form register_login p-0">
                      <form className="form_pading_s">
                        <div className="form-group">
                          <label>Pan Card Number</label>
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter Pan Card Number"
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
                      </form>

                      {buttonLoader == false ? (
                        <button
                          type="button"
                          className="btn btn-primary w-100"
                          onClick={formSubmit}
                        >
                          Submit
                        </button>
                      ) : (
                        <button type="button" className="btn btn-primary w-100">
                          loading...
                        </button>
                      )}
                      <Link to="" className="cancel_butn">
                        Save and Exit
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="step-5 d-none">
                  <div className="form_content">
                    <Button className="back_butn">
                      <i className="ri-arrow-left-line"></i> Back
                    </Button>
                    <h1 className="mb-2">Identity Verification</h1>
                    <p className="form_lable_botton">
                      Follow the steps below for verifying your identity. This
                      is required for security purposes.
                    </p>
                  </div>
                  <div className="form_login_section p-0">
                    <div className="form register_login p-0">
                      <form className="form_pading_s">
                        <h2 className="text_inner_card">
                          Which type of photo ID would you like to provide?
                        </h2>
                        <div className="form-group">
                          <label>Accepted documents</label>
                          <a href="" className="accepte mb-2">
                            <div className="grow_1">
                              <p>Passport</p>
                              <span>Photo page</span>
                            </div>
                            <div className="icon">
                              <i className="ri-arrow-right-s-line"></i>
                            </div>
                          </a>
                          <a href="" className="accepte mb-2">
                            <div className="grow_1">
                              <p>Driver’s license</p>
                              <span>Front and back</span>
                            </div>
                            <div className="icon">
                              <i className="ri-arrow-right-s-line"></i>
                            </div>
                          </a>

                          <a href="" className="accepte mb-2">
                            <div className="grow_1">
                              <p>National ID</p>
                              <span>Front and back</span>
                            </div>
                            <div className="icon">
                              <i className="ri-arrow-right-s-line"></i>
                            </div>
                          </a>
                        </div>
                      </form>

                      {buttonLoader == false ? (
                        <button
                          type="button"
                          className="btn btn-primary w-100"
                          onClick={formSubmit}
                        >
                          Submit
                        </button>
                      ) : (
                        <button type="button" className="btn btn-primary w-100">
                          loading...
                        </button>
                      )}
                      <Link to="" className="cancel_butn">
                        Save and Exit
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="step-6 d-none">
                  <div className="form_content">
                    <Button className="back_butn">
                      <i className="ri-arrow-left-line"></i> Back
                    </Button>
                    <h1 className="mb-2">Identity Verification</h1>
                    <p className="form_lable_botton">
                      Take pictures of both sides of your government issued ID
                      card
                    </p>
                  </div>
                  <div className="form_login_section p-0">
                    <div className="form register_login p-0">
                      <ul className="option_instruction image-marker">
                        <li>Upload a complete image if your ID document.</li>
                        <li>
                          Ensure all details are readable in the image you
                          upload.
                        </li>
                        <li>
                          Ensure the document is the original and has not
                          expired.
                        </li>
                        <li>
                          Place document against a solid-coloured background.
                        </li>
                      </ul>

                      {buttonLoader == false ? (
                        <button
                          type="button"
                          className="btn btn-primary w-100"
                          onClick={formSubmit}
                        >
                          Continue
                        </button>
                      ) : (
                        <button type="button" className="btn btn-primary w-100">
                          loading...
                        </button>
                      )}
                      <Link to="" className="cancel_butn">
                        Save and Exit
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="step-7 d-none ">
                  <div className="form_content">
                    <Button className="back_butn">
                      <i className="ri-arrow-left-line"></i> Back
                    </Button>
                    <h1 className="mb-2">Scan With Your Phone</h1>
                    <p className="form_lable_botton">
                      Scan the QR code with your mobile phone, and finish your
                      verification on your mobile device
                    </p>
                  </div>
                  <div className="form_login_section">
                    <div className="form register_login p-0 w-100">
                      <div className="qr_mage d-flex justify-content-center">
                        <img
                          src={new URL("../img/New_images/qr.png", import.meta.url).href}
                          className="img-fluid "
                        />
                      </div>
                      {buttonLoader == false ? (
                        <button
                          type="button"
                          className="btn btn-primary w-100"
                          onClick={formSubmit}
                        >
                          Continue
                        </button>
                      ) : (
                        <button type="button" className="btn btn-primary w-100">
                          loading...
                        </button>
                      )}
                      <Link to="" className="cancel_butn">
                        Save and Exit
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="step-8 d-none">
                  <div className="form_content">
                    <Button className="back_butn">
                      <i className="ri-arrow-left-line"></i> Back
                    </Button>
                    <h1 className="mb-2">Connected to Your Phone</h1>
                    <p className="form_lable_botton">
                      Once you have finished on your mobile, we’ll take you to
                      the next step.
                    </p>
                  </div>
                  <hr className="hr_line" />
                  <div className="form_login_section p-0">
                    <div className="form register_login p-0">
                      <ul className="option_instruction image-marker">
                        <li>
                          Please keep this window open to view the real time
                          verification result.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="step-9">
                  <div className="form_content Proprer_center">
                    <img
                      src={new URL("../img/New_images/pennding.png", import.meta.url).href}
                      className="img-fluid "
                    />
                    <h1 className="mb-1">Under Review!</h1>
                    <p className="form_lable_botton">
                      You will receive an email once review is completed.
                    </p>
                  </div>
                  <hr className="hr_line" />

                  <div className="form_login_section p-0">
                    <div className="form register_login p-0">
                      <ul className="option_instruction image-marker">
                        <li>
                          Please keep this window open to view the real time
                          verification result.
                        </li>
                      </ul>
                      {buttonLoader == false ? (
                        <button
                          type="button"
                          className="btn btn-primary w-100"
                          onClick={formSubmit}
                        >
                          Go to Home
                        </button>
                      ) : (
                        <button type="button" className="btn btn-primary w-100">
                          loading...
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
          {/* Your other components and content */}
        </Container>
      </main>
    </div>
  );
}

export default Home;
