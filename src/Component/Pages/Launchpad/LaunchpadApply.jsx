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
import useStateRef from "react-usestateref";
import DashboardBg from "../../../img/Dashboard/DashboadBg.jpg";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    var token = localStorage.getItem("user_token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  const countryOptions = [
    { key: "e", text: "ERC20", value: "ERC20" },
    { key: "b", text: "BEP20", value: "BEP20" },
    { key: "t", text: "TRC20", value: "TRC20" },
  ];
  const initialFormValue = {
    name: "",
    email: "",
    position: "",
    refemail: "",
    project_name: "",
    Project_description: "",
    token_feature: "",
    official_website: "",
    symbol: "",
    currency_name: "",
    whitepaper_link: "",
    milestone: "",
    contract_address: "",
    description: "",
    startDate: "",
    endDate: "",
    buyAmount: "",
    softCap: "",
    hardCap: "",
    token_supply: "",
    totalSupply: "",
    price: "",
    telegram: "",
    instagramlink: "",
    twitterLink: "",
    youtubeChannel: "",
    Youtube_video: "",
  };

  const [formValue, setFormValue] = useState(initialFormValue);
  const [buttonLoader, setbuttonLoader] = useState(false);
  const [namevalidate, setnamevalidate, namevalidateref] = useStateRef(false);
  const [emailvalidate, setemailvalidate, emailvalidateref] =
    useStateRef(false);

  const [
    project_namevalidate,
    setproject_namevalidate,
    project_namevalidateref,
  ] = useStateRef(false);
  const [
    token_featurevalidate,
    settoken_featurevalidate,
    token_featurevalidateref,
  ] = useStateRef(false);

  const [
    Project_descriptionvalidate,
    setProject_descriptionvalidate,
    Project_descriptionvalidateref,
  ] = useStateRef(false);

  const [
    official_websitevalidate,
    setofficial_websitevalidate,
    official_websitevalidateref,
  ] = useStateRef(false);
  const [symbolvalidate, setsymbolvalidate, symbolvalidateref] =
    useStateRef(false);
  const [
    CurrencyImageValidate,
    setCurrencyImageValidate,
    CurrencyImageValidateref,
  ] = useStateRef(false);

  const [
    currency_namevalidate,
    setcurrency_namevalidate,
    currency_namevalidateref,
  ] = useStateRef(false);
  const [
    whitepaper_linkvalidate,
    setwhitepaper_linkvalidate,
    whitepaper_linkvalidateref,
  ] = useStateRef(false);
  const [milestonevalidate, setmilestonevalidate, milestonevalidateref] =
    useStateRef(false);
  const [
    contract_addressvalidate,
    setcontract_addressvalidate,
    contract_addressvalidateref,
  ] = useStateRef(false);
  const [descriptionvalidate, setdescriptionvalidate, descriptionvalidateref] =
    useStateRef(false);
  const [
    token_contract_addressvalidate,
    settoken_contract_addressvalidate,
    token_contract_addressvalidateref,
  ] = useStateRef(false);
  const [
    token_contract_address,
    settoken_contract_address,
    token_contract_addressref,
  ] = useStateRef(false);

  const [positionvalidate, setpositionvalidate, positionvalidateref] =
    useStateRef(false);
  const [refemailvalidate, setrefemailvalidate, refemailvalidateref] =
    useStateRef(false);

  const [startDatevalidate, setstartDatevalidate, startDatevalidateref] =
    useStateRef(false);
  const [endDatevalidate, setendDatevalidate, endDatevalidateref] =
    useStateRef(false);
  const [networkvalidate, setnetworkvalidate, networkvalidateref] =
    useStateRef(false);
  const [buyAmountvalidate, setbuyAmountvalidate, buyAmountvalidateref] =
    useStateRef(false);
  const [softCapvalidate, setsoftCapvalidate, softCapvalidateref] =
    useStateRef(false);
  const [hardCapvalidate, sethardCapvalidate, hardCapvalidateref] =
    useStateRef(false);
  const [
    token_supplyvalidate,
    settoken_supplyvalidate,
    token_supplyvalidateref,
  ] = useStateRef(false);
  const [totalSupplyvalidate, settotalSupplyvalidate, totalSupplyvalidateref] =
    useStateRef(false);
  const [pricevalidate, setpricevalidate, pricevalidateref] =
    useStateRef(false);

  const [telegramvalidate, settelegramvalidate, telegramvalidateref] =
    useStateRef(false);
  const [
    instagramlinkvalidate,
    setinstagramlinkvalidate,
    instagramlinkvalidateref,
  ] = useStateRef(false);
  const [twitterLinkvalidate, settwitterLinkvalidate, twitterLinkvalidateref] =
    useStateRef(false);
  const [
    youtubeChannelvalidate,
    setyoutubeChannelvalidate,
    youtubeChannelvalidateref,
  ] = useStateRef(false);
  const [
    Youtube_videovalidate,
    setYoutube_videovalidate,
    Youtube_videovalidateref,
  ] = useStateRef(false);
  const [termsvalidate, settermsvalidate, termsvalidateref] =
    useStateRef(false);
  const [terms, setterms, termsref] = useStateRef("");

  const [validationnErr, setvalidationnErr] = useState({});
  const [stage1, setstage1] = useState("step1 ");
  const [stage2, setstage2] = useState("step2 d-none");
  const [stage3, setstage3] = useState("step3 d-none");
  const [stage4, setstage4] = useState("step4 d-none");
  const [stage5, setstage5] = useState("step5 d-none");
  const [stage6, setstage6] = useState("step6 d-none");

  const [checkedOne, setCheckedOne] = useState(false);
  const [checkedTwo, setCheckedTwo] = useState(false);

  const updateTwo = () => {
    console.log(checkedTwo, "-=-=-=222");
    if (checkedTwo == true) {
      setCheckedTwo(false);
      setCheckedOne(true);
      setterms("yes");
    } else {
      setterms("no");
      setCheckedTwo(true);
      setCheckedOne(false);
    }
    console.log(checkedTwo, "-=-=-=222");
  };

  const updateOne = () => {
    console.log(checkedOne, "=-=-=-=-111");
    if (checkedOne == true) {
      setCheckedOne(false);
      setCheckedTwo(true);
      setterms("no");
    } else {
      setterms("Yes");
      setCheckedOne(true);
      setCheckedTwo(false);
    }
    console.log(checkedOne, "-=-=-=111");
  };

  const [tokenCheckone, settokenCheckone] = useState(false);
  const [tokenchecktwo, settokenchecktwo] = useState(false);

  const tokenTwo = () => {
    console.log(tokenchecktwo, "-=-=-=222");
    if (tokenchecktwo == true) {
      settokenchecktwo(false);
      settokenCheckone(true);
      settoken_contract_address("Security");
    } else {
      settoken_contract_address("Utility");
      settokenchecktwo(true);
      settokenCheckone(false);
    }
    console.log(tokenchecktwo, "-=-=-=222");
  };

  const tokenOne = () => {
    console.log(tokenCheckone, "=-=-=-=-111");
    if (tokenCheckone == true) {
      settokenCheckone(false);
      settokenchecktwo(true);
      settoken_contract_address("Utility");
    } else {
      settoken_contract_address("Security");
      settokenCheckone(true);
      settokenchecktwo(false);
    }
    console.log(tokenCheckone, "-=-=-=111");
  };

  const handleChange = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formData = { ...formValue, ...{ [name]: value } };
    setFormValue(formData);
  };

  const cancel_function = () => {
    console.log("===========work");
    navigate("/launchpadlistnew");
  };

  const pageBackgroundStyle = {
    backgroundImage: `url(${DashboardBg})`,
    backgroundSize: "cover",
    backgroundPosition: "top center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
  };

  const validate = async () => {
    const errors = {};
    if (formValue.email == "") {
      errors.email = "Email is required field";
      setemailvalidate(true);
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formValue.email)
    ) {
      errors.email = "Invalid Email address";
      setemailvalidate(true);
    } else {
      setemailvalidate(false);
    }

    if (formValue.name == "") {
      errors.name = "Name is required field";
      setnamevalidate(true);
    } else {
      setnamevalidate(false);
    }

    if (formValue.position == "") {
      errors.position = "Position is required field";
      setpositionvalidate(true);
    } else {
      setpositionvalidate(false);
    }

    if (formValue.refemail == "") {
      errors.refemail = "Refer mail is required field";
      setrefemailvalidate(true);
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formValue.refemail)
    ) {
      errors.refemail = "Invalid Email address";
      setrefemailvalidate(true);
    } else {
      setrefemailvalidate(false);
    }

    setvalidationnErr(errors);
    return errors;
  };

  const validate2 = async () => {
    const errors = {};
    if (formValue.project_name == "") {
      errors.project_name = "Project name is required field";
      setproject_namevalidate(true);
    } else {
      setproject_namevalidate(false);
    }

    // if (formValue.token_feature == "") {
    //   errors.token_feature = "Token Feature is required field";
    //   settoken_featurevalidate(true);
    // } else {
    //   settoken_featurevalidate(false);
    // }

    // if (formValue.Project_description == "") {
    //   errors.Project_description = "Project Description is required field";
    //   setProject_descriptionvalidate(true);
    // } 
    // else {
    //   setProject_descriptionvalidate(false);
    // }
    if (formValue.official_website == "") {
      errors.official_website = "website required field";
      setofficial_websitevalidate(true);
    } else {
      const regex = new RegExp(
        "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
      );
      if (regex.test(formValue.official_website)) {
        setofficial_websitevalidate(false);
      } else {
        errors.official_website = "Invalid url format";
        setofficial_websitevalidate(true);
      }
    }
    if (currencyImage == "") {
      errors.image = "Currency Image is required";
      setCurrencyImageValidate(true);
    } else {
      setCurrencyImageValidate(false);
    }
    if (formValue.symbol == "") {
      errors.symbol = "Symbol required field";
      setsymbolvalidate(true);
    } else {
      setsymbolvalidate(false);
    }
    if (formValue.currency_name == "") {
      errors.currency_name = "Coin (or) Token is required field";
      setcurrency_namevalidate(true);
    } else {
      setcurrency_namevalidate(false);
    }
    if (formValue.whitepaper_link == "") {
      errors.whitepaper_link = "Permanent Link is required field";
      setwhitepaper_linkvalidate(true);
    } else {
      const regex = new RegExp(
        "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
      );
      if (regex.test(formValue.whitepaper_link)) {
        setwhitepaper_linkvalidate(false);
      } else {
        errors.whitepaper_link = "Invalid url format";
        setwhitepaper_linkvalidate(true);
      }
    }
    if (formValue.milestone == "") {
      errors.milestone = "Roadmap detail is required field";
      setmilestonevalidate(true);
    } else {
      setmilestonevalidate(false);
    }
    if (formValue.contract_address == "") {
      errors.contract_address = "Token contract address is required field";
      setcontract_addressvalidate(true);
    } else {
      setcontract_addressvalidate(false);
    }
    if (formValue.description == "") {
      errors.description = "Description is required field";
      setdescriptionvalidate(true);
    } else {
      setdescriptionvalidate(false);
    }
    // if (token_contract_addressref.current == false) {
    //   errors.token_contract_address =
    //     " contract Address type is required field";
    //   settoken_contract_addressvalidate(true);
    // } else {
    //   settoken_contract_addressvalidate(false);
    // }
    setvalidationnErr(errors);
    return errors;
  };

  const validate3 = async () => {
    const errors = {};

    var date = new Date();
    var todayDate = date.toISOString().substring(0, 10);

    if (formValue.startDate == "" && formValue.startDate == 0) {
      errors.startDate = "Start Date required field";
      setstartDatevalidate(true);
    } else if (todayDate > formValue.startDate) {
      setstartDatevalidate(true);
      errors.startDate = "Start date should be present date";
    } else {
      setstartDatevalidate(false);
    }
    if (formValue.endDate == "" && formValue.endDate == 0) {
      errors.endDate = "End date required field";
      setendDatevalidate(true);
    } else if (formValue.endDate < formValue.startDate) {
      errors.endDate = "End date should not be early than start date";
      setendDatevalidate(true);
    } else {
      setendDatevalidate(false);
    }
    if (network == "") {
      errors.network = "Network is required field";
      setnetworkvalidate(true);
    } else {
      setnetworkvalidate(false);
    }
    if (formValue.buyAmount == "") {
      errors.buyAmount = "Buy Amountis required field";
      setbuyAmountvalidate(true);
    } else {
      setbuyAmountvalidate(false);
    }
    if (formValue.softCap == "") {
      errors.softCap = "Soft cap Link is required field";
      setsoftCapvalidate(true);
    } else {
      setsoftCapvalidate(false);
    }
    if (formValue.hardCap == "") {
      errors.hardCap = "Hard cap detail is required field";
      sethardCapvalidate(true);
    } else {
      sethardCapvalidate(false);
    }

    if (formValue.token_supply == "" && formValue.token_supply == 0) {
      errors.token_supply = "Token supply address is required field";
      settoken_supplyvalidate(true);
    } else {
      settoken_supplyvalidate(false);
    }
    if (formValue.totalSupply == "" && formValue.totalSupply == 0) {
      errors.totalSupply = "Token sale is required field";
      settotalSupplyvalidate(true);
    } else {
      settotalSupplyvalidate(false);
    }
    // if (formValue.price == "" && formValue.price == 0) {
    //   errors.price = "public sale type is required field";
    //   setpricevalidate(true);
    // } else {
    //   setpricevalidate(false);
    // }
    setvalidationnErr(errors);
    return errors;
  };

  const validate4 = async () => {
    const errors = {};

    if (formValue.telegram == "") {
      errors.telegram = "Telegram required field";
      settelegramvalidate(true);
    } else {
      const regex = new RegExp(
        "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
      );
      if (regex.test(formValue.telegram)) {
        settelegramvalidate(false);
      } else {
        errors.telegram = "Invalid url format";
        settelegramvalidate(true);
      }
    }
    if (formValue.instagramlink == "") {
      errors.instagramlink = "Instagramlink required field";
      setinstagramlinkvalidate(true);
    } else {
      const regex = new RegExp(
        "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
      );
      if (regex.test(formValue.instagramlink)) {
        setinstagramlinkvalidate(false);
      } else {
        errors.instagramlink = "Invalid url format";
        setinstagramlinkvalidate(true);
      }
    }
    if (formValue.twitterLink == "") {
      errors.twitterLink = "TwitterLink required field";
      settwitterLinkvalidate(true);
    } else {
      const regex = new RegExp(
        "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
      );
      if (regex.test(formValue.twitterLink)) {
        settwitterLinkvalidate(false);
      } else {
        errors.twitterLink = "Invalid url format";
        settwitterLinkvalidate(true);
      }
    }
    if (formValue.youtubeChannel == "") {
      errors.youtubeChannel = "YoutubeChannel required field";
      setyoutubeChannelvalidate(true);
    } else {
      const regex = new RegExp(
        "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
      );
      if (regex.test(formValue.youtubeChannel)) {
        setyoutubeChannelvalidate(false);
      } else {
        errors.youtubeChannel = "Invalid url format";
        setyoutubeChannelvalidate(true);
      }
    }
    if (formValue.Youtube_video == "") {
      errors.Youtube_video = "Youtube_video required field";
      setYoutube_videovalidate(true);
    } else {
      const regex = new RegExp(
        "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
      );
      if (regex.test(formValue.Youtube_video)) {
        setYoutube_videovalidate(false);
      } else {
        errors.Youtube_video = "Invalid url format";
        setYoutube_videovalidate(true);
      }
    }
    setvalidationnErr(errors);
    return errors;
  };

  const validate5 = async () => {
    const errors = {};
    if (termsref.current == "") {
      errors.terms = "Choose any one answer";
      settermsvalidate(true);
    } else {
      settermsvalidate(false);
    }
    setvalidationnErr(errors);
    return errors;
  };
  const nexttabfun = async (data) => {
    console.log(data, "=-=-=-=-data");
    if (data == "step1") {
      validate();
      if (
        namevalidateref.current == false &&
        emailvalidateref.current == false &&
        positionvalidateref.current == false &&
        refemailvalidateref.current == false
      ) {
        setstage2("step2");
        setstage1("step1 d-none");
        // localStorage.setItem("stage", 2);
      }
    } else if (data == "step2") {
      validate2();
      if (
        project_namevalidateref.current == false &&
        token_featurevalidateref.current == false &&
        Project_descriptionvalidateref.current == false &&
        official_websitevalidateref.current == false &&
        symbolvalidateref.current == false &&
        CurrencyImageValidateref.current == false &&
        currency_namevalidateref.current == false &&
        whitepaper_linkvalidateref.current == false &&
        milestonevalidateref.current == false &&
        contract_addressvalidateref.current == false &&
        descriptionvalidateref.current == false &&
        token_contract_addressvalidateref.current == false
      ) {
        setstage3("step3");
        setstage2("step2 d-none");
        // localStorage.setItem("stage", 3);
      }
    } else if (data == "step3") {
      validate3();
      if (
        startDatevalidateref.current == false &&
        endDatevalidateref.current == false &&
        networkvalidateref.current == false &&
        buyAmountvalidateref.current == false &&
        softCapvalidateref.current == false &&
        hardCapvalidateref.current == false &&
        token_supplyvalidateref.current == false &&
        totalSupplyvalidateref.current == false &&
        pricevalidateref.current == false
      ) {
        setstage4("step4");
        setstage3("step3 d-none");
        // localStorage.setItem("stage", 4);
      }
    } else if (data == "step4") {
      validate4();
      if (
        telegramvalidateref.current == false &&
        instagramlinkvalidateref.current == false &&
        twitterLinkvalidateref.current == false &&
        currency_namevalidateref.current == false &&
        youtubeChannelvalidateref.current == false &&
        Youtube_videovalidateref.current == false
      ) {
        setstage5("step5");
        setstage4("step4 d-none");
        // localStorage.setItem("stage", 5);
      }
    } else if (data == "step5") {
      validate5();
      if (terms != "") {
        console.log(terms, "===lterms");
        settermsvalidate(false);
        setstage6("step6");
        setstage5("step5 d-none");
      }
    } else {
    }
  };
  const formSubmit = async () => {
    formValue["network"] = network;
    formValue["currency_image"] = currencyImage;
    formValue["address_type"] = token_contract_addressref.current;
    formValue["terms"] = termsref.current;

    var data = {
      apiUrl: apiService.submitForm,
      payload: formValue,
    };
    setbuttonLoader(true);
    var resp = await postMethod(data);
    setbuttonLoader(false);
    if (resp.status == true) {
      navigate("/launchpadlistnew");
      toast.success(resp.Message);
    } else {
      toast.error(resp.Message);
    }
  };

  const [selectedOption, setselectedOption] = useState({});
  const [network, setnetwork] = useState("");

  const handleChangedrop = (e, option) => {
    setselectedOption(option.value);
    setnetwork(option.value);
  };

  const back_function = async (data) => {
    console.log(data, "=-==--data");
    if (data == "step2") {
      setstage1("step1");
      setstage2("step2 d-none");
    } else if (data == "step3") {
      setstage2("step2");
      setstage3("step3 d-none");
    } else if (data == "step4") {
      setstage3("step3");
      setstage4("step4 d-none");
    } else if (data == "step4") {
      setstage4("step4");
      setstage5("step5 d-none");
    } else if (data == "step5") {
      setstage4("step5");
      setstage5("step6 d-none");
    }else if (data == "step6") {
      setstage5("step5");
      setstage6("step6 d-none");
    }
  };

  const [currencyImage, setcurrencyImage] = useState("");
  const [imgloader1, setimgloader1] = useState(false);

  const imageUpload = (type, val) => {
    const fileExtension = val.name.split(".").at(-1);
    const fileSize = val.size;
    const fileName = val.name;
    console.log("fileExtension===", fileExtension);
    console.log("fileSize===", fileSize);
    console.log("fileName===", fileName);
    if (
      fileExtension != "png" &&
      fileExtension != "jpg" &&
      fileExtension != "jpeg"
    ) {
      toast.error("File does not support. You must use .png or .jpg or .jpeg ");
      return false;
    } else if (fileSize > 1000000) {
      toast.error("Please upload a file smaller than 1 MB");
      return false;
    } else {
      const data = new FormData();
      data.append("file", val);
      data.append("upload_preset", "sztbiwly");
      data.append("cloud_name", "taikonz-com");
      console.log("formdata===", data);
      if (type == "front") {
        setimgloader1(true);
      }
      fetch("https://api.cloudinary.com/v1_1/taikonz-com/auto/upload", {
        method: "post",
        body: data,
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (type == "front") {
            setcurrencyImage(data.secure_url);
            setimgloader1(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div >
      {/* <main className="main-content tradepage-bg  bg-cover onlywhitee new_login_bb"> */}
            <main className="main-content  bg-cover onlywhitee new_login_bb ">  

        <div className="" style={pageBackgroundStyle}>
        <Header />
        <Container maxWidth="xl">
          <Grid container spacing={2} justifyContent={"center"}>
            {/* Item for xs (extra small) screens */}
         <Grid item xs={12} sm={12} md={8} lg={8} xl={9}>
              <div className="new_card_logoki card_logoki  pading_cardd">
                <div className={stage1}>
                  <div className="form_content">
                    <Button onClick={cancel_function} className="back_butn">
                      <i
                        onClick={cancel_function}
                        className="ri-arrow-left-line"
                      ></i>{" "}
                      Back to Launchpad
                    </Button>
                    <h1 className="mb-2 Launch_pad_steps !text-[#fff]">
                      Fill in the details <span className="website_color">Step 1/5</span>
                    </h1>
                  </div>
                  <div className="form_login_section p-0 mt-4">
                    <div className="form register_login p-0">
                      <form className="form_pading_s ">
                        <div className="form-group">
                          <label>Your Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter your full name"
                            name="name"
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          {namevalidateref.current == true ? (
                            <p className="text-danger">
                              {" "}
                              {validationnErr.name}{" "}
                            </p>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter your email Id"
                            name="email"
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          {emailvalidateref.current == true ? (
                            <p className="text-danger">
                              {" "}
                              {validationnErr.email}{" "}
                            </p>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="form-group">
                          <label>Confirm your position with this Project</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter your position"
                            name="position"
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          {positionvalidateref.current == true ? (
                            <p className="text-danger">
                              {" "}
                              {validationnErr.position}{" "}
                            </p>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="form-group">
                          <label>
                            If there are someone who introduce you to this
                            service, please provide their email here.
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter email"
                            name="refemail"
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          {refemailvalidateref.current == true ? (
                            <p className="text-danger">
                              {" "}
                              {validationnErr.refemail}{" "}
                            </p>
                          ) : (
                            ""
                          )}
                        </div>
                      </form>
                      
           <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
  {/* Cancel Button */}
  <div className="rounded-xl bg-gradient-to-r from-[#03DDFD] to-[#0058F5] p-[1px]">
    <button
      onClick={cancel_function}
      type="button"
      className="h-[50px] min-w-[160px] rounded-xl bg-[#0E1115] px-6 flex items-center justify-center leading-none"
    >
     <span className="!w-auto !block !p-0 !leading-none bg-gradient-to-br from-[#00D4FF] to-[#0066FF] bg-clip-text text-transparent">
  Back
</span>
    </button>
  </div>

  {/* Next Button */}
  <button
    type="button"
    onClick={() => nexttabfun("step1")}
    className="h-[50px] min-w-[160px] rounded-xl bg-gradient-to-br from-[#00D4FF] to-[#0066FF] px-6 flex items-center justify-center font-semibold text-white transition-all hover:opacity-90"
  >
    Next
  </button>
</div>

                    </div>
                  </div>
                </div>
                <div className={stage2}>
                  <div className="form_content">
                    <Button
                      onClick={() => back_function("step2")}
                      className="back_butn"
                    >
                      <i
                        onClick={() => back_function("step2")}
                        className="ri-arrow-left-line"
                      ></i>{" "}
                      Back to Launchpad
                    </Button>
                    <h1 className="mb-2 Launch_pad_steps !text-[#fff]">
                      Fill in the details <span className="website_color">Step 2/5</span>
                    </h1>
                  </div>
                  <div className="form_login_section p-0 mt-4">
                    <div className="form register_login p-0">
                      <form className="form_pading_s grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="form-group">
                          <label>Project name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter project name"
                            name="project_name"
                            onChange={handleChange}
                          />
                          <div>
                            {project_namevalidateref.current == true ? (
                              <p className="text-danger">
                                {" "}
                                {validationnErr.project_name}{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        {/* <div className="form-group">
                          <label>Project Description</label>
                          <textarea
                            rows="5"
                            placeholder="Enter Project description"
                            className="form-textarea"
                            name="Project_description"
                            onChange={handleChange}
                          ></textarea>
                          <div>
                            {Project_descriptionvalidateref.current == true ? (
                              <p className="text-danger">
                                {" "}
                                {validationnErr.Project_description}{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Token Feature</label>
                          <textarea
                            rows="5"
                            placeholder="Enter token_feature"
                            className="form-textarea"
                            name="token_feature"
                            onChange={handleChange}
                          ></textarea>
                          <div>
                            {token_featurevalidateref.current == true ? (
                              <p className="text-danger">
                                {" "}
                                {validationnErr.token_feature}{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div> */}


                        <div className="form-group">
                          <label>Official website</label>
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter website"
                            name="official_website"
                            onChange={handleChange}
                          />
                          <div>
                            {official_websitevalidateref.current == true ? (
                              <p className="text-danger">
                                {" "}
                                {validationnErr.official_website}{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                       
                        <div className="form-group">
                          <label>Token/ Coin Symbol</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter symbol"
                            name="symbol"
                            onChange={handleChange}
                          />
                          <div>
                            {symbolvalidateref.current == true ? (
                              <p className="text-danger">
                                {" "}
                                {validationnErr.symbol}{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Token/Coin Full Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter name"
                            name="currency_name"
                            onChange={handleChange}
                          />
                          <div>
                            {currency_namevalidateref.current == true ? (
                              <p className="text-danger">
                                {" "}
                                {validationnErr.currency_name}{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Permanent link to your whitepaper</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter link"
                            name="whitepaper_link"
                            onChange={handleChange}
                          />
                          <div>
                            {whitepaper_linkvalidateref.current == true ? (
                              <p className="text-danger">
                                {" "}
                                {validationnErr.whitepaper_link}{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Detailed Roadmap and Milestones</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter Details"
                            name="milestone"
                            onChange={handleChange}
                          />
                          <div>
                            {milestonevalidateref.current == true ? (
                              <p className="text-danger">
                                {" "}
                                {validationnErr.milestone}{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Token contract Address</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter Address"
                            name="contract_address"
                            onChange={handleChange}
                          />
                          <div>
                            {contract_addressvalidateref.current == true ? (
                              <p className="text-danger">
                                {" "}
                                {validationnErr.contract_address}{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                         <div className="form-group">
  <label>Currency Image</label>

  <input
    type="file"
    className="form-control"
    accept="image/*"
    onChange={(e) => imageUpload("front", e.target.files[0])}
  />

  {CurrencyImageValidateref.current === true && (
    <p className="text-danger">
      {validationnErr.image}
    </p>
  )}

  {currencyImage && (
    <div className="mt-3 text-center">
      <img
        src={currencyImage}
        alt="Currency"
        style={{
          width: "100px",
          height: "100px",
          objectFit: "cover",
          borderRadius: "10px",
        }}
      />
    </div>
  )}
</div>


                     <div className="form-group md:col-span-2">
                          <label>Short Description of Token/Coin</label>
                          <textarea
                            rows="5"
                            placeholder="Enter description"
                            className="form-textarea"
                            name="description"
                            onChange={handleChange}
                          ></textarea>
                          <div>
                            {descriptionvalidateref.current == true ? (
                              <p className="text-danger">
                                {" "}
                                {validationnErr.description}{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        {/* <div className="form-group">
                          <label>Token  Address Type</label>
                        
                          <div className="button_checkbox">
                            <div className="checkbox_1">
                              <input
                                type="checkbox"
                                label="Security"
                                checked={tokenCheckone}
                                onChange={tokenOne}
                              />
                              <label className="p-2">Security</label>
                            </div>
                            <div className="checkbox_2">
                              <input
                                type="checkbox"
                                label="Utility"
                                checked={tokenchecktwo}
                                onChange={tokenTwo}
                              />
                              <label className="p-2">Utility</label>
                            </div>
                          </div>
                          <div>
                            {token_contract_addressvalidateref.current ==
                              true ? (
                              <p className="text-danger">
                                {" "}
                                {validationnErr.token_contract_address}{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div> */}

                      </form>


                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
  {/* Back Button */}
  <div className="rounded-xl bg-gradient-to-r from-[#03DDFD] to-[#0058F5] p-[1px]">
    <button
      type="button"
      onClick={() => back_function("step2")}
      className="h-[50px] min-w-[160px] rounded-xl bg-[#0E1115] px-6 flex items-center justify-center"
    >
      <span className="!inline !w-auto !p-0 font-semibold bg-gradient-to-br from-[#00D4FF] to-[#0066FF] bg-clip-text text-transparent">
        Back
      </span>
    </button>
  </div>

  {/* Next Button */}
  <button
    type="button"
    onClick={() => nexttabfun("step2")}
    className="h-[50px] min-w-[160px] rounded-xl bg-gradient-to-br from-[#00D4FF] to-[#0066FF] px-6 flex items-center justify-center font-semibold text-white transition-all hover:opacity-90"
  >
    Next
  </button>
</div>


                    </div>
                  </div>
                </div>
                <div className={stage3}>
                  <div className="form_content">
                    <Button
                      onClick={() => back_function("step3")}
                      className="back_butn"
                    >
                      <i
                        onClick={() => back_function("step3")}
                        className="ri-arrow-left-line"
                      ></i>{" "}
                      Back to Launchpad
                    </Button>
                    <h1 className="mb-2 Launch_pad_steps !text-[#B3B3B3]">
                      Fill in the details <span className="website_color">Step 3/5</span>
                    </h1>
                  </div>
                  <div className="form_login_section p-0 mt-4">
                    <div className="form register_login p-0">
                      <form className="form_pading_s grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="form-group">
                          <label>Start Date</label>

                          <div className="input-group date" id="datetimepicker1">
                            <input
                              type="date"
                              name="startDate"
                              className="form-control"
                              onChange={handleChange}
                            />
                          </div>
                          <div>
                            {startDatevalidateref.current == true ? (
                              <p className="text-danger">
                                {" "}
                                {validationnErr.startDate}{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="form-group">
                          <label>End Date</label>

                          <div className="input-group date" id="datetimepicker1">
                            <input
                              type="date"
                              name="endDate"
                              className="form-control"
                              onChange={handleChange}
                            />
                          </div>
                          <div>
                            {endDatevalidateref.current == true ? (
                              <p className="text-danger">
                                {" "}
                                {validationnErr.endDate}{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>


                        {/* <div className="form-group">
                          <label>Select Network</label>
                          <Dropdown
                            placeholder="Select Network"
                            fluid
                            selection
                            className="text_memu"
                            value={selectedOption}
                            onChange={handleChangedrop}
                            options={countryOptions}
                          />
                          <div>
                            {endDatevalidateref.current == true ? (
                              <p className="text-danger">
                                {" "}
                                {validationnErr.network}{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div> */}

<div className="form-group">
  <label className="block mb-2 text-white">
    Select Network
  </label>

  <select
    className="w-full h-[50px] px-4 rounded-lg bg-[#0E1115] border border-[#252525] text-white outline-none focus:border-[#03DDFD]"
    value={selectedOption}
    onChange={(e) => {
      setselectedOption(e.target.value);
      setnetwork(e.target.value);
    }}
  >
    <option value="">Select Network</option>
    <option value="ERC20">ERC20</option>
    <option value="BEP20">BEP20</option>
    <option value="TRC20">TRC20</option>
  </select>

  {networkvalidateref.current === true && (
    <p className="text-red-500 mt-1">
      {validationnErr.network}
    </p>
  )}
</div>

                        <div className="form-group">
                          <label>Min. Buy Amount</label>
                          <input
                            type="number"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter amount"
                            min="0"
                            name="buyAmount"
                            onChange={handleChange}
                          />
                          <div>
                            {buyAmountvalidateref.current == true ? (
                              <p className="text-danger">
                                {" "}
                                {validationnErr.buyAmount}{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Soft Cap</label>
                          <input
                            type="number"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter soft cap"
                            min="0"
                            name="softCap"
                            onChange={handleChange}
                          />
                          <div>
                            {softCapvalidateref.current == true ? (
                              <p className="text-danger">
                                {" "}
                                {validationnErr.softCap}{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Hard Cap</label>
                          <input
                            type="number"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter hard cap"
                            name="hardCap"
                            min="0"
                            onChange={handleChange}
                          />
                          <div>
                            {hardCapvalidateref.current == true ? (
                              <p className="text-danger">
                                {" "}
                                {validationnErr.hardCap}{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Total Token Supply</label>
                          <input
                            type="number"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter token supply"
                            name="token_supply"
                            min="0"
                            onChange={handleChange}
                          />
                          <div>
                            {token_supplyvalidateref.current == true ? (
                              <p className="text-danger">
                                {" "}
                                {validationnErr.token_supply}{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="form-group">
                          <label>
                         Token Sale  Allocation for FinzoEX Launchpad 
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter amount"
                            name="totalSupply"
                            min="0"
                            onChange={handleChange}
                          />
                          <div>
                            {totalSupplyvalidateref.current == true ? (
                              <p className="text-danger">
                                {" "}
                                {validationnErr.totalSupply}{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        {/* <div className="form-group">
                          <label>
                            Public Sale Converston Price (e.g. 1xxx =0.1 USDT )
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter price"
                            name="price"
                            min="0"
                            onChange={handleChange}
                          />
                          <div>
                            {pricevalidateref.current == true ? (
                              <p className="text-danger">
                                {" "}
                                {validationnErr.price}{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div> */}


                      </form>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
  {/* Back Button */}
  <div className="rounded-xl bg-gradient-to-r from-[#03DDFD] to-[#0058F5] p-[1px]">
    <button
      type="button"
      onClick={() => back_function("step3")}
      className="h-[50px] min-w-[160px] rounded-xl bg-[#0E1115] px-6 flex items-center justify-center"
    >
      <span className="!inline !w-auto !p-0 font-semibold bg-gradient-to-br from-[#00D4FF] to-[#0066FF] bg-clip-text text-transparent">
        Back
      </span>
    </button>
  </div>

  {/* Next Button */}
  <button
    type="button"
    onClick={() => nexttabfun("step3")}
    className="h-[50px] min-w-[160px] rounded-xl bg-gradient-to-br from-[#00D4FF] to-[#0066FF] px-6 flex items-center justify-center font-semibold text-white transition-all hover:opacity-90"
  >
    Next
  </button>
</div>
                      
                    </div>
                  </div>
                </div>
                <div className={stage4}>
                  <div className="form_content">
                    <Button
                      onClick={() => back_function("step4")}
                      className="back_butn"
                    >
                      <i
                        onClick={() => back_function("step4")}
                        className="ri-arrow-left-line"
                      ></i>{" "}
                      Back to Launchpad
                    </Button>
                    <h1 className="mb-2 Launch_pad_steps">
                      Fill in the details <span className="website_color">Step 4/5</span>
                    </h1>
                  </div>
                  <div className="form_login_section p-0 mt-4">
                    <div className="form register_login p-0">
                     <form className="form_pading_s grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="form-group">
                          <label>Telegram Group</label>
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter group"
                            name="telegram"
                            onChange={handleChange}
                          />
                          <div>
                            {telegramvalidateref.current == true ? (
                              <p className="text-danger">
                                {" "}
                                {validationnErr.telegram}{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Instagram Link</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter link"
                            name="instagramlink"
                            onChange={handleChange}
                          />
                          <div>
                            {instagramlinkvalidateref.current == true ? (
                              <p className="text-danger">
                                {" "}
                                {validationnErr.instagramlink}{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Twitter link</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter link"
                            name="twitterLink"
                            onChange={handleChange}
                          />
                          <div>
                            {twitterLinkvalidateref.current == true ? (
                              <p className="text-danger">
                                {" "}
                                {validationnErr.twitterLink}{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Youtube Channel</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter link"
                            name="youtubeChannel"
                            onChange={handleChange}
                          />
                          <div>
                            {youtubeChannelvalidateref.current == true ? (
                              <p className="text-danger">
                                {" "}
                                {validationnErr.youtubeChannel}{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Youtube Video link</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter link"
                            name="Youtube_video"
                            onChange={handleChange}
                          />
                          <div>
                            {Youtube_videovalidateref.current == true ? (
                              <p className="text-danger">
                                {" "}
                                {validationnErr.Youtube_video}{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Youtube Video link</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter link"
                            name="Youtube_video"
                            onChange={handleChange}
                          />
                          <div>
                            {Youtube_videovalidateref.current == true ? (
                              <p className="text-danger">
                                {" "}
                                {validationnErr.Youtube_video}{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </form>
                     <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
  {/* Back Button */}
  <div className="rounded-xl bg-gradient-to-r from-[#03DDFD] to-[#0058F5] p-[1px]">
    <button
      type="button"
      onClick={() => back_function("step4")}
      className="h-[50px] min-w-[160px] rounded-xl bg-[#0E1115] px-6 flex items-center justify-center"
    >
      <span className="!inline !w-auto !p-0 font-semibold bg-gradient-to-br from-[#00D4FF] to-[#0066FF] bg-clip-text text-transparent">
        Back
      </span>
    </button>
  </div>

  {/* Next Button */}
  <button
    type="button"
    onClick={() => nexttabfun("step4")}
    className="h-[50px] min-w-[160px] rounded-xl bg-gradient-to-br from-[#00D4FF] to-[#0066FF] px-6 flex items-center justify-center font-semibold text-white transition-all hover:opacity-90"
  >
    Next
  </button>
</div>

                    </div>
                  </div>
                </div>
                <div className={stage5}>
                  <div className="form_content">
                    <Button
                      onClick={() => back_function("step5")}
                      className="back_butn"
                    >
                      <i
                        onClick={() => back_function("step5")}
                        className="ri-arrow-left-line"
                      ></i>{" "}
                      Back to Launchpad
                    </Button>
                    <h1 className="mb-2 Launch_pad_steps">
                      Fill in the details <span className="website_color">Step 5/5</span>
                    </h1>
                  </div>
                  <div className="form_login_section p-0 mt-4">
                    <div className="form register_login p-0">
               <form className="form_pading_s grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="form-group">
                          <label>
                            Taikonz can publish any of the information you
                            provide
                          </label>

                          <div className="button_launch checkbox_lable flex-column justify-content-start align-items-start">
                            <div className="button_checkbox2">
                              <div className="checkbox_1">
                                <input
                                  type="checkbox"
                                  label="Yes, I agree"
                                  checked={checkedOne}
                                  onChange={updateOne}
                                />
                                <label className="p-2">Yes, I agree</label>
                              </div>

                              <div className="checkbox_2">
                                <input
                                  type="checkbox"
                                  label="No, no need to hit the submit button"
                                  checked={checkedTwo}
                                  onChange={updateTwo}
                                />
                                <label className="p-2">
                                  No, no need to hit the submit button
                                </label>
                              </div>
                            </div>
                            {/* <Checkbox
                              label="Yes, I agree"
                              checked={checkedOne}
                              onChange={updateOne}
                            />
                            <Checkbox
                              label="No, no need to hit the submit button"
                              checked={checkedTwo}
                              onChange={updateTwo}
                            /> */}
                            <div>
                              {termsvalidateref.current == true ? (
                                <p className="text-danger">
                                  {" "}
                                  {validationnErr.terms}{" "}
                                </p>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                      </form>
                     <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
  {/* Back Button */}
  <div className="rounded-xl bg-gradient-to-r from-[#03DDFD] to-[#0058F5] p-[1px]">
    <button
      type="button"
      onClick={() => back_function("step5")}
      className="h-[50px] min-w-[160px] rounded-xl bg-[#0E1115] px-6 flex items-center justify-center"
    >
      <span className="!inline !w-auto !p-0 font-semibold bg-gradient-to-br from-[#00D4FF] to-[#0066FF] bg-clip-text text-transparent">
        Back
      </span>
    </button>
  </div>

  {/* Preview Button */}
  <button
    type="button"
    onClick={() => nexttabfun("step5")}
    className="h-[50px] min-w-[160px] rounded-xl bg-gradient-to-br from-[#00D4FF] to-[#0066FF] px-6 flex items-center justify-center font-semibold text-white transition-all hover:opacity-90"
  >
    Preview
  </button>
</div>

                    </div>
                  </div>
                </div>


                <div className={stage6}>
                  <div className="form_content">
                    <Button
                      onClick={() => back_function("step6")}
                      className="back_butn"
                    >
                      <i
                        onClick={() => back_function("step6")}
                        className="ri-arrow-left-line"
                      ></i>{" "}
                      Back to Launchpad
                    </Button>
                    <h1 className="mb-2 Launch_pad_steps">Preview</h1>
                  </div>
                  <div className="form_login_section p-0 mt-4">
                    <div className="form register_login word_break p-0">
                      <form className="form_pading_s grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="form-group">
                          <label>Your Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formValue.name}
                            readOnly
                          />
                        </div>

                        <div className="form-group">
                          <label>Email</label>
                          <input
                            type="email"
                            className="form-control"
                            value={formValue.email}
                            readOnly
                          />
                        </div>

                        <div className="form-group">
                          <label>Position</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formValue.position}
                            readOnly
                          />
                        </div>

                        <div className="form-group">
                          <label>Referrer Email</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formValue.refemail}
                            readOnly
                          />
                        </div>

                        <div className="form-group">
                          <label>Project Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formValue.project_name}
                            readOnly
                          />
                        </div>

                        <div className="form-group">
                          <label>Official Website</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formValue.official_website}
                            readOnly
                          />
                        </div>

                        <div className="form-group">
                          <label>Currency Symbol</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formValue.symbol}
                            readOnly
                          />
                        </div>

                        <div className="form-group">
                          <label>Currency Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formValue.currency_name}
                            readOnly
                          />
                        </div>

                        <div className="form-group">
                          <label>Whitepaper Link</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formValue.whitepaper_link}
                            readOnly
                          />
                        </div>

                        <div className="form-group">
                          <label>Contract Address</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formValue.contract_address}
                            readOnly
                          />
                        </div>

                        <div className="form-group md:col-span-2">
                          <label>Detailed Roadmap</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formValue.milestone}
                            readOnly
                          />
                        </div>

                        <div className="form-group md:col-span-2">
                          <label>Description</label>
                          <textarea
                            rows="4"
                            className="form-textarea"
                            value={formValue.description}
                            readOnly
                          />
                        </div>

                        <div className="form-group">
                          <label>Address Type</label>
                          <input
                            type="text"
                            className="form-control"
                            value={token_contract_addressref.current}
                            readOnly
                          />
                        </div>

                        <div className="form-group">
                          <label>Start Date</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formValue.startDate}
                            readOnly
                          />
                        </div>

                        <div className="form-group">
                          <label>End Date</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formValue.endDate}
                            readOnly
                          />
                        </div>

                        <div className="form-group">
                          <label>Min. Buy Amount</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formValue.buyAmount}
                            readOnly
                          />
                        </div>

                        <div className="form-group">
                          <label>Soft Cap</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formValue.softCap}
                            readOnly
                          />
                        </div>

                        <div className="form-group">
                          <label>Hard Cap</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formValue.hardCap}
                            readOnly
                          />
                        </div>

                        <div className="form-group">
                          <label>Total Token Supply</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formValue.token_supply}
                            readOnly
                          />
                        </div>

                        <div className="form-group">
                          <label>Public Sale Price</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formValue.price}
                            readOnly
                          />
                        </div>

                        <div className="form-group">
                          <label>Telegram Group</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formValue.telegram}
                            readOnly
                          />
                        </div>

                        <div className="form-group">
                          <label>Instagram Link</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formValue.instagramlink}
                            readOnly
                          />
                        </div>

                        <div className="form-group">
                          <label>Twitter Link</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formValue.twitterLink}
                            readOnly
                          />
                        </div>

                        <div className="form-group">
                          <label>Youtube Channel</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formValue.youtubeChannel}
                            readOnly
                          />
                        </div>

                        <div className="form-group">
                          <label>Youtube Video Link</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formValue.Youtube_video}
                            readOnly
                          />
                        </div>

                        <div className="form-group md:col-span-2">
                          <label>Currency Image</label>
                          {currencyImage ? (
                            <div className="mt-2 text-center">
                              <img
                                src={currencyImage}
                                alt="Currency"
                                style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "10px" }}
                              />
                            </div>
                          ) : (
                            <input type="text" className="form-control" value="No image uploaded" readOnly />
                          )}
                        </div>
                      </form>


                   <div className="flex justify-center mt-8">
  <button
    type="button"
    onClick={formSubmit}
    className="h-[50px] min-w-[160px] rounded-xl bg-gradient-to-br from-[#00D4FF] to-[#0066FF] px-6 flex items-center justify-center font-semibold text-white transition-all hover:opacity-90"
  >
    Submit
  </button>
</div>


                    </div>
                  </div>
                </div>

                
              </div>
            </Grid>
          </Grid>
          {/* Your other components and content */}
        </Container>
        </div>
      </main>
    </div>
  );
}

export default Home;
