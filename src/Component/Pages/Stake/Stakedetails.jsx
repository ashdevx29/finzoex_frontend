import React, {useState} from "react";
import Header from "../../Newcomponent/Header";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import apiService from "../../../core/service/detail";
import {postMethod} from "../../../core/service/common.api";
import Footernew from "../../footer_buttom";
import {Grid, Paper, Container} from "@mui/material";
import {setAuthorization} from "../../../core/service/axios";
import {Button} from "semantic-ui-react";
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
          toast.success(resp.Message);
          console.log(resp, "[--=-=resp");
          await setAuthorization(resp.token);
          localStorage.setItem("user_token", resp.token);
          localStorage.setItem("tfa_status", resp.tfa);
          localStorage.setItem("socket_token", resp.socketToken);
          localStorage.setItem("jwNkiKmttscotlox", resp.jwNkiKmttscotlox);
          navigate("/profile");
        } else {
          toast.error(resp.Message);
        }
      }
    }
  };

  return (
    <div className="">
      <main className="main-content tradepage-bg  bg-cover onlywhitee new_login_bb">
        <Header />
        <Container maxWidth="xl" className="container-lg">
          <Grid
            container
            spacing={2}
            justifyContent={"center"}
            marginTop={"20px"}
          >
            {/* Item for xs (extra small) screens */}
            <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
              <div className="card_logoki pading_cardd">
                <Grid
                  container
                  spacing={2}
                  justifyContent={"start"}
                  marginTop={"20px"}
                >
                  {/* Item for xs (extra small) screens */}
                  <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                    <div className="form_content">
                      <Button className="back_butn">
                        <i className="ri-arrow-left-line"></i> Back
                      </Button>
                      <h1 className="mb-4">Fill in the Details</h1>
                    </div>
                    <div className="step-5 ">
                      <div className="profile_content_image">
                        <div className="select_duration">
                          <ul className="nav nav-tabs">
                            <li className="active">
                              <a data-toggle="tab" href="#Fixed" className="30">
                                30 D
                              </a>
                            </li>
                            <li>
                              <a data-toggle="tab" href="#90">
                                90 D
                              </a>
                            </li>
                            <li>
                              <a data-toggle="tab" href="#150">
                                150 D
                              </a>
                            </li>{" "}
                            <li>
                              <a data-toggle="tab" href="#365">
                                365 D
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  justifyContent={"start"}
                  marginTop={"0px"}
                  className="pt-0"
                >
                  {/* Item for xs (extra small) screens */}
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    className="pt-0"
                  >
                    <Grid
                      container
                      spacing={2}
                      justifyContent={"start"}
                      marginTop={"0px"}
                      className="pt-0"
                    >
                      {/* Item for xs (extra small) screens */}
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={6}
                        xl={6}
                        className="pt-0"
                      >
                        <div className="APY">
                          <p>
                            APY<span>4.4%</span>
                          </p>
                        </div>
                        <div className="step-5 ">
                          <div className="form_login_section p-0 mt-4">
                            <div className="form register_login p-0">
                              <form className="form_pading_s">
                                <div className="form-group">
                                  <label>Stake Amount</label>
                                  <div className="postion_reletitt">
                                    <input
                                      type={inputType}
                                      className="form-control"
                                      id="exampleInputPassword1"
                                      placeholder="Stake Amount"
                                      name="password"
                                    />
                                    <div className="input-group-addon">
                                      <i className="font_normal">BTC</i>
                                    </div>

                                    <div className="line_border"></div>
                                  </div>
                                </div>
                                <div className="form-group flex_start_sae">
                                  <p className="preview">
                                    Available:<span>70.89 BTC</span>
                                  </p>
                                </div>
                                <div className="form-group flex_start_sae">
                                  <p className="preview">
                                    Minimum Stake: <span>0.00001 BTC</span>
                                  </p>
                                </div>
                                <div className="form-group flex_start_sae">
                                  <p className="preview">
                                    Maximum Stake: <span>5000.999 BTC</span>
                                  </p>
                                </div>
                                <div className="line_border"></div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={6}
                        xl={6}
                        className="pt-0"
                      >
                        <div className="step-5  mt-4 pt-1">
                          <div className="form_login_section p-0 mt-4">
                            <div className="form register_login p-0">
                              <form className="form_pading_s">
                                <div>
                                  <h4 className="h2_bottomn mb-3">Summary</h4>
                                </div>

                                <div className="form-group flex_start_sae">
                                  <p className="preview">
                                    Stake Date:<span>12/03/24</span>
                                  </p>
                                </div>
                                <div className="form-group flex_start_sae">
                                  <p className="preview">
                                    Interest End Date:<span>12/12/23</span>
                                  </p>
                                </div>
                                <div className="form-group flex_start_sae">
                                  <p className="preview">
                                    Stake Amount: <span>200</span>
                                  </p>
                                </div>
                                <div className="line_border mb-3"></div>

                                <div className="form-group flex_start_sae">
                                  <p className="preview">
                                    APY: <span className="color_sec">4.4%</span>
                                  </p>
                                </div>
                                <div className="form-group flex_start_sae">
                                  <p className="preview">
                                    Estimated Interest:{" "}
                                    <span className="color_sec">
                                      0.0000023 BTC
                                    </span>
                                  </p>
                                </div>
                                <div className="line_border"></div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
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
