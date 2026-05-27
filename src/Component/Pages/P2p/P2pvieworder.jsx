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
  const [p2pData, setp2pData, p2pDataref] = useState("");
  const [profileDatas, setprofileData, profileDataref] = useState("");
  const [orderType, setorderType, orderTyperef] = useState("");
  const [loginTrue, setloginTrue, loginTrueref] = useState(false);
  const [loader,setLoader]=useState(false)
  let navigate = useNavigate();

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
        setprofileData(resp.data);
        console.log(profileDataref.current.profile_image,"p2pDataref.current.profile_image")
      }
    } catch (error) {}
  };

  const getp2pOrder = async () => {
    var urls = window.location.href;
    var orderId = urls.split("view-order/")[1];
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
    if (resp) {
      var data = resp.Message;
      setp2pData(data);
      if (resp.Message.ordertype == "Buy") {
        // if (
        //   profileDataref.current._id ==
        //   resp.Message.user_id
        // ) {
        //   setorderType("Sell");
        // } else {
        //   setorderType("Buy");
        // }
        setorderType("Sell");
      } else {
        // if (
        //   profileDataref.current._id ==
        //   resp.Message.user_id
        // ) {
        //   setorderType("Buy");
        // } else {
        //   setorderType("Sell");
        // }
        setorderType("Buy");
      }
    }
  };const handleChange_buycancel = async (e) => {
    console.log("e====", e);
    e.preventDefault();
    console.log("e.target===", e.target.innerText);
    buyer_cancel();
  };

  const handleChange_sellcancel = async (e) => {
    console.log("e====", e);
    e.preventDefault();
    console.log("e.target===", e.target.innerText);
    seller_cancel();
  };
  const buyer_cancel = async (status) => {
    try {
      var obj = {
        orderId: window.location.href.split("/").pop(),
        status: status,
      };
      var data = {
        apiUrl: apiService.buyer_cancel,
        payload: obj,
      };
      var resp = await postMethod(data);
      if (resp.status) {
        toast.success(resp.Message);
        getp2pOrder();
        navigate("/p2p");
      } else {
        toast.error(resp.Message);
      }
    } catch (error) {}
  };

  const seller_cancel = async (status) => {
    try {
      var obj = {
        orderId: window.location.href.split("/").pop(),
        status: status,
      };
      var data = {
        apiUrl: apiService.seller_cancel,
        payload: obj,
      };
      var resp = await postMethod(data);
      if (resp.status) {
        toast.success(resp.Message);
        getp2pOrder();
        navigate("/p2p");
      } else {
        toast.error(resp.Message);
      }
    } catch (error) {}
  };

  const navigatepage = async (page) => {
    navigate(page);
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
                    <Button className="back_butn" onClick={() => navigatepage("/p2p")}>
                      <i className="ri-arrow-left-line"></i> Back
                    </Button>
                    <h1 className="mb-4">{orderTyperef.current}{" "}{p2pDataref.current.firstCurrency}</h1>
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
                            <form className="form_pading_s">
                              <div className="form-group flex_start_sae">
                                <p className="preview">
                                  Price:<span>{p2pDataref.current.price}</span>
                                </p>
                              </div>
                              <div className="form-group flex_start_sae">
                                <p className="preview">
                                  Amount: <span>{p2pDataref.current.quantity}</span>
                                </p>
                              </div>
                            </form>
                            <div className="form register_login  marhing_pading pl-0 paddinte_ledy_o pt-0">
                              <div className="aling_caseds">
                              {orderTyperef.current == "Sell" &&
                                profileDataref.current._id ==
                                  p2pDataref.current.user_id &&
                                (p2pDataref.current.status != "filled" && p2pDataref.current.status != "cancelled")  ? (
                                <button
                                  type="button"
                                  className="btn btn-primary w-100 m-0"
                                  onClick={handleChange_sellcancel}
                                >
                                  Cancel
                                </button>
                                ) : ("")}

                                {orderTyperef.current == "Buy" &&
                                profileDataref.current._id ==
                                  p2pDataref.current.user_id &&
                                (p2pDataref.current.status != "filled" && p2pDataref.current.status != "cancelled")  ? (
                                  <button
                                  type="button"
                                  className="btn btn-primary w-100 m-0"
                                  onClick={handleChange_buycancel}>
                                  Cancel
                                </button>
                                ) : ("")}
                                
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
                            <form className="form_pading_s">
                              <div className="pading_bott_mae">
                              {p2pDataref.current != null ? (
                                <div className="data_inner flex_image_coloe w-fit justify-content-between">
                                  <div className="profile_image">
                                    <img
                                      src={profileDataref.current.profile_image==null||profileDataref.current.profile_image==undefined||profileDataref.current.profile_image==""?
                                      require("../../../img/New_images/profile_img.png"):profileDataref.current.profile_image}
                                      // src={new URL("../../../img/New_images/profile_img.png", import.meta.url).href}
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
                                 ): ("")}
                              </div>

                              <div className="form-group flex_start_sae">
                                <p className="preview">
                                  Price:<span>{p2pDataref.current.price}</span>
                                </p>
                              </div>
                              <div className="form-group flex_start_sae">
                                <p className="preview">
                                  Limit:<span> {p2pDataref.current.fromLimit} - {p2pDataref.current.toLimit} {p2pDataref.current.firstCurrency}</span>
                                </p>
                              </div>

                              <div className="form-group flex_start_sae">
                                <p className="preview">
                                  Crypto Amount:{" "}
                                  <span className="color_sec">
                                  {p2pDataref.current.quantity}
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
