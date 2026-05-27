import React, { useState, useEffect } from "react";
import Header from "../../Newcomponent/Header";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiService from "../../../core/service/detail";
import { postMethod } from "../../../core/service/common.api";
import Footernew from "../../footer_buttom";
import { Grid, Paper, Container } from "@mui/material";
import { setAuthorization } from "../../../core/service/axios";
import { Button } from "semantic-ui-react";
import moment from "moment";
function Home() {
  const options = ["one", "two", "three"];

  useEffect(() => {
    var order_Id = window.location.href.split("/").pop();
    console.log(order_Id, "order_Id");
    getconfirmorderDetails();
  }, []);
  const [data, setData] = useState("");
  const [loader, setLoader] = useState(false);
  const getconfirmorderDetails = async () => {
    var order_Id = window.location.href.split("/").pop();
    var obj = {
      orderId: order_Id,
    };
    setLoader(true);
    var data = {
      apiUrl: apiService.getconfirmorderDetails,
      payload: obj,
    };
    var resp = await postMethod(data);
    setLoader(false);
    console.log(resp.Message, "-=-=-get p2p order=-=-");
    if (resp) {
      console.log(resp.data, "-0-0-0-0-0-0-0-0-0-0-");
      setData(resp.data);
    } else {
    }
  };
  let navigate = useNavigate();

  const copy_to_clipboard = async (type, text) => {
    navigator.clipboard.writeText(text);
    toast.success(type + " copied successfully");
  };
  const pageChange = async () => {
    navigate("/p2p");
  };
  return (
    <div className="">
      <main className="main-content tradepage-bg  bg-cover onlywhitee new_login_bb">
        <Header />
        {loader == true ? (
          <Grid item xs={12} sm={12} md={8} lg={12} xl={12}>
            <div className="loading">
              <i className="fa-solid fa-spinner fa-spin-pulse "></i>
            </div>
          </Grid>
        ) : (
          <Container maxWidth="xl">
            <Grid
              container
              spacing={2}
              justifyContent={"center"}
              marginTop={"20px"}
            >
              {/* Item for xs (extra small) screens */}
              <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
                <div className="card_logoki pading_cardd">
                  <div className="form_content">
                    <h1 className="mb-2 aling_flexx">
                      {" "}
                      <img
                        src={new URL("../../../img/New_images/sucess_2.png", import.meta.url).href}
                        className="img-fluid "
                      />
                      Order completed!
                    </h1>
                  </div>
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
                        <div className="form_login_section p-0 mt-4">
                          <div className="form register_login p-0 form_pading_s">
                            <form className="form_pading_s bg_trans pb-0">
                              <div className="form-group bg_tra_cades flex_confirm_p2p">
                                <div className="section_class_grs">
                                  <label>Quantity:</label>
                                  <h4 className=" ">
                                    {data.quantity} {data.firstCurrency}
                                  </h4>
                                </div>
                                <div className="section_class_grs">
                                  <label>Amount:</label>
                                  <h4 className="text_color_imhd">
                                    {data.amount}{" "}
                                    {data.secondCurrency}
                                  </h4>
                                </div>
                                <div className="section_class_grs">
                                  <label>Total:</label>
                                  <h4 className="text_color_imhd">
                                    {" "}
                                    {parseFloat(data.price).toFixed(2)}{" "}
                                    {data.secondCurrency}
                                  </h4>
                                </div>
                              </div>
                            </form>
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
                                <form className="form_pading_s bg_trans">
                                  <div className="color_border ne_bg_txt">
                                    <div className="p-4 pt-3 pb-3">
                                      <div className="form-group flex_start_sae">
                                        <p className="preview">
                                          Order Number:{" "}
                                          <span>
                                            {data==""?"":data.OrderNumber.slice(-6)}
                                            <i
                                              className="ri-file-copy-line"
                                              onClick={() =>
                                                copy_to_clipboard(
                                                  "OrderNumber",
                                                  data.OrderNumber
                                                )
                                              }
                                            ></i>
                                          </span>
                                        </p>
                                      </div>
                                      <div className="form-group flex_start_sae ">
                                        <p className="preview">
                                          Created Time:
                                          <span>
                                            {moment(data.createdTime).format(
                                              "DD/MM/YYYY"
                                            )}
                                          </span>
                                        </p>
                                      </div>
                                      <div className="form-group flex_start_sae ">
                                        <p className="preview">
                                          Seller’s Name:
                                          <span>{data.SellerName}</span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </form>
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
                                <form className="form_pading_s bg_trans">
                                  <div className="color_border ne_bg_txt">
                                    <div className="devision_clas">
                                      <p className="preview">
                                        Payment Method:{" "}
                                        <span>{data.paymentMethod}</span>
                                      </p>
                                    </div>
                                    <div className="car_tredtsdee">
                                      <div className="form-group flex_start_sae">
                                        <p className="preview">
                                          Name:{" "}
                                          <span>
                                            {data.buyerName}{" "}
                                            <i className="ri-file-copy-line"></i>
                                          </span>
                                        </p>
                                      </div>
                                      {/* <div className="form-group flex_start_sae ">
                                   <p className="preview">
                                     UPI ID:
                                     <span>
                                       vikramrao@paytm
                                       <i className="ri-file-copy-line"></i>
                                     </span>
                                   </p>
                                 </div> */}
                                    </div>
                                  </div>
                                </form>
                              </Grid>
                            </Grid>
                          </div>
                          <Grid
                            container
                            spacing={2}
                            justifyContent={"start"}
                            marginTop={"30px"}
                            className="pt-0"
                          >
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={8}
                              xl={8}
                              className="pt-0"
                            ></Grid>
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={4}
                              xl={4}
                              paddingRight={"30px"}
                              className="pt-0 pr-4"
                            >
                              <div className="aling_caseds">
                                <button
                                  type="button"
                                  className="btn btn-primary w-100"
                                  onClick={pageChange}
                                >
                                  Done
                                </button>
                              </div>
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </div>
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
