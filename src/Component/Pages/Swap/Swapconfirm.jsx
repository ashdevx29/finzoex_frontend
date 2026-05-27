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
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <div className="card_logoki pading_cardd">
                <div className="form_content">
                  <h1 className="mb-2 aling_flexx">
                    {" "}
                    <img
                      src={new URL("../../../img/New_images/sucess_2.png", import.meta.url).href}
                      className="img-fluid "
                    />
                    Order completed!
                  </h1>
                </div>
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
                    <div className="step-5 ">
                      <div className="form_login_section p-0 mt-4">
                        <div className="form register_login p-0">
                          <form className="form_pading_s bg_trans pb-0">
                            <div className="form-group bg_tra_cades ">
                              <div className="section_class_grs">
                                <label>Successfully swapped</label>
                                <h4 className="text_color_imhd">
                                  0.0000023 BTC
                                </h4>
                              </div>
                              <div className="section_class_grs">
                                <label>To</label>
                                <h4>20000.0000 ETH</h4>
                              </div>
                            </div>
                          </form>
                          <div className="aling_caseds">
                            <button
                              type="button"
                              className="btn btn-primary w-100 burdas_buttnd "
                              onClick={() => formSubmit("step2")}
                            >
                              Go to History
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary w-100"
                              onClick={() => formSubmit("step2")}
                            >
                              Continue to Swap
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
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
