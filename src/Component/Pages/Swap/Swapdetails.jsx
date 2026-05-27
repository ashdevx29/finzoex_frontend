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
import {Dropdown} from "semantic-ui-react";
function Home() {
  const friendOptions = [
    {
      key: "Jenny Hess",
      text: "Jenny Hess",
      value: "Jenny Hess",
      image: {
        avatar: true,
        src: "https://react.semantic-ui.com/images/avatar/small/jenny.jpg",
      },
    },
    {
      key: "Elliot Fu",
      text: "Elliot Fu",
      value: "Elliot Fu",
      image: {
        avatar: true,
        src: "https://react.semantic-ui.com/images/avatar/small/jenny.jpg",
      },
    },
    {
      key: "Stevie Feliciano",
      text: "Stevie Feliciano",
      value: "Stevie Feliciano",
      image: {
        avatar: true,
        src: "https://react.semantic-ui.com/images/avatar/small/jenny.jpg",
      },
    },
    {
      key: "Christian",
      text: "Christian",
      value: "Christian",
      image: {
        avatar: true,
        src: "https://react.semantic-ui.com/images/avatar/small/jenny.jpg",
      },
    },
    {
      key: "Matt",
      text: "Matt",
      value: "Matt",
      image: {
        avatar: true,
        src: "https://react.semantic-ui.com/images/avatar/small/jenny.jpg",
      },
    },
    {
      key: "Justen Kitsune",
      text: "Justen Kitsune",
      value: "Justen Kitsune",
      image: {
        avatar: true,
        src: "https://react.semantic-ui.com/images/avatar/small/jenny.jpg",
      },
    },
  ];

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
            <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
              <div className="card_logoki pading_cardd swap">
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
                        <div className="step-5 ">
                          <div className="form register_login  marhing_pading pl-0 paddinte_ledy_o">
                            <form className="form_pading_s">
                              <div className="form_content payment_form pl-0">
                                <h1 className="mb-3 Launch_pad_steps m-0 padding_botn padidnr_color">
                                  From
                                </h1>
                              </div>
                              <div className="account_setting">
                                <div className="form-group groow-1_widut ">
                                  <label>Amount</label>
                                  <Dropdown
                                    placeholder="Select Amount"
                                    fluid
                                    selection
                                    options={friendOptions}
                                    className="text_memu swapmenui"
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
                                <div className="form-group groow-1_widut ">
                                  <label>Payment Method</label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Enter details"
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
                              </div>
                              <div className="form-group flex_start_sae">
                                <p className="preview">
                                  Balance:<span>20 BTC</span>
                                </p>
                              </div>
                            </form>
                          </div>
                          <div className="text_icon_swap">
                            <div className="cicle_section">
                              <i className="ri-arrow-up-down-line"></i>
                            </div>
                          </div>
                          <div className="form register_login  marhing_pading pl-0 paddinte_ledy_o">
                            <form className="form_pading_s">
                              <div className="form_content payment_form pl-0">
                                <h1 className="mb-3 Launch_pad_steps m-0 padding_botn padidnr_color">
                                  To
                                </h1>
                              </div>
                              <div className="account_setting">
                                <div className="form-group groow-1_widut ">
                                  <label>Amount</label>
                                  <Dropdown
                                    placeholder="Select Amount"
                                    fluid
                                    selection
                                    options={friendOptions}
                                    className="text_memu swapmenui"
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
                                <div className="form-group groow-1_widut ">
                                  <label>Payment Method</label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Enter details"
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
                              </div>
                            </form>
                            <div className="aling_caseds">
                              <button
                                type="button"
                                className="btn btn-primary w-100 burdas_buttnd cancel_burdas"
                                onClick={() => formSubmit("step2")}
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary w-100"
                                onClick={() => formSubmit("step2")}
                              >
                                Confirm Swap
                              </button>
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
                          <div className="form_login_section p-0">
                            <div className="form register_login p-0">
                              <form className="form_pading_s summary_box  ">
                                <div className=" mb-4">
                                  <h4 className="h2_bottomn">Summary</h4>
                                </div>

                                <div className="form-group flex_start_sae">
                                  <p className="preview">
                                    Price:<span>1BTC = 0.056853264 ETH</span>
                                  </p>
                                </div>
                                <div className="form-group flex_start_sae">
                                  <p className="preview">
                                    Minimum Swap:<span>0.1</span>
                                  </p>
                                </div>
                                <div className="form-group flex_start_sae">
                                  <p className="preview">
                                    Maximum Swap: <span>0.15</span>
                                  </p>
                                </div>
                                <div className="form-group flex_start_sae">
                                  <p className="preview">
                                    Swap Fee: <span>0.0</span>
                                  </p>
                                </div>
                                <div className="form-group flex_start_sae">
                                  <p className="preview">
                                    Total Amount: <span>200</span>
                                  </p>
                                </div>
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
