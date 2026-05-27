import React, {useEffect} from "react";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";
import Count from "./Countdown";
// import Dropdown from "react-dropdown";
// import "react-dropdown/style.css";
import "rc-slider/assets/index.css";
import Sideheader from "./Sidebarheader";
import useState from "react-usestateref";

import {toast} from "react-toastify";
import apiService from "../core/service/detail";
import {postMethod} from "../core/service/common.api";
import {getMethod} from "../core/service/common.api";
import Pagination from "react-js-pagination";
import Newsideheader from "./Newsideheader";
import moment from "moment";
import Select from "react-select";
import {Dropdown} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

function Home() {
  const options = ["one", "two", "three"];
  const defaultOption = options[0];

  const [fromTab, setFromTab] = useState([]);
  const [toTab, setToTab] = useState([]);
  const [fromCurrency, setfromCurrency, fromref] = useState("BTC");
  const [toCurrency, settoCurrency, toref] = useState("USDT");
  const [appendFromData, setappendFromData] = useState("");
  const [appendToData, setappendFToData] = useState("");
  const [fromcurrencyImage, setFromcurrencyImage] = useState("");
  const [tocurrencyImage, setTocurrencyImage] = useState("");
  const [swapTab, setswapTab] = useState(false);
  const [fromAmount, setfromAmount, fromAmountref] = useState(0);
  const [toAmount, settoAmount] = useState(0);
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

  const [allCurrencyFiat, setfromCurrencyRef, fromCurrencyRef] = useState([]);
  const [toCurrencyRefs, setToCurrencyRef, toCurrencyRef] = useState([]);

  const recordPerPage = 5;
  const pageRange = 5;

  useEffect(() => {
    getUserbalance();
    swaphistory();
  }, [0]);
  const onSelect = async (option, type, o) => {
    console.log("call addreas====", o);
    console.log("call type====", type);

    if (type == "fromTab") {
      var findIndexing = fromTab.findIndex(
        (x) => x.currencySymbol == option.label
      );
      console.log("findIndexing===", findIndexing);
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
    console.log("value", value, "type", type);
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
          console.log("total===", total);
          setTotalAmount(parseFloat(total).toFixed(8));

          // setPrice(resp.Message);
          console.log("price===", resp.Message);
          if (type == "fromAmount") {
            var amount = Number(resp.Message) * Number(value);
            console.log("amount===", amount);
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
            if (resp.status) {
              swaphistory(1);
              toast.success(resp.Message);
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
      var fee =
        (+appendFromData.currencyBalance * +appendFromData.swapFee) / 100;
      var amount = appendFromData.currencyBalance - fee;
      setfromAmount(amount.toFixed(8));
      console.log("=-=-=-=-=-=-=-===-=maxBalance=-=-=-==-=-==-");
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
      var currArrayFiat = [{value: "all", label: ""}];
      var data = resp.data;
      for (var i = 0; i < data.length; i++) {
        var obj = {
          value: data[i].currid,
          label: data[i].currencySymbol,
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

      console.log("currArrayFiat[1]===", currArrayFiat[1]);

      onSelect(resp.data[0], "fromTab");
      onSelect(resp.data[2], "toTab");

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
    console.log("handleOnChange_from", data.value);
    console.log(e);
    // setfromSwapRef(data.value);
    var findIndexing = fromTab.findIndex((x) => x.currid == data.value);
    console.log("findIndexing===", findIndexing);
    if (findIndexing != -1) {
      setappendFromData(fromTab[findIndexing]);
      setFromcurrencyImage(fromTab[findIndexing].image);
      setfromCurrency(fromTab[findIndexing].currencySymbol);
      swapPrice();
    }
  };

  const handleOnChange_to = (e, data) => {
    console.log("handleOnChange_to", data);
    console.log(e);
    // setfromSwapRef(data.value);
    var findIndexingTo = fromTab.findIndex((x) => x.currid == data.value);
    if (findIndexingTo != -1) {
      settoCurrency(fromTab[findIndexingTo].currencySymbol);
      setappendFToData(fromTab[findIndexingTo]);
      setTocurrencyImage(fromTab[findIndexingTo].image);
      swapPrice();
      // setAmount("","");
    }
  };

  return (
    <div>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper">
          <Sideheader />
          <div className="main-panel">
            <div>
              <Newsideheader />
            </div>
            <div className="content-wrapper ">
              <main className="main-content tradepage-bg login_body_ bg-cover ">
                <div className="container pt-5">
                  <div className="row justify-center">
                    <div className="col-lg-10">
                      <div className="staking_title  ">
                        <div>
                          <h1 className="mb-2">Swap the currencies</h1>
                        </div>
                        <div className="form-swap register_login pt-2 seap_form_">
                          <div className="row">
                            <div className="col-lg-6">
                              <form>
                                {/* <div className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="customCheck"
                                    name="example1"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="customCheck"
                                  >
                                    Filter All token With reward{" "}
                                    <a
                                      // onClick={currencylist}
                                      data-toggle="modal"
                                      data-target="#swapmodel"
                                    >
                                      View All
                                    </a>
                                  </label>
                                </div> */}
                                <div>
                                  <div className="form-group">
                                    <label>
                                      From{" "}
                                      <span>
                                        Balance:{" "}
                                        {appendFromData == ""
                                          ? "0.0000"
                                          : parseFloat(
                                              appendFromData.currencyBalance
                                            ).toFixed(8)}{" "}
                                      </span>
                                    </label>
                                    <div className="swap_form_s">
                                      <div className="max-btn_serction">
                                        {maxValue == true ? (
                                          <input
                                            type="number"
                                            placeholder="0.0000"
                                            className="form-control"
                                            value={fromAmountref.current}
                                            onChange={(e) =>
                                              setAmount(
                                                e.target.value,
                                                "fromAmount"
                                              )
                                            }
                                          />
                                        ) : (
                                          <input
                                            type="number"
                                            placeholder="0.0000"
                                            className="form-control"
                                            onChange={(e) =>
                                              setAmount(
                                                e.target.value,
                                                "fromAmount"
                                              )
                                            }
                                          />
                                        )}
                                        <button
                                          type="button"
                                          onClick={maxBalance}
                                          className="max_butn"
                                        >
                                          MAX
                                        </button>
                                      </div>
                                      <div className="swap_img_section">
                                        {/* {fromcurrencyImage == "" ? (
                                          ""
                                        ) : (
                                          <img
                                            src={fromcurrencyImage}
                                            alt="Currency"
                                          ></img>
                                        )} */}
                                        {/* <Select
                                          options={fromCurrencyRef.current}
                                          onChange={(o) =>
                                            onSelect(o, "fromTab")
                                          }
                                          defaultValue={fromref.current}
                                          isSearchable={true}
                                          styles={customStyles}
                                          width="200px"
                                          menuColor="red"
                                        /> */}

                                        <Dropdown
                                          placeholder="Select Coin"
                                          fluid
                                          search
                                          selection
                                          options={fromCurrencyRef.current}
                                          // onChange={(o) =>
                                          //   onSelect(o, "fromTab")
                                          // }
                                          onChange={handleOnChange_from}
                                          className="tex_clas_"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    {/* <div className="span_swap">
                                      <i
                                        className="bi bi-arrow-left-right"
                                        onClick={swaping}
                                      ></i>
                                    </div> */}
                                  </div>
                                  <div className="form-group">
                                    <label>To</label>
                                    <div className="swap_form_s">
                                      <input
                                        type="number"
                                        placeholder="0.0000"
                                        className="form-control input_widyjad"
                                        value={toAmount}
                                        onChange={(e) =>
                                          setAmount(e.target.value, "toAmount")
                                        }
                                      />
                                      <div className="swap_img_section">
                                        {/* {tocurrencyImage == "" ? (
                                          ""
                                        ) : (
                                          <img
                                            src={tocurrencyImage}
                                            alt="Currency"
                                          ></img>
                                        )} */}

                                        {/* <Select
                                          options={toCurrencyRef.current}
                                          onChange={(o) => onSelect(o, "toTab")}
                                          defaultValue={toref.current}
                                          isSearchable={true}
                                          styles={customStyles}
                                        /> */}
                                        <Dropdown
                                          placeholder="Select Coin"
                                          fluid
                                          search
                                          selection
                                          options={toCurrencyRef.current}
                                          onChange={handleOnChange_to}
                                          className="tex_clas_"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="buton">
                                    {ButtonLoader == false ? (
                                      <Button
                                        className="w-100"
                                        onClick={swapAmount}
                                      >
                                        {" "}
                                        Swap{" "}
                                      </Button>
                                    ) : (
                                      <Button className="w-100">
                                        {" "}
                                        Loading{" "}
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </form>
                            </div>
                            <div className="col-lg-6">
                              <div className="summer_swap">
                                <h4>Summary</h4>
                                <p>
                                  <span>Price</span>
                                  {fromref.current != "" &&
                                  toref.current != "" ? (
                                    <span>
                                      {" "}
                                      1 {fromref.current} ={" "}
                                      {Number(priceref.current).toFixed(4) ==
                                      0 ? (
                                        <span>0</span>
                                      ) : (
                                        Number(priceref.current).toFixed(4)
                                      )}{" "}
                                      {toref.current}{" "}
                                    </span>
                                  ) : (
                                    <span>0.0000</span>
                                  )}
                                  {/* <span> 1 {fromCurrency} = {price} {" "} {toCurrency} </span> */}
                                </p>
                                <p>
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
                                <p>
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
                                <p>
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
                                <p>
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
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="profile__wrapper">
                    <div className="sessions">
                      <div className="sessions__section">
                        <div className="sessions__title">swapping History</div>
                        <div className="sessions__table">
                          <div className="sessions__row">
                            <div className="sessions__col">S.No</div>
                            <div className="sessions__col">Date / time</div>
                            <div className="sessions__col">From Currency</div>
                            <div className="sessions__col">To Currency</div>
                            <div className="sessions__col">totalAmount</div>
                            <div className="sessions__col">fee</div>
                          </div>

                          {sessionHistory.length > 0 ? (
                            sessionHistory &&
                            sessionHistory.map((item, i) => {
                              return (
                                <div className="sessions__row">
                                  <div className="sessions__note">{i + 1}</div>
                                  <div className="sessions__col">
                                    <div className="sessions__content">
                                      {moment(item.createdDate).format("lll")}
                                    </div>
                                  </div>
                                  <div className="sessions__col">
                                    <div className="sessions__content">
                                      {item.fromCurrency}
                                    </div>
                                  </div>
                                  <div className="sessions__col">
                                    <div className="sessions__content">
                                      {item.toCurrency}
                                    </div>
                                  </div>
                                  <div className="sessions__col">
                                    <div className="sessions__content">
                                      {parseFloat(item.totalAmount).toFixed(8)}
                                    </div>
                                  </div>
                                  <div className="sessions__col">
                                    <div className="sessions__content">
                                      {parseFloat(item.fee).toFixed(8)}
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <td colSpan="5">
                              <span className="w-100 text-center d-block nodatat">
                                No Data Found!
                              </span>
                            </td>
                          )}
                        </div>
                        <Pagination
                          itemClass="page-item" // add it for bootstrap 4
                          linkClass="page-link" // add it for bootstrap 4
                          activePage={currentPage}
                          itemsCountPerPage={recordPerPage}
                          totalItemsCount={totalPage}
                          pageRangeDisplayed={pageRange}
                          onChange={handlePageChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
