import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import bgImage from "../img/auth/signin1.png";

import apiService from "../core/service/detail";
import { postMethod } from "../core/service/common.api";
import Landing_header from "./Newcomponent/Landing_header";

import { AES, enc } from "crypto-js";
import { v4 as uuid } from "uuid";

const OTP_KEY = "^**333**^)";

const Register = () => {
  const navigate = useNavigate();

  // ================= STATES =================

  const [step, setStep] = useState("one");

  const [buttonLoader, setButtonLoader] = useState(false);
  const [loader, setLoader] = useState(false);

  // Step 1
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [foo, setFoo] = useState(false);

  const [emailValidate, setEmailValidate] = useState(false);
  const [mobileValidate, setMobileValidate] = useState(false);
  const [termsValidate, setTermsValidate] = useState(false);

  const [validationErr, setValidationErr] = useState({});

  // Step 2
  const [otp, setOtp] = useState("");
  const [otpValidate, setOtpValidate] = useState(false);

  // Step 3
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [level1, setLevel1] = useState(false);
  const [level2, setLevel2] = useState(false);
  const [level3, setLevel3] = useState(false);

  // Step 4
  const [referral, setReferral] = useState("");

  // ================= USE EFFECT =================

  useEffect(() => {
    const token = localStorage.getItem("user_token");

    if (token) {
      navigate("/Dashboardpage");
    }

    const currURL = window.location.href;
    const referralId = currURL.split("invite/")[1];

    if (referralId) {
      setReferral(referralId);
    }
  }, [navigate]);

  // ================= VALIDATION =================

  const validateStep1 = () => {
    const errors = {};

    if (!email) {
      errors.email = "Email is required";
      setEmailValidate(true);
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
    ) {
      errors.email = "Invalid email address";
      setEmailValidate(true);
    } else {
      setEmailValidate(false);
    }

    if (!mobile) {
      errors.mobile = "Mobile number is required";
      setMobileValidate(true);
    } else {
      setMobileValidate(false);
    }

    if (!foo) {
      errors.terms = "Accept terms and conditions";
      setTermsValidate(true);
    } else {
      setTermsValidate(false);
    }

    setValidationErr(errors);

    return errors;
  };

  const validateOTP = () => {
    const errors = {};

    if (!otp) {
      errors.otp = "OTP is required";
      setOtpValidate(true);
    } else {
      setOtpValidate(false);
    }

    setValidationErr(errors);

    return errors;
  };

  // ================= OTP SEND =================

  const sendOtp = async () => {
    const errors = validateStep1();

    if (Object.keys(errors).length > 0) return;

    try {
      const data = {
        apiUrl: apiService.email_otp,
        payload: {
          email,
        },
      };

      setButtonLoader(true);

      const resp = await postMethod(data);

      setButtonLoader(false);

      if (resp.status === true) {
        toast.success(resp.Message);

        const cipherText = AES.encrypt(resp.otp.toString(), "key");

        localStorage.setItem(OTP_KEY, cipherText.toString());

        localStorage.setItem("email", email);
        localStorage.setItem("mobile", mobile);

        setStep("two");
      } else {
        toast.error(resp.Message);
      }
    } catch (error) {
      setButtonLoader(false);
      toast.error("Something went wrong");
    }
  };

  // ================= RESEND OTP =================

  const resendOtp = async () => {
    try {
      const data = {
        apiUrl: apiService.email_otp,
        payload: {
          email: localStorage.getItem("email"),
        },
      };

      setLoader(true);

      const resp = await postMethod(data);

      setLoader(false);

      if (resp.status === true) {
        toast.success(resp.Message);

        const cipherText = AES.encrypt(resp.otp.toString(), "key");

        localStorage.setItem(OTP_KEY, cipherText.toString());
      } else {
        toast.error(resp.Message);
      }
    } catch (error) {
      setLoader(false);
      toast.error("Something went wrong");
    }
  };

  // ================= VERIFY OTP =================

  const verifyOtp = async () => {
    const errors = validateOTP();

    if (Object.keys(errors).length > 0) return;

    try {
      const stored = localStorage.getItem(OTP_KEY);

      const bytes = AES.decrypt(stored, "key");

      const decrypted = bytes.toString(enc.Utf8);

      if (otp === decrypted) {
        toast.success("Verification completed");

        setStep("three");
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // ================= PASSWORD =================

  const handlePassChange = (value) => {
    setPassword(value);

    setLevel1(/[A-Z]/.test(value));
    setLevel2(/[0-9]/.test(value));
    setLevel3(value.length >= 8);
  };

  const passwordNext = () => {
    if (!(level1 && level2 && level3)) {
      toast.error(
        "Password must have 8+ chars, 1 number, 1 uppercase"
      );
      return;
    }

    setStep("four");
  };

  // ================= FINAL REGISTER =================

  const registerSubmit = async () => {
    try {
      const unique_id = uuid();

      const obj = {
        email: localStorage.getItem("email"),
        mobile: localStorage.getItem("mobile"),
        otp: localStorage.getItem(OTP_KEY),
        password,
        referral: referral || "",
        referralId: unique_id.slice(0, 8),
      };

      const data = {
        apiUrl: apiService.email_verify,
        payload: obj,
      };

      setButtonLoader(true);

      const response = await postMethod(data);

      setButtonLoader(false);

      if (response.status === true) {
        toast.success(response.Message);

        localStorage.clear();

        navigate("/login");
      } else {
        toast.error(response.Message);
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

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 w-full max-w-6xl flex items-center justify-center md:justify-end">

        {/* Card */}
        <div className="w-full max-w-xl backdrop-blur-sm bg-white/4 border border-white/10 rounded-xl md:rounded-3xl shadow-2xl px-6 md:px-10 py-6 md:py-10">

          {/* ================= STEP 1 ================= */}

          {step === "one" && (
            <>
              <h1 className="text-white !Inter text-xl md:text-4xl leading-[1.35] mb-3 md:mb-4">
  Let’s get you started with a FinzoEx account!
</h1>

             

              {/* Email */}
              <div className="mb-4">
                <label className="text-[#E8E8E8] text-md mb-1 block">
                  Email address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email id"
                  className="w-full h-11 rounded-xl bg-white text-[#000] placeholder:text-[#7B7B7B] px-4 outline-none border border-transparent focus:border-[#00D4FF] transition-all"
                />

                {emailValidate && (
                  <p className="text-red-400 text-sm mt-2">
                    {validationErr.email}
                  </p>
                )}
              </div>

              {/* Mobile */}
              <div className="mb-4">
                <label className="text-[#E8E8E8] text-md mb-1 block">
                  Mobile Number
                </label>

             <input
  type="number"
  value={mobile}
  onChange={(e) => {
    if (e.target.value.length <= 20) {
      setMobile(e.target.value);
    }
  }}
  placeholder="Enter your mobile number"
  className="w-full h-11 rounded-xl bg-white !text-black placeholder:text-[#7B7B7B] px-4 outline-none border border-transparent focus:border-[#00D4FF] transition-all appearance-none [-moz-appearance:textfield]"
/>

                {mobileValidate && (
                  <p className="text-red-400 text-sm mt-2">
                    {validationErr.mobile}
                  </p>
                )}
              </div>

              {/* Terms */}
              <div className="mt-6 mb-6">
                <p className="text-left text-[#BCBCBC] text-sm">
                  By creating an account,
                </p>

                <div className="mt-2 flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={foo}
                    onChange={(e) => setFoo(e.target.checked)}
                    className="mt-1 h-4 w-4 accent-[#00D4FF]"
                  />

                  <div className="text-sm text-[#BCBCBC] leading-6">
                    I agree to{" "}
                    <Link
                      to=""
                      className="text-[#0088FF] hover:underline"
                    >
                      FinzoX's Terms of Service
                    </Link>{" "}
                    &{" "}
                    <Link
                      to="/privacy"
                      className="text-[#0088FF] hover:underline"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </div>
                </div>

                {termsValidate && (
                  <p className="text-red-400 text-sm mt-2">
                    {validationErr.terms}
                  </p>
                )}
              </div>

              <button
                onClick={sendOtp}
                disabled={buttonLoader}
                className="w-full h-11 rounded-xl font-medium text-black transition-all mt-4 mb-4 duration-300 hover:scale-[1.02] disabled:opacity-70"
                style={{
                  background:
                    "linear-gradient(135deg, #00D4FF 0%, #0066FF 100%)",
                }}
              >
                {buttonLoader ? "Loading..." : "Next"}
              </button>
            </>
          )}

          {/* ================= STEP 2 ================= */}

          {step === "two" && (
            <>
              <h1 className="text-white text-xl md:text-4xl mb-3 md:mb-4">
                Email Verification
              </h1>

              <p className="text-[#858282] text-[15px] leading-5 mb-6 font-[Roboto]">
                Please enter the verification code sent to your email.
              </p>

              <div className="mb-4">
                <label className="text-[#E8E8E8] text-md mb-2 block">
                  Verification Code
                </label>

                <input
                  type="number"
                  value={otp}
                  onChange={(e) => {
                    if (e.target.value.length <= 6) {
                      setOtp(e.target.value);
                    }
                  }}
                  placeholder="Enter code"
                  className="w-full h-11 rounded-xl bg-white text-black placeholder:text-[#7B7B7B] px-4 outline-none border border-transparent focus:border-[#00D4FF] transition-all"
                />

                {otpValidate && (
                  <p className="text-red-400 text-sm mt-2">
                    {validationErr.otp}
                  </p>
                )}
              </div>

              <button
                onClick={verifyOtp}
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
                onClick={resendOtp}
                className="text-[#00D4FF] text-sm mt-5 hover:underline"
              >
                {loader
                  ? "Loading..."
                  : "Didn't receive an email? Click here to resend"}
              </button>
            </>
          )}

          {/* ================= STEP 3 ================= */}

          {step === "three" && (
            <>
              <h1 className="text-white text-xl md:text-4xl mb-6">
                Set Password
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

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <p
                    className={
                      level3 ? "text-green-400" : "text-gray-400"
                    }
                  >
                    ✓ At least 8 characters
                  </p>

                  <p
                    className={
                      level2 ? "text-green-400" : "text-gray-400"
                    }
                  >
                    ✓ At least 1 number
                  </p>

                  <p
                    className={
                      level1 ? "text-green-400" : "text-gray-400"
                    }
                  >
                    ✓ At least 1 uppercase letter
                  </p>
                </div>
              </div>

              <button
                onClick={passwordNext}
                disabled={buttonLoader}
                className="w-full h-11 rounded-xl font-medium text-black transition-all mt-4 duration-300 hover:scale-[1.02] disabled:opacity-70"
                style={{
                  background:
                    "linear-gradient(135deg, #00D4FF 0%, #0066FF 100%)",
                }}
              >
                Next
              </button>
            </>
          )}

          {/* ================= STEP 4 ================= */}

          {step === "four" && (
            <>
              <h1 className="text-white text-xl md:text-4xl mb-3 md:mb-4">
                Account Created!
              </h1>

              <p className="text-[#858282] text-[15px] leading-5 mb-6 font-[Roboto]">
                Add referral ID if you have one.
              </p>

              <div className="mb-4">
                <label className="text-[#E8E8E8] text-md mb-2 block">
                  Referral ID (Optional)
                </label>

                <input
                  type="text"
                  value={referral}
                  onChange={(e) => setReferral(e.target.value)}
                  placeholder="Enter referral ID"
                  className="w-full h-11 rounded-xl bg-white text-black placeholder:text-[#7B7B7B] px-4 outline-none border border-transparent focus:border-[#00D4FF] transition-all"
                />
              </div>

              <button
                onClick={registerSubmit}
                disabled={buttonLoader}
                className="w-full h-11 rounded-xl font-medium text-black transition-all mt-4 duration-300 hover:scale-[1.02] disabled:opacity-70"
                style={{
                  background:
                    "linear-gradient(135deg, #00D4FF 0%, #0066FF 100%)",
                }}
              >
                {buttonLoader ? "Loading..." : "Done"}
              </button>
            </>
          )}

        </div>
      </div>
    </div>
    </>
    
  );
};

export default Register;




// import React, { useState, useEffect } from "react";
// import Register_header from "./Newcomponent/Register_header";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import apiService from "../core/service/detail";
// import { postMethod } from "../core/service/common.api";
// import { Grid, Container } from "@mui/material";
// import { Button } from "semantic-ui-react";
// import useStateref from "react-usestateref";
// import { AES, enc } from "crypto-js";
// import { v4 as uuid } from "uuid";

// const OTP_KEY = "^**333**^)";

// function Home() {
//   const navigate = useNavigate();

//   const [emailValidate, setemailValidate, emailValidateref] = useStateref(false);
//   const [mobileValidate, setmobileValidate] = useState(false);
//   const [otpValidate, setotpValidate] = useState(false);
//   const [validationnErr, setvalidationnErr] = useState({});
//   const [buttonLoader, setbuttonLoader] = useState(false);
//   const [Loader, setLoader] = useState(false);
//   const [passHide, setPasshide] = useState(false);
//   const [inputType, setinputType] = useState("password");
//   const [foo, setFoo] = useState(false);

//   const [Email, setEmail, Emailref] = useStateref("");
//   const [Mobile, setMobile, Mobileref] = useStateref("");
//   const [otp, setotp, otpref] = useStateref("");
//   const [password, setpassword, passwordref] = useStateref("");
//   const [referral, setreferral, referralref] = useStateref("");

//   const [level1, setlevel1, level1ref] = useStateref("");
//   const [level2, setlevel2, level2ref] = useStateref("");
//   const [level3, setlevel3, level3ref] = useStateref("");

//   const [termsvalidate, settermsvalidate, termsvalidateref] = useStateref(false);

//   const [step1Value, setstep1Value, step1Valueref] = useStateref(
//     localStorage.getItem("step") > 1 ? "step1 d-none" : "step1"
//   );
//   const [step2Value, setstep2Value, step2Valueref] = useStateref(
//     localStorage.getItem("step") == 2 && localStorage.getItem("step") != 3
//       ? "step2" : "step2 d-none"
//   );
//   const [step3Value, setstep3Value, step3Valueref] = useStateref(
//     localStorage.getItem("step") == 3 ? "step3" : "step3 d-none"
//   );
//   const [step4Value, setstep4Value, step4Valueref] = useStateref("step-4 d-none");

//   useEffect(() => {
//     const token = localStorage.getItem("user_token");
//     if (token) navigate("/Dashboardpage");

//     const currURL = window.location.href;
//     const refferalId = currURL.split("invite/")[1];
//     if (refferalId) setreferral(refferalId);
//   }, []);

//   const otphandle = (value) => {
//     if (value.toString().length <= 6) setotp(value);
//   };

//   const handlePasswordChange = (data) => {
//     setlevel1(data.match(/[A-Z]/g) ? "check" : "");
//     setlevel2(data.match(/[0-9]/g) ? "check" : "");
//     if (data.length >= 8) {
//       setlevel3("check");
//       setpassword(data);
//     } else {
//       setlevel3("");
//     }
//   };

//   const passwordHide = (data) => {
//     setPasshide(data === "hide");
//     setinputType(data === "hide" ? "text" : "password");
//   };

//   const validate = async () => {
//     const errors = {};
//     if (!Emailref.current) {
//       errors.email = "Email is required field";
//       setemailValidate(true);
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(Emailref.current)) {
//       errors.email = "Invalid email address";
//       setemailValidate(true);
//     } else {
//       setemailValidate(false);
//     }

//     if (!Mobileref.current) {
//       errors.mobile = "Mobile number is required field";
//       setmobileValidate(true);
//     } else {
//       setmobileValidate(false);
//     }

//     if (!foo) {
//       errors.terms = "Accept terms and conditions";
//       settermsvalidate(true);
//     } else {
//       settermsvalidate(false);
//     }

//     setvalidationnErr(errors);
//     return errors;
//   };

//   const validate2 = async () => {
//     const errors = {};
//     if (!otpref.current) {
//       errors.otp = "OTP is required field";
//       setotpValidate(true);
//     }
//     setvalidationnErr(errors);
//     return errors;
//   };

//   const resend = async () => {
//     const data = { apiUrl: apiService.email_otp, payload: { email: localStorage.getItem("email") } };
//     setLoader(true);
//     const resp = await postMethod(data);
//     setLoader(false);
//     if (resp.status == true) {
//       toast.success(resp.Message);
//       const cipherText = AES.encrypt(resp.otp.toString(), "key");
//       localStorage.setItem(OTP_KEY, cipherText.toString());
//     } else {
//       toast.error(resp.Message);
//     }
//   };

//   const MoveFunction = async (value) => {
//     if (value === "step1") {
//       await validate();
//       if (Emailref.current && !emailValidateref.current && Mobileref.current && !termsvalidateref.current) {
//         const data = { apiUrl: apiService.email_otp, payload: { email: Emailref.current } };
//         setbuttonLoader(true);
//         const resp = await postMethod(data);
//         setbuttonLoader(false);
//         if (resp.status == true) {
//           setstep1Value("step1 d-none");
//           setstep2Value("step2");
//           toast.success(resp.Message);
//           localStorage.setItem("step", 2);
//           localStorage.setItem("email", Emailref.current);
//           localStorage.setItem("mobile", Mobileref.current);
//           const cipherText = AES.encrypt(resp.otp.toString(), "key");
//           localStorage.setItem(OTP_KEY, cipherText.toString());
//           setEmail("");
//           setMobile("");
//         } else {
//           toast.error(resp.Message);
//         }
//       }
//     } else if (value === "step2") {
//       await validate2();
//       if (otpref.current) {
//         const stored = localStorage.getItem(OTP_KEY);
//         const bytes = AES.decrypt(stored, "key");
//         const decrypted = bytes.toString(enc.Utf8);
//         if (otpref.current == decrypted) {
//           setstep2Value("step2 d-none");
//           setstep3Value("step3");
//           localStorage.setItem("step", 3);
//           toast.success("Verification completed");
//         } else {
//           toast.error("Invalid OTP");
//         }
//       }
//     } else if (value === "step3") {
//       setotp("");
//       if (level3ref.current && level2ref.current && level1ref.current) {
//         setstep3Value("step3 d-none");
//         setstep4Value("step4");
//       } else {
//         toast.error("Password must have 8+ chars, 1 number, 1 uppercase");
//       }
//     } else if (value === "step4") {
//       const unique_id = uuid();
//       const obj = {
//         email: localStorage.getItem("email"),
//         mobile: localStorage.getItem("mobile"),
//         otp: localStorage.getItem(OTP_KEY),
//         password: passwordref.current,
//         referral: referralref.current || "",
//         referralId: unique_id.slice(0, 8),
//       };
//       const datas = { apiUrl: apiService.email_verify, payload: obj };
//       setbuttonLoader(true);
//       const response = await postMethod(datas);
//       setbuttonLoader(false);
//       if (response.status == true) {
//         localStorage.clear();
//         navigate("/login");
//         toast.success(response.Message);
//       } else {
//         toast.error(response.Message);
//       }
//     }
//   };

//   const backFun = (data) => {
//     if (data === "step2") {
//       setstep2Value("step2 d-none");
//       setstep1Value("step1");
//     } else if (data === "step3") {
//       localStorage.clear();
//       setstep3Value("step3 d-none");
//       setstep1Value("step1");
//     }
//   };

//   return (
//     <div className="">
//       <main className="main-content tradepage-bg bg-cover onlywhitee new_login_bb">
//         <Register_header />
//         <Container maxWidth="xl">
//           <Grid container spacing={2} justifyContent="center">
//             <Grid item xs={12} sm={12} md={8} lg={6} xl={5}>
//               <div className="card_logoki pading_cardd">

//                 {/* Step 1 - Email & Mobile */}
//                 <div className={step1Valueref.current}>
//                   <div className="form_content">
//                     <h1>Let's get you started with a FinzoX account!</h1>
//                   </div>
//                   <div className="form_login_section p-0">
//                     <div className="form register_login p-0">
//                       <form className="form_pading_s">
//                         <div className="form-group">
//                           <label>Email address</label>
//                           <input
//                             type="email"
//                             className="form-control"
//                             placeholder="Enter your email Id"
//                             name="email"
//                             maxLength={50}
//                             value={Emailref.current || ""}
//                             onChange={(e) => setEmail(e.target.value)}
//                           />
//                           {emailValidateref.current && (
//                             <p className="text-danger">{validationnErr.email}</p>
//                           )}
//                         </div>
//                         <div className="form-group">
//                           <label>Mobile number</label>
//                           <input
//                             type="number"
//                             className="form-control"
//                             placeholder="Enter your mobile number"
//                             name="mobile"
//                             value={Mobileref.current || ""}
//                             onChange={(e) => {
//                               if (e.target.value.toString().length <= 20)
//                                 setMobile(e.target.value);
//                             }}
//                           />
//                           {mobileValidate && (
//                             <p className="text-danger">{validationnErr.mobile}</p>
//                           )}
//                         </div>

                        
//                         {/* <div className="agrreement">
//                           <p className="agree">By creating an account,</p>
//                           <p className="d-flex agree_check">
//                             <input
//                               type="checkbox"
//                               checked={foo}
//                               onChange={(e) => setFoo(e.target.checked)}
//                             />
//                             {" "}I agree to{" "}
//                             <Link to="">Taikonz's Terms of Service</Link> &{" "}
//                             <Link to="">Privacy Policy.</Link>
//                           </p>
//                           {termsvalidateref.current && (
//                             <p className="text-danger">{validationnErr.terms}</p>
//                           )}
//                         </div> */}


//                  <div className="mt-8">
//   <p className="text-left !text-[#fff] text-sm sm:text-base">
//     By creating an account,
//   </p>

//   <div className="mt-2 flex items-start gap-3">
//     <input
//       type="checkbox"
//       checked={foo}
//       onChange={(e) => setFoo(e.target.checked)}
//       className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[#9685ff]"
//     />

//     <div className="text-left text-sm sm:text-base text-[#7a7a7a] leading-6">
//       I agree to{" "}
//       <Link
//         to=""
//         className="text-[#9685ff] hover:underline"
//       >
//         FinzoX's Terms of Service
//       </Link>{" "}
//       &{" "}
//       <Link
//         to=""
//         className="text-[#9685ff] hover:underline"
//       >
//         Privacy Policy
//       </Link>
//       .
//     </div>
//   </div>

//   {termsvalidateref.current && (
//     <p className="mt-2 text-sm text-red-500">
//       {validationnErr.terms}
//     </p>
//   )}
// </div>
       


//                       </form>
//                       <button
//                         type="button"
//                         className="btn btn-primary w-100"
//                         onClick={() => MoveFunction("step1")}
//                         disabled={buttonLoader}
//                       >
//                         {buttonLoader ? "loading..." : "Next"}
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Step 2 - OTP */}
//                 <div className={step2Valueref.current}>
//                   <div className="form_content">
//                     <Button onClick={() => backFun("step2")} className="back_butn">
//                       <i className="ri-arrow-left-line"></i> Back
//                     </Button>
//                     <h1 className="mb-2">Email Verification</h1>
//                     <p className="form_lable_botton">
//                       Please enter the verification code sent to your email. The code is valid for 30 minutes.
//                     </p>
//                   </div>
//                   <div className="form_login_section p-0">
//                     <div className="form register_login p-0">
//                       <form className="form_pading_s">
//                         <div className="form-group">
//                           <label>Email verification code</label>
//                           <input
//                             type="number"
//                             className="form-control"
//                             placeholder="Enter code"
//                             value={otpref.current || ""}
//                             onChange={(e) => otphandle(e.target.value)}
//                           />
//                           {otpValidate && (
//                             <p className="text-danger">{validationnErr.otp}</p>
//                           )}
//                         </div>
//                       </form>
//                       <div className="agrreement mt-1">
//                         <p>
//                           Didn't receive a code?{" "}
//                           {Loader ? <span>loading...</span> : <Link onClick={resend}>Resend</Link>}
//                         </p>
//                       </div>
//                       <button
//                         type="button"
//                         className="btn btn-primary w-100"
//                         onClick={() => MoveFunction("step2")}
//                         disabled={buttonLoader}
//                       >
//                         {buttonLoader ? "loading..." : "Submit"}
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Step 3 - Password */}
//                 <div className={step3Valueref.current}>
//                   <div className="form_content">
//                     <Button onClick={() => backFun("step3")} className="back_butn">
//                       <i className="ri-arrow-left-line"></i> Back
//                     </Button>
//                     <h1>Set Password</h1>
//                   </div>
//                   <div className="form_login_section p-0">
//                     <div className="form register_login p-0">
//                       <form className="form_pading_s">
//                         <div className="form-group">
//                           <label>Password</label>
//                           <div className="postion_reletitt">
//                             <input
//                               type={inputType}
//                               className="form-control"
//                               maxLength={40}
//                               placeholder="Password"
//                               name="password"
//                               onChange={(e) => handlePasswordChange(e.target.value)}
//                             />
//                             <div className="input-group-addon">
//                               {passHide ? (
//                                 <i className="bi bi-eye-slash-fill" onClick={() => passwordHide("show")}></i>
//                               ) : (
//                                 <i className="bi bi-eye-fill" onClick={() => passwordHide("hide")}></i>
//                               )}
//                             </div>
//                           </div>
//                           <div className="agrreement check">
//                             <p className={level3ref.current}>
//                               <i className="ri-check-line mr-2"></i>At least 8 characters
//                             </p>
//                             <p className={level2ref.current}>
//                               <i className="ri-check-line mr-2"></i>At least 1 number
//                             </p>
//                             <p className={level1ref.current}>
//                               <i className="ri-check-line mr-2"></i>At least 1 upper case letter
//                             </p>
//                           </div>
//                         </div>
//                       </form>
//                       <button
//                         type="button"
//                         className="btn btn-primary w-100"
//                         onClick={() => MoveFunction("step3")}
//                         disabled={buttonLoader}
//                       >
//                         {buttonLoader ? "loading..." : "Next"}
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Step 4 - Referral */}
//                 <div className={step4Valueref.current}>
//                   <div className="form_content Proprer_center">
//                     <h1>Account Created!</h1>
//                   </div>
//                   <div className="form_login_section p-0">
//                     <div className="form register_login p-0">
//                       <form className="form_pading_s">
//                         <div className="form-group">
//                           <label>Referral ID (Optional)</label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Referral ID"
//                             name="referral"
//                             value={referralref.current || ""}
//                             onChange={(e) => setreferral(e.target.value)}
//                           />
//                         </div>
//                       </form>
//                       <button
//                         type="button"
//                         className="btn btn-primary w-100"
//                         onClick={() => MoveFunction("step4")}
//                         disabled={buttonLoader}
//                       >
//                         {buttonLoader ? "loading..." : "Done"}
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//               </div>
//             </Grid>
//           </Grid>
//         </Container>
//       </main>
//     </div>
//   );
// }

// export default Home;
