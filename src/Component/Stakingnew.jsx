import React, {useEffect} from "react";
import useState from "react-usestateref";
import {Link, useNavigate} from "react-router-dom";
// import {Dropdown} from "semantic-ui-react";
// import "rc-slider/assets/index.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Header from "./Header";
import {Button} from "@material-ui/core";

import apiService from "../core/service/detail";
import {postMethod} from "../core/service/common.api";
import {toast} from "react-toastify";
import {setAuthToken, getAuthToken} from "../core/lib/localStorage";
import Pagination from "react-js-pagination";
import {getMethod} from "../core/service/common.api";
import moment from "moment";

function Home() {
  const [perpage, setperpage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [stakeDetails, setstakeDetails] = useState([]);
  const [totalactive, settotalactive] = useState(0);
  const [staking1, setstaking1] = useState("");
  const [staking2, setstaking2] = useState("");
  const [staking3, setstaking3] = useState("");
  const [staking4, setstaking4] = useState("");
  const [userBalance, setuserBalance] = useState([]);
  const [currentPack, setcurrentPack] = useState("");
  const [stakeBalance, setStakeBalance] = useState("");
  const [fromDates, setfromData] = useState("");
  const [toDates, settoDate] = useState("");
  const [apy, setAPY] = useState(0);
  const [apr, setAPR] = useState(0);
  const [FlexibleEarn, setFlexibleEarn] = useState(0);

  const [authToken, setauthToken] = useState(false);
  const [stakeValue, setstakeValue] = useState(0);
  const [currentDuration, setcurrentDuration] = useState(0);
  const [currentDurationFlex, setcurrentDurationFlex] = useState(0);
  const [TotalFlexible, setTotalFlexible] = useState(0);

  const [userTotlaInterest, setuserTotlaInterest] = useState(0);
  const [usetDailyInterest, setusetDailyInterest] = useState(0);
  const [stakeHistory, setstakeHistory, stakeHistoryref] = useState([]);
  const [validation, setValidation] = useState(false);
  const [validationErr, setValidationErr] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [fixedvalue, setFixedValue] = useState(4);
  const [totalStakedValue, settotalStakedValue] = useState(0);
  const [totallockedValue, settotallockedValue] = useState(0);
  const [totalStakedValueINR, settotalStakedValueINR] = useState(0);
  const [totallockedValueINR, settotallockedValueINR] = useState(0);
  const [stakedcurrency, setStakedCurrency] = useState(0);
  const [interest, setInterest] = useState(0);
  const [stakingType, setstakingType] = useState("fixed");
  const [selectedFlex, setselectedFlex] = useState("");
  const [adminProfit, setAdminprofit] = useState(0);
  const [flexibleStartDate, setflexibleStartDate] = useState("");
  const [flexibleEndDate, setflexibleEndDate] = useState("");

  const [yieldDuration, setyieldDuration] = useState(0);
  const [yiledSelectDur, setyiledSelectDur] = useState("");

  const [yieldID, setyieldID] = useState("");
  const [yieldData, setYieldData] = useState("");
  const [currentYieldYear, setcurrentYieldYear] = useState(365);
  const [yieldAPY, setyieldAPY] = useState(0);
  const [yiledToDate, setyiledToDate] = useState("");
  const [yiledStakeType, setyiledStakeType] = useState(0);
  const [yiledDays, setYiledDays] = useState(0);
  const [YieldEstimation, setYieldEstimation] = useState(0);
  const [YieldValue, setYieldValue] = useState(0);

  const [YieldFirst, setYieldFirst] = useState(0);
  const [YieldSecond, setYieldSecond] = useState(0);
  const [YieldThird, setYieldThird] = useState(0);
  const [YieldFourth, setYieldFourth] = useState(0);

  const [stake_type, set_type, stake_typeref] = useState("");

  const recordPerPage = 10;
  const pageRange = 10;
  const navigate = useNavigate();

  const data = [
    {
      value: "",
      label: "All",
    },
    {
      value: "fixed",
      label: "Fixed",
    },
    {
      value: "Flexible",
      label: "Flexible",
    },
    {
      value: "yield",
      label: "Yield",
    },
  ];

  useEffect(() => {
    let getToken = localStorage.getItem("user_token");
    if (getToken != "" && getToken != undefined && getToken != null) {
      setauthToken(true);
      getBalance();
      getStakingHistory();
      getStakeTotalDetails();
      getTodayDate();
    } else {
      setauthToken(false);
    }

    getStakeDetails(1);
  }, [0]);

  const getTodayDate = async () => {
    var d = new Date();
    var fromDate =
      (await d.getDate()) +
      "/" +
      (d.getMonth() + 1) +
      "/" +
      d.getFullYear() +
      " " +
      d.getHours() +
      ":" +
      d.getMinutes();
    setfromData(fromDate);
    setflexibleStartDate(fromDate);

    var myDate = new Date(d.getTime() + 365 * 24 * 60 * 60 * 1000);

    var toDate =
      (await myDate.getDate()) +
      "/" +
      (myDate.getMonth() + 1) +
      "/" +
      myDate.getFullYear() +
      " " +
      myDate.getHours() +
      ":" +
      myDate.getMinutes();
    setflexibleEndDate(toDate);
  };

  const getStakeDetails = async (pages) => {
    var obj = {
      FilPerpage: perpage,
      FilPage: pages,
    };
    var data = {
      apiUrl: apiService.getStatkingDetails,
      payload: obj,
    };
    var resp = await postMethod(data);
    if (resp.status) {
      var datas = resp.data.result;
      settotalactive(resp.data.count);
      console.log(datas, "=-=-=-=-data");
      setstakeDetails(datas);
    } else {
      setstakeDetails([]);
    }
  };

  const activePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // call API to get data based on pageNumber
    getStakeDetails(pageNumber);
  };

  const chooseDuration = async (selectedduration, data, duration) => {
    try {
      console.log(
        selectedduration,
        "=-==-selectedduration-=-= ",
        data,
        duration
      );
      getStakeTotalDetails(data.currencySymbol);
      setcurrentDuration(+duration);
      if (selectedduration == "stake1") {
        setAPY(data.FistDurationAPY);
      } else if (selectedduration == "stake2") {
        setAPY(data.SecondDurationAPY);
      } else if (selectedduration == "stake3") {
        setAPY(data.ThirdDurationAPY);
      } else if (selectedduration == "stake4") {
        setAPY(data.FourthDurationAPY);
      } else {
        setAPY(0);
      }
      var obj = {
        status: selectedduration,
        id: data._id,
      };
      setstaking1(obj);

      dataCalculation(selectedduration, data, duration);
    } catch (error) {}
  };

  const chooseDurationYield = async (selectedduration, data) => {
    try {
      if (yiledStakeType == 1) {
        if (selectedduration == "stake1") {
          setyieldAPY(data.yiledAPR_1_firstDuration);
          setyieldDuration(data.yiled_1_firstDuration);
        } else if (selectedduration == "stake2") {
          setyieldAPY(data.yiledAPR_1_secondDuration);
          setyieldDuration(data.yiled_1_secondDuration);
        } else if (selectedduration == "stake3") {
          setyieldAPY(data.yiledAPR_1_thirdDuration);
          setyieldDuration(data.yiled_1_thirdDuration);
        } else if (selectedduration == "stake4") {
          setyieldAPY(data.yiledAPR_1_fourthDuration);
          setyieldDuration(data.yiled_1_fourthDuration);
        } else {
          setyieldAPY(0);
        }
      } else if (yiledStakeType == 3) {
        if (selectedduration == "stake1") {
          setyieldAPY(data.yiledAPR_3_firstDuration);
          setyieldDuration(data.yiled_3_firstDuration);
        } else if (selectedduration == "stake2") {
          setyieldAPY(data.yiledAPR_3_secondDuration);
          setyieldDuration(data.yiled_3_secondDuration);
        } else if (selectedduration == "stake3") {
          setyieldAPY(data.yiledAPR_3_thirdDuration);
          setyieldDuration(data.yiled_3_thirdDuration);
        } else if (selectedduration == "stake4") {
          setyieldAPY(data.yiledAPR_3_fourthDuration);
          setyieldDuration(data.yiled_3_fourthDuration);
        } else {
          setyieldAPY(0);
        }
      } else if (yiledStakeType == 5) {
        if (selectedduration == "stake1") {
          setyieldAPY(data.yiledAPR_5_firstDuration);
          setyieldDuration(data.yiled_5_firstDuration);
        } else if (selectedduration == "stake2") {
          setyieldAPY(data.yiledAPR_5_secondDuration);
          setyieldDuration(data.yiled_5_secondDuration);
        } else if (selectedduration == "stake3") {
          setyieldAPY(data.yiledAPR_5_thirdDuration);
          setyieldDuration(data.yiled_5_thirdDuration);
        } else if (selectedduration == "stake4") {
          setyieldAPY(data.yiledAPR_5_fourthDuration);
          setyieldDuration(data.yiled_5_fourthDuration);
        } else {
          setyieldAPY(0);
        }
      }

      setyieldID(data._id);
      setYieldData(data);
      // var chkDuration = duration == 30 ? "Monthly" : duration == 90 ? "Quarterly" : duration == 180 ? "Half Yearly" : "Yearly"
      // setyiledSelectDur(chkDuration);
      //setYiledDays(duration);
    } catch (error) {}
  };

  const chooseDurationFlexible = async (selectedduration, data, duration) => {
    try {
      console.log(
        selectedduration,
        "=-==-selectedduration-=-= ",
        data,
        duration
      );
      setselectedFlex(data);
      getStakeTotalDetails(data.currencySymbol);
      setcurrentDurationFlex(+duration);
      if (selectedduration == "stake1") {
        setInterest(data.APRinterest);
        setAPR(data.firstInterest);
        setAdminprofit(data.firstProfit);
      } else if (selectedduration == "stake2") {
        setInterest(data.APRinterest);
        setAPR(data.secondInterest);
        setAdminprofit(data.secondProfit);
      } else if (selectedduration == "stake3") {
        setInterest(data.APRinterest);
        setAPR(data.thirdInterst);
        setAdminprofit(data.thirdProfit);
      } else if (selectedduration == "stake4") {
        setInterest(data.APRinterest);
        setAPR(data.fourthInterest);
        setAdminprofit(data.fourthProfit);
      } else {
        setInterest(0);
        setAPR(0);
      }
      var obj = {
        status: selectedduration,
        id: data._id,
      };
      setstaking2(obj);

      dataCalculation(selectedduration, data, duration);
    } catch (error) {}
  };

  const dataCalculation = async (stakePosition, statkeDetails, duration) => {
    console.log("=-=-duration=-=", duration);
    try {
      var plans = parseFloat(duration);
      var d = new Date();
      var fromDate =
        (await d.getDate()) +
        "/" +
        (d.getMonth() + 1) +
        "/" +
        d.getFullYear() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes();
      setfromData(fromDate);

      var myDate = new Date(new Date().getTime() + plans * 24 * 60 * 60 * 1000);

      var toDate =
        (await myDate.getDate()) +
        "/" +
        (myDate.getMonth() + 1) +
        "/" +
        myDate.getFullYear() +
        " " +
        myDate.getHours() +
        ":" +
        myDate.getMinutes();
      if (stakingType == "yield") {
        setyiledToDate(toDate);
      } else {
        settoDate(toDate);
      }
    } catch (error) {
      toast.error("Please try again later");
    }
  };

  const getBalance = async () => {
    try {
      var data = {
        apiUrl: apiService.getUserBalanceAll,
      };
      var resp = await getMethod(data);
      if (resp.status) {
        setuserBalance(resp.data);
        console.log(resp.data, "=-=-resp-=-=-=resp-=-resp.data");
      }
    } catch (error) {
      // toast.error("Please try again later");
    }
  };

  // const getStakingHistory = async () => {
  //   try {
  //     var data = {
  //       apiUrl: apiService.getAllstakingHistory,
  //     };
  //     var resp = await getMethod(data);
  //     if (resp.status) {
  //       // setuserBalance(resp.data);
  //       console.log(resp.data, "=-=-resp-=-=-=resp-=-resp.data");
  //       setstakeHistory(resp.data);
  //     }
  //   } catch (error) {
  //     // toast.error("Please try again later");
  //   }
  // };

  const getStakingHistory = async () => {
    try {
      var data = {
        apiUrl: apiService.getAllstakingHistory,
        payload: {type: stake_typeref.current},
      };
      var resp = await postMethod(data);
      if (resp.status) {
        // setuserBalance(resp.data);
        console.log(resp.data, "=-=-resp-=-=-=resp-=-resp.data");
        setstakeHistory(resp.data);
      }
    } catch (error) {
      // toast.error("Please try again later");
    }
  };

  const stakeNow = (currentPack, type) => {
    try {
      setstakeValue(0);
      setuserTotlaInterest(0);
      setFlexibleEarn(0);
      setInterest(currentPack.APRinterest);
      setstakingType(type);
      console.log(currentPack);
      setcurrentPack(currentPack);
      var index = userBalance.findIndex(
        (x) => x.currencySymbol == currentPack.currencySymbol
      );
      if (index != -1) {
        let findCurrency = userBalance[index];
        setStakeBalance(findCurrency);
      }
      var obj = {
        status: "",
        id: currentPack._id,
      };
      setstaking2(obj);
    } catch (error) {
      // toast.error("Please try again later");
    }
  };

  const stakeNowYield = (currentPack, type) => {
    try {
      console.log(currentPack, "-=--currentPack=-=-=");
      var obj = {
        status: "",
        id: currentPack._id,
      };
      setstaking2(obj);
      console.log(obj, "===-status=--");
      // setstakeValue(0);
      // setuserTotlaInterest(0);
      // setFlexibleEarn(0);
      // setInterest(currentPack.APRinterest);
      // setstakingType(type);
      // console.log(currentPack);
      setcurrentPack(currentPack);
      setstakingType("yield");
      // if(yiledStakeType==1)
      // {
      //   setyieldAPY(currentPack.yiledAPRinterest_1);
      // }
      // else if(yiledStakeType==3)
      // {
      //   setyieldAPY(currentPack.yiledAPRinterest_3);
      // }
      // else if(yiledStakeType==5)
      // {
      //   setyieldAPY(currentPack.yiledAPRinterest_5);
      // }

      var index = userBalance.findIndex(
        (x) => x.currencySymbol == currentPack.currencySymbol
      );
      console.log(userBalance, index, "-=-=index-==-index-=-=-=index=-==");
      if (index != -1) {
        let findCurrency = userBalance[index];
        setStakeBalance(findCurrency);
      }
    } catch (error) {
      toast.error("Please try again later");
    }
  };

  const stakeAmount = (e) => {
    try {
      setstakeValue(e.target.value);
      setYieldValue(e.target.value);
      var amount = parseFloat(e.target.value);
      if (stakingType == "fixed") {
        var dailyinterest = amount * (+apy / 100 / 365);
        var totalInterest = parseFloat(dailyinterest) * currentDuration;
        setuserTotlaInterest(totalInterest);
        setusetDailyInterest(dailyinterest);
      } else if (stakingType == "flexible") {
        console.log("amount::::", amount, "interest:::", interest);
        var dailyinterestDate = amount * (+interest / 100 / 365);
        var totalInterestFlex = parseFloat(dailyinterestDate) * 1;
        setFlexibleEarn(dailyinterestDate);
        setTotalFlexible(totalInterestFlex);
      } else if (stakingType == "yield") {
      }
    } catch (error) {
      // toast.error("Please try again later");
    }
  };

  const choosePlan = async () => {
    try {
      toast.error("Please choose staking plan");
    } catch (error) {
      // toast.error("Please try again later");
    }
  };

  const confirmStack = async () => {
    try {
      if (stakeValue > 0) {
        setValidation(false);
        console.log("confirm staking");
        if (stakingType == "fixed") {
          var obj = {
            stakingPlan: currentDuration,
            totalInterest: userTotlaInterest,
            dailyinterest: usetDailyInterest,
            startDate: fromDates,
            endDate: toDates,
            currentAPY: apy,
            stakeMore: staking1,
            stakeAmont: stakeValue,
            type: "fixed",
          };
        } else if (stakingType == "yield") {
          console.log("****stakingTypeyieldyieldstakingType*****8");
          var plan = {
            id: currentPack._id,
            stats: "statke1",
          };
          var obj = {
            stakingPlan: yiledSelectDur,
            totalInterest: YieldEstimation,
            dailyinterest: 0,
            startDate: fromDates,
            endDate: yiledToDate,
            currentAPY: yieldAPY,
            stakeMore: plan,
            stakeAmont: +YieldValue,
            type: "yield",
          };
        } else {
          var obj = {
            //stakingPlan: currentDurationFlex,
            stakingPlan: 0,
            totalInterest: TotalFlexible,
            dailyinterest: FlexibleEarn,
            startDate: fromDates,
            endDate: flexibleEndDate,
            currentAPY: interest,
            stakeMore: staking2,
            stakeAmont: stakeValue,
            type: "flexible",
          };
        }
        console.log(obj, "****stakingTypeyieldyieldstakingType*****8");

        var data = {
          apiUrl: apiService.confirmStaking,
          payload: obj,
        };
        setButtonLoader(true);
        // return false;
        var resp = await postMethod(data);

        setButtonLoader(false);
        if (resp.status) {
          await toast.success(resp.Message);
          window.location.reload();
        } else {
          toast.error(resp.Message);
        }
      } else {
        setValidation(true);
        toast.error("Enter stake amount");
      }
    } catch (error) {
      // toast.error("Please try again later");
    }
  };

  const confirmStackYield = async () => {
    try {
      if (stakeValue > 0) {
        setValidation(false);
        console.log("confirm staking");
        if (YieldEstimation > 0) {
          var plan = {
            id: currentPack._id,
            stats: "Yield Staking",
          };
          var obj = {
            stakingPlan: yiledSelectDur,
            totalInterest: YieldEstimation,
            dailyinterest: 0,
            startDate: fromDates,
            endDate: yiledToDate,
            currentAPY: yieldAPY,
            stakeMore: plan,
            stakeAmont: +YieldValue,
            type: "yield",
            totalPlan: yiledStakeType,
            yieldDuration: yieldDuration,
            currentYieldYear: currentYieldYear,
          };
          console.log(obj, "=-=-=obj-=-=");
          //return false
          var data = {
            apiUrl: apiService.confirmStaking,
            payload: obj,
          };
          setButtonLoader(true);
          // return false;
          var resp = await postMethod(data);

          setButtonLoader(false);
          if (resp.status) {
            await toast.success(resp.Message);
            window.location.reload();
          } else {
            toast.error(resp.Message);
          }
        } else {
          toast.error("Calculate your amount!");
        }
      } else {
        setValidation(true);
        toast.error("Enter stake amount");
      }
    } catch (error) {
      // toast.error("Please try again later");
    }
  };

  const maximum = async () => {
    try {
      setstakeValue(
        parseFloat(stakeBalance.currencyBalance).toFixed(fixedvalue)
      );
      var amount = parseFloat(stakeBalance.currencyBalance);
      console.log(amount, "9090");
      if (amount > 0) {
        var dailyinterest = amount * (+apy / 100 / 365);
        var totalInterest = parseFloat(dailyinterest) * currentDuration;
        setuserTotlaInterest(totalInterest);
        setusetDailyInterest(dailyinterest);
      } else {
        toast.error("Insufficient balance");
      }
    } catch (error) {
      toast.error("Please try again later");
    }
  };

  const getStakeTotalDetails = async (currency) => {
    try {
      var obj = {
        currency: currency,
      };
      var data = {
        apiUrl: apiService.getStakingTotal,
        payload: obj,
      };
      var resp = await postMethod(data);
      if (resp.status) {
        console.log(resp.data);
        settotallockedValue(resp.data.totalLocked);
        settotalStakedValue(resp.data.totalStaked);
        settotalStakedValueINR(resp.data.totalStakedINR);
        settotallockedValueINR(resp.data.totalLockedINR);
        setStakedCurrency(currency);
      }
    } catch (error) {
      // toast.error("Please try again later");
    }
  };

  const claimNow = async (claimData) => {
    console.log("0998098908908");
    try {
      var obj = {
        _id: claimData._id,
      };
      var data = {
        apiUrl: apiService.claimNowapi,
        payload: obj,
      };
      var resp = await postMethod(data);
      if (resp.status) {
        toast.success(resp.Message);
        getStakingHistory();
      } else {
        toast.error(resp.Message);
      }
    } catch (error) {
      // toast.error("Please try again later");
    }
  };

  const claimNowFlexible = async (claimData) => {
    try {
      var obj = {
        _id: claimData._id,
      };
      var data = {
        apiUrl: apiService.claimNowapiFlexible,
        payload: obj,
      };
      var resp = await postMethod(data);
      if (resp.status) {
        toast.success(resp.Message);
        getStakingHistory();
      } else {
        toast.error(resp.Message);
      }
    } catch (error) {
      // toast.error("Please try again later");
    }
  };

  const yieldYear = async (yearType) => {
    try {
      var year =
        yearType == "oneyear" ? 365 : yearType == "threeyear" ? 1095 : 1825;
      setcurrentYieldYear(year);
      var statkeType =
        yearType == "oneyear" ? 1 : yearType == "threeyear" ? 3 : 5;
      setyiledStakeType(statkeType);
      console.log(year, "==-=year=-=-=year=-=-=-year");
      // dataCalculation("","",year);
      var myDate = new Date(new Date().getTime() + year * 24 * 60 * 60 * 1000);
      console.log(myDate, "==-=-myDate--=-=");
      var toDate =
        (await myDate.getDate()) +
        "/" +
        (myDate.getMonth() + 1) +
        "/" +
        myDate.getFullYear() +
        " " +
        myDate.getHours() +
        ":" +
        myDate.getMinutes();
      console.log(toDate, "=-=-=-=-===-==-=-=toDate==-=-=-==-=-=--=");
      setyiledToDate(toDate);
    } catch (error) {}
  };

  const activity = async (activityType) => {
    console.log("]]]]]]]]]", "activityType", activityType);
    try {
      if (activityType == "yield") {
        yieldYear("oneyear");
      }
    } catch (error) {}
  };

  const yieldCalculate = async () => {
    console.log("]]]]]]]]]", "activityType", stakeValue);

    try {
      if (stakeValue > 0) {
        var obj = {
          investValue: Number(stakeValue),
          APRPercentage: yieldAPY,
          days: yieldDuration,
          yiledStakeType: yiledStakeType * 365,
        };
        var data = {
          apiUrl: apiService.yieldcalculation,
          payload: obj,
        };
        var resp = await postMethod(data);
        console.log(resp, "-=-=-=obj-=-=-=-=-");
        setYieldEstimation(resp.Message);
        if (resp.status) {
          // toast.success(resp.Message);
          // getStakingHistory();
        } else {
          toast.error(resp.Message);
        }
      } else {
        toast.error("Please enter stake amount");
      }
    } catch (error) {}
  };

  const claimNow_yield = async (claimData) => {
    try {
      var obj = {
        _id: claimData._id,
      };
      var data = {
        apiUrl: apiService.claimNow_yield,
        payload: obj,
      };
      var resp = await postMethod(data);
      if (resp.status) {
        toast.success(resp.Message);
        getStakingHistory();
      } else {
        toast.error(resp.Message);
      }
    } catch (error) {
      // toast.error("Please try again later");
    }
  };

  const onSelect = async (option) => {
    console.log("handleOnChange_from", option.value);
    set_type(option.value);
    getStakingHistory();
  };

  return (
    <div className="">
      <main className="main-content tradepage-bg login_body_ bg-cover ">
        {/* <Header /> */}
        <div className="container p-0">
          <div className="">
            <div className="container d-flex justify-content-center">
              <div className="col-lg-12 p-0">
                <div className="staking_title">
                  <h1>Staking</h1>

                  <div className="staking_price">
                    <div className="flex-allowww">
                      <div className="clocc">
                        <h3>Total Staked 1</h3>
                        <p>
                          {" "}
                          {parseFloat(totalStakedValue).toFixed(
                            fixedvalue
                          )}{" "}
                          {stakedcurrency}{" "}
                        </p>
                      </div>
                      <div className="clocc">
                        <h3>Total Value Locked</h3>
                        <p>
                          {parseFloat(totallockedValue).toFixed(fixedvalue)}{" "}
                          {stakedcurrency}{" "}
                        </p>
                      </div>
                    </div>

                    <div className="flex-allowww flecx-ssss">
                      <div className="clocc">
                        <h3>Total Staked INR</h3>
                        <p>
                          {" "}
                          {parseFloat(totalStakedValueINR).toFixed(
                            fixedvalue
                          )}{" "}
                          INR{" "}
                        </p>
                      </div>
                      <div className="clocc">
                        <h3>Total Value Locked INR</h3>
                        <p>
                          {parseFloat(totallockedValueINR).toFixed(fixedvalue)}{" "}
                          INR{" "}
                        </p>
                      </div>
                    </div>

                    {/* <div>
                      <h3>Price {currentPack.currencySymbol}</h3>
                      <p>0.0000 </p>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="container d-flex justify-content-center p-0">
              <div className="col-lg-12 p-0">
                <div className="staking_optoikn">
                  <ul className="nav nav-pills">
                    <li className="active">
                      <a
                        data-toggle="pill"
                        href="#Staking"
                        className="active"
                        onClick={() => activity("fixed")}
                      >
                        Fixed Staking
                      </a>
                    </li>
                    <li className="">
                      <a
                        data-toggle="pill"
                        href="#FlexibleStaking"
                        onClick={() => activity("flexible")}
                      >
                        Flexible Staking
                      </a>
                    </li>
                    <li className="">
                      <a
                        data-toggle="pill"
                        href="#yieldStaking"
                        onClick={() => activity("yield")}
                      >
                        Yield Staking
                      </a>
                    </li>
                    <li>
                      <a
                        data-toggle="pill"
                        href="#LockedStaking"
                        onClick={() => activity("history")}
                      >
                        Staking History
                      </a>
                    </li>
                  </ul>

                  {/* //======================Staking Details==============// */}

                  <div className="tab-content">
                    <div id="Staking" className="tab-pane fade in active show">
                      <div className="staking_title">
                        <div className="fixTableHead">
                          <table>
                            <thead>
                              <tr>
                                <th> Currency </th>
                                <th> APY </th>
                                <th> Duration </th>
                                <th> Type </th>
                                <th> Minimum Stake </th>
                              </tr>
                            </thead>

                            <tbody>
                              {stakeDetails.length > 0
                                ? stakeDetails.map((item, i) => {
                                    return (
                                      <tr>
                                        <td>
                                          <div className="price">
                                            {" "}
                                            <h1>
                                              <img src={item.currencyImage} />
                                              {item.currencySymbol}
                                            </h1>
                                          </div>
                                        </td>
                                        <td>
                                          {staking1 &&
                                          staking1.id == item._id ? (
                                            <div className="aPY">{apy} % </div>
                                          ) : (
                                            <div className="aPY">0 % </div>
                                          )}
                                        </td>
                                        <td>
                                          <div className="duration">
                                            {staking1 &&
                                            staking1.status == "stake1" &&
                                            staking1.id == item._id ? (
                                              <Button
                                                className="active"
                                                value="stake1"
                                                onClick={() =>
                                                  chooseDuration(
                                                    "stake1",
                                                    item,
                                                    item.firstDuration
                                                  )
                                                }
                                              >
                                                {item.firstDuration}
                                                <small>Days</small>
                                              </Button>
                                            ) : (
                                              <Button
                                                value="stake1"
                                                onClick={() =>
                                                  chooseDuration(
                                                    "stake1",
                                                    item,
                                                    item.firstDuration
                                                  )
                                                }
                                              >
                                                {item.firstDuration}
                                                <small>Days</small>
                                              </Button>
                                            )}
                                            {staking1 &&
                                            staking1.status == "stake2" &&
                                            staking1.id == item._id ? (
                                              <Button
                                                value="stake2"
                                                className="active"
                                                selected
                                                onClick={() =>
                                                  chooseDuration(
                                                    "stake2",
                                                    item,
                                                    item.secondDuration
                                                  )
                                                }
                                              >
                                                {item.secondDuration}
                                                <small>Days</small>
                                              </Button>
                                            ) : (
                                              <Button
                                                value="stake2"
                                                selected
                                                onClick={() =>
                                                  chooseDuration(
                                                    "stake2",
                                                    item,
                                                    item.secondDuration
                                                  )
                                                }
                                              >
                                                {item.secondDuration}
                                                <small>Days</small>
                                              </Button>
                                            )}
                                            {staking1 &&
                                            staking1.status == "stake3" &&
                                            staking1.id == item._id ? (
                                              <Button
                                                value="stake3"
                                                className="active"
                                                selected
                                                onClick={() =>
                                                  chooseDuration(
                                                    "stake3",
                                                    item,
                                                    item.thirdDuration
                                                  )
                                                }
                                              >
                                                {item.thirdDuration}
                                                <small>Days</small>
                                              </Button>
                                            ) : (
                                              <Button
                                                value="stake3"
                                                selected
                                                onClick={() =>
                                                  chooseDuration(
                                                    "stake3",
                                                    item,
                                                    item.thirdDuration
                                                  )
                                                }
                                              >
                                                {item.thirdDuration}
                                                <small>Days</small>
                                              </Button>
                                            )}
                                            {staking1 &&
                                            staking1.status == "stake4" &&
                                            staking1.id == item._id ? (
                                              <Button
                                                value="stake4"
                                                className="active"
                                                selected
                                                onClick={() =>
                                                  chooseDuration(
                                                    "stake4",
                                                    item,
                                                    item.fourthDuration
                                                  )
                                                }
                                              >
                                                {item.fourthDuration}
                                                <small>Days</small>
                                              </Button>
                                            ) : (
                                              <Button
                                                value="stake4"
                                                selected
                                                onClick={() =>
                                                  chooseDuration(
                                                    "stake4",
                                                    item,
                                                    item.fourthDuration
                                                  )
                                                }
                                              >
                                                {item.fourthDuration}
                                                <small>Days</small>
                                              </Button>
                                            )}
                                          </div>
                                        </td>
                                        <td>
                                          <div className="type">
                                            <p>Lock</p>
                                          </div>
                                        </td>
                                        <td>
                                          <div className="minimum">
                                            <p>
                                              {item.minimumStaking}{" "}
                                              {item.currencySymbol}{" "}
                                            </p>
                                            {authToken == false ? (
                                              <Button
                                                type="button"
                                                data-toggle="modal"
                                                data-target="#stacknow"
                                                onClick={() =>
                                                  stakeNow(item, "fixed")
                                                }
                                              >
                                                <Link to="/login">
                                                  Login to continue!
                                                </Link>
                                              </Button>
                                            ) : staking1 &&
                                              staking1.id == item._id ? (
                                              <Button
                                                className="active"
                                                type="button"
                                                data-toggle="modal"
                                                data-target="#stacknow"
                                                onClick={() =>
                                                  stakeNow(item, "fixed")
                                                }
                                              >
                                                Stake Now
                                              </Button>
                                            ) : (
                                              <Button
                                                className="notactive"
                                                type="button"
                                                onClick={() => choosePlan(item)}
                                              >
                                                Stake Now
                                              </Button>
                                            )}
                                          </div>
                                        </td>
                                      </tr>
                                    );
                                  })
                                : 0}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      {stakeDetails && stakeDetails.length > 0 ? (
                        <Pagination
                          itemClass="page-item"
                          linkClass="page-link"
                          activePage={currentPage}
                          itemsCountPerPage={recordPerPage}
                          totalItemsCount={totalactive}
                          pageRangeDisplayed={pageRange}
                          onChange={activePageChange}
                        />
                      ) : (
                        ""
                      )}
                    </div>

                    <div id="FlexibleStaking" className="tab-pane fade">
                      <div className="staking_title">
                        <div className="fixTableHead">
                          <table>
                            <thead>
                              <tr>
                                <th> Currency </th>
                                <th> APR </th>
                                {/* <th> Duration </th> */}
                                <th> Type </th>
                                <th className="text-right"> Minimum Stake </th>
                                <th className="text-right"> Stake Now </th>
                              </tr>
                            </thead>

                            <tbody>
                              {stakeDetails.length > 0
                                ? stakeDetails.map((item, i) => {
                                    return (
                                      <tr>
                                        <td>
                                          <div className="price">
                                            {" "}
                                            <h1>
                                              <img src={item.currencyImage} />
                                              {item.currencySymbol}
                                            </h1>
                                          </div>
                                        </td>
                                        <td>
                                          <div className="aPY">
                                            {" "}
                                            {item.APRinterest} %{" "}
                                          </div>
                                        </td>

                                        {/* <td>
                                          <div className="duration">
                                            {staking2 &&
                                            staking2.status == "stake1" &&
                                            staking2.id == item._id ? (
                                              <Button
                                                className="active"
                                                value="stake1"
                                                onClick={() =>
                                                  chooseDurationFlexible(
                                                    "stake1",
                                                    item,
                                                    item.firstDurationflex
                                                  )
                                                }
                                              >
                                                {item.firstDurationflex}
                                                <small>Days</small>
                                              </Button>
                                            ) : (
                                              <Button
                                                value="stake1"
                                                onClick={() =>
                                                  chooseDurationFlexible(
                                                    "stake1",
                                                    item,
                                                    item.firstDurationflex
                                                  )
                                                }
                                              >
                                                {item.firstDurationflex}
                                                <small>Days</small>
                                              </Button>
                                            )}
                                            {staking2 &&
                                            staking2.status == "stake2" &&
                                            staking2.id == item._id ? (
                                              <Button
                                                value="stake2"
                                                className="active"
                                                selected
                                                onClick={() =>
                                                  chooseDurationFlexible(
                                                    "stake2",
                                                    item,
                                                    item.secondDurationflex
                                                  )
                                                }
                                              >
                                                {item.secondDurationflex}
                                                <small>Days</small>
                                              </Button>
                                            ) : (
                                              <Button
                                                value="stake2"
                                                selected
                                                onClick={() =>
                                                  chooseDurationFlexible(
                                                    "stake2",
                                                    item,
                                                    item.secondDurationflex
                                                  )
                                                }
                                              >
                                                {item.secondDurationflex}
                                                <small>Days</small>
                                              </Button>
                                            )}
                                            {staking2 &&
                                            staking2.status == "stake3" &&
                                            staking2.id == item._id ? (
                                              <Button
                                                value="stake3"
                                                className="active"
                                                selected
                                                onClick={() =>
                                                  chooseDurationFlexible(
                                                    "stake3",
                                                    item,
                                                    item.thirdDurationflex
                                                  )
                                                }
                                              >
                                                {item.thirdDurationflex}
                                                <small>Days</small>
                                              </Button>
                                            ) : (
                                              <Button
                                                value="stake3"
                                                selected
                                                onClick={() =>
                                                  chooseDurationFlexible(
                                                    "stake3",
                                                    item,
                                                    item.thirdDurationflex
                                                  )
                                                }
                                              >
                                                {item.thirdDurationflex}
                                                <small>Days</small>
                                              </Button>
                                            )}
                                            {staking2 &&
                                            staking2.status == "stake4" &&
                                            staking2.id == item._id ? (
                                              <Button
                                                value="stake4"
                                                className="active"
                                                selected
                                                onClick={() =>
                                                  chooseDurationFlexible(
                                                    "stake4",
                                                    item,
                                                    item.fourthDurationflex
                                                  )
                                                }
                                              >
                                                {item.fourthDurationflex}
                                                <small>Days</small>
                                              </Button>
                                            ) : (
                                              <Button
                                                value="stake4"
                                                selected
                                                onClick={() =>
                                                  chooseDurationFlexible(
                                                    "stake4",
                                                    item,
                                                    item.fourthDurationflex
                                                  )
                                                }
                                              >
                                                {item.fourthDurationflex}
                                                <small>Days</small>
                                              </Button>
                                            )}
                                          </div>
                                        </td> */}

                                        <td>
                                          <div className="type">
                                            <p> Flexible </p>
                                          </div>
                                        </td>
                                        <td>
                                          <div className="minimum justify-content-end">
                                            <p>
                                              {item.minimumStakingflex}{" "}
                                              {item.currencySymbol}{" "}
                                            </p>
                                          </div>
                                        </td>
                                        <td>
                                          <div className="minimum justify-content-end">
                                            {authToken == false ? (
                                              <Button
                                                type="button"
                                                data-toggle="modal"
                                                data-target="#stacknow"
                                                onClick={() =>
                                                  stakeNow(item, "flexible")
                                                }
                                              >
                                                <Link to="/login">
                                                  Login to continue!
                                                </Link>
                                              </Button>
                                            ) : (
                                              <Button
                                                className="active"
                                                type="button"
                                                data-toggle="modal"
                                                data-target="#stacknow"
                                                onClick={() =>
                                                  stakeNow(item, "flexible")
                                                }
                                              >
                                                Stake Now
                                              </Button>
                                            )}
                                          </div>
                                        </td>
                                      </tr>
                                    );
                                  })
                                : 0}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      {stakeDetails && stakeDetails.length > 0 ? (
                        <Pagination
                          itemClass="page-item"
                          linkClass="page-link"
                          activePage={currentPage}
                          itemsCountPerPage={recordPerPage}
                          totalItemsCount={totalactive}
                          pageRangeDisplayed={pageRange}
                          onChange={activePageChange}
                        />
                      ) : (
                        ""
                      )}
                    </div>

                    <div id="LockedStaking" className="tab-pane fade">
                      <div className="staking_title">
                        {authToken == true ? (
                          <div className="fiter_drobdown">
                            {/* <Dropdown text="Filter" className="drop_list" >
                            <Dropdown.Menu >
                              <Dropdown.Item text="Fixed Staking" />
                              <Dropdown.Item text="Flexible Staking" />

                              <Dropdown.Item text="Yield Staking" />
                            </Dropdown.Menu>
                            </Dropdown> */}
                            <Dropdown
                              placeholder="Filter"
                              options={data}
                              onChange={(o) => onSelect(o)}
                            />
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="fixTableHead">
                          <table>
                            <thead>
                              <tr>
                                <th>Package</th>
                                <th>Total Amount</th>

                                <th>APY / APR</th>
                                <th>Stake Date</th>
                                <th>Interest Cycle</th>
                                <th>Type</th>

                                <th>Stake End Date</th>
                                <th>Next Claim date</th>
                                {/* <th>Accurue Days</th> */}
                                <th>Total Interest</th>
                                <th>Interest per cycle</th>
                              </tr>
                            </thead>

                            <tbody>
                              {stakeHistoryref.current &&
                              stakeHistoryref.current.length > 0 ? (
                                stakeHistoryref.current.map((item, i) => {
                                  var startdate = moment(item.startDate).format(
                                    "DD/MM/YYYY"
                                  );
                                  var endtdate = moment(item.endDate).format(
                                    "DD/MM/YYYY"
                                  );
                                  //console.log("item.date==", item.date);

                                  var get_time = new Date(item.date).getTime();
                                  //console.log("get_time===", get_time);
                                  var interest_cycle =
                                    item.type == "fixed"
                                      ? item.stakingPlan
                                      : item.YieldDuration;
                                  // console.log(
                                  //   "interest_cycle===",
                                  //   interest_cycle
                                  // );
                                  var added_date =
                                    get_time +
                                    +interest_cycle * 24 * 60 * 60 * 1000;
                                  // console.log("added_date===", added_date);
                                  var claim_date = "";
                                  if (item.type == "fixed") {
                                    claim_date = item.endDate;
                                  } else if (item.type == "yield") {
                                    claim_date = item.nextclaimDate;
                                  } else {
                                    claim_date = "-";
                                  }
                                  //console.log("claim_date===", claim_date);
                                  claim_date = moment(claim_date).format(
                                    "DD/MM/YYYY"
                                  );

                                  return (
                                    <tr>
                                      <td>
                                        <div className="price">
                                          {" "}
                                          <h1>
                                            <img src={item.currencyImage} />
                                            {item.stakeCurrencsymbol}
                                          </h1>
                                        </div>
                                      </td>
                                      <td>
                                        {item.stakeAmont}{" "}
                                        {item.stakeCurrencsymbol}
                                      </td>
                                      <td>
                                        <div className="aPY">
                                          {item.currentAPY}%{" "}
                                        </div>
                                      </td>
                                      <td>{startdate} </td>
                                      <td>
                                        {item.type == "fixed"
                                          ? item.stakingPlan + " days"
                                          : ""}{" "}
                                        {item.type == "yield"
                                          ? item.YieldDuration + " days"
                                          : ""}{" "}
                                        {item.type == "flexible" ? "-" : ""}{" "}
                                      </td>
                                      <td>
                                        <div className="type">
                                          <p>{item.type} </p>
                                        </div>
                                      </td>

                                      <td>
                                        {" "}
                                        {item.type == "fixed" ||
                                        item.type == "yield"
                                          ? endtdate
                                          : "-"}
                                      </td>

                                      <td>
                                        {" "}
                                        {item.type == "fixed" ||
                                        item.type == "yield"
                                          ? claim_date
                                          : "-"}
                                      </td>
                                      {/* <td>10 Days {item.stakingPlanstakingPlan}</td> */}

                                      <td>
                                        <div className="minimum">
                                          <p>
                                            {parseFloat(
                                              item.totalInterest
                                            ).toFixed(4)}{" "}
                                            {item.stakeCurrencsymbol}
                                          </p>
                                        </div>
                                      </td>

                                      <td>
                                        {item.type == "fixed" ? (
                                          <div className="minimum">
                                            <p>
                                              {parseFloat(
                                                item.totalInterest
                                              ).toFixed(4)}{" "}
                                              {item.stakeCurrencsymbol}
                                            </p>
                                            {item.status == 1 ? (
                                              <Button
                                                className="active"
                                                onClick={() => claimNow(item)}
                                              >
                                                Claim Now
                                              </Button>
                                            ) : item.status == 0 ? (
                                              <Button className="notactive">
                                                {" "}
                                                Claim
                                              </Button>
                                            ) : (
                                              <Button className="notactive">
                                                {" "}
                                                Claimed
                                              </Button>
                                            )}
                                          </div>
                                        ) : item.type == "yield" ? (
                                          <div className="minimum">
                                            <p>
                                              {parseFloat(
                                                item.dailyinterest
                                              ).toFixed(4)}{" "}
                                              {item.stakeCurrencsymbol}
                                            </p>
                                            {item.status == 1 ? (
                                              <Button
                                                className="active"
                                                onClick={() =>
                                                  claimNow_yield(item)
                                                }
                                              >
                                                Claim Now
                                              </Button>
                                            ) : item.status == 0 ? (
                                              <Button className="notactive">
                                                {" "}
                                                Claim
                                              </Button>
                                            ) : (
                                              <Button className="notactive">
                                                {" "}
                                                Claimed
                                              </Button>
                                            )}
                                          </div>
                                        ) : (
                                          <div className="minimum">
                                            <p>
                                              {parseFloat(
                                                item.totalInterest
                                              ).toFixed(4)}{" "}
                                              {item.stakeCurrencsymbol}
                                            </p>
                                            {item.status == 0 ? (
                                              <Button
                                                className="active"
                                                onClick={() =>
                                                  claimNowFlexible(item)
                                                }
                                              >
                                                Claim Now
                                              </Button>
                                            ) : (
                                              <Button style={{color: "black"}}>
                                                Claimed
                                              </Button>
                                            )}
                                          </div>
                                        )}
                                      </td>
                                    </tr>
                                  );
                                })
                              ) : (
                                <tr>
                                  {" "}
                                  <td colSpan="8">
                                    {" "}
                                    No Staking History Found!{" "}
                                  </td>{" "}
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div id="yieldStaking" className="tab-pane fade">
                      <div className="yiled_tabs">
                        <ul className="nav nav-pills">
                          <li className="active">
                            <a
                              data-toggle="pill"
                              href="#oneyear"
                              className="active"
                              onClick={() => yieldYear("oneyear")}
                            >
                              1 Year
                            </a>
                          </li>
                          <li className="">
                            <a
                              data-toggle="pill"
                              href="#oneyear"
                              onClick={() => yieldYear("threeyear")}
                            >
                              3 Year
                            </a>
                          </li>
                          <li className="">
                            <a
                              data-toggle="pill"
                              href="#oneyear"
                              onClick={() => yieldYear("fiveyear")}
                            >
                              5 Year
                            </a>
                          </li>
                        </ul>
                        <div className="tab-content">
                          {/* //////=====================First Year yield Staking================/////  */}

                          <div
                            id="oneyear"
                            className="tab-pane fade in active show"
                          >
                            <div className="staking_title">
                              <div className="fixTableHead">
                                <table>
                                  <thead>
                                    <tr>
                                      <th> Currency </th>
                                      <th> APY </th>
                                      <th> Duration </th>
                                      <th> Type </th>
                                      <th> Minimum Stake </th>
                                      <th> Maximum Stake </th>
                                      <th> Stake Now </th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    {stakeDetails.length > 0
                                      ? stakeDetails.map((item, i) => {
                                          console.log(item);
                                          return (
                                            <tr>
                                              <td>
                                                <div className="price">
                                                  {" "}
                                                  <h1>
                                                    <img
                                                      src={item.currencyImage}
                                                    />
                                                    {item.currencySymbol}
                                                  </h1>
                                                </div>
                                              </td>
                                              <td>
                                                {yieldID == item._id ? (
                                                  <div className="aPY">
                                                    {yieldAPY} %{" "}
                                                  </div>
                                                ) : (
                                                  <div className="aPY">
                                                    0 %{" "}
                                                  </div>
                                                )}
                                              </td>
                                              <td>
                                                <div className="duration">
                                                  <Button
                                                    className={
                                                      yieldDuration ==
                                                        "stake1" &&
                                                      item._id == yieldID
                                                        ? "active"
                                                        : ""
                                                    }
                                                    value="stake1"
                                                    onClick={() =>
                                                      chooseDurationYield(
                                                        "stake1",
                                                        item
                                                      )
                                                    }
                                                  >
                                                    {item &&
                                                    yiledStakeType == 1 ? (
                                                      <small>
                                                        {
                                                          item.yiled_1_firstDuration
                                                        }{" "}
                                                        Days
                                                      </small>
                                                    ) : yiledStakeType == 3 ? (
                                                      <small>
                                                        {
                                                          item.yiled_3_firstDuration
                                                        }{" "}
                                                        Days
                                                      </small>
                                                    ) : yiledStakeType == 5 ? (
                                                      <small>
                                                        {
                                                          item.yiled_5_firstDuration
                                                        }{" "}
                                                        Days
                                                      </small>
                                                    ) : (
                                                      ""
                                                    )}
                                                  </Button>

                                                  <Button
                                                    className={
                                                      yieldDuration ==
                                                        "stake2" &&
                                                      item._id == yieldID
                                                        ? "active"
                                                        : ""
                                                    }
                                                    value="stake2"
                                                    onClick={() =>
                                                      chooseDurationYield(
                                                        "stake2",
                                                        item
                                                      )
                                                    }
                                                  >
                                                    {item &&
                                                    yiledStakeType == 1 ? (
                                                      <small>
                                                        {
                                                          item.yiled_1_secondDuration
                                                        }{" "}
                                                        Days
                                                      </small>
                                                    ) : yiledStakeType == 3 ? (
                                                      <small>
                                                        {
                                                          item.yiled_3_secondDuration
                                                        }{" "}
                                                        Days
                                                      </small>
                                                    ) : yiledStakeType == 5 ? (
                                                      <small>
                                                        {
                                                          item.yiled_5_secondDuration
                                                        }{" "}
                                                        Days
                                                      </small>
                                                    ) : (
                                                      ""
                                                    )}
                                                  </Button>

                                                  <Button
                                                    className={
                                                      yieldDuration ==
                                                        "stake3" &&
                                                      item._id == yieldID
                                                        ? "active"
                                                        : ""
                                                    }
                                                    value="stake3"
                                                    onClick={() =>
                                                      chooseDurationYield(
                                                        "stake3",
                                                        item
                                                      )
                                                    }
                                                  >
                                                    {item &&
                                                    yiledStakeType == 1 ? (
                                                      <small>
                                                        {
                                                          item.yiled_1_thirdDuration
                                                        }{" "}
                                                        Days
                                                      </small>
                                                    ) : yiledStakeType == 3 ? (
                                                      <small>
                                                        {
                                                          item.yiled_3_thirdDuration
                                                        }{" "}
                                                        Days
                                                      </small>
                                                    ) : yiledStakeType == 5 ? (
                                                      <small>
                                                        {
                                                          item.yiled_5_thirdDuration
                                                        }{" "}
                                                        Days
                                                      </small>
                                                    ) : (
                                                      ""
                                                    )}
                                                  </Button>

                                                  <Button
                                                    className={
                                                      yieldDuration ==
                                                        "stake4" &&
                                                      item._id == yieldID
                                                        ? "active"
                                                        : ""
                                                    }
                                                    value="stake4"
                                                    onClick={() =>
                                                      chooseDurationYield(
                                                        "stake4",
                                                        item
                                                      )
                                                    }
                                                  >
                                                    {item &&
                                                    yiledStakeType == 1 ? (
                                                      <small>
                                                        {
                                                          item.yiled_1_fourthDuration
                                                        }{" "}
                                                        Days
                                                      </small>
                                                    ) : yiledStakeType == 3 ? (
                                                      <small>
                                                        {
                                                          item.yiled_3_fourthDuration
                                                        }{" "}
                                                        Days
                                                      </small>
                                                    ) : yiledStakeType == 5 ? (
                                                      <small>
                                                        {
                                                          item.yiled_5_fourthDuration
                                                        }{" "}
                                                        Days
                                                      </small>
                                                    ) : (
                                                      ""
                                                    )}
                                                  </Button>
                                                </div>
                                              </td>
                                              <td>
                                                <div className="type">
                                                  <p> Yield </p>
                                                </div>
                                              </td>
                                              <td>
                                                <div className="minimum">
                                                  <p>
                                                    {item.minimumStakingYield}{" "}
                                                    {item.currencySymbol}{" "}
                                                  </p>
                                                </div>
                                              </td>
                                              <td>
                                                <div className="minimum">
                                                  <p>
                                                    {item.maximumStakingYield}{" "}
                                                    {item.currencySymbol}{" "}
                                                  </p>
                                                </div>
                                              </td>
                                              <td>
                                                <div className="minimum">
                                                  {authToken == false ? (
                                                    <Button
                                                      type="button"
                                                      data-toggle="modal"
                                                      data-target="#stacknowYield"
                                                    >
                                                      <Link to="/login">
                                                        Login to continue!
                                                      </Link>
                                                    </Button>
                                                  ) : yieldID == item._id ? (
                                                    <Button
                                                      className="active"
                                                      type="button"
                                                      data-toggle="modal"
                                                      data-target="#stacknowYield"
                                                      onClick={() =>
                                                        stakeNowYield(
                                                          item,
                                                          "yield"
                                                        )
                                                      }
                                                    >
                                                      Stake Now
                                                    </Button>
                                                  ) : (
                                                    <Button
                                                      disabled
                                                      className="active"
                                                      type="button"
                                                      data-toggle="modal"
                                                      data-target="#stacknowYield"
                                                      onClick={() =>
                                                        stakeNowYield(
                                                          item,
                                                          "yield"
                                                        )
                                                      }
                                                    >
                                                      Stake Now
                                                    </Button>
                                                  )}
                                                </div>
                                              </td>
                                            </tr>
                                          );
                                        })
                                      : 0}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            {stakeDetails && stakeDetails.length > 0 ? (
                              <Pagination
                                itemClass="page-item"
                                linkClass="page-link"
                                activePage={currentPage}
                                itemsCountPerPage={recordPerPage}
                                totalItemsCount={totalactive}
                                pageRangeDisplayed={pageRange}
                                onChange={activePageChange}
                              />
                            ) : (
                              ""
                            )}
                          </div>

                          <div id="twoyear" className="tab-pane fade">
                            <div className="staking_title">
                              <div className="fixTableHead">
                                <table>
                                  <thead>
                                    <tr>
                                      <th> Currency </th>
                                      <th> APY </th>
                                      <th> Duration </th>
                                      <th> Type </th>
                                      <th> Minimum Stake </th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    {stakeDetails.length > 0
                                      ? stakeDetails.map((item, i) => {
                                          return (
                                            <tr>
                                              <td>
                                                <div className="price">
                                                  {" "}
                                                  <h1>
                                                    <img
                                                      src={item.currencyImage}
                                                    />
                                                    {item.currencySymbol}
                                                  </h1>
                                                </div>
                                              </td>
                                              <td>
                                                {staking1 &&
                                                staking1.id == item._id ? (
                                                  <div className="aPY">
                                                    {apy} %{" "}
                                                  </div>
                                                ) : (
                                                  <div className="aPY">
                                                    0 %{" "}
                                                  </div>
                                                )}
                                              </td>
                                              <td>
                                                <div className="duration">
                                                  {staking1 &&
                                                  staking1.status == "stake1" &&
                                                  staking1.id == item._id ? (
                                                    <Button
                                                      className="active"
                                                      value="stake1"
                                                      onClick={() =>
                                                        chooseDuration(
                                                          "stake1",
                                                          item,
                                                          item.firstDuration
                                                        )
                                                      }
                                                    >
                                                      {item.firstDuration}
                                                      <small>Days</small>
                                                    </Button>
                                                  ) : (
                                                    <Button
                                                      value="stake1"
                                                      onClick={() =>
                                                        chooseDuration(
                                                          "stake1",
                                                          item,
                                                          item.firstDuration
                                                        )
                                                      }
                                                    >
                                                      {item.firstDuration}
                                                      <small>Days</small>
                                                    </Button>
                                                  )}
                                                  {staking1 &&
                                                  staking1.status == "stake2" &&
                                                  staking1.id == item._id ? (
                                                    <Button
                                                      value="stake2"
                                                      className="active"
                                                      selected
                                                      onClick={() =>
                                                        chooseDuration(
                                                          "stake2",
                                                          item,
                                                          item.secondDuration
                                                        )
                                                      }
                                                    >
                                                      {item.secondDuration}
                                                      <small>Days</small>
                                                    </Button>
                                                  ) : (
                                                    <Button
                                                      value="stake2"
                                                      selected
                                                      onClick={() =>
                                                        chooseDuration(
                                                          "stake2",
                                                          item,
                                                          item.secondDuration
                                                        )
                                                      }
                                                    >
                                                      {item.secondDuration}
                                                      <small>Days</small>
                                                    </Button>
                                                  )}
                                                  {staking1 &&
                                                  staking1.status == "stake3" &&
                                                  staking1.id == item._id ? (
                                                    <Button
                                                      value="stake3"
                                                      className="active"
                                                      selected
                                                      onClick={() =>
                                                        chooseDuration(
                                                          "stake3",
                                                          item,
                                                          item.thirdDuration
                                                        )
                                                      }
                                                    >
                                                      {item.thirdDuration}
                                                      <small>Days</small>
                                                    </Button>
                                                  ) : (
                                                    <Button
                                                      value="stake3"
                                                      selected
                                                      onClick={() =>
                                                        chooseDuration(
                                                          "stake3",
                                                          item,
                                                          item.thirdDuration
                                                        )
                                                      }
                                                    >
                                                      {item.thirdDuration}
                                                      <small>Days</small>
                                                    </Button>
                                                  )}
                                                  {staking1 &&
                                                  staking1.status == "stake4" &&
                                                  staking1.id == item._id ? (
                                                    <Button
                                                      value="stake4"
                                                      className="active"
                                                      selected
                                                      onClick={() =>
                                                        chooseDuration(
                                                          "stake4",
                                                          item,
                                                          item.fourthDuration
                                                        )
                                                      }
                                                    >
                                                      {item.fourthDuration}
                                                      <small>Days</small>
                                                    </Button>
                                                  ) : (
                                                    <Button
                                                      value="stake4"
                                                      selected
                                                      onClick={() =>
                                                        chooseDuration(
                                                          "stake4",
                                                          item,
                                                          item.fourthDuration
                                                        )
                                                      }
                                                    >
                                                      {item.fourthDuration}
                                                      <small>Days</small>
                                                    </Button>
                                                  )}
                                                </div>
                                              </td>
                                              <td>
                                                <div className="type">
                                                  <p>Lock</p>
                                                </div>
                                              </td>
                                              <td>
                                                <div className="minimum">
                                                  <p>
                                                    {item.minimumStaking}{" "}
                                                    {item.currencySymbol}{" "}
                                                  </p>

                                                  <p>
                                                    {item.minimumStaking}{" "}
                                                    {item.currencySymbol}{" "}
                                                  </p>
                                                  {authToken == false ? (
                                                    <Button
                                                      type="button"
                                                      data-toggle="modal"
                                                      data-target="#stacknow"
                                                      onClick={() =>
                                                        stakeNow(item, "fixed")
                                                      }
                                                    >
                                                      <Link to="/login">
                                                        Login to continue!
                                                      </Link>
                                                    </Button>
                                                  ) : staking1 &&
                                                    staking1.id == item._id ? (
                                                    <Button
                                                      className="active"
                                                      type="button"
                                                      data-toggle="modal"
                                                      data-target="#stacknow"
                                                      onClick={() =>
                                                        stakeNow(item, "fixed")
                                                      }
                                                    >
                                                      Stake Now
                                                    </Button>
                                                  ) : (
                                                    <Button
                                                      className="notactive"
                                                      type="button"
                                                      onClick={() =>
                                                        choosePlan(item)
                                                      }
                                                    >
                                                      Stake Now
                                                    </Button>
                                                  )}
                                                </div>
                                              </td>
                                            </tr>
                                          );
                                        })
                                      : 0}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            {stakeDetails && stakeDetails.length > 0 ? (
                              <Pagination
                                itemClass="page-item"
                                linkClass="page-link"
                                activePage={currentPage}
                                itemsCountPerPage={recordPerPage}
                                totalItemsCount={totalactive}
                                pageRangeDisplayed={pageRange}
                                onChange={activePageChange}
                              />
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* //============================Popup Model=================================// */}

        <div className="modal" id="stacknow">
          <div className="modal-dialog modal-lg modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="coin_title">
                  <div className="row fixTableHead h-auto">
                    <div className="col-lg-2">
                      <div className="price">
                        {" "}
                        <h1>
                          <img src={currentPack.currencyImage} />
                          {currentPack.currencySymbol}
                        </h1>
                      </div>
                    </div>
                    <div className="col-lg-2">
                      <div className="aPY">
                        {" "}
                        {stakingType == "fixed" ? apy : interest} %{" "}
                      </div>
                    </div>
                    {stakingType == "fixed" ? (
                      <div className="col-lg-5">
                        <div className="duration">
                          {staking1 && staking1.status == "stake1" ? (
                            <Button className="active" value="stake1">
                              {currentPack.firstDuration}
                              <small>Days</small>
                            </Button>
                          ) : (
                            <Button value="stake1">
                              {currentPack.firstDuration}
                              <small>Days</small>
                            </Button>
                          )}
                          {staking1 && staking1.status == "stake2" ? (
                            <Button value="stake2" className="active">
                              {currentPack.secondDuration}
                              <small>Days</small>
                            </Button>
                          ) : (
                            <Button value="stake2" selected>
                              {currentPack.secondDuration}
                              <small>Days</small>
                            </Button>
                          )}
                          {staking1 && staking1.status == "stake3" ? (
                            <Button value="stake3" className="active">
                              {currentPack.thirdDuration}
                              <small>Days</small>
                            </Button>
                          ) : (
                            <Button value="stake3" selected>
                              {currentPack.thirdDuration}
                              <small>Days</small>
                            </Button>
                          )}
                          {staking1 && staking1.status == "stake4" ? (
                            <Button value="stake4" className="active">
                              {currentPack.fourthDuration}
                              <small>Days</small>
                            </Button>
                          ) : (
                            <Button value="stake4" selected>
                              {currentPack.fourthDuration}
                              <small>Days</small>
                            </Button>
                          )}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    <div className="col-lg-3">
                      <div className="stakingtext_new">
                        <div className="type">
                          <p>
                            {" "}
                            {stakingType == "fixed" ? "Lock" : "Flexibile"}{" "}
                          </p>
                        </div>
                        <div className="minimum">
                          <p>
                            {" "}
                            {parseFloat(stakeBalance.currencyBalance).toFixed(
                              4
                            )}{" "}
                            {currentPack.currencySymbol}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="total_stak_prohress">
                  <div className="row">
                    <div className="col-lg-6 d-flex align-bottom">
                      <div className="stake_count">
                        <p>Total Staked</p>
                        <h1>9,0909,00 BUSD</h1>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="progresss_s">
                        <p>Pool Limit</p>
                        <div className="progre">
                          <h3>
                            <span>15%</span>
                            <span>1,000,000 $KSC </span>
                          </h3>
                          <div className="progress">
                            <div
                              className="progress-bar"
                              role="progressbar"
                              aria-valuenow="70"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="data_coin_">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="input_filed_for_stake">
                        <div className="title_">
                          <h1>Stake</h1>
                          {/* <a href="">
                            Buy KSC <i className="bi bi-box-arrow-up-right"></i>
                          </a> */}
                        </div>
                        <div className="input_obx">
                          <p>
                            <span>Stake Amount</span>{" "}
                            <span>
                              Available Amount{" "}
                              {parseFloat(stakeBalance.currencyBalance).toFixed(
                                4
                              )}{" "}
                              {currentPack.currencySymbol}
                            </span>
                          </p>
                          <div className="inpurrr">
                            <input
                              type="number"
                              value={stakeValue}
                              placeholder="Enter amount"
                              onChange={stakeAmount}
                              min="0"
                            />
                            <div className="instrucion">
                              {/* <small>-100BUSD</small> */}
                              <h5>{currentPack.currencySymbol} </h5>
                              <p onClick={maximum}>MAX</p>
                            </div>
                          </div>
                          <div>
                            {validation == true ? (
                              <p className="text-danger">
                                {" "}
                                Stake amount is required{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="summery">
                        <h1>Summary</h1>
                        <div>
                          <p>
                            Stake Date{" "}
                            <span>
                              {stakingType == "fixed"
                                ? fromDates
                                : flexibleStartDate}{" "}
                            </span>
                          </p>
                          <p>
                            Interest End Date{" "}
                            <span>
                              {stakingType == "fixed" ? toDates : "-"}{" "}
                            </span>
                          </p>
                          {/* <p>
                            Whitdrawal Delay Time <span>None</span>
                          </p> */}
                          <hr />
                          <h4>
                            {stakingType == "fixed" ? (
                              <span>APY</span>
                            ) : (
                              <span>APR</span>
                            )}
                            <span>
                              {stakingType == "fixed" ? apy : interest} %
                            </span>
                          </h4>
                          <h4>
                            <span>Estimated Interest</span>{" "}
                            <span>
                              {" "}
                              {stakingType == "fixed"
                                ? parseFloat(userTotlaInterest).toFixed(8)
                                : parseFloat(FlexibleEarn).toFixed(10)}{" "}
                              {stakeBalance.currencySymbol}{" "}
                            </span>
                          </h4>
                        </div>
                        {authToken && authToken == true ? (
                          buttonLoader == false ? (
                            <Button onClick={confirmStack}>Confirm</Button>
                          ) : (
                            <Button>Loading...</Button>
                          )
                        ) : (
                          <Button>login to continue</Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===========================Yield Staking======================== */}

        <div className="modal" id="stacknowYield">
          <div className="modal-dialog modal-lg modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="coin_title">
                  <div className="row fixTableHead h-auto">
                    <div className="col-lg-2">
                      <div className="price">
                        {" "}
                        <h1>
                          <img src={currentPack.currencyImage} />
                          <span style={{color: "white"}}>
                            {currentPack.currencySymbol}{" "}
                          </span>
                        </h1>
                      </div>
                    </div>
                    <div className="col-lg-2">
                      <div className="aPY"> {yieldAPY} % </div>
                    </div>
                    {stakingType == "fixed" ? (
                      <div className="col-lg-5">
                        <div className="duration">
                          {staking1 && staking1.status == "stake1" ? (
                            <Button className="active" value="stake1">
                              {currentPack.firstDuration}
                              <small>Days</small>
                            </Button>
                          ) : (
                            <Button value="stake1">
                              {currentPack.firstDuration}
                              <small>Days</small>
                            </Button>
                          )}
                          {staking1 && staking1.status == "stake2" ? (
                            <Button value="stake2" className="active">
                              {currentPack.secondDuration}
                              <small>Days</small>
                            </Button>
                          ) : (
                            <Button value="stake2" selected>
                              {currentPack.secondDuration}
                              <small>Days</small>
                            </Button>
                          )}
                          {staking1 && staking1.status == "stake3" ? (
                            <Button value="stake3" className="active">
                              {currentPack.thirdDuration}
                              <small>Days</small>
                            </Button>
                          ) : (
                            <Button value="stake3" selected>
                              {currentPack.thirdDuration}
                              <small>Days</small>
                            </Button>
                          )}
                          {staking1 && staking1.status == "stake4" ? (
                            <Button value="stake4" className="active">
                              {currentPack.fourthDuration}
                              <small>Days</small>
                            </Button>
                          ) : (
                            <Button value="stake4" selected>
                              {currentPack.fourthDuration}
                              <small>Days</small>
                            </Button>
                          )}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    <div className="col-lg-3">
                      <div className="stakingtext_new">
                        <div className="type">
                          <p> Yield</p>
                        </div>
                        <div className="minimum">
                          <p>
                            {" "}
                            {parseFloat(stakeBalance.currencyBalance).toFixed(
                              4
                            )}{" "}
                            {currentPack.currencySymbol}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="data_coin_">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="input_filed_for_stake">
                        <div className="title_">
                          <h1>Yield Stake</h1>
                          {/* <a href="">
                            Buy KSC <i className="bi bi-box-arrow-up-right"></i>
                          </a> */}
                        </div>
                        <div className="input_obx">
                          <p>
                            <span>Stake Amount</span>{" "}
                            <span>
                              Available Amount{" "}
                              {parseFloat(stakeBalance.currencyBalance).toFixed(
                                4
                              )}{" "}
                              {currentPack.currencySymbol}
                            </span>
                          </p>
                          <div className="inpurrr">
                            <input
                              type="number"
                              value={stakeValue}
                              placeholder="Enter amount"
                              onChange={stakeAmount}
                              min="0"
                            />
                            <div className="instrucion">
                              {/* <small>-100BUSD</small> */}
                              <h5>{currentPack.currencySymbol} </h5>
                              <p onClick={maximum}>MAX</p>
                            </div>
                          </div>
                          <div>
                            {validation == true ? (
                              <p className="text-danger">
                                {" "}
                                Stake amount is required{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="summery">
                          <Button onClick={yieldCalculate}>Calculate </Button>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="summery">
                        <h1>Summary</h1>
                        <div>
                          <p>
                            Stake Date <span>{fromDates}</span>
                          </p>
                          <p>
                            End Date <span>{yiledToDate}</span>
                          </p>
                          <p>
                            Stake Type{" "}
                            <span>
                              {yiledStakeType}
                              {/* //stake type// */}
                              {""} Yield staking
                            </span>
                          </p>

                          <p>
                            Interest Type <span>{yieldDuration} Days</span>
                          </p>

                          {/* <p>
                            Whitdrawal Delay Time <span>None</span>
                          </p> */}
                          <hr />
                          <h4>
                            <span>APR</span>
                            <span>{yieldAPY} %</span>
                          </h4>
                          <h4>
                            <span>Estimated Interest</span>{" "}
                            <span>
                              {" "}
                              {parseFloat(YieldEstimation).toFixed(8)}
                            </span>
                          </h4>
                        </div>
                        {authToken && authToken == true ? (
                          buttonLoader == false ? (
                            <Button onClick={confirmStackYield}>Confirm</Button>
                          ) : (
                            <Button>Loading...</Button>
                          )
                        ) : (
                          <Button>login to continue</Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
