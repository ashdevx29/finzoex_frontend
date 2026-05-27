import React, { useEffect, useState } from "react";
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

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    getLaunchpad();
  }, []);

  const [upcoming, setupcoming] = useState([]);
  const [inprogress, setinprogress] = useState([]);
  const [expired, setexpired] = useState([]);
  const [cuurTab, setcuurTab] = useState([]);
  const [pageLoader, setPageLoader] = useState(false);
  const getLaunchpad = async () => {
    setPageLoader(true);
    var data = {
      apiUrl: apiService.getAllLaunchpad,
      payload: { search: "" },
    };
    var resp = await postMethod(data);
    setPageLoader(false);

    console.log(resp, "=-=-=-=-=resp");
    var responseData = resp.data;
    if (resp.status) {
      setupcoming(responseData.UpcomingTokens);
      setinprogress(responseData.inprogressToken);
      setexpired(responseData.expiredTokens);
    }
  };

  const navigatebar = () => {
    navigate("/LaunchpadApply");
  };
  const handleSearch = async (value) => {
    console.log(value, "=-=-=-value");
    var data = {
      apiUrl: apiService.getAllLaunchpad,
      payload: { search: value },
    };
    var resp = await postMethod(data);
    console.log(resp, "=-=-=-=-=resp");
    var responseData = resp.data;
    if (resp.status) {
      setupcoming(responseData.UpcomingTokens);
      setinprogress(responseData.inprogressToken);
      setexpired(responseData.expiredTokens);
    }
  };

  const details_page_moving = (data) => {
    navigate(`/Launchpadbuynew/${data._id}`);
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
          <div className="class-padding">
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
                    A Token Launch Platform For Transformative project{" "}
                    <i className="ri-arrow-right-line"></i>
                  </h1>
                  <div className="object_header">
                    <Button onClick={navigatebar} className="primary_butn">
                      Launch Now
                    </Button>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
                <div className="bootsrab_tabs">
                  <ul className="nav nav-tabs">
                    <li className="active">
                      <a
                        onClick={() => setcuurTab("Inprocess")}
                        data-toggle="tab"
                        href="#InProgress"
                        className="active"
                      >
                        Upcoming
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => setcuurTab("Upcoming")}
                        data-toggle="tab"
                        href="#Upcoming"
                      >
                        In Progress{" "}
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => setcuurTab("Expired")}
                        data-toggle="tab"
                        href="#Expired"
                      >
                        Expired
                      </a>
                    </li>
                  </ul>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                <div className="search_bar">
                  <i className="ri-search-line"></i>
                  <input
                    type="text"
                    placeholder="Search"
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="tab-content">
                  <div id="InProgress" className="tab-pane fade in active show ">
                    <Grid
                      container
                      spacing={2}
                      justifyContent={"start"}
                      marginBottom={10}
                    >
                      {/* Item for xs (extra small) screens */}
                      {upcoming.length > 0 ? (
                        upcoming.map((data, i) => {
                          return (
                            <Grid item xs={12} sm={12} md={12} lg={4} xl={3}>
                              <div
                                className="card_launchpad"
                                onClick={() => details_page_moving(data)}
                              >
                                <div className="header_launc">
                                  <div className="coin_launch">
                                    <img
                                      src={
                                        data.currency_image == ""
                                          ? require("../../../img/New_images/color.png")
                                          : data.currency_image
                                      }
                                      className="img-fluid "
                                    />{" "}
                                    <h5>
                                      {data.currency_name}{" "}
                                      <span>{data.symbol}</span>
                                    </h5>
                                  </div>
                                  <div className="launch_status">
                                    <span>Upcoming</span>
                                  </div>
                                </div>
                                <hr />
                                <div className="data_launc">
                                  <p>
                                    Total Funds
                                    <span>
                                      {parseFloat(data.totalSupply).toFixed(6)}{" "}
                                      {data.symbol}
                                    </span>
                                  </p>
                                  <p>
                                    Network<span>{data.network}</span>
                                  </p>
                                  <p>
                                    Start Date
                                    <span>
                                      {moment(data.startDate).format("lll")}
                                    </span>
                                  </p>
                                  <p>
                                    End Date
                                    <span>
                                      {moment(data.endDate).format("lll")}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </Grid>
                          );
                        })
                      ) : (
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <div className="test_center">
                            <p>No data found</p>
                          </div>
                        </Grid>
                      )}
                    </Grid>
                  </div>
                  <div id="Upcoming" className="tab-pane fade">
                    <div className="tab-pane fade in active show">
                      <Grid
                        container
                        spacing={2}
                        justifyContent={"start"}
                        marginBottom={10}
                      >
                        {/* Item for xs (extra small) screens */}
                        {inprogress.length > 0 ? (
                          inprogress.map((data, i) => {
                            return (
                              <Grid item xs={12} sm={12} md={12} lg={4} xl={3}>
                                <div
                                  className="card_launchpad"
                                  onClick={() => details_page_moving(data)}
                                >
                                  <div className="header_launc">
                                    <div className="coin_launch">
                                      <img
                                        src={
                                          data.currency_image == ""
                                            ? require("../../../img/New_images/color.png")
                                            : data.currency_image
                                        }
                                        className="img-fluid "
                                      />{" "}
                                      <h5>
                                        {data.currency_name}{" "}
                                        <span>{data.symbol}</span>
                                      </h5>
                                    </div>
                                    <div className="launch_status">
                                      <span>In Progress</span>
                                    </div>
                                  </div>
                                  <hr />
                                  <div className="data_launc">
                                    <p>
                                      Total Funds
                                      <span>
                                        {parseFloat(data.totalSupply).toFixed(
                                          6
                                        )}{" "}
                                        {data.symbol}
                                      </span>
                                    </p>
                                    <p>
                                      Network<span>{data.network}</span>
                                    </p>
                                    <p>
                                      Start Date
                                      <span>
                                        {moment(data.startDate).format("lll")}
                                      </span>
                                    </p>
                                    <p>
                                      End Date
                                      <span>
                                        {moment(data.endDate).format("lll")}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </Grid>
                            );
                          })
                        ) : (
                          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="test_center">
                              <p>No data found</p>
                            </div>
                          </Grid>
                        )}
                      </Grid>
                    </div>
                  </div>
                  <div id="Expired" className="tab-pane fade">
                    <div className="tab-pane fade in active show">
                      <Grid
                        container
                        spacing={2}
                        justifyContent={"start"}
                        marginBottom={10}
                      >
                        {/* Item for xs (extra small) screens */}
                        {expired.length > 0 ? (
                          expired.map((data, i) => {
                            return (
                              <Grid item xs={12} sm={12} md={12} lg={4} xl={3}>
                                <div
                                  className="card_launchpad"
                                  // onClick={() => details_page_moving(data)}
                                >
                                  <div className="header_launc">
                                    <div className="coin_launch">
                                      <img
                                        src={
                                          data.currency_image == ""
                                            ? require("../../../img/New_images/color.png")
                                            : data.currency_image
                                        }
                                        className="img-fluid "
                                      />{" "}
                                      <h5>
                                        {data.currency_name}{" "}
                                        <span>{data.symbol}</span>
                                      </h5>
                                    </div>
                                    <div className="launch_status">
                                      <span>Expired</span>
                                    </div>
                                  </div>
                                  <hr />
                                  <div className="data_launc">
                                    <p>
                                      Total Funds
                                      <span>
                                        {parseFloat(data.totalSupply).toFixed(
                                          6
                                        )}{" "}
                                        {data.symbol}
                                      </span>
                                    </p>
                                    <p>
                                      Network<span>{data.network}</span>
                                    </p>
                                    <p>
                                      Start Date
                                      <span>
                                        {moment(data.startDate).format("lll")}
                                      </span>
                                    </p>
                                    <p>
                                      End Date
                                      <span>
                                        {moment(data.endDate).format("lll")}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </Grid>
                            );
                          })
                        ) : (
                          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="test_center">
                              <p>No data found</p>
                            </div>
                          </Grid>
                        )}
                      </Grid>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
            {/* Your other components and content */}
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
