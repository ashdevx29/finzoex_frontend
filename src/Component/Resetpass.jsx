import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import bgImage from "../img/auth/signin.png";

import apiService from "../core/service/detail";
import { postMethod } from "../core/service/common.api";
import Landing_header from "./Newcomponent/Landing_header";

const Resetpass = () => {
  const navigate = useNavigate();

  // Steps
  const [step, setStep] = useState("one");

  // ================= EMAIL STEP =================

  const [formValue, setFormValue] = useState({
    email: "",
  });

  const [emailValidate, setEmailValidate] = useState(false);
  const [validationnErr, setValidationnErr] = useState({});
  const [buttonLoader, setButtonLoader] = useState(false);

  const { email } = formValue;

  useEffect(() => {
    const token = localStorage.getItem("user_token");

    if (token) {
      navigate("/login");
    }
  }, [navigate]);

  // Email Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    const formData = {
      ...formValue,
      [name]: value,
    };

    setFormValue(formData);

    validate(formData);
  };

  // Validate Email
  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Email is required";
      setEmailValidate(true);
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
      setEmailValidate(true);
    } else {
      setEmailValidate(false);
    }

    setValidationnErr(errors);

    return errors;
  };

  // Send OTP
  const formSubmit = async () => {
    const errors = validate(formValue);

    if (Object.keys(errors).length > 0) return;

    try {
      const data = {
        apiUrl: apiService.reset_pwd_otp,
        payload: formValue,
      };

      setButtonLoader(true);

      const resp = await postMethod(data);

      setButtonLoader(false);

      if (resp.status === true) {
        toast.success(resp.message);
        setStep("two");
      } else {
        toast.error(resp.message);
      }
    } catch (error) {
      setButtonLoader(false);
      toast.error("Something went wrong");
    }
  };

  // Resend Mail
  const resendMail = async () => {
    try {
      const data = {
        apiUrl: apiService.reset_pwd_otp,
        payload: formValue,
      };

      setButtonLoader(true);

      const resp = await postMethod(data);

      setButtonLoader(false);

      if (resp.status === true) {
        toast.success(resp.message);
      } else {
        toast.error(resp.message);
      }
    } catch (error) {
      setButtonLoader(false);
      toast.error("Something went wrong");
    }
  };

  // ================= OTP STEP =================

  const [otp_code, setOtpCode] = useState("");

  const [codeValidate, setCodeValidate] = useState(false);

  const [codevalidationnErr, setCodeValidationnErr] = useState({});

  const handleChangeCode = (value) => {
    if (value.length <= 4) {
      setOtpCode(value);
    }
  };

  const validateCode = () => {
    const errors = {};

    if (!otp_code) {
      errors.otp_code = "Authorization Code is required";
      setCodeValidate(true);
    } else {
      setCodeValidate(false);
    }

    setCodeValidationnErr(errors);

    return errors;
  };

  const codeSubmit = async () => {
    const errors = validateCode();

    if (Object.keys(errors).length > 0) return;

    try {
      const obj = {
        otp_code: {
          otp_code,
        },
        email: formValue.email,
      };

      const data = {
        apiUrl: apiService.verifyForgotcode,
        payload: obj,
      };

      setButtonLoader(true);

      const resp = await postMethod(data);

      setButtonLoader(false);

      if (resp.status === true) {
        toast.success(resp.Message);
        setStep("three");
      } else {
        toast.error(resp.Message);
      }
    } catch (error) {
      setButtonLoader(false);
      toast.error("Something went wrong");
    }
  };

  // ================= PASSWORD STEP =================

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [level1, setLevel1] = useState(false);
  const [level2, setLevel2] = useState(false);
  const [level3, setLevel3] = useState(false);

  const handlePassChange = (value) => {
    setPassword(value);

    setLevel1(/[A-Z]/.test(value));
    setLevel2(/[0-9]/.test(value));
    setLevel3(value.length >= 8);
  };

  const passwordSubmit = async () => {
    if (!password) {
      toast.error("Password is required");
      return;
    }

    if (!(level1 && level2 && level3)) {
      toast.error("Password does not meet requirements");
      return;
    }

    try {
      const obj = {
        password,
        email: formValue.email,
      };

      const data = {
        apiUrl: apiService.resetPassword,
        payload: obj,
      };

      setButtonLoader(true);

      const resp = await postMethod(data);

      setButtonLoader(false);

      if (resp.status === true) {
        toast.success(resp.Message);
        navigate("/login");
      } else {
        toast.error(resp.Message);
      }
    } catch (error) {
      setButtonLoader(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
     <Landing_header />
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-8 font-[Inter] relative overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      />



      <div className="relative z-10 w-full max-w-6xl flex items-center justify-center md:justify-end">

        {/* Card */}
        <div className="w-full max-w-lg backdrop-blur-sm bg-white/1 border border-white/3 rounded-xl md:rounded-3xl shadow-2xl px-6 md:px-10 py-6 md:py-10">

          {/* ================= STEP 1 ================= */}

          {step === "one" && (
            <>
              <h1 className="text-white text-2xl md:text-4xl mb-3 md:mb-4">
                Reset Password
              </h1>

              <p className="text-[#858282] text-[15px] leading-5 mb-6 font-[Roboto]">
                Please enter the email address associated with your FinzoEx
                account below. Resetting a forgotten password will logout other
                devices and will result in a 72-hour hold on cryptocurrency
                withdrawals.
              </p>

              <div className="mb-4">
                <label className="text-[#E8E8E8] text-md mb-2 block">
                  Email address
                </label>

                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Enter your email id"
                  className="w-full h-11 rounded-xl bg-white text-black placeholder:text-[#7B7B7B] px-4 outline-none border border-transparent focus:border-[#00D4FF] transition-all"
                />

                {emailValidate && (
                  <p className="text-red-400 text-sm mt-2">
                    {validationnErr.email}
                  </p>
                )}
              </div>

              <button
                onClick={formSubmit}
                disabled={buttonLoader}
                className="w-full h-11 rounded-xl font-medium text-black transition-all mt-4 mb-6 duration-300 hover:scale-[1.02] disabled:opacity-70"
                style={{
                  background:
                    "linear-gradient(135deg, #00D4FF 0%, #0066FF 100%)",
                }}
              >
                {buttonLoader ? "Loading..." : "Submit"}
              </button>
            </>
          )}

          {/* ================= STEP 2 ================= */}

          {step === "two" && (
            <>
              <h1 className="text-white text-2xl md:text-4xl mb-3 md:mb-4">
                Enter Code
              </h1>

              <p className="text-[#858282] text-[15px] leading-5 mb-6 font-[Roboto]">
                An email has been sent with instructions to reset your password.
                Please enter the authorization code in the message we sent to
                the email address you provided.
              </p>

              <div className="mb-4">
                <label className="text-[#E8E8E8] text-md mb-2 block">
                  Authorization Code
                </label>

                <input
                  type="number"
                  value={otp_code}
                  onChange={(e) => handleChangeCode(e.target.value)}
                  placeholder="Enter code"
                  className="w-full h-11 rounded-xl bg-white text-black placeholder:text-[#7B7B7B] px-4 outline-none border border-transparent focus:border-[#00D4FF] transition-all"
                />

                {codeValidate && (
                  <p className="text-red-400 text-sm mt-2">
                    {codevalidationnErr.otp_code}
                  </p>
                )}
              </div>

              <button
                onClick={codeSubmit}
                disabled={buttonLoader}
                className="w-full h-11 rounded-xl font-medium text-black transition-all mt-4 duration-300 hover:scale-[1.02] disabled:opacity-70"
                style={{
                  background:
                    "linear-gradient(135deg, #00D4FF 0%, #0066FF 100%)",
                }}
              >
                {buttonLoader ? "Loading..." : "Submit"}
              </button>

              <button
                onClick={resendMail}
                className="text-[#00D4FF] text-sm mt-5 hover:underline"
              >
                Didn't receive an email? Click here to resend
              </button>
            </>
          )}

          {/* ================= STEP 3 ================= */}

          {step === "three" && (
            <>
              <h1 className="text-white text-2xl md:text-4xl mb-6">
                Set New Password
              </h1>

              <div className="mb-4">
                <label className="text-[#E8E8E8] text-md mb-2 block">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => handlePassChange(e.target.value)}
                    className="w-full h-11 rounded-xl bg-white text-black placeholder:text-[#7B7B7B] px-4 pr-12 outline-none border border-transparent focus:border-[#00D4FF] transition-all"
                  />

                
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <p className={level3 ? "text-green-400" : "text-gray-400"}>
                    ✓ At least 8 characters
                  </p>

                  <p className={level2 ? "text-green-400" : "text-gray-400"}>
                    ✓ At least 1 number
                  </p>

                  <p className={level1 ? "text-green-400" : "text-gray-400"}>
                    ✓ At least 1 uppercase letter
                  </p>
                </div>
              </div>

              <button
                onClick={passwordSubmit}
                disabled={buttonLoader}
                className="w-full h-11 rounded-xl font-medium text-black transition-all mt-4  duration-300 hover:scale-[1.02] disabled:opacity-70"
                style={{
                  background:
                    "linear-gradient(135deg, #00D4FF 0%, #0066FF 100%)",
                }}
              >
                {buttonLoader ? "Loading..." : "Submit"}
              </button>
            </>
          )}

        </div>
      </div>
    </div>
    </>
  );
};

export default Resetpass;









// import React, { useState, useEffect } from "react";
// // import Header from "./Newcomponent/Header";
// import Reset_header from "./Newcomponent/Reset_header";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import apiService from "../core/service/detail";
// import { postMethod } from "../core/service/common.api";
// import Footernew from "./footer_buttom";
// import { Grid, Paper, Container } from "@mui/material";
// import { setAuthorization } from "../core/service/axios";
// import { Button } from "semantic-ui-react";
// import useStateref from "react-usestateref";

// function Home() {
//   const options = ["one", "two", "three"];
//   useEffect(() => {
//     var token = localStorage.getItem("user_token");
//     if (token) {
//       navigate("/login");
//     }
//   }, []);

//   const navigate = useNavigate();
//   const [step, setstep] = useState("one");

//   //RESET PASS FUNCTIONALITY================================================
//   const initialFormValue = {
//     email: "",
//   };

//   const [emailValidate, setemailValidate, emailValidateref] =
//     useStateref(false);
//   const [validationnErr, setvalidationnErr] = useState("");
//   const [formValue, setFormValue] = useState(initialFormValue);
//   const [buttonLoader, setbuttonLoader] = useState(false);

//   const { email } = formValue;

//   const handleChange = async (e) => {
//     e.preventDefault();
//     const { name, value } = e.target;
//     let formData = { ...formValue, ...{ [name]: value } };
//     setFormValue(formData);
//     validate(formData);
//   };

//   const validate = async (values) => {
//     const errors = {};
//     if (values.email == "") {
//       errors.email = "Email is a required field";
//       setemailValidate(true);
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
//       errors.email = "Invalid email address";
//       setemailValidate(true);
//     } else {
//       setemailValidate(false);
//     }

//     setvalidationnErr(errors);
//     return errors;
//   };

//   const formSubmit = async () => {
//     validate(formValue);
//     if (emailValidateref.current == false) {
//       var data = {
//         apiUrl: apiService.reset_pwd_otp,
//         payload: formValue,
//       };
//       setbuttonLoader(true);
//       var resp = await postMethod(data);
//       setbuttonLoader(false);
//       if (resp.status == true) {
//         toast.success(resp.message);
//         setstep("two");
//       } else {
//         toast.error(resp.message);
//       }
//     }
//   };

//   const resendMail = async () => {
//     var data = {
//       apiUrl: apiService.reset_pwd_otp,
//       payload: formValue,
//     };
//     setbuttonLoader(true);
//     var resp = await postMethod(data);
//     setbuttonLoader(false);
//     if (resp.status == true) {
//       toast.success(resp.message);
//       setstep("two");
//     } else {
//       toast.error(resp.message);
//     }
//   };
//   //ACTIVATION CODE PART===================================================
//   const initialCodeFormValue = {
//     otp_code: "",
//   };

//   const [codeValidate, setcodeValidate] = useState(false);
//   const [codevalidationnErr, setcodevalidationnErr] = useState("");
//   const [codeformValue, setcodeFormValue] = useState(initialCodeFormValue);

//   const [otp_code, setotp_code] = useState("");

//   const handleChangeCode = async (value) => {
//     if (value.toString().length > 4) {
//     } else {
//       setotp_code(value);
//     }
//   };

//   const validateCode = async (values) => {
//     const errors = {};
//     if (values.otp_code==""||values.otp_code==null||values.otp_code==undefined) {
//       errors.otp_code = "Activation Code  is a required field";
//       setcodeValidate(true);
//     } else {
//       setcodeValidate(false);
//     }

//     setcodevalidationnErr(errors);
//     return errors;
//   };

//   const codeSubmit = async () => {
//     validateCode(codeformValue);
//     if (otp_code != "") {
//       var obj = {
//         otp_code: { otp_code: otp_code },
//         email: formValue.email,
//       };
//       var data = {
//         apiUrl: apiService.verifyForgotcode,
//         payload: obj,
//       };
//       setbuttonLoader(true);
//       var resp = await postMethod(data);
//       setbuttonLoader(false);
//       if (resp.status == true) {
//         toast.success(resp.Message);
//         formValue.otp_code = "";
//         setstep("three");
//       } else {
//         toast.error(resp.Message);
//       }
//     }
//   };

//   //SETPASSWORDPART=============================================

//   const [inputType, setinputType] = useState("password");
//   const [level1, setlevel1, level1ref] = useStateref("");
//   const [level2, setlevel2, level2ref] = useStateref("");
//   const [level3, setlevel3, level3ref] = useStateref("");
//   const [password, setpassword, passwordref] = useStateref("");
//   const [passHide, setPasshide] = useState(false);

//   const handlePassChange = async (data) => {
//     if (data != "") {
//       if (data.match(/[A-Z]/g)) {
//         setlevel1("check");
//       } else {
//         setlevel1("");
//       }
//       if (data.match(/[0-9]/g)) {
//         setlevel2("check");
//       } else {
//         setlevel2("");
//       }
//       if (data.length >= 8) {
//         setlevel3("check");
//         setpassword(data);
//       } else {
//         setlevel3("");
//       }
//     } else {
//       setlevel3("");
//       setlevel2("");
//       setlevel1("");
//     }
//   };

//   const passwordHide = (data) => {
//     if (data == "hide") {
//       setPasshide(true);
//       setinputType("text");
//     } else {
//       setPasshide(false);
//       setinputType("password");
//     }
//   };

//   const passwordSubmit = async () => {
//     if (password != "") {
//       var obj = {
//         password: password,
//         email: formValue.email,
//       };
//       var data = {
//         apiUrl: apiService.resetPassword,
//         payload: obj,
//       };
//       setbuttonLoader(true);
//       var resp = await postMethod(data);
//       setbuttonLoader(false);
//       if (resp.status == true) {
//         toast.success(resp.Message);
//         navigate("/login");
//       } else {
//         toast.error(resp.Message);
//       }
//     }
//   };

//   const backSubmit = () => {
//     navigate("/login");
//   };

//   return (
//     <div className="">
//       <main className="main-content tradepage-bg  bg-cover onlywhitee new_login_bb">
//         <Reset_header />
//         {step == "one" ? (
//           <Container maxWidth="xl">
//             <Grid container spacing={2} justifyContent={"center"}>
//               {/* Item for xs (extra small) screens */}
//               <Grid item xs={12} sm={12} md={8} lg={6} xl={5}>
//                 <div className="card_logoki pading_cardd">
//                   <div className="step-1">
//                     <div className="form_content">
//                       <Button onClick={backSubmit} className="back_butn">
//                         <i onClick={backSubmit} className="ri-arrow-left-line"></i>{" "}
//                         Back
//                       </Button>
//                       <h1 className="mb-2">Reset Password</h1>
//                       <p className="text_newsd mb-4">
//                         Please enter the email address associated with your
//                         FinzoX account below. Resetting a forgotten password
//                         will logout other devices and will result in a 72-hour
//                         hold on cryptocurrency withdrawals.
//                       </p>
//                     </div>
//                     <div className="form_login_section p-0">
//                       <div className="form register_login p-0">
//                         <form className="form_pading_s">
//                           <div className="form-group">
//                             <label>Email address</label>
//                             <input
//                               type="email"
//                               className="form-control"
//                               id="exampleInputPassword1"
//                               placeholder="Enter your email Id"
//                               name="email"
//                               maxLength={50}
//                               value={email}
//                               onChange={handleChange}
//                             />
//                           </div>
//                           <div className="red_alert">
//                             {emailValidateref.current == true ? (
//                               <p className="text-danger">
//                                 {" "}
//                                 {validationnErr.email}{" "}
//                               </p>
//                             ) : (
//                               ""
//                             )}
//                           </div>
//                         </form>
//                         {buttonLoader == false ? (
//                           <button
//                             type="button"
//                             className="btn btn-primary w-100"
//                             onClick={formSubmit}
//                           >
//                             Submit
//                           </button>
//                         ) : (
//                           <button type="button" className="btn btn-primary w-100">
//                             loading...
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </Grid>
//             </Grid>
//             {/* Your other components and content */}
//           </Container>
//         ) : step == "two" ? (
//           <Container maxWidth="xl">
//             <Grid container spacing={2} justifyContent={"center"}>
//               {/* Item for xs (extra small) screens */}
//               <Grid item xs={12} sm={12} md={8} lg={6} xl={5}>
//                 <div className="card_logoki pading_cardd">
//                   <div className="step-1">
//                     <div className="form_content">
//                       <h1 className="mb-2">Enter Code</h1>
//                       <p className="text_newsd mb-4">
//                         An email has been sent with instructions to reset your
//                         password. Please enter the authorization code in the
//                         message we sent to the email address you provided.
//                       </p>
//                     </div>
//                     <div className="form_login_section p-0">
//                       <div className="form register_login p-0">
//                         <form className="form_pading_s">
//                           <div className="form-group">
//                             <label>Authorization Code</label>
//                             <input
//                               type="Number"
//                               className="form-control"
//                               id="exampleInputPassword1"
//                               placeholder="Enter code"
//                               name="otp_code"
//                               value={otp_code}
//                               onChange={(e) => handleChangeCode(e.target.value)}
//                             />
//                             <div className="red_alert">
//                               {codeValidate == true ? (
//                                 <p className="text-danger">
//                                   {" "}
//                                   {codevalidationnErr.otp_code}{" "}
//                                 </p>
//                               ) : (
//                                 ""
//                               )}
//                             </div>
//                           </div>
//                         </form>
//                         {buttonLoader == false ? (
//                           <button
//                             type="button"
//                             className="btn btn-primary w-100"
//                             onClick={codeSubmit}
//                           >
//                             Submit
//                           </button>
//                         ) : (
//                           <button type="button" className="btn btn-primary w-100">
//                             loading...
//                           </button>
//                         )}
//                       </div>
//                       <div className="custem_check">
//                         <div>
//                           <Link onClick={resendMail}>
//                             <a className="forget text-left">
//                               <span className="color">
//                                 Didn't receive an email?
//                               </span>
//                               Click here to resend the email
//                             </a>
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </Grid>
//             </Grid>
//             {/* Your other components and content */}
//           </Container>
//         ) : (
//           <Container maxWidth="xl">
//             <Grid container spacing={2} justifyContent={"center"}>
//               {/* Item for xs (extra small) screens */}
//               <Grid item xs={12} sm={12} md={8} lg={6} xl={5}>
//                 <div className="card_logoki pading_cardd">
//                   <div className="step-1">
//                     <div className="form_content">
//                       <h1 className="">Set Password</h1>
//                     </div>
//                     <div className="form_login_section p-0">
//                       <div className="form register_login p-0">
//                         <form className="form_pading_s">
//                           <div className="form-group">
//                             <label>Password</label>
//                             <div className="postion_reletitt">
//                               <input
//                                 type={inputType}
//                                 className="form-control"
//                                 id="exampleInputPassword1"
//                                 placeholder="Password"
//                                 name="password"
//                                 onChange={(e) =>
//                                   handlePassChange(e.target.value)
//                                 }
//                               />
//                               <div className="input-group-addon">
//                                 {passHide == false ? (
//                                   <i
//                                     className="bi bi-eye-slash-fill"
//                                     onClick={() => passwordHide("hide")}
//                                   ></i>
//                                 ) : (
//                                   <i
//                                     className="bi bi-eye-fill"
//                                     onClick={() => passwordHide("show")}
//                                   ></i>
//                                 )}
//                               </div>
//                             </div>
//                             <div className="agrreement check">
//                               <p className={level3ref.current}>
//                                 <i className="ri-check-line mr-2"></i>At least 8
//                                 characters
//                                 <br />
//                               </p>
//                               <p className={level2ref.current}>
//                                 <i className="ri-check-line mr-2"></i>At least 1
//                                 number
//                                 <br />
//                               </p>
//                               <p className={level1ref.current}>
//                                 <i className="ri-check-line mr-2"></i>At least 1
//                                 upper case letter
//                                 <br />
//                               </p>
//                             </div>
//                           </div>
//                         </form>

//                         {buttonLoader == false ? (
//                           <button
//                             type="button"
//                             className="btn btn-primary w-100"
//                             onClick={passwordSubmit}
//                           >
//                             Submit
//                           </button>
//                         ) : (
//                           <button type="button" className="btn btn-primary w-100">
//                             loading...
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </Grid>
//             </Grid>
//             {/* Your other components and content */}
//           </Container>
//         )}
//       </main>
//     </div>
//   );
// }

// export default Home;
