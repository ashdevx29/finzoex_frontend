import React, { useEffect } from "react";
import Header from "./Newcomponent/Header";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiService from "../core/service/detail";
import { postMethod } from "../core/service/common.api";
import Footernew from "./footer_buttom";
import { Grid, Paper, Container } from "@mui/material";
import { setAuthorization } from "../core/service/axios";
import { Button } from "semantic-ui-react";
import { Dropdown } from "semantic-ui-react";
import useState from "react-usestateref";
function Home() {
  //========================================================================//

  const navigate = useNavigate();

  const initialFormValue = {
    amount: "",
    withAddress: "",
    tfa: "",
    otp: "",
  };

  const [formValue, setFormValue] = useState(initialFormValue);
  const [amountValidate, setamountValidate] = useState(false);
  const [withAddressValidate, setwithAddress] = useState(false);
  const [OtpValidate, setOtpvalidate] = useState(false);
  const [tfaValidate, settfaValidate] = useState(false);
  const [validationnErr, setvalidationnErr] = useState("");

  const [tfastatus, settfastatus, tfastatusref] = useState(0);

  const [withdrawNetwork, setwithdrawNetwork] = useState("");

  useEffect(() => {
    var token = localStorage.getItem("user_token");
    if (!token) {
      navigate("/login");
    }
    getAddress();
    getUserbalance();
    var tfaStatus = localStorage.getItem("tfa_status");
    settfastatus(tfaStatus);
    // toast(tfastatusref.current)
    console.log(tfastatusref.current, "=====tfastatusref.current", tfaStatus);
  }, []);
  const [selectedOption, setselectedOption] = useState({});

  const handleChangedrop = async (e, option) => {
    setselectedOption(option.value);
    var data = {
      apiUrl: apiService.getCurrencywith,
      payload: { currency: option.value },
    };
    var resp = await postMethod(data);
    setwithdrawDet(resp.data);
    if(resp.data.currencyType == "2")
    {
      if (resp.data.erc20token == "1") {
        setwithdrawNetwork("ERC20");
      } else if (resp.data.trc20token == "1") {
        setwithdrawNetwork("TRC20");
      } else if (resp.data.bep20token == "1") {
        setwithdrawNetwork("BEP20");
      }
    }
  };

  const [addressDetails, setaddressDetails] = useState("");
  const [twoOption, settwoOption] = useState([]);
  const [withdrawDet, setwithdrawDet] = useState({});

  const getAddress = async () => {
    var data = {
      apiUrl: apiService.getCurrency,
      payload: { currency: "USDT" },
    };
    var resp = await postMethod(data);
    if (resp.status == true) {
      for (let i = 0; i < resp.data.length; i++) {
        const element = resp.data[i];
        var obj = {
          key: element.currencySymbol,
          text: element.currencyName + " " + "(" + element.currencySymbol + ")",
          value: element.currencySymbol,
        };
        twoOption.push(obj);
      }
    }
  };

  const back_function = () => {
    navigate("/Dashboardpage");
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
    if (!values.otp) {
      errors.otp = "Withdrawal Otp is a required field";
      setOtpvalidate(true);
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
    const { name, value } = e.target;
    let formData = { ...formValue, ...{ [name]: value } };
    setFormValue(formData);
  };
  const [OtpStatus, setOtpStatus] = useState(false);

  const withdrawSubmit = async (e) => {
    e.preventDefault();
    try {
      validate(formValue);
      console.log(formValue, "=-=-=-formValue");
      if (
        formValue.amount != "" &&
        formValue.withAddress != ""
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
              apiUrl: apiService.send_withdraw_otp,
              payload: obj,
            };
            // setbuttonLoader(true);
            var resp = await postMethod(data);
            console.log("resp.message====", resp.message);
            if (resp.status) {
              setOtpStatus(true);
              toast.success(resp.message);
              // setbuttonLoader(false);
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

  const withdraw_Submit= async (e)=>{
      e.preventDefault();
      try {
        validate(formValue);
        console.log(formValue, "=-=-=-formValue");
        if (
          formValue.amount != "" &&
          formValue.withAddress != "" &&
          formValue.tfa != ""&&
          formValue.otp != ""
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
                withdrawOtp: formValue.otp,
                currency_symbol: withdrawDet.currencySymbol,
              };
              var data = {
                apiUrl: apiService.submitfiatWithdraw,
                payload: obj,
              };
              // setbuttonLoader(true);
              var resp = await postMethod(data);
              console.log("resp.message====", resp.message);
              if (resp.status) {
                toast.success(resp.message);
                // setbuttonLoader(false);
                // formValue.amount = "";
                // formValue.withAddress = "";
                // formValue.tfa = "";
                //window.location.reload(false);
              } else {
                toast.error(resp.message);
                // setbuttonLoader(false);
                // formValue.amount = "";
                // formValue.withAddress = "";
                // formValue.tfa = "";
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
        <Container maxWidth="xl" className="container-lg">
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
                  <div className="form_content">
                    <h1 className="mb-0">Withdraw</h1>
                    <p className="text_newsd mb-4">
                      Transfer your Cryptocoin from Taikonz exchange to other
                      Wallet address{" "}
                    </p>
                  </div>
                  <div className="form_login_section p-0">
                    <div className="form register_login p-0">
                      <form className="form_pading_s">

                      
                        <div className="form-group">
                          <label>Destination Address</label>
                          <div className="postion_reletitt">
                            <input
                              type="text"
                              className="form-control"
                              name="withAddress"
                              id="exampleInputPassword1"
                              onChange={handleChange}
                              placeholder="Enter destination address"
                            />
                          </div>
                          <div>
                            {withAddressValidate == true ? (
                              <p className="text-danger">
                                {" "}
                                {validationnErr.withAddress}{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Crypto Currency</label>
                          <Dropdown
                            placeholder="Select Currency"
                            fluid
                            selection
                            className="text_memu"
                            value={selectedOption}
                            onChange={handleChangedrop}
                            options={twoOption}
                            search
                          />
                        </div>

                        {withdrawDet &&
                        withdrawDet.currencyType == "2" ? (
                          <div className="form-group">
                            <span style={{color:"#fff !important",textAlign:"left"}}>Network: {withdrawNetwork} </span>
                          </div>
                          
                        ): ("")}

                        <div className="form-group">
                          <label>Amount</label>
                          <div className="postion_reletitt">
                            <input
                              type="number"
                              min="0"
                              className="form-control"
                              id="exampleInputPassword1"
                              name="amount"
                              onChange={handleChange}
                              placeholder="Enter Amount here"
                            />
                          </div>
                          <div>
                            {amountValidate == true ? (
                              <p className="text-danger">
                                {" "}
                                {validationnErr.amount}{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                       
                       

                        {OtpStatus == false ? (
                          ""
                        ) : (
                          <>
                            <div className="form-group">
                              <label>Withdraw OTP</label>
                              <div className="postion_reletitt">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleInputPassword1"
                                  name="otp"
                                  onChange={handleChange}
                                  placeholder="Enter OTP here"
                                />
                              </div>
                              <div>
                                {OtpValidate == true ? (
                                  <p className="text-danger">
                                    {" "}
                                    {validationnErr.otp}{" "}
                                  </p>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                            <div className="form-group">
                          <label>GAuth OTP</label>
                          <div className="postion_reletitt">
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputPassword1"
                              name="tfa"
                              onChange={handleChange}
                              placeholder="Enter OTP here"
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
                        </div>
                          </>
                        )}
                      </form>
                      <div className="button_launch">
                        <button
                          type="button"
                          className="btn btn-second w-100"
                          onClick={back_function}
                        >
                          Cancel
                        </button>
                        {tfastatusref.current == "0" ? (
                          <button
                            type="button"
                            className="btn btn-primary w-100"
                            onClick={nav2fapage}
                          >
                            2FA Enable
                          </button>
                        ) : OtpStatus == false ? (
                          <button
                            type="button"
                            className="btn btn-primary w-100"
                            onClick={withdrawSubmit}
                          >
                            Submit
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-primary w-100"
                            onClick={withdraw_Submit}
                          >
                            Submit
                          </button>
                        )}
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
