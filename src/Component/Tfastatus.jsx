import React, {useEffect} from "react";
import Header from "./Newcomponent/Header";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import apiService from "../core/service/detail";
import {postMethod} from "../core/service/common.api";
import Footernew from "./footer_buttom";
import {Grid, Paper, Container} from "@mui/material";
import {Button} from "semantic-ui-react";
import useState from "react-usestateref";

function Home() {
  //========================================================================//

  const navigate = useNavigate();

  const initialFormValue = {
    amount: "",
    withAddress: "",
    tfa: "",
  };

  const [formValue, setFormValue] = useState(initialFormValue);
  const [amountValidate, setamountValidate] = useState(false);
  const [withAddressValidate, setwithAddress] = useState(false);
  const [tfaValidate, settfaValidate] = useState(false);
  const [validationnErr, setvalidationnErr] = useState("");

  const [tfastatus, settfastatus] = useState(1);
  useEffect(() => {
    var token = localStorage.getItem("user_token");
    if (!token) {
      navigate("/login");
    }
    getAddress();
    getUserbalance();
    settfastatus(localStorage.getItem("tfaStatus"));
  }, []);
  const [selectedOption, setselectedOption] = useState({});

  const handleChangedrop = async (e, option) => {
    setselectedOption(option.value);
    var data = {
      apiUrl: apiService.getCurrencywith,
      payload: {currency: option.value},
    };
    var resp = await postMethod(data);
    setwithdrawDet(resp.data);
  };

  const [addressDetails, setaddressDetails] = useState("");
  const [twoOption, settwoOption] = useState([]);
  const [withdrawDet, setwithdrawDet] = useState({});

  const getAddress = async () => {
    var data = {
      apiUrl: apiService.getCurrency,
      payload: {currency: "USDT"},
    };
    var resp = await postMethod(data);
    if (resp.status == true) {
      for (let i = 0; i < resp.data.length; i++) {
        const element = resp.data[i];
        var obj = {
          key: element.currencySymbol,
          text: element.currencyName + "(" + element.currencySymbol + ")",
          value: element.currencySymbol,
        };
        twoOption.push(obj);
      }
    }
  };

  const back_function = () => {
    navigate("/Userprofile");
  };
  const nav2fapage = () => {
    navigate("/Security");
  };
  const validate = async (values) => {
    console.log(withdrawDet, "=-=-=-=-");
    const errors = {};
    if (!values.amount) {
      errors.amount = "Amount is a required field";
      setamountValidate(true);
    }
    if (!values.withAddress) {
      errors.withAddress = "Destination address is a required field";
      setwithAddress(true);
    }
    if (!values.tfa) {
      errors.tfa = "2FA is a required field";
      settfaValidate(true);
    }
    setvalidationnErr(errors);
    return errors;
  };
  const getUserbalance = async () => {
    var data = {
      apiUrl: apiService.getUserBalance,
    };
    var resp = await postMethod(data);
    console.log(resp, "=-=-=-=resp-=-=-=-=");
    if (resp.status) {
      // setbalance_overallusde(resp.balance);
      // settotal(resp.total);
    } else {
    }
  };

  const handleChange = async (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    let formData = {...formValue, ...{[name]: value}};
    setFormValue(formData);
  };

  const withdrawSubmit = async (e) => {
    e.preventDefault();
    try {
      validate(formValue);
      console.log(formValue, "=-=-=-formValue");
      if (
        formValue.amount != "" &&
        formValue.withAddress != "" &&
        formValue.tfa != ""
      ) {
        console.log(
          withdrawDet.currencysymbol,
          "-=-=-withdrawDet.currid",
          withdrawDet.currid
        );
        if (+formValue.amount > 0) {
          if (withdrawDet.minWithdrawLimit > formValue.amount) {
            toast.error(
              "Please enter greater than " +
                withdrawDet.minWithdrawLimit +
                " amount"
            );
          } else if (withdrawDet.maxWithdrawLimit < formValue.amount) {
            toast.error(
              "Please enter less than " +
                withdrawDet.maxWithdrawLimit +
                " amount"
            );
          } else {
            var obj = {
              amount: formValue.amount,
              withdraw_address: formValue.withAddress,
              tfaCode: formValue.tfa,
              currency_symbol: withdrawDet.currencySymbol,
            };
            var data = {
              apiUrl: apiService.submitWithdraw,
              payload: obj,
            };
            // setbuttonLoader(true);
            var resp = await postMethod(data);
            console.log("resp.message====", resp.message);
            if (resp.status) {
              toast.success(resp.message);
              // setbuttonLoader(false);
              formValue.amount = "";
              formValue.withAddress = "";
              formValue.tfa = "";
              //window.location.reload(false);
            } else {
              toast.error(resp.message);
              // setbuttonLoader(false);
              formValue.amount = "";
              formValue.withAddress = "";
              formValue.tfa = "";
              //window.location.reload(false);
            }
          }
        } else {
          toast.error("Please give valid withdraw amount!");
        }
      }
    } catch (error) {}
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
                  <div className="form_content">
                    <Button onClick={back_function} className="back_butn">
                      <i
                        // onClick={() => back_function("step4")}
                        className="ri-arrow-left-line"
                      ></i>{" "}
                      Back
                    </Button>
                  </div>
                  <div className="form_login_section p-0">
                    <div className="form register_login p-0">
                      <form className="form_pading_s">
                        <div className="form-group">
                          <label>Pan Card Number</label>
                          <input
                            type="email"
                            className="form-control"
                            minLength={20}
                            id="exampleInputPassword1"
                            placeholder="Enter Pan Card Number"
                            name="pancard_number"
                            // onChange={getFormvalue}
                          />
                        </div>
                        <div>
                          {/* {pancard_numberValidate == true ? (
                            <p className="text-danger">
                              {" "}
                              {validationnErr.pancard_number}{" "}
                            </p>
                          ) : (
                            ""
                          )} */}
                        </div>
                      </form>

                      {/* {buttonLoader == false ? (
                        <button
                          type="button"
                          className="btn btn-primary w-100"
                          onClick={() => formSubmit("step4")}
                        >
                          Submit
                        </button>
                      ) : (
                        <button type="button" className="btn btn-primary w-100">
                          loading...
                        </button>
                      )}
                      <Link
                        onClick={() => formupdate("step4")}
                        className="cancel_butn"
                      >
                        Save and Exit
                      </Link> */}
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
