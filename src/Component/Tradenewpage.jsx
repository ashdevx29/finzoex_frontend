import React, { useEffect } from "react";
import useState from "react-usestateref";
import { Button } from "@material-ui/core";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Count from "./Countdown";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "../Styles/homepage.css";
import Header from "./Header";
import Footer from "./Footer";
import { socket } from "./context/socket";
import apiService from "../core/service/detail";
import { getMethod, postMethod } from "../core/service/common.api";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import { toast } from "react-toastify";
import {
  removeAuthToken,
  getAuthToken,
  getSocketToken,
} from "../core/lib/localStorage";
import Pagination from "react-js-pagination";
import isEmpty from "../core/lib/isEmpty";
import { env } from "../core/service/envconfig";
import Moment from "moment";
import $ from "jquery";

function Home() {
  const options = ["one", "two", "three"];
  const [pairlist, setpairlist] = useState([]);
  const [orderbookask, setorderbookask] = useState([]);
  const [orderbookbid, setorderbookbid] = useState([]);
  const [currentlasprice, setcurrentlasprice] = useState("");
  const [searchInputlist, setsearchInputlist, searchInputlistref] = useState(
    []
  );
  const [chartPair, setchartPair] = useState("BTCUSDT");
  const [curnt_Ordertype_tab, setcurnt_Ordertype_tab, curnt_Ordertype_tabref] =
    useState("Limit");
  const [currentPair, setcurrentPair] = useState("BTC_USDT");
  const [fromCurrency, setFromCurrenncy] = useState("");
  const [toCurrency, setToCurrenncy] = useState("");
  const [currentType, setcurrentType] = useState("buy");
  const [frombalance, setFromBalance] = useState(0);
  const [tobalance, settobalance] = useState(0);
  const [checkAuth, setcheckAuth] = useState(false);
  const [pairDetails, setpairDetails, pairDetailsref] = useState("");
  const [pairDet, setpairDet, pairDetref] = useState("");
  const [btntrade1, setbtntrade1] = useState("btntrade1");
  const [btntrade2, setbtntrade2] = useState("btntrade2");
  const [btntrade3, setbtntrade3] = useState("btntrade3");
  const [btntrade4, setbtntrade4] = useState("btntrade4");
  const [orderbookLoader, setorderbookLoader] = useState(false);
  const [orderbookLoaderbid, setorderbookLoaderbit] = useState(false);
  const [pairLoader, setPairLoader] = useState(false);

  const [perpage, setperpage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeOrderDatas, setActiveOders] = useState([]);
  const [tradeHistoryData, settradeHistory] = useState([]);
  // const [alltradeHistoryData, setalltradeHistory] = useState([]);
  const [cancelOrders, setcancelOrders] = useState([]);
  const [pairTickerDetails, setpairTickerDetails] = useState("");
  const [marketPrice, setmarketPrice] = useState(0);
  const [marketTrade, setmarketTrade] = useState([]);
  const [totalactive, settotalactive] = useState(0);
  const [currentPagecan, setCurrentPagecan] = useState(1);
  const [totalcan, settotalcan] = useState(0);
  const [currentPageHis, setcurrentPageHis] = useState(1);
  const [totalHist, settotalHist] = useState(0);
  const [authentication, setauthentication] = useState(false);
  const [searchpair, setsearchpair] = useState(null);
  const [currentpairs, setcurrentpairs, currentpairsref] = useState(null);
  const [allpairslist, setallpairslist, allpairslistref] = useState([]);
  const [orderloader, setorderloader, orderloaderref] = useState(false);
  const [favpair, setfavpair, favpairref] = useState([]);
  const [activemarket, setactivemarket, activemarketref] = useState("");

  const recordPerPage = 5;
  const pageRange = 5;
  const recordPerPagecan = 5;
  const pageRangecan = 5;

  const recordPerPageHist = 5;
  const pageRangeHis = 5;

  const navigate = useNavigate();

  const [theme, setTheme] = useState("Dark");
  const [pair, setPair] = useState("BTC_USDT");
  let tvWidget = null;

  useEffect(() => {
    if (tvWidget !== null) {
      tvWidget.remove();
      tvWidget = null;
    }
    let tokenVerify = localStorage.getItem("user_token");
    if (tokenVerify != "" && tokenVerify != undefined && tokenVerify != null) {
      setauthentication(true);
    } else {
      setauthentication(false);
    }
    async function check() {
      let mecheck = await getAuthToken();
      // let tokenVerify = await localStorage.getItem("user_token");

      var callapi = false;
      if (mecheck != "" && mecheck != undefined && mecheck != null) {
        await setcheckAuth(true);
        callapi = true;
      } else {
        await setcheckAuth(false);
        callapi = false;
      }
      socket.on("loadchartend", async (response) => {
        var myFrame = document.querySelector("iframe");
        if (myFrame != undefined && myFrame != null) {
          myFrame.contentWindow.location.reload(true);
        }
        buildchart(
          localStorage.getItem("theme") == "light" ? "White" : "Dark",
          pair
        );
      });

      var urls = window.location.href;
      var fetchPair = urls.split("trade/")[1];
      if (fetchPair) {
        setcurrentPair(fetchPair);
        var fromcurr = fetchPair.split("_")[0];
        var toCurr = fetchPair.split("_")[1];
        setFromCurrenncy(fromcurr);
        setToCurrenncy(toCurr);
        getCurrpairDatas(fetchPair);
        // fetchTickerPrice(fetchPair);
        getMarketTrades(fetchPair);
        selectPair(fetchPair);
        if (callapi == true) {
          await getUserbalance(fetchPair);
          await getActiveOrders(1, fetchPair);
          await tradeHistory(1);
          getCancelOrders(1);
          get_fav_pair();
          setactivemarket("Fav");
        } else {
          selectPairbyCurrency("USDT");
          setactivemarket("USDT");
        }

        setchartPair(fromcurr + toCurr);
        setPair(fromcurr + "_" + toCurr);
        allpairDatas();
      } else {
        navigate("/");
      }
      socket.connect();
    }
    check();
    // setorderbookLoaderbit(true);
    // setorderbookLoader(true);

    socketInit();
  }, [socket]);

  useEffect(() => {
    fetchTheme();
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const socketInit = async () => {
    socket.off("OrderBook");
    socket.off("TickerPrice");
    socket.off("TradeHistory");
    socket.on("OrderBook", async (response) => {
      var data = await response.data;
      //console.log("OrderBook====",data);
      if (data != null && data != undefined && data != "") {
        if (data.symbol) {
          setorderbookask([]);
          setorderbookbid([]);
          var orderbookbid = [];
          var orderbookask = [];
          orderbookbid = data["bids"].length == 0 ? [] : data["bids"];
          orderbookask = data["asks"].length == 0 ? [] : data["asks"];
          var askcumtotal = 0;
          for (let index = 0; index < orderbookask.length; index++) {
            var element = orderbookask[index];
            var multiply = element[0] * element[1];
            askcumtotal = parseFloat(askcumtotal) + parseFloat(multiply);
            orderbookask[index]["percent"] = (multiply / askcumtotal) * 100;
          }
          var bidcumtotal = 0;
          for (let index = 0; index < orderbookbid.length; index++) {
            var element = orderbookbid[index];
            var multiply = element[0] * element[1];
            bidcumtotal = parseFloat(bidcumtotal) + parseFloat(multiply);
            orderbookbid[index]["percent"] = (multiply / bidcumtotal) * 100;
          }
          //setorderbookLoader(false);
          setorderbookask(
            orderbookask.sort(function (a, b) {
              return b[0] - a[0];
            })
          );
          //setorderbookLoaderbit(false);
          setorderbookbid(
            orderbookbid.sort(function (a, b) {
              return b[0] - a[0];
            })
          );
        }
      }
    });
    socket.on("TickerPrice", async (response) => {
      if (response.data) {
        var tickerdetail = response.data;
        setpairTickerDetails(tickerdetail);
        setmarketPrice(
          tickerdetail.lastprice.lastprice
            ? tickerdetail.lastprice.lastprice
            : 0.0
        );
        if (curnt_Ordertype_tabref.current == "Stop") {
          formValue.price = "";
          formValue.stop_price = tickerdetail.lastprice.lastprice
            ? parseFloat(tickerdetail.lastprice.lastprice).toFixed(
              pairDetailsref.current.price_decimal
            )
            : 0.0;
          //formValue.stop_price = "";
        } else {
          formValue.price = tickerdetail.lastprice.lastprice
            ? parseFloat(tickerdetail.lastprice.lastprice).toFixed(
              pairDetailsref.current.price_decimal
            )
            : 0.0;
        }
      }
    });
    socket.on("TradeHistory", async (response) => {
      var tickerdetail = response.data;
      if (tickerdetail !== null) {
        setmarketTrade(tickerdetail);
      }
    });
    let token_socket = localStorage.getItem("socket_token");
    if (token_socket) {
      let socketToken = token_socket.split("_")[0];
      socket.on("userDetails" + socketToken, async (response) => {
        console.log("emit response pair==", response);
        if (currentPair !== "") {
          console.log("call 1");
          console.log("call currentPair", currentPair);
          getActiveOrders(1, currentPair);
          getUserbalance(currentPair);
          tradeHistory(1);
          getCancelOrders(1);
        } else {
          console.log("call 2");
          var urls = window.location.href;
          var fetchPair = urls.split("trade/")[1];
          console.log("call fetchPair", fetchPair);
          if (fetchPair) {
            setcurrentPair(fetchPair);
            getActiveOrders(1, fetchPair);
            getUserbalance(fetchPair);
            tradeHistory(1);
            getCancelOrders(1);
          }
        }
      });
      socket.on("cancelOrder" + socketToken, async (response) => {
        //toast.success("Your order cancelled by admin, Please try again later");
        if (currentPair !== "") {
          console.log("call 1");
          console.log("call currentPair", currentPair);
          getActiveOrders(1, currentPair);
          getUserbalance(currentPair);
          tradeHistory(1);
          getCancelOrders(1);
        } else {
          console.log("call 2");
          var urls = window.location.href;
          var fetchPair = urls.split("trade/")[1];
          console.log("call fetchPair", fetchPair);
          if (fetchPair) {
            setcurrentPair(fetchPair);
            getActiveOrders(1, fetchPair);
            getUserbalance(fetchPair);
            tradeHistory(1);
            getCancelOrders(1);
          }
        }
      });
    }
    socket.on("close", async (response) => {
      socket.connect();
      socketInit();
    });
  };
  const selectPair = async (pair) => {
    var replace_string = pair.replace("_", "");
    var changelower = replace_string.toLowerCase();
    socket.emit("GetOrderBook", { symbol: changelower });
    setchartPair(replace_string);
    setPair(pair);
    var themevalue =
      localStorage.getItem("theme") == "light" ? "White" : "Dark";
    buildchart(themevalue, pair);
  };

  const getCurrpairDatas = async (pair) => {
    var data = {
      apiUrl: apiService.getCurrpairData,
      payload: { pair: pair },
    };
    var fetchticker = await postMethod(data);
    if (fetchticker.status == true) {
      setpairDetails(fetchticker.data);
      setpairDet(fetchticker.pairdata);
    }
  };
  const [className, setclassName, classNameref] = useState(
    "dropdown-menu pair-show"
  );
  const selectPairbyCurrency = async (curr) => {
    setactivemarket(curr);
    socket.off("DashTickerPrice");
    socket.emit("GetTickerPrice", "getall");
    var data = {
      apiUrl: curr == "Fav" ? apiService.pairbyfav : apiService.pairbycurrency,
      payload: { currency: curr },
    };
    setPairLoader(true);
    var pairdetail = await postMethod(data);

    if (pairdetail.status == true) {
      // setPairLoader(false);
      socket.on("DashTickerPrice", async (response) => {
        var tickarr = await response.data;
        for (let index = 0; index < pairdetail.data.length; index++) {
          const element = pairdetail.data[index];
          var replace_string = element.pair.replace("_", "");
          var changelower = replace_string.toLowerCase();
          if (tickarr[changelower]) {
            var tickobj = JSON.parse(tickarr[changelower]);
            if (tickarr) {
              if (element.pair == tickobj.pair) {
                pairdetail.data[index]["price_change"] =
                  (await tickobj.change_percent)
                    ? parseFloat(tickobj.change_percent).toFixed(4)
                    : 0.0;
                pairdetail.data[index]["lastprice"] = (await tickobj.lastprice
                  .lastprice)
                  ? parseFloat(tickobj.lastprice.lastprice).toFixed(4)
                  : 0.0;
              }
            }
          }
        }
      });

      await setsearchInputlist(pairdetail.data);
      setPairLoader(false);
      if (searchpair != null) {
        setpairlist(
          searchInputlistref.current.filter(function (tag) {
            if (
              tag.liquidity_name
                .toLowerCase()
                .indexOf(searchpair.toLowerCase()) >= 0 ||
              tag.liquidity_name
                .toLowerCase()
                .indexOf(searchpair.toLowerCase()) >= 0
            ) {
              return tag;
            }
          })
        );
      } else {
        await setpairlist(pairdetail.data);
        await setsearchInputlist(pairdetail.data);
        setPairLoader(false);
      }
    }
  };

  async function handleInputChange(event) {
    if (event.target.value.indexOf("_") > 0) {
      var searchval = event.target.value.replace("_", "");
      setcurrentpairs(event.target.value);
      pair_change();
      setpairlist(
        allpairslistref.current.filter(function (tag) {
          if (
            tag.liquidity_name.toLowerCase().indexOf(searchval.toLowerCase()) >=
            0 ||
            tag.liquidity_name.toLowerCase().indexOf(searchval.toLowerCase()) >=
            0
          ) {
            return tag;
          }
        })
      );
    } else {
      setsearchpair(event.target.value);
      setpairlist(
        searchInputlistref.current.filter(function (tag) {
          if (
            tag.liquidity_name
              .toLowerCase()
              .indexOf(event.target.value.toLowerCase()) >= 0 ||
            tag.liquidity_name
              .toLowerCase()
              .indexOf(event.target.value.toLowerCase()) >= 0
          ) {
            return tag;
          }
        })
      );
    }
  }

  //------trade forms--------//

  const type_Ordertab_change = async (orderType) => {
    try {
      if (orderType == "Stop") {
        formValue.price = "";
        formValue.stop_price = parseFloat(marketPrice).toFixed(
          pairDetailsref.current.price_decimal
        );
        //formValue.price = "";
      }
      setcurnt_Ordertype_tab(orderType);
    } catch (error) {
      toast.error("Please try later");
    }
  };

  const pairChange = async (pair) => {
    try {
      setPairLoader(true);
      navigate("/trade/" + pair.pair);
      setcurrentPair(pair.pair);
      getCurrpairDatas(pair.pair);

      var indexPage = pairlist.findIndex((x) => x.pair == pair.pair);
      if (indexPage != -1) {
        var getPair = pairlist[indexPage];
        var fromcurr = getPair.pair.split("_")[0];
        var toCurr = getPair.pair.split("_")[1];
        setFromCurrenncy(fromcurr);
        setToCurrenncy(toCurr);
        if (checkAuth === true) {
          getUserbalance(pair.pair);
          getCancelOrders(1);
          getActiveOrders(1, pair.pair);
        }
        getCurrpairDatas(getPair.pair);
        fetchTickerPrice(getPair.pair);
        getMarketTrades(getPair.pair);
        setPair(getPair.pair);
        setPairLoader(false);
        var themevalue =
          localStorage.getItem("theme") == "light" ? "White" : "Dark";
        buildchart(themevalue, getPair.pair);
      }
    } catch (error) { }
  };

  const type_tab_change = async (type) => {
    try {
      setcurrentType(type);
      formValue.amount = "";
      formValue.total = "";
      setbtntrade1("btntrade");
      setbtntrade3("btntrade");
      setbtntrade4("btntrade");
      setbtntrade2("btntrade");
    } catch (error) { }
  };

  const getUserbalance = async (pair) => {
    var obj = {
      pair: pair,
    };
    var data = {
      apiUrl: apiService.getparUserBalance,
      payload: obj,
    };
    var resp = await postMethod(data);
    if (resp.status) {
      var getFromBalance = resp.data.fromCurrency;
      var getToBalance = resp.data.toCurrency;
      setFromBalance(getFromBalance.totalBalance);
      settobalance(getToBalance.totalBalance);
      // setbalanceDetails(resp.Message);
    } else {
    }
  };

  const pair_change = async () => {
    try {
      if (currentpairsref.current.indexOf("_") > 0) {
        var pairname = currentpairsref.current;
        var indexPage = pairlist.findIndex((x) => x.pair == pairname);
        if (indexPage != -1) {
          setPairLoader(true);
          navigate("/trade/" + pairname);
          setcurrentPair(pairname);
          getCurrpairDatas(pairname);
          var getPair = pairlist[indexPage];
          var fromcurr = getPair.pair.split("_")[0];
          var toCurr = getPair.pair.split("_")[1];
          setFromCurrenncy(fromcurr);
          setToCurrenncy(toCurr);
          if (checkAuth === true) {
            getUserbalance(pair.pair);
            getCancelOrders(1);
            getActiveOrders(1, pair.pair);
          }
          getCurrpairDatas(getPair.pair);
          // fetchTickerPrice(getPair.pair);
          getMarketTrades(getPair.pair);
          setPair(getPair.pair);
          setPairLoader(false);
          var themevalue =
            localStorage.getItem("theme") == "light" ? "White" : "Dark";
          buildchart("Dark", getPair.pair);
        }
      }
    } catch (error) { }
  };

  const allpairDatas = async () => {
    var data = {
      apiUrl: apiService.allpairs,
    };
    var allpairs = await getMethod(data);
    if (allpairs) {
      setallpairslist(allpairs.data);
    }
  };

  const initialFormValue = {
    price: "",
    amount: "",
    total: "",
    stop_price: "",
  };
  const [formValue, setFormValue] = useState(initialFormValue);
  const [loader, setLoader] = useState();

  const { price, amount, total, stop_price } = formValue;

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    let formData = { ...formValue, ...{ [name]: value } };
    if (curnt_Ordertype_tabref.current == "Limit") {
      let totalPrice = formData.price * formData.amount;
      formData = {
        ...formData,
        ...{ ["total"]: parseFloat(totalPrice).toFixed(8) },
      };
    } else if (curnt_Ordertype_tabref.current == "Market") {
      let totalPrice = +marketPrice * formData.amount;

      formData = {
        ...formData,
        ...{ ["total"]: parseFloat(totalPrice).toFixed(8) },
      };
    } else {
      let totalPrice = formData.stop_price * formData.amount;
      formData = {
        ...formData,
        ...{ ["total"]: parseFloat(totalPrice).toFixed(8) },
      };
    }

    if (formData.price < 0) {
      toast.error("Enter valid price");
    }
    if (formData.amount < 0) {
      toast.error("Enter valid amount");
    }
    console.log("formData==", formData);
    setFormValue(formData);
  };

  const orderPlace = async (ordertype, ordertab) => {
    try {
      setorderloader(true);
      var checkPrice = 0;
      if (ordertype == "Limit") {
        checkPrice = formValue.price;
      } else if (ordertype == "Market") {
        checkPrice = marketPrice;
      } else {
        checkPrice = formValue.price;
      }
      if (formValue.amount > 0 && checkPrice > 0 && total) {
        if (ordertab == "buy") {
          // if(frombalance >= total){
          if (ordertype == "Limit") {
            var orderData = {
              amount: parseFloat(formValue.amount),
              price: parseFloat(formValue.price),
              total: parseFloat(total),
              type: ordertab,
              orderType: ordertype,
              fromCurrency: fromCurrency,
              toCurrency: toCurrency,
              pair: currentPair,
              stop_price: 0,
              pair_id: pairDetailsref.current._id,
              fromCurr_id: pairDetailsref.current.from_symbol_id,
              toCurr_id: pairDetailsref.current.to_symbol_id,
            };
          }
          if (ordertype == "Market") {
            var orderData = {
              amount: parseFloat(formValue.amount),
              price: parseFloat(marketPrice),
              total: marketPrice * parseFloat(formValue.amount),
              type: ordertab,
              orderType: ordertype,
              fromCurrency: fromCurrency,
              toCurrency: toCurrency,
              pair: currentPair,
              stop_price: 0,
              pair_id: pairDetailsref.current._id,
              fromCurr_id: pairDetailsref.current.from_symbol_id,
              toCurr_id: pairDetailsref.current.to_symbol_id,
            };
          }

          if (ordertype == "Stop") {
            var orderData = {
              amount: parseFloat(formValue.amount),
              price: parseFloat(formValue.price),
              total: formValue.price * parseFloat(formValue.amount),
              type: ordertab,
              orderType: ordertype,
              fromCurrency: fromCurrency,
              toCurrency: toCurrency,
              pair: currentPair,
              stop_price: parseFloat(formValue.stop_price),
              pair_id: pairDetailsref.current._id,
              fromCurr_id: pairDetailsref.current.from_symbol_id,
              toCurr_id: pairDetailsref.current.to_symbol_id,
            };
          }

          var data = {
            apiUrl: apiService.orderPlaceapi,
            payload: orderData,
          };
          var resp = await postMethod(data);
          if (resp.status) {
            setorderloader(false);
            formValue.amount = "";
            fetchTickerPrice(currentPair);
            //   if(curnt_Ordertype_tabref.current=="Stop")
            //    {
            //  // formValue.stop_price = marketPrice;
            //   formValue.price = "";
            //    }
            //    else
            //    {
            //       formValue.price = marketPrice;
            //    }
            formValue.total = "";
            getActiveOrders(1, currentPair);
            toast.success(resp.Message);
            getUserbalance(currentPair);
          } else {
            setorderloader(false);
            formValue.amount = "";
            fetchTickerPrice(currentPair);
            //   if(curnt_Ordertype_tabref.current=="Stop")
            //    {
            //  // formValue.stop_price = marketPrice;
            //   formValue.price = "";
            //    }
            //    else
            //    {
            //       formValue.price = marketPrice;
            //    }
            formValue.total = "";
            toast.error(resp.Message);
          }
          // }else{
          //   toast.error("insufficient funds");
          // }
        } else {
          // if(frombalance >= amount ){
          if (ordertype == "Limit") {
            var orderData = {
              amount: parseFloat(formValue.amount),
              price: parseFloat(formValue.price),
              total: parseFloat(total),
              type: ordertab,
              orderType: ordertype,
              fromCurrency: fromCurrency,
              toCurrency: toCurrency,
              pair: currentPair,
              stop_price: 0,
              pair_id: pairDetailsref.current._id,
              fromCurr_id: pairDetailsref.current.from_symbol_id,
              toCurr_id: pairDetailsref.current.to_symbol_id,
            };
          }
          if (ordertype == "Market") {
            var orderData = {
              amount: parseFloat(formValue.amount),
              price: parseFloat(marketPrice),
              total: marketPrice * parseFloat(formValue.amount),
              type: ordertab,
              orderType: ordertype,
              fromCurrency: fromCurrency,
              toCurrency: toCurrency,
              pair: currentPair,
              stop_price: 0,
              pair_id: pairDetailsref.current._id,
              fromCurr_id: pairDetailsref.current.from_symbol_id,
              toCurr_id: pairDetailsref.current.to_symbol_id,
            };
          }
          if (ordertype == "Stop") {
            var orderData = {
              amount: parseFloat(formValue.amount),
              price: parseFloat(formValue.price),
              total: formValue.price * parseFloat(formValue.amount),
              type: ordertab,
              orderType: ordertype,
              fromCurrency: fromCurrency,
              toCurrency: toCurrency,
              pair: currentPair,
              stop_price: parseFloat(formValue.stop_price),
              pair_id: pairDetailsref.current._id,
              fromCurr_id: pairDetailsref.current.from_symbol_id,
              toCurr_id: pairDetailsref.current.to_symbol_id,
            };
          }

          var data = {
            apiUrl: apiService.orderPlaceapi,
            payload: orderData,
          };

          var resp = await postMethod(data);
          if (resp.status) {
            setorderloader(false);
            toast.success(resp.Message);
            formValue.amount = "";
            fetchTickerPrice(currentPair);
            // if(curnt_Ordertype_tabref.current=="Stop")
            //  {
            //   console.log("marketPrice====",marketPrice)
            // //formValue.stop_price = marketPrice;
            // formValue.price = "";
            // console.log("stop_price====",formValue.stop_price)

            //  }
            //  else
            //  {
            //     formValue.price = marketPrice;
            //  }
            formValue.total = "";
            getActiveOrders(1, currentPair);
            getUserbalance(currentPair);
          } else {
            setorderloader(false);
            formValue.amount = "";
            // if(curnt_Ordertype_tabref.current=="Stop")
            //  {
            // //formValue.stop_price = marketPrice;
            // formValue.price = "";
            //  }
            //  else
            //  {
            //     formValue.price = marketPrice;
            //  }
            formValue.total = "";
            toast.error(resp.Message);
          }
          // }else{
          //   toast.error("insufficient funds");
          // }
        }
      } else {
        toast.error("Enter all fields");
        setorderloader(false);
      }
    } catch (error) {
      toast.error("Please try again later");
      setorderloader(false);
    }
  };

  const buy_sell_percentage = (percentage) => {
    if (checkAuth == true) {
      if (percentage == 25) {
        setbtntrade1("btntrade active");
        setbtntrade3("btntrade");
        setbtntrade4("btntrade");
        setbtntrade2("btntrade");
      }
      if (percentage == 50) {
        setbtntrade1("btntrade");
        setbtntrade3("btntrade");
        setbtntrade4("btntrade");
        setbtntrade2("btntrade active");
      }
      if (percentage == 75) {
        setbtntrade3("btntrade active");
        setbtntrade1("btntrade");
        setbtntrade4("btntrade");
        setbtntrade2("btntrade");
      }
      if (percentage == 100) {
        setbtntrade4("btntrade active");
        setbtntrade1("btntrade");
        setbtntrade3("btntrade");
        setbtntrade2("btntrade");
      }

      if (currentType == "buy") {
        var total = (+percentage * +tobalance) / 100;
        if (total <= 0) {
          toast.error("Quantity canot be less than 0.0000");
        }
        var amt = total / +marketPrice;
        formValue.amount = amt.toFixed(4);
        formValue.total = +total.toFixed(4);
      } else if (currentType == "sell") {
        var total = (+percentage * +frombalance) / 100;
        if (total <= 0) {
          toast.error("Quantity canot be less than 0.00000000");
        }
        var tot = total * +marketPrice;
        formValue.amount = total.toFixed(4);
        formValue.total = +tot.toFixed(4);
      }
    } else {
      toast.error("Login to continue !");
    }
  };

  const getActiveOrders = async (pages, getpair) => {
    try {
      var obj = {
        FilPerpage: perpage,
        FilPage: pages,
        pair: getpair,
      };
      var data = {
        apiUrl: apiService.getActiveOrders,
        payload: obj,
      };
      var resp = await postMethod(data);
      if (resp.status) {
        settotalactive(resp.count);
        setActiveOders(resp.result);
      } else {
      }
    } catch (error) { }
  };

  const tradeHistory = async (pages) => {
    try {
      var obj = {
        FilPerpage: perpage,
        FilPage: pages,
        pair: pairDetailsref.current.pair,
      };
      var data = {
        apiUrl: apiService.tradeHistory,
        payload: obj,
      };
      var resp = await postMethod(data);
      if (resp.status) {
        settradeHistory(resp.result);
        settotalHist(resp.count);
      } else {
      }
    } catch (error) { }
  };

  const getCancelOrders = async (pages) => {
    try {
      var obj = {
        FilPerpage: perpage,
        FilPage: pages,
        pair: currentPair,
      };
      var data = {
        apiUrl: apiService.getCancelOrders,
        payload: obj,
      };
      var resp = await postMethod(data);
      if (resp.status) {
        setcancelOrders(resp.result);
        settotalcan(resp.count);
      } else {
      }
    } catch (error) { }
  };

  //========FETCH TICKER PRICE ==========//

  const fetchTickerPrice = async (pair) => {
    console.log("fetchTickerPrice pair===", pair);
    try {
      var data = {
        apiUrl: apiService.fetch_tickers,
        payload: { pair: pair },
      };
      var fetchticker = await postMethod(data);
      if (fetchticker) {
        var data = await fetchticker.data;
        setpairTickerDetails(data);
        setmarketPrice(
          data.lastprice.lastprice ? data.lastprice.lastprice : 0.0
        );
        if (curnt_Ordertype_tabref.current == "Stop") {
          formValue.price = "";
          formValue.stop_price = data.lastprice.lastprice
            ? parseFloat(data.lastprice.lastprice).toFixed(
              pairDetailsref.current.price_decimal
            )
            : 0.0;
          //formValue.stop_price = "";
        } else {
          formValue.price = data.lastprice.lastprice
            ? parseFloat(data.lastprice.lastprice).toFixed(
              pairDetailsref.current.price_decimal
            )
            : 0.0;
        }
      }
    } catch (error) { }
  };

  // ================FETCH MARKET =============//

  const getMarketTrades = async (pair) => {
    try {
      var data = {
        apiUrl: apiService.marketTrades,
        payload: { pair: pair },
      };
      var fetchTradeHisotory = await postMethod(data);
      if (fetchTradeHisotory) {
        if (fetchTradeHisotory.status) {
          setmarketTrade(fetchTradeHisotory.Message);
        } else {
          setmarketTrade([]);
        }
      } else {
      }
    } catch (error) { }
  };
  const activePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // call API to get data based on pageNumber
    getActiveOrders(pageNumber, "");
  };

  const cancelPageChange = (pageNumber) => {
    setCurrentPagecan(pageNumber); // call API to get data based on pageNumber
    getCancelOrders(pageNumber);
  };

  const orderhistoryactive = (pageNumber) => {
    setcurrentPageHis(pageNumber); // call API to get data based on pageNumber
    tradeHistory(pageNumber);
  };

  const orderCancel = async (cancelDatas) => {
    try {
      var obj = {
        _id: cancelDatas._id,
      };
      var data = {
        apiUrl: apiService.cancelOrder,
        payload: obj,
      };
      var fetchTradeHisotory = await postMethod(data);
      if (fetchTradeHisotory) {
        toast.success(
          "Order cancelled successfully, your amount credit to your wallet"
        );
        getActiveOrders(1, currentPair);
        getUserbalance(currentPair);
      } else {
        toast.error("Please try again later");
      }
    } catch (error) {
      toast.error("Please try again later");
    }
  };

  const callCancelOrder = async () => {
    if (checkAuth === true) {
      getCancelOrders(1);
    }
  };

  const clickMarketTrade = async () => {
    if (checkAuth === true) {
      getMarketTrades(currentPair);
    }
  };

  const callOrdehistory = async () => {
    if (checkAuth === true) {
      tradeHistory(1);
    }
  };

  const getLanguageFromURL = () => {
    const regex = new RegExp("[\\?&]lang=([^&#]*)");
    const results = regex.exec(window.location.search);
    return results === null
      ? null
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  };

  const getChartLibraryPath = () => {
    const base = import.meta.env.BASE_URL || "/";
    return new URL("charting_library/", new URL(base, `${window.location.origin}/`)).toString();
  };

  const waitForTradingView = (callback, retryCount = 40) => {
    if (
      window.TradingView &&
      window.Datafeeds &&
      window.Datafeeds.UDFCompatibleDatafeed
    ) {
      callback();
      return;
    }

    if (retryCount <= 0) {
      console.error("TradingView chart libraries are not ready yet.");
      return;
    }

    setTimeout(() => waitForTradingView(callback, retryCount - 1), 250);
  };

  const buildchart = (theme, pair) => {
    if (!window.TradingView || !window.Datafeeds || !window.Datafeeds.UDFCompatibleDatafeed) {
      waitForTradingView(() => buildchart(theme, pair));
      return;
    }

    const widgetOptions = {
      symbol: pair,
      // BEWARE: no trailing slash is expected in feed URL
      datafeed: new window.Datafeeds.UDFCompatibleDatafeed(
        env.apiHost + "chartapi/chart"
      ),
      interval: pair == "USDT_INR" ? "240" : "30",
      container_id: "tv_chart_container",
      library_path: getChartLibraryPath(),

      locale: getLanguageFromURL() || "en",
      disabled_features: ["use_localstorage_for_settings"],
      enabled_features: ["study_templates"],
      charts_storage_url: "",
      charts_storage_api_version: "1.1",
      client_id: "tradingview.com",
      user_id: "public_user_id",
      fullscreen: false,
      //autosize: true,
      width: "100%",
      height: "518",
      studies_overrides: {},
      loading_screen: { backgroundColor: "#181818" },
      theme: theme,
      toolbar_bg: "#181818",
      timezone: "Asia/Kolkata",
      overrides: {
        // "symbolWatermarkProperties.color": "#000657",
        "paneProperties.background": "#181818",
        "paneProperties.vertGridProperties.color": "transparent",
        "paneProperties.horzGridProperties.color": "transparent",
      },
    };

    if (theme == "White") {
      delete widgetOptions.toolbar_bg;
      delete widgetOptions.overrides;
    }

    const tvWidget = new window.TradingView.widget(widgetOptions);

    tvWidget.onChartReady(() => {
      tvWidget.headerReady().then(() => {
        const button = tvWidget.createButton();
        button.setAttribute("title", "Click to show a notification popup");
        button.classList.add("apply-common-tooltip");
        button.addEventListener("click", () =>
          tvWidget.showNoticeDialog({
            title: "Notification",
            body: "TradingView Charting Library API works correctly",
            callback: () => {
              console.log("Noticed!");
            },
          })
        );

        // button.innerHTML = 'Check API';
      });
    });
  };

  const fetchTheme = () => {
    var theme = localStorage.getItem("theme");
    if (theme != undefined) {
      if (theme == "light") {
        setTheme("White");
      } else {
        setTheme("Dark");
      }
    } else {
      localStorage.setItem("theme", "dark");
      setTheme("Dark");
    }
    if (!isEmpty(pair)) {
      let symbol = pair;
      let themeValue = "Dark";
      if (theme == "light") {
        themeValue = "White";
      } else if (theme == "dark") {
        themeValue = "Dark";
      }
      buildchart(themeValue, symbol);
    }
  };

  const add_fav_pair = async (pair) => {
    var data = {
      apiUrl: apiService.add_fav,
      payload: { pair_id: pair },
    };
    var addfav = await postMethod(data);
    if (addfav.status) {
      if (activemarket.current == "Fav") {
        selectPairbyCurrency("Fav");
      }
      setfavpair(addfav.data);
    }
  };

  const get_fav_pair = async () => {
    var data = {
      apiUrl: apiService.get_fav,
    };
    var getfav = await getMethod(data);
    console.log("getfav", getfav);
    if (getfav.status) {
      setfavpair(getfav.data);
      selectPairbyCurrency("Fav");
    }
  };

  const loadChart = (value) => {
    try {
      console.log(value, "value==", pair);
    } catch (error) { }
  };

  return (
    <div className="">
      <main className="main-content tradepage-bg tradeee">
        {/* <Header /> */}
        <div className="container">
          <div className="row">
            <div className="col-lg-12 trade-colpading trade-colpadingheader">
              <div className="market_palace trade_chart222">
                <div className="price_section">
                  <div className="">
                    <div className="dropdown class_pair_table">
                      <div className="dropdown show pair_selelction test show">
                        {/* <button>{currentPair}</button> */}

                        {/* <img
                          src={new URL("../img/New_images/color.png", import.meta.url).href}
                          className=""
                        /> */}
                        {pairDetref.current?.from_symbol_id != null ? (
                          <>
                            <img
                              src={
                                pairDetref.current?.from_symbol_id?.Currency_image
                              }
                              className=""
                              width={32}
                              height={32}
                            />
                            <a
                              className="btn btn-secondary dropdown-toggle"
                              // href="#"
                              onClick={() =>
                                setclassName("dropdown-menu pair-show show")
                              }
                              // role="button"
                              id="dropdownMenuLink"
                              data-toggle="dropdown"
                            // aria-haspopup="true"
                            // aria-expanded="false"
                            >
                              {pairDetailsref.current.from_symbol} /{" "}
                              {pairDetailsref.current.to_symbol}
                            </a>
                          </>
                        ) : (
                          ""
                        )}
                        <div
                          className={classNameref.current}
                        // aria-labelledby="dropdownMenuLink"
                        >
                          <div className="">
                            <div className="search_option">
                              <input
                                type="text"
                                placeholder="Search Pair"
                                onChange={handleInputChange}
                              />
                              <i className="bi bi-search"></i>
                            </div>
                          </div>
                          <div className="tabs_secion_nre_search">
                            <ul className="nav nav-tabs">
                              {checkAuth ? (
                                <>
                                  <li className="active">
                                    <a
                                      data-toggle="tab"
                                      href="#fav"
                                      className="active"
                                      onClick={() =>
                                        selectPairbyCurrency("Fav")
                                      }
                                    >
                                      <i className="ri-star-fill"></i>
                                    </a>
                                  </li>
                                  <li>
                                    {/* <a
                                      data-toggle="tab"
                                      href="#inr"
                                      className=""
                                      onClick={() =>
                                        selectPairbyCurrency("INR")
                                      }
                                    >
                                      INR
                                    </a> */}

                                       <a
                                      data-toggle="tab"
                                      href="#inr"
                                      className=""
                                      onClick={() =>
                                        selectPairbyCurrency("USDT")
                                      }
                                    >
                                      USDT
                                    </a>
                                  </li>
                                </>
                              ) : (
                                // <li className="active">
                                //   <a
                                //     data-toggle="tab"
                                //     href="#inr"
                                //     className="active"
                                //     onClick={() => selectPairbyCurrency("INR")}
                                //   >
                                //     INR
                                //   </a>
                                // </li>

                                <li className="active">
                                  <a
                                    data-toggle="tab"
                                    href="#usdt"
                                    className="active"
                                    onClick={() => selectPairbyCurrency("USDT")}
                                  >
                                    USDT
                                  </a>
                                </li>
                              )}

                              {/* <li>
                                <a
                                  data-toggle="tab"
                                  href="#usdt"
                                  onClick={() => selectPairbyCurrency("USDT")}
                                >
                                  USDT
                                </a>
                              </li> */}
                              <li>
                                <a
                                  data-toggle="tab"
                                  href="#bnb"
                                  onClick={() => selectPairbyCurrency("BNB")}
                                >
                                  BNB
                                </a>
                              </li>
                              <li>
                                <a
                                  data-toggle="tab"
                                  href="#btc"
                                  onClick={() => selectPairbyCurrency("BTC")}
                                >
                                  BTC
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="tab-content">
                            {checkAuth ? (
                              <>
                                <div
                                  id="fav"
                                  className="tab-pane fade in active show"
                                >
                                  <div>
                                    <div className="fixTableHead w-100">
                                      <table>
                                        <thead>
                                          <tr>
                                            <th className="text-left">Pair</th>
                                            <th>Last price</th>
                                            <th>Change</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {favpairref.current.length > 0 ? (
                                            pairlist.length > 0 ? (
                                              pairlist.map((obj, i) => {
                                                return favpairref.current.includes(
                                                  obj._id
                                                ) ? (
                                                  <tr
                                                    onClick={() =>
                                                      pairChange(obj)
                                                    }
                                                  >
                                                    <td
                                                      onClick={() =>
                                                        selectPair(obj.pair)
                                                      }
                                                    >
                                                      <span className="img_pair">
                                                        {" "}
                                                        {favpairref.current
                                                          .length > 0 ? (
                                                          favpairref.current.includes(
                                                            obj._id
                                                          ) ? (
                                                            <i
                                                              className="ri-star-fill fav mr-3"
                                                              style={{
                                                                color:
                                                                  "#00D4FF",
                                                              }}
                                                              onClick={() =>
                                                                add_fav_pair(
                                                                  obj._id
                                                                )
                                                              }
                                                            ></i>
                                                          ) : (
                                                            <i
                                                              className="ri-star-fill mr-3"
                                                              onClick={() =>
                                                                add_fav_pair(
                                                                  obj._id
                                                                )
                                                              }
                                                            ></i>
                                                          )
                                                        ) : (
                                                          <i
                                                            className="ri-star-fill mr-3"
                                                            onClick={() =>
                                                              add_fav_pair(
                                                                obj._id
                                                              )
                                                            }
                                                          ></i>
                                                        )}
                                                        {obj.from_symbol} /{" "}
                                                        {obj.to_symbol}
                                                      </span>
                                                    </td>
                                                    <td>
                                                      {obj.last_price <= 0 ? (
                                                        <span className="text-red">
                                                          {obj.lastprice==""||obj.lastprice==null||obj.lastprice=="NaN"||obj.lastprice==undefined?0.000:
                                                          parseFloat(
                                                            obj.lastprice
                                                          ).toFixed(
                                                            pairDetailsref
                                                              .current
                                                              .price_decimal
                                                          )
                                              }
                                                        </span>
                                                      ) : (
                                                        <span className="text-green">
                                                          
                                                          {obj.lastprice==""||obj.lastprice==null||obj.lastprice=="NaN"||obj.lastprice==undefined?0.000:
                                                          parseFloat(
                                                            obj.lastprice
                                                          ).toFixed(
                                                            pairDetailsref
                                                              .current
                                                              .price_decimal
                                                          )}
                                                        </span>
                                                      )}
                                                    </td>
                                                    <td>
                                                      {obj.price_change <= 0 ? (
                                                        <span className="text-red">
                                                          {obj.price_change}%
                                                        </span>
                                                      ) : (
                                                        <span className="text-green">
                                                          {obj.price_change}%
                                                        </span>
                                                      )}
                                                    </td>
                                                  </tr>
                                                ) : (
                                                  ""
                                                );
                                              })
                                            ) : (
                                              ""
                                            )
                                          ) : (
                                            <tr>
                                              <td colSpan="3">
                                                No results found
                                              </td>
                                            </tr>
                                          )}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                                <div id="inr" className="tab-pane fade">
                                  <div>
                                    <div className="fixTableHead w-100">
                                      <table>
                                        <thead>
                                          <tr>
                                            <th className="text-left">Pair</th>
                                            <th>Last price</th>
                                            <th>Change</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {/* <tr>
                                        <td>
                                          <span className="img_pair">
                                            {" "}
                                            <i className="ri-star-fill mr-3"></i>
                                            BTC_SHIB
                                          </span>
                                        </td>
                                        <td>
                                          <span className="text-green">+2%</span>
                                        </td>
                                        <td>
                                          <span className="text-red">+0%</span>
                                        </td>
                                      </tr> */}
                                          {pairlist.length > 0 ? (
                                            pairlist.map((obj, i) => {
                                              return (
                                                <tr
                                                  onClick={() =>
                                                    pairChange(obj)
                                                  }
                                                >
                                                  <td
                                                    onClick={() =>
                                                      selectPair(obj.pair)
                                                    }
                                                  >
                                                    <span className="img_pair">
                                                      {" "}
                                                      {favpairref.current
                                                        .length > 0 ? (
                                                        favpairref.current.includes(
                                                          obj._id
                                                        ) ? (
                                                          <i
                                                            className="ri-star-fill fav mr-3"
                                                            style={{
                                                              color: "#00D4FF",
                                                            }}
                                                            onClick={() =>
                                                              add_fav_pair(
                                                                obj._id
                                                              )
                                                            }
                                                          ></i>
                                                        ) : (
                                                          <i
                                                            className="ri-star-fill mr-3"
                                                            onClick={() =>
                                                              add_fav_pair(
                                                                obj._id
                                                              )
                                                            }
                                                          ></i>
                                                        )
                                                      ) : (
                                                        <i
                                                          className="ri-star-fill mr-3"
                                                          onClick={() =>
                                                            add_fav_pair(
                                                              obj._id
                                                            )
                                                          }
                                                        ></i>
                                                      )}
                                                      {obj.from_symbol} /{" "}
                                                      {obj.to_symbol}
                                                    </span>
                                                  </td>
                                                  <td>
                                                    {obj.last_price <= 0 ? (
                                                      <span className="text-red">
                                                        {parseFloat(
                                                          obj.lastprice
                                                        ).toFixed(
                                                          pairDetailsref.current
                                                            .price_decimal
                                                        )}
                                                      </span>
                                                    ) : (
                                                      <span className="text-green">
                                                        {parseFloat(
                                                          obj.lastprice
                                                        ).toFixed(
                                                          pairDetailsref.current
                                                            .price_decimal
                                                        )}
                                                      </span>
                                                    )}
                                                  </td>
                                                  <td>
                                                    {obj.price_change <= 0 ? (
                                                      <span className="text-red">
                                                        {obj.price_change}%
                                                      </span>
                                                    ) : (
                                                      <span className="text-green">
                                                        {obj.price_change}%
                                                      </span>
                                                    )}
                                                  </td>
                                                </tr>
                                              );
                                            })
                                          ) : (
                                            <tr>
                                              <td colspan="3">
                                                No results found
                                              </td>
                                            </tr>
                                          )}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              // <div
                              //   id="inr"
                              //   className="tab-pane fade in active show"
                              // >
                              //   <div>
                              //     <div className="fixTableHead w-100">
                              //       <table>
                              //         <thead>
                              //           <tr>
                              //             <th className="text-left">Pair</th>
                              //             <th>Last price</th>
                              //             <th>Change</th>
                              //           </tr>
                              //         </thead>
                              //         <tbody>
                              //           {/* <tr>
                              //           <td>
                              //             <span className="img_pair">
                              //               {" "}
                              //               <i className="ri-star-fill mr-3"></i>
                              //               BTC_SHIB
                              //             </span>
                              //           </td>
                              //           <td>
                              //             <span className="text-green">+2%</span>
                              //           </td>
                              //           <td>
                              //             <span className="text-red">+0%</span>
                              //           </td>
                              //         </tr> */}
                              //           {pairlist.length > 0 ? (
                              //             pairlist.map((obj, i) => {
                              //               return (
                              //                 <tr
                              //                   onClick={() => pairChange(obj)}
                              //                 >
                              //                   <td
                              //                     onClick={() =>
                              //                       selectPair(obj.pair)
                              //                     }
                              //                   >
                              //                     <span className="img_pair">
                              //                       {" "}
                              //                       {/* <i className="ri-star-fill mr-3"></i> */}
                              //                       {obj.from_symbol} /{" "}
                              //                       {obj.to_symbol}
                              //                     </span>
                              //                   </td>
                              //                   <td>
                              //                     {obj.last_price <= 0 ? (
                              //                       <span className="text-red">
                              //                         {parseFloat(
                              //                           obj.lastprice
                              //                         ).toFixed(
                              //                           pairDetailsref.current
                              //                             .price_decimal
                              //                         )}
                              //                       </span>
                              //                     ) : (
                              //                       <span className="text-green">
                              //                         {parseFloat(
                              //                           obj.lastprice
                              //                         ).toFixed(
                              //                           pairDetailsref.current
                              //                             .price_decimal
                              //                         )}
                              //                       </span>
                              //                     )}
                              //                   </td>
                              //                   <td>
                              //                     {obj.price_change <= 0 ? (
                              //                       <span className="text-red">
                              //                         {obj.price_change}%
                              //                       </span>
                              //                     ) : (
                              //                       <span className="text-green">
                              //                         {obj.price_change}%
                              //                       </span>
                              //                     )}
                              //                   </td>
                              //                 </tr>
                              //               );
                              //             })
                              //           ) : (
                              //             <tr>
                              //               <td colspan="3">
                              //                 No results found
                              //               </td>
                              //             </tr>
                              //           )}
                              //         </tbody>
                              //       </table>
                              //     </div>
                              //   </div>
                              // </div>

                              <div id="usdt" className="tab-pane fade in active show">
                              <div>
                                <div className="fixTableHead w-100">
                                  <table>
                                    <thead>
                                      <tr>
                                        <th className="text-left">Pair</th>
                                        <th>Last price</th>
                                        <th>Change</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {pairlist.length > 0 ? (
                                        pairlist.map((obj, i) => {
                                          return (
                                            <tr onClick={() => pairChange(obj)}>
                                              <td
                                                onClick={() =>
                                                  selectPair(obj.pair)
                                                }
                                              >
                                                <span className="img_pair">
                                                  {" "}
                                                  {checkAuth ? (
                                                    favpairref.current.length >
                                                      0 ? (
                                                      favpairref.current.includes(
                                                        obj._id
                                                      ) ? (
                                                        <i
                                                          className="ri-star-fill fav mr-3"
                                                          style={{
                                                            color: "#00D4FF",
                                                          }}
                                                          onClick={() =>
                                                            add_fav_pair(
                                                              obj._id
                                                            )
                                                          }
                                                        ></i>
                                                      ) : (
                                                        <i
                                                          className="ri-star-fill mr-3"
                                                          onClick={() =>
                                                            add_fav_pair(
                                                              obj._id
                                                            )
                                                          }
                                                        ></i>
                                                      )
                                                    ) : (
                                                      <i
                                                        className="ri-star-fill mr-3"
                                                        onClick={() =>
                                                          add_fav_pair(obj._id)
                                                        }
                                                      ></i>
                                                    )
                                                  ) : (
                                                    ""
                                                  )}
                                                  {obj.from_symbol} /{" "}
                                                  {obj.to_symbol}
                                                </span>
                                              </td>
                                              <td>
                                                {obj.last_price <= 0 ? (
                                                  <span className="text-red">
                                                    {parseFloat(
                                                      obj.lastprice
                                                    ).toFixed(
                                                      pairDetailsref.current
                                                        .price_decimal
                                                    )}
                                                  </span>
                                                ) : (
                                                  <span className="text-green">
                                                    {parseFloat(
                                                      obj.lastprice
                                                    ).toFixed(
                                                      pairDetailsref.current
                                                        .price_decimal
                                                    )}
                                                  </span>
                                                )}
                                              </td>
                                              <td>
                                                {obj.price_change <= 0 ? (
                                                  <span className="text-red">
                                                    {obj.price_change}%
                                                  </span>
                                                ) : (
                                                  <span className="text-green">
                                                    {obj.price_change}%
                                                  </span>
                                                )}
                                              </td>
                                            </tr>
                                          );
                                        })
                                      ) : (
                                        <tr>
                                          <td colspan="3">No results found</td>
                                        </tr>
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>

                            )}

                            <div id="usdt" className="tab-pane fade">
                              <div>
                                <div className="fixTableHead w-100">
                                  <table>
                                    <thead>
                                      <tr>
                                        <th className="text-left">Pair</th>
                                        <th>Last price</th>
                                        <th>Change</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {pairlist.length > 0 ? (
                                        pairlist.map((obj, i) => {
                                          return (
                                            <tr onClick={() => pairChange(obj)}>
                                              <td
                                                onClick={() =>
                                                  selectPair(obj.pair)
                                                }
                                              >
                                                <span className="img_pair">
                                                  {" "}
                                                  {checkAuth ? (
                                                    favpairref.current.length >
                                                      0 ? (
                                                      favpairref.current.includes(
                                                        obj._id
                                                      ) ? (
                                                        <i
                                                          className="ri-star-fill fav mr-3"
                                                          style={{
                                                            color: "#00D4FF",
                                                          }}
                                                          onClick={() =>
                                                            add_fav_pair(
                                                              obj._id
                                                            )
                                                          }
                                                        ></i>
                                                      ) : (
                                                        <i
                                                          className="ri-star-fill mr-3"
                                                          onClick={() =>
                                                            add_fav_pair(
                                                              obj._id
                                                            )
                                                          }
                                                        ></i>
                                                      )
                                                    ) : (
                                                      <i
                                                        className="ri-star-fill mr-3"
                                                        onClick={() =>
                                                          add_fav_pair(obj._id)
                                                        }
                                                      ></i>
                                                    )
                                                  ) : (
                                                    ""
                                                  )}
                                                  {obj.from_symbol} /{" "}
                                                  {obj.to_symbol}
                                                </span>
                                              </td>
                                              <td>
                                                {obj.last_price <= 0 ? (
                                                  <span className="text-red">
                                                    {parseFloat(
                                                      obj.lastprice
                                                    ).toFixed(
                                                      pairDetailsref.current
                                                        .price_decimal
                                                    )}
                                                  </span>
                                                ) : (
                                                  <span className="text-green">
                                                    {parseFloat(
                                                      obj.lastprice
                                                    ).toFixed(
                                                      pairDetailsref.current
                                                        .price_decimal
                                                    )}
                                                  </span>
                                                )}
                                              </td>
                                              <td>
                                                {obj.price_change <= 0 ? (
                                                  <span className="text-red">
                                                    {obj.price_change}%
                                                  </span>
                                                ) : (
                                                  <span className="text-green">
                                                    {obj.price_change}%
                                                  </span>
                                                )}
                                              </td>
                                            </tr>
                                          );
                                        })
                                      ) : (
                                        <tr>
                                          <td colspan="3">No results found</td>
                                        </tr>
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>

                            <div id="bnb" className="tab-pane fade">
                              <div>
                                <div className="fixTableHead w-100">
                                  <table>
                                    <thead>
                                      <tr>
                                        <th className="text-left">Pair</th>
                                        <th>Last price</th>
                                        <th>Change</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {pairlist.length > 0 ? (
                                        pairlist.map((obj, i) => {
                                          return (
                                            <tr onClick={() => pairChange(obj)}>
                                              <td
                                                onClick={() =>
                                                  selectPair(obj.pair)
                                                }
                                              >
                                                <span className="img_pair">
                                                  {" "}
                                                  {checkAuth ? (
                                                    favpairref.current.length >
                                                      0 ? (
                                                      favpairref.current.includes(
                                                        obj._id
                                                      ) ? (
                                                        <i
                                                          className="ri-star-fill fav mr-3"
                                                          style={{
                                                            color: "#00D4FF",
                                                          }}
                                                          onClick={() =>
                                                            add_fav_pair(
                                                              obj._id
                                                            )
                                                          }
                                                        ></i>
                                                      ) : (
                                                        <i
                                                          className="ri-star-fill mr-3"
                                                          onClick={() =>
                                                            add_fav_pair(
                                                              obj._id
                                                            )
                                                          }
                                                        ></i>
                                                      )
                                                    ) : (
                                                      <i
                                                        className="ri-star-fill mr-3"
                                                        onClick={() =>
                                                          add_fav_pair(obj._id)
                                                        }
                                                      ></i>
                                                    )
                                                  ) : (
                                                    ""
                                                  )}
                                                  {obj.from_symbol} /{" "}
                                                  {obj.to_symbol}
                                                </span>
                                              </td>
                                              <td>
                                                {obj.last_price <= 0 ? (
                                                  <span className="text-red">
                                                    {parseFloat(
                                                      obj.lastprice
                                                    ).toFixed(
                                                      pairDetailsref.current
                                                        .price_decimal
                                                    )}
                                                  </span>
                                                ) : (
                                                  <span className="text-green">
                                                    {parseFloat(
                                                      obj.lastprice
                                                    ).toFixed(
                                                      pairDetailsref.current
                                                        .price_decimal
                                                    )}
                                                  </span>
                                                )}
                                              </td>
                                              <td>
                                                {obj.price_change <= 0 ? (
                                                  <span className="text-red">
                                                    {obj.price_change}%
                                                  </span>
                                                ) : (
                                                  <span className="text-green">
                                                    {obj.price_change}%
                                                  </span>
                                                )}
                                              </td>
                                            </tr>
                                          );
                                        })
                                      ) : (
                                        <tr>
                                          <td colspan="3">No results found</td>
                                        </tr>
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>

                            <div id="btc" className="tab-pane fade">
                              <div>
                                <div className="fixTableHead w-100">
                                  <table>
                                    <thead>
                                      <tr>
                                        <th className="text-left">Pair</th>
                                        <th>Last price</th>
                                        <th>Change</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {pairlist.length > 0 ? (
                                        pairlist.map((obj, i) => {
                                          return (
                                            <tr onClick={() => pairChange(obj)}>
                                              <td
                                                onClick={() =>
                                                  selectPair(obj.pair)
                                                }
                                              >
                                                <span className="img_pair">
                                                  {" "}
                                                  {checkAuth ? (
                                                    favpairref.current.length >
                                                      0 ? (
                                                      favpairref.current.includes(
                                                        obj._id
                                                      ) ? (
                                                        <i
                                                          className="ri-star-fill fav mr-3"
                                                          style={{
                                                            color: "#00D4FF",
                                                          }}
                                                          onClick={() =>
                                                            add_fav_pair(
                                                              obj._id
                                                            )
                                                          }
                                                        ></i>
                                                      ) : (
                                                        <i
                                                          className="ri-star-fill mr-3"
                                                          onClick={() =>
                                                            add_fav_pair(
                                                              obj._id
                                                            )
                                                          }
                                                        ></i>
                                                      )
                                                    ) : (
                                                      <i
                                                        className="ri-star-fill mr-3"
                                                        onClick={() =>
                                                          add_fav_pair(obj._id)
                                                        }
                                                      ></i>
                                                    )
                                                  ) : (
                                                    ""
                                                  )}
                                                  {obj.from_symbol} /{" "}
                                                  {obj.to_symbol}
                                                </span>
                                              </td>
                                              <td>
                                                {obj.last_price <= 0 ? (
                                                  <span className="text-red">
                                                    {parseFloat(
                                                      obj.lastprice
                                                    ).toFixed(
                                                      pairDetailsref.current
                                                        .price_decimal
                                                    )}
                                                  </span>
                                                ) : (
                                                  <span className="text-green">
                                                    {parseFloat(
                                                      obj.lastprice
                                                    ).toFixed(
                                                      pairDetailsref.current
                                                        .price_decimal
                                                    )}
                                                  </span>
                                                )}
                                              </td>
                                              <td>
                                                {obj.price_change <= 0 ? (
                                                  <span className="text-red">
                                                    {obj.price_change}%
                                                  </span>
                                                ) : (
                                                  <span className="text-green">
                                                    {obj.price_change}%
                                                  </span>
                                                )}
                                              </td>
                                            </tr>
                                          );
                                        })
                                      ) : (
                                        <tr>
                                          <td colspan="3">No results found</td>
                                        </tr>
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text_red">
                    {" "}
                    {isNaN(marketPrice)
                      ? ""
                      : parseFloat(marketPrice).toFixed(
                        pairDetailsref.current.price_decimal
                      )}{" "}
                  </div>
                </div>
                <div className="market_price_secrtiom">
                  <div className="trade_header_11 d-flex justify-between">
                    <div>
                      <div>
                        <span>
                          <i className="bi bi-clock"></i>
                          24h change
                        </span>
                        {pairTickerDetails.price_change <= 0 ? (
                          <h5 className="pink_text col-red">
                            {isNaN(pairTickerDetails.price_change)
                              ? ""
                              : parseFloat(
                                pairTickerDetails.price_change
                              ).toFixed(pairDetailsref.current.price_decimal)}
                          </h5>
                        ) : (
                          <h5 className="pink_text col-green">
                            {isNaN(pairTickerDetails.price_change)
                              ? ""
                              : parseFloat(
                                pairTickerDetails.price_change
                              ).toFixed(pairDetailsref.current.price_decimal)}
                          </h5>
                        )}
                      </div>
                      <div>
                        <span>
                          <i className="bi bi-arrow-up-short"></i>
                          24h high
                        </span>
                        <h5 className="pink_text">
                          {" "}
                          {isNaN(pairTickerDetails.highprice)
                            ? ""
                            : parseFloat(pairTickerDetails.highprice).toFixed(
                              pairDetailsref.current.price_decimal
                            )}{" "}
                        </h5>
                      </div>
                      <div>
                        <span>
                          <i className="bi bi-arrow-down-short"></i>
                          24h low
                        </span>
                        <h5 className="pink_text">
                          {" "}
                          {isNaN(pairTickerDetails.lowprice)
                            ? ""
                            : parseFloat(pairTickerDetails.lowprice).toFixed(
                              pairDetailsref.current.price_decimal
                            )}
                        </h5>
                      </div>
                      <div>
                        <span>
                          <i className="bi bi-bar-chart-line"></i>
                          24h volume ({fromCurrency})
                        </span>
                        <h5 className="pink_text">
                          {" "}
                          {isNaN(pairTickerDetails.volume)
                            ? ""
                            : parseFloat(pairTickerDetails.volume).toFixed(
                              pairDetailsref.current.amount_decimal
                            )}
                        </h5>
                      </div>

                      <div>
                        <span>
                          <i className="bi bi-bar-chart-line"></i>
                          24h volume ({toCurrency})
                        </span>
                        <h5 className="pink_text">
                          {" "}
                          {isNaN(pairTickerDetails.volume_2)
                            ? ""
                            : parseFloat(pairTickerDetails.volume_2).toFixed(
                              pairDetailsref.current.amount_decimal
                            )}
                        </h5>
                      </div>
                    </div>
                    {/* <div className="float-right">
                      <div className="search_option">
                        <input
                          type="text"
                          placeholder="Search Pair"
                          onChange={handleInputChange}
                        />
                        <i
                          className="bi bi-search"
                          onClick={() => pair_change()}
                        ></i>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-9 trade-colpading d-flex w-100">
              <div className="chart card_light w-100 trade_card">
                {/* <TradingViewWidget
              symbol={"BINANCE:"+chartPair}
              theme={Themes.DARK}
              locale="fr"
              width = "630"
              height = "374"
            /> */}
                <div id="tv_chart_container"></div>
                {/* <img
                  src={new URL("../img/Chart.png", import.meta.url).href}
                  className="chartaaa darktheme"
                />
                <img
                  src={new URL("../img/Chartwhiat.png", import.meta.url).href}
                  className="chartaaa lighttheme"
                /> */}
              </div>
            </div>
            <div className="col-lg-3 trade-colpading d-flex order_book_">
              <div className="order-table card_light">
                <ul className="nav nav-pills">
                  <li className="active">
                    <a data-toggle="pill" href="#orderbook" className="active">
                      Order Book
                    </a>
                  </li>
                  <li>
                    <a
                      data-toggle="pill"
                      href="#trade"
                      onClick={clickMarketTrade}
                    >
                      Trades
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  {/* //=================ORDERBOOK START=======================// */}

                  <div id="orderbook" className="tab-pane fade in active show">
                    <div className="">
                      <div className="fixTableHead uniqu_height">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">
                                Price <br />
                                (USDT)
                              </th>
                              <th scope="col">
                                Amount <br />
                                (BTC)
                              </th>
                              <th scope="col">
                                Total <br />
                                (BTC)
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {orderbookLoader == true ? (
                              <tr>
                                <td colSpan="3">
                                  <div className="loadingio-spinner-rolling-29xdivqpql3">
                                    <div className="ldio-pmaw4zkjqw">
                                      <div></div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ) : orderbookask.length > 0 ? (
                              orderbookask.map((ask, i) => {
                                return (
                                  <tr className="position_rel_over">
                                    <td>
                                      <span className="color-green">
                                        {ask[0]}
                                      </span>
                                    </td>
                                    <td>{ask[1]}</td>
                                    <td style={{ position: "relative" }}>
                                      {ask[2]}
                                      <div
                                        className="red_overlay"
                                        style={{
                                          width:
                                            ask.percent == 0
                                              ? ask.percent + "%"
                                              : 0 + "%",
                                        }}
                                      ></div>
                                    </td>
                                  </tr>
                                );
                              })
                            ) : (
                              <tr>
                                <td colSpan="3">Data not found!</td>
                              </tr>
                            )}

                            <tr className="curront-price">
                              <td colSpan="3">
                                <div className="curront_price">
                                  <span className="curret0green">
                                    {parseFloat(marketPrice).toFixed(
                                      pairDetailsref.current.price_decimal
                                    )}
                                  </span>
                                  <i className="bi bi-arrow-up"></i>
                                  {/* <span className="text-redc">1.0</span> */}
                                </div>
                              </td>
                            </tr>

                            {orderbookLoaderbid == true ? (
                              <tr>
                                <td colSpan="3">
                                  <div className="loadingio-spinner-rolling-29xdivqpql3">
                                    <div className="ldio-pmaw4zkjqw">
                                      <div></div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ) : orderbookbid.length > 0 ? (
                              orderbookbid.map((bid, i) => {
                                return (
                                  <tr className="position_rel_over">
                                    <td>
                                      <span className="red-green">
                                        {bid[0]}
                                      </span>
                                    </td>
                                    <td>{bid[1]}</td>
                                    <td style={{ position: "relative" }}>
                                      {bid[2]}
                                      <div
                                        className="green_overlay"
                                        style={{
                                          width:
                                            bid.percent == 0
                                              ? bid.percent + "%"
                                              : 0 + "%",
                                        }}
                                      ></div>
                                    </td>
                                  </tr>
                                );
                              })
                            ) : (
                              <tr>
                                <td colSpan="3">Data not found!</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  {/* //=================ORDERBOOK ENDS=======================// */}

                  {/* //=================MARKET TRADES=======================// */}

                  <div id="trade" className="tab-pane fade">
                    <div className="fixTableHead uniqu_height">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Price</th>
                            <th scope="col">Size</th>
                            <th scope="col">Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {marketTrade.length > 0 ? (
                            marketTrade.map((item, i) => {
                              return (
                                <tr className="position_rel_over">
                                  {item.type == "buy" ? (
                                    <td>
                                      <span className="color-green">
                                        {" "}
                                        {item.price}{" "}
                                      </span>
                                    </td>
                                  ) : (
                                    <td>
                                      <span className="red-green">
                                        {" "}
                                        {item.price}{" "}
                                      </span>
                                    </td>
                                  )}
                                  <td>{item.amount} </td>
                                  <td>{item.time} </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              {checkAuth ? (
                                <td colSpan="3">No found market trades!</td>
                              ) : (
                                <td colSpan="3">
                                  <Button className="btn btn-primary-alta connectBtn mt-5">
                                    <Link to="/login">Login to continue</Link>
                                  </Button>
                                </td>
                              )}
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* //=================MARKET TRADES END=======================// */}
                </div>
              </div>
            </div>
            <div className="col-lg-4 trade-colpading d-flex mt-3 new_buyform">
              <div className="formplac card_light card_light-w transe cart_trade ">
                <ul className="nav nav-pills tabsinner">
                  <li className="active">
                    <a className="!text-[#21A75F] !border-[#21A75F]  hover:!text-[#21A75F] buypill  "
                      data-toggle="pill"
                      href="#Buy"
                      onClick={() => type_tab_change("buy")}
                    >
                      Buy
                    </a>
                  </li>
                  <li>
                    <a className="!text-[#E84747] !border-[#E84747] hover:!text-[#E84747]  sellpill"
                      data-toggle="pill"
                      href="#Sell"
                      onClick={() => type_tab_change("sell")}
                    >
                      Sell
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div id="Buy" className="tab-pane fade in active show">
                    <div className="inner_form limit_newcolor">
                      <ul className="nav nav-pills ">
                        <li className="active">
                          <a
                            data-toggle="pill"
                            href="#Limit"
                            className="active"
                          >
                            Limit
                          </a>
                        </li>
                        <li>
                          <a data-toggle="pill" href="#Market">
                            Market
                          </a>
                        </li>
                        <li>
                          <a data-toggle="pill" href="#Stop">
                            Stop Limit
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content">
                        <div id="Limit" className="tab-pane fade in active show">
                          <div className="foem_section color_padinr">
                            <div className="foem_group">
                              <div className="formtext">
                                <label>Price</label>
                                <div className="form-group">
                                  <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Price"
                                    name="price"
                                    value={price}
                                    onChange={handleChange}
                                  />
                                  <span className="currency">
                                    {" "}
                                    {toCurrency}{" "}
                                  </span>
                                </div>
                              </div>
                              {/* <p className="text-primary">
                                {" "}
                                Balance : {parseFloat(tobalance).toFixed(
                                  4
                                )}{" "}
                                {toCurrency}{" "}
                              </p> */}
                              <div className="formtext">
                                <label>Amount</label>
                                <div className="form-group">
                                  <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Amount"
                                    name="amount"
                                    value={amount}
                                    onChange={handleChange}
                                  />

                                  <span className="currency">
                                    {" "}
                                    {fromCurrency}{" "}
                                  </span>
                                </div>
                              </div>
                              {checkAuth ? (
                                <div className=" pading-rr">
                                  <div className="range_btn">
                                    <Button
                                      onClick={() => buy_sell_percentage("25")}
                                      className={btntrade1}
                                    >
                                      25%
                                    </Button>
                                    <Button
                                      onClick={() => buy_sell_percentage("50")}
                                      className={btntrade2}
                                    >
                                      50%
                                    </Button>
                                    <Button
                                      onClick={() => buy_sell_percentage("75")}
                                      className={btntrade3}
                                    >
                                      75%
                                    </Button>
                                    <Button
                                      onClick={() => buy_sell_percentage("100")}
                                      className={btntrade4}
                                    >
                                      100%
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              <div className="formtext">
                                <label>Total</label>
                                <div className="form-group">
                                  <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Total"
                                    value={total}
                                  />
                                  <span className="currency">
                                    {" "}
                                    {toCurrency}{" "}
                                  </span>
                                </div>
                              </div>
                              {checkAuth ? (
                              <p className="text-primary color_teds">
                                {" "}
                                Balance : {parseFloat(tobalance).toFixed(
                                  4
                                )}{" "}
                                {toCurrency}{" "}
                              </p>
                              ) : ("")}
                              <div className="form-group border-none vuttond">
                                {!checkAuth ? (
                                  <Button className="btn btn-primary-alta connectBtn ">
                                    <Link to="/login">Login to continue</Link>
                                  </Button>
                                ) : orderloaderref.current ? (
                                  <Button className="btn btn-primary-alta connectBtn">
                                    Loading
                                  </Button>
                                ) : (
                                  <Button
                                    className="btn btn-primary-alta connectBtn"
                                    onClick={() => orderPlace("Limit", "buy")}
                                  >
                                    {currentType}
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div id="Market" className="tab-pane fade">
                          <div className="foem_section color_padinr">
                            <div className="foem_group market_table">
                              {/* <p className="text-primary">
                                {" "}
                                Balance : {parseFloat(tobalance).toFixed(
                                  4
                                )}{" "}
                                {toCurrency}{" "}
                              </p> */}
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Price"
                                  value={price}
                                  name="price"
                                  disabled
                                />
                                <span className="currency"> {toCurrency} </span>
                              </div>
                              {/* 
                              <p className="text-primary">
                                {" "}
                                Balance : {parseFloat(tobalance).toFixed(
                                  4
                                )}{" "}
                                {toCurrency}{" "}
                              </p> */}

                              <div className="form-group">
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="Amount"
                                  name="amount"
                                  value={amount}
                                  onChange={handleChange}
                                />
                                <span className="currency">
                                  {" "}
                                  {fromCurrency}{" "}
                                </span>
                              </div>
                              {checkAuth ? (
                                <div className="pading-rr">
                                  <div className="range_btn">
                                    <Button
                                      onClick={() => buy_sell_percentage("25")}
                                      className={btntrade1}
                                    >
                                      25%
                                    </Button>
                                    <Button
                                      onClick={() => buy_sell_percentage("50")}
                                      className={btntrade2}
                                    >
                                      50%
                                    </Button>
                                    <Button
                                      onClick={() => buy_sell_percentage("75")}
                                      className={btntrade3}
                                    >
                                      75%
                                    </Button>
                                    <Button
                                      onClick={() => buy_sell_percentage("100")}
                                      className={btntrade4}
                                    >
                                      100%
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              <div className="form-group">
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="Total"
                                  value={total}
                                />
                                <span className="currency"> {toCurrency} </span>
                              </div>
                              {checkAuth ? (
                              <p className="text-primary color_teds">
                                {" "}
                                Balance : {parseFloat(tobalance).toFixed(
                                  4
                                )}{" "}
                                {toCurrency}{" "}
                              </p>
                              ) : ("")}
                              <div className="form-group border-none  vuttond">
                                {!checkAuth ? (
                                  <Button className="btn btn-primary-alta connectBtn">
                                    <Link to="/login">Login to continue</Link>
                                  </Button>
                                ) : orderloaderref.current ? (
                                  <Button className="btn btn-primary-alta connectBtn">
                                    Loading
                                  </Button>
                                ) : (
                                  <Button
                                    className="btn btn-primary-alta connectBtn"
                                    onClick={() => orderPlace("Market", "buy")}
                                  >
                                    {currentType}
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div id="Stop" className="tab-pane fade">
                          <div className="foem_section color_padinr">
                            <div className="foem_group market_table">
                              {/* <p className="text-primary">
                                {" "}
                                Balance : {parseFloat(tobalance).toFixed(
                                  4
                                )}{" "}
                                {toCurrency}{" "}
                              </p> */}
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Limit"
                                  value={stop_price}
                                  name="stop_price"
                                  onChange={handleChange}
                                />
                                <span className="currency"> {toCurrency} </span>
                              </div>

                              <div className="form-group">
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="Stop"
                                  value={price}
                                  name="price"
                                  onChange={handleChange}
                                />
                                <span className="currency"> {toCurrency} </span>
                              </div>

                              <div className="form-group">
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="Amount"
                                  name="amount"
                                  value={amount}
                                  onChange={handleChange}
                                />
                                <span className="currency">
                                  {" "}
                                  {fromCurrency}{" "}
                                </span>
                              </div>

                              {checkAuth ? (
                                <div className="pading-rr">
                                  <div className="range_btn">
                                    <Button
                                      onClick={() => buy_sell_percentage("25")}
                                      className={btntrade1}
                                    >
                                      25%
                                    </Button>
                                    <Button
                                      onClick={() => buy_sell_percentage("50")}
                                      className={btntrade2}
                                    >
                                      50%
                                    </Button>
                                    <Button
                                      onClick={() => buy_sell_percentage("75")}
                                      className={btntrade3}
                                    >
                                      75%
                                    </Button>
                                    <Button
                                      onClick={() => buy_sell_percentage("100")}
                                      className={btntrade4}
                                    >
                                      100%
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}

                              <div className="form-group">
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="Total"
                                  value={total}
                                />
                                <span className="currency"> {toCurrency} </span>
                              </div>
                              {checkAuth ? (
                              <p className="text-primary color_teds">
                                {" "}
                                Balance : {parseFloat(tobalance).toFixed(
                                  4
                                )}{" "}
                                {toCurrency}{" "}
                              </p>
                              ) : ("")}

                              <div className="form-group border-none  vuttond">
                                {!checkAuth ? (
                                  <Button className="btn btn-primary-alta connectBtn">
                                    <Link to="/login">Login to continue</Link>
                                  </Button>
                                ) : orderloaderref.current ? (
                                  <Button className="btn btn-primary-alta connectBtn">
                                    Loading
                                  </Button>
                                ) : (
                                  <Button
                                    className="btn btn-primary-alta connectBtn"
                                    onClick={() => orderPlace("Stop", "buy")}
                                  >
                                    {currentType}
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="Sell" className="tab-pane fade">
                    <div className="inner_form limit_newcolor">
                      <ul className="nav nav-pills">
                        <li className="active">
                          <a
                            data-toggle="pill"
                            href="#Limitsell"
                            className="active"
                          >
                            Limit
                          </a>
                        </li>
                        <li>
                          <a data-toggle="pill" href="#Marketsell">
                            Market
                          </a>
                        </li>
                        <li>
                          <a data-toggle="pill" href="#Stopsell">
                            Stop Limit
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content">
                        <div
                          id="Limitsell"
                          className="tab-pane fade in active show"
                        >
                          <div className="foem_section color_padinr">
                            <div className="foem_group market_table">
                              <div className="formtext">
                                <label>Price</label>
                                <div className="form-group">
                                  <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Price"
                                    name="price"
                                    value={price}
                                    onChange={handleChange}
                                  />
                                  <span className="currency">
                                    {" "}
                                    {toCurrency}{" "}
                                  </span>
                                </div>
                              </div>
                              {/* <p className="text-primary">
                                {" "}
                                Balance : {parseFloat(tobalance).toFixed(
                                  4
                                )}{" "}
                                {toCurrency}{" "}
                              </p> */}
                              <div className="formtext">
                                <label>Amount</label>
                                <div className="form-group">
                                  <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Amount"
                                    name="amount"
                                    value={amount}
                                    onChange={handleChange}
                                  />

                                  <span className="currency">
                                    {" "}
                                    {fromCurrency}{" "}
                                  </span>
                                </div>
                              </div>
                              {checkAuth ? (
                                <div className=" pading-rr">
                                  <div className="range_btn">
                                    <Button
                                      onClick={() => buy_sell_percentage("25")}
                                      className={btntrade1}
                                    >
                                      25%
                                    </Button>
                                    <Button
                                      onClick={() => buy_sell_percentage("50")}
                                      className={btntrade2}
                                    >
                                      50%
                                    </Button>
                                    <Button
                                      onClick={() => buy_sell_percentage("75")}
                                      className={btntrade3}
                                    >
                                      75%
                                    </Button>
                                    <Button
                                      onClick={() => buy_sell_percentage("100")}
                                      className={btntrade4}
                                    >
                                      100%
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              <div className="formtext">
                                <label>Total</label>
                                <div className="form-group">
                                  <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Total"
                                    value={total}
                                  />
                                  <span className="currency">
                                    {" "}
                                    {toCurrency}{" "}
                                  </span>
                                </div>
                              </div>
                              {checkAuth ? (
                              <p className="text-primary color_teds">
                                {" "}
                                Balance : {parseFloat(frombalance).toFixed(
                                  4
                                )}{" "}
                                {fromCurrency}{" "}
                              </p>
                              ) : ("")}
                              <div className="form-group border-none vuttond">
                                {!checkAuth ? (
                                  <Button className="btn btn-primary-alta connectBtn ">
                                    <Link to="/login">Login to continue</Link>
                                  </Button>
                                ) : orderloaderref.current ? (
                                  <Button className="btn btn-primary-alta connectBtn">
                                    Loading
                                  </Button>
                                ) : (
                                  <Button
                                    className="btn btn-primary-alta connectBtn"
                                    onClick={() => orderPlace("Limit", "sell")}
                                  >
                                    {currentType}
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div id="Marketsell" className="tab-pane fade">
                          <div className="foem_section color_padinr">
                            <div className="foem_group market_table">
                              {/* <p className="text-primary">
                                {" "}
                                Balance : {parseFloat(frombalance).toFixed(
                                  4
                                )}{" "}
                                {fromCurrency}{" "}
                              </p> */}

                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Price"
                                  value={price}
                                  name="price"
                                  disabled
                                />
                                <span className="currency"> {toCurrency} </span>
                              </div>

                              {/* <p className="text-primary">
                                {" "}
                                Balance : {parseFloat(frombalance).toFixed(
                                  4
                                )}{" "}
                                {fromCurrency}{" "}
                              </p> */}

                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Amount"
                                  name="amount"
                                  value={amount}
                                  onChange={handleChange}
                                />
                                <span className="currency">
                                  {" "}
                                  {fromCurrency}{" "}
                                </span>
                              </div>
                              {checkAuth ? (
                                <div className="pading-rr">
                                  <div className="range_btn">
                                    <Button
                                      onClick={() => buy_sell_percentage("25")}
                                      className={btntrade1}
                                    >
                                      25%
                                    </Button>
                                    <Button
                                      onClick={() => buy_sell_percentage("50")}
                                      className={btntrade2}
                                    >
                                      50%
                                    </Button>
                                    <Button
                                      onClick={() => buy_sell_percentage("75")}
                                      className={btntrade3}
                                    >
                                      75%
                                    </Button>
                                    <Button
                                      onClick={() => buy_sell_percentage("100")}
                                      className={btntrade4}
                                    >
                                      100%
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Total"
                                  value={total}
                                />
                                <span className="currency"> {toCurrency} </span>
                              </div>
                              {checkAuth ? (
                              <p className="text-primary color_teds">
                                {" "}
                                Balance : {parseFloat(frombalance).toFixed(
                                  4
                                )}{" "}
                                {fromCurrency}{" "}
                              </p>
                              ): ("")}
                              <div className="form-group border-none  vuttond">
                                {!checkAuth ? (
                                  <Button className="btn btn-primary-alta connectBtn">
                                    <Link to="/login">Login to continue</Link>
                                  </Button>
                                ) : orderloaderref.current ? (
                                  <Button className="btn btn-primary-alta connectBtn">
                                    Loading
                                  </Button>
                                ) : (
                                  <Button
                                    className="btn btn-primary-alta connectBtn"
                                    onClick={() => orderPlace("Market", "sell")}
                                  >
                                    {currentType}
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div id="Stopsell" className="tab-pane fade">
                          <div className="foem_section color_padinr">
                            <div className="foem_group market_table">
                              {/* <p className="text-primary">
                                {" "}
                                Balance : {parseFloat(frombalance).toFixed(
                                  4
                                )}{" "}
                                {fromCurrency}{" "}
                              </p> */}
                              <div className="form-group">
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="Limit"
                                  value={stop_price}
                                  name="stop_price"
                                  onChange={handleChange}
                                />
                                <span className="currency"> {toCurrency} </span>
                              </div>

                              <div className="form-group">
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="Stop"
                                  value={price}
                                  name="price"
                                  onChange={handleChange}
                                />
                                <span className="currency"> {toCurrency} </span>
                              </div>

                              <div className="form-group">
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="Amount"
                                  name="amount"
                                  value={amount}
                                  onChange={handleChange}
                                />
                                <span className="currency">
                                  {" "}
                                  {fromCurrency}{" "}
                                </span>
                              </div>

                              {checkAuth ? (
                                <div className="pading-rr">
                                  <div className="range_btn">
                                    <Button
                                      onClick={() => buy_sell_percentage("25")}
                                      className={btntrade1}
                                    >
                                      25%
                                    </Button>
                                    <Button
                                      onClick={() => buy_sell_percentage("50")}
                                      className={btntrade2}
                                    >
                                      50%
                                    </Button>
                                    <Button
                                      onClick={() => buy_sell_percentage("75")}
                                      className={btntrade3}
                                    >
                                      75%
                                    </Button>
                                    <Button
                                      onClick={() => buy_sell_percentage("100")}
                                      className={btntrade4}
                                    >
                                      100%
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}

                              <div className="form-group">
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="Total"
                                  value={total}
                                />
                                <span className="currency"> {toCurrency} </span>
                              </div>
                              {checkAuth ? (
                              <p className="text-primary color_teds">
                                {" "}
                                Balance : {parseFloat(frombalance).toFixed(
                                  4
                                )}{" "}
                                {fromCurrency}{" "}
                              </p>
                              ) : ("")}
                              
                              <div className="form-group border-none  vuttond">
                                {!checkAuth ? (
                                  <Button className="btn btn-primary-alta connectBtn">
                                    <Link to="/login">Login to continue</Link>
                                  </Button>
                                ) : orderloaderref.current ? (
                                  <Button className="btn btn-primary-alta connectBtn">
                                    Loading
                                  </Button>
                                ) : (
                                  <Button
                                    className="btn btn-primary-alta connectBtn"
                                    onClick={() => orderPlace("Stop", "sell")}
                                  >
                                    {currentType}
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8 trade-colpading mt-3 border_botton">
              <div className="ordertabel card_light">
                <div className="title-table">
                  <ul className="nav nav-tabs">
                    <li className="active">
                      <a
                        data-toggle="tab"
                        href="#OpenOrders"
                        className="active"
                      >
                        Open Orders
                      </a>
                    </li>
                    <li>
                      <a
                        data-toggle="tab"
                        href="#OrderHistory"
                        onClick={callOrdehistory}
                      >
                        Order History
                      </a>
                    </li>
                    <li>
                      <a
                        data-toggle="tab"
                        href="#OrderBook"
                        onClick={callCancelOrder}
                      >
                        Cancel Orders
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="tab-content">
                  {/* ==========ACTIVE OREDERS========== */}
                  <div id="OpenOrders" className="tab-pane fade in active show">
                    <div className="fixTableHead">
                      <table>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Pair </th>
                            <th>Price </th>
                            <th>Side </th>
                            <th>Order Type </th>
                            <th> Amount </th>
                            <th>Total </th>
                            <th>Cancel </th>
                          </tr>
                        </thead>
                        <tbody>
                          {activeOrderDatas.length > 0 ? (
                            activeOrderDatas.map((item, i) => {
                              var dates = Moment(item.createddate).format(
                                "DD-MM-YYYY hh:mm:ss"
                              );
                              return (
                                <tr>
                                  <td>{dates} </td>
                                  <td>{item.pairName} </td>
                                  <td>
                                    {item.tradeType == "buy" ? (
                                      <span className="text-green">
                                        {" "}
                                        {item.ordertype == "Stop"
                                          ? parseFloat(
                                            item.stoporderprice
                                          ).toFixed(4)
                                          : parseFloat(item.price).toFixed(
                                            4
                                          )}{" "}
                                      </span>
                                    ) : (
                                      <span className="text-red">
                                        {" "}
                                        {item.ordertype == "Stop"
                                          ? parseFloat(
                                            item.stoporderprice
                                          ).toFixed(4)
                                          : parseFloat(item.price).toFixed(
                                            4
                                          )}{" "}
                                      </span>
                                    )}
                                  </td>

                                  <td>
                                    {item.tradeType == "buy" ? (
                                      <span className="text-green">Buy</span>
                                    ) : (
                                      <span className="text-red">Sell</span>
                                    )}
                                  </td>
                                  <td> {item.ordertype} </td>
                                  <td>
                                    {" "}
                                    {parseFloat(item.filledAmount).toFixed(
                                      4
                                    )}{" "}
                                  </td>
                                  <td>
                                    {item.ordertype == "Stop"
                                      ? parseFloat(
                                        item.filledAmount *
                                        item.stoporderprice
                                      ).toFixed(4)
                                      : parseFloat(
                                        item.filledAmount * item.price
                                      ).toFixed(4)}
                                  </td>
                                  <td>
                                    <Button
                                      className="btn btn-primary-alta connectBtn"
                                      onClick={() => orderCancel(item)}
                                    >
                                      Cancel
                                    </Button>
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              {" "}
                              {!checkAuth ? (
                                <td colSpan="7">
                                  <Button className="btn btn-primary-alta connectBtn login_btn mt-5">
                                    <Link to="/login">Login to continue</Link>
                                  </Button>{" "}
                                </td>
                              ) : (
                                <td colSpan="8"> No found open orders!</td>
                              )}
                            </tr>
                          )}
                        </tbody>
                      </table>
                      {activeOrderDatas && activeOrderDatas.length > 0 ? (
                        <Pagination
                          itemClass="page-item"
                          linkClass="page-link"
                          activePage={currentPage}
                          itemsCountPerPage={recordPerPage}
                          totalItemsCount={totalactive}
                          pageRangeDisplayed={pageRange}
                          onChange={activePageChange}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div id="OrderHistory" className="tab-pane fade">
                    {/* ==========OREDERS HISTORY========== */}

                    <div className="fixTableHead">
                      <table>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Pair </th>
                            <th>Side </th>
                            <th>OrderType </th>
                            <th>Price </th>
                            <th>Amount </th>
                            <th>Total </th>
                          </tr>
                        </thead>

                        <tbody>
                          {tradeHistoryData.length > 0 ? (
                            tradeHistoryData.map((item, i) => {
                              var datesHis = Moment(item.created_at).format(
                                "DD-MM-YYYY hh:mm:ss"
                              );
                              return (
                                <tr>
                                  <td>{datesHis} </td>
                                  <td>{item.pair} </td>
                                  {item.type == "buy" ? (
                                    <td>
                                      <span className="text-green">Buy</span>
                                    </td>
                                  ) : (
                                    <td>
                                      <span className="text-red">Sell</span>
                                    </td>
                                  )}
                                  <td>{item.seller_ordertype}</td>
                                  <td>
                                    {item.type == "buy" ? (
                                      <span className="text-green">
                                        {" "}
                                        {item.askPrice}{" "}
                                      </span>
                                    ) : (
                                      <span className="text-red">
                                        {" "}
                                        {item.askPrice}{" "}
                                      </span>
                                    )}
                                  </td>
                                  <td> {item.askAmount} </td>
                                  <td>{item.total}</td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              {" "}
                              {!checkAuth ? (
                                <td colSpan="6">
                                  <Button className="btn btn-primary-alta connectBtn login_btn mt-5">
                                    <Link to="/login">Login to continue</Link>
                                  </Button>{" "}
                                </td>
                              ) : (
                                <td colSpan="7"> No Order history found!</td>
                              )}{" "}
                            </tr>
                          )}
                        </tbody>
                      </table>
                      {tradeHistoryData && tradeHistoryData.length > 0 ? (
                        <Pagination
                          itemClass="page-item"
                          linkClass="page-link"
                          activePage={currentPageHis}
                          itemsCountPerPage={recordPerPageHist}
                          totalItemsCount={totalHist}
                          pageRangeDisplayed={pageRangeHis}
                          onChange={orderhistoryactive}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  {/* ==================CANCEL ORDERS============ */}

                  <div id="OrderBook" className="tab-pane fade">
                    <div className="fixTableHead">
                      <table>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Pair</th>
                            <th>Side </th>
                            <th>Type </th>
                            <th>Price </th>
                            <th>Amount </th>
                            <th>Total </th>
                          </tr>
                        </thead>

                        <tbody>
                          {cancelOrders.length > 0 ? (
                            cancelOrders.map((item, i) => {
                              var total =
                                item.ordertype == "Stop"
                                  ? +item.filledAmount * +item.stoporderprice
                                  : +item.filledAmount * +item.price;
                              return (
                                <tr>
                                  <td>{item.createddate} </td>
                                  <td>{item.pairName} </td>
                                  <td>
                                    {item.tradeType == "buy" ? (
                                      <span className="text-[#21A75F]"> Buy </span>
                                    ) : (
                                      <span className="text-[#F6465D]"> Sell </span>
                                    )}
                                  </td>
                                  <td>{item.ordertype} </td>
                                  <td>
                                  {item.tradeType == "buy" ? (
                                    <span className="text-green">
                                      {item.ordertype == "Stop"
                                        ? parseFloat(
                                          item.stoporderprice
                                        ).toFixed(4)
                                        : parseFloat(item.price).toFixed(
                                          4
                                        )}{" "}
                                    </span>
                                  ) : (
                                    <span className="text-red">
                                    {item.ordertype == "Stop"
                                      ? parseFloat(
                                        item.stoporderprice
                                      ).toFixed(4)
                                      : parseFloat(item.price).toFixed(
                                        4
                                      )}{" "}
                                  </span>
                                  )}
                                  </td>
                                  <td> {item.amount} </td>
                                  <td>{parseFloat(total).toFixed(4)}</td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              {" "}
                              {!checkAuth ? (
                                <td colSpan="6">
                                  <Button className="btn btn-primary-alta connectBtn login_btn mt-5">
                                    <Link to="/login">Login to continue</Link>
                                  </Button>{" "}
                                </td>
                              ) : (
                                <td colSpan="7"> No Cancel order found! </td>
                              )}
                            </tr>
                          )}
                        </tbody>
                      </table>
                      {cancelOrders && cancelOrders.length > 0 ? (
                        <Pagination
                          itemClass="page-item"
                          linkClass="page-link"
                          activePage={currentPagecan}
                          itemsCountPerPage={recordPerPagecan}
                          totalItemsCount={totalcan}
                          pageRangeDisplayed={pageRangecan}
                          onChange={cancelPageChange}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
