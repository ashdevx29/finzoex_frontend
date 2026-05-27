import React, {useEffect} from "react";
import Header from "../../Newcomponent/Header";
import {Link, useNavigate, useLocation} from "react-router-dom";
import {toast} from "react-toastify";
import {Grid, Paper, Container} from "@mui/material";
import {Button} from "semantic-ui-react";
import useState from "react-usestateref";
import apiService from "../../../core/service/detail";
import {postMethod} from "../../../core/service/common.api";
import {setAuthorization} from "../../../core/service/axios";
function Home() {
  //========================================================================//

  useEffect(() => {}, []);

  const initialFormValue = {
    tfa: "",
  };
  const [formValue, setFormValue] = useState(initialFormValue);
  const [tfaValidate, settfaValidate] = useState(false);
  const [validationnErr, setvalidationnErr] = useState("");
  const [buttonLoader, setbuttonLoader] = useState(false);
  const navigate = useNavigate();

  const {tfa} = formValue;
  const {state} = useLocation();

  const handleChange = async (e) => {
    const {name, value} = e.target;
    let formData = {...formValue, ...{[name]: value}};
    setFormValue(formData);
    validate(formData);
  };
  const formSubmit = async () => {
    validate(formValue);
    if (formValue.tfa !== "") {
      var data = {
        apiUrl: apiService.tfaVerify,
        payload: {
          userToken: tfa,
          socketToken: state?.socketToken,
        },
      };
      setbuttonLoader(true);
      var resp = await postMethod(data);
      setbuttonLoader(false);
      console.log("tfa login===", resp);
      if (resp.status) {
        toast.success(resp.Message);
        await setAuthorization(resp.token);
        localStorage.setItem("user_token", resp.token);
        localStorage.setItem("tfa_status", resp.tfa);
        localStorage.setItem("socket_token", resp.socketToken);
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
  };
  const validate = async (values) => {
    const errors = {};
    if (!values.tfa) {
      errors.tfa = "2FA is Required";
      settfaValidate(true);
    }
    setvalidationnErr(errors);
    return errors;
  };
  return (
    <div className="">
      <main className="main-content tradepage-bg  bg-cover onlywhitee new_login_bb">
        <Header />
        <Container maxWidth="xl">
          <Grid container spacing={2} justifyContent={"center"}>
            {/* Item for xs (extra small) screens */}
            <Grid item xs={12} sm={12} md={8} lg={6} xl={5}>
              <div className="card_logoki pading_cardd">
                <div className="step-1">
                  <div className="form_content"></div>
                  <div className="form_login_section p-0">
                    <div className="form register_login p-0">
                      <form className="form_pading_s">
                        <div className="form-group">
                          <label>Enter your 2FA Code to login</label>
                          <input
                            type="email"
                            className="form-control"
                            minLength={20}
                            id="exampleInputPassword1"
                            placeholder="Enter 2FA code"
                            name="tfa"
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          {tfaValidate == true ? (
                            <p className="text-danger">
                              {" "}
                              {validationnErr.tfa}{" "}
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
                          Login
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
