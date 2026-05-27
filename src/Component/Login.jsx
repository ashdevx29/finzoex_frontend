import React, {useState, useEffect} from "react";
// import Header from "./Newcomponent/Header";
import Reset_header from "./Newcomponent/Reset_header"
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import apiService from "../core/service/detail";
import {postMethod} from "../core/service/common.api";
import Footernew from "./footer_buttom";
import {Grid, Paper, Container} from "@mui/material";
import {setAuthorization} from "../core/service/axios";
import {Button} from "semantic-ui-react";
function Home() {
  const options = ["one", "two", "three"];
  const navigate = useNavigate();

  const initialFormValue = {
    email: "",
    password: "",
  };

  useEffect(() => {
    var token = localStorage.getItem("user_token");
    if (token) {
      navigate("/Userprofile");
    }
  }, []);

  const [emailValidate, setemailValidate] = useState(false);
  const [passwordValidate, setpasswordValidate] = useState(false);
  const [validationnErr, setvalidationnErr] = useState("");
  const [formValue, setFormValue] = useState(initialFormValue);
  const [buttonLoader, setbuttonLoader] = useState(false);
  const [passHide, setPasshide] = useState(false);
  const [inputType, setinputType] = useState("password");
  const {email, isTerms, password, confirmPassword} = formValue;

  const handleChange = async (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    let formData = {...formValue, ...{[name]: value}};
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
      errors.email = "Email is required field";
      setemailValidate(true);
    }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
      setemailValidate(true);
    } else {
      setemailValidate(false);
    }

    if (!values.password) {
      errors.password = "Password is required field";
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
      if (resp.status == true) {
        if (resp?.tfa === 1) {
          navigate("/Tfalogin", {
            state: {
              socketToken: resp?.socketToken,
            },
          });
        } else {
          if (resp.status) {
            toast.success(resp.Message);
            console.log(resp, "[--=-=resp");
            await setAuthorization(resp.token);
            localStorage.setItem("user_token", resp.token);
            localStorage.setItem("tfa_status", resp.tfa);
            localStorage.setItem("socket_token", resp.socketToken);
            // localStorage.setItem("jwNkiKmttscotlox", resp.jwNkiKmttscotlox);
            if(resp.kycstatus == 0)
            {
              navigate("/Kycverify");
            }
            else
            {
              navigate("/Dashboardpage");
            }
            
          } else {
            toast.error(resp.Message);
          }
        }
      } else {
        toast.error(resp.Message);
      }
    }
  };

  return (
    <div className="">
      <main className="main-content tradepage-bg  bg-cover onlywhitee new_login_bb">
      <Reset_header />
        <Container maxWidth="xl">
          <Grid container spacing={2} justifyContent={"center"}>
            {/* Item for xs (extra small) screens */}
            <Grid item xs={12} sm={12} md={8} lg={6} xl={5}>
              <div className="card_logoki pading_cardd">
                <div className="step-1">
                  <div className="form_content">
                    <h1 className="">Sign In</h1>
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
                        <div className="red_alert" >
                            {emailValidate == true ? (
                              <p className="text-danger">
                                {" "}
                                {validationnErr.email}{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        <div className="form-group">
                          <label>Password</label>
                          <div className="postion_reletitt">
                            <input
                              type={inputType}
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="Password"
                              name="password"
                              maxLength={40}
                              value={password}
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
                        <div className="red_alert">
                              {passwordValidate == true ? (
                                <p className="text-danger">
                                  {" "}
                                  {validationnErr.password}{" "}
                                </p>
                              ) : (
                                ""
                              )}
                            </div>
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
                          Sign In
                        </button>
                      ) : (
                        <button type="button" className="btn btn-primary w-100">
                          loading...
                        </button>
                      )}
                    </div>
                    <div className="custem_check">
                      <div>
                        <Link to="/Resetpass">
                          <a className="forget ">Forgot Password?</a>
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
      </main>
    </div>
  );
}

export default Home;
