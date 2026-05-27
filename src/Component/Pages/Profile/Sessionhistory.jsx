import React, { useState, useEffect } from "react";
import Account_Header from "../../Newcomponent/Account_Header";
// import Header from "../../Newcomponent/Header";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiService from "../../../core/service/detail";
import { postMethod } from "../../../core/service/common.api";
import Footernew from "../../footer_buttom";
import { Grid, Paper, Container } from "@mui/material";
import { setAuthorization } from "../../../core/service/axios";
import { Button } from "semantic-ui-react";
import { Checkbox } from "semantic-ui-react";
import { Dropdown } from "semantic-ui-react";
import SidebarNew from "./SidebarNew";
import Pagination from "react-js-pagination";
import moment from "moment";

function Home() {
  const [pageLoader, setPageloader] = useState(false);

  useEffect(() => {
    setPageloader(true);

    setTimeout(() => {
      setPageloader(false);
    }, 1000);
    getsession(1);
  }, []);

  const [sessionHistory, setsessionHistory] = useState([]);
  const [currentPagesession, setcurrentPagesession] = useState(1);
  const [totalsession, settotalsession] = useState([]);

  const recordPerPagesession = 5;
  const pageRangesession = 5;
  const handlePageChangesession = (pagenum) => {
    console.log(pagenum, "=-=-=-=pagenum");
    setcurrentPagesession(pagenum);
    getsession(pagenum);
  };
  const getsession = async (page) => {
    var obj = {
      apiUrl: apiService.getSessionHisotry,
      payload: { perpage: 5, page: page },
    };
    var session_history_list = await postMethod(obj);
    if (session_history_list.success == true) {
      setsessionHistory(session_history_list.data.data);
      settotalsession(session_history_list.data.total);
    }
  };

  return (
    <div className="">
      <main className="main-content tradepage-bg  bg-cover onlywhitee new_login_bb">
        <Account_Header />
        {pageLoader == true ? (
          <Grid item xs={12} sm={12} md={8} lg={12} xl={12}>
            <div className="loading">
              <i className="fa-solid fa-spinner fa-spin-pulse "></i>
            </div>
          </Grid>
        ) : (
          <Container maxWidth="xl" className="container-lg">
            <Grid container spacing={2} justifyContent={"center"}>
              {/* Item for xs (extra small) screens */}
              <Grid item xs={12} sm={12} md={8} lg={3} xl={3}>
                <SidebarNew />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
                <Grid container spacing={2} justifyContent={"center"}>
                  <Grid item xs={12} sm={12} md={12} lg={11} xl={11}>
                    <div className="card_logoki pading_cardd history pl-4 pr-4">
                      <div className="step-5 ">
                        <div className="form_content">
                          <h1 className="mb-3 Launch_pad_steps">
                            Login History
                          </h1>
                        </div>
                        <div className="table_responsive">
                          <div className="table_section">
                            <div className="custom-table">
                              <div className="table-row header">
                                <div className="table-cell">IP Address</div>
                                <div className="table-cell">Device</div>
                                <div className="table-cell">Date</div>
                              </div>
                              {sessionHistory && sessionHistory.length > 0 ? (
                                sessionHistory.map((item, i) => {
                                  return (
                                    <div className="table-row border_table_row">
                                      <div className="table-cell">
                                        <div className="table-cell">
                                          <div className="data_inner">
                                            {item.ipAddress}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="table-cell">
                                        <div className="data_inner">
                                          {item.OS}
                                        </div>
                                      </div>

                                      <div className="table-cell">
                                        <div className="data_inner">
                                          {moment(item.createdDate).format("L")}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })
                              ) : (
                                <div className="table-cell_no">
                                  <div className="data_inner">
                                    No Data found
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {sessionHistory.length > 0 ? (
                      <Pagination
                        itemClass="page-item" // add it for bootstrap 4
                        linkClass="page-link" // add it for bootstrap 4
                        activePage={currentPagesession}
                        itemsCountPerPage={recordPerPagesession}
                        totalItemsCount={totalsession}
                        pageRangeDisplayed={pageRangesession}
                        onChange={handlePageChangesession}
                      />
                    ) : (
                      ""
                    )}
                  </Grid>
                  <Grid item xs={12} sm={12} md={8} lg={12} xl={12}></Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* Your other components and content */}
          </Container>
        )}
      </main>
    </div>
  );
}

export default Home;
