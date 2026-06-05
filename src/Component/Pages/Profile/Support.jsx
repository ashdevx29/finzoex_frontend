import React, { useEffect, useState } from "react";
// import Header from "../../Newcomponent/Header";
import Account_Header from "../../Newcomponent/Account_Header";
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
import { ValidationError } from "yup";
import moment from "moment";
import Pagination from "react-js-pagination";
import useStateref from "react-usestateref";
import DashboardBg from "../../../img/Dashboard/DashboadBg.jpg";

function Home() {
  const value = {
    Subject: "",
    Category: "Choose Category",
    text: "",
  };

  const [Formdata, setFormdata] = useState(value);

  const [SubjectErr, setSubjectErr] = useState(value);
  const [CategoryErr, setCategoryErr] = useState(value);
  const [textErr, settextErr] = useState(value);

  const [formErr, setformErr] = useState("");

  const [user, setuser] = useState([]);
  const [buttonLoader, setbuttonLoader] = useState(false);
  const [currentPage, setCurrentPage, currentPageref] = useStateref(1);
  const [totalPage, setTotalpages] = useState(0);

  const { Subject, Category, text } = Formdata;

  const getItem = (e) => {
    var { name, value } = e.target;
    let check = { ...Formdata, ...{ [name]: value } };
    setFormdata(check);
  };

  const recordPerPage = 5;
  const totalRecords = 15;
  const pageRange = 5;

  const handlePageChange = (pageNumber) => {
    console.log("-=-=-=-=-=-=-=-=-=-=enter");
    viewData(pageNumber);
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    viewData(1);
  }, []);

  const validate = async (condition) => {
    var error = {};
    if (condition.Subject == "") {
      error.Subject = "Subject is a required field";
      setSubjectErr(true);
    } else if (condition.Subject.length < 5) {
      error.Subject = "Minimum 5 Characters only allowed ";
      setSubjectErr(true);
    } else if (condition.Subject.length > 50) {
      error.Subject = "Maximum 50 Characters only allowed ";
      setSubjectErr(true);
    } else {
      setSubjectErr(false);
    }

    if (condition.text == "") {
      error.text = "Message is a required field";
      settextErr(true);
    } else if (condition.text.length <= 10) {
      error.text = "Minimum 10 Characters only allowed ";
      settextErr(true);
    } else if (condition.text.length > 250) {
      error.text = "Maximum 250 Characters only allowed ";
      settextErr(true);
    } else {
      settextErr(false);
    }

    if (condition.Category == "Choose Category") {
      error.Category = "Category is required";
      setCategoryErr(true);
    }
    setformErr(error);
  };

  const submit = async () => {
    validate(Formdata);
    // return false;
    if (
      Formdata.Subject != "" &&
      Formdata.Subject.length > 5 &&
      Formdata.Subject.length < 50 &&
      Formdata.Category != "Choose Category" &&
      Formdata.text != "" &&
      Formdata.text.length >= 10 &&
      Formdata.text.length <= 250
    ) {
      toast.success(
        "Your ticket created successfully, Please wait for admin reply"
      );
      var data = {
        apiUrl: apiService.createdSupport,
        payload: Formdata,
      };
      setbuttonLoader(true);
      var resp = await postMethod(data);
      setbuttonLoader(false);
      const obj = {
        Subject: "",
        Category: "Choose Category",
        text: "",
      };
      setFormdata(obj);
      viewData(1);
    }
  };
  const viewData = async (page) => {
    try {
      var api = {
        apiUrl: apiService.findedSupport,
        payload: {
          page: page,
          PerPage: pageRange,
        },
      };
      var view = await postMethod(api);
      if (view.status) {
        setuser(view.data.data);
        setTotalpages(view.data.total);
        console.log(view.data.total);
      }
    } catch (error) { }
  };

  const truncateWords = (text, limit = 2) => {
    if (!text) return "";
    const words = text.toString().trim().split(/\s+/);
    return words.length <= limit ? text : `${words.slice(0, limit).join(" ")}...`;
  };

  const copyText = async (text) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text.toString());
      toast.success("Copied to clipboard");
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  const pageBackgroundStyle = {
    backgroundImage: `url(${DashboardBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
  };

  return (
    <div className="">
      <main style={pageBackgroundStyle} className="main-content bg-cover">
        <Account_Header />
        <Container maxWidth="xl" className="!container-xl !pl-4 lg:!pl-20">
          <Grid container spacing={2} justifyContent={"center"}>
            {/* Item for xs (extra small) screens */}
            <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
              <SidebarNew />
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={9} xl={9}>
              <Grid container spacing={2} justifyContent={"center"}>
                <Grid item xs={12} sm={12} md={8} lg={9} xl={9}>
                  <div className="new_card_logoki new_pading_cardd">
                    <div className="step-2 ">
                      <div className="form_content">
                        <h1 className="mb-3">Support Ticket</h1>
                      </div>
                      <div className="form_login_section p-0">
                        <div className="form register_login p-0">
                          <form className="form_pading_s">
                            <div className="form-group">
                              <label>Subject</label>
                              <input
                                type="email"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Enter subject"
                                name="Subject"
                                maxLength={50}
                                value={Subject}
                                onChange={getItem}
                              />
                              <div className="alert_red">
                                {SubjectErr == true ? (
                                  <p style={{ color: "red", "text-align": "-webkit-match-parentc" }}>
                                    {formErr.Subject}{" "}
                                  </p>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                            <div className="form-group">
                              <label>Category</label>
                              <select
                                className="form-control"
                                name="Category"
                                value={Category}
                                onChange={getItem}
                              >
                                <option selected>Choose Category</option>
                                <option selected>Spot</option>
                                <option selected>P2p</option>
                                <option selected>Launchpad</option>
                                <option selected>Staking</option>
                                <option selected>Settings</option>
                              </select>
                              <div className="alert_red">
                                {CategoryErr == true ? (
                                  <p style={{ color: "red", "text-align": "-webkit-match-parentc" }}>{formErr.Category}</p>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                            <div className="form-group">
                              <label>Message</label>
                              <input
                                type="email"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Enter Message"
                                maxLength={250}
                                name="text"
                                value={text}
                                onChange={getItem}
                              />
                              <div className="alert_red">
                                {textErr == true ? (
                                  <p style={{ color: "red", "text-align": "-webkit-match-parentc" }}>{formErr.text} </p>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>

                          </form>

                          {buttonLoader == false ? (
                            <button
                              type="button"
                              className="btn btn-primary w-100"
                              onClick={submit}
                            >
                              Submit
                            </button>
                          ) : (
                            <button type="button" className="btn btn-primary w-100">
                              loading...
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
                  <div className="table_section">
                    <h3 className="font_color !text-[#E5E5E5]">Ticket History</h3>
                    <div className="table_responsive">
                      <div
                        className="custom-table"
                        style={{
                        
                          borderRadius: 20,
                          color: "#B3B3B3",
                          padding: 16,
                        }}
                      >
                        <div
                          className="table-row header"
                          style={{
                           
                            borderRadius: 12,
                            color: "#B3B3B3",
                            fontWeight: 600,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            className="table-cell"
                            style={{
                              minWidth: 0,
                              flex: "1 1 auto",
                              justifyContent: "center",
                              alignItems: "center",
                              textAlign: "center",
                            }}
                          >
                            Subject
                          </div>
                          <div
                            className="table-cell"
                            style={{
                              minWidth: 0,
                              flex: "1 1 auto",
                              justifyContent: "center",
                              alignItems: "center",
                              textAlign: "center",
                            }}
                          >
                            Message
                          </div>
                          <div
                            className="table-cell"
                            style={{
                              minWidth: 0,
                              flex: "1 1 auto",
                              justifyContent: "center",
                              alignItems: "center",
                              textAlign: "center",
                            }}
                          >
                            Category
                          </div>
                          <div
                            className="table-cell"
                            style={{
                              minWidth: 0,
                              flex: "1 1 auto",
                              justifyContent: "center",
                              alignItems: "center",
                              textAlign: "center",
                            }}
                          >
                            Date
                          </div>
                        </div>

                        {user.length > 0 ? (
                          user.map((data, i) => {
                            return (
                              <div
                                className="table-row border_table_row"
                                style={{
                                  color: "#B3B3B3",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                  <div
                                    className="table-cell"
                                    style={{
                                      minWidth: 0,
                                      flex: "1 1 auto",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      textAlign: "center",
                                    }}
                                  >
                                    <div className="data_inner" title={data.subject} style={{ width: "100%", textAlign: "center" }}>
                                      {truncateWords(data.subject, 2)}
                                    </div>
                                  </div>
                                <div
                                  className="table-cell table_message"
                                  style={{
                                    minWidth: 0,
                                    flex: "1 1 auto",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    position: "relative",
                                    textAlign: "center",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "100%",
                                      position: "relative",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <span
                                      className="data_inner"
                                      title={data.message}
                                      style={{ display: "block", width: "100%", textAlign: "center" }}
                                    >
                                      {truncateWords(data.message, 2)}
                                    </span>
                                    {data.message ? (
                                      <span
                                        onClick={() => copyText(data.message)}
                                        style={{
                                          position: "absolute",
                                          right: 8,
                                          cursor: "pointer",
                                          color: "#B3B3B3",
                                          fontSize: 16,
                                          display: "inline-flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                        }}
                                        title="Copy full message"
                                      >
                                        <i className="ri-file-copy-line"></i>
                                      </span>
                                    ) : null}
                                  </div>
                                </div>
                                <div
                                  className="table-cell"
                                  style={{
                                    minWidth: 0,
                                    flex: "1 1 auto",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    textAlign: "center",
                                  }}
                                >
                                  <div className="data_inner" title={data.category} style={{ width: "100%", textAlign: "center" }}>
                                    {truncateWords(data.category, 2)}
                                  </div>
                                </div>
                                <div
                                  className="table-cell"
                                  style={{
                                    minWidth: 0,
                                    flex: "1 1 auto",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    textAlign: "center",
                                  }}
                                >
                                  <div className="data_inner" title={moment(data.created_at).format("L")} style={{ width: "100%", textAlign: "center" }}>
                                    {moment(data.created_at).format("L")}
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div className="table-cell justify-center" style={{ color: "#B3B3B3" }}>
                            <div className="data_inner">No Data found</div>
                          </div>
                        )}
                        {user.length > 0 ? (
                          <div style={{ padding: "16px 0",  color: "#B3B3B3" }}>
                            <Pagination
                              itemClass="page-item"
                              linkClass="page-link"
                              activePage={currentPageref.current}
                              itemsCountPerPage={recordPerPage}
                              totalItemsCount={totalPage}
                              pageRangeDisplayed={pageRange}
                              onChange={handlePageChange}
                            />
                          </div>
                        ) : ("")}
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
