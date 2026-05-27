import React, {useEffect} from "react";
import Header from "./Newcomponent/Header";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import apiService from "../core/service/detail";
import {postMethod} from "../core/service/common.api";
import Footernew from "./footer_buttom";
import {Grid, Paper, Container} from "@mui/material";
import {setAuthorization} from "../core/service/axios";
import {Button} from "semantic-ui-react";
import {Dropdown} from "semantic-ui-react";
import useState from "react-usestateref";
function Home() {
  //========================================================================//

  const navigate = useNavigate();

  useEffect(() => {
    var token = localStorage.getItem("user_token");
    if (!token) {
      navigate("/login");
    } else {
      getAddress();
    }
  }, []);
  const [selectedOption, setselectedOption] = useState({});
  const [respnetwork, setrespnetwork] = useState("");
  const [respqrcode, setrespqrcode] = useState("");
  const [respaddress, setrespaddress] = useState("");

  const handleChangedrop = async (e, option) => {
    setselectedOption(option.value);
    toast(option.key);
    setrespnetwork(option.value);
    var obj = {
      currency: option.value,
    };
    var data = {
      apiUrl: apiService.generateAddress,
      payload: obj,
    };

    var resp = await postMethod(data);
    setrespnetwork(resp.Message.network);
    setrespqrcode(resp.Message.qrcode);
    setrespaddress(resp.Message.address);
  };

  const [addressDetails, setaddressDetails] = useState("");
  const [twoOption, settwoOption] = useState([]);

  const getAddress = async () => {
    var data = {
      apiUrl: apiService.getCurrency,
      payload: {currency: "USDT"},
    };
    var resp = await postMethod(data);
    console.log(resp.data, "=-=-=-resp.Message");
    setaddressDetails(resp.data);
    for (let i = 0; i < resp.data.length; i++) {
      const element = resp.data[i];
      console.log(element.currencyName, "=-=-=-=-=-element.currencyName");
      // {key: "e", text: "ERC20", value: "ERC20"}
      var obj = {
        key: element.currencySymbol,
        text: element.currencyName + " "+"(" + element.currencySymbol + ")",
        value: element.currencySymbol,
      };
      twoOption.push(obj);
    }
  };

  const copy = (content) => {
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(content);
      toast.success("Address copied successfully");
      // console.log("sucess");
    } else {
      // console.log("error");
    }
  };

  const back_function = () => {
    navigate("/Dashboardpage");
  };
  return (
    <div className="">
      <main className="main-content tradepage-bg  bg-cover onlywhitee new_login_bb">
        <Header />
        <Container maxWidth="xl" className="container-lg">
          <Grid container spacing={2} justifyContent={"center"}>
            {/* Item for xs (extra small) screens */}
            <Grid item xs={12} sm={12} md={8} lg={6} xl={5}>
              <div className="card_logoki pading_cardd">
                <div className="step-1">
                  <div className="form_content">
                    <Button onClick={back_function} className="back_butn">
                      <i
                        // onClick={() => back_function("step4")}
                        className="ri-arrow-left-line"
                      ></i>{" "}
                      Back
                    </Button>
                  </div>
                  <div className="form_content">
                    <h1 className="mb-0">Deposit</h1>
                    <p className="text_newsd mb-4">
                      Deposit founds into your wallet using this QR code or
                      address
                    </p>
                  </div>
                  <div className="form_login_section p-0">
                    <div className="form register_login p-0">
                      <form className="form_pading_s">
                        <div className="form-group">
                          <label>Crypto Currency</label>
                          <Dropdown
                            placeholder="Select Currency"
                            fluid
                            selection
                            className="text_memu"
                            value={selectedOption}
                            onChange={handleChangedrop}
                            options={twoOption}
                            search={true}
                          />
                        </div>
                        {respaddress == "" ? (
                          ""
                        ) : (
                          <div className="form-group">
                            <label>Address</label>
                            <div className="postion_reletitt">
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputPassword1"
                                value={respaddress.substring(0, 20) + "...."}
                                placeholder="Address"
                              />
                              <div className="input-group-addon">
                                <i
                                  className="ri-file-copy-line"
                                  onClick={() => copy(respaddress)}
                                ></i>
                              </div>
                            </div>
                          </div>
                        )}
                        {respnetwork == "" ? (
                          ""
                        ) : (
                          <div className="form-group">
                            <label>Network</label>
                            <div className="postion_reletitt">
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputPassword1"
                                value={respnetwork}
                                placeholder="Network"
                              />
                            </div>
                          </div>
                        )}
                        {respqrcode == "" ? (
                          ""
                        ) : (
                          <div className="qr_background">
                            <img
                              className="clg-6 mx-auto w-40 qr_img"
                              src={respqrcode}
                            />
                          </div>
                        )}
                      </form>
                      {/* <div className="button_launch">
                        <button
                          // onClick={cancel_function}
                          type="button"
                          className="btn btn-second w-100"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary w-100"
                          // onClick={() => nexttabfun("step1")}
                        >
                          Submit
                        </button>
                      </div> */}
                    </div>
                  </div>
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
