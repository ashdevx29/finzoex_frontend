import React, { useEffect } from "react";
import useState from "react-usestateref"
// import Header from "../../Newcomponent/Header";
import Account_Header from "../../Newcomponent/Account_Header";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiService from "../../../core/service/detail";
import { getMethod, postMethod } from "../../../core/service/common.api";
import Footernew from "../../footer_buttom";
import { Grid, Paper, Container } from "@mui/material";
import { setAuthorization } from "../../../core/service/axios";
import { Button } from "semantic-ui-react";
import { Checkbox } from "semantic-ui-react";
import { Dropdown } from "semantic-ui-react";
import SidebarNew from "./SidebarNew";
import moment from "moment";
import Pagination from "react-js-pagination";
function Home() {
  const [refferance, setrefferance,refferanceref] = useState("");
  const [totalRef, settotalRef] = useState([]);
  const [Rewardamount, setRewardamount] = useState("");
  const [refferaldata, setrefferaldata] = useState([]);
  const [profileData, setprofileData] = useState("");
  const [sessionHistory, setsessionHistory] = useState([]);
  const [totalPage, setTotalpages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [rewardHistory, setrewardHistory] = useState([]);
  const [totalPage_reward, setTotalpages_reward] = useState(0);
  const [currentPage_reward, setCurrentPage_reward] = useState(1);

  useEffect(() => {
    getReferralDetails();
    getReward();
    referralHistory(1);
  }, [0]);

  const recordPerPage = 5;
  const pageRange = 5;

  const recordPerPage_reward = 5;
  const pageRange_reward = 5;

  const getReferralDetails = async () => {
    try {
      var data = {
        apiUrl: apiService.getUserDetails,
      };
      var resp = await getMethod(data);
      if (resp.status) {
        var currURL = window.location.href.split("Refferal")[0];
        var link = currURL + "register?/invite/" + resp.data.referralCode;
        setprofileData(resp.data);
        setrefferance(link);
      } else {
        setprofileData("");
      }
    } catch (error) {}
  };
console.log(refferanceref.current,"-0-0-0-0")

  const copy = (content) => {
    console.log("-========");
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(content);
      toast.success("Referral Link copied successfully");
    } else {
      toast.success("Link not copied, please try after sometimes!");
  }
  };

  const getReward = async () => {
    var get = {
      apiUrl: apiService.getReward,
    };
    var response = await getMethod(get);
    setrefferaldata(response.data);
    // setRewardamount(responce.data);
  };

  const referralHistory = async (page) => {
    try {
      var payload = {
        perpage: 5,
        page: page,
      };
      var data = {
        apiUrl: apiService.referralHistory,
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
    referralHistory(pageNumber);
    setCurrentPage(pageNumber);
  };
  const title = "Welcome to Taikonz";

  const handlePageChange_reward = (pageNumber) => {
    rewardHistory(pageNumber);
    setCurrentPage_reward(pageNumber);
  };
  return (
    <div className="">
      <main className="main-content tradepage-bg  bg-cover onlywhitee new_login_bb">
        <Account_Header />
        <Container maxWidth="xl" className="container-lg">
          <Grid container spacing={2} justifyContent={"center"}>
            {/* Item for xs (extra small) screens */}
            <Grid item xs={12} sm={12} md={8} lg={3} xl={3}>
              <SidebarNew />
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={9} xl={9}>
              <Grid container spacing={2} justifyContent={"center"}>
                <Grid item xs={12} sm={12} md={8} lg={7} xl={7}>
                  <div className="card_logoki pading_cardd">
                    <div className="step-5 ">
                      <div className="form_content">
                        <h1 className="mb-2 Launch_pad_steps">
                          Invite Friends, <br />
                          Earn Crypto Together!
                        </h1>
                      </div>
                      <div className="form_login_section p-0 mt-4">
                        <div className="form register_login p-0 gap_button">
                          <form className="form_pading_s">
                            <span>Total Referrals</span>
                            <h6>
                              {" "}
                              {refferaldata && refferaldata.totalRefCount}{" "}
                            </h6>
                          </form>
                          <form className="form_pading_s groow-1">
                            <span>Total Referrals</span>
                            <h6>
                              ₹ {refferaldata && refferaldata.total_bonus}{" "}
                            </h6>
                          </form>
                        </div>
                        <div className="form register_login p-0 mt-4">
                          <form className="form_pading_s box" >
                           <div className="form-group">
                              <label className="d-block w-100 text-center text-color-pur">
                                Referral Link
                              </label>
                              <div className="postion_reletitt refer">
                                <input
                                  type="text"
                                  className="form-control-ref"
                                  id="exampleInputPassword1"
                                  value={refferance}
                                  placeholder="refferal link"
                                />
                                <div className="input-group-addon">
                                  <i
                                    className="ri-file-copy-line"
                                    onClick={() => copy(refferance)}
                                  ></i>
                                </div>
                              </div>
                            </div> 

{/* <div className="form-group">
                            <label>Refferal Link</label>
                            <div className="postion_reletitt">
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputPassword1"
                                value={refferance.substring(0, 20) + "...."}
                                placeholder="Address"
                              />
                              <div className="input-group-addon">
                                <i
                                  className="ri-file-copy-line"
                                  onClick={() => copy(refferance)}

                                ></i>
                              </div>
                            </div>
                          </div> */}
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <div className="table_section">
                    <h3 className="font_color">Referral History</h3>
                    <div className="table_responsive">
                      <div className="custom-table">
                        <div className="table-row header">
                          <div className="table-cell">S.No</div>
                          <div className="table-cell">Email</div>
                          <div className="table-cell">User Name</div>
                          <div className="table-cell">Date / time</div>
                        </div>
                        {sessionHistory.length > 0 ? (
                          sessionHistory &&
                          sessionHistory.map((item, i) => {
                            return (
                              <div className="table-row border_table_row">
                                <div className="table-cell">
                                  <div className="content_section">
                                    <h3>{item.id}</h3>
                                  </div>
                                </div>
                                <div className="table-cell">
                                  <div className="data_inner">{item.email}</div>
                                </div>
                                <div className="table-cell">
                                  <div className="data_inner">
                                    {" "}
                                    {item.username}
                                  </div>
                                </div>
                                <div className="table-cell">
                                  <div className="data_inner">
                                    {" "}
                                    {moment(item.createdDate).format("lll")}
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div className="table-cell justify-content-center">
                            <div className="data_inner">
                              No Referral History Found!
                            </div>
                          </div>
                          // <p colSpan="5">No data found</p>
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
            </Grid>
          </Grid>
          {/* Your other components and content */}
        </Container>
      </main>
    </div>
  );
}

export default Home;
