import React, { useEffect } from "react";
import Header from "../../Newcomponent/Header";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiService from "../../../core/service/detail";
import { postMethod, getMethod } from "../../../core/service/common.api";
import Footernew from "../../footer_buttom";
import { Grid, Paper, Container } from "@mui/material";
import { setAuthorization } from "../../../core/service/axios";
import { Button, Loader } from "semantic-ui-react";
import useState from "react-usestateref";
import moment from "moment";
import Pagination from "react-js-pagination";
import DashboardBg from "../../../img/Dashboard/DashboadBg.jpg";

function Home() {
  const [perpage, setperpage] = useState(10);
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
  const [fixedvalue, setFixedValue] = useState(8);
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
  const [yiledstartDate, setyiledstartDate] = useState("");
  const [yiledStakeType, setyiledStakeType] = useState(1);
  const [yiledDays, setYiledDays] = useState(0);
  const [YieldEstimation, setYieldEstimation] = useState(0);
  const [YieldEstimation_interest, setYieldEstimation_interest] = useState(0);
  const [YieldValue, setYieldValue] = useState(0);

  const [YieldFirst, setYieldFirst] = useState(0);
  const [YieldSecond, setYieldSecond] = useState(0);
  const [YieldThird, setYieldThird] = useState(0);
  const [YieldFourth, setYieldFourth] = useState(0);

  const [stake_type, set_type, stake_typeref] = useState("");

  const [stakeType, setstakeType, stakeTyperef] = useState("fixed");

  const [next_claim, setnext_claim, next_claimref] = useState("");

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

  const [pageLoader, setpageLoader] = useState(false);

  const [stakeHistory_fixed, setstakeHistory_fixed, stakeHistory_fixedref] = useState([]);

  const [stakeHistory_flexible, setstakeHistory_flexible, stakeHistory_flexibleref] = useState([]);

  const [stakeHistory_yield, setstakeHistory_yield, stakeHistory_yieldref] = useState([]);


  useEffect(() => {
    let getToken = localStorage.getItem("user_token");
    if (getToken != "" && getToken != undefined && getToken != null) {
      setauthToken(true);
      getBalance();
      getStakingHistory(1);
      getStakingHistory_fixed(1);
      getStakingHistory_flexible(1);
      getStakingHistory_yield(1);
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
      search: "",
    };

    var data = {
      apiUrl: apiService.getStatkingDetails,
      payload: obj,
    };
    setpageLoader(true);

    var resp = await postMethod(data);
    setpageLoader(false);

    if (resp.status == true) {
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
      // setpageLoader(true)
      var data = {
        apiUrl: apiService.getUserBalanceAll,
      };
      var resp = await getMethod(data);
      // setpageLoader(false)

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

  const [historyLoader, sethistoryLoader] = useState(false);
  const getStakingHistory = async (page) => {
    try {
      sethistoryLoader(true);

      var data = {
        apiUrl: apiService.getAllstakingHistory,
        payload: { type: stake_typeref.current, FilPerpage: 5, FilPage: page },
      };
      var resp = await postMethod(data);
      sethistoryLoader(false);

      if (resp.status) {
        console.log(resp.data, "=-=-resp-=-=-=resp-=-resp.data");
        setstakeHistory(resp.data);
        settotal(resp.total);
      }
    } catch (error) {
      // toast.error("Please try again later");
    }
  };

  const getStakingHistory_fixed = async (page) => {
    try {

      var data = {
        apiUrl: apiService.stakingHistory_fixed,
        payload: { type: stake_typeref.current, FilPerpage: 5, FilPage: page },
      };
      var resp = await postMethod(data);

      if (resp.status) {
        console.log(resp.data, "=-=-resp-=-=-=resp-=-resp.data");
        setstakeHistory_fixed(resp.data);
        settotal_fixed(resp.total);
      }
    } catch (error) {
      // toast.error("Please try again later");
    }
  };


  const getStakingHistory_flexible = async (page) => {
    try {

      var data = {
        apiUrl: apiService.stakingHistory_flexible,
        payload: { type: stake_typeref.current, FilPerpage: 5, FilPage: page },
      };
      var resp = await postMethod(data);

      if (resp.status) {
        console.log(resp.data, "=-=-resp-=-=-=resp-=-resp.data");
        setstakeHistory_flexible(resp.data);
        settotal_flexible(resp.total);
      }
    } catch (error) {
      // toast.error("Please try again later");
    }
  };


  const getStakingHistory_yield = async (page) => {
    try {

      var data = {
        apiUrl: apiService.stakingHistory_yield,
        payload: { type: stake_typeref.current, FilPerpage: 5, FilPage: page },
      };
      var resp = await postMethod(data);

      if (resp.status) {
        console.log(resp.data, "=-=-resp-=-=-=resp-=-resp.data");
        setstakeHistory_yield(resp.data);
        settotal_yield(resp.total);
      }
    } catch (error) {
      // toast.error("Please try again later");
    }
  };

  const stakeNow = (currentPack, type) => {
    try {
      setstep1("step1 d-none");
      setstep2("step2 ");
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

      console.log(yieldDuration, "yieldDuration");
      if (
        yieldDuration == "" ||
        yieldDuration == 0 ||
        yieldDuration == undefined ||
        yieldDuration == null
      ) {
        toast.error("Please choose staking plan");
      } else {
        setstep1("step1 d-none");
        setstep4("step4");
        var index = userBalance.findIndex(
          (x) => x.currencySymbol == currentPack.currencySymbol
        );
        console.log(userBalance, index, "-=-=index-==-index-=-=-=index=-==");
        if (index != -1) {
          let findCurrency = userBalance[index];
          setStakeBalance(findCurrency);
        }
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
            status: "statke1",
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
        var resp = await postMethod(data);

        setButtonLoader(false);
        if (resp.status == true) {
          toast.success(resp.Message);
          setstep2("step2 d-none");
          setstep3("step3");
          setnext_claim(resp.next_claim);
          //  setyiledToDate(resp.endDate)
          //  setyiledstartDate(resp.startDate)
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
          if (resp.status == true) {
            toast.success(resp.Message);
            setstep4("step4 d-none");
            setstep3("step3");
            setyiledToDate(resp.endDate);
            setyiledstartDate(resp.startDate);
            setnext_claim(resp.next_claim);
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

  // const maximum = async () => {
  //   try {
  //     setstakeValue(
  //       parseFloat(stakeBalance.currencyBalance).toFixed(fixedvalue)
  //     );
  //     var amount = parseFloat(stakeBalance.currencyBalance);
  //     console.log(amount, "9090");
  //     if (amount > 0) {
  //       var dailyinterest = amount * (+apy / 100 / 365);
  //       var totalInterest = parseFloat(dailyinterest) * currentDuration;
  //       setuserTotlaInterest(totalInterest);
  //       setusetDailyInterest(dailyinterest);
  //     } else {
  //       toast.error("Insufficient balance");
  //     }
  //   } catch (error) {
  //     toast.error("Please try again later");
  //   }
  // };

  const maximum = async () => {
    try {
      setstakeValue(
        parseFloat(stakeBalance.currencyBalance).toFixed(fixedvalue)
      );
      setYieldValue(
        parseFloat(stakeBalance.currencyBalance).toFixed(fixedvalue)
      );
      var amount = parseFloat(stakeBalance.currencyBalance);
      if (amount > 0) {
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
          setYieldEstimation_interest(resp.estimateInterest);
        }
      } else {
        toast.error("Insufficient Balance");
      }
    } catch (error) {
      // toast.error("Please try again later");
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
      // setpageLoader(true)

      var resp = await postMethod(data);
      // setpageLoader(false)

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
        getStakingHistory(1);
        getStakingHistory_fixed(1);
        getStakingHistory_flexible(1);
        getStakingHistory_yield(1);
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
        getStakingHistory(1);
        getStakingHistory_fixed(1);
        getStakingHistory_flexible(1);
        getStakingHistory_yield(1);
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
    sethistoryLoader(true);
    setstakeType(activityType);
    sethistoryLoader(false);
    if (activityType == "yield") {
      yieldYear("oneyear");
    }
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
        setYieldEstimation_interest(resp.estimateInterest);
        console.log(YieldEstimation);
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
        getStakingHistory(1);
        getStakingHistory_fixed(1);
        getStakingHistory_flexible(1);
        getStakingHistory_yield(1);
      } else {
        toast.error(resp.Message);
      }
    } catch (error) {
      // toast.error("Please try again later");
    }
  };

  const onSelect = async (option) => {
    console.log("handleOnChange_from", option);
    set_type(option);
    getStakingHistory(1);
    getStakingHistory_fixed(1);
    getStakingHistory_flexible(1);
    getStakingHistory_yield(1);
  };

  const [step1, setstep1] = useState("step1");
  const [step2, setstep2] = useState("step2 d-none");
  const [step3, setstep3] = useState("step3 d-none");
  const [step4, setstep4] = useState("step4 d-none");
  const backfunction = (value) => {
    if (value == "back") {
      setstep1("step1");
      setstep2("step2 d-none");
      // setstep3("step4 d-none");
      setstep4("step4 d-none");
    } else if (value == "stake") {
      setstep1("step1");
      setstep3("step3 d-none");
    } else if (value == "history") {
      setstep1("step1");
      setstep3("step3 d-none");
      getStakingHistory(1);
      getStakingHistory_fixed(1);
      getStakingHistory_flexible(1);
      getStakingHistory_yield(1);
    }
  };

  const searchToken = async (value) => {
    if (stakeTyperef.current != "") {
      var obj = {
        FilPerpage: perpage,
        FilPage: 1,
        search: value,
      };
      var data = {
        apiUrl: apiService.getStatkingDetails,
        payload: obj,
      };
      var resp = await postMethod(data);
      if (resp.status == true) {
        var datas = resp.data.result;
        settotalactive(resp.data.count);
        console.log(datas, "=-=-=-=-data");
        setstakeDetails(datas);
      } else {
        setstakeDetails([]);
      }
    } else {
      var data = {
        apiUrl: apiService.getAllstakingHistory,
        payload: { type: stake_typeref.current, search: value },
      };
      var resp = await postMethod(data);
      if (resp.status) {
        // setuserBalance(resp.data);
        console.log(resp.data, "=-=-resp-=-=-=resp-=-resp.data");
        setstakeHistory(resp.data);
      }
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [total, settotal] = useState(5);
  const recordPerPage = 5;
  const pageRange = 5;
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // call API to get data based on pageNumber
    getStakingHistory(pageNumber);
  };


  const [currentPage_fixed, setCurrentPage_fixed] = useState(1);
  const [total_fixed, settotal_fixed] = useState(5);
  const recordPerPage_fixed = 5;
  const pageRange_fixed = 5;
  const handlePageChange_fixed = (pageNumber) => {
    setCurrentPage_fixed(pageNumber); // call API to get data based on pageNumber
    getStakingHistory_fixed(pageNumber);
  };

  const [currentPage_flexible, setCurrentPage_flexible] = useState(1);
  const [total_flexible, settotal_flexible] = useState(5);
  const recordPerPage_flexible = 5;
  const pageRange_flexible = 5;
  const handlePageChange_flexible = (pageNumber) => {
    setCurrentPage_flexible(pageNumber); // call API to get data based on pageNumber
    getStakingHistory_flexible(pageNumber);
  };

  const [currentPage_yield, setCurrentPage_yield] = useState(1);
  const [total_yield, settotal_yield] = useState(5);
  const recordPerPage_yield = 5;
  const pageRange_yield = 5;
  const handlePageChange_yield = (pageNumber) => {
    setCurrentPage_yield(pageNumber); // call API to get data based on pageNumber
    getStakingHistory_yield(pageNumber);
  };

  const pageBackgroundStyle = pageLoader
    ? undefined
    : {
        backgroundImage: `url(${DashboardBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      };

  return (
    <div className="">
      <main
        className="main-content   bg-cover onlywhitee "
        style={pageBackgroundStyle}
      >
        <Header />

        {pageLoader == true ? (
          <Grid item xs={12} sm={12} md={8} lg={12} xl={16}>  
            <div className="loading">
              <i className="fa-solid fa-spinner fa-spin-pulse "></i>
            </div>
          </Grid>
        ) : (
          <>

            <div className={step1}>
              <div className="class-padding">
                <Grid
                  container
                  spacing={2}
                  justifyContent={"center"}
                  marginTop={"20px"}
                >
                  {/* Item for xs (extra small) screens */}
                  {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div className="heading_card_new">
                      <h1>
                        Stake <i className="ri-arrow-right-line"></i>
                      </h1>
                    </div>
                  </Grid> */}

                  <Grid item xs={12}>
  <div className="w-full rounded-xl border !border-[#0066FF] bg-[#191919C7] px-4 py-5 md:!px-20 md:py-6 shadow-[0_0_25px_rgba(0,102,255,0.15)]">
    
    {/* Heading */}
    <div className="flex items-center gap-4 md:gap-8 mb-4 md:mb-5">
      <div className="w-12 h-12 rounded-full bg-[#111827] flex items-center justify-center border border-[#1e293b]">
        <i className="ri-coins-line text-[#00D4FF] text-xl"></i>
      </div>

      <div>
       <h1
  className="text-lg md:text-2xl font-semibold leading-none bg-gradient-to-r from-[#00D4FF] to-[#0066FF] bg-clip-text text-transparent"
>
  Staking Overview
</h1>
        <p className="text-[#C5C5C5] text-xs md:text-sm mt-1">
          Track your staking balance and values
        </p>
      </div>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0">
      
      {/* Card */}
      <div className="flex flex-col items-center justify-center relative">
        <div className="flex items-center gap-2 text-[#94A3B8] text-xs md:text-sm">
          <i className="ri-stack-line text-xl text-[#00D4FF]"></i>
          <span>Staked Tokens</span>
        </div>

        <h2 className="text-[#00A5FF] text-lg md:text-xl font-bold mt-2">
          0.00
        </h2>

        {/* Divider */}
        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-12 w-[1px] bg-[#12345f]"></div>
      </div>

      {/* Card */}
      <div className="flex flex-col items-center justify-center relative">
        <div className="flex items-center gap-2 text-[#94A3B8] text-xs md:text-sm">
          <i className="ri-lock-line text-xl text-[#00D4FF]"></i>
          <span>Locked Liquidity</span>
        </div>

        <h2 className="text-[#00A5FF] text-lg md:text-xl font-bold mt-2">
          0.00
        </h2>

        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-12 w-[1px] bg-[#12345f]"></div>
      </div>

      {/* Card */}
      <div className="flex flex-col items-center justify-center relative">
        <div className="flex items-center gap-2 text-[#94A3B8] text-xs md:text-sm">
          <i className="ri-funds-line text-xl text-[#00D4FF]"></i>
          <span>Staked Value</span>
        </div>

        <h2 className="text-[#00A5FF] text-lg md:text-xl font-bold mt-2">
          0.00
        </h2>

        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-12 w-[1px] bg-[#12345f]"></div>
      </div>

      {/* Card */}
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center gap-2 text-[#94A3B8] text-xs md:text-sm">
          <i className="ri-wallet-3-line  text-xl text-[#00D4FF]"></i>
          <span>Locked Value</span>
        </div>

        <h2 className="text-[#00A5FF] text-lg md:text-xl font-bold mt-2">
          0.00
        </h2>
      </div>
    </div>
  </div>
</Grid>

                  
                  <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
                    <div className="bootsrab_tabs">
                      <ul className="nav nav-tabs">
                        <li className="active">
                          <a
                            data-toggle="tab"
                            href="#Fixed"
                            className="active"
                            onClick={() => activity("fixed")}
                          >
                            Fixed
                          </a>
                        </li>
                        <li>
                          <a
                            data-toggle="tab"
                            href="#Flexible"
                            onClick={() => activity("flexible")}
                          >
                            Flexible
                          </a>
                        </li>
                        <li>
                          <a
                            data-toggle="tab"
                            href="#Yield"
                            onClick={() => activity("yield")}
                          >
                            Yield
                          </a>
                        </li>{" "}
                        {authToken == true ? (
                          <li>
                            <a
                              data-toggle="tab"
                              href="#History"
                              onClick={() => activity("")}
                            >
                              History
                            </a>
                          </li>
                        ) : (
                          ""
                        )}
                      </ul>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                    <div className="search_bar">
                      <i className="ri-search-line"></i>
                      <input
                        type="text"
                        onChange={(e) => searchToken(e.target.value)}
                        placeholder="Search"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div className="tab-content">
                      <div id="Fixed" className="tab-pane fade in active show">
                        {historyLoader == true ? (
                          <Grid item xs={12} sm={12} md={8} lg={12} xl={12}>
                            <div className="loading">
                              <i className="fa-solid fa-spinner fa-spin-pulse "></i>
                            </div>
                          </Grid>
                        ) : (
                          <Grid
                            container
                            spacing={2}
                            justifyContent={"start"}
                            marginBottom={10}
                          >
                            {/* Item for xs (extra small) screens */}

                            {stakeDetails.length > 0
                              ? stakeDetails.map((item, i) => {
                                  return (
                                    <Grid
                                      item
                                      xs={12}
                                      className="stake-card-grid-item"
                                    >
                                      <div className="card_launchpad stake_home">
                                        <div className="header_launc">
                                          <div className="coin_launch">
                                            <img src={item.currencyImage} />{" "}
                                            <h5>
                                              {item.currencyname}{" "}
                                              <span>{item.currencySymbol}</span>
                                            </h5>
                                          </div>
                                          <div className="Srake_status">
                                            <span>FIXED</span>
                                          </div>
                                        </div>
                                        <hr />


                                        {/* <div className="stake_button">
                                          <h4>
                                            <div className="colo_bold">
                                              {staking1 &&
                                              staking1.id == item._id ? (
                                                <small>{apy} % </small>
                                              ) : (
                                                <small>0 %</small>
                                              )}
                                            </div>{" "}
                                            {authToken == false ? (
                                              <Button
                                                type="button"
                                                data-toggle="modal"
                                                className="login_button"
                                                data-target="#stacknow"
                                              >
                                                <Link to="/login">
                                                  Login to continue!
                                                </Link>
                                              </Button>
                                            ) : staking1 &&
                                              staking1.id == item._id ? (
                                              <Button
                                                className="notactive"
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
                                          </h4>
                                        </div> */}

                                        <div className="flex items-center justify-between gap-4 flex-wrap mt-4">
  <div className="flex flex-col">
    <span className="text-[#94A3B8] text-xs">APY</span>
    <small className="text-[24px] font-semibold bg-gradient-to-r from-[#00D4FF] to-[#0066FF] bg-clip-text text-transparent">
      {staking1 && staking1.id == item._id ? `${apy}%` : "0%"}
    </small>
  </div>

  {/* Buttons */}
  <div>
    {authToken == false ? (
      <Link to="/login">
        <button
          type="button"
          className="
            px-6 py-2.5 rounded-xl
            border border-[#0066FF]
            bg-gradient-to-r from-[#00D4FF] to-[#0066FF]
            text-white font-medium text-sm
            hover:scale-[1.02]
            transition-all duration-300
            shadow-[0_0_20px_rgba(0,102,255,0.35)]
          "
        >
          Login to Continue
        </button>
      </Link>
    ) : staking1 && staking1.id == item._id ? (
      <button
        type="button"
        data-toggle="modal"
        data-target="#stacknow"
        onClick={() => stakeNow(item, "fixed")}
        className="
          px-6 py-2.5 rounded-xl
          border !border-[#00D4FF]
          
          text-white font-medium text-sm
          hover:scale-[1.02]
          transition-all duration-300
       
        "
      >
        Stake Now
      </button>
    ) : (
      <button
        type="button"
        onClick={() => choosePlan(item)}
        className="
          px-6 py-2.5 rounded-xl
          border !border-[#00D4FF]
         text-transparent
bg-clip-text
bg-[linear-gradient(135deg,#00D4FF_0%,#0066FF_100%)] font-medium text-sm
          hover:scale-[1.02]
          transition-all duration-300
          
        "
      >
        Stake Now
      </button>
    )}
  </div>
</div>



                                        <div className="data_launc">
                                          <p className="flex_content_stake">
                                            Minimum Stake:
                                            <span>
                                              {/* {item.minimumStaking}{" "} */}
                                              {parseFloat(
                                                item.minimumStaking
                                              ).toFixed(8)}{" "}
                                              {item.currencySymbol}
                                            </span>
                                          </p>
                                        </div>
                                        <div className="select_duration">
                                          <p>Select Duration:</p>
                                          <ul className="nav nav-tabs">
                                            <li className="active">
                                              {staking1 &&
                                              staking1.status == "stake1" &&
                                              staking1.id == item._id ? (
                                                <a
                                                  className="30"
                                                  data-toggle="tab"
                                                  onClick={() =>
                                                    chooseDuration(
                                                      "stake1",
                                                      item,
                                                      item.firstDuration
                                                    )
                                                  }
                                                >
                                                  {item.firstDuration} D
                                                </a>
                                              ) : (
                                                <a
                                                  className="30"
                                                  data-toggle="tab"
                                                  onClick={() =>
                                                    chooseDuration(
                                                      "stake1",
                                                      item,
                                                      item.firstDuration
                                                    )
                                                  }
                                                >
                                                  {item.firstDuration} D
                                                </a>
                                              )}
                                            </li>
                                            <li>
                                              {staking1 &&
                                              staking1.status == "stake2" &&
                                              staking1.id == item._id ? (
                                                <a
                                                  className="30"
                                                  data-toggle="tab"
                                                  onClick={() =>
                                                    chooseDuration(
                                                      "stake2",
                                                      item,
                                                      item.secondDuration
                                                    )
                                                  }
                                                >
                                                  {item.secondDuration} D
                                                </a>
                                              ) : (
                                                <a
                                                  className="30"
                                                  data-toggle="tab"
                                                  selected
                                                  onClick={() =>
                                                    chooseDuration(
                                                      "stake2",
                                                      item,
                                                      item.secondDuration
                                                    )
                                                  }
                                                >
                                                  {item.secondDuration} D
                                                </a>
                                              )}
                                            </li>
                                            <li>
                                              {staking1 &&
                                              staking1.status == "stake3" &&
                                              staking1.id == item._id ? (
                                                <a
                                                  className="30"
                                                  data-toggle="tab"
                                                  selected
                                                  onClick={() =>
                                                    chooseDuration(
                                                      "stake3",
                                                      item,
                                                      item.thirdDuration
                                                    )
                                                  }
                                                >
                                                  {item.thirdDuration} D
                                                </a>
                                              ) : (
                                                <a
                                                  className="30"
                                                  data-toggle="tab"
                                                  onClick={() =>
                                                    chooseDuration(
                                                      "stake3",
                                                      item,
                                                      item.thirdDuration
                                                    )
                                                  }
                                                >
                                                  {item.thirdDuration} D
                                                </a>
                                              )}
                                            </li>{" "}
                                            <li>
                                              {staking1 &&
                                              staking1.status == "stake4" &&
                                              staking1.id == item._id ? (
                                                <a
                                                  className="30"
                                                  data-toggle="tab"
                                                  selected
                                                  onClick={() =>
                                                    chooseDuration(
                                                      "stake4",
                                                      item,
                                                      item.fourthDuration
                                                    )
                                                  }
                                                >
                                                  {item.fourthDuration} D
                                                </a>
                                              ) : (
                                                <a
                                                  className="30"
                                                  data-toggle="tab"
                                                  onClick={() =>
                                                    chooseDuration(
                                                      "stake4",
                                                      item,
                                                      item.fourthDuration
                                                    )
                                                  }
                                                >
                                                  {item.fourthDuration} D
                                                </a>
                                              )}
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </Grid>
                                  );
                                })
                              : 0}
                          </Grid>
                        )}
                      </div>
                      <div id="Flexible" className="tab-pane fade">
                        <Grid
                          container
                          spacing={2}
                          justifyContent={"start"}
                          marginBottom={10}
                        >
                          {/* Item for xs (extra small) screens */}
                          {stakeDetails.length > 0
                            ? stakeDetails.map((item, i) => {
                                return (
                                  <Grid
                                    item
                                    xs={12}
                                    className="stake-card-grid-item"
                                  >
                                    <div className="card_launchpad stake_home">
                                      <div className="header_launc">
                                        <div className="coin_launch">
                                          <img src={item.currencyImage} />{" "}
                                          <h5>
                                            {item.currencyname}{" "}
                                            <span>{item.currencySymbol}</span>
                                          </h5>
                                        </div>
                                        <div className="Srake_status">
                                          <span>Flexible</span>
                                        </div>
                                      </div>
                                      <hr />

                                        <div className="flex items-center justify-between gap-4 flex-wrap mt-4">
  <div className="flex flex-col">
    <span className="text-[#94A3B8] text-xs">APY</span>
    <small className="text-[24px] font-semibold bg-gradient-to-r from-[#00D4FF] to-[#0066FF] bg-clip-text text-transparent">
      {item.APRinterest ? `${item.APRinterest}%` : "0%"}
    </small>
  </div>

  {/* Button */}
  <div>
    {authToken == false ? (
      <Link to="/login">
        <button
          type="button"
          className="
            px-6 py-2.5 rounded-xl
            border border-[#0066FF]
            bg-gradient-to-r from-[#00D4FF] to-[#0066FF]
            text-white font-medium text-sm
            hover:scale-[1.02]
            transition-all duration-300
            shadow-[0_0_20px_rgba(0,102,255,0.35)]
          "
        >
          Login to Continue
        </button>
      </Link>
    ) : (
      <button
        type="button"
        onClick={() => stakeNow(item, "flexible")}
        className="
          px-6 py-2.5 rounded-xl
          border border-[#0066FF]
          bg-gradient-to-r from-[#00D4FF] to-[#0066FF]
          text-white font-medium text-sm
          hover:scale-[1.02]
          transition-all duration-300
          shadow-[0_0_20px_rgba(0,102,255,0.35)]
        "
      >
        Stake Now
      </button>
    )}
  </div>
</div>


                                      <div className="data_launc">
                                        <p className="flex_content_stake">
                                          Minimum Stake:
                                          <span>
                                            {item.minimumStakingflex}{" "}
                                            {item.currencySymbol}{" "}
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                  </Grid>
                                );
                              })
                            : 0}
                        </Grid>
                      </div>
                      <div id="Yield" className="tab-pane fade">
                        <div className="">
                          <ul className="tag_staking_yiedl nav nav-tabs ">
                            <li className="active">
                              <a
                                data-toggle="tab"
                                href="#oneYear"
                                className="active"
                                onClick={() => yieldYear("oneyear")}
                              >
                                1 Year
                              </a>
                            </li>
                            <li>
                              <a
                                data-toggle="tab"
                                href="#threeYears"
                                onClick={() => yieldYear("threeyear")}
                              >
                                3 Year
                              </a>
                            </li>
                            <li>
                              <a
                                data-toggle="tab"
                                href="#fiveYears"
                                onClick={() => yieldYear("fiveyear")}
                              >
                                5 Year
                              </a>
                            </li>
                          </ul>
                          <div className="tab-content mt-4">
                            <div
                              id="oneYear"
                              className="tab-pane fade in active show"
                            >
                              <Grid
                                container
                                spacing={2}
                                justifyContent={"start"}
                                marginBottom={10}
                              >
                                {/* Item for xs (extra small) screens */}
                                {stakeDetails.length > 0
                                  ? stakeDetails.map((item, i) => {
                                      return (
                                        <Grid
                                          item
                                          xs={12}
                                          className="stake-card-grid-item"
                                        >
                                          <div className="card_launchpad stake_home">
                                            <div className="header_launc">
                                              <div className="coin_launch">
                                                <img
                                                  src={item.currencyImage}
                                                  className="img-fluid "
                                                />{" "}
                                                <h5>
                                                  {item.currencyname}{" "}
                                                  <span>
                                                    {item.currencySymbol}
                                                  </span>
                                                </h5>
                                              </div>
                                              <div className="Srake_status">
                                                <span>Yield</span>
                                              </div>
                                            </div>
                                            <hr />
                                            <div className="stake_button">
                                              <h4>
                                                <div className="colo_bold">
                                                  <span>APY:</span>
                                                  {yieldID == item._id ? (
                                                    <small>{yieldAPY}%</small>
                                                  ) : (
                                                    <small>0 %</small>
                                                  )}
                                                </div>{" "}
                                                {/* <a
                                              onClick={() =>
                                                stakeNowYield(item, "yield")
                                              }
                                            >
                                              Stake
                                            </a> */}
                                                {authToken == false ? (
                                                  <Button
                                                    type="button"
                                                    data-toggle="modal"
                                                    className="login_button"
                                                    data-target="#stacknow"
                                                  >
                                                    <Link to="/login">
                                                      Login to continue!
                                                    </Link>
                                                  </Button>
                                                ) : (
                                                  <Button
                                                    type="button"
                                                    className="notactive"
                                                    onClick={() =>
                                                      stakeNowYield(
                                                        item,
                                                        "yield"
                                                      )
                                                    }
                                                  >
                                                    Stake
                                                  </Button>
                                                )}
                                              </h4>
                                            </div>
                                            <div className="data_launc">
                                              <p className="flex_content_stake">
                                                Minimum Stake:
                                                <span>
                                                  {item.minimumStakingYield}{" "}
                                                  {item.currencySymbol}{" "}
                                                </span>
                                              </p>
                                            </div>
                                            <div className="select_duration">
                                              <p>Select Duration:</p>
                                              <ul className="nav nav-tabs">
                                                <li className="active">
                                                  <a
                                                    data-toggle="tab"
                                                    className={
                                                      yieldDuration ==
                                                        "stake1" &&
                                                      item._id == yieldID
                                                        ? " 30 active"
                                                        : "30"
                                                    }
                                                    onClick={() =>
                                                      chooseDurationYield(
                                                        "stake1",
                                                        item
                                                      )
                                                    }
                                                  >
                                                    {item &&
                                                    yiledStakeType == 1 ? (
                                                      <p>
                                                        {
                                                          item.yiled_1_firstDuration
                                                        }{" "}
                                                        D
                                                      </p>
                                                    ) : yiledStakeType == 3 ? (
                                                      <p>
                                                        {
                                                          item.yiled_3_firstDuration
                                                        }{" "}
                                                        D
                                                      </p>
                                                    ) : yiledStakeType == 5 ? (
                                                      <p>
                                                        {
                                                          item.yiled_5_firstDuration
                                                        }{" "}
                                                        D
                                                      </p>
                                                    ) : (
                                                      "0 D"
                                                    )}
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    data-toggle="tab"
                                                    className={
                                                      yieldDuration ==
                                                        "stake1" &&
                                                      item._id == yieldID
                                                        ? " 30 active"
                                                        : "30"
                                                    }
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
                                                        D
                                                      </small>
                                                    ) : yiledStakeType == 3 ? (
                                                      <small>
                                                        {
                                                          item.yiled_3_secondDuration
                                                        }{" "}
                                                        D
                                                      </small>
                                                    ) : yiledStakeType == 5 ? (
                                                      <small>
                                                        {
                                                          item.yiled_5_secondDuration
                                                        }{" "}
                                                        D
                                                      </small>
                                                    ) : (
                                                      "0 D"
                                                    )}
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    data-toggle="tab"
                                                    className={
                                                      yieldDuration ==
                                                        "stake3" &&
                                                      item._id == yieldID
                                                        ? "active"
                                                        : ""
                                                    }
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
                                                        D
                                                      </small>
                                                    ) : yiledStakeType == 3 ? (
                                                      <small>
                                                        {
                                                          item.yiled_3_thirdDuration
                                                        }{" "}
                                                        D
                                                      </small>
                                                    ) : yiledStakeType == 5 ? (
                                                      <small>
                                                        {
                                                          item.yiled_5_thirdDuration
                                                        }{" "}
                                                        D
                                                      </small>
                                                    ) : (
                                                      "0 D"
                                                    )}
                                                  </a>
                                                </li>{" "}
                                                <li>
                                                  <a
                                                    data-toggle="tab"
                                                    href="#365"
                                                    className={
                                                      yieldDuration ==
                                                        "stake4" &&
                                                      item._id == yieldID
                                                        ? "active"
                                                        : ""
                                                    }
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
                                                        D
                                                      </small>
                                                    ) : yiledStakeType == 3 ? (
                                                      <small>
                                                        {
                                                          item.yiled_3_fourthDuration
                                                        }{" "}
                                                        D
                                                      </small>
                                                    ) : yiledStakeType == 5 ? (
                                                      <small>
                                                        {
                                                          item.yiled_5_fourthDuration
                                                        }{" "}
                                                        D
                                                      </small>
                                                    ) : (
                                                      "0 D"
                                                    )}
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </Grid>
                                      );
                                    })
                                  : 0}
                              </Grid>
                            </div>
                            <div id="threeYears" className="tab-pane fade">
                              <Grid
                                container
                                spacing={2}
                                justifyContent={"start"}
                                marginBottom={10}
                              >
                                {/* Item for xs (extra small) screens */}
                                {stakeDetails.length > 0
                                  ? stakeDetails.map((item, i) => {
                                      return (
                                        <Grid
                                          item
                                          xs={12}
                                          className="stake-card-grid-item"
                                        >
                                          <div className="card_launchpad stake_home">
                                            <div className="header_launc">
                                              <div className="coin_launch">
                                                <img
                                                  src={item.currencyImage}
                                                  className="img-fluid "
                                                />{" "}
                                                <h5>
                                                  {item.currencyname}{" "}
                                                  <span>
                                                    {item.currencySymbol}
                                                  </span>
                                                </h5>
                                              </div>
                                              <div className="Srake_status">
                                                <span>Yield</span>
                                              </div>
                                            </div>
                                            <hr />
                                            <div className="stake_button">
                                              <h4>
                                                <div className="colo_bold">
                                                  <span>APY:</span>
                                                  {yieldID == item._id ? (
                                                    <small>{yieldAPY}%</small>
                                                  ) : (
                                                    <small>0 %</small>
                                                  )}
                                                </div>{" "}
                                                {/* <a
                                              onClick={() =>
                                                stakeNowYield(item, "yield")
                                              }
                                            >
                                              Stake
                                            </a> */}
                                                {authToken == false ? (
                                                  <Button
                                                    type="button"
                                                    data-toggle="modal"
                                                    className="login_button"
                                                    data-target="#stacknow"
                                                  >
                                                    <Link to="/login">
                                                      Login to continue!
                                                    </Link>
                                                  </Button>
                                                ) : (
                                                  <Button
                                                    type="button"
                                                    className="notactive"
                                                    onClick={() =>
                                                      stakeNowYield(
                                                        item,
                                                        "yield"
                                                      )
                                                    }
                                                  >
                                                    Stake
                                                  </Button>
                                                )}
                                              </h4>
                                            </div>
                                            <div className="data_launc">
                                              <p className="flex_content_stake">
                                                Minimum Stake:
                                                <span>
                                                  {item.minimumStakingYield}{" "}
                                                  {item.currencySymbol}{" "}
                                                </span>
                                              </p>
                                            </div>
                                            <div className="select_duration">
                                              <p>Select Duration:</p>
                                              <ul className="nav nav-tabs">
                                                <li className="active">
                                                  <a
                                                    data-toggle="tab"
                                                    className={
                                                      yieldDuration ==
                                                        "stake1" &&
                                                      item._id == yieldID
                                                        ? " 30 active"
                                                        : "30"
                                                    }
                                                    onClick={() =>
                                                      chooseDurationYield(
                                                        "stake1",
                                                        item
                                                      )
                                                    }
                                                  >
                                                    {item &&
                                                    yiledStakeType == 1 ? (
                                                      <p>
                                                        {
                                                          item.yiled_1_firstDuration
                                                        }{" "}
                                                        D
                                                      </p>
                                                    ) : yiledStakeType == 3 ? (
                                                      <p>
                                                        {
                                                          item.yiled_3_firstDuration
                                                        }{" "}
                                                        D
                                                      </p>
                                                    ) : yiledStakeType == 5 ? (
                                                      <p>
                                                        {
                                                          item.yiled_5_firstDuration
                                                        }{" "}
                                                        D
                                                      </p>
                                                    ) : (
                                                      "0 D"
                                                    )}
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    data-toggle="tab"
                                                    className={
                                                      yieldDuration ==
                                                        "stake1" &&
                                                      item._id == yieldID
                                                        ? " 30 active"
                                                        : "30"
                                                    }
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
                                                        D
                                                      </small>
                                                    ) : yiledStakeType == 3 ? (
                                                      <small>
                                                        {
                                                          item.yiled_3_secondDuration
                                                        }{" "}
                                                        D
                                                      </small>
                                                    ) : yiledStakeType == 5 ? (
                                                      <small>
                                                        {
                                                          item.yiled_5_secondDuration
                                                        }{" "}
                                                        D
                                                      </small>
                                                    ) : (
                                                      "0 D"
                                                    )}
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    data-toggle="tab"
                                                    className={
                                                      yieldDuration ==
                                                        "stake3" &&
                                                      item._id == yieldID
                                                        ? "active"
                                                        : ""
                                                    }
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
                                                        D
                                                      </small>
                                                    ) : yiledStakeType == 3 ? (
                                                      <small>
                                                        {
                                                          item.yiled_3_thirdDuration
                                                        }{" "}
                                                        D
                                                      </small>
                                                    ) : yiledStakeType == 5 ? (
                                                      <small>
                                                        {
                                                          item.yiled_5_thirdDuration
                                                        }{" "}
                                                        D
                                                      </small>
                                                    ) : (
                                                      "0 D"
                                                    )}
                                                  </a>
                                                </li>{" "}
                                                <li>
                                                  <a
                                                    data-toggle="tab"
                                                    href="#365"
                                                    className={
                                                      yieldDuration ==
                                                        "stake4" &&
                                                      item._id == yieldID
                                                        ? "active"
                                                        : ""
                                                    }
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
                                                        D
                                                      </small>
                                                    ) : yiledStakeType == 3 ? (
                                                      <small>
                                                        {
                                                          item.yiled_3_fourthDuration
                                                        }{" "}
                                                        D
                                                      </small>
                                                    ) : yiledStakeType == 5 ? (
                                                      <small>
                                                        {
                                                          item.yiled_5_fourthDuration
                                                        }{" "}
                                                        D
                                                      </small>
                                                    ) : (
                                                      "0 D"
                                                    )}
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </Grid>
                                      );
                                    })
                                  : 0}
                              </Grid>
                            </div>
                            <div id="fiveYears" className="tab-pane fade">
                              <Grid
                                container
                                spacing={2}
                                justifyContent={"start"}
                                marginBottom={10}
                              >
                                {/* Item for xs (extra small) screens */}
                                {stakeDetails.length > 0
                                  ? stakeDetails.map((item, i) => {
                                      return (
                                        <Grid
                                          item
                                          xs={12}
                                          className="stake-card-grid-item"
                                        >
                                          <div className="card_launchpad stake_home">
                                            <div className="header_launc">
                                              <div className="coin_launch">
                                                <img
                                                  src={item.currencyImage}
                                                  className="img-fluid "
                                                />{" "}
                                                <h5>
                                                  {item.currencyname}{" "}
                                                  <span>
                                                    {item.currencySymbol}
                                                  </span>
                                                </h5>
                                              </div>
                                              <div className="Srake_status">
                                                <span>Yield</span>
                                              </div>
                                            </div>
                                            <hr />
                                            <div className="stake_button">
                                              <h4>
                                                <div className="colo_bold">
                                                  <span>APY:</span>
                                                  {yieldID == item._id ? (
                                                    <small>{yieldAPY}%</small>
                                                  ) : (
                                                    <small>0 %</small>
                                                  )}
                                                </div>{" "}
                                                {/* <a
                                              onClick={() =>
                                                stakeNowYield(item, "yield")
                                              }
                                            >
                                              Stake
                                            </a> */}
                                                {authToken == false ? (
                                                  <Button
                                                    type="button"
                                                    data-toggle="modal"
                                                    className="login_button"
                                                    data-target="#stacknow"
                                                  >
                                                    <Link to="/login">
                                                      Login to continue!
                                                    </Link>
                                                  </Button>
                                                ) : (
                                                  <Button
                                                    type="button"
                                                    className="notactive"
                                                    onClick={() =>
                                                      stakeNowYield(
                                                        item,
                                                        "yield"
                                                      )
                                                    }
                                                  >
                                                    Stake
                                                  </Button>
                                                )}
                                              </h4>
                                            </div>
                                            <div className="data_launc">
                                              <p className="flex_content_stake">
                                                Minimum Stake:
                                                <span>
                                                  {item.minimumStakingYield}{" "}
                                                  {item.currencySymbol}{" "}
                                                </span>
                                              </p>
                                            </div>
                                            <div className="select_duration">
                                              <p>Select Duration:</p>
                                              <ul className="nav nav-tabs">
                                                <li className="active">
                                                  <a
                                                    data-toggle="tab"
                                                    className={
                                                      yieldDuration ==
                                                        "stake1" &&
                                                      item._id == yieldID
                                                        ? " 30 active"
                                                        : "30"
                                                    }
                                                    onClick={() =>
                                                      chooseDurationYield(
                                                        "stake1",
                                                        item
                                                      )
                                                    }
                                                  >
                                                    {item &&
                                                    yiledStakeType == 1 ? (
                                                      <p>
                                                        {
                                                          item.yiled_1_firstDuration
                                                        }{" "}
                                                        D
                                                      </p>
                                                    ) : yiledStakeType == 3 ? (
                                                      <p>
                                                        {
                                                          item.yiled_3_firstDuration
                                                        }{" "}
                                                        D
                                                      </p>
                                                    ) : yiledStakeType == 5 ? (
                                                      <p>
                                                        {
                                                          item.yiled_5_firstDuration
                                                        }{" "}
                                                        D
                                                      </p>
                                                    ) : (
                                                      "0 D"
                                                    )}
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    data-toggle="tab"
                                                    className={
                                                      yieldDuration ==
                                                        "stake1" &&
                                                      item._id == yieldID
                                                        ? " 30 active"
                                                        : "30"
                                                    }
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
                                                        D
                                                      </small>
                                                    ) : yiledStakeType == 3 ? (
                                                      <small>
                                                        {
                                                          item.yiled_3_secondDuration
                                                        }{" "}
                                                        D
                                                      </small>
                                                    ) : yiledStakeType == 5 ? (
                                                      <small>
                                                        {
                                                          item.yiled_5_secondDuration
                                                        }{" "}
                                                        D
                                                      </small>
                                                    ) : (
                                                      "0 D"
                                                    )}
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    data-toggle="tab"
                                                    className={
                                                      yieldDuration ==
                                                        "stake3" &&
                                                      item._id == yieldID
                                                        ? "active"
                                                        : ""
                                                    }
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
                                                        D
                                                      </small>
                                                    ) : yiledStakeType == 3 ? (
                                                      <small>
                                                        {
                                                          item.yiled_3_thirdDuration
                                                        }{" "}
                                                        D
                                                      </small>
                                                    ) : yiledStakeType == 5 ? (
                                                      <small>
                                                        {
                                                          item.yiled_5_thirdDuration
                                                        }{" "}
                                                        D
                                                      </small>
                                                    ) : (
                                                      "0 D"
                                                    )}
                                                  </a>
                                                </li>{" "}
                                                <li>
                                                  <a
                                                    data-toggle="tab"
                                                    href="#365"
                                                    className={
                                                      yieldDuration ==
                                                        "stake4" &&
                                                      item._id == yieldID
                                                        ? "active"
                                                        : ""
                                                    }
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
                                                        D
                                                      </small>
                                                    ) : yiledStakeType == 3 ? (
                                                      <small>
                                                        {
                                                          item.yiled_3_fourthDuration
                                                        }{" "}
                                                        D
                                                      </small>
                                                    ) : yiledStakeType == 5 ? (
                                                      <small>
                                                        {
                                                          item.yiled_5_fourthDuration
                                                        }{" "}
                                                        D
                                                      </small>
                                                    ) : (
                                                      "0 D"
                                                    )}
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </Grid>
                                      );
                                    })
                                  : 0}
                              </Grid>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div id="History" className="tab-pane fade">
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          lg={12}
                          xl={12}
                          paddingTop={"0px"}
                          className="pt-0"
                        >
                          <div className="histroy_tabs">
                            <ul className="nav nav-tabs">
                              <li className="active">
                                <a
                                  data-toggle="tab"
                                  href="#Allhistory"
                                  className="active"
                                  onClick={() => onSelect("")}
                                >
                                  All
                                </a>
                              </li>
                              <li>
                                <a
                                  data-toggle="tab"
                                  onClick={() => onSelect("fixed")}
                                  href="#Fixedhistory"
                                >
                                  Fixed
                                </a>
                              </li>
                              <li>
                                <a
                                  data-toggle="tab"
                                  onClick={() => onSelect("Flexible")}
                                  href="#Flexiblehistory"
                                >
                                  Flexible
                                </a>
                              </li>
                              <li>
                                <a
                                  data-toggle="tab"
                                  onClick={() => onSelect("yield")}
                                  href="#Yieldhistory"
                                >
                                  Yield
                                </a>
                              </li>
                            </ul>
                            <div className="tab-content mt-4">
                              <div
                                id="Allhistory"
                                className="tab-pane fade in active show"
                              >
                                <div className="table_section">
                                  <div className="custom-table stake-tabel">
                                    <div className="table-row header history-table-header all">
                                      <div className="table-cell padding-left">
                                        Package
                                      </div>
                                      <div className="table-cell">Total Amount</div>
                                      <div className="table-cell">APY/APR</div>
                                      <div className="table-cell">Type</div>
                                      <div className="table-cell">
                                        Interest Cycle
                                      </div>
                                      <div className="table-cell">Stake Date</div>
                                      <div className="table-cell">
                                        Stake End Date
                                      </div>
                                      <div className="table-cell">
                                        Next Claim Date
                                      </div>
                                      <div className="table-cell">
                                        Total Interest
                                      </div>
                                      <div className="table-cell padding-right int-per-cycle">
                                        Int. per Cycle
                                      </div>
                                    </div>

                                    {stakeHistoryref.current &&
                                    stakeHistoryref.current.length > 0 ? (
                                      stakeHistoryref.current.map((item, i) => {
                                        var startdate = moment(
                                          item.startDate
                                        ).format("DD/MM/YYYY");
                                        var endtdate = moment(
                                          item.endDate
                                        ).format("DD/MM/YYYY");
                                        //console.log("item.date==", item.date);

                                        var get_time = new Date(
                                          item.date
                                        ).getTime();
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
                                        claim_date =
                                          moment(claim_date).format(
                                            "DD/MM/YYYY"
                                          );
                                        return (
                                          <div className="table-row border_table_row buttonddd">
                                            <div className="table-cell stake-cell">
                                              <div className="data_inner flex_image_coloe history-profile">
                                                <img src={item.currencyImage} />
                                                {item.stakeCurrencsymbol}
                                              </div>
                                            </div>
                                            <div className="table-cell stake-cell">
                                              <div className="data_inner all-history-data">
                                                {item.stakeAmont}{" "}
                                                {item.stakeCurrencsymbol}
                                              </div>
                                            </div>
                                            <div className="table-cell stake-cell">
                                              <div className="data_inner ">
                                                <span>{item.currentAPY}% </span>
                                              </div>
                                            </div>{" "}
                                            <div className="table-cell stake-cell">
                                              <div className="data_inner ">
                                                {item.type}
                                              </div>
                                            </div>{" "}
                                            <div className="table-cell stake-cell">
                                              <div className="data_inner ">
                                                {item.type == "fixed"
                                                  ? item.stakingPlan + " days"
                                                  : ""}{" "}
                                                {item.type == "yield"
                                                  ? item.YieldDuration + " days"
                                                  : ""}{" "}
                                                {item.type == "flexible"
                                                  ? "-"
                                                  : ""}{" "}
                                              </div>
                                            </div>{" "}
                                            <div className="table-cell stake-cell">
                                              <div className="data_inner ">
                                                {startdate}
                                              </div>
                                            </div>{" "}
                                            <div className="table-cell stake-cell">
                                              <div className="data_inner ">
                                                {" "}
                                                {item.type == "fixed" ||
                                                item.type == "yield"
                                                  ? endtdate
                                                  : "-"}
                                              </div>
                                            </div>{" "}
                                            <div className="table-cell stake-cell">
                                              <div className="data_inner ">
                                                {" "}
                                                {item.type == "fixed" ||
                                                item.type == "yield"
                                                  ? claim_date
                                                  : "-"}
                                              </div>
                                            </div>{" "}
                                            <div className="table-cell stake-cell">
                                              <div className="data_inner ">
                                                <span>
                                                  {" "}
                                                  {parseFloat(
                                                    item.totalInterest
                                                  ).toFixed(6)}{" "}
                                                  {item.stakeCurrencsymbol}
                                                </span>
                                              </div>
                                            </div>{" "}
                                            {/* <div className="table-cell">
                                          <div className="data_inner ">
                                            <span>0.0034 USDT</span>
                                          </div>
                                        </div> */}
                                            <div className="table-cell stake-cell">
                                              <div className="data_inner ">
                                                {item.type == "fixed" ? (
                                                  <div className="minimum">
                                                    <p>
                                                      {parseFloat(
                                                        item.totalInterest
                                                      ).toFixed(6)}{" "}
                                                      {item.stakeCurrencsymbol}
                                                    </p>
                                                    {item.status == 1 ? (
                                                      <button
                                                        className="active"
                                                        onClick={() =>
                                                          claimNow(item)
                                                        }
                                                      >
                                                        Claim Now
                                                      </button>
                                                    ) : item.status == 0 ? (
                                                      <button className="notactive">
                                                        {" "}
                                                        Claim
                                                      </button>
                                                    ) : (
                                                      <button className="notactive">
                                                        {" "}
                                                        Claimed
                                                      </button>
                                                    )}
                                                  </div>
                                                ) : item.type == "yield" ? (
                                                  <div className="minimum">
                                                    <p>
                                                      {parseFloat(
                                                        item.dailyinterest
                                                      ).toFixed(6)}{" "}
                                                      {item.stakeCurrencsymbol}
                                                    </p>
                                                    {item.status == 1 ? (
                                                      <button
                                                        className="active"
                                                        onClick={() =>
                                                          claimNow_yield(item)
                                                        }
                                                      >
                                                        Claim Now
                                                      </button>
                                                    ) : item.status == 0 ? (
                                                      <button className="notactive">
                                                        {" "}
                                                        Claim
                                                      </button>
                                                    ) : (
                                                      <button className="notactive">
                                                        {" "}
                                                        Claimed
                                                      </button>
                                                    )}
                                                  </div>
                                                ) : (
                                                  <div className="minimum">
                                                    <p>
                                                      {parseFloat(
                                                        item.totalInterest
                                                      ).toFixed(6)}{" "}
                                                      {item.stakeCurrencsymbol}
                                                    </p>
                                                    {item.status == 0 ? (
                                                      <button
                                                        className="active"
                                                        onClick={() =>
                                                          claimNowFlexible(item)
                                                        }
                                                      >
                                                        Claim Now
                                                      </button>
                                                    ) : (
                                                      <button
                                                        style={{
                                                          color: "#68e368",
                                                          border:
                                                            "1px solid #68e368",
                                                        }}
                                                      >
                                                        Claimed
                                                      </button>
                                                    )}
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })
                                    ) : (
                                      <div className="table-cell justify-center">
                                        <div className="data_inner ">
                                          No Staking History Found
                                        </div>
                                      </div>
                                    )}
                                    {stakeHistoryref.current.length > 0 ? (
                                      <Pagination
                                        itemClass="page-item"
                                        linkClass="page-link"
                                        activePage={currentPage}
                                        itemsCountPerPage={recordPerPage}
                                        totalItemsCount={total}
                                        pageRangeDisplayed={pageRange}
                                        onChange={handlePageChange}
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div id="Fixedhistory" className="tab-pane fade in">
                                <div className="table_section">
                                  <div className="custom-table stake-tabel">
                                    <div className="table-row header history-table-header fix">
                                      <div className="table-cell padding-left">
                                        Package
                                      </div>
                                      <div className="table-cell">Total Amount</div>
                                      <div className="table-cell">APY/APR</div>
                                      <div className="table-cell">Type</div>
                                      <div className="table-cell">
                                        Interest Cycle
                                      </div>
                                      <div className="table-cell">Stake Date</div>
                                      <div className="table-cell">
                                        Stake End Date
                                      </div>
                                      <div className="table-cell">
                                        Next Claim Date
                                      </div>
                                      <div className="table-cell">
                                        Total Interest
                                      </div>
                                      <div className="table-cell padding-right int-per-cycle">
                                        Int. per Cycle
                                      </div>
                                    </div>

                                    {stakeHistory_fixedref.current &&
                                    stakeHistory_fixedref.current.length > 0 ? (
                                      stakeHistory_fixedref.current.map((item, i) => {
                                        var startdate = moment(
                                          item.startDate
                                        ).format("DD/MM/YYYY");
                                        var endtdate = moment(
                                          item.endDate
                                        ).format("DD/MM/YYYY");
                                        //console.log("item.date==", item.date);

                                        var get_time = new Date(
                                          item.date
                                        ).getTime();
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
                                        claim_date =
                                          moment(claim_date).format(
                                            "DD/MM/YYYY"
                                          );
                                        return (
                                          <div className="table-row border_table_row buttonddd">
                                            <div className="table-cell stake-cell">
                                              <div className="data_inner flex_image_coloe history-profile">
                                                <img src={item.currencyImage} />
                                                {item.stakeCurrencsymbol}
                                              </div>
                                            </div>
                                            <div className="table-cell stake-cell">
                                              <div className="data_inner ">
                                                {item.stakeAmont}{" "}
                                                {item.stakeCurrencsymbol}
                                              </div>
                                            </div>
                                            <div className="table-cell stake-cell">
                                              <div className="data_inner ">
                                                <span>{item.currentAPY}% </span>
                                              </div>
                                            </div>{" "}
                                            <div className="table-cell stake-cell">
                                              <div className="data_inner ">
                                                {item.type}
                                              </div>
                                            </div>{" "}
                                            <div className="table-cell stake-cell">
                                              <div className="data_inner ">
                                                {item.type == "fixed"
                                                  ? item.stakingPlan + " days"
                                                  : ""}{" "}
                                                {item.type == "yield"
                                                  ? item.YieldDuration + " days"
                                                  : ""}{" "}
                                                {item.type == "flexible"
                                                  ? "-"
                                                  : ""}{" "}
                                              </div>
                                            </div>{" "}
                                            <div className="table-cell stake-cell">
                                              <div className="data_inner ">
                                                {startdate}
                                              </div>
                                            </div>{" "}
                                            <div className="table-cell stake-cell">
                                              <div className="data_inner ">
                                                {" "}
                                                {item.type == "fixed" ||
                                                item.type == "yield"
                                                  ? endtdate
                                                  : "-"}
                                              </div>
                                            </div>{" "}
                                            <div className="table-cell stake-cell">
                                              <div className="data_inner ">
                                                {" "}
                                                {item.type == "fixed" ||
                                                item.type == "yield"
                                                  ? claim_date
                                                  : "-"}
                                              </div>
                                            </div>{" "}
                                            <div className="table-cell stake-cell">
                                              <div className="data_inner ">
                                                <span>
                                                  {" "}
                                                  {parseFloat(
                                                    item.totalInterest
                                                  ).toFixed(6)}{" "}
                                                  {item.stakeCurrencsymbol}
                                                </span>
                                              </div>
                                            </div>{" "}
                                            {/* <div className="table-cell">
                                          <div className="data_inner ">
                                            <span>0.0034 USDT</span>
                                          </div>
                                        </div> */}
                                            <div className="table-cell stake-cell">
                                              <div className="data_inner ">
                                                {item.type == "fixed" ? (
                                                  <div className="minimum">
                                                    <p>
                                                      {parseFloat(
                                                        item.totalInterest
                                                      ).toFixed(6)}{" "}
                                                      {item.stakeCurrencsymbol}
                                                    </p>
                                                    {item.status == 1 ? (
                                                      <button
                                                        className="active"
                                                        onClick={() =>
                                                          claimNow(item)
                                                        }
                                                      >
                                                        Claim Now
                                                      </button>
                                                    ) : item.status == 0 ? (
                                                      <button className="notactive">
                                                        {" "}
                                                        Claim
                                                      </button>
                                                    ) : (
                                                      <button className="notactive">
                                                        {" "}
                                                        Claimed
                                                      </button>
                                                    )}
                                                  </div>
                                                ) : item.type == "yield" ? (
                                                  <div className="minimum">
                                                    <p>
                                                      {parseFloat(
                                                        item.dailyinterest
                                                      ).toFixed(6)}{" "}
                                                      {item.stakeCurrencsymbol}
                                                    </p>
                                                    {item.status == 1 ? (
                                                      <button
                                                        className="active"
                                                        onClick={() =>
                                                          claimNow_yield(item)
                                                        }
                                                      >
                                                        Claim Now
                                                      </button>
                                                    ) : item.status == 0 ? (
                                                      <button className="notactive">
                                                        {" "}
                                                        Claim
                                                      </button>
                                                    ) : (
                                                      <button className="notactive">
                                                        {" "}
                                                        Claimed
                                                      </button>
                                                    )}
                                                  </div>
                                                ) : (
                                                  <div className="minimum">
                                                    <p>
                                                      {parseFloat(
                                                        item.totalInterest
                                                      ).toFixed(6)}{" "}
                                                      {item.stakeCurrencsymbol}
                                                    </p>
                                                    {item.status == 0 ? (
                                                      <button
                                                        className="active"
                                                        onClick={() =>
                                                          claimNowFlexible(item)
                                                        }
                                                      >
                                                        Claim Now
                                                      </button>
                                                    ) : (
                                                      <button className="claimed_btn">
                                                        Claimed
                                                      </button>
                                                    )}
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })
                                    ) : (
                                      <div className="table-cell justify-center">
                                        <div className="data_inner ">
                                          No Staking History Found
                                        </div>
                                      </div>
                                    )}

                                    {stakeHistory_fixedref.current.length > 0 ? (
                                      <Pagination
                                        itemClass="page-item"
                                        linkClass="page-link"
                                        activePage={currentPage_fixed}
                                        itemsCountPerPage={recordPerPage_fixed}
                                        totalItemsCount={total_fixed}
                                        pageRangeDisplayed={pageRange_fixed}
                                        onChange={handlePageChange_fixed}
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div     
                                id="Flexiblehistory"
                                className="tab-pane fade in"
                              >
                                <div className="table_section">
                                  <div className="custom-table stake-tabel">
                                    <div className="table-row header history-table-header flexible">
                                      <div className="table-cell padding-left">
                                        Package
                                      </div>
                                      <div className="table-cell">Total Amount</div>
                                      <div className="table-cell">APY/APR</div>
                                      <div className="table-cell">Type</div>
                                      {/* <div className="table-cell">Interest Cycle</div> */}
                                      <div className="table-cell">Stake Date</div>
                                      {/* <div className="table-cell">Stake End Date</div>
                                  <div className="table-cell">Next Claim Date</div> */}
                                      <div className="table-cell">
                                        Total Interest
                                      </div>
                                      <div className="table-cell padding-right int-per-cycle">
                                        Int. per Cycle
                                      </div>
                                    </div>

                                    {stakeHistory_flexibleref.current &&
                                    stakeHistory_flexibleref.current.length > 0 ? (
                                      stakeHistory_flexibleref.current.map((item, i) => {
                                        var startdate = moment(
                                          item.startDate
                                        ).format("DD/MM/YYYY");
                                        var endtdate = moment(
                                          item.endDate
                                        ).format("DD/MM/YYYY");
                                        //console.log("item.date==", item.date);

                                        var get_time = new Date(
                                          item.date
                                        ).getTime();
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
                                        claim_date =
                                          moment(claim_date).format(
                                            "DD/MM/YYYY"
                                          );
                                        return (
                                          <div className="table-row border_table_row buttonddd">
                                            <div className="table-cell stake-cell">
                                              <div className="data_inner flex_image_coloe history-profile">
                                                <img src={item.currencyImage} />
                                                {item.stakeCurrencsymbol}
                                              </div>
                                            </div>

                                            <div className="table-cell stake-cell">
                                              <div className="data_inner all-history-data">
                                                {item.stakeAmont}{" "}
                                                {item.stakeCurrencsymbol}
                                              </div>
                                            </div>

                                            <div className="table-cell stake-cell">
                                              <div className="data_inner ">
                                                <span>{item.currentAPY}% </span>
                                              </div>
                                            </div>
                                            {""}
                                            <div className="table-cell stake-cell">
                                              <div className="data_inner ">
                                                {item.type}
                                              </div>
                                            </div>
                                            {""}
                                            {/* <div className="table-cell">
                                          <div className="data_inner ">
                                            {item.type == "fixed"
                                              ? item.stakingPlan + " days"
                                              : ""}{" "}
                                            {item.type == "yield"
                                              ? item.YieldDuration + " days"
                                              : ""}{" "}
                                            {item.type == "flexible" ? "-" : ""}{" "}
                                          </div>
                                        </div> */}
                                            {""}
                                            <div className="table-cell stake-cell">
                                              <div className="data_inner ">
                                                {startdate}
                                              </div>
                                            </div>
                                            {""}
                                            {/* <div className="table-cell">
                                          <div className="data_inner ">
                                            {" "}
                                            {item.type == "fixed" ||
                                            item.type == "yield"
                                              ? endtdate
                                              : "-"}
                                          </div>
                                        </div>{" "} */}
                                            {/* <div className="table-cell">
                                          <div className="data_inner ">
                                            {" "}
                                            {item.type == "fixed" ||
                                            item.type == "yield"
                                              ? claim_date
                                              : "-"}
                                          </div>
                                        </div>{" "} */}
                                            <div className="table-cell stake-cell">
                                              <div className="data_inner ">
                                                <span>
                                                  {" "}
                                                  {parseFloat(
                                                    item.totalInterest
                                                  ).toFixed(6)}{" "}
                                                  {item.stakeCurrencsymbol}
                                                </span>
                                              </div>
                                            </div>
                                            {""}
                                            {/* <div className="table-cell">
                                          <div className="data_inner ">
                                            <span>0.0034 USDT</span>
                                          </div>
                                        </div> */}
                                            <div className="table-cell stake-cell">
                                              <div className="data_inner ">
                                                {item.type == "fixed" ? (
                                                  <div className="minimum">
                                                    <p  className="all-history-data">
                                                      {parseFloat(
                                                        item.totalInterest
                                                      ).toFixed(6)}{" "}
                                                      {item.stakeCurrencsymbol}
                                                    </p>
                                                    {item.status == 1 ? (
                                                      <button
                                                        className="active"
                                                        onClick={() =>
                                                          claimNow(item)
                                                        }
                                                      >
                                                        Claim Now
                                                      </button>
                                                    ) : item.status == 0 ? (
                                                      <button className="notactive">
                                                        {" "}
                                                        Claim
                                                      </button>
                                                    ) : (
                                                      <button className="notactive">
                                                        {" "}
                                                        Claimed
                                                      </button>
                                                    )}
                                                  </div>
                                                ) : item.type == "yield" ? (
                                                  <div className="minimum">
                                                    <p >
                                                      {parseFloat(
                                                        item.dailyinterest
                                                      ).toFixed(6)}{" "}
                                                      {item.stakeCurrencsymbol}
                                                    </p>
                                                    {item.status == 1 ? (
                                                      <button
                                                        className="active"
                                                        onClick={() =>
                                                          claimNow_yield(item)
                                                        }
                                                      >
                                                        Claim Now
                                                      </button>
                                                    ) : item.status == 0 ? (
                                                      <button className="notactive">
                                                        {" "}
                                                        Claim
                                                      </button>
                                                    ) : (
                                                      <button className="notactive">
                                                        {" "}
                                                        Claimed
                                                      </button>
                                                    )}
                                                  </div>
                                                ) : (
                                                  <div className="minimum">
                                                    <p>
                                                      {parseFloat(
                                                        item.totalInterest
                                                      ).toFixed(6)}{" "}
                                                      {item.stakeCurrencsymbol}
                                                    </p>
                                                    {item.status == 0 ? (
                                                      <button
                                                        className="active"
                                                        onClick={() =>
                                                          claimNowFlexible(item)
                                                        }
                                                      >
                                                        Claim Now
                                                      </button>
                                                    ) : (
                                                      <button className="claimed_btn">
                                                        Claimed
                                                      </button>
                                                    )}
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })
                                    ) : (
                                      <div className="table-cell justify-center">
                                        <div className="data_inner ">
                                          No Staking History Found
                                        </div>
                                      </div>
                                    )}

                                    {stakeHistory_flexibleref.current.length > 0 ? (
                                      <Pagination
                                        itemClass="page-item"
                                        linkClass="page-link"
                                        activePage={currentPage_flexible}
                                        itemsCountPerPage={recordPerPage_flexible}
                                        totalItemsCount={total_flexible}
                                        pageRangeDisplayed={pageRange_flexible}
                                        onChange={handlePageChange_flexible}
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div id="Yieldhistory" className="tab-pane fade in">
                                <div className="table_section">
                                  <div className="custom-table stake-tabel">
                                    <div className="table-row header history-table-header yield">
                                      <div className="table-cell padding-left">
                                        Package
                                      </div>
                                      <div className="table-cell">Total Amount</div>
                                      <div className="table-cell">APY/APR</div>
                                      <div className="table-cell">Type</div>
                                      <div className="table-cell">
                                        Interest Cycle
                                      </div>
                                      <div className="table-cell">Stake Date</div>
                                      <div className="table-cell">
                                        Stake End Date
                                      </div>
                                      <div className="table-cell">
                                        Next Claim Date
                                      </div>
                                      <div className="table-cell">
                                        Total Interest
                                      </div>
                                      <div className="table-cell padding-righttable-row header int-per-cycle">
                                        Int. per Cycle
                                      </div>
                                    </div>

                                    {stakeHistory_yieldref.current &&
                                    stakeHistory_yieldref.current.length > 0 ? (
                                      stakeHistory_yieldref.current.map((item, i) => {
                                        var startdate = moment(
                                          item.startDate
                                        ).format("DD/MM/YYYY");
                                        var endtdate = moment(
                                          item.endDate
                                        ).format("DD/MM/YYYY");
                                        //console.log("item.date==", item.date);

                                        var get_time = new Date(
                                          item.date
                                        ).getTime();
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
                                        claim_date =
                                          moment(claim_date).format(
                                            "DD/MM/YYYY"
                                          );
                                        return (
                                          <div className="table-row border_table_row buttonddd">
                                            <div className="table-cell stake-cell">
                                              <div className="data_inner flex_image_coloe history-profile">
                                                <img src={item.currencyImage} />
                                                {item.stakeCurrencsymbol}
                                              </div>
                                            </div>
                                            <div className="table-cell stake-cell">
                                              <div className="data_inner ">
                                                {item.stakeAmont}{" "}
                                                {item.stakeCurrencsymbol}
                                              </div>
                                            </div>
                                            <div className="table-cell stake-cell">
                                              <div className="data_inner ">
                                                <span>{item.currentAPY}% </span>
                                              </div>
                                            </div>{" "}
                                            <div className="table-cell stake-cell">
                                              <div className="data_inner ">
                                                {item.type}
                                              </div>
                                            </div>{" "}
                                            <div className="table-cell stake-cell">
                                              <div className="data_inner ">
                                                {item.type == "fixed"
                                                  ? item.stakingPlan + " days"
                                                  : ""}{" "}
                                                {item.type == "yield"
                                                  ? item.YieldDuration + " days"
                                                  : ""}{" "}
                                                {item.type == "flexible"
                                                  ? "-"
                                                  : ""}{" "}
                                              </div>
                                            </div>{" "}
                                            <div className="table-cell stake-cell">
                                              <div className="data_inner ">
                                                {startdate}
                                              </div>
                                            </div>{" "}
                                            <div className="table-cell stake-cell">
                                              <div className="data_inner ">
                                                {" "}
                                                {item.type == "fixed" ||
                                                item.type == "yield"
                                                  ? endtdate
                                                  : "-"}
                                              </div>
                                            </div>{" "}
                                            <div className="table-cell stake-cell">
                                              <div className="data_inner ">
                                                {" "}
                                                {item.type == "fixed" ||
                                                item.type == "yield"
                                                  ? claim_date
                                                  : "-"}
                                              </div>
                                            </div>{" "}
                                            <div className="table-cell stake-cell">
                                              <div className="data_inner ">
                                                <span>
                                                  {" "}
                                                  {parseFloat(
                                                    item.totalInterest
                                                  ).toFixed(6)}{" "}
                                                  {item.stakeCurrencsymbol}
                                                </span>
                                              </div>
                                            </div>{" "}
                                            {/* <div className="table-cell">
                                          <div className="data_inner ">
                                            <span>0.0034 USDT</span>
                                          </div>
                                        </div> */}
                                            <div className="table-cell stake-cell">
                                              <div className="data_inner ">
                                                {item.type == "fixed" ? (
                                                  <div className="minimum">
                                                    <p>
                                                      {parseFloat(
                                                        item.totalInterest
                                                      ).toFixed(6)}{" "}
                                                      {item.stakeCurrencsymbol}
                                                    </p>
                                                    {item.status == 1 ? (
                                                      <button
                                                        className="active"
                                                        onClick={() =>
                                                          claimNow(item)
                                                        }
                                                      >
                                                        Claim Now
                                                      </button>
                                                    ) : item.status == 0 ? (
                                                      <button className="notactive">
                                                        {" "}
                                                        Claim
                                                      </button>
                                                    ) : (
                                                      <button className="notactive">
                                                        {" "}
                                                        Claimed
                                                      </button>
                                                    )}
                                                  </div>
                                                ) : item.type == "yield" ? (
                                                  <div className="minimum">
                                                    <p>
                                                      {parseFloat(
                                                        item.dailyinterest
                                                      ).toFixed(6)}{" "}
                                                      {item.stakeCurrencsymbol}
                                                    </p>
                                                    {item.status == 1 ? (
                                                      <button
                                                        className="active"
                                                        onClick={() =>
                                                          claimNow_yield(item)
                                                        }
                                                      >
                                                        Claim Now
                                                      </button>
                                                    ) : item.status == 0 ? (
                                                      <button className="notactive">
                                                        {" "}
                                                        Claim
                                                      </button>
                                                    ) : (
                                                      <button className="notactive">
                                                        {" "}
                                                        Claimed
                                                      </button>
                                                    )}
                                                  </div>
                                                ) : (
                                                  <div className="minimum">
                                                    <p>
                                                      {parseFloat(
                                                        item.totalInterest
                                                      ).toFixed(6)}{" "}
                                                      {item.stakeCurrencsymbol}
                                                    </p>
                                                    {item.status == 0 ? (
                                                      <button
                                                        className="active"
                                                        onClick={() =>
                                                          claimNowFlexible(item)
                                                        }
                                                      >
                                                        Claim Now
                                                      </button>
                                                    ) : (
                                                      <button
                                                        style={{
                                                          color:
                                                            "rgb(104, 227, 104)",
                                                        }}
                                                      >
                                                        Claimed
                                                      </button>
                                                    )}
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })
                                    ) : (
                                      <div className="table-cell justify-center">
                                        <div className="data_inner ">
                                          No Staking History Found
                                        </div>
                                      </div>
                                    )}

                                    {stakeHistory_yieldref.current.length > 0 ? (
                                      <Pagination
                                        itemClass="page-item"
                                        linkClass="page-link"
                                        activePage={currentPage_yield}
                                        itemsCountPerPage={recordPerPage_yield}
                                        totalItemsCount={total_yield}
                                        pageRangeDisplayed={pageRange_yield}
                                        onChange={handlePageChange_yield}
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Grid>
                      </div>
                    </div>
                  </Grid>
                </Grid>
                {/* Your other components and content */}
              </div>
            </div>

            
            <div className={step2}>
              <div maxWidth="class-padding">
                <Grid
                  container
                  spacing={2}
                  justifyContent={"center"}
                  marginTop={"20px"}
                >
                  <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
                    <div className=" new_card_logoki card_logoki  pading_cardd ">
                      <Grid
                        container
                        spacing={2}
                        justifyContent={"start"}
                        marginTop={"20px"}
                      >
                        {/* Item for xs (extra small) screens */}
                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                          <div className="form_content">
                            <Button
                              onClick={() => backfunction("back")}
                              className="back_butn"
                            >
                              <i
                                onClick={() => backfunction("back")}
                                className="ri-arrow-left-line"
                              ></i>{" "}
                              Back
                            </Button>
                          <h1 className="mb-4 !text-[#ffffff] text-left ">Fill in the Details</h1>
                          </div>
                          {stakeTyperef.current == "fixed" ||
                          stakeTyperef.current == "yield" ? (
                            <div className="step-5 ">
                              <div className="profile_content_image">
                                <div className="select_duration">
                                  <ul className="nav nav-tabs">
                                    {staking1 && staking1.status == "stake1" ? (
                                      <li className="active">
                                        <a
                                          data-toggle="tab"
                                          href="#Fixed"
                                          className="30 active"
                                          onClick={() =>
                                            chooseDuration(
                                              "stake1",
                                              currentPack,
                                              currentPack.firstDuration
                                            )
                                          }
                                        >
                                          {currentPack.firstDuration} D
                                        </a>
                                      </li>
                                    ) : (
                                      <li className="active">
                                        <a
                                          data-toggle="tab"
                                          href="#Fixed"
                                          className="30"
                                          onClick={() =>
                                            chooseDuration(
                                              "stake1",
                                              currentPack,
                                              currentPack.firstDuration
                                            )
                                          }
                                        >
                                          {currentPack.firstDuration} D
                                        </a>
                                      </li>
                                    )}
                                    {staking1 && staking1.status == "stake2" ? (
                                      <li className="active">
                                        <a
                                          data-toggle="tab"
                                          href="#Fixed"
                                          className="30 active"
                                          onClick={() =>
                                            chooseDuration(
                                              "stake2",
                                              currentPack,
                                              currentPack.firstDuration
                                            )
                                          }
                                        >
                                          {currentPack.secondDuration} D
                                        </a>
                                      </li>
                                    ) : (
                                      <li className="active">
                                        <a
                                          data-toggle="tab"
                                          href="#Fixed"
                                          className="30"
                                          onClick={() =>
                                            chooseDuration(
                                              "stake2",
                                              currentPack,
                                              currentPack.firstDuration
                                            )
                                          }
                                        >
                                          {currentPack.secondDuration} D
                                        </a>
                                      </li>
                                    )}
                                    {staking1 && staking1.status == "stake3" ? (
                                      <li className="active">
                                        <a
                                          data-toggle="tab"
                                          href="#Fixed"
                                          className="30 active"
                                          onClick={() =>
                                            chooseDuration(
                                              "stake3",
                                              currentPack,
                                              currentPack.firstDuration
                                            )
                                          }
                                        >
                                          {currentPack.thirdDuration} D
                                        </a>
                                      </li>
                                    ) : (
                                      <li className="active">
                                        <a
                                          data-toggle="tab"
                                          href="#Fixed"
                                          className="30"
                                          onClick={() =>
                                            chooseDuration(
                                              "stake3",
                                              currentPack,
                                              currentPack.firstDuration
                                            )
                                          }
                                        >
                                          {currentPack.thirdDuration} D
                                        </a>
                                      </li>
                                    )}
                                    {staking1 && staking1.status == "stake4" ? (
                                      <li className="active">
                                        <a
                                          data-toggle="tab"
                                          href="#Fixed"
                                          className="30 active"
                                          onClick={() =>
                                            chooseDuration(
                                              "stake4",
                                              currentPack,
                                              currentPack.firstDuration
                                            )
                                          }
                                        >
                                          {currentPack.fourthDuration} D
                                        </a>
                                      </li>
                                    ) : (
                                      <li className="active">
                                        <a
                                          data-toggle="tab"
                                          href="#Fixed"
                                          className="30"
                                          onClick={() =>
                                            chooseDuration(
                                              "stake4",
                                              currentPack,
                                              currentPack.firstDuration
                                            )
                                          }
                                        >
                                          {currentPack.fourthDuration} D
                                        </a>
                                      </li>
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={2}
                        justifyContent={"start"}
                        marginTop={"0px"}
                        className="pt-0"
                      >
                        <Grid item xs={12} className="">
                          <div className="APY">
                            <p>
                              APY
                              <span>
                                {stakingType == "fixed" ? apy : interest} %{" "}
                              </span>
                            </p>
                          </div>
                        </Grid>
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
                                <div className="form_login_section p-0 !mt-8 stake_box">
                                  <div className="form register_login p-0">
                                    <form className="form_pading_s">
                                      <div className="form-group">
                                        <label>Stake Amount</label>
                                        <div className="postion_reletitt">
                                          <input
                                            className="form-control my-4 !bg-[#2C2C2C] text-white !rounded-xl"
                                            id="exampleInputPassword1"
                                            placeholder="Stake Amount"
                                            name="password"
                                            value={stakeValue}
                                            onChange={stakeAmount}
                                            min="0"
                                            type="number"
                                          />
                                          <div className="input-group-addon max-btc-btn">
                                            <span
                                              className="text-success"
                                              onClick={maximum}
                                            >
                                              Max
                                            </span>
                                            <i className="font_normal">
                                              {currentPack.currencySymbol}
                                            </i>
                                          </div>
                                          <div className="line_border"></div>
                                        </div>
                                      </div>
                                      <div className="form-group flex_start_sae">
                                        <p className="preview">
                                          Available:
                                          <span>
                                            {parseFloat(
                                              stakeBalance.currencyBalance
                                            ).toFixed(6)}{" "}
                                            {currentPack.currencySymbol}
                                          </span>
                                        </p>
                                      </div>
                                      <div className="form-group flex_start_sae">
                                        <p className="preview">
                                          Minimum Stake:{" "}
                                          <span>
                                            {parseFloat(
                                              currentPack.minimumStaking
                                            ).toFixed(8)}{" "}
                                            {currentPack.currencySymbol}
                                          </span>
                                        </p>
                                      </div>
                                      <div className="form-group flex_start_sae">
                                        <p className="preview">
                                          Maximum Stake:{" "}
                                          <span>
                                            {currentPack.maximumStaking}{" "}
                                            {currentPack.currencySymbol}
                                          </span>
                                        </p>
                                      </div>
                                      <div className="line_border"></div>
                                    </form>
                                  </div>
                                </div>
                              </div>

                              <div className="mt-3">
                                {authToken && authToken == true ? (
                                  buttonLoader == false ? (
                                    <button
                                      className="btn btn-primary w-100"
                                      onClick={confirmStack}
                                    >
                                      Confirm
                                    </button>
                                  ) : (
                                    <button className="btn btn-primary w-100">
                                      Loading...
                                    </button>
                                  )
                                ) : (
                                  <button className="btn btn-primary w-100">
                                    login to continue
                                  </button>
                                )}
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
                              <div className="step-5  mt-5">
                                <div className="form_login_section p-0 mt-3 stake_box">
                                  <div className="form register_login p-0">
                                    <form className="form_pading_s">
                                      <div>
                                        <h4 className="h2_bottomn mb-3">
                                          Summary
                                        </h4>
                                      </div>

                                      <div className="form-group flex_start_sae">
                                        <p className="preview">
                                          Stake Date:
                                          <span>
                                            {stakingType == "fixed"
                                              ? fromDates
                                              : flexibleStartDate}{" "}
                                          </span>
                                        </p>
                                      </div>
                                      <div className="form-group flex_start_sae">
                                        <p className="preview">
                                          Interest End Date:
                                          <span>
                                            {stakingType == "fixed"
                                              ? toDates
                                              : "-"}{" "}
                                          </span>
                                        </p>
                                      </div>
                                      <div className="form-group flex_start_sae">
                                        <p className="preview">
                                          Stake Amount:{" "}
                                          <span>{stakeValue}</span>
                                        </p>
                                      </div>
                                      <div className="line_border mb-3"></div>

                                      <div className="form-group flex_start_sae">
                                        <p className="preview">
                                          APY:{" "}
                                          <span className="
        !bg-[linear-gradient(90deg,#03DDFD_0%,#0058F5_100%)]
        !bg-clip-text
        !text-transparent
       
      ">
                                            {stakingType == "fixed"
                                              ? apy
                                              : interest}{" "}
                                            %
                                          </span>
                                        </p>
                                      </div>
                                      <div className="form-group flex_start_sae">
                                        <p className="preview">
                                          Estimated Interest:{" "}
                                         <span
      className="
        !bg-[linear-gradient(90deg,#03DDFD_0%,#0058F5_100%)]
        !bg-clip-text
        !text-transparent
       
      "
    >
                                            {" "}
                                            {stakingType == "fixed"
                                              ? parseFloat(
                                                  userTotlaInterest
                                                ).toFixed(6)
                                              : parseFloat(
                                                  FlexibleEarn
                                                ).toFixed(10)}{" "}
                                            {stakeBalance.currencySymbol}{" "}
                                          </span>
                                        </p>
                                      </div>
                                      <div className="line_border"></div>
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
              </div>
            </div>

















            <div className={step3}>
              <div maxWidth="class-padding">
                <Grid
                  container
                  spacing={2}
                  justifyContent={"center"}
                  marginTop={"20px"}
                >
                  {/* Item for xs (extra small) screens */}
                  <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                    <div className="card_logoki pading_cardd new_card_logoki !bg-black ">
                      <div className="form_content">
                        <h1 className="mb-2 aling_flexx">
                          {" "}
                          <img
                            src={new URL("../../../img/New_images/sucess_2.png", import.meta.url).href}
                            className="img-fluid "
                          />
                          Successfully Staked!
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
                            <div className="form_login_section p-0 mt-4 stake_box">
                              <div className="form register_login p-0">
                                <form className="form_pading_s">
                                  <div className="form-group bg_tra_cades">
                                    <div className="section_class_grs">
                                      <label>Total Estimated Interest</label>
                                      <h4>
                                        {" "}
                                        {/* {stakingType == "fixed"
                                      ? parseFloat(userTotlaInterest).toFixed(6)
                                      : parseFloat(FlexibleEarn).toFixed(
                                          10
                                        )}{" "}
                                     */}
                                        {stakingType == "fixed"
                                          ? parseFloat(
                                              userTotlaInterest
                                            ).toFixed(6)
                                          : stakingType == "flexible"
                                          ? parseFloat(FlexibleEarn).toFixed(10)
                                          : stakingType == "yield"
                                          ? parseFloat(YieldEstimation).toFixed(
                                              8
                                            )
                                          : 0}
                                        {stakeBalance.currencySymbol}{" "}
                                      </h4>
                                    </div>
                                    {stakingType == "yield" ? (
                                      <div className="section_class_grs">
                                        <label>Interest Per Cycle</label>
                                        <h4>
                                          {" "}
                                          {YieldEstimation_interest === "null"
                                            ? 0
                                            : parseFloat(
                                                YieldEstimation_interest
                                              ).toFixed(8)}{" "}
                                          {stakeBalance.currencySymbol}{" "}
                                        </h4>
                                      </div>
                                    ) : (
                                      ""
                                    )}

                                    <div className="section_class_grs">
                                      <label>Stake Amount</label>
                                      <h5>{stakeValue}</h5>
                                    </div>
                                  </div>
                                  <div className="form-group flex_start_sae cardEdeded">
                                    <p className="preview mb-3">
                                      Stake Date:
                                      <span>
                                        {stakingType == "fixed"
                                          ? fromDates
                                          : stakingType == "yield"
                                          ? yiledstartDate
                                          : stakingType == "flexible"
                                          ? flexibleStartDate
                                          : ""}{" "}
                                      </span>
                                    </p>
                                    <p className="preview">
                                      Interest End Date:
                                      <span>
                                        {stakingType == "fixed"
                                          ? toDates
                                          : stakingType == "yield"
                                          ? yiledToDate
                                          : "-"}{" "}
                                      </span>
                                    </p>

                                    {stakingType == "yield" ? (
                                      <p className="preview">
                                        Next Claim Date:
                                        <span>{next_claimref.current} </span>
                                      </p>
                                    ) : (
                                      ""
                                    )}

                                    {stakingType == "fixed" ? (
                                      <p className="preview">
                                        Next Claim Date:
                                        <span>{toDates} </span>
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </form>
                                <div className="aling_caseds">
                                  <button
                                    type="button"
                                    className="btn btn-primary w-100 burdas_buttnd"
                                    onClick={() => backfunction("stake")}
                                  >
                                    Continue to Stake
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-primary w-100"
                                    onClick={() => backfunction("history")}
                                  >
                                    Go to History
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                </Grid>
                {/* Your other components and content */}
              </div>
            </div>

            

            <div className={step4}>
              <div maxWidth="class-padding">
                <Grid
                  container
                  spacing={2}
                  justifyContent={"center"}
                  marginTop={"20px"}
                >
                  <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
                    <div className="card_logoki pading_cardd new_card_logoki">
                      <Grid
                        container
                        spacing={2}
                        justifyContent={"start"}
                        marginTop={"20px"}
                      >
                        {/* Item for xs (extra small) screens */}
                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                          <div className="form_content">
                            <Button
                              onClick={() => backfunction("back")}
                              className="back_butn"
                            >
                              <i
                                onClick={() => backfunction("back")}
                                className="ri-arrow-left-line"
                              ></i>{" "}
                              Back
                            </Button>
                            <h1 className="mb-4 !text-[#ffffff] !text-left ">Fill in the Details</h1>
                          </div>
                          <div className="step-5 ">
                            <div className="profile_content_image">
                              <div className="select_duration">
                                {/* <ul className="nav nav-tabs">
                              {staking1 && staking1.status == "stake1" ? (
                                <li className="active">
                                  <a
                                    data-toggle="tab"
                                    href="#Fixed"
                                    className="30 active"
                                  >
                                    {currentPack.firstDuration} D
                                  </a>
                                </li>
                              ) : (
                                <li className="active">
                                  <a
                                    data-toggle="tab"
                                    href="#Fixed"
                                    className="30"
                                  >
                                    {currentPack.firstDuration} D
                                  </a>
                                </li>
                              )}
                              {staking1 && staking1.status == "stake2" ? (
                                <li className="active">
                                  <a
                                    data-toggle="tab"
                                    href="#Fixed"
                                    className="30 active"
                                  >
                                    {currentPack.secondDuration} D
                                  </a>
                                </li>
                              ) : (
                                <li className="active">
                                  <a
                                    data-toggle="tab"
                                    href="#Fixed"
                                    className="30"
                                  >
                                    {currentPack.secondDuration} D
                                  </a>
                                </li>
                              )}
                              {staking1 && staking1.status == "stake3" ? (
                                <li className="active">
                                  <a
                                    data-toggle="tab"
                                    href="#Fixed"
                                    className="30 active"
                                  >
                                    {currentPack.thirdDuration} D
                                  </a>
                                </li>
                              ) : (
                                <li className="active">
                                  <a
                                    data-toggle="tab"
                                    href="#Fixed"
                                    className="30"
                                  >
                                    {currentPack.thirdDuration} D
                                  </a>
                                </li>
                              )}
                              {staking1 && staking1.status == "stake4" ? (
                                <li className="active">
                                  <a
                                    data-toggle="tab"
                                    href="#Fixed"
                                    className="30 active"
                                  >
                                    {currentPack.fourthDuration} D
                                  </a>
                                </li>
                              ) : (
                                <li className="active">
                                  <a
                                    data-toggle="tab"
                                    href="#Fixed"
                                    className="30"
                                  >
                                    {currentPack.fourthDuration} D
                                  </a>
                                </li>
                              )}
                            </ul> */}
                              </div>
                            </div>
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
                              {/* <div className="APY">
                            <p>
                              APY
                              <span>
                                {stakingType == "fixed" ? apy : interest} %{" "}
                              </span>
                            </p>
                          </div> */}
                              <div className="step-5 ">
                                <div className="form_login_section p-0 mt-4 stake_box">
                                  <div className="form register_login p-0">
                                    <form className="form_pading_s">
                                      <div className="form-group">
                                        <label>Stake Amount</label>
                                        <div className="postion_reletitt">
                                          <input
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Stake Amount"
                                            name="password"
                                            value={stakeValue}
                                            onChange={stakeAmount}
                                            min="0"
                                            type="number"
                                          />
                                          {validation == true ? (
                                            <p className="text-danger">
                                              {" "}
                                              Stake amount is required{" "}
                                            </p>
                                          ) : (
                                            ""
                                          )}
                                          <div className="input-group-addon max-btc-btn">
                                            <span
                                              className="text-success"
                                              onClick={maximum}
                                            >
                                              Max
                                            </span>
                                            <i className="font_normal">
                                              {currentPack.currencySymbol}
                                            </i>
                                          </div>
                                          <div className="line_border"></div>
                                        </div>
                                      </div>
                                      <div className="form-group flex_start_sae">
                                        <p className="preview">
                                          Available:
                                          <span>
                                            {parseFloat(
                                              stakeBalance.currencyBalance
                                            ).toFixed(6)}{" "}
                                            {currentPack.currencySymbol}
                                          </span>
                                        </p>
                                      </div>
                                      <div className="form-group flex_start_sae">
                                        <p className="preview">
                                          Minimum Stake:{" "}
                                          <span>
                                            {currentPack.minimumStakingYield}{" "}
                                            {currentPack.currencySymbol}
                                          </span>
                                        </p>
                                      </div>
                                      <div className="form-group flex_start_sae">
                                        <p className="preview">
                                          Maximum Stake:{" "}
                                          <span>
                                            {currentPack.maximumStakingYield}{" "}
                                            {currentPack.currencySymbol}
                                          </span>
                                        </p>
                                      </div>
                                      <div className="line_border"></div>
                                    </form>
                                  </div>
                                </div>
                                <button
                                  className="btn btn-primary w-100 mt-5"
                                  onClick={yieldCalculate}
                                >
                                  Calculate
                                </button>
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
                              <div className="step-5  mt-4 ml-3">
                                <div className="form_login_section p-0 mt-4 stake_box">
                                  <div className="form register_login p-0">
                                    <form className="form_pading_s">
                                      <div>
                                        <h4 className="h2_bottomn mb-3">
                                          Summary
                                        </h4>
                                      </div>

                                      <div className="form-group flex_start_sae">
                                        <p className="preview">
                                          Stake Date:
                                          <span>{fromDates} </span>
                                        </p>
                                      </div>
                                      <div className="form-group flex_start_sae">
                                        <p className="preview">
                                          Interest End Date:
                                          <span>{yiledToDate} </span>
                                        </p>
                                      </div>
                                      <div className="form-group flex_start_sae">
                                        <p className="preview">
                                          Stake Amount:{" "}
                                          <span>{stakeValue}</span>
                                        </p>
                                      </div>
                                      <div className="line_border mb-3"></div>

                                      <div className="form-group flex_start_sae">
                                        <p className="preview">
                                          APR:  <span className="
        !bg-[linear-gradient(90deg,#03DDFD_0%,#0058F5_100%)]
        !bg-clip-text
        !text-transparent
       
      " >{yieldAPY} %</span>
                                        </p>
                                      </div>
                                      <div className="form-group flex_start_sae">
                                        <p className="preview">
                                          Estimated Total Interest:{" "}
                                           <span className="
        !bg-[linear-gradient(90deg,#03DDFD_0%,#0058F5_100%)]
        !bg-clip-text
        !text-transparent
       
      " >
                                            {" "}
                                            {YieldEstimation === "null"
                                              ? 0
                                              : parseFloat(
                                                  YieldEstimation
                                                ).toFixed(8)}{" "}
                                            {stakeBalance.currencySymbol}{" "}
                                          </span>
                                        </p>
                                      </div>

                                      <div className="form-group flex_start_sae">
                                        <p className="preview">
                                          Estimated Interest per cycle:{" "}
                                          <span className="
        !bg-[linear-gradient(90deg,#03DDFD_0%,#0058F5_100%)]
        !bg-clip-text
        !text-transparent
       
      " >
                                            {" "}
                                            {YieldEstimation_interest === "null"
                                              ? 0
                                              : parseFloat(
                                                  YieldEstimation_interest
                                                ).toFixed(8)}{" "}
                                            {stakeBalance.currencySymbol}{" "}
                                          </span>
                                        </p>
                                      </div>
                                      <div className="line_border"></div>
                                    </form>
                                   
                                  </div>
                                  
                                </div>


                                 {authToken && authToken == true ? (
                                      buttonLoader == false ? (
                                        <button
                                          className="btn btn-primary w-100 mt-6"
                                          onClick={confirmStackYield}
                                        >
                                          Confirm
                                        </button>
                                      ) : (
                                        <button className="btn btn-primary  w-100 mt-6">
                                          Loading...
                                        </button>
                                      )
                                    ) : (
                                      <button className="btn btn-primary w-100 mt-6">
                                        login to continue
                                      </button>
                                    )}
                              </div>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                </Grid>
              </div>
       
            </div>


            
          </>
        )}
      </main>
    </div>
  );
}

export default Home;
