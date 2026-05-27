import React, { useState, useEffect } from "react";
// import Header from "./Newcomponent/Header";
import Reset_header from "./Newcomponent/Reset_header";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiService from "../core/service/detail";
import { postMethod } from "../core/service/common.api";
import Footernew from "./footer_buttom";
import { Grid, Paper, Container } from "@mui/material";
import { setAuthorization } from "../core/service/axios";
import { Button } from "semantic-ui-react";
import useStateref from "react-usestateref";

function Home() {
  const options = ["one", "two", "three"];
  useEffect(() => {
    var token = localStorage.getItem("user_token");
    if (token) {
      navigate("/login");
    }
  }, []);

  const navigate = useNavigate();
  const [step, setstep] = useState("one");

  //RESET PASS FUNCTIONALITY================================================
  const initialFormValue = {
    email: "",
  };

  const [emailValidate, setemailValidate, emailValidateref] =
    useStateref(false);
  const [validationnErr, setvalidationnErr] = useState("");
  const [formValue, setFormValue] = useState(initialFormValue);
  const [buttonLoader, setbuttonLoader] = useState(false);

  const { email } = formValue;

  const handleChange = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formData = { ...formValue, ...{ [name]: value } };
    setFormValue(formData);
    validate(formData);
  };

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

    setvalidationnErr(errors);
    return errors;
  };

  const formSubmit = async () => {
    validate(formValue);
    if (emailValidateref.current == false) {
      var data = {
        apiUrl: apiService.reset_pwd_otp,
        payload: formValue,
      };
      setbuttonLoader(true);
      var resp = await postMethod(data);
      setbuttonLoader(false);
      if (resp.status == true) {
        toast.success(resp.message);
        setstep("two");
      } else {
        toast.error(resp.message);
      }
    }
  };

  const resendMail = async () => {
    var data = {
      apiUrl: apiService.reset_pwd_otp,
      payload: formValue,
    };
    setbuttonLoader(true);
    var resp = await postMethod(data);
    setbuttonLoader(false);
    if (resp.status == true) {
      toast.success(resp.message);
      setstep("two");
    } else {
      toast.error(resp.message);
    }
  };
  //ACTIVATION CODE PART===================================================
  const initialCodeFormValue = {
    otp_code: "",
  };

  const [codeValidate, setcodeValidate] = useState(false);
  const [codevalidationnErr, setcodevalidationnErr] = useState("");
  const [codeformValue, setcodeFormValue] = useState(initialCodeFormValue);

  const [otp_code, setotp_code] = useState("");

  const handleChangeCode = async (value) => {
    if (value.toString().length > 4) {
    } else {
      setotp_code(value);
    }
  };

  const validateCode = async (values) => {
    const errors = {};
    if (values.otp_code==""||values.otp_code==null||values.otp_code==undefined) {
      errors.otp_code = "Activation Code  is a required field";
      setcodeValidate(true);
    } else {
      setcodeValidate(false);
    }

    setcodevalidationnErr(errors);
    return errors;
  };

  const codeSubmit = async () => {
    validateCode(codeformValue);
    if (otp_code != "") {
      var obj = {
        otp_code: { otp_code: otp_code },
        email: formValue.email,
      };
      var data = {
        apiUrl: apiService.verifyForgotcode,
        payload: obj,
      };
      setbuttonLoader(true);
      var resp = await postMethod(data);
      setbuttonLoader(false);
      if (resp.status == true) {
        toast.success(resp.Message);
        formValue.otp_code = "";
        setstep("three");
      } else {
        toast.error(resp.Message);
      }
    }
  };

  //SETPASSWORDPART=============================================

  const [inputType, setinputType] = useState("password");
  const [level1, setlevel1, level1ref] = useStateref("");
  const [level2, setlevel2, level2ref] = useStateref("");
  const [level3, setlevel3, level3ref] = useStateref("");
  const [password, setpassword, passwordref] = useStateref("");
  const [passHide, setPasshide] = useState(false);

  const handlePassChange = async (data) => {
    if (data != "") {
      if (data.match(/[A-Z]/g)) {
        setlevel1("check");
      } else {
        setlevel1("");
      }
      if (data.match(/[0-9]/g)) {
        setlevel2("check");
      } else {
        setlevel2("");
      }
      if (data.length >= 8) {
        setlevel3("check");
        setpassword(data);
      } else {
        setlevel3("");
      }
    } else {
      setlevel3("");
      setlevel2("");
      setlevel1("");
    }
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

  const passwordSubmit = async () => {
    if (password != "") {
      var obj = {
        password: password,
        email: formValue.email,
      };
      var data = {
        apiUrl: apiService.resetPassword,
        payload: obj,
      };
      setbuttonLoader(true);
      var resp = await postMethod(data);
      setbuttonLoader(false);
      if (resp.status == true) {
        toast.success(resp.Message);
        navigate("/login");
      } else {
        toast.error(resp.Message);
      }
    }
  };

  const backSubmit = () => {
    navigate("/login");
  };

  return (
    <div className="">
      <main className="main-content tradepage-bg  bg-cover onlywhitee new_login_bb">
        <Reset_header />
        {step == "one" ? (
          <Container maxWidth="xl">
            <Grid container spacing={2} justifyContent={"center"}>
              {/* Item for xs (extra small) screens */}
              <Grid item xs={12} sm={12} md={8} lg={6} xl={5}>
                <div className="card_logoki pading_cardd">
                  <div className="step-1">
                    <div className="form_content">
                      <Button onClick={backSubmit} className="back_butn">
                        <i onClick={backSubmit} className="ri-arrow-left-line"></i>{" "}
                        Back
                      </Button>
                      <h1 className="mb-2">Reset Password</h1>
                      <p className="text_newsd mb-4">
                        Please enter the email address associated with your
                        Taikonz account below. Resetting a forgotten password
                        will logout other devices and will result in a 72-hour
                        hold on cryptocurrency withdrawals.
                      </p>
                    </div>
                    <div className="form_login_section p-0">
                      <div className="form register_login p-0">
                        <form className="form_pading_s">
                          <div className="form-group">
                            <label>Email address</label>
                            <input
                              type="email"
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="Enter your email Id"
                              name="email"
                              maxLength={50}
                              value={email}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="red_alert">
                            {emailValidateref.current == true ? (
                              <p className="text-danger">
                                {" "}
                                {validationnErr.email}{" "}
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
                            Submit
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
        ) : step == "two" ? (
          <Container maxWidth="xl">
            <Grid container spacing={2} justifyContent={"center"}>
              {/* Item for xs (extra small) screens */}
              <Grid item xs={12} sm={12} md={8} lg={6} xl={5}>
                <div className="card_logoki pading_cardd">
                  <div className="step-1">
                    <div className="form_content">
                      <h1 className="mb-2">Enter Code</h1>
                      <p className="text_newsd mb-4">
                        An email has been sent with instructions to reset your
                        password. Please enter the authorization code in the
                        message we sent to the email address you provided.
                      </p>
                    </div>
                    <div className="form_login_section p-0">
                      <div className="form register_login p-0">
                        <form className="form_pading_s">
                          <div className="form-group">
                            <label>Authorization Code</label>
                            <input
                              type="Number"
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="Enter code"
                              name="otp_code"
                              value={otp_code}
                              onChange={(e) => handleChangeCode(e.target.value)}
                            />
                            <div className="red_alert">
                              {codeValidate == true ? (
                                <p className="text-danger">
                                  {" "}
                                  {codevalidationnErr.otp_code}{" "}
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
                            onClick={codeSubmit}
                          >
                            Submit
                          </button>
                        ) : (
                          <button type="button" className="btn btn-primary w-100">
                            loading...
                          </button>
                        )}
                      </div>
                      <div className="custem_check">
                        <div>
                          <Link onClick={resendMail}>
                            <a className="forget text-left">
                              <span className="color">
                                Didn't receive an email?
                              </span>
                              Click here to resend the email
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
            {/* Your other components and content */}
          </Container>
        ) : (
          <Container maxWidth="xl">
            <Grid container spacing={2} justifyContent={"center"}>
              {/* Item for xs (extra small) screens */}
              <Grid item xs={12} sm={12} md={8} lg={6} xl={5}>
                <div className="card_logoki pading_cardd">
                  <div className="step-1">
                    <div className="form_content">
                      <h1 className="">Set Password</h1>
                    </div>
                    <div className="form_login_section p-0">
                      <div className="form register_login p-0">
                        <form className="form_pading_s">
                          <div className="form-group">
                            <label>Password</label>
                            <div className="postion_reletitt">
                              <input
                                type={inputType}
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Password"
                                name="password"
                                onChange={(e) =>
                                  handlePassChange(e.target.value)
                                }
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
                            </div>
                            <div className="agrreement check">
                              <p className={level3ref.current}>
                                <i className="ri-check-line mr-2"></i>At least 8
                                characters
                                <br />
                              </p>
                              <p className={level2ref.current}>
                                <i className="ri-check-line mr-2"></i>At least 1
                                number
                                <br />
                              </p>
                              <p className={level1ref.current}>
                                <i className="ri-check-line mr-2"></i>At least 1
                                upper case letter
                                <br />
                              </p>
                            </div>
                          </div>
                        </form>

                        {buttonLoader == false ? (
                          <button
                            type="button"
                            className="btn btn-primary w-100"
                            onClick={passwordSubmit}
                          >
                            Submit
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
        )}
      </main>
    </div>
  );
}

export default Home;
