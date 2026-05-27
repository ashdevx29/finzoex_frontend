import React, { useState } from "react";
import Header from "../../Newcomponent/Header";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiService from "../../../core/service/detail";
import { postMethod } from "../../../core/service/common.api";
import Footernew from "../../footer_buttom";
import { Grid, Paper, Container } from "@mui/material";
import { setAuthorization } from "../../../core/service/axios";
import { Button } from "semantic-ui-react";
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
  const { email, isTerms, password, confirmPassword } = formValue;

  const handleChange = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formData = { ...formValue, ...{ [name]: value } };
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
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <div className="heading_card_new">
                <h1>
                  Stake <i className="ri-arrow-right-line"></i>
                </h1>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
              <div className="bootsrab_tabs">
                <ul className="nav nav-tabs">
                  <li className="active">
                    <a data-toggle="tab" href="#Fixed" className="active">
                      Fixed
                    </a>
                  </li>
                  <li>
                    <a data-toggle="tab" href="#Flexible">
                      Flexible
                    </a>
                  </li>
                  <li>
                    <a data-toggle="tab" href="#Yield">
                      Yield
                    </a>
                  </li>{" "}
                  <li>
                    <a data-toggle="tab" href="#History">
                      History
                    </a>
                  </li>
                </ul>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
              <div className="search_bar">
                <i className="ri-search-line"></i>
                <input type="text" placeholder="Search" />
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className="pt-0">
              <div className="tab-content">
                <div id="Fixed" className="tab-pane fade in active show">
                  <Grid
                    container
                    spacing={2}
                    justifyContent={"start"}
                    marginBottom={10}
                  >
                    {/* Item for xs (extra small) screens */}
                    <Grid item xs={12} sm={12} md={12} lg={4} xl={3}>
                      <div className="card_launchpad">
                        <div className="header_launc">
                          <div className="coin_launch">
                            <img
                              src={new URL("../../../img/New_images/color.png", import.meta.url).href}
                              className="img-fluid "
                            />{" "}
                            <h5>
                              Bitcoin <span>BTC</span>
                            </h5>
                          </div>
                          <div className="Srake_status">
                            <span>FIXED</span>
                          </div>
                        </div>
                        <hr />
                        <div className="stake_button">
                          <h4>
                            <div className="colo_bold">
                              <span>APY:</span>
                              <small>4.4%</small>{" "}
                            </div>{" "}
                            <a href="">Stake</a>
                          </h4>
                        </div>
                        <div className="data_launc">
                          <p className="flex_content_stake">
                            Minimum Stake:<span>230.48 BTC</span>
                          </p>
                        </div>
                        <div className="select_duration">
                          <p>Select Duration:</p>
                          <ul className="nav nav-tabs">
                            <li className="active">
                              <a data-toggle="tab" href="#Fixed" className="30">
                                30 D
                              </a>
                            </li>
                            <li>
                              <a data-toggle="tab" href="#90">
                                90 D
                              </a>
                            </li>
                            <li>
                              <a data-toggle="tab" href="#150">
                                150 D
                              </a>
                            </li>{" "}
                            <li>
                              <a data-toggle="tab" href="#365">
                                365 D
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={4} xl={3}>
                      <div className="card_launchpad">
                        <div className="header_launc">
                          <div className="coin_launch">
                            <img
                              src={new URL("../../../img/New_images/color.png", import.meta.url).href}
                              className="img-fluid "
                            />{" "}
                            <h5>
                              Bitcoin <span>BTC</span>
                            </h5>
                          </div>
                          <div className="Srake_status">
                            <span>FIXED</span>
                          </div>
                        </div>
                        <hr />
                        <div className="stake_button">
                          <h4>
                            <div className="colo_bold">
                              <span>APY:</span>
                              <small>4.4%</small>{" "}
                            </div>{" "}
                            <a href="">Stake</a>
                          </h4>
                        </div>
                        <div className="data_launc">
                          <p className="flex_content_stake">
                            Minimum Stake:<span>230.48 BTC</span>
                          </p>
                        </div>
                        <div className="select_duration">
                          <p>Select Duration:</p>
                          <ul className="nav nav-tabs">
                            <li className="active">
                              <a data-toggle="tab" href="#Fixed" className="30">
                                30 D
                              </a>
                            </li>
                            <li>
                              <a data-toggle="tab" href="#90">
                                90 D
                              </a>
                            </li>
                            <li>
                              <a data-toggle="tab" href="#150">
                                150 D
                              </a>
                            </li>{" "}
                            <li>
                              <a data-toggle="tab" href="#365">
                                365 D
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={4} xl={3}>
                      <div className="card_launchpad">
                        <div className="header_launc">
                          <div className="coin_launch">
                            <img
                              src={new URL("../../../img/New_images/color.png", import.meta.url).href}
                              className="img-fluid "
                            />{" "}
                            <h5>
                              Bitcoin <span>BTC</span>
                            </h5>
                          </div>
                          <div className="Srake_status">
                            <span>FIXED</span>
                          </div>
                        </div>
                        <hr />
                        <div className="stake_button">
                          <h4>
                            <div className="colo_bold">
                              <span>APY:</span>
                              <small>4.4%</small>{" "}
                            </div>{" "}
                            <a href="">Stake</a>
                          </h4>
                        </div>
                        <div className="data_launc">
                          <p className="flex_content_stake">
                            Minimum Stake:<span>230.48 BTC</span>
                          </p>
                        </div>
                        <div className="select_duration">
                          <p>Select Duration:</p>
                          <ul className="nav nav-tabs">
                            <li className="active">
                              <a data-toggle="tab" href="#Fixed" className="30">
                                30 D
                              </a>
                            </li>
                            <li>
                              <a data-toggle="tab" href="#90">
                                90 D
                              </a>
                            </li>
                            <li>
                              <a data-toggle="tab" href="#150">
                                150 D
                              </a>
                            </li>{" "}
                            <li>
                              <a data-toggle="tab" href="#365">
                                365 D
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={4} xl={3}>
                      <div className="card_launchpad">
                        <div className="header_launc">
                          <div className="coin_launch">
                            <img
                              src={new URL("../../../img/New_images/color.png", import.meta.url).href}
                              className="img-fluid "
                            />{" "}
                            <h5>
                              Bitcoin <span>BTC</span>
                            </h5>
                          </div>
                          <div className="Srake_status">
                            <span>FIXED</span>
                          </div>
                        </div>
                        <hr />
                        <div className="stake_button">
                          <h4>
                            <div className="colo_bold">
                              <span>APY:</span>
                              <small>4.4%</small>{" "}
                            </div>{" "}
                            <a href="">Stake</a>
                          </h4>
                        </div>
                        <div className="data_launc">
                          <p className="flex_content_stake">
                            Minimum Stake:<span>230.48 BTC</span>
                          </p>
                        </div>
                        <div className="select_duration">
                          <p>Select Duration:</p>
                          <ul className="nav nav-tabs">
                            <li className="active">
                              <a data-toggle="tab" href="#Fixed" className="30">
                                30 D
                              </a>
                            </li>
                            <li>
                              <a data-toggle="tab" href="#90">
                                90 D
                              </a>
                            </li>
                            <li>
                              <a data-toggle="tab" href="#150">
                                150 D
                              </a>
                            </li>{" "}
                            <li>
                              <a data-toggle="tab" href="#365">
                                365 D
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </div>
                <div id="Flexible" className="tab-pane fade">
                  <Grid
                    container
                    spacing={2}
                    justifyContent={"start"}
                    marginBottom={10}
                  >
                    {/* Item for xs (extra small) screens */}
                    <Grid item xs={12} sm={12} md={12} lg={4} xl={3}>
                      <div className="card_launchpad">
                        <div className="header_launc">
                          <div className="coin_launch">
                            <img
                              src={new URL("../../../img/New_images/color.png", import.meta.url).href}
                              className="img-fluid "
                            />{" "}
                            <h5>
                              Bitcoin <span>BTC</span>
                            </h5>
                          </div>
                          <div className="Srake_status">
                            <span>FIXED</span>
                          </div>
                        </div>
                        <hr />
                        <div className="stake_button">
                          <h4>
                            <div className="colo_bold">
                              <span>APY:</span>
                              <small>4.4%</small>{" "}
                            </div>{" "}
                            <a href="">Stake</a>
                          </h4>
                        </div>
                        <div className="data_launc">
                          <p className="flex_content_stake">
                            Minimum Stake:<span>230.48 BTC</span>
                          </p>
                        </div>
                        <div className="select_duration">
                          <p>Select Duration:</p>
                          <ul className="nav nav-tabs">
                            <li className="active">
                              <a data-toggle="tab" href="#Fixed" className="30">
                                30 D
                              </a>
                            </li>
                            <li>
                              <a data-toggle="tab" href="#90">
                                90 D
                              </a>
                            </li>
                            <li>
                              <a data-toggle="tab" href="#150">
                                150 D
                              </a>
                            </li>{" "}
                            <li>
                              <a data-toggle="tab" href="#365">
                                365 D
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </div>
                <div id="Yield" className="tab-pane fade">
                  <Grid
                    container
                    spacing={2}
                    justifyContent={"center"}
                    marginTop={"0px"}
                  >
                    {/* Item for xs (extra small) screens */}
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      paddingTop={"0px"}
                      className="pt-0"
                    >
                      <div className="">
                        <div className="">
                          <ul className="tag_staking_yiedl nav nav-tabs ">
                            <li className="active">
                              <a
                                data-toggle="tab"
                                href="#oneYear"
                                className="active"
                              >
                                1 Year
                              </a>
                            </li>
                            <li>
                              <a data-toggle="tab" href="#threeYears">
                                3 Year
                              </a>
                            </li>
                            <li>
                              <a data-toggle="tab" href="#fiveYears">
                                5 Year
                              </a>
                            </li>
                          </ul>
                          <div className="tab-content mt-4">
                            <div
                              id="oneYear"
                              className="tab-pane fade in active show"
                            >
                              <Grid
                                container
                                spacing={2}
                                justifyContent={"start"}
                                marginBottom={10}
                              >
                                {/* Item for xs (extra small) screens */}
                                <Grid
                                  item
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  lg={4}
                                  xl={3}
                                >
                                  <div className="card_launchpad">
                                    <div className="header_launc">
                                      <div className="coin_launch">
                                        <img
                                          src={new URL("../../../img/New_images/color.png", import.meta.url).href}
                                          className="img-fluid "
                                        />{" "}
                                        <h5>
                                          Bitcoin <span>BTC</span>
                                        </h5>
                                      </div>
                                      <div className="Srake_status">
                                        <span>FIXED</span>
                                      </div>
                                    </div>
                                    <hr />
                                    <div className="stake_button">
                                      <h4>
                                        <div className="colo_bold">
                                          <span>APY:</span>
                                          <small>4.4%</small>{" "}
                                        </div>{" "}
                                        <a href="">Stake</a>
                                      </h4>
                                    </div>
                                    <div className="data_launc">
                                      <p className="flex_content_stake">
                                        Minimum Stake:<span>230.48 BTC</span>
                                      </p>
                                    </div>
                                    <div className="select_duration">
                                      <p>Select Duration:</p>
                                      <ul className="nav nav-tabs">
                                        <li className="active">
                                          <a
                                            data-toggle="tab"
                                            href="#Fixed"
                                            className="30"
                                          >
                                            30 D
                                          </a>
                                        </li>
                                        <li>
                                          <a data-toggle="tab" href="#90">
                                            90 D
                                          </a>
                                        </li>
                                        <li>
                                          <a data-toggle="tab" href="#150">
                                            150 D
                                          </a>
                                        </li>{" "}
                                        <li>
                                          <a data-toggle="tab" href="#365">
                                            365 D
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </Grid>
                              </Grid>
                            </div>
                            <div id="threeYears" className="tab-pane fade">
                              <Grid
                                container
                                spacing={2}
                                justifyContent={"start"}
                                marginBottom={10}
                              >
                                {/* Item for xs (extra small) screens */}
                                <Grid
                                  item
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  lg={4}
                                  xl={3}
                                >
                                  <div className="card_launchpad">
                                    <div className="header_launc">
                                      <div className="coin_launch">
                                        <img
                                          src={new URL("../../../img/New_images/color.png", import.meta.url).href}
                                          className="img-fluid "
                                        />{" "}
                                        <h5>
                                          Bitcoin <span>BTC</span>
                                        </h5>
                                      </div>
                                      <div className="Srake_status">
                                        <span>FIXED</span>
                                      </div>
                                    </div>
                                    <hr />
                                    <div className="stake_button">
                                      <h4>
                                        <div className="colo_bold">
                                          <span>APY:</span>
                                          <small>4.4%</small>{" "}
                                        </div>{" "}
                                        <a href="">Stake</a>
                                      </h4>
                                    </div>
                                    <div className="data_launc">
                                      <p className="flex_content_stake">
                                        Minimum Stake:<span>230.48 BTC</span>
                                      </p>
                                    </div>
                                    <div className="select_duration">
                                      <p>Select Duration:</p>
                                      <ul className="nav nav-tabs">
                                        <li className="active">
                                          <a
                                            data-toggle="tab"
                                            href="#Fixed"
                                            className="30"
                                          >
                                            30 D
                                          </a>
                                        </li>
                                        <li>
                                          <a data-toggle="tab" href="#90">
                                            90 D
                                          </a>
                                        </li>
                                        <li>
                                          <a data-toggle="tab" href="#150">
                                            150 D
                                          </a>
                                        </li>{" "}
                                        <li>
                                          <a data-toggle="tab" href="#365">
                                            365 D
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </Grid>
                              </Grid>
                            </div>
                            <div
                              id="fiveYears"
                              className="tab-pane fade in active show"
                            >
                              <Grid
                                container
                                spacing={2}
                                justifyContent={"start"}
                                marginBottom={10}
                              >
                                {/* Item for xs (extra small) screens */}
                                <Grid
                                  item
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  lg={4}
                                  xl={3}
                                >
                                  <div className="card_launchpad">
                                    <div className="header_launc">
                                      <div className="coin_launch">
                                        <img
                                          src={new URL("../../../img/New_images/color.png", import.meta.url).href}
                                          className="img-fluid "
                                        />{" "}
                                        <h5>
                                          Bitcoin <span>BTC</span>
                                        </h5>
                                      </div>
                                      <div className="Srake_status">
                                        <span>FIXED</span>
                                      </div>
                                    </div>
                                    <hr />
                                    <div className="stake_button">
                                      <h4>
                                        <div className="colo_bold">
                                          <span>APY:</span>
                                          <small>4.4%</small>{" "}
                                        </div>{" "}
                                        <a href="">Stake</a>
                                      </h4>
                                    </div>
                                    <div className="data_launc">
                                      <p className="flex_content_stake">
                                        Minimum Stake:<span>230.48 BTC</span>
                                      </p>
                                    </div>
                                    <div className="select_duration">
                                      <p>Select Duration:</p>
                                      <ul className="nav nav-tabs">
                                        <li className="active">
                                          <a
                                            data-toggle="tab"
                                            href="#Fixed"
                                            className="30"
                                          >
                                            30 D
                                          </a>
                                        </li>
                                        <li>
                                          <a data-toggle="tab" href="#90">
                                            90 D
                                          </a>
                                        </li>
                                        <li>
                                          <a data-toggle="tab" href="#150">
                                            150 D
                                          </a>
                                        </li>{" "}
                                        <li>
                                          <a data-toggle="tab" href="#365">
                                            365 D
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </Grid>
                              </Grid>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </div>
                <div id="History" className="tab-pane fade">
                  <Grid
                    container
                    spacing={2}
                    justifyContent={"center"}
                    marginTop={"0px"}
                  >
                    {/* Item for xs (extra small) screens */}
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      paddingTop={"0px"}
                      className="pt-0"
                    >
                      <div className="histroy_tabs">
                        <ul className="nav nav-tabs">
                          <li className="active">
                            <a data-toggle="tab" href="#All" className="active">
                              All
                            </a>
                          </li>
                          <li>
                            <a data-toggle="tab" href="#Fixed">
                              Fixed
                            </a>
                          </li>
                          <li>
                            <a data-toggle="tab" href="#Flexible">
                              Flexible
                            </a>
                          </li>
                          <li>
                            <a data-toggle="tab" href="#Yield">
                              Yield
                            </a>
                          </li>
                        </ul>
                        <div className="tab-content mt-4">
                          <div id="All" className="tab-pane fade in active show">
                            <div className="table_responsive">
                            <div className="table_section">
                              <div className="custom-table">
                                <div className="table-row header">
                                  <div className="table-cell">Package</div>
                                  <div className="table-cell">Total Amount</div>
                                  <div className="table-cell">APY/ `APR</div>
                                  <div className="table-cell">Type</div>
                                  <div className="table-cell">Interest Cycle</div>
                                  <div className="table-cell">Stake Date</div>
                                  <div className="table-cell">Stake End Date</div>
                                  <div className="table-cell">Next Claim Date</div>
                                  <div className="table-cell">Total Interest</div>
                                  <div className="table-cell">Int. per Cycle</div>
                                  <div className="table-cell"></div>
                                </div>

                                <div className="table-row border_table_row buttonddd">
                                  <div className="table-cell">
                                    <div className="data_inner flex_image_coloe">
                                      <img
                                        src={new URL("../../../img/New_images/color.png", import.meta.url).href}
                                        className="img-fluid"
                                      />
                                      Bitcoin
                                    </div>
                                  </div>
                                  <div className="table-cell">
                                    <div className="data_inner ">10 BTC</div>
                                  </div>
                                  <div className="table-cell">
                                    <div className="data_inner ">
                                      <span>72%</span>
                                    </div>
                                  </div>{" "}
                                  <div className="table-cell">
                                    <div className="data_inner ">Flexible</div>
                                  </div>{" "}
                                  <div className="table-cell">
                                    <div className="data_inner ">30 Days</div>
                                  </div>{" "}
                                  <div className="table-cell">
                                    <div className="data_inner ">
                                      15/ 09/ 23
                                    </div>
                                  </div>{" "}
                                  <div className="table-cell">
                                    <div className="data_inner ">
                                      15/ 09/ 23
                                    </div>
                                  </div>{" "}
                                  <div className="table-cell">
                                    <div className="data_inner ">
                                      15/ 09/ 23
                                    </div>
                                  </div>{" "}
                                  <div className="table-cell">
                                    <div className="data_inner ">
                                      <span>0.0034 USDT</span>
                                    </div>
                                  </div>{" "}
                                  <div className="table-cell">
                                    <div className="data_inner ">
                                      <span>0.0034 USDT</span>
                                    </div>
                                  </div>
                                  <div className="table-cell">
                                    <div className="data_inner ">
                                      <button>Claim Now</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
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
