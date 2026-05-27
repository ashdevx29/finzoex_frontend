import React, { useState, useEffect } from "react";
import Header from "../../Newcomponent/Header";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiService from "../../../core/service/detail";
import { postMethod, getMethod } from "../../../core/service/common.api";
import Footernew from "../../footer_buttom";
import { Grid, Paper, Container } from "@mui/material";
import { setAuthorization } from "../../../core/service/axios";
import { Button } from "semantic-ui-react";
import { Checkbox } from "semantic-ui-react";
import { Dropdown } from "semantic-ui-react";
import {
  ModalHeader,
  ModalContent,
  ModalActions,
  Icon,
  Modal,
} from "semantic-ui-react";
import useStateRef from "react-usestateref";
import moment from "moment";

function exampleReducer(state, action) {
  switch (action.type) {
    case "close":
      return { open: false };
    case "open":
      return { open: true, size: action.size };
    default:
      throw new Error("Unsupported action...");
  }
}

function Home() {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;

  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
    get_launchpad_details();
    getUserbalance();
    getBalance();
    var token = localStorage.getItem("user_token");
    if (!token) {
      navigate("/login");
    }
  }, [0]);
  const [supplyPercentage, setsupplyPercentage] = useState();
  const cancel_function = () => {
    console.log("===========work");
    navigate("/launchpadlistnew");
  };
  const [launchpadDatails, setLaunchpadDetails, launchpadDatailsref] =
    useStateRef();

  var get_launchpad_details = async () => {
    var get_id = window.location.href.split("/").at(4);
    console.log(get_id, "get_id");
    var obj = {
      id: get_id,
    };
    var data = {
      apiUrl: apiService.getOneLaunchpad,
      payload: obj,
    };
    var resp = await postMethod(data);
    setLaunchpadDetails(resp.Message);
    console.log(launchpadDatailsref.current);
    var percentage =
      (launchpadDatailsref.current.totalSupply /
        launchpadDatailsref.current.token_supply) *
      100;
    console.log(percentage);
    setsupplyPercentage(percentage);
    setfees(resp.fees);
    holding_currency();
  };
  const [totalBalance, setTotalBalance] = useState();
  const [fees, setfees] = useState();

  // const getUserbalance = async () => {
  //   var obj = {
  //     page: 1,
  //     perpage: 5,
  //   };
  //   var data = {
  //     apiUrl: apiService.getUserBalance,
  //     payload: obj,
  //   };
  //   var resp = await postMethod(data);
  //   if (resp.status) {
  //     console.log(resp.Message, "=-=-=-resp.Message=-=-=-");
  //     setTotalBalance(resp.balance.available_balance_usdt);
  //   }
  // };

  const getUserbalance = async () => {
    var data = {
      apiUrl: apiService.getUSDTBalance,
    };
    var resp = await getMethod(data);
    if (resp.status) {
      setTotalBalance(resp.balance);
    }
  };

  const [calculation, setCalculation, calculationref] = useStateRef(true);
  const [maxcurrency, setMaxCurrency] = useState();
  const opencalculating1 = () => {
    if (calculationref.current == false) {
      setCalculation(true);
    } else {
      setCalculation(false);
    }
    // console.log(totalBalance);
    // console.log(launchpadDatailsref.current.price);
    // var calculating = Number(
    //   totalBalance / (launchpadDatailsref.current.price + fees)
    // );
    var calculating = Number(totalBalance / launchpadDatailsref.current.price);
    var fees_calc = (calculating * fees) / 100;
    calculating = calculating - +fees_calc;
    setMaxCurrency(calculating);
    // console.log(calculating);
  };

  const [calculation2, setCalculation2, calculation2ref] = useStateRef(false);
  const opencalculating2 = () => {
    setCalculation(true)
    opencalculating1();
    if (calculation2ref.current == false) {
      setCalculation2(true);
    } else {
      setCalculation2(false);
    }
  };

  const [calculation3, setCalculation3, calculation3ref] = useStateRef(false);

  const delay = 5;

  const opencalculating3 = () => {
    if (calculation3ref.current == false) {
      setCalculation3(true);
    } else {
      setCalculation3(false);
    }
    setTimeout(() => {
      setCalculation4(true);
      setCalculation3(false);
    }, 3000);
  };

  const [calculation4, setCalculation4, calculation4ref] = useStateRef(false);
  const opencalculating4 = () => {
    setCalculation3(true);
    if (calculation4ref.current == false) {
      setCalculation4(true);
    } else {
      setCalculation4(false);
    }
  };
  const [allCurrencyFiat, setallCurrencyFiat] = useState([]);
  const [currentCurrency, setcurrentCurrency, currentCurrencyref] =
    useStateRef();
  const [currentBalance, setcurrentBalance] = useState(0);
  const [records, setrecords] = useState([]);
  const [CurrentINRValue, setCurrentINRValue] = useState(0);

  const getBalance = async () => {
    try {
      var data = {
        apiUrl: apiService.launchPadcurrency,
      };
      var resp = await getMethod(data);
      if (resp) {
        console.log(resp.data);
        var currArrayCrypto = [];
        var currArrayFiat = [];
        var data = resp.Message;
        setrecords(data);
        for (var i = 0; i < data.length; i++) {
          var obj = {
            key: data[i].currid,
            value: data[i].currencysymbol,
            text: data[i].currencysymbol,
            balance: data[i].currencyBalance,
          };
          currArrayCrypto.push(obj);
        }
        withCash(currArrayCrypto[0]);
        setallCurrencyFiat(currArrayCrypto);
        console.log(currArrayCrypto, "=-=-=-");
      }
    } catch (error) {}
  };

  const withCash = async (e, value) => {
    if (value != "" && value != null && value != undefined) {
      setcurrentCurrency(value.value);
      let indexing = records.findIndex((x) => x.currencysymbol == value.value);
      console.log(indexing, "indexing");

      if (indexing != -1) {
        var getBalanceData = records[indexing].currencyBalance;
        console.log(getBalanceData, "getBalanceData");

        setcurrentBalance(getBalanceData);
      }
      var obj = {
        currency: currentCurrencyref.current,
      };
      var data = {
        apiUrl: apiService.getCurrencyConvertion,
        payload: obj,
      };
      var resp = await postMethod(data);
      if (resp) {
        console.log(resp.inr_value, "resp.inr_value");
        setCurrentINRValue(+resp.inr_value);
        setcurrenctConversionPrice(+resp.inr_value);
      }
    }
  };

  const initialFormValue = {
    typeAmount: "",
  };
  const [formValue, setFormValue] = useState(initialFormValue);
  const [totalBuyingAmount, settotalBuyingAmount, totalBuyingAmountref] =
    useStateRef(0);
  const [
    currenctConversionPrice,
    setcurrenctConversionPrice,
    currenctConversionPriceref,
  ] = useStateRef();
  const [admin_fees, setadmin_fees, admin_feesref] = useStateRef(0);
  const [commitAmount, setcommitAmount, commitAmountref] = useStateRef(0);
  const [opentab, setopentab, opentabref] = useStateRef(false);

  const handleChange = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formData = { ...formValue, ...{ [name]: value } };
    setFormValue(formData);
    if (formData.typeAmount < currentBalance) {
      var currencyPrice =
        +currenctConversionPriceref.current * +formData.typeAmount;
      settotalBuyingAmount(+currencyPrice / launchpadDatailsref.current.price);
      var adminfees = Number((fees * totalBuyingAmountref.current) / 100);

      setadmin_fees(adminfees);
      console.log("--0-0-0-", admin_feesref.current);
      console.log("--fees-0-0-", fees);
      console.log("--0-0-0-", adminfees);
      var data = totalBuyingAmountref.current - adminfees;
      setcommitAmount(data);
      console.log(totalBuyingAmountref.current);
      console.log(data, "data");
      console.log(currenctConversionPriceref.current);
      console.log(launchpadDatailsref.current.price + fees);
      if (launchpadDatailsref.current.hardCap >= formData.typeAmount) {
        if (launchpadDatailsref.current.softCap <= formData.typeAmount) {
          setopentab(true);
        } else {
          toast.error(
            "Enter greater than " + launchpadDatailsref.current.softCap
          );
        }
      } else {
        toast.error("Enter less than " + launchpadDatailsref.current.hardCap);
      }
    } else {
      toast.error("Insufficient Balance");
    }
  };

  const [add_amount, set_add_amount, add_amountref] = useStateRef();
  const [deduct_amount, set_deduct_amount, deduct_amountref] = useStateRef(0);
  const [deduct_currency, set_deduct_currency, deduct_currencyref] =
    useStateRef(0);
  var tokenpurchase = async () => {
    var get_id = window.location.href.split("/").at(4);
    console.log(get_id, "get_id");
    var obj = {
      givetoken: currentCurrencyref.current,
      buytoken: launchpadDatails.symbol,
      givetokenprice: formValue.typeAmount,
      buytokenprice: commitAmountref.current,
      fees: admin_feesref.current,
      token_id: get_id,
    };

    var data = {
      apiUrl: apiService.LaunchpadtokenPurchase,
      payload: obj,
    };
    var resp = await postMethod(data);
    if (resp.status == true) {
      set_add_amount(resp.add_amount);
      set_deduct_amount(resp.deduct_amount);
      set_deduct_currency(resp.deduct_currency);
      toast.success(resp.Message);
      // navigate("/Dashboardpage")
      opencalculating3();
      opencalculating2();
      opencalculating1();
    } else {
      toast.error(resp.Message);
    }
  };
  const [holding, setholding] = useState();
  const holding_currency = async () => {
    var obj = {
      currency_name: launchpadDatailsref.current.symbol,
    };
    var data = {
      apiUrl: apiService.holding_currency,
      payload: obj,
    };
    var resp = await postMethod(data);
    setholding(resp.balance);
  };
  return (
    <div className="">
      <main className="main-content tradepage-bg  bg-cover onlywhitee new_login_bb">
        <Header />
        <Container maxWidth="xl">
          <Grid container spacing={2} justifyContent={"center"}>
            {/* Item for xs (extra small) screens */}
            {isLoaded == false ? (
              <Grid item xs={12} sm={12} md={8} lg={12} xl={12}>
                <div className="loading">
                  <i className="fa-solid fa-spinner fa-spin-pulse "></i>
                </div>
              </Grid>
            ) : (
              <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
                <div className="card_logoki pading_cardd">
                  <div className="form_content">
                    <Button onClick={cancel_function} className="back_butn">
                      <i
                        onClick={cancel_function}
                        className="ri-arrow-left-line"
                      ></i>{" "}
                      Back
                    </Button>
                    <div className="progredsss_launch">
                      <div className="processs">
                        <span>In Progress</span>
                      </div>
                      <div className="date_section">
                        <p>
                          <span>Start Date</span>

                          {moment(launchpadDatails.startDate).format("L")}
                        </p>
                        <p>
                          <span>End Date</span>
                          {moment(launchpadDatails.endDate).format("L")}
                        </p>
                      </div>
                    </div>
                    <div className="price_pair mt-4">
                      <div className="paitr_content">
                        <img
                          src={
                            launchpadDatails.currency_image == ""
                              ? require("../../../img/New_images/color.png")
                              : launchpadDatails.currency_image
                          }
                          className=""
                        />
                        {/* <span>Bitcoin</span> */}
                        <span>{launchpadDatails.symbol}</span>
                      </div>
                    </div>

                    <div className="contant_details">
                      <h3>Subscription Timeline</h3>
                      <p>
                        {launchpadDatails.description}
                        {/* Bitcoin is the first decentralized cryptocurrency. Nodes
                        in the peer-to-peer bitcoin network verify transactions
                        through cryptography and record them in a public
                        distributed ledger, called a blockchain, without central
                        oversight. */}
                      </p>
                      <Grid container spacing={2} justifyContent={"start"}>
                        <Grid item xs={12} sm={12} md={6} lg={5} xl={5}>
                          <div className="innaer_details">
                            <label>Type</label>
                            <h5>{launchpadDatails.address_type}</h5>
                            {/* <h5>Subscription</h5> */}
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={5} xl={5}>
                          <div className="innaer_details">
                            <label>Total Funds</label>
                            <h5>
                              {launchpadDatails.totalSupply} {""}
                              {launchpadDatails.symbol}
                            </h5>
                            {/* <h5>1,000,000.000 BTC</h5> */}
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={5} xl={5}>
                          <div className="innaer_details">
                            <label>Network</label>
                            <h5>{launchpadDatails.network}</h5>
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={5} xl={5}>
                          <div className="innaer_details">
                            <label>Price</label>
                            <h5>
                              1 {launchpadDatails.symbol} ={" "}
                              {launchpadDatails.price} USDT
                              {/* {launchpadDatails.symbol} */}
                            </h5>
                          </div>
                        </Grid>
                      </Grid>

                      <div className="active_section_tabs mt-5">
                        <h3>{launchpadDatails.currency_name}</h3>

                        <div className="step-1">
                          <div className="section_tabs_active">
                            <div className="icons_" onClick={opencalculating1}>
                              <span>1</span>
                            </div>
                            <div className="contant_collect">
                              <h6>
                                {launchpadDatails.symbol} Holding Calculation
                                Period
                              </h6>
                              {/* <p>2023-07-11 05:30</p> */}
                            </div>
                          </div>

                          <div className="mgs_content">
                            {calculationref.current === true ? (
                            <div>
                              {/* <div className="hid_content"> */}
                              <p>
                                To participate, your daily average BNB holdings
                                across various accounts will be tallied.
                              </p>
                              <div className="card_bg">
                                <label>
                                  Avg {launchpadDatails.symbol} holdings ({holding}{" "}{launchpadDatails.symbol} )
                                </label>
                                <h4>Calculating...</h4>
                                <Button onClick={opencalculating2}>
                                  Buy {launchpadDatails.symbol}
                                </Button>
                              </div>
                            </div>
                           ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="step-2 ">
                          <div className="section_tabs_active">
                            <div className="icons_">
                              <span>2</span>
                            </div>
                            <div className="contant_collect">
                              <h6>Subscription Period</h6>
                              {/* <p>2023-07-11 05:30</p> */}
                            </div>
                          </div>
                          <div className="mgs_content">
                            <div>
                              {calculation2ref.current === true ? (
                                <div>
                                  <p>
                                    Only {launchpadDatails.symbol} in your
                                    wallet can be used to subscribe
                                  </p>

                                  <div className="card_bg">
                                    <label>
                                      Your max commitment limit:
                                      <span className="span_graycolor ml-2">
                                        {maxcurrency != null &&
                                        maxcurrency != "" &&
                                        maxcurrency != undefined
                                          ? maxcurrency.toFixed(6)
                                          : 0.0}{" "}
                                        {launchpadDatails.symbol}
                                      </span>
                                    </label>
                                    <p className="mb-0 mt-4">
                                      Your committed {launchpadDatails.symbol}
                                    </p>
                                    <h4 className="pt-0">
                                      {add_amountref.current}
                                    </h4>
                                    <Button
                                      onClick={() =>
                                        dispatch({ type: "open", size: "mini" })
                                      }
                                      data-toggle="modal"
                                      data-target="#exampleModal"
                                    >
                                      Commit {launchpadDatails.symbol}
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="step-3 ">
                          <div className="section_tabs_active">
                            <div className="icons_" onClick={opencalculating3}>
                              <span>3</span>
                            </div>
                            <div className="contant_collect">
                              <h6>Calculating Period</h6>
                              {/* <p>2023-07-11 05:30</p> */}
                            </div>
                          </div>

                          <div className="mgs_content">
                            {calculation3ref.current === true ? (
                              <div>
                                <p>
                                  Only {launchpadDatails.symbol} in your wallet
                                  can be used to subscribe
                                </p>
                                <div className="card_bg">
                                  <label>
                                    Your max commitment limit:
                                    <span className="span_graycolor ml-2">
                                      {add_amountref.current}
                                    </span>
                                  </label>
                                  <p className="mb-0 mt-4">
                                    Your token allocation
                                  </p>
                                  <h4 className="pt-0">Calculating...</h4>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="step-4 active">
                          <div className="section_tabs_active">
                            <div className="icons_" onClick={opencalculating4}>
                              <span>4</span>
                            </div>
                            <div className="contant_collect">
                              <h6>Final Token Distribution</h6>
                              {/* <p>2023-07-11 05:30</p> */}
                            </div>
                          </div>
                          <div className="mgs_content">
                            {calculation4ref.current === true ? (
                              <div>
                                <p>
                                  The allocation calculation is complete. We
                                  will deduct the corresponding{" "}
                                  {launchpadDatails.symbol} from your account
                                  based on your final{" "}
                                  {launchpadDatails.currency_name} allocation,
                                  which will be transferred to your
                                  account along with your remaining{" "}
                                  {launchpadDatails.symbol}.
                                </p>
                                <div className="card_bg">
                                  <p className="mb-0 mt-4">To be deducted</p>
                                  <h4 className="pt-0 mb-3">
                                    {deduct_amountref.current}{" "}
                                  </h4>
                                  <p className="mb-0 mt-4">
                                    Your final allocation
                                  </p>
                                  <h4 className="pt-0 span_graycolor">
                                    {add_amountref.current}
                                  </h4>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="contecnt_main">
                          <h2>
                            {launchpadDatails.symbol} - An intel-to-earn token
                            powering the <br />
                            deanonymization of the blockchain with AI.
                          </h2>

                          <div className="innaer_details">
                            <h5 className="mb-3">Project Introduction</h5>
                            {/* <label>
                              Arkham (ARKM) is an intel-to-earn economy powering
                              the deanonymization of the blockchain with AI.
                              Arkham uses AI to deanonymize the blockchain,
                              showing users the people and companies behind
                              cryptocurrency transactions; and Arkham introduces
                              intel-to-earn, an intel economy that matches
                              buyers and sellers of blockchain data at scale.
                              <br />
                              ARKM is the Arkham platform’s native utility
                              token. It's utility include using it as a currency
                              to access the premium features of Arkham Intel
                              Exchange at a discount, incentives to facilitate
                              transactions on the intel exchange marketplace and
                              Governance.
                            </label> */}
                            <label>
                              {launchpadDatails.Project_description}
                            </label>
                          </div>
                          <div className="innaer_details mb-4">
                            <h5 className="mb-3">
                              Key Features and Highlights
                            </h5>
                            {/* <label>
                              Arkham (ARKM) is an intel-to-earn economy powering
                              the deanonymization of the blockchain with AI.
                              Arkham uses AI to deanonymize the blockchain,
                              showing users the people and companies behind
                              cryptocurrency transactions; and Arkham introduces
                              intel-to-earn, an intel economy that matches
                              buyers and sellers of blockchain data at scale.
                              <br />
                              ARKM is the Arkham platform’s native utility
                              token. It's utility include using it as a currency
                              to access the premium features of Arkham Intel
                              Exchange at a discount, incentives to facilitate
                              transactions on the intel exchange marketplace and
                              Governance.
                            </label> */}
                            <label>{launchpadDatails.token_feature}</label>
                          </div>
                          <div className="innaer_details">
                            <h5 className="mb-4">
                              {launchpadDatails.symbol} Token Sale and Economics
                            </h5>
                            <div className="teble_primary_color coloe">
                              <div className="light_color">Hard Cap</div>
                              <div className="bold_fonr">
                                {launchpadDatails.hardCap} USD
                              </div>
                            </div>
                            <div className="teble_primary_color ">
                              <div className="light_color">
                                Total Token Supply
                              </div>
                              <div className="bold_fonr">
                                {launchpadDatails.totalSupply}
                                {""}
                                {launchpadDatails.symbol}
                              </div>
                            </div>
                            <div className="teble_primary_color coloe">
                              <div className="light_color">
                                Initial Circulating Supply
                              </div>
                              <div className="bold_fonr">
                                {+supplyPercentage.toFixed(5)} % of Total Token
                                Supply
                              </div>
                            </div>
                            <div className="teble_primary_color ">
                              <div className="light_color">
                                Public Sale Token Price
                              </div>
                              <div className="bold_fonr">
                                {launchpadDatails.price} USD (price in{" "}
                                {launchpadDatails.symbol} will be determined
                                prior to the start of subscription)
                              </div>
                            </div>
                            {/* <div className="teble_primary_color coloe">
                              <div className="light_color">Tokens Offered</div>
                              <div className="bold_fonr">50,000,000 BTC</div>
                            </div>
                            <div className="teble_primary_color ">
                              <div className="light_color">
                                Hard Cap Per User
                              </div>
                              <div className="bold_fonr">
                                15,000 USD (price in BNB will be determined
                                prior to the start of subscription)t
                              </div>
                            </div>
                            <div className="teble_primary_color coloe">
                              <div className="light_color">
                                Token Sale Vesting Period
                              </div>
                              <div className="bold_fonr">No lockup</div>
                            </div> */}
                            <div className="teble_primary_color coloe">
                              <div className="light_color">Token Type</div>
                              <div className="bold_fonr">
                                {launchpadDatails.address_type}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* pop up-1 */}

                <div
                  className="modal fade"
                  id="exampleModalCenter"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalCenterTitle"
                  aria-hidden="flase"
                >
                  <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">
                          Confirm {launchpadDatails.symbol} commitment
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="modal-text1">
                          <h3>
                            <span>
                              {launchpadDatails.symbol} amount to commit:{" "}
                            </span>{" "}
                            {commitAmountref.current == ""
                              ? 0
                              : commitAmountref.current.toFixed(6)}{" "}
                            {launchpadDatails.symbol} <br />
                          </h3>
                          <p>
                            Once successfully committed, your{" "}
                            {launchpadDatails.symbol} will be <br /> temporarily
                            locked and will not be able to be redeemed <br />{" "}
                            until the final token distribution period, at which
                            point the <br /> remaining {launchpadDatails.symbol}{" "}
                            will be automatically sent beck to your <br />{" "}
                            wallet.
                          </p>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-dismiss="modal"
                          id="cancel-btn"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          id="cancel-btn"
                          data-dismiss="modal"
                          onClick={tokenpurchase}
                        >
                          Commit Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* pop up-2 */}
                <div
                  className="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Commit {launchpadDatails.symbol}
                        </h5>
                      </div>
                      <div className="modal-body">
                        <div className="modal-text">
                          <h3>
                            <span>Max commitment limit: </span>{" "}
                            {maxcurrency != null &&
                            maxcurrency != "" &&
                            maxcurrency != undefined
                              ? maxcurrency.toFixed(6)
                              : 0.0}{" "}
                            {launchpadDatails.symbol}
                          </h3>
                          <h3 className="wallet">
                            <span>Wallet balance: </span> {currentBalance}{" "}
                            {currentCurrency}
                          </h3>
                        </div>

                        {/* <div className="input_section">
                          <Dropdown
                            className="input_bg"
                            options={allCurrencyFiat}
                            onChange={(o) => withCash(o)}
                            value={defaulatCurrFiat}
                            placeholder="Choose"
                          />
                        </div> */}
                        <div className="small_search bar mt-3">
                          <div className="form-group">
                            <label>Currency</label>
                            <Dropdown
                              fluid
                              selection
                              className="text_memu"
                              options={allCurrencyFiat}
                              onChange={withCash}
                              value={currentCurrency}
                              placeholder="Choose"
                            />
                          </div>
                        </div>

                        <div className="amt">
                          <p> Amount</p>
                        </div>

                        <div id="input">
                          <input
                            type="number"
                            placeholder="Enter Amount"
                            name="typeAmount"
                            onChange={handleChange}
                          />
                          <p>{currentCurrency} </p>
                        </div>
                        <div className="amt">
                          <p>Buying Amount </p>
                        </div>

                        <div id="input">
                          <input
                            type="number"
                            placeholder="0.00"
                            name="typeAmount"
                            value={totalBuyingAmountref.current.toFixed(6)}
                          />
                          <p>{launchpadDatails.symbol} </p>
                        </div>
                        <div className="modal-text mt-3">
                          <h3>
                            <span className="mt-1">
                              {" "}
                              Commit {launchpadDatails.symbol} :
                            </span>{" "}
                            {commitAmountref.current == ""
                              ? 0.0
                              : commitAmountref.current.toFixed(6)}{" "}
                            {""}{" "}
                          </h3>
                          <h3 className="wallet">
                            <span> Fees: </span>{" "}
                            {admin_feesref.current == ""
                              ? 0.0
                              : admin_feesref.current.toFixed(6)}
                          </h3>
                        </div>
                        {/* <p>
                          Commit {launchpadDatails.symbol}{" "}
                          {commitAmountref.current == ""
                            ? 0.0
                            : commitAmountref.current.toFixed(6)}{" "}
                          {""}{" "}
                        </p>

                        <p>
                          Fees {""}{" "}
                          {admin_feesref.current == ""
                            ? 0.0
                            : admin_feesref.current}
                        </p> */}
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                            id="cancel-btn"
                          >
                            Cancel
                          </button>
                          {opentabref.current == true ? (
                            <button
                              type="button"
                              className="btn btn-primary"
                              id="commit-btn"
                              data-toggle="modal"
                              data-target="#exampleModalCenter"
                              data-dismiss="modal"
                            >
                              Commit Now
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            )}
          </Grid>
          {/* Your other components and content */}
        </Container>
      </main>
    </div>
  );
}

export default Home;
