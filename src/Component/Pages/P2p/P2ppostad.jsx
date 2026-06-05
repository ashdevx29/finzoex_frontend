import React, { useEffect } from "react";
import useState from "react-usestateref";
import Header from "../../Newcomponent/Header";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiService from "../../../core/service/detail";
import { getMethod, postMethod } from "../../../core/service/common.api";
import Footernew from "../../footer_buttom";
import { Grid, Paper, Container } from "@mui/material";
import { setAuthorization } from "../../../core/service/axios";
import { Button } from "semantic-ui-react";
import { Dropdown } from "semantic-ui-react";

import DashboardBg from "../../../img/Dashboard/DashboadBg.jpg";



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
    quantity: "",
    price: "",
    limitFrom: "",
    limitTo: "",
    isTerms: "",
  };

  const [formValue, setFormValue] = useState(initialFormValue);
  const [allCurrency, setallCurrency] = useState([]);
  const [allCurrencyFiat, setallCurrencyFiat] = useState([]);
  const [cryptoCurrency, setcryptoCurrency, cryptoCurrencyref] =
    useState("BTC");
  const [crytpoWithCash, setcrytpoWithCash, crytpoWithCashref] =
    useState("INR");
  const [prferPay, setprferPay] = useState("All payments");
  const [Terms, setTerms] = useState(false);
  const [errquantity, seterrquantity, seterrquantityref] = useState(false);
  const [priceError, serpriceError, serpriceErrorref] = useState(false);
  const [errcryptoCurrency, seterrcryptoCurrency] = useState("");
  const [errcrytpoWithCash, seterrcrytpoWithCash] = useState("");
  const [errprferPay, seterrprferPay] = useState("");
  const [validationnErr, setvalidationnErr] = useState("");
  const [termsValidation, setTermsValidation] = useState(false);
  const [buttonLoader, setbuttonLoader] = useState(false);
  const [firstCurrency, setfirstCurrency] = useState(
    "619948553cda890ff0256d3c"
  );
  const [secondCurrency, setsecondCurrency] = useState(
    "62f625b70a05cc3f9e4222bb"
  );
  const [kycstatus, setkycstatus] = useState(0);
  const [cryptoPrices, setcryptoPrices, cryptoPricesref] = useState([]);
  const [coinPrice, setcoinPrice, coinPriceref] = useState("");
  const [coinBalance, setcoinBalance, coinBalanceref] = useState("");
  const [fiat, setfiat, fiatref] = useState("INR");
  const [highprice, sethighprice, highpriceref] = useState(0);
  const [lowprice, setlowprice, lowpriceref] = useState(0);
  const [fromCurrency, setfromCurrency, fromCurrencyref] = useState("BTC");
  const [toCurrency, settoCurrency, toCurrencyref] = useState("INR");
  const [payment_time, setpayment_time, payment_timeref] = useState("15");
  const [errpaymentTime, seterrpaymentTime] = useState("");
  let navigate = useNavigate();

  const { quantity, price, limitFrom, limitTo, isTerms } = formValue;

  const handleChange = async (e) => {
    console.log(e, "-=-=-=-=-");
    e.preventDefault();
    const { name, value } = e.target;
    let formData = { ...formValue, ...{ [name]: value } };
    console.log(formData, "formData=-=-=-=");
    setFormValue(formData);
  };

  const getAllcurrency = async () => {
    console.log("fiatref.current===", fiatref.current);
    var payload = {
      fiat: fiatref.current,
    };
    var data = {
      apiUrl: apiService.getP2Pbalance,
      payload: payload,
    };
    var resp = await postMethod(data);
    console.log(resp, "-=-=-resp=-=-");
    if (resp.status == true) {
      var currArrayCrypto = [];
      var currArrayFiat = [];
      var currPrices = [];
      var data = resp.data;
      console.log(data, "][][][][][][");
      for (var i = 0; i < data.length; i++) {
        if (data[i].coinType == "1") {
          var obj = {
            key: data[i].currencySymbol,
            text: data[i].currencySymbol,
            value: data[i]._id,
            image: {
              avatar: true,
              src: data[i].Currency_image,
            },
            price: data[i].estimatedValueInUSDT,
          };
          currArrayCrypto.push(obj);
        }
        // if (data[i].coinType == "2" && data[i].currencySymbol == "INR") {
          if (data[i].coinType == "2") {
          var obj = {
            key: data[i].currencySymbol,
            text: data[i].currencySymbol,
            value: data[i]._id,
            image: {
              avatar: true,
              src: data[i].Currency_image,
            },
          };
          currArrayFiat.push(obj);
        }
        var obj1 = {
          id: data[i]._id,
          symbol: data[i].currencySymbol,
          price: data[i].estimatedValueInUSDT,
          balance: data[i].currencyBalance,
        };
        currPrices.push(obj1);
      }
      setallCurrency(currArrayCrypto);
      setallCurrencyFiat(currArrayFiat);
      console.log("allCurrencyFiat", currArrayFiat);
      setcryptoPrices(currPrices);
      let index = currPrices.filter((x) => x.symbol == fromCurrencyref.current);
      formValue.price = index[0].price;
      setcoinPrice(index[0].price);
      setcoinBalance(index[0].balance);
    }
    // console.log(allCurrency,'allCurrencyallCurrencyallCurrency=--=-=-=-==-=')
  };

  var defaulatCurrency = "BTC";
  const defaulatCurrFiat = allCurrencyFiat[0];

  const chooseCrypto = async (e, option) => {
    console.log(option, "-=-chooseCrypto");

    let index = cryptoPricesref.current.filter((x) => x.id == option.value);
    console.log("currency index====", index);
    if (index != null) {
      setcryptoCurrency(index[0].symbol);
      setfirstCurrency(option.value);
      getAllcurrency();
      formValue.price = index[0].price;
      console.log("formValue.price====", formValue.price);
      setcoinPrice(index[0].price);
      setcoinBalance(index[0].balance);
      setfromCurrency(index[0].symbol);
      fiat_price();
    }
  };
  const withCash = async (e, option) => {
    console.log("fromCurrencyref.current====", fromCurrencyref.current);
    let index = cryptoPricesref.current.filter((x) => x.id == option.value);
    // console.log("crypto currency index====",index);
    if (index != null) {
      setcrytpoWithCash(index[0].symbol);
      setsecondCurrency(option.value);
      setfiat(index[0].symbol);
      getAllcurrency();
      settoCurrency(index[0].symbol);
console.log(index[0])
console.log(index[0].price)
      formValue.price = index[0].price;
      console.log("formValue.price====", formValue.price);
      setcoinPrice(index[0].price);
      fiat_price();
    }
  };

  const prferPayments = async (e, option) => {
    console.log(option.value, "-=-prferPayments");
    setprferPay(option.value);
  };

  //    const handleOnChange_from = (e, data) => {
  //     console.log("handleOnChange_from",data);
  //     setfromSwapRef(data.value);
  //     var findIndexing = fromTab.findIndex(
  //       (x) => x.currid == data.value
  //     );
  //     console.log("findIndexing===",findIndexing);
  //     if (findIndexing != -1) {
  //       console.log("fromTab[findIndexing]",fromTab[findIndexing]);
  //       setappendFromData(fromTab[findIndexing]);
  //       setFromcurrencyImage(fromTab[findIndexing].image);
  //       setfromCurrency(fromTab[findIndexing].currencySymbol);
  //       swapPrice();
  //     }

  //  }

  const preferPayment = [
    { value: "All payments", text: "All payments" },
    {
      value: "Bank Transfer",
      text: "Bank Transfer",
    },
    { value: "UPI ID", text: "UPI ID" },
    { value: "Paytm", text: "Paytm" },
  ];

  const preferPaymentOption = preferPayment[0];

  const payTime = [
    { value: "15", text: "15 Minutes" },
    {
      value: "30",
      text: "30 Minutes",
    },
    { value: "45", text: "45 Minutes" },
    { value: "60", text: "1 Hour" },
    { value: "120", text: "2 Hours" },
    { value: "180", text: "3 Hours" },
    { value: "240", text: "4 Hours" },
    { value: "300", text: "5 Hours" },
    { value: "360", text: "6 Hours" },
  ];

  const choosePaytime = async (e, option) => {
    console.log("payment time==", option.value);
    setpayment_time(option.value);
  };

  useEffect(() => {
    getAllcurrency();

    let getToken = localStorage.getItem("user_token");
    if (getToken != "" && getToken != undefined && getToken != null) {
      getKycData();
    } else {
    }
    fiat_price();
  }, [0]);


  const [currencyvalid, setcurrencyvalid, currencyvalidref] = useState(false);
  const [fiatcurrencyvalid, setfiatcurrencyvalid, fiatcurrencyvalidref] = useState(false);
  const [LimitFromvalid, setLimitFromvalid, LimitFromvalidref] = useState(false);
  const [limitTovalidate, setlimitTovalidate, setlimitTovalidateref] = useState(false);

  const validate = async (values) => {
    const errors = {};
    if (cryptoCurrencyref.current == "") {
      errors.currency = "Currency is required field";
      setcurrencyvalid(true);
    }
    else
    {
      setcurrencyvalid(false);
    }

    if (values.quantity == "") {
      errors.quantity = "Quantity is a required field";
      seterrquantity(true);
    } 
    else if (values.quantity <= 0) {
      errors.quantity = "Enter Valid Quantity";
      seterrquantity(true);
    } else
    {
      seterrquantity(false);
    }

      if (crytpoWithCashref.current == "") {
        setfiatcurrencyvalid(true)
        errors.crytpoWithCash = "Choose any fiat currency"
      }
      else
      {
        setfiatcurrencyvalid(false)
      } 
       if (values.limitFrom == "") {
        //seterrquantity(false);
        errors.limitFrom = "Minimum Quantity is a required field";
        setLimitFromvalid(true);
      } else if (values.limitFrom <= 0) {
        errors.limitFrom = "Enter valid amount";
        setLimitFromvalid(true);
      }
      else
      {
        setLimitFromvalid(false);
      }

      if (values.limitTo == "") {
      errors.limitTo = "Maximum Quantity is a required field";
      setlimitTovalidate(true);
    } else if (values.limitTo > 0) {
      errors.limitTo = "Enter valid Amount";
      setlimitTovalidate(true);
    } else {
      setlimitTovalidate(false);
    }

    setvalidationnErr(errors);

    return errors;

    if (values.price == "") {
      errors.price = "Price is a required field";
      serpriceError(true);
    } else if (values.price <= 0) {
      errors.price = "Enter valid Amount";
      serpriceError(true);
    } else {
      serpriceError(false);
    }

    if (values.cryptoCurrency == "") {
      // errors.password = 'Password and confirm password does not match';
      errors.cryptoCurrency = "Crypto Currency required field";
      seterrcryptoCurrency(true);
    }
    if (values.crytpoWithCash == "") {
      // errors.password = 'Password and confirm password does not match';
      errors.crytpoWithCash = "WithCash is a required field";
      seterrcrytpoWithCash(true);
    }
    if (values.prferPay == "") {
      // errors.password = 'Password and confirm password does not match';
      errors.prferPay = "Prefer payment is a required field";
      seterrprferPay(true);
    }
    if (Terms == false) {
      errors.terms = "Terms is a required field";
      setTermsValidation(true);
    } else {
      setTermsValidation(false);
    }

    if (payment_timeref.current == "") {
      errors.payment_time = "Payment Time required field";
      seterrpaymentTime(true);
    }
    return errors;
  };

  const submitPost = async (type) => {
    //if(kycstatus == 1){
console.log( LimitFromvalidref.current ,
  seterrquantityref.current ,
  currencyvalidref.current ,
  serpriceErrorref.current ,
  setlimitTovalidateref.current ,)
    validate(formValue);
    formValue["fromCurrency"] = cryptoCurrencyref.current;
    formValue["toCurrency"] = crytpoWithCashref.current;
    formValue["preferpayment"] = prferPay;
    formValue["orderType"] = type;
    formValue["firstCurrency"] = firstCurrency;
    formValue["secondCurrency"] = secondCurrency;
    formValue["pay_time"] = payment_timeref.current;
    // if (
    //   LimitFromvalidref.current == false &&
    //   seterrquantityref.current == false &&
    //   currencyvalidref.current == false &&
    //   seterrquantityref.current == false &&
    //   serpriceErrorref.current == false &&
    //   setlimitTovalidateref.current == false
    // ) {
      var data = {
        apiUrl: apiService.p2pOrder,
        payload: formValue,
      };
      setbuttonLoader(true);
      var resp = await postMethod(data);
      setbuttonLoader(false);
      if (resp.status) {
        toast.success(resp.Message);
        formValue["quantity"] = "";
        formValue["price"] = "";
        formValue["limitFrom"] = "";
        formValue["limitTo"] = "";
        formValue["isTerms"] = "";
        formValue["firstCurrency"] = "";
        formValue["secondCurrency"] = "";
        //navigate("/p2p/chat/"+resp.orderId);
        navigate("/p2p");
      } else {
        console.log("error response====", resp);
        if (resp.bank) {
          toast.error(resp.Message);
          navigate("/Paymentmethod");
        } else {
          toast.error(resp.Message);
        }
      }
    // } else {
    //   toast.error("Please give valid fields");
    // }
    console.log(formValue, "ererwearewr");
    // }else{
    //   if(kycstatus == 2)
    //   {
    //     toast.error("Your kyc verification is pending, please wait for admin approval");
    //     navigate('/kyc');
    //   }
    //   else
    //   {
    //     toast.error("Please verify your kyc");
    //     navigate('/kyc');
    //   }

    // }
  };

  const getKycData = async () => {
    try {
      var data = {
        apiUrl: apiService.getKYCDetails,
      };
      var resp = await getMethod(data);
      if (resp.status) {
        var responseData = resp.data.kycstatus;
        setkycstatus(responseData);
      } else {
        var responseData = 0;
        setkycstatus(responseData);
      }
    } catch (error) {
      var responseData = 0;
      setkycstatus(responseData);
    }
  };

  const fiat_price = async () => {
    var payload = {
      fromCurrency: fromCurrencyref.current,
      toCurrency: toCurrencyref.current,
    };
    // var payload = {
    //   fromCurrency: "USDT",
    //   toCurrency: "INR"
    // }
    var data = {
      apiUrl: apiService.fetch_price,
      payload: payload,
    };

    var resp = await postMethod(data);
    console.log(resp.data, "fiat price -=-=-resp=-=-");
    console.log("cryptoPricesref.current===", cryptoPricesref.current);
    if (resp) {
      let index = cryptoPricesref.current.filter(
        (x) => x.symbol == fromCurrencyref.current
      );
      var high =
        resp.data.highprice != 0 ? resp.data.highprice : index[0].price;
      var low = resp.data.lowprice != 0 ? resp.data.lowprice : index[0].price;
      sethighprice(high);
      setlowprice(low);
    }
  };

  const [tab, setTab] = useState("buy");
  const tabSelect = async (type) => {
    getAllcurrency();
    setTab(type);
    if (type == "buy") {
      cryptoCurrencyref.current = fromCurrencyref.current;
    } else {
      cryptoCurrencyref.current = fromCurrencyref.current;
    }
  };

  const navback = async () => {
    navigate("/p2p");
  };

  return (
    <div className="">
      <main className="main-content tradepage-bg  bg-cover onlywhitee new_login_bb">
        <Header />
        <Container maxWidth="xl"
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
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            
              <div className="card_logoki pading_cardd post_card">
              
                      <Button className="back_butn" onClick={() => navback()}>
                        <i className="ri-arrow-left-line"></i> Back
                      </Button>
              
                   
                <Grid
                  container
                  spacing={2}
                  justifyContent={"start"}
                  marginTop={"20px"}
                >

                
                  {/* Item for xs (extra small) screens */}
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div className="form_content">
                      {/* <Button className="back_butn" onClick={() => navback()}>
                        <i className="ri-arrow-left-line"></i> Back
                      </Button> */}
                      <h1 className="mb-4">Fill in the Details</h1>
                    </div>
                  </Grid>
                </Grid>

                <div className="tabs_inside">
                  <ul className="nav nav-tabs">
                    <li className="active">
                      <a
                        data-toggle="tab"
                        href="#buy"
                        className="active"
                        onClick={() => tabSelect("buy")}
                      >
                        I want to Buy
                      </a>
                    </li>
                    <li>
                      <a
                        data-toggle="tab"
                        href="#Sell"
                        onClick={() => tabSelect("sell")}
                      >
                        I want to Sell
                      </a>
                    </li>
                  </ul>
                </div>
                {tab == "buy" ? (
                  <div id="buy" className="tab-pane fade in active show">
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
                            lg={12}
                            xl={12}
                            className="pt-0"
                          >
                            <div className="step-5 ">
                              <div className="form register_login  marhing_pading pl-0 paddinte_ledy_o">
                                <form className="form_pading_s buy-padding ">
                                  <div className="form-group">
                                    <label>Crypto Currency </label>
                                    <Dropdown
                                      placeholder="Crypto Currency "
                                      fluid
                                      selection
                                      options={allCurrency}
                                      onChange={chooseCrypto}
                                      className="text_memu"
                                      search
                                    />
                                  </div>
                                  <div className="red_alert">
                                    {currencyvalidref.current == true ? (
                                      <p className="text-danger">
                                        {" "}
                                        {validationnErr.currency}{" "}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <div className="form-group  ">
                                    <label>
                                      Crypto Quantity{" "}
                                      <small className="primary_red">*</small>
                                    </label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      id="exampleInputPassword1"
                                      min="0"
                                      placeholder="Enter quantity"
                                      name="quantity"
                                      value={quantity}
                                      onChange={handleChange}
                                    />
                                  </div>
                                  <div className="red_alert">
                                    {seterrquantityref.current == true ? (
                                      <p className="text-danger">
                                        {" "}
                                        {validationnErr.quantity}{" "}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <div className="form-group">
                                    <label>With Cash</label>
                                    <Dropdown
                                      placeholder="With Cash"
                                      fluid
                                      selection
                                      options={allCurrencyFiat}
                                      onChange={withCash}
                                      className="text_memu"
                                    />
                                  </div>
                                  <div className="red_alert">
                                    {fiatcurrencyvalidref.current == true ? (
                                      <p className="text-danger">
                                        {" "}
                                        {validationnErr.crytpoWithCash}{" "}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <div className="form-group">
                                    <label>
                                      Min. Limit Amount{" "}
                                      <small className="primary_red">*</small>
                                    </label>
                                    <div className="postion_reletitt">
                                      <input
                                        type="number"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        placeholder="Min. Limit Amount"
                                        name="limitFrom"
                                        value={limitFrom}
                                        onChange={handleChange}
                                        min="0"
                                      />
                                      <div className="input-group-addon">
                                        <i className="font_normal">
                                          {cryptoCurrencyref.current}
                                        </i>
                                      </div>
                                    </div>
                                    
                                  </div>
                                  <div className="red_alert">
                                      {LimitFromvalidref.current == true ? (
                                        <p className="text-danger">
                                          {" "}
                                          {validationnErr.limitFrom}{" "}
                                        </p>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  <div className="form-group">
                                    <label>
                                      Max. Limit Amount{" "}
                                      <small className="primary_red">*</small>
                                    </label>
                                    <div className="postion_reletitt">
                                      <input
                                        type="number"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        placeholder="Max. Limit Amount"
                                        name="limitTo"
                                        value={limitTo}
                                        onChange={handleChange}
                                        min="0"
                                      />
                                      <div className="input-group-addon">
                                        <i className="font_normal">
                                          {cryptoCurrencyref.current}
                                        </i>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="form-group  ">
                                    <label>
                                      Price
                                      <small className="primary_red">*</small>
                                    </label>
                                    <input
                                      type="number"
                                      name="price"
                                      className="form-control"
                                      min="0"
                                      id="exampleInputPassword1"
                                      placeholder="Enter lowest price"
                                      value={price}
                                      onChange={handleChange}
                                    /> 
                                   
                                  </div>
                                  <div className="red_alert">
                                      {priceError == true ? (
                                        <p className="text-danger">
                                          {" "}
                                          {validationnErr.price}{" "}
                                        </p>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  <div className="form-group  ">
                                    <label>
                                      Lowest Price
                                      <small className="primary_red">*</small>
                                    </label>
                                    <input
                                      type="email"
                                      className="form-control"
                                      id="exampleInputPassword1"
                                      value={lowpriceref.current}
                                      readOnly
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label>Payment Method</label>
                                    <Dropdown
                                      placeholder="Payment Method"
                                      fluid
                                      selection
                                      options={preferPayment}
                                      onChange={prferPayments}
                                      className="text_memu"
                                    />
                                    
                                  </div>
                                  <div className="red_alert">
                                      {errprferPay == true ? (
                                        <p className="text-danger">
                                          {" "}
                                          {validationnErr.prferPay}{" "}
                                        </p>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  <div className="form-group">
                                    <label>
                                      Payment Time{" "}
                                      <small className="primary_red">*</small>
                                    </label>
                                    <Dropdown
                                      placeholder="Payment Time"
                                      fluid
                                      selection
                                      options={payTime}
                                      onChange={choosePaytime}
                                      className="text_memu"
                                    />
                                    
                                  </div>
                                  <div className="red_alert">
                                      {errpaymentTime == true ? (
                                        <p className="text-danger">
                                          {" "}
                                          {validationnErr.payment_time}{" "}
                                        </p>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                </form>
                              </div>

                              <div className="form register_login  marhing_pading pl-0 paddinte_ledy_o pt-0">
                                <div className="aling_caseds">
                                  <button
                                    type="button"
                                    className="btn btn-primary w-100 m-0 burdas_buttnd cancel_burdas "
                                    onClick={() => navback()}
                                  >
                                    Cancel
                                  </button>
                                  {buttonLoader == false ? (
                                    <button
                                      type="button"
                                      className="btn btn-primary w-100 m-0"
                                      onClick={() => submitPost("buy")}
                                    >
                                      Post Ad
                                    </button>
                                  ) : (
                                    <button type="button"
                                      className="btn btn-primary w-100 m-0">Loading...</button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                ) : (
                  <div id="Sell" className="tab-pane fade">
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
                            lg={12}
                            xl={12}
                            className="pt-0"
                          >
                            <div className="step-5 ">
                              <div className="form register_login  marhing_pading pl-0 paddinte_ledy_o">
                                <form className="form_pading_s buy-padding">
                                  <div className="form-group">
                                    <label>Crypto Currency </label>
                                    <Dropdown
                                      placeholder="Crypto Currency "
                                      fluid
                                      selection
                                      options={allCurrency}
                                      onChange={chooseCrypto}
                                      className="text_memu"
                                      search
                                    />
                                  
                                  </div>
                                  <div className="red_alert">
                                      {errcryptoCurrency == true ? (
                                        <p className="text-danger">
                                          {" "}
                                          {validationnErr.cryptoCurrency}{" "}
                                        </p>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  <div className="form-group  ">
                                    <label>
                                      Crypto Quantity{" "}
                                      <small className="primary_red">*</small>
                                    </label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      id="exampleInputPassword1"
                                      placeholder="Enter quantity"
                                      name="quantity"
                                      value={quantity}
                                      onChange={handleChange}
                                    />
                                    
                                  </div>
                                  <div className="red_alert">
                                      {seterrquantityref.current == true ? (
                                        <p className="text-danger">
                                          {" "}
                                          {validationnErr.quantity}{" "}
                                        </p>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  <div className="form-group">
                                    <label>With Cash</label>
                                    <Dropdown
                                      placeholder="With Cash"
                                      fluid
                                      selection
                                      options={allCurrencyFiat}
                                      onChange={withCash}
                                      className="text_memu"
                                    />
                                    
                                  </div>
                                  <div className="red_alert">
                                      {errcrytpoWithCash == true ? (
                                        <p className="text-danger">
                                          {" "}
                                          {validationnErr.crytpoWithCash}{" "}
                                        </p>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  <div className="form-group">
                                    <label>
                                      Min. Limit Amount{" "}
                                      <small className="primary_red">*</small>
                                    </label>
                                    <div className="postion_reletitt">
                                      <input
                                        type="number"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        placeholder="Min. Limit Amount"
                                        name="limitFrom"
                                        value={limitFrom}
                                        onChange={handleChange}
                                        min="0"
                                      />
                                      <div className="input-group-addon">
                                        <i className="font_normal">
                                          {cryptoCurrencyref.current}
                                        </i>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="red_alert">
                                    {LimitFromvalidref == true ? (
                                      <p className="text-danger">
                                        {" "}
                                        {validationnErr.limitFrom}{" "}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <div className="form-group">
                                    <label>
                                      Max. Limit Amount{" "}
                                      <small className="primary_red">*</small>
                                    </label>
                                    <div className="postion_reletitt">
                                      <input
                                        type="number"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        placeholder="Max. Limit Amount"
                                        name="limitTo"
                                        value={limitTo}
                                        onChange={handleChange}
                                        min="0"
                                      />
                                      <div className="input-group-addon">
                                        <i className="font_normal">
                                          {cryptoCurrencyref.current}
                                        </i>
                                      </div>
                                    </div>
                                   
                                  </div>
                                  <div className="red_alert">
                                      {setlimitTovalidateref.current == true ? (
                                        <p className="text-danger">
                                          {" "}
                                          {validationnErr.limitTo}{" "}
                                        </p>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  <div className="form-group  ">
                                    <label>
                                      Price
                                      <small className="primary_red">*</small>
                                    </label>
                                    <input
                                      type="number"
                                      name="price"
                                      min="0"
                                      className="form-control"
                                      id="exampleInputPassword1"
                                      placeholder="Enter highest price"
                                      value={price}
                                      onChange={handleChange}
                                    />
                                   
                                  </div>
                                  <div className="red_alert">
                                      {priceError == true ? (
                                        <p className="text-danger">
                                          {" "}
                                          {validationnErr.price}{" "}
                                        </p>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  <div className="form-group  ">
                                    <label>
                                      Highest Price
                                      <small className="primary_red">*</small>
                                    </label>
                                    <input
                                      type="email"
                                      className="form-control"
                                      id="exampleInputPassword1"
                                      value={highpriceref.current}
                                      readOnly
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label>Payment Method</label>
                                    <Dropdown
                                      placeholder="Payment Method"
                                      fluid
                                      selection
                                      options={preferPayment}
                                      onChange={prferPayments}
                                      className="text_memu"
                                    />
                                   
                                  </div>
                                  <div className="red_alert">
                                      {errprferPay == true ? (
                                        <p className="text-danger">
                                          {" "}
                                          {validationnErr.prferPay}{" "}
                                        </p>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  <div className="form-group">
                                    <label>
                                      Payment Time{" "}
                                      <small className="primary_red">*</small>
                                    </label>
                                    <Dropdown
                                      placeholder="Payment Time"
                                      fluid
                                      selection
                                      options={payTime}
                                      onChange={choosePaytime}
                                      className="text_memu"
                                    />
                                    
                                  </div>
                                  <div className="red_alert">
                                      {errpaymentTime == true ? (
                                        <p className="text-danger">
                                          {" "}
                                          {validationnErr.payment_time}{" "}
                                        </p>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                </form>
                              </div>

                              <div className="form register_login  marhing_pading pl-0 paddinte_ledy_o pt-0">
                                <div className="aling_caseds">
                                  <button
                                    type="button"
                                    className="btn btn-primary w-100 m-0 burdas_buttnd cancel_burdas"
                                    onClick={() => navback()}
                                  >
                                    Cancel
                                  </button>
                                  {buttonLoader == false ? (
                                    <button
                                      type="button"
                                      className="btn btn-primary w-100 m-0"
                                      onClick={() => submitPost("sell")}
                                    >
                                      Post Ad
                                    </button>
                                  ) : (
                                    <button type="button"
                                      className="btn btn-primary w-100 m-0">Loading...</button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                )}
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
