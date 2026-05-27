import React, { useState, useEffect } from "react";

import { Grid, Paper, Container } from "@mui/material";
import SidebarNew from "./Pages/Profile/SidebarNew";
import { toast } from "react-toastify";
// import socket from "../core/config/socketConnectivity";
import apiService from "../core/service/detail";
import { postMethod } from "../core/service/common.api";
import useStateref from "react-usestateref";
function Home() {
  const [id_proof, setid_proof] = useState("");
  const [id_proofone, setid_proofone] = useState("");
  const [id_prooftwo, setid_prooftwo] = useState("");
  const [id_proofthree, setid_proofthree] = useState("");
  const [loader, setloader] = useState(false);
  const [imgloader1, setimgloader1] = useState(false);
  const [imgloader2, setimgloader2] = useState(false);
  const [imgloader3, setimgloader3] = useState(false);
  const [url, seturl, urlref] = useStateref("");

  useEffect(() => {
    var currUrl = window.location.href;
    console.log(currUrl.split("?")[1], "=-=-=-=-=-currUrl");

    seturl(currUrl.split("?")[1]);
    checkKyc();
  }, []);

  const checkKyc = async () => {
    if (urlref.current != undefined && urlref.current != "") {
      var data = {
        apiUrl: apiService.getKycDeatils,
        payload: { userId: urlref.current },
      };
      var resp = await postMethod(data);
      if (resp.status == true) {
      }
    }
  };

  const imageUpload = (type, val) => {
    const fileExtension = val.name.split(".").at(-1);
    const fileSize = val.size;
    const fileName = val.name;
    console.log("fileExtension===", fileExtension);
    console.log("fileSize===", fileSize);
    console.log("fileName===", fileName);
    if (
      fileExtension != "png" &&
      fileExtension != "jpg" &&
      fileExtension != "jpeg"
    ) {
      toast.error("File does not support. You must use .png or .jpg or .jpeg ");
      return false;
    } else if (fileSize > 1000000) {
      toast.error("Please upload a file smaller than 1 MB");
      return false;
    } else {
      const data = new FormData();
      data.append("file", val);
      data.append("upload_preset", "sztbiwly");
      data.append("cloud_name", "taikonz-com");
      console.log("formdata===", data);
      if (type == "front") {
        setimgloader1(true);
      }else if (type == "back") {
        setimgloader2(true);
      } else if (type = "Pancard") {
        setimgloader3(true);
      }
      fetch("https://api.cloudinary.com/v1_1/taikonz-com/auto/upload", {
        method: "post",
        body: data,
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (type == "front") {
            setimgloader1(false);
            setid_proofone(data.secure_url);
          }else if (type == "back") {
            setimgloader2(false);
            setid_prooftwo(data.secure_url);
          }else if (type = "Pancard") {
            setimgloader3(false);
            setid_proofthree(data.secure_url);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const [pages, setpages] = useState(false);
  const formSubmit = async () => {
    if (id_proofone != "" && id_prooftwo != ""&&id_proofthree !="") {
      var data = {
        apiUrl: apiService.updateKycproof,
        payload: {
          proofone: id_proofone,
          prooftwo: id_prooftwo,
          proofthree: id_proofthree,
          userId: urlref.current,
        },
      };
      setloader(true);
      var resp = await postMethod(data);
      setloader(false);
      if (resp.status == true) {
        toast.success(resp.Message);
        setpages(true);
      }
    } else {
      toast.error("All field required");
    }
  };

  return (
    <div className="">
      <main className="main-content tradepage-bg  bg-cover onlywhitee new_login_bb">
        <Container maxWidth="lg" className="p-0">
          <Grid container justifyContent={"center"} className="p-0">
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
              <div className="mobile_taikonz_logo">
                <img src={new URL("../img/New_images/logo_dark.png", import.meta.url).href} />
              </div>
              <div className="card_logoki mobileapp p-5">
                <div className="step-5 ">
                  <div className="form_content">
                    <h1 className="mb-3 text-center">
                      KYC - Identity Verification
                    </h1>
                  </div>
                  {pages == false ? (
                    <div className="tab-content">
                      <div id="tFA" className="tab-pane fade in active show">
                        <div className=" p-0 mt-4">
                          <div className="mb-3">
                            <div className="row justify-content-center ">
                              <div className="col-lg-3 proof_text">
                                <h4
                                  className="sm:ml-4"
                                  style={{ color: "#fff" }}
                                >
                                  Proof front
                                </h4>
                                <div className="input_section_kyc mx-auto">
                                  {imgloader1 == true ? (
                                    <i
                                      className="fa fa-circle-o-notch fa-spin icon_loader"
                                      style={{ "font-size": "36px" }}
                                    ></i>
                                  ) : id_proofone == "" ? (
                                    <img
                                      src={new URL("../img/input_sectionimg.png", import.meta.url).href}
                                      className=""
                                    />
                                  ) : (
                                    <img src={id_proofone} className="" />
                                  )}
                                  <input
                                    type="file"
                                    name="image"
                                    onChange={(e) =>
                                      imageUpload("front", e.target.files[0])
                                    }
                                  />
                                </div>
                              </div>

                              <div className="col-lg-3 proof_text ">
                                <h4 style={{ color: "#fff" }}>Proof Back</h4>
                                <div className="input_section_kyc mx-auto">
                                  {imgloader2 == true ? (
                                    <i
                                      className="fa fa-circle-o-notch fa-spin icon_loader"
                                      style={{ "font-size": "36px" }}
                                    ></i>
                                  ) : id_prooftwo == "" ? (
                                    <img
                                      src={new URL("../img/input_sectionimg.png", import.meta.url).href}
                                      className=""
                                    />
                                  ) : (
                                    <img src={id_prooftwo} className="" />
                                  )}
                                  <input
                                    type="file"
                                    name="image"
                                    onChange={(e) =>
                                      imageUpload("back", e.target.files[0])
                                    }
                                  />
                                </div>
                              </div>

                              <div className="col-lg-3 proof_text ">
                                <h4 style={{ color: "#fff" }}> Pancard Proof</h4>
                                <div className="input_section_kyc mx-auto">
                                  {imgloader3 == true ? (
                                    <i
                                      className="fa fa-circle-o-notch fa-spin icon_loader"
                                      style={{ "font-size": "36px" }}
                                    ></i>
                                  ) : id_proofthree == "" ? (
                                    <img
                                      src={new URL("../img/input_sectionimg.png", import.meta.url).href}
                                      className=""
                                    />
                                  ) : (
                                    <img src={id_proofthree} className="" />
                                  )}
                                  <input
                                    type="file"
                                    name="image"
                                    onChange={(e) =>
                                      imageUpload("Pancard", e.target.files[0])
                                    }
                                  />
                                </div>
                              </div>
                              <br />
                            </div>
                            <div className="mt-4">
                              {loader == true ? (
                                <button className="button_cls d-block mx-auto btn btn-primary w-100">
                                  Loading...
                                </button>
                              ) : (
                                <button
                                  onClick={formSubmit}
                                  className="button_cls d-block mx-auto btn btn-primary w-100"
                                >
                                  {" "}
                                  submit
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="form_content Proprer_center">
                        <img
                          src={new URL("../img/New_images/pennding.png", import.meta.url).href}
                          className="img-fluid "
                        />
                        <h1 className="mb-1">Under Review!</h1>
                      </div>
                      {/* <hr className="hr_line" /> */}
                    </div>
                  )}
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
