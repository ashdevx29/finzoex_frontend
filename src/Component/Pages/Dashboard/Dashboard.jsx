import React, { useEffect } from "react";
// import Header from "../../Newcomponent/Header";
import Account_Header from "../../Newcomponent/Account_Header";
import { Link, useNavigate } from "react-router-dom";
import apiService from "../../../core/service/detail";
import { getMethod, postMethod } from "../../../core/service/common.api";
import { Grid, Paper, Container } from "@mui/material";
import { Dropdown } from "semantic-ui-react";
import useState from "react-usestateref";
import { Button } from "semantic-ui-react";
import Pagination from "react-js-pagination";
import { socket } from "../../context/socket";
import {
  removeAuthToken,
  getAuthToken,
  getSocketToken,
} from "../../../core/lib/localStorage";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useStateRef from "react-usestateref";

import DashboardBg from "../../../img/Dashboard/DashboadBg.jpg";

function Home() {
  const [perpage, setperpage] = useState(5);
  const [chartdata, setchartdata, chartdataref] = useStateRef([
    { Balance: 1, Date: 0 },
    { Balance: 2, Date: 0 },
    { Balance: 4, Date: 0 },
    { Balance: 5, Date: 0 },
    { Balance: 6, Date: 0 },
  ]);
  const [search, setsearch] = useState("");
  const [balanceDetails, setbalanceDetails] = useState([]);
  const [balance_overallusdt, setbalance_overallusde] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, settotal] = useState(0);
  const [totalINRPrice, setToatalINRPrice] = useState(0);
  const [AvailablePrice, setAvailablePrice] = useState(0);
  const [inorderPrice, setinorderPrice] = useState(0);
  const [loader_icon, setloader_icon] = useState(false);



  const formatXAxis = (value) => {
  const date = new Date(value);

  if (isNaN(date.getTime())) return "";

  if (actives === "") {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    });
  }

  if (actives === "day") {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
    });
  }

  if (actives === "month") {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });
  }

  if (actives === "month3") {
    return date.toLocaleDateString("en-US", {
      month: "short",
    });
  }

  if (actives === "year") {
    return date.toLocaleDateString("en-US", {
      month: "short",
    });
  }

  return value;
};




  const recordPerPage = 5;

  // total number of the records
  const totalRecords = 7;

  // range of pages in paginator
  const pageRange = 5;
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // call API to get data based on pageNumber
    getUserbalance(pageNumber);
  };

  const getUserbalance = async (pages) => {
    var currency = (localStorage.getItem("currency") != null) ? localStorage.getItem("currency") : "INR";
    setPageloader(true);

    var obj = {
      perpage: perpage,
      page: pages,
      search: search,
      currency: currency,
    };
    var data = {
      apiUrl: apiService.getUserBalance_dashboard,
      payload: obj,
    };
    var resp = await postMethod(data);
    setPageloader(false);

    if (resp.status) {
      console.log(resp.Message, "=-=-=-resp.Message=-=-=-");
      var balanceData = resp.Message;
      // var totalAmount = 0;
      // var availableAmount = 0;
      // var holdAMount = 0;
      // for(var i=0; i< balanceData.length; i++ ){
      //   totalAmount += balanceData[i].estimatedUSDTtotal;
      //   availableAmount += balanceData[i].estimatedUSDTbalance;
      //   holdAMount += balanceData[i].estimatedUSDThold;
      // }
      // console.log(totalAmount,'=-=-=-=-=totalAmount-=-=-=-totalAmount-=-=');
      // setToatalINRPrice(totalAmount);
      setbalanceDetails(resp.Message);
      setbalance_overallusde(resp.balance);

      settotal(resp.total);
      // setAvailablePrice(availableAmount);
      // setinorderPrice(holdAMount);
    } else {
    }
  };
  const searchWalletList = async () => {
    getUserbalance(1);
  };
  const getPortfolio = async () => {
    var currency = (localStorage.getItem("currency") != null) ? localStorage.getItem("currency") : "INR";
    setPageloader(true);

    var obj = {
      currency: currency
    };
    var data = {
      apiUrl: apiService.portfolioBalance,
      payload: obj,
    };
    var resp = await postMethod(data);
    setPageloader(false);

    if (resp.status == true) {
      console.log(resp.balance, "=-=-=-resp.Message=-=-=-");
      var balanceData = resp.balance;
      setToatalINRPrice(
        balanceData.total_balance == null ? 0 : balanceData.total_balance
      );
      setAvailablePrice(
        balanceData.available_balance == null
          ? 0
          : balanceData.available_balance
      );
      setinorderPrice(
        balanceData.inorder_balance == null ? 0 : balanceData.inorder_balance
      );
    } else {
    }
  };
  var [currency_Value, setcurrency_Value] = useState("INR");
  const [pageLoader, setPageloader] = useState(false);

  useEffect(() => {
    setPageloader(true);

    setTimeout(() => {
      setPageloader(false);
    }, 1000);
    let token_socket = localStorage.getItem("user_token");
    if (!token_socket) {
      navigate("/login");
    }
    socket.on("dashboardvalueend", async (response) => {
      console.log(response, "response");
      localStorage.setItem("currency", response);
      if (response) {
        getPortfolio();
        getUserbalance(currentPage);
        setcurrency_Value(response);
      }
    });
    getPortfolio();
    getUserbalance(currentPage);
    prediction("");
  }, []);
  const [actives, setactives] = useState("");
  //===================Chart data============================//
  const prediction = async (value) => {
    setactives(value);
    var now = new Date();
    var fdate = new Date();
    if (value == "") {
      fdate = new Date();
    } else if (value == "day") {
      var week = new Date(now);
      week.setDate(now.getDate() - 7);
      var weekIST = new Date(week);
      weekIST.setHours(weekIST.getHours() + 5);
      weekIST.setMinutes(weekIST.getMinutes() + 30);
      fdate = weekIST;
    } else if (value == "month") {
      var month = new Date(now);
      month.setDate(now.getDate() - 30);
      var monthIST = new Date(month);
      monthIST.setHours(monthIST.getHours() + 5);
      monthIST.setMinutes(monthIST.getMinutes() + 30);
      fdate = monthIST;
    } else if (value == "month3") {
      var month3 = new Date(now);
      month3.setDate(now.getDate() - 90);
      var month3IST = new Date(month3);
      month3IST.setHours(month3IST.getHours() + 5);
      month3IST.setMinutes(month3IST.getMinutes() + 30);
      fdate = month3IST;
    } else if (value == "year") {
      var yesrDate = new Date(now);
      yesrDate.setDate(now.getDate() - 365);
      var yesrDateIST = new Date(yesrDate);
      yesrDateIST.setHours(yesrDateIST.getHours() + 5);
      yesrDateIST.setMinutes(yesrDateIST.getMinutes() + 30);
      fdate = yesrDateIST;
    }
    console.log("Due Date:", now);
    console.log("Due Date:", fdate);
    var obj = {
      fdate: fdate,
      tdate: new Date(),
    };

    var data = {
      apiUrl: apiService.getChartValue,
      payload: obj,
    };
    setloader_icon(true);
    var resp = await postMethod(data);
    setloader_icon(false);
    if (resp.status == true) {
      setchartdata(resp.data);
    } else {
      setchartdata([
        { Balance: 0, Date: 0 },
        { Balance: 0, Date: 0 },
        { Balance: 0, Date: 0 },
        { Balance: 0, Date: 0 },
        { Balance: 0, Date: 0 },
      ]);
    }
  };

  const navbar = (value) => {
    if (value == "deposit") {
      navigate("/deposit");
    } else if (value == "withdraw") {
      navigate("/Withdraw");
    }
  };

  return (
    <div className="light_dashboard">
      <main className="main-content tradepage-bg  bg-cover onlywhitee new_login_bb">
        <Account_Header />
        {pageLoader == true ? (
          <Grid item xs={12} sm={12} md={8} lg={12} xl={12}>
            <div className="loading">
              <i className="fa-solid fa-spinner fa-spin-pulse "></i>
            </div>
          </Grid>
        ) : (
        
          <div
      className="class-padding"
      style={{
        backgroundImage: `url(${DashboardBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "calc(100vh - 60px)",
        marginTop:"-20px",
      }}
    >
            <p className="dashboard_title ">Dashboard</p>
            <Grid
              container
              spacing={2}
              justifyContent={"center"}
              marginTop={"20px"}
            >
              {/* Item for xs (extra small) screens */}
              <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                <div className="Card_dashboard mb-4" style={{ backgroundColor: '#11131a', borderRadius: '12px', border: 'none', padding: '20px' }}>
                  <div className="row justify-content-between mb-2">
                    <div className="toplable col-lg-4">
                      <p style={{ color: '#a0aec0', fontSize: '15px', marginBottom: '8px' }}>Portfolio Value</p>
                      <h2 style={{ fontSize: '30px', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: '8px', color: '#fff' }}>
                        {currency_Value == "INR" ? "₹" : "$"}{" "}
                        {parseFloat(totalINRPrice && totalINRPrice).toFixed(2)}{" "}
                        <span style={{ fontSize: '14px', color: '#a0aec0', fontWeight: 'normal' }}>{currency_Value == "INR" ? "INR" : "USD"}</span>
                      </h2>
                    </div>
                    <div className="toplable label_clr col-lg-5">
                      <div className="d-flex flex-row justify-around tabs_collection" style={{ gap: '10px' }}>
                        <span
                          onClick={() => prediction("")}
                          style={{ cursor: "pointer", background: (actives == "" || actives == undefined) ? '#e2e8f0' : 'transparent', color: (actives == "" || actives == undefined) ? '#0f172a' : '#94a3b8', border: '1px solid #334155', borderRadius: '20px', padding: '4px 16px', fontSize: '13px', fontWeight: '600' }}
                          className={actives == "" || undefined ? "active" : ""}
                        >
                          1D
                        </span>
                        <span
                          onClick={() => prediction("day")}
                          style={{ cursor: "pointer", background: actives == "day" ? '#e2e8f0' : 'transparent', color: actives == "day" ? '#0f172a' : '#94a3b8', border: '1px solid #334155', borderRadius: '20px', padding: '4px 16px', fontSize: '13px', fontWeight: '600' }}
                          className={actives == "day" ? "active" : ""}
                        >
                          1W
                        </span>
                        <span
                          onClick={() => prediction("month")}
                          style={{ cursor: "pointer", background: actives == "month" ? '#e2e8f0' : 'transparent', color: actives == "month" ? '#0f172a' : '#94a3b8', border: '1px solid #334155', borderRadius: '20px', padding: '4px 16px', fontSize: '13px', fontWeight: '600' }}
                          className={actives == "month" ? "active" : ""}
                        >
                          1M
                        </span>
                        <span
                          onClick={() => prediction("month3")}
                          style={{ cursor: "pointer", background: actives == "month3" ? '#e2e8f0' : 'transparent', color: actives == "month3" ? '#0f172a' : '#94a3b8', border: '1px solid #334155', borderRadius: '20px', padding: '4px 16px', fontSize: '13px', fontWeight: '600' }}
                          className={actives == "month3" ? "active" : ""}
                        >
                          3M
                        </span>
                        <span
                          onClick={() => prediction("year")}
                          style={{ cursor: "pointer", background: actives == "year" ? '#e2e8f0' : 'transparent', color: actives == "year" ? '#0f172a' : '#94a3b8', border: '1px solid #334155', borderRadius: '20px', padding: '4px 16px', fontSize: '13px', fontWeight: '600' }}
                          className={actives == "year" ? "active" : ""}
                        >
                          1Y
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {loader_icon == false ? (
                    <div
                      style={{
                        marginTop: "20px",
                        width: "100%",
                        height: "395px",
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={chartdataref.current}
                          margin={{
                            top: 10,
                            right: 20,
                            left: 0,
                            bottom: 10,
                          }}
                        >
                          <XAxis
                            dataKey="Date"
                            tickFormatter={formatXAxis}
                            axisLine={{ stroke: "#1e293b" }}
                            tickLine={false}
                            tick={{
                              fill: "#64748b",
                              fontSize: 12,
                            }}
                          />

                          <YAxis
                            orientation="right"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                              fill: "#64748b",
                              fontSize: 12,
                            }}
                            tickFormatter={(value) =>
                              `${currency_Value === "INR" ? "₹" : "$"}${Number(value).toFixed(0)}`
                            }
                          />

                          <Tooltip
                            contentStyle={{
                              background: "#111827",
                              border: "1px solid #334155",
                              borderRadius: "10px",
                              color: "#fff",
                            }}
                            formatter={(value) => [
                              `${currency_Value === "INR" ? "₹" : "$"}${Number(value).toFixed(2)}`,
                              "Portfolio",
                            ]}
                            labelFormatter={(label) => {
                              const d = new Date(label);

                              if (isNaN(d.getTime())) return label;

                              if (actives === "") {
                                return d.toLocaleTimeString();
                              }

                              if (actives === "day") {
                                return d.toLocaleDateString("en-US", {
                                  weekday: "long",
                                });
                              }

                              if (actives === "month") {
                                return d.toLocaleDateString();
                              }

                              if (actives === "month3") {
                                return d.toLocaleDateString("en-US", {
                                  month: "long",
                                  year: "numeric",
                                });
                              }

                              if (actives === "year") {
                                return d.toLocaleDateString("en-US", {
                                  month: "long",
                                  year: "numeric",
                                });
                              }

                              return label;
                            }}
                          />

<Line
  type="linear"
  dataKey="Balance"
  stroke="#00B7FF"
  strokeWidth={1.5}
  dot={false}
  activeDot={false}
/>

                          {/* <Line
                            type="monotone"
                            dataKey="Balance"
                            stroke="#00A2FF"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{
                              r: 6,
                              fill: "#00A2FF",
                              stroke: "#111827",
                              strokeWidth: 2,
                            }}
                          /> */}
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    
                  ) : (
                    <i className="fa-solid fa-spinner fa-spin chart_loader"></i>
                  )}
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                <div className="Card_dashboard mb-4">
                  <p>
                    <span>Portfolio Value</span>{" "}
                    {currency_Value == "INR" ? "₹" : "$"}{" "}
                    {parseFloat(totalINRPrice && totalINRPrice).toFixed(2)}{" "}
                  </p>
                </div>
                <div className="Card_dashboard mb-4">
                  <p className="mb-3">
                    <span>Wallet balance</span>{" "}
                    {currency_Value == "INR" ? "₹" : "$"}{" "}
                    {AvailablePrice.toFixed(2)}
                  </p>
                  <div className="button_footer">
                    <Button onClick={() => navbar("deposit")}>Deposit</Button>
                    <Button onClick={() => navbar("withdraw")}>Withdraw</Button>
                  </div>
                </div>
                <div className="Card_dashboard">
                  <p>
                    <span>In Order Balance</span>{" "}
                    {currency_Value == "INR" ? "₹" : "$"}{" "}
                    {inorderPrice.toFixed(2)}
                  </p>
                </div>
              </Grid>
            
                <div className="search_bar dash_board_search_box">
                  <i className="ri-search-line" onClick={() => searchWalletList()}></i>
                  <input
                    type="text"
                    placeholder="Search"
                    onChange={(e) => setsearch(e.target.value)}
                  />
                </div>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="table_responsive">
                  <div className="table_section">
                    <div className="custom-table">
                      <div className="table-row header dashboard_2">
                        <div className="table-cell">Currency</div>
                        <div className="table-cell">On Orders</div>

                        <div className="table-cell">Available Balance</div>
                        {/* <div className="table-cell">Launchpad Balance</div> */}
                        <div className="table-cell">Total Balance</div>
                      </div>

                      {balanceDetails.length > 0 ? (
                        balanceDetails.map((item, i) => {
                          return (
                            <div className="table-row border_table_row dashboard_">
                              <div className="table-cell  asdfas">
                                <div className="data_inner flex_image_coloe">
                                  <img src={item.currencyImage} />
                                  {item.currencysymbol}{" "}
                                  <small className="marging_button">
                                    {item.currencyName}
                                  </small>
                                </div>
                              </div>
                              <div className="table-cell advb">
                                <div className="content_section">
                                  <h3>
                                    {parseFloat(item.holdAmount).toFixed(8)}{" "}
                                    {item.currencysymbol}{" "}
                                  </h3>
                                  <p>
                                    {currency_Value == "INR" ? "₹" : "$"}{" "}
                                    {parseFloat(item.estimatedUSDThold).toFixed(
                                      2
                                    )}{" "}
                                  </p>
                                </div>
                              </div>
                              <div className="table-cell">
                                <div className="content_section">
                                  <h3>
                                    {parseFloat(item.currencyBalance).toFixed(
                                      8
                                    )}{" "}
                                    {item.currencysymbol}
                                  </h3>
                                  <p>
                                    {currency_Value == "INR" ? "₹" : "$"}{" "}
                                    {parseFloat(
                                      item.estimatedUSDTbalance
                                    ).toFixed(2)}{" "}
                                  </p>
                                </div>
                              </div>
                              <div className="table-cell">
                                <div className="content_section">
                                  <h3>
                                    {" "}
                                    {parseFloat(
                                      item.currencyBalance +
                                        parseFloat(item.holdAmount)
                                    ).toFixed(8)}{" "}
                                    {item.currencysymbol}{" "}
                                  </h3>
                                  <p>
                                    {currency_Value == "INR" ? "₹" : "$"}{" "}
                                    {parseFloat(
                                      item.estimatedUSDTtotal
                                    ).toFixed(2)}{" "}
                                  </p>
                                </div>
                              </div>
                              {/* <div className="table-cell">
                              <div className="content_section">
                                <h3>
                                  {item.launchPadAmount != undefined &&
                                    item.launchPadAmount != null &&
                                    item.launchPadAmount != ""
                                    ? parseFloat(item.launchPadAmount).toFixed(
                                      8
                                    )
                                    : (0).toFixed(8)}{" "}
                                  {item.currencysymbol}{" "}
                                </h3>
                                <p>
                                  ₹
                                  {parseFloat(item.estimatedUSDTtotal).toFixed(
                                    2
                                  )}{" "}
                                </p>
                              </div>
                            </div> */}
                            </div>
                          );
                        })
                      ) : (
                        <div className="table-cell justify-center">
                          <div className="content_section">
                            <p>No data found</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <Pagination
                      itemClass="page-item"
                      linkClass="page-link"
                      activePage={currentPage}
                      itemsCountPerPage={recordPerPage}
                      totalItemsCount={total}
                      pageRangeDisplayed={pageRange}
                      onChange={handlePageChange}
                    />
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
function customMouseOver(e) {
  console.log(e, "=======");
  return (
    <div className="customMouseOver">
      <h1>e hold the line data in payload element</h1>
    </div>
  );
}

export default Home;















// import React, { useEffect } from "react";
// // import Header from "../../Newcomponent/Header";
// import Account_Header from "../../Newcomponent/Account_Header";
// import { Link, useNavigate } from "react-router-dom";
// import apiService from "../../../core/service/detail";
// import { getMethod, postMethod } from "../../../core/service/common.api";
// import { Grid, Paper, Container } from "@mui/material";
// import { Dropdown } from "semantic-ui-react";
// import useState from "react-usestateref";
// import { Button } from "semantic-ui-react";
// import Pagination from "react-js-pagination";
// import { socket } from "../../context/socket";
// import {
//   removeAuthToken,
//   getAuthToken,
//   getSocketToken,
// } from "../../../core/lib/localStorage";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
// } from "recharts";
// import useStateRef from "react-usestateref";

// function Home() {
//   const [perpage, setperpage] = useState(5);
//   const [chartdata, setchartdata, chartdataref] = useStateRef([
//     { Balance: 1, Date: 0 },
//     { Balance: 2, Date: 0 },
//     { Balance: 4, Date: 0 },
//     { Balance: 5, Date: 0 },
//     { Balance: 6, Date: 0 },
//   ]);
//   const [search, setsearch] = useState("");
//   const [balanceDetails, setbalanceDetails] = useState([]);
//   const [balance_overallusdt, setbalance_overallusde] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [total, settotal] = useState(0);
//   const [totalINRPrice, setToatalINRPrice] = useState(0);
//   const [AvailablePrice, setAvailablePrice] = useState(0);
//   const [inorderPrice, setinorderPrice] = useState(0);
//   const [loader_icon, setloader_icon] = useState(false);

//   const recordPerPage = 5;

//   // total number of the records
//   const totalRecords = 7;

//   // range of pages in paginator
//   const pageRange = 5;
//   const navigate = useNavigate();

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber); // call API to get data based on pageNumber
//     getUserbalance(pageNumber);
//   };

//   const getUserbalance = async (pages) => {
//     var currency = (localStorage.getItem("currency") != null) ? localStorage.getItem("currency") : "INR";
//     setPageloader(true);

//     var obj = {
//       perpage: perpage,
//       page: pages,
//       search: search,
//       currency: currency,
//     };
//     var data = {
//       apiUrl: apiService.getUserBalance_dashboard,
//       payload: obj,
//     };
//     var resp = await postMethod(data);
//     setPageloader(false);

//     if (resp.status) {
//       console.log(resp.Message, "=-=-=-resp.Message=-=-=-");
//       var balanceData = resp.Message;
//       // var totalAmount = 0;
//       // var availableAmount = 0;
//       // var holdAMount = 0;
//       // for(var i=0; i< balanceData.length; i++ ){
//       //   totalAmount += balanceData[i].estimatedUSDTtotal;
//       //   availableAmount += balanceData[i].estimatedUSDTbalance;
//       //   holdAMount += balanceData[i].estimatedUSDThold;
//       // }
//       // console.log(totalAmount,'=-=-=-=-=totalAmount-=-=-=-totalAmount-=-=');
//       // setToatalINRPrice(totalAmount);
//       setbalanceDetails(resp.Message);
//       setbalance_overallusde(resp.balance);

//       settotal(resp.total);
//       // setAvailablePrice(availableAmount);
//       // setinorderPrice(holdAMount);
//     } else {
//     }
//   };
//   const searchWalletList = async () => {
//     getUserbalance(1);
//   };
//   const getPortfolio = async () => {
//     var currency = (localStorage.getItem("currency") != null) ? localStorage.getItem("currency") : "INR";
//     setPageloader(true);

//     var obj = {
//       currency: currency
//     };
//     var data = {
//       apiUrl: apiService.portfolioBalance,
//       payload: obj,
//     };
//     var resp = await postMethod(data);
//     setPageloader(false);

//     if (resp.status == true) {
//       console.log(resp.balance, "=-=-=-resp.Message=-=-=-");
//       var balanceData = resp.balance;
//       setToatalINRPrice(
//         balanceData.total_balance == null ? 0 : balanceData.total_balance
//       );
//       setAvailablePrice(
//         balanceData.available_balance == null
//           ? 0
//           : balanceData.available_balance
//       );
//       setinorderPrice(
//         balanceData.inorder_balance == null ? 0 : balanceData.inorder_balance
//       );
//     } else {
//     }
//   };
//   var [currency_Value, setcurrency_Value] = useState("INR");
//   const [pageLoader, setPageloader] = useState(false);

//   useEffect(() => {
//     setPageloader(true);

//     setTimeout(() => {
//       setPageloader(false);
//     }, 1000);
//     let token_socket = localStorage.getItem("user_token");
//     if (!token_socket) {
//       navigate("/login");
//     }
//     socket.on("dashboardvalueend", async (response) => {
//       console.log(response, "response");
//       localStorage.setItem("currency", response);
//       if (response) {
//         getPortfolio();
//         getUserbalance(currentPage);
//         setcurrency_Value(response);
//       }
//     });
//     getPortfolio();
//     getUserbalance(currentPage);
//     prediction("");
//   }, []);
//   const [actives, setactives] = useState("");
//   //===================Chart data============================//
//   const prediction = async (value) => {
//     setactives(value);
//     var now = new Date();
//     var fdate = new Date();
//     if (value == "") {
//       fdate = new Date();
//     } else if (value == "day") {
//       var week = new Date(now);
//       week.setDate(now.getDate() - 7);
//       var weekIST = new Date(week);
//       weekIST.setHours(weekIST.getHours() + 5);
//       weekIST.setMinutes(weekIST.getMinutes() + 30);
//       fdate = weekIST;
//     } else if (value == "month") {
//       var month = new Date(now);
//       month.setDate(now.getDate() - 30);
//       var monthIST = new Date(month);
//       monthIST.setHours(monthIST.getHours() + 5);
//       monthIST.setMinutes(monthIST.getMinutes() + 30);
//       fdate = monthIST;
//     } else if (value == "month3") {
//       var month3 = new Date(now);
//       month3.setDate(now.getDate() - 90);
//       var month3IST = new Date(month3);
//       month3IST.setHours(month3IST.getHours() + 5);
//       month3IST.setMinutes(month3IST.getMinutes() + 30);
//       fdate = month3IST;
//     } else if (value == "year") {
//       var yesrDate = new Date(now);
//       yesrDate.setDate(now.getDate() - 365);
//       var yesrDateIST = new Date(yesrDate);
//       yesrDateIST.setHours(yesrDateIST.getHours() + 5);
//       yesrDateIST.setMinutes(yesrDateIST.getMinutes() + 30);
//       fdate = yesrDateIST;
//     }
//     console.log("Due Date:", now);
//     console.log("Due Date:", fdate);
//     var obj = {
//       fdate: fdate,
//       tdate: new Date(),
//     };

//     var data = {
//       apiUrl: apiService.getChartValue,
//       payload: obj,
//     };
//     setloader_icon(true);
//     var resp = await postMethod(data);
//     setloader_icon(false);
//     if (resp.status == true) {
//       setchartdata(resp.data);
//     } else {
//       setchartdata([
//         { Balance: 0, Date: 0 },
//         { Balance: 0, Date: 0 },
//         { Balance: 0, Date: 0 },
//         { Balance: 0, Date: 0 },
//         { Balance: 0, Date: 0 },
//       ]);
//     }
//   };

//   const navbar = (value) => {
//     if (value == "deposit") {
//       navigate("/deposit");
//     } else if (value == "withdraw") {
//       navigate("/Withdraw");
//     }
//   };

//   return (
//     <div className="light_dashboard">
//       <main className="main-content tradepage-bg  bg-cover onlywhitee new_login_bb">
//         <Account_Header />
//         {pageLoader == true ? (
//           <Grid item xs={12} sm={12} md={8} lg={12} xl={12}>
//             <div className="loading">
//               <i className="fa-solid fa-spinner fa-spin-pulse "></i>
//             </div>
//           </Grid>
//         ) : (
//           <div className="class-padding">
//             <p className="dashboard_title">Dashboard</p>
//             <Grid
//               container
//               spacing={2}
//               justifyContent={"center"}
//               marginTop={"20px"}
//             >
//               {/* Item for xs (extra small) screens */}
//               <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
//                 <div className="Card_dashboard mb-4">
//                   <div className="row justify-content-between">
//                     <div className="toplable col-lg-4 ">
//                       <p>Portfolio Value</p>
//                       <h2>
//                         {currency_Value == "INR" ? "₹" : "$"}{" "}
//                         {parseFloat(totalINRPrice && totalINRPrice).toFixed(2)}{" "}
//                         <span>INR</span>
//                       </h2>
//                     </div>
//                     <div className="toplable label_clr col-lg-5">
//                       <div className="d-flex flex-row justify-around tabs_collection">
//                         <span
//                           onClick={() => prediction("")}
//                           style={{ cursor: "pointer" }}
//                           className={actives == "" || undefined ? "active" : ""}
//                         >
//                           1 D
//                         </span>
//                         <span
//                           onClick={() => prediction("day")}
//                           style={{ cursor: "pointer" }}
//                           className={actives == "day" ? "active" : ""}
//                         >
//                           1 W
//                         </span>
//                         <span
//                           onClick={() => prediction("month")}
//                           style={{ cursor: "pointer" }}
//                           className={actives == "month" ? "active" : ""}
//                         >
//                           1 M
//                         </span>
//                         <span
//                           onClick={() => prediction("month3")}
//                           style={{ cursor: "pointer" }}
//                           className={actives == "month3" ? "active" : ""}
//                         >
//                           3 M
//                         </span>
//                         <span
//                           onClick={() => prediction("year")}
//                           style={{ cursor: "pointer" }}
//                           className={actives == "year" ? "active" : ""}
//                         >
//                           1 Y
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                   {loader_icon == false ? (
//                     <LineChart
//                       width={800}
//                       height={365}
//                       style={{ cursor: "poiter" }}
//                       data={chartdataref.current}
//                     >
//                       <XAxis dataKey="name" />
//                       <YAxis />
//                       <Tooltip />
//                       {/* <CartesianGrid stroke="" /> */}
//                       <Line
//                         type="monotone"
//                         dataKey="Date"
//                         stroke="#4F41A4"
//                         activeDot={{ r: 4 }}
//                       />
//                       <Legend />
//                       <Line
//                         type="monostone"
//                         dataKey="Balance"
//                         stroke="#4F41A4"
//                       />
//                     </LineChart>
//                   ) : (
//                     <i className="fa-solid fa-spinner fa-spin chart_loader"></i>
//                   )}
//                 </div>
//               </Grid>
//               <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
//                 <div className="Card_dashboard mb-4">
//                   <p>
//                     <span>Portfolio Value</span>{" "}
//                     {currency_Value == "INR" ? "₹" : "$"}{" "}
//                     {parseFloat(totalINRPrice && totalINRPrice).toFixed(2)}{" "}
//                   </p>
//                 </div>
//                 <div className="Card_dashboard mb-4">
//                   <p className="mb-3">
//                     <span>Wallet balance</span>{" "}
//                     {currency_Value == "INR" ? "₹" : "$"}{" "}
//                     {AvailablePrice.toFixed(2)}
//                   </p>
//                   <div className="button_footer">
//                     <Button onClick={() => navbar("deposit")}>Deposit</Button>
//                     <Button onClick={() => navbar("withdraw")}>Withdraw</Button>
//                   </div>
//                 </div>
//                 <div className="Card_dashboard">
//                   <p>
//                     <span>In Order Balance</span>{" "}
//                     {currency_Value == "INR" ? "₹" : "$"}{" "}
//                     {inorderPrice.toFixed(2)}
//                   </p>
//                 </div>
//               </Grid>
            
//                 <div className="search_bar dash_board_search_box">
//                   <i className="ri-search-line" onClick={() => searchWalletList()}></i>
//                   <input
//                     type="text"
//                     placeholder="Search"
//                     onChange={(e) => setsearch(e.target.value)}
//                   />
//                 </div>
//               <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
//                 <div className="table_responsive">
//                   <div className="table_section">
//                     <div className="custom-table">
//                       <div className="table-row header dashboard_2">
//                         <div className="table-cell">Currency</div>
//                         <div className="table-cell">On Orders</div>

//                         <div className="table-cell">Available Balance</div>
//                         {/* <div className="table-cell">Launchpad Balance</div> */}
//                         <div className="table-cell">Total Balance</div>
//                       </div>

//                       {balanceDetails.length > 0 ? (
//                         balanceDetails.map((item, i) => {
//                           return (
//                             <div className="table-row border_table_row dashboard_">
//                               <div className="table-cell  asdfas">
//                                 <div className="data_inner flex_image_coloe">
//                                   <img src={item.currencyImage} />
//                                   {item.currencysymbol}{" "}
//                                   <small className="marging_button">
//                                     {item.currencyName}
//                                   </small>
//                                 </div>
//                               </div>
//                               <div className="table-cell advb">
//                                 <div className="content_section">
//                                   <h3>
//                                     {parseFloat(item.holdAmount).toFixed(8)}{" "}
//                                     {item.currencysymbol}{" "}
//                                   </h3>
//                                   <p>
//                                     {currency_Value == "INR" ? "₹" : "$"}{" "}
//                                     {parseFloat(item.estimatedUSDThold).toFixed(
//                                       2
//                                     )}{" "}
//                                   </p>
//                                 </div>
//                               </div>
//                               <div className="table-cell">
//                                 <div className="content_section">
//                                   <h3>
//                                     {parseFloat(item.currencyBalance).toFixed(
//                                       8
//                                     )}{" "}
//                                     {item.currencysymbol}
//                                   </h3>
//                                   <p>
//                                     {currency_Value == "INR" ? "₹" : "$"}{" "}
//                                     {parseFloat(
//                                       item.estimatedUSDTbalance
//                                     ).toFixed(2)}{" "}
//                                   </p>
//                                 </div>
//                               </div>
//                               <div className="table-cell">
//                                 <div className="content_section">
//                                   <h3>
//                                     {" "}
//                                     {parseFloat(
//                                       item.currencyBalance +
//                                         parseFloat(item.holdAmount)
//                                     ).toFixed(8)}{" "}
//                                     {item.currencysymbol}{" "}
//                                   </h3>
//                                   <p>
//                                     {currency_Value == "INR" ? "₹" : "$"}{" "}
//                                     {parseFloat(
//                                       item.estimatedUSDTtotal
//                                     ).toFixed(2)}{" "}
//                                   </p>
//                                 </div>
//                               </div>
//                               {/* <div className="table-cell">
//                               <div className="content_section">
//                                 <h3>
//                                   {item.launchPadAmount != undefined &&
//                                     item.launchPadAmount != null &&
//                                     item.launchPadAmount != ""
//                                     ? parseFloat(item.launchPadAmount).toFixed(
//                                       8
//                                     )
//                                     : (0).toFixed(8)}{" "}
//                                   {item.currencysymbol}{" "}
//                                 </h3>
//                                 <p>
//                                   ₹
//                                   {parseFloat(item.estimatedUSDTtotal).toFixed(
//                                     2
//                                   )}{" "}
//                                 </p>
//                               </div>
//                             </div> */}
//                             </div>
//                           );
//                         })
//                       ) : (
//                         <div className="table-cell justify-center">
//                           <div className="content_section">
//                             <p>No data found</p>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                     <Pagination
//                       itemClass="page-item"
//                       linkClass="page-link"
//                       activePage={currentPage}
//                       itemsCountPerPage={recordPerPage}
//                       totalItemsCount={total}
//                       pageRangeDisplayed={pageRange}
//                       onChange={handlePageChange}
//                     />
//                   </div>
//                 </div>
//               </Grid>
//             </Grid>
//             {/* Your other components and content */}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }
// function customMouseOver(e) {
//   console.log(e, "=======");
//   return (
//     <div className="customMouseOver">
//       <h1>e hold the line data in payload element</h1>
//     </div>
//   );
// }

// export default Home;