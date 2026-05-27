import React, { useEffect } from "react";
import Header from "../../Newcomponent/Header";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiService from "../../../core/service/detail";
import { getMethod, postMethod } from "../../../core/service/common.api";
import Footernew from "../../footer_buttom";
import { Grid, Paper, Container } from "@mui/material";
import { getAuthToken } from "../../../core/lib/localStorage";
import { Button } from "semantic-ui-react";
import { Dropdown } from "semantic-ui-react";
import useState from "react-usestateref";

function Home() {
  const friendOptions = [
    {
      key: "Jenny Hess",
      text: "Jenny Hess",
      value: "Jenny Hess",
    },
    {
      key: "Elliot Fu",
      text: "Elliot Fu",
      value: "Elliot Fu",
    },
    {
      key: "Stevie Feliciano",
      text: "Stevie Feliciano",
      value: "Stevie Feliciano",
    },
    {
      key: "Christian",
      text: "Christian",
      value: "Christian",
    },
    {
      key: "Matt",
      text: "Matt",
      value: "Matt",
    },
    {
      key: "Justen Kitsune",
      text: "Justen Kitsune",
      value: "Justen Kitsune",
    },
  ];
  const options = ["one", "two", "three"];

  const p2pFormValue = {
    qty: "",
    total: "",
  };

  const [p2pformValue, setp2pFormValue, p2pformValueref] =
    useState(p2pFormValue);

  const {qty, total} = p2pformValue;
  const [p2pbalance, setp2pbalance, p2pbalanceref] = useState("");
  const [p2pData, setp2pData, p2pDataref] = useState("");
  const [loginTrue, setloginTrue, loginTrueref] = useState(false);
  let navigate = useNavigate();
  const [profileData, setprofileData, profileDataref] = useState(null);
  const [loader,setLoader]=useState(false)

  useEffect(() => {
    let user_token = getAuthToken();
    if (user_token != "" && user_token != undefined && user_token != null) {
      setloginTrue(true);
      getProfile();
      getp2pOrder();
    } else {
      setloginTrue(false);
    }
  }, []);

  const getProfile = async () => {
    try {
      var data = {
        apiUrl: apiService.getUserDetails,
      };
      var resp = await getMethod(data);
      if (resp.status) {
        console.log(resp.data,"datadata-0-0-0-0-0-0-0-0-0-0-")
        setprofileData(resp.data);
        console.log(profileDataref.current)
        console.log(profileDataref.current.profile_image)
      }
    } catch (error) {}
  };

  const getp2pOrder = async () => {
    var urls = window.location.href;
    var orderId = urls.split("confirm-order/")[1];
    console.log("order Id===",orderId);
    var onj = {
      orderId: orderId,
    };
    var data = {
      apiUrl: apiService.viewOrder_p2p,
      payload: onj,
    };
    setLoader(true)
    var resp = await postMethod(data);
    console.log(resp.Message, "-=-=-get p2p order=-=-");
    setLoader(false)
    if (resp.status == true) {
      var data = resp.Message;
      setp2pData(data);
      setp2pbalance(resp.p2pbalance);
    }
  };

  const confirm_handleChange = async (e) => {
    console.log("e====", e);
    e.preventDefault();
    const {name, value} = e.target;
    let p2pformData = {...p2pformValue, ...{[name]: value}};
    setp2pFormValue(p2pformData);
    console.log("p2pformValueref.current.qty===", p2pformValueref.current.qty);
    console.log("price===",p2pDataref.current.orderPrice)
    if (p2pformValueref.current.qty > 0) {
      var order_qty = p2pformValueref.current.qty;
      var min_qty = p2pDataref.current.fromLimit;
      var max_qty = p2pDataref.current.toLimit;
      var available = +p2pDataref.current.available_qty;
      console.log("min_qty===", min_qty);
      console.log("max_qty===", max_qty);
      console.log("order_qty===", order_qty);
      // if (
      //   order_qty < p2pDataref.current.fromLimit ||
      //   order_qty > p2pDataref.current.toLimit
      // ) {
      //   toast.error(
      //     "Please enter quantity between " + min_qty + " and " + max_qty + ""
      //   );
      // } else {
      //   p2pformValueref.current.total = parseFloat(
      //     order_qty * p2pDataref.current.orderPrice
      //   ).toFixed(2);
      //   console.log("p2pformData====", p2pformValueref.current);
      // }

      if (
        order_qty > available
      ) {
        toast.error(
          "Please enter quantity less than or equal to " + order_qty + ""
        );
      } else {
        p2pformValueref.current.total = parseFloat(
          order_qty * p2pDataref.current.orderPrice
        ).toFixed(2);
        console.log("p2pformData====", p2pformValueref.current);
      }
    } else {
      toast.error("Please enter valid quantity");
    }
  };

  
  const confirm_order_buy = async () => {
    try {
      var obj = {};
      obj.qty = p2pformValueref.current.qty;
      obj.total = p2pformValueref.current.total;
      obj.orderId = p2pDataref.current.orderId;
      obj.p2porderId = p2pDataref.current._id;
      obj.type = "buy";
      
      if (obj.qty != "" || obj.total != "") {
        var data = {
          apiUrl: apiService.p2p_confirm_order,
          payload: obj,
        };
        var resp = await postMethod(data);
        if (resp.status) {
          toast.success(resp.Message);
          //navigate(resp.link);
          window.location.href = resp.link;
        } else {
          toast.error(resp.Message);
        }
      } else {
        toast.error("Please enter quantity");
      }
    } catch (error) {}
  };

  const confirm_order_sell = async () => {
    try {
      var obj = {};
      obj.qty = p2pformValueref.current.qty;
      obj.total = p2pformValueref.current.total;
      obj.orderId = p2pDataref.current.orderId;
      obj.p2porderId = p2pDataref.current._id;
      obj.type = "sell";

      if (obj.qty != "" || obj.total != "") {
        var data = {
          apiUrl: apiService.p2p_confirm_sellorder,
          payload: obj,
        };
        var resp = await postMethod(data);
        if (resp.status) {
          toast.success(resp.Message);
          //navigate(resp.link);
          window.location.href = resp.link;
        } else {
          toast.error(resp.Message);
        }
      } else {
        toast.error("Please enter quantity");
      }
    } catch (error) {}
  };

  const navback = async () => {
    navigate("/p2p");
  };

  const set_max = async (e) => {
    e.preventDefault();
    var available_qty = (p2pDataref.current != null) ? +p2pDataref.current.available_qty : 0;
    var total_value = parseFloat(available_qty * p2pDataref.current.orderPrice).toFixed(2);
    console.log("call max==");
    var p2pFormValue = {
      qty: parseFloat(available_qty).toFixed(8),
      total: total_value,
    };
    setp2pFormValue(p2pFormValue);
    
    console.log("call max 111==", p2pformValueref.current.qty);
  };

  return (
    <div className="">
      <main className="main-content tradepage-bg  bg-cover onlywhitee new_login_bb">
        <Header />
        {loader==true ?
         <Grid item xs={12} sm={12} md={8} lg={12} xl={12}>
         <div className="loading">
           <i className="fa-solid fa-spinner fa-spin-pulse "></i>
         </div>
       </Grid>
       :
        <Container maxWidth="xl">
          <Grid
            container
            spacing={2}
            justifyContent={"center"}
            marginTop={"20px"}
          >
            {/* Item for xs (extra small) screens */}
            <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
              <div className="card_logoki pading_cardd">
                <Grid
                  container
                  spacing={2}
                  justifyContent={"start"}
                  marginTop={"20px"}
                >
                  {/* Item for xs (extra small) screens */}
                  <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                    <div className="form_content">
                      <Button className="back_butn" onClick={() => navback()}>
                        <i className="ri-arrow-left-line"  ></i> Back
                      </Button>
                      <h1 className="mb-4">Fill in the Details</h1>
                    </div>
                  </Grid>
                </Grid>
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
                        lg={6}
                        xl={6}
                        className="pt-0"
                      >
                        <div className="step-5 ">
                          <div className="form_login_section p-0 mt-4">
                            <div className="form register_login p-0">
                              <form className="form_pading_s amt_detail">
                                <div className="form-group">
                                  <label> Amount</label>
                                  <div className="postion_reletitt">
                                    <input
                                      type="number"
                                      className="form-control"
                                      id="exampleInputPassword1"
                                      placeholder=" Amount"
                                      name="qty"
                                      value={qty}
                                      onChange={confirm_handleChange}
                                      min="0"
                                    />
                                    <div className="input-group-addon max-btc-btn">
                                      
                                    <span className="text-success" onClick={set_max}>Max</span> <i className="font_normal">{p2pDataref.current.firstCurrency}</i>
                                    </div>

                                    <div className="line_border"></div>
                                  </div>
                                </div>
                                <div className="form-group flex_start_sae">
                                  <p className="preview">
                                    Price:<span>{p2pDataref.current.price}</span>
                                  </p>
                                </div>
                                <div className="form-group flex_start_sae">
                                  <p className="preview">
                                    Amount: <span>{parseFloat(p2pDataref.current.quantity).toFixed(8)}</span>
                                  </p>
                                </div>

                                <div className="form-group flex_start_sae">
                                  <p className="preview">
                                    Total: <span>{total}</span>
                                  </p>
                                </div>

                                {/* <div className="form-group flex_start_sae">
                                  <p className="preview">
                                    Payment Method: <span>{p2pDataref.current && p2pDataref.current.payment_method.join(",")} </span>
                                  </p>
                                </div> */}

                                {/* <div className="line_border"></div>
                                <div className="form-group mt-3">
                                  <label>Payment Method</label>
                                  <Dropdown
                                    placeholder="Select Payment Method"
                                    fluid
                                    selection
                                    options={friendOptions}
                                    className="text_memu"
                                  />
                                  <div>
                                    {emailValidate == true ? (
                                      <p className="text-danger">
                                        {" "}
                                        {validationnErr.email}{" "}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div> */}
                              </form>
                              <div className="form register_login  marhing_pading pl-0 paddinte_ledy_o pt-0">
                                <div className="aling-buttons">
                                <div className="aling_caseds">
                                  <button
                                    type="button"
                                    className="btn btn-primary w-100 burdas_buttnd cancel_burdas m-0"
                                    //onClick={() => formSubmit("step2")}
                                    onClick={() => navback()}
                                  >
                                    Cancel
                                  </button>
                                  { p2pDataref.current.ordertype == "Buy" ? (
                                    <button
                                    type="button"
                                    className="btn btn-primary w-100 m-0"
                                    onClick={confirm_order_buy}
                                  >
                                    {p2pDataref.current.ordertype} {p2pDataref.current.firstCurrency}
                                  </button>
                                  ) : (
                                    <button
                                    type="button"
                                    className="btn btn-primary w-100 m-0"
                                    onClick={confirm_order_sell}
                                  >
                                    {p2pDataref.current.ordertype} {p2pDataref.current.firstCurrency}
                                  </button>
                                  )}
                                  
                                </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={6}
                        xl={6}
                        className="pt-0"
                      >
                        <div className="step-5  mt-4 pt-1">
                          <div className="form_login_section p-0">
                            <div className="form register_login p-0">
                              <form className="form_pading_s detail_profile">
                                <div className="pading_bott_mae">
                                  <div className="data_inner flex_image_coloe w-fit justify-content-between">
                                    <div className="profile_image">
                                      <img
                                           src={p2pDataref.current.profile_image==null||p2pDataref.current.profile_image==undefined||p2pDataref.current.profile_image==""?
                                           require("../../../img/New_images/profile_img.png"):p2pDataref.current.profile_image}
                                        className="img-fluid"
                                      />
                                      <div className="name_details">
                                        <h5>{p2pDataref.current.username}</h5>
                                        <p className="p-0 text-left">
                                          {p2pDataref.current.orders_count} TRADES | {p2pDataref.current.rating}%
                                        </p>
                                      </div>
                                    </div>
                                    {/* <div className="button_cirle">
                                      <a href="">
                                        <i className="ri-message-2-fill"></i>
                                      </a>
                                    </div> */}
                                  </div>
                                </div>

                                <div className="form-group flex_start_sae">
                                  <p className="preview">
                                    Price:<span>{p2pDataref.current.price}</span>
                                  </p>
                                </div>
                                <div className="form-group flex_start_sae">
                                  <p className="preview">
                                    Limit:<span> {p2pDataref.current.fromLimit} {" "}{p2pDataref.current.firstCurrency}- {p2pDataref.current.toLimit} {p2pDataref.current.firstCurrency}</span>
                                  </p>
                                </div>

                                <div className="form-group flex_start_sae">
                                  <p className="preview">
                                    Crypto Amount:{" "}
                                    <span className="color_sec">
                                    {parseFloat(p2pDataref.current.quantity).toFixed(5)}
                                    </span>
                                  </p>
                                </div>
                                <div className="form-group flex_start_sae">
                                  <p className="preview">
                                    Payment Method:
                                    <span className="color_sec">
                                    {p2pDataref.current && p2pDataref.current.payment_method.join(",")} (India)
                                    </span>
                                  </p>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
          {/* Your other components and content */}
        </Container>
}
      </main>
    </div>
  );
}

export default Home;
