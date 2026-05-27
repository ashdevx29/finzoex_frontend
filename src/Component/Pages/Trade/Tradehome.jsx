import React, { useState } from "react";
import Header from "../../Newcomponent/Header";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiService from "../../../core/service/detail";
import { postMethod } from "../../../core/service/common.api";
import Footernew from "../../footer_buttom";
import { Grid, Paper, Container } from "@mui/material";
import { setAuthorization } from "../../../core/service/axios";
import { Button } from "semantic-ui-react";
import Treadenewpage from "../../Tradenewpage";
function Home() {
  const options = ["one", "two", "three"];

  const initialFormValue = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [emailValidate, setemailValidate] = useState(false);
  const [passwordValidate, setpasswordValidate] = useState(false);
  const [validationnErr, setvalidationnErr] = useState("");
  const [formValue, setFormValue] = useState(initialFormValue);
  const [buttonLoader, setbuttonLoader] = useState(false);
  const [passHide, setPasshide] = useState(false);
  const [inputType, setinputType] = useState("password");
  const { email, isTerms, password, confirmPassword } = formValue;

  const handleChange = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formData = { ...formValue, ...{ [name]: value } };
    setFormValue(formData);
    validate(formData);
  };

  const passwordHide = (data) => {
    if (data == "hide") {
      setPasshide(true);
      setinputType("text");
    } else {
      setPasshide(false);
      setinputType("password");
    }
  };

  const validate = async (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email is a required field";
      setemailValidate(true);
    }

    if (!values.password) {
      errors.password = "Password is a required field";
      setpasswordValidate(true);
    }

    setvalidationnErr(errors);
    return errors;
  };

  const formSubmit = async () => {
    validate(formValue);
    if (formValue.email != "" && formValue.password != "") {
      var data = {
        apiUrl: apiService.signin,
        payload: formValue,
      };
      setbuttonLoader(true);
      var resp = await postMethod(data);
      setbuttonLoader(false);
      if (resp?.tfa === 1) {
        navigate("/verify-tfa", {
          state: {
            socketToken: resp?.socketToken,
          },
        });
      } else {
        if (resp.status) {
          toast.success(resp.Message);
          console.log(resp, "[--=-=resp");
          await setAuthorization(resp.token);
          localStorage.setItem("user_token", resp.token);
          localStorage.setItem("tfa_status", resp.tfa);
          localStorage.setItem("socket_token", resp.socketToken);
          localStorage.setItem("jwNkiKmttscotlox", resp.jwNkiKmttscotlox);
          navigate("/profile");
        } else {
          toast.error(resp.Message);
        }
      }
    }
  };

  return (
    <div className="">
      <main className="main-content tradepage-bg  bg-cover onlywhitee new_login_bb">
        <Header />
        <div className="trade_page_new">
          <div className="class-padding">
            <Treadenewpage />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
