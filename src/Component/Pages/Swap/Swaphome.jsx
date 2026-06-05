import React, { useEffect } from "react";
import Header from "../../Newcomponent/Header";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiService from "../../../core/service/detail";
import { getMethod, postMethod } from "../../../core/service/common.api";
import Footernew from "../../footer_buttom";
import { Grid, Paper, Container } from "@mui/material";
import { setAuthorization } from "../../../core/service/axios";
import { Button } from "semantic-ui-react";
import moment from "moment";
import { Dropdown } from "semantic-ui-react";
import useState from "react-usestateref";
import Pagination from "react-js-pagination";

import DashboardBg from "../../../img/Dashboard/DashboadBg.jpg";



function Home() {
  const [fromTab, setFromTab] = useState([]);
  const [toTab, setToTab] = useState([]);
  const [fromCurrency, setfromCurrency, fromref] = useState("BTC");
  const [toCurrency, settoCurrency, toref] = useState("USDT");
  const [appendFromData, setappendFromData, appendFromDataref] = useState("");
  const [appendToData, setappendFToData, appendToDataref] = useState("");
  const [fromcurrencyImage, setFromcurrencyImage] = useState("");
  const [tocurrencyImage, setTocurrencyImage] = useState("");
  const [swapTab, setswapTab] = useState(false);
  const [fromAmount, setfromAmount, fromAmountref] = useState(0);
  const [toAmount, settoAmount, toAmountref] = useState(0);
  const [minMax, setMinMax] = useState(10);
  const [price, setPrice, priceref] = useState(0);
  const [estimateFee, setEstimationFee] = useState(0);
  const [totatlAmount, setTotalAmount] = useState(0);
  const [sessionHistory, setsessionHistory] = useState([]);
  const [totalPage, setTotalpages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [ButtonLoader, setButtonLoader] = useState(false);
  const [valueFA, setvalueFA] = useState(0);
  const [maxValue, setmaxValue] = useState(false);
  const [pageLoader, setPageloader] = useState(false);

  const [allCurrencyFiat, setfromCurrencyRef, fromCurrencyRef] = useState([]);
  const [toCurrencyRefs, setToCurrencyRef, toCurrencyRef] = useState([]);

  const [fromswap, setfromswap, fromswapref] = useState("");
  const [toswap, settoswap, toswapref] = useState("");
  const [swapstate, setswapstate, swapstateref] = useState();
  const [tempAmount, settempAmount, tempAmountref] = useState();

  const recordPerPage = 5;
  const pageRange = 5;

  useEffect(() => {
    setPageloader(true);

    // setTimeout(() => {
    //   setPageloader(false);
    // }, 1000);

    var token = localStorage.getItem("user_token");
    if (!token) {
      navigate("/login");
    }

    getUserbalance();
    swaphistory();
  }, [0]);
  const onSelect = async (option, type, o) => {
    // console.log("call addreas====", o);
    // console.log("call type====", type);

    if (type == "fromTab") {
      var findIndexing = fromTab.findIndex(
        (x) => x.currencySymbol == option.label
      );
      // console.log("findIndexing===", findIndexing);
      if (findIndexing != -1) {
        setappendFromData(fromTab[findIndexing]);
        setFromcurrencyImage(fromTab[findIndexing].image);
        setfromCurrency(fromTab[findIndexing].currencySymbol);
        swapPrice();
      }
    } else if (type == "toTab") {
      var findIndexingTo = fromTab.findIndex(
        (x) => x.currencySymbol == option.label
      );
      if (findIndexing != -1) {
        settoCurrency(fromTab[findIndexingTo].currencySymbol);
        setappendFToData(fromTab[findIndexingTo]);
        setTocurrencyImage(fromTab[findIndexingTo].image);
        swapPrice();
        // setAmount("","");
      }
    }
  };

  const setAmount = async (value, type) => {
    // console.log("value", value, "type", type);
    setvalueFA(value);
    if (value == "0") {
      setmaxValue(false);
    }
    try {
      type == "fromAmount" ? setfromAmount(value) : settoAmount(value);
      var obj = {
        from: appendFromData.currencySymbol,
        to: appendToData.currencySymbol,
      };
      // console.log(
      //   appendFromData.currencySymbol,
      //   appendToData.currencySymbol,
      //   "appendFromData.currencySymbol"
      // );
      // console.log(
      //   appendFromDataref.current.currencySymbol,
      //   appendToDataref.current.currencySymbol,
      //   "appendFromData.currencySymbol"
      // );

      var data = {
        apiUrl: apiService.currencyConversion,
        payload: obj,
      };
      if (fromCurrency != "" && toCurrency != "") {
        var resp = await postMethod(data);
        if (resp.status) {
          var fee = (+value * +appendFromData.swapFee) / 100;
          setEstimationFee(fee);
          var total = +value + fee;
          // console.log("total===", total);
          setTotalAmount(parseFloat(total).toFixed(8));

          // setPrice(resp.Message);
          // console.log("price===", resp.Message);
          if (type == "fromAmount") {
            var amount = Number(resp.Message) * Number(value);
            // console.log("amount===", amount);
            setfromAmount(value);
            settoAmount(parseFloat(amount).toFixed(8));
          } else if (type == "toAmount") {
            var amount = Number(value) / Number(resp.Message);
            setfromAmount(value);
            settoAmount(parseFloat(value).toFixed(8));
          }
        }
      } else {
      }
      if (fromref.current == toref.current) {
        console.log(fromCurrency, "====", toCurrency);
        toast.error("don't Allowed same Currency");
      }
    } catch (error) {}
  };

  const swapAmount = async () => {
    // console.log("iiiniijijijijijio");
    try {
      if (
        appendFromData.currencySymbol != undefined &&
        appendToData.currencySymbol != undefined
      ) {
        if (appendFromData.currencySymbol != appendToData.currencySymbol) {
          if (fromAmountref.current > 0 && toAmount > 0) {
            var obj = {
              from: appendFromData.currencySymbol,
              to: appendToData.currencySymbol,
              from_id: appendFromData.currid,
              to_id: appendToData.currid,
              fromAmount: +fromAmountref.current,
              toAmount: +toAmount,
              fee: +estimateFee,
              withFee: +totatlAmount,
              currentPrice: +priceref.current,
            };

            var data = {
              apiUrl: apiService.swapping,
              payload: obj,
            };
            setButtonLoader(true);
            var resp = await postMethod(data);
            setButtonLoader(false);
            if (resp.status == true) {
              setswapPage("three");
              swaphistory(1);
              toast.success(resp.Message);
              // setfromAmount(0);
              // settoAmount(0);
            } else {
              swaphistory(1);
              toast.error(resp.Message);
            }
          } else {
            toast.error("Please enter amount");
          }
        } else {
          toast.error("Same currency should not allow the swapping");
        }
      } else {
        toast.error("Please choose the swapping currencies");
      }
    } catch (error) {}
  };

  const swaphistory = async (page) => {
    try {
      var payload = {
        perpage: 5,
        page: page,
      };
      var data = {
        apiUrl: apiService.swappingHistory,
        payload: payload,
      };

      var resp = await postMethod(data);
      if (resp.status) {
        setPageloader(false);
        setsessionHistory(resp.data.data);
        setTotalpages(resp.data.total);
      }
    } catch (error) {}
  };

  const handlePageChange = (pageNumber) => {
    swaphistory(pageNumber);
    setCurrentPage(pageNumber);
  };

  const maxBalance = async () => {
    try {
      setmaxValue(true);
      var balance = parseFloat(appendFromData.currencyBalance).toFixed(8);
      var fee = (+balance * +appendFromData.swapFee) / 100;
      fee = parseFloat(fee).toFixed(8);
      var amount = appendFromData.currencyBalance - fee;
      setfromAmount(amount.toFixed(8));
      setAmount(amount.toFixed(8), "fromAmount");
    } catch (error) {}
  };

  const swapPrice = async () => {
    try {
      var obj = {
        from: fromref.current != undefined ? fromref.current : "BTC",
        to: toref.current != undefined ? toref.current : "USDT",
      };
      var data = {
        apiUrl: apiService.currencyConversion,
        payload: obj,
      };
      var resp = await postMethod(data);
      if (resp.status) {
        var balance = +resp.Message * valueFA;
        setAmount(balance.toFixed(8));
        setPrice(resp.Message);
      }
    } catch (error) {}
  };

  const getUserbalance = async () => {
    var data = {
      apiUrl: apiService.getUserBalanceSwap,
    };
    var resp = await getMethod(data);
    if (resp.status) {
      setFromTab(resp.data);
      setToTab(resp.data);
      var currArrayCrypto = [];
      var currArrayFiat = [{ value: "all", label: "" }];
      var data = resp.data;
      for (var i = 0; i < data.length; i++) {
        var obj = {
          value: data[i].currid,
          // label: data[i].currencySymbol,
          key: data[i].currencySymbol,
          text: data[i].currencySymbol,
          image: {
            avatar: true,
            src: data[i].image,
          },
        };
        currArrayFiat.push(obj);
      }
      setToCurrencyRef(currArrayFiat);
      setfromCurrencyRef(currArrayFiat);

      // console.log("currArrayFiat[1]===", currArrayFiat[1]);

      // onSelect(resp.data[0], "fromTab");
      // onSelect(resp.data[2], "toTab");

      setappendFromData(resp.data[0]);
      setFromcurrencyImage(resp.data[0].image);
      setfromCurrency(resp.data[0].currencySymbol);

      settoCurrency(resp.data[2].currencySymbol);
      setappendFToData(resp.data[2]);
      setTocurrencyImage(resp.data[2].image);
      swapPrice();
    } else {
    }
  };

  const handleOnChange_from = (e, data) => {
    if (swapstateref.current == true) {
      // console.log("uhiijijijijijiijij");
      handleOnChange_to("e", e);
      // setAmount(0, "fromAmount");
      // setAmount(0, "toAmount");
    }
    setfromswap(data);
    var findIndexing = fromTab.findIndex((x) => x.currid == data.value);
    // console.log("findIndexing===", findIndexing);
    if (findIndexing != -1) {
      setappendFromData(fromTab[findIndexing]);
      setFromcurrencyImage(fromTab[findIndexing].image);
      setfromCurrency(fromTab[findIndexing].currencySymbol);
      swapPrice();
    }
  };

  const handleOnChange_to = (e, data) => {
    if (swapstateref.current == true) {
      // setAmount(0, "toAmount");
      // setAmount(0, "fromAmount");
    }
    settoswap(data);

    var findIndexingTo = fromTab.findIndex((x) => x.currid == data.value);
    if (findIndexingTo != -1) {
      settoCurrency(fromTab[findIndexingTo].currencySymbol);
      setappendFToData(fromTab[findIndexingTo]);
      setTocurrencyImage(fromTab[findIndexingTo].image);
      swapPrice();
    }
  };

  //===========================================================================//

  const [swapPage, setswapPage] = useState("one");
  const navigate = useNavigate();

  const formSubmit = () => {};
  const swaptab = (value) => {
    if (value == "next") {
      setswapPage("two");
    } else if (value == "back") {
      setswapPage("one");
    }
  };

  const Swap = () => {
    setswapstate(true);
    const temp = fromAmount;
    // settoAmount(temp);
    setfromAmount(toAmount);

    handleOnChange_from(fromswapref.current, toswapref.current);
  };

  return (
    <div className="">
      <main className="main-content tradepage-bg  bg-cover onlywhitee new_login_bb">
        <Header />
        {pageLoader == true ? (
          <Grid item xs={12} sm={12} md={8} lg={12} xl={12}>
            <div className="loading">
              <i className="fa-solid fa-spinner fa-spin-pulse "></i>
            </div>
          </Grid>
        ) : (
          <>
            {swapPage == "one" ? (
              <div className="class-padding" 
                style={{
                                backgroundImage: `url(${DashboardBg})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                minHeight: "calc(100vh - 60px)",
                                marginTop:"-20px",
                              }}
              >
                <Grid
                  container
                  spacing={2}
                  justifyContent={"center"}
                  marginTop={"20px"}
                >
                  {/* Item for xs (extra small) screens */}
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div className="heading_card_new">
                      <h1>
                        Swap the currencies
                        <i className="ri-arrow-right-line"></i>
                      </h1>
                      <div className="object_header">
                        <Button
                          onClick={() => swaptab("next")}
                          className="primary_butn"
                        >
                          Swap Now
                        </Button>
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={8} lg={12} xl={12}>
                    <div className="table_responsive">
                      <div className="table_section">
                        <div className="custom-table">
                          <div className="table-row header">
                            <div className="table-cell">Date/ Time</div>
                            <div className="table-cell">From Currency</div>
                            <div className="table-cell">To Currency</div>
                            <div className="table-cell">Total Amount</div>
                            <div className="table-cell">Fees</div>
                          </div>
                          {sessionHistory.length > 0 ? (
                            sessionHistory &&
                            sessionHistory.map((item, i) => {
                              return (
                                <div className="table-row border_table_row">
                                  <div className="table-cell">
                                    <div className="content_section">
                                      {moment(item.createdDate).format("lll")}
                                    </div>
                                  </div>
                                  <div className="table-cell">
                                    <div className="data_inner flex_image_coloe">
                                      <img
                                        src={item.fromImage}
                                        className="img-fluid"
                                      />
                                      {item.fromCurrency}
                                    </div>
                                  </div>
                                  <div className="table-cell">
                                    <div className="data_inner flex_image_coloe">
                                      <img
                                        src={item.toImage}
                                        className="img-fluid"
                                      />
                                      {item.toCurrency}
                                    </div>
                                  </div>
                                  <div className="table-cell">
                                    <div className="data_inner">
                                      {parseFloat(item.totalAmount).toFixed(8)}
                                    </div>
                                  </div>
                                  <div className="table-cell">
                                    <div className="data_inner">
                                      {parseFloat(item.fee).toFixed(8)}
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div className="table-cell justify-center">
                              <div className="data_inner">No Data Found!</div>
                            </div>
                          )}
                          {sessionHistory.length > 0 ? (
                            <Pagination
                              itemClass="page-item" // add it for bootstrap 4
                              linkClass="page-link" // add it for bootstrap 4
                              activePage={currentPage}
                              itemsCountPerPage={recordPerPage}
                              totalItemsCount={totalPage}
                              pageRangeDisplayed={pageRange}
                              onChange={handlePageChange}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </Grid>
                </Grid>
                {/* Your other components and content */}
              </div>
            ) : swapPage == "two" ? (
              <div className="class-padding" 
                style={{
                                backgroundImage: `url(${DashboardBg})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                minHeight: "calc(100vh - 60px)",
                                marginTop:"-20px",
                              }}
              >
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
                            <Button
                              onClick={() => swaptab("back")}
                              className="back_butn"
                            >
                              <i
                                onClick={() => swaptab("back")}
                                className="ri-arrow-left-line"
                              ></i>{" "}
                              Back
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
                                <div className="form register_login  marhing_pading pl-0 paddinte_ledy_o" style={{ position: "relative", zIndex: 9999 }}>
                                  <form className="form_pading_s">
                                    <div className="form_content payment_form pl-0">
                                      <h1 className="mb-3 Launch_pad_steps m-0 padding_botn padidnr_color">
                                        From
                                      </h1>
                                    </div>
                                    <div className="account_setting">
                                      <div className="form-group groow-1_widut" style={{ position: "relative", zIndex: 100 }}>
                                        <label>Currency</label>
                                        <Dropdown
                                          placeholder="Select Currency"
                                          fluid
                                          selection
                                          options={fromCurrencyRef.current}
                                          onChange={handleOnChange_from}
                                          value={fromswapref.current.value}
                                          className="text_memu swapmenui"
                                          search
                                        />
                                      </div>
                                      <div className="form-group groow-1_widut ">
                                        <label>Amount</label>
                                        <div className="postion_reletitt">
                                        <input
                                          type="number"
                                          min="0"
                                          className="form-control"
                                          id="exampleInputPassword1"
                                          value={fromAmountref.current}
                                          placeholder="Enter Amount"
                                          onChange={(e) =>
                                            setAmount(
                                              e.target.value,
                                              "fromAmount"
                                            )
                                          }
                                        />
                                        <div className="input-group-addon max-btc-btn">
                                        <span className="text-success" onClick={maxBalance}>Max</span>
                                        </div>
                                      
                                        </div>
                                      </div>
                                    </div>
                                    <div className="form-group flex_start_sae">
                                      <p className="preview">
                                        Balance:
                                        <span>
                                          {appendFromData == ""
                                            ? "0.0000"
                                            : parseFloat(
                                                appendFromData.currencyBalance
                                              ).toFixed(8)}{" "}
                                          {appendFromData.currencySymbol}
                                        </span>
                                      </p>
                                    </div>
                                  </form>
                                </div>
                                <div className="text_icon_swap" style={{ position: "relative", zIndex: 100000 }}>
                                  <div className="cicle_section" onClick={Swap}>
                                    <i className="ri-arrow-up-down-line"></i>
                                  </div>
                                </div>
                                <div className="form register_login  marhing_pading pl-0 paddinte_ledy_o" style={{ position: "relative", zIndex: 9998 }}>
                                  <form className="form_pading_s" style={{ position: "relative", zIndex: 9998 }}>
                                    <div className="form_content payment_form pl-0">
                                      <h1 className="mb-3 Launch_pad_steps m-0 padding_botn padidnr_color">
                                        To
                                      </h1>
                                    </div>
                                    <div className="account_setting">
                                      <div className="form-group groow-1_widut" style={{ position: "relative", zIndex: 99999 }}>
                                        <label>Currency</label>
                                        <Dropdown
                                          placeholder="Select Currency"
                                          fluid
                                          selection
                                          options={toCurrencyRef.current}
                                          onChange={handleOnChange_to}
                                          value={toswapref.current.value}
                                          className="text_memu swapmenui"
                                          search
                                        />
                                      </div>
                                      <div className="form-group groow-1_widut ">
                                        <label>Total</label>
                                        <input
                                          type="number"
                                          className="form-control"
                                          min="0"
                                          id="exampleInputPassword1"
                                          placeholder="Total"
                                          value={toAmountref.current}
                                          onChange={(e) =>
                                            setAmount(
                                              e.target.value,
                                              "toAmount"
                                            )
                                          }
                                        />
                                      </div>
                                    </div>
                                  </form>
                                  <div className="aling_caseds" style={{ position: "relative", zIndex: -1 }}>
                                    <button
                                      type="button"
                                      className="btn btn-primary w-100 burdas_buttnd cancel_burdas"
                                      onClick={() => swaptab("back")}
                                    >
                                      Cancel
                                    </button>
                                    {ButtonLoader == false ? (
                                      <button
                                        type="button"
                                        className="btn btn-primary w-100"
                                        onClick={swapAmount}
                                      >
                                        Confirm Swap
                                      </button>
                                    ) : (
                                      <button
                                        type="button"
                                        className="btn btn-primary w-100"
                                      >
                                        Loading...
                                      </button>
                                    )}
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
                                    <form className="form_pading_s">
                                      <div className=" mb-4">
                                        <h4 className="h2_bottomn">Summary</h4>
                                      </div>

                                      <div className="form-group flex_start_sae">
                                        <p className="preview">
                                          <span>Price</span>
                                          {fromref.current != "" ||
                                          toref.current != "" ? (
                                            <span className="!bg-gradient-to-br from-[#00D4FF] to-[#0066FF] !bg-clip-text !text-transparent font-bold text-[20px] leading-[120%]">
                                              {" "}
                                              1{" "}
                                              {fromref.current == "" ||
                                              fromref.current == null ||
                                              fromref.current == undefined
                                                ? "  "
                                                : fromref.current}{" "}
                                              ={" "}
                                              {Number(priceref.current).toFixed(
                                                4
                                              ) == 0
                                                ? 0.0
                                                : Number(
                                                    priceref.current
                                                  ).toFixed(4)}{" "}
                                              {toref.current}{" "}
                                            </span>
                                          ) : (
                                            <span className="bg-gradient-to-br from-[#00D4FF] to-[#0066FF] bg-clip-text text-transparent font-bold text-[20px] leading-[120%]">0.0000</span>
                                          )}
                                        </p>
                                      </div>
                                      <div className="form-group flex_start_sae">
                                        <p className="preview">
                                          <span>Minimum Swap</span>
                                          <span>
                                            {" "}
                                            {appendFromData == "" ? (
                                              <span>0.0000</span>
                                            ) : (
                                              appendFromData.minSwap
                                            )}{" "}
                                          </span>
                                        </p>
                                      </div>
                                      <div className="form-group flex_start_sae">
                                        <p className="preview">
                                          <span>Maximum Swap</span>
                                          <span>
                                            {" "}
                                            {appendFromData == "" ? (
                                              <span>0.0000</span>
                                            ) : (
                                              appendFromData.maxSwap
                                            )}{" "}
                                          </span>
                                        </p>
                                      </div>
                                      <div className="form-group flex_start_sae">
                                        <p className="preview">
                                          <span>
                                            Swap fee (
                                            {appendFromData == ""
                                              ? "0.0%"
                                              : appendFromData.swapFee}{" "}
                                            )
                                          </span>
                                          <span>
                                            {" "}
                                            {estimateFee == 0 ? (
                                              <span>0.0000</span>
                                            ) : (
                                              Number(estimateFee).toFixed(8)
                                            )}{" "}
                                          </span>
                                        </p>
                                      </div>
                                      <div className="form-group flex_start_sae">
                                        <p className="preview">
                                          <span>Total Amount</span>
                                          <span>
                                            {" "}
                                            {totatlAmount == 0 ? (
                                              <span>0.0000</span>
                                            ) : (
                                              Number(totatlAmount).toFixed(4)
                                            )}{" "}
                                          </span>
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
              </div>
            ) : swapPage == "three" ? (
              <div className="class-padding">
                <Grid
                  container
                  spacing={2}
                  justifyContent={"center"}
                  marginTop={"20px"}
                >
                  {/* Item for xs (extra small) screens */}
                  <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                    <div className="card_logoki pading_cardd swap">
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
                                        {+fromAmountref.current}{" "}
                                        {appendFromData.currencySymbol}
                                      </h4>
                                    </div>
                                    <div className="section_class_grs">
                                      <label>To</label>
                                      <h4>
                                        {Number(toAmountref.current).toFixed(4) == 0 ? (
                                          <span>0</span>
                                        ) : (
                                          Number(toAmount).toFixed(4)
                                        )}{" "}
                                        {toref.current}{" "}
                                      </h4>
                                    </div>
                                  </div>
                                </form>
                                <div className="aling_caseds">
                                  <button
                                    type="button"
                                    className="btn btn-primary w-100 burdas_buttnd cancel_burdas "
                                    onClick={() => swaptab("back")}
                                  >
                                    Go to History
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-primary w-100"
                                    onClick={() => swaptab("next")}
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
              </div>
            ) : (
              ""
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default Home;
