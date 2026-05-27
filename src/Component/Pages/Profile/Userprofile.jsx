import React, { useState, useEffect } from "react";
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
import SidebarNew from "../Profile/SidebarNew";
import { ValidationError } from "yup";
import useStateRef from "react-usestateref";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    var token = localStorage.getItem("user_token");
    if (!token) {
      navigate("/login");
    }
    getKycDetails();
  }, []);

  const [loader, setloader] = useState(false);
  const [editpage, seteditpage] = useState(false);
  const [codeStatus, setcodeStatus] = useState(false);
  const [PersonalDetails, setPersonalDetails, PersonalDetailsref] = useStateRef(
    {}
  );

  const getKycDetails = async () => {
    var data = {
      apiUrl: apiService.getuserDetails,
    };
    setloader(true);
    var resp = await getMethod(data);
    setloader(false);
    if (resp.status == true) {
      formValue.mobile = resp.data.mobile;
      formValue.username = resp.data.name;
      setPersonalDetails(resp.data);
      setid_proofone(resp.data.profile_image);
      if (
        PersonalDetailsref.current.kycStatus === 0 ||
        PersonalDetailsref.current.kycStatus == undefined
      ) {
        navigate("/Kycverify");
      }
    }
  };

  const [code, setcode] = useState("");
  const [email, setemail, emailref] = useStateRef("");
  const [emailValidate, setemailValidate, emailValidateref] = useStateRef(
    false
  );
  const [validationnErr, setvalidationnErr] = useState("");
  const [apiLoader, setapiLoader] = useState(false);

  const validate = async () => {
    const errors = {};
    if (emailref.current == "") {
      errors.email = "Email is a required field";
      setemailValidate(true);
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(emailref.current)
    ) {
      errors.email = "Invalid email address";
      setemailValidate(true);
    } else {
      setemailValidate(false);
    }
    setvalidationnErr(errors);
  };
  const changeEmail = async () => {
    try {
      validate();
      if (emailValidateref.current == false) {
        var data = {
          apiUrl: apiService.changeEmail,
          payload: { email: emailref.current },
        };
        setapiLoader(true);
        var resp = await postMethod(data);
        setapiLoader(false);
        if (resp.status == true) {
          setcodeStatus(true);
          toast.success(resp.message);
        } else {
          toast.error(resp.message);
        }
      }
    } catch (error) { }
  };

  const formSubmit = async () => {
    console.log(emailref.current, "=-=-=-=-=-=-=-=-=-=-", code);
    if (emailref.current != "" && code != "") {
      var data = {
        apiUrl: apiService.changeEmailverify,
        payload: { email: emailref.current, code: code },
      };
      setapiLoader(true);
      var resp = await postMethod(data);
      setapiLoader(false);
      if (resp.status == true) {
        toast.success(resp.Message);
        localStorage.clear();
        navigate("/login");
      } else {
        toast.error(resp.Message);
      }
    }
  };
  const inputValue = {
    username: "",
    mobile: "",
  };

  const [formValue, setformValue] = useState(inputValue);
  const getValue = (e) => {
    const { name, value } = e.target;
    let formData = { ...formValue, ...{ [name]: value } };
    setformValue(formData);
  };

  const { username, mobile } = formValue;

  const [emaileditvalid, setemaileditvalid, emaileditvalidref] = useStateRef(false);
  const [mobileeditvalid, setmobileeditvalid, mobileeditvalidref] = useStateRef(false);
  const [image, setimage, imageref] = useStateRef(false);

  const validatedit = () => {
    const errors = {};
    if (formValue.username == "") {
      errors.username = "Username is required field";
      setemaileditvalid(true);
    } else if (formValue.mobile == "") {
      errors.mobile = "Mobile is required field";
      setmobileeditvalid(true);
    }
    setvalidationnErr(errors);
  }
  const editProfile = async () => {
    formValue["profile_image"] = id_proofone;
    validatedit()
    if (formValue.mobile != "" && formValue.username != "") {
      var data = {
        apiUrl: apiService.editProfile,
        payload: formValue,
      };
      setapiLoader(true);
      var resp = await postMethod(data);
      setapiLoader(false);
      if (resp.status == true) {
        toast.success(resp.message);
        navigate("/Userprofile");
      } else {
        toast.error(resp.message);
      }
    }
  };

  const [id_proofone, setid_proofone] = useState("");
  const [imgloader1, setimgloader1] = useState(false);

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
      }
      fetch("https://api.cloudinary.com/v1_1/taikonz-com/auto/upload", {
        method: "post",
        body: data,
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (type == "front") {
            setid_proofone(data.secure_url);
            setimgloader1(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const verificationhand = (value) => {
    if (value.toString().length > 6) {

    } else {
      setcode(value)
    }
  }
  return (
    <div className="">
      <main className="main-content tradepage-bg  bg-cover onlywhitee new_login_bb">
      <Account_Header/>
        <Container maxWidth="xl" className="container-lg">
          <Grid container spacing={2} justifyContent={"center"}>
            {/* Item for xs (extra small) screens */}
            <Grid item xs={12} sm={12} md={8} lg={3} xl={3}>
              <SidebarNew />
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={9} xl={9}>
              {loader == false ? (
                <>
                  {editpage == true ? (
                    <Grid container spacing={2} justifyContent={"center"}>
                      <Grid item xs={12} sm={12} md={8} lg={7} xl={7}>
                        <div className="card_logoki pading_cardd post_card ">
                          <Button
                            onClick={() => seteditpage(false)}
                            className="back_butn"
                          >
                            <i
                              onClick={() => seteditpage(false)}
                              className="ri-arrow-left-line"
                            ></i>{" "}
                            Back
                          </Button>
                          <div className="tabs_inside">
                            <ul className="nav nav-tabs">
                              <li className="active">
                                <a
                                  data-toggle="tab"
                                  href="#tFA"
                                  className="active"
                                >
                                  Change email address
                                </a>
                              </li>
                              <li>
                                <a data-toggle="tab" href="#menu1">
                                  Edit profile
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="tab-content">
                            <div id="tFA" className="tab-pane fade in active show">
                              {codeStatus == true ? (
                                <div>
                                  <div className="tfa_box mb-3">
                                    <h3>Email verification</h3>
                                    <p>
                                      Please enter the 6-digit verification code
                                      that was send to {emailref.current}. the
                                      code is valid for 30 minutes{" "}
                                    </p>
                                  </div>
                                  <div className="form register_login p-0">
                                    <form className="form_pading_s ">
                                      <div className="form-group">
                                        <label> Email verification code</label>
                                        <div className="postion_reletitt">
                                          <input
                                            className="form-control"
                                            type="number"
                                            id="exampleInputPassword1"
                                            placeholder="Enter code"
                                            value={code}
                                            onChange={(e) =>
                                              verificationhand(e.target.value)
                                            }
                                            name="code"
                                          />
                                        </div>
                                      </div>
                                    </form>
                                    {apiLoader == true ? (
                                      <button
                                        type="button"
                                        className="btn btn-primary w-100"
                                      >
                                        Loading...
                                      </button>
                                    ) : (
                                      <button
                                        type="button"
                                        className="btn btn-primary w-100"
                                        onClick={formSubmit}
                                      >
                                        Submit
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <div className="tfa_box mb-3">
                                    <h3>Change Email</h3>
                                    <p>Please Enter your new email address</p>
                                  </div>
                                  <div className="form register_login p-0">
                                    <form className="form_pading_s">
                                      <div className="form-group">
                                        <label>New Email address</label>
                                        <div className="postion_reletitt">
                                          <input
                                            className="form-control"
                                            type="email"
                                            id="exampleInputPassword1"
                                            placeholder="Enter Email ID"
                                            maxLength={50}
                                            value={emailref.current}
                                            onChange={(e) =>
                                              setemail(e.target.value)
                                            }
                                            name="email"
                                          />
                                        </div>
                                      </div>
                                      <div>
                                        {emailValidateref.current == true ? (
                                          <p style={{ color: "red" }}>
                                            {validationnErr.email}
                                          </p>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    </form>
                                    {apiLoader == true ? (
                                      <button
                                        type="button"
                                        className="btn btn-primary w-100"
                                      >
                                        Loading...
                                      </button>
                                    ) : (
                                      <button
                                        type="button"
                                        className="btn btn-primary w-100"
                                        onClick={changeEmail}
                                      >
                                        Save
                                      </button>
                                    )}
                                  </div>
                                </>
                              )}
                            </div>
                            <div id="menu1" className="tab-pane fade">
                              <div className="tfa_box mb-3">
                                <h3>Edit Profile</h3>
                                <p>Edit your Profile details</p>
                              </div>
                              <div className="form register_login p-0">
                                <form className="form_pading_s">
                                  <div className="form-group">
                                    <label>User Name</label>
                                    <div className="postion_reletitt">
                                      <input
                                        className="form-control"
                                        type="text"
                                        id="exampleInputPassword1"
                                        placeholder="Enter code"
                                        onChange={getValue}
                                        value={username}
                                        name="username"
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    {emaileditvalidref.current == true ? (
                                      <p style={{ color: "red" }}>
                                        {validationnErr.username}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <div className="form-group">
                                    <label> Mobile Number</label>
                                    <div className="postion_reletitt">
                                      <input
                                        className="form-control"
                                        type="number"
                                        id="exampleInputPassword1"
                                        placeholder="Enter code"
                                        value={mobile}
                                        onChange={getValue}
                                        name="mobile"
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    {mobileeditvalidref.current == true ? (
                                      <p style={{ color: "red" }}>
                                        {validationnErr.mobile}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <div className="imgCls">
                                    <h4 className="text-white text-center">
                                      Profile image
                                    </h4>
                                    <div className="input_section_kyc user_img d-block mx-auto">
                                      {imgloader1 == true ? (
                                        <i
                                          className="fa fa-circle-o-notch fa-spin icon_loader"
                                          style={{ "font-size": "36px" }}
                                        ></i>
                                      ) : id_proofone == "" ? (
                                        <img
                                          src={new URL("../../../img/New_images/profile_img.png", import.meta.url).href}
                                        />
                                      ) : (
                                        <img src={id_proofone} className="" />
                                      )}
                                      <input
                                        type="file"
                                        name="image"
                                        onChange={(e) =>
                                          imageUpload(
                                            "front",
                                            e.target.files[0]
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                </form>
                                {apiLoader == true ? (
                                  <button
                                    type="button"
                                    className="btn btn-primary w-100"
                                  >
                                    Loading...
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    className="btn btn-primary w-100"
                                    onClick={editProfile}
                                  >
                                    Submit
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid container spacing={2} justifyContent={"center"}>
                      <Grid item xs={12} sm={12} md={12} lg={7} xl={7}>
                        <div className="card_logoki pading_cardd">
                          <div className="step-5 ">
                            <div className="profile_content_image">
                              <div className="profile_image">
                                {PersonalDetailsref.current.profile_image ==
                                  "" ||
                                  PersonalDetailsref.current.profile_image ==
                                  undefined ? (
                                  <img
                                    src={new URL("../../../img/New_images/profile_img.png", import.meta.url).href}
                                    className="img-fluid"
                                  />
                                ) : (
                                  <img
                                    src={
                                      PersonalDetailsref.current.profile_image
                                    }
                                    className="img-fluid"
                                  />
                                )}
                              </div>
                              <div className="profile_content">
                                <h3>
                                  {PersonalDetailsref.current.name == undefined
                                    ? "Not updated"
                                    : PersonalDetailsref.current.name}{" "}

                                  <span onClick={() => seteditpage(true)}>
                                    {PersonalDetailsref.current.kycStatus ===
                                      1 ? (
                                      <span className="verifyed">Verified</span>
                                    ) : PersonalDetailsref.current.kycStatus ===
                                      0 ||
                                      PersonalDetailsref.current.kycStatus ==
                                      undefined ? (
                                    <span>Not upload</span>
                                  ) : PersonalDetailsref.current.kycStatus ===
                                    2 ? (
                                    <span style={{color: "#f9bd39",marginRight:"20px"  }}>
                                      Pending
                                    </span>
                                  ) : (
                                    <span style={{color: "red", marginRight:"20px"}}>Rejected</span>
                                  )}
                                    <i
                                      style={{
                                        "font-size": "24px",
                                        color: "#fff",
                                        cursor: "pointer",
                                      }}
                                      className="fas"
                                    >
                                      &#xf304;
                                    </i>
                                  </span>
                                </h3>
                                <p>{PersonalDetailsref.current.mobile}</p>
                                <p>{PersonalDetailsref.current.email}</p>
                              </div>
                            </div>
                            <div className="form_content">
                              <h1 className="mb-2 Launch_pad_steps">
                                Personal information
                              </h1>
                            </div>
                            <div className="form_login_section p-0 mt-4">
                              <div className="form register_login p-0">
                                <form className="form_pading_s">
                                  <div className="form-group">
                                    <p className="preview">
                                      Legal Name{" "}
                                      <span>
                                        {PersonalDetailsref.current.name}
                                      </span>
                                    </p>
                                  </div>
                                  <div className="form-group">
                                    <p className="preview">
                                      Date of Birth{" "}
                                      <span>
                                        {PersonalDetailsref.current.dob ==
                                          undefined
                                          ? "Not updated"
                                          : PersonalDetailsref.current.dob}
                                      </span>
                                    </p>
                                  </div>
                                  <div className="form-group">
                                    <p className="preview">
                                      Address{" "}
                                      <span>
                                        {PersonalDetailsref.current.address ==
                                          undefined
                                          ? "Not updated"
                                          : PersonalDetailsref.current.address}
                                      </span>
                                    </p>
                                  </div>
                                  <div className="form-group">
                                    <p className="preview">
                                      Identification Documents{" "}
                                      <span>
                                        {PersonalDetailsref.current.id_proof ==
                                          undefined
                                          ? "Not updated"
                                          : PersonalDetailsref.current.id_proof}
                                      </span>
                                    </p>
                                  </div>
                                  <div className="form-group">
                                    <p className="preview">
                                      Email Address{" "}
                                      <span>
                                        {PersonalDetailsref.current.email}
                                      </span>
                                    </p>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  )}
                </>
              ) : (
                <Grid item xs={12} sm={12} md={8} lg={12} xl={12}>
                  <div className="loading">
                    <i className="fa-solid fa-spinner fa-spin-pulse "></i>
                  </div>
                </Grid>
              )}
            </Grid>
          </Grid>
          {/* Your other components and content */}
        </Container>
      </main>
    </div>
  );
}

export default Home;
