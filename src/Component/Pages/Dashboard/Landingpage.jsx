import React, { useEffect } from "react";
import Landing_header from "../../Newcomponent/Landing_header";
import { useNavigate } from "react-router-dom";
import apiService from "../../../core/service/detail";
import { getMethod } from "../../../core/service/common.api";
import useState from "react-usestateref";
import Slider from "react-slick";
import { socket } from "../../context/socket";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Hero from "../../Newcomponent/HomeHero";

import { RiTelegramLine } from "react-icons/ri";
import { RiYoutubeLine } from "react-icons/ri";
import { BsTwitterX } from "react-icons/bs";

const tickerData = [
  { symbol: "BTC", price: "$67,420", change: "+2.4%", positive: true },
  { symbol: "ETH", price: "$3,512", change: "+1.8%", positive: true },
  { symbol: "BNB", price: "$598", change: "+0.9%", positive: true },
  { symbol: "MATIC", price: "$0.88", change: "-0.6%", positive: false },
  { symbol: "BTC", price: "$67,420", change: "+2.4%", positive: true },
  { symbol: "ETH", price: "$3,512", change: "+1.8%", positive: true },
  { symbol: "BNB", price: "$598", change: "+0.9%", positive: true },
  { symbol: "MATIC", price: "$0.88", change: "-0.6%", positive: false },
];

import spotImg from "../../../img/home/trade/p2p-trade.jpg";
import p2pImg from "../../../img/home/trade/p2p-trade.jpg";
import futuresImg from "../../../img/home/trade/p2p-trade.jpg";
import launchpadImg from "../../../img/home/trade/p2p-trade.jpg";

import { FaCheck } from "react-icons/fa";


import {
  Activity,
  BarChart3,
  Shield,
  TrendingUp,
} from "lucide-react";

import { PiUserBold } from "react-icons/pi";


import { FaChevronRight, FaArrowRight } from "react-icons/fa";


import {
  FaLock,
  FaChartLine,
  FaShieldAlt,
  FaBullseye,
} from "react-icons/fa";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { MdLockOutline } from "react-icons/md";
import { TbTargetArrow } from "react-icons/tb";

import card1 from "../../../img/home/SECURITY/card1.png";
import card2 from "../../../img/home/SECURITY/card2.png";
import card3 from "../../../img/home/SECURITY/card3.png";
import card4 from "../../../img/home/SECURITY/card4.png";
import card5 from "../../../img/home/SECURITY/card5.png";
import card6 from "../../../img/home/SECURITY/card6.png";


function Home() {
  const navigate = useNavigate();
  const [currencylistData, setcurrencylistData] = useState([]);
  const [siteData, setsiteData] = useState({});

  useEffect(() => {
    gethomeCurrency();
    getSiteDetails();
  }, []);

  const gethomeCurrency = async () => {
    try {
      var data = { apiUrl: apiService.homeCurrency };
      var resp = await getMethod(data);
      if (resp.status == true) setcurrencylistData(resp.Message);
    } catch (error) {}
  };

  const getSiteDetails = async () => {
    try {
      var data = { apiUrl: apiService.getSiteDatas };
      var resp = await getMethod(data);
      if (resp.status == true) setsiteData(resp.data);
    } catch (error) {}
  };

  const navbar = (value) => navigate(value);



   const [activeTab, setActiveTab] = useState(1);

  const tradingProducts = [
    {
      id: 1,
      title: "Spot trading",
      image: spotImg,
      description:
        "Trade crypto securely with direct P2P transactions using UPI and bank transfers, escrow protection, instant matching, and zero trading fees."
    },
    {
      id: 2,
      title: "P2P trading",
      image: p2pImg,
      description:
        "Trade crypto securely with direct P2P transactions using UPI and bank transfers, escrow protection, instant matching, and zero trading fees."
    },
    {
      id: 3,
      title: "Futures",
      image: futuresImg,
      description:
        "Trade crypto securely with direct P2P transactions using UPI and bank transfers, escrow protection, instant matching, and zero trading fees."
    },
    {
      id: 4,
      title: "Launchpad",
      image: launchpadImg,
      description:
        "Trade crypto securely with direct P2P transactions using UPI and bank transfers, escrow protection, instant matching, and zero trading fees."
    }
  ];

  const activeData = tradingProducts.find(
    item => item.id === activeTab
  );


  const assets = [
    { name: "Bitcoin", symbol: "BTC" },
    { name: "Ethereum", symbol: "ETH" },
    { name: "BNB", symbol: "BNB" },
    { name: "Tether", symbol: "USDT" },
    { name: "Polygon", symbol: "MATIC" },
    { name: "+ more", symbol: "" },
  ];


  const cards = [
    {
      icon: <Activity size={42} />,
      label: "VALUATION",
      title: "Live INR pricing",
    },
    {
      icon: <BarChart3 size={42} />,
      label: "HISTORY",
      title: "Full deposit & withdrawal log",
    },
    {
      icon: <TrendingUp size={42} />,
      label: "ANALYTICS",
      title: "Asset-level insights",
    },
    {
      icon: <Shield size={42} />,
      label: "SECURITY",
      title: "Encrypted wallet access",
    },
  ];

  const cardss = [
    {
      label: "ENGINE",
      title: "Ultra-low latency matching",
    },
    {
      label: "EXECUTION",
      title: "Real-time order processing",
    },
    {
      label: "UPTIME SLA",
      title: "99.99% guaranteed",
    },
    {
      label: "ARCHITECTURE",
      title: "Horizontally scalable",
    },
  ];

  const steps = [
    {
      step: "Step 01",
      title: "Create account",
      desc: "Sign up with your email. Takes under 60 seconds.",
    },
    {
      step: "Step 02",
      title: "Complete KYC",
      desc: "Verify your identity with a govt. ID. Approved in minutes.",
    },
    {
      step: "Step 03",
      title: "Deposit funds",
      desc: "Add crypto or INR via UPI, bank transfer, or wallet.",
    },
    {
      step: "Step 04",
      title: "Start trading",
      desc: "Access all markets, tools, and products immediately.",
    },
  ];
 


  return (
    <div className="">
      <main className="main-content bg-[#000] bg-cover onlywhitee new_login_bb">
        <Landing_header />
        <Hero />

        <section className="w-full bg-[#0D1017] border-y border-[#1E2740] overflow-hidden">
          <div className="relative flex overflow-hidden">
            <div className="ticker-track flex min-w-max animate-marquee py-3">
              {[...tickerData, ...tickerData].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center whitespace-nowrap"
                >
                  <span className="mx-6 h-5 w-[1px] bg-[#1E2740]" />

                  <span className="text-[#E8EDF5] font-['JetBrains Mono'] font-[400] text-xs uppercase mr-2">
                    {item.symbol}
                  </span>

                  <span className="text-[#6B7A99] font-['JetBrains Mono'] font-[400] text-xs mr-2">
                    {item.price}
                  </span>

                  <span
                    className={`text-sm font-['JetBrains Mono'] font-[400]  ${
                      item.positive
                        ? "text-[#00C896]"
                        : "text-[#FF4B4B]"
                    }`}
                  >
                    {item.change}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>


        <section className="relative overflow-hidden bg-black py-8  sm:!py-14 lg:!py-24">

          {/* Left Top Glow */}
          <div className="absolute -top-20 -left-20 w-[450px] h-[450px] bg-[#00D4FF] opacity-20 blur-[160px]" />

          {/* Right Bottom Glow */}
          <div className="absolute -bottom-20 -right-10 w-[250px] h-[250px] bg-[#155DFC] opacity-50 blur-[180px]" />

          <div className="relative z-10 max-w-full !px-3 md:!px-6 lg:!px-10 xl:!px-16">
            <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-16 items-center">

              {/* ================= LEFT SIDE ================= */}
              <div>
                <div className="max-w-[520px] mx-auto lg:mx-0">

                  <div
                    className="
                      relative
                      overflow-hidden
                      sm:!rounded-[28px] rounded-[18px]
                      border !border-[#474747]
                      bg-[#000000]
                      shadow-[0_0_40px_rgba(0,102,255,0.15)]
                    "
                  >

                   

                    {/* Image */}
                    <img
                      src={activeData.image}
                      alt={activeData.title}
                      className="
                        w-full
                        sm:h-[585px] h-[400px]
                        object-cover
                      "
                    />

                    {/* Bottom Overlay */}
                    <div
                      className="
                        absolute
                        bottom-0
                        left-0
                        right-0
                        sm:!p-4 p-2
                        bg-gradient-to-t from-[#000000] to-[#00317B]
                      "
                    >
                      <p
                        className="
                          text-[#ffffff]
                          text-sm sm:text-base lg:text-lg font-[400] font-['DM Sans']
                          leading-[18px] sm:leading-[22px] lg:leading-[26px]
                          text-center
                          max-w-[456px]
                          mx-auto
                        "
                      >
                        {activeData.description}
                      </p>
                    </div>

                  </div>
                </div>
              </div>

              {/* ================= RIGHT SIDE ================= */}
              <div className="text-center md:!text-left">
                <div className="flex justify-center md:justify-start">
                      <p
                        className="
                          inline-flex items-center gap-2
                          text-[#00D4FF]
                          text-[10px] sm:text-xs
                          font-[400]
                          tracking-[1.4px]
                          font-['JetBrains_Mono']
                          uppercase
                          mb-3
                          px-4 py-2
                          rounded-full
                          bg-[#00D4FF0F]
                          border-t-[0.77px] border-t-[#00D4FF40]
                          shadow-[0px_3px_4px_0px_#00D4FF4D]
                        "
                      >
                        <span className="w-2 h-2 rounded-full bg-[#00D4FF] shadow-[0_0_8px_#00D4FF]"></span>
                        TRADING PRODUCTS
                      </p>
                    </div>

                <h2 className="text-white font-['Inter'] text-2xl sm:text-4xl md:text-5xl lg:text-[45px] font-[500] !leading-tight">
                  Four ways to trade One platform
                </h2>

                <p className="text-[#D0D0D0] font-[400] text-sm md:text-lg lg:text-base font-['DM Sans'] mt-3 max-w-full lg:max-w-[600px]">
                  Whether you're buying spot, going peer-to-peer,
                  trading with leverage, or investing in early-stage
                  projects — everything is accessible from a single account.
                </p>

                <div className=" mt-4 !lg:mt-8 flex flex-col gap-5">
                  {tradingProducts.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`
                        h-[60px]
                        rounded-full
                        flex items-center bg-[#000000]
                        px-6
                        text-left
                        transition-all duration-300
                        hover:bg-[linear-gradient(90deg,_#000000_0%,_rgba(0,102,255,0.5)_49.52%,_#000000_100%)]
                         hover:text-white
                         hover:shadow-[inset_0px_0px_38px_0px_#03316B]
                        border !border-[#000] !shadow-[inset_0px_0px_38px_0px_#03316B] text-[#D0D0D0] font-['DM Sans'] !font-[400] text-lg sm:text-xl lg:text-2xl

                        ${
                          activeTab === item.id
                            ? "bg-[linear-gradient(90deg,_#000000_0%,_rgba(0,102,255,0.5)_49.52%,_#000000_100%)] text-white !shadow-[inset_0px_0px_38px_0px_#03316B]"
                            : "bg-[#020814] text-[#D0D0D0] !font-[500] group-hover:bg-[linear-gradient(180deg,_#0054D1_0%,_rgba(0,102,255,0.3)_50.48%,_#0054D1_100%)]"
                        }
                      `}
                    >
                      <span
                        className={`
                          w-5 h-5 rounded-full mr-4
                          ${
                            activeTab === item.id
                              ? "bg-[linear-gradient(180deg,_#0054D1_0%,_rgba(0,102,255,0.3)_50.48%,_#0054D1_100%)]"
                              : "bg-[#000000] border !border-[#01337C] shadow-[0_0_12px_#00D4FF40] "
                          }
                        `}
                      />

                      {item.title}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        <section className="relative overflow-hidden font-['DM Sans'] bg-[#0A0A14] py-5  sm:!py-10 lg:!py-16">

          <div className="relative z-10 max-w-full !px-3 md:!px-6 lg:!px-10 xl:!px-16">

            {/* Badge */}
           <div className="flex justify-center ">
              <p
                className="
                  inline-flex items-center gap-2
                  text-[#00D4FF]
                  text-[10px] sm:text-xs
                  font-semibold
                  tracking-[1.4px]
                  font-['JetBrains_Mono']
                  uppercase
                  mb-3
                  px-4 py-2
                  rounded-full
                  bg-[#00D4FF0F]
                  border-t-[0.77px] border-t-[#00D4FF40]
                  shadow-[0px_3px_4px_0px_#00D4FF4D]
                "
              >
                <span className="w-2 h-2 rounded-full bg-[#00D4FF] shadow-[0_0_8px_#00D4FF]"></span>
                Earn
              </p>
            </div>

            {/* Heading */}
            <h2
              className="text-white font-['Inter'] text-2xl text-center sm:text-4xl md:text-5xl  font-[500] !leading-tight mt-2"
            >
              Your assets shouldn't sit idle
            </h2>

            {/* Description */}
            <p
              className="
                max-w-[720px]
                mx-auto
                text-center
                mt-3 font-[400] font-['DM Sans']
                text-[#D0D0D0]
                text-sm md:text-lg
                lg:text-base
                leading-7
              "
            >
              Stake supported cryptocurrencies and earned passive rewards. Choose your commitment level — flexible or fixed — with no hidden lock-in penalties.
            </p>

            {/* Cards */}
            <div className="grid lg:grid-cols-2 gap-6 mt-8 lg:!mt-14">

              {/* Flexible */}
              <div
                className="
                  rounded-[24px]
                  border !border-[#0746A94D]
                  bg-[#0A0A1499]
                  p-4 lg:!p-8
                "
              >
                <div className="flex justify-between items-center flex-wrap gap-3">
                  <h3 className="text-white font-['DM Sans'] text-lg sm:text-xl lg:text-2xl font-[700] ">
                    Flexible
                  </h3>

                  <span className="text-[#155DFC] text-xl sm:text-2xl lg:text-3xl font-[700] font-['DM Sans']">
                    Up to 12% APY
                  </span>
                </div>

                <p className="text-[#9CA3AF] font-[400] text-sm mt-4 lg:!mt-6">
                  Withdraw anytime. No minimum lock period.
                </p>

                <div className="mt-5 lg:!mt-8 space-y-4">
                  {[
                    "Rewards credited daily",
                    "No minimum stake amount",
                    "Instant un-staking",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3"
                    >
                      <FaCheck className="text-[#0073FF] text-sm" />
                      <span className="text-[#D1D5DB] font-[400] text-sm">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fixed */}
              <div
                className="
                   rounded-[24px]
                  border !border-[#0746A94D]
                  bg-[#0A0A1499]
                  p-4 lg:!p-8
                "
              >
                <div className="flex justify-between items-center flex-wrap gap-3">
                  <h3 className="text-white font-['DM Sans'] text-lg sm:text-xl lg:text-2xl font-[700] ">
                    Fixed-term
                  </h3>

                  <span className="text-[#155DFC] text-xl sm:text-2xl lg:text-3xl font-[700] font-['DM Sans']">
                    Up to 24% APY
                  </span>
                </div>

                <p className="text-[#9CA3AF] font-[400] text-sm mt-4 lg:!mt-6">
                  Higher rewards for committed durations.
                </p>

                <div className="mt-5 lg:!mt-8 space-y-4">
                  {[
                    "30 / 60 / 90-day terms",
                    "Boosted APY on longer terms",
                    "Auto-renew option available",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3"
                    >
                      <FaCheck className="text-[#00D4FF] text-sm" />
                      <span className="text-[#D1D5DB] font-[400] text-xs md:text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Assets */}
            <div className="mt-12">
              <p className="text-center text-[#6B7280] font-[600] font-[Inter] text-sm mb-4">
                Supported staking assets:
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                {assets.map((asset, index) => (
                  <div
                    key={index}
                    className=" !min-w-[150px]
                      px-5 py-3
                      rounded-xl
                      border !border-[#0073FF33]
                      bg-[#0746A914]
                      text-white font-[500] font-['Inter']
                      text-sm
                      flex items-center gap-2
                    "
                  >
                    <span>{asset.name}</span>
                    <span className="w-1 h-1 rounded-full bg-[#0073FF] "></span>

                    {asset.symbol && (
                      <span className="text-[#9CA3AF] font-[400] font-['DM Sans'] text-xs">
                         {asset.symbol}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        <section className="relative bg-black overflow-hidden py-5  sm:!py-10 lg:!py-16  !px-3 md:!px-6 lg:!px-10 xl:!px-16">
          {/* Left Glow */}
          <div className="absolute left-0 top-2 h-[80%] w-[300px] bg-[#155DFC]/30 blur-[100px]" />

          <div className="relative max-w-7xl mx-auto">
            {/* Top Content */}
            <div className="text-center mb-8 lg:!mb-12">
              <div className="flex justify-center ">
                <p
                  className="
                    inline-flex items-center gap-2
                    text-[#00D4FF]
                    text-[10px] sm:text-xs
                    font-semibold
                    tracking-[1.4px]
                    font-['JetBrains_Mono']
                    uppercase
                    mb-3
                    px-4 py-2
                    rounded-full
                    bg-[#00D4FF0F]
                    border-t-[0.77px] border-t-[#00D4FF40]
                    shadow-[0px_3px_4px_0px_#00D4FF4D]
                  "
                >
                  <span className="w-2 h-2 rounded-full bg-[#00D4FF] shadow-[0_0_8px_#00D4FF]"></span>
                  PORTFOLIO & WALLET
                </p>
              </div>

              {/* Heading */}
              <h2
                className="text-white max-w-[500px] mx-auto font-['Inter'] text-2xl text-center sm:text-4xl md:text-5xl  font-[500] !leading-tight mt-2"
              >
                Full visibility Complete control
              </h2>

              {/* Description */}
              <p
                className="
                  max-w-[700px]
                  mx-auto
                  text-center
                  mt-3 font-[400] font-['DM Sans']
                  text-[#D0D0D0]
                  text-sm sm:text-lg
                  lg:text-base
                  leading-7
                "
              >
                Track every asset, transaction, and performance metric from a single unified dashboard. Your entire crypto portfolio, in one place.
              </p>
            </div>

            {/* Cards */}
            <div className="grid sm:grid-cols-2 gap-6 lg:gap-10">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="
                    group
                    bg-[#0A0A1499]
                    border
                    !border-[#0746A9]
                    rounded-2xl
                    p-3 sm:!p-4 lg:!p-6 
                    min-h-[140px]
                    transition-all
                    duration-300
                    hover:shadow-[0_0_30px_rgba(0,102,255,0.25)]
                  "
                >
                  <div className="text-[#005EFF] mb-3">{card.icon}</div>

                  <p
                    className="
                      text-base sm:text-lg
                      tracking-[1px]
                      uppercase
                      text-[#6B7280] font-[500] font-['DM Sans'] 
                      mb-2
                    "
                  >
                    {card.label}
                  </p>

                  <h3
                    className="
                      text-white text-lg sm:text-xl font-['DM Sans'] font-[600]
                    "
                  >
                    {card.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        
        <section className="bg-black py-5  sm:!py-10 lg:!py-16  !px-3 md:!px-6 lg:!px-10 xl:!px-16">
          <div className="max-w-full">

            {/* Header */}
            <div className="text-center mb-8 lg:!mb-12">
              <div className="flex justify-center ">
                <p
                  className="
                    inline-flex items-center gap-2
                    text-[#00D4FF]
                    text-[10px] sm:text-xs
                    font-semibold
                    tracking-[1.4px]
                    font-['JetBrains_Mono']
                    uppercase
                    mb-3
                    px-4 py-2
                    rounded-full
                    bg-[#00D4FF0F]
                    border-t-[0.77px] border-t-[#00D4FF40]
                    shadow-[0px_3px_4px_0px_#00D4FF4D]
                  "
                >
                  <span className="w-2 h-2 rounded-full bg-[#00D4FF] shadow-[0_0_8px_#00D4FF]"></span>
                  SECURITY & COMPLIANCE
                </p>
              </div>

              {/* Heading */}
              <h2
                className="text-white max-w-[700px] mx-auto font-['Inter'] text-2xl text-center sm:text-4xl md:text-5xl  font-[500] !leading-tight mt-2"
              >
                Institutional-grade protection
              </h2>

              {/* Description */}
              <p
                className="
                  max-w-[700px]
                  mx-auto
                  text-center
                  mt-2 font-[400] font-['DM Sans']
                  text-[#D0D0D0]
                  text-sm sm:text-lg
                  lg:text-lg
                  leading-7
                "
              >
                Your assets and identity are protected by a multi-layered security stack. We monitor, verify, and protect — around the clock.
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 font-['DM Sans'] border !border-[#171717]">

              {/* Card 1 */}
              <div className="relative min-h-[470px] [min-width:480px]:min-h-[700px] sm:!min-h-[450px] md:!min-h-[600px] lg:!min-h-[500px] xl:!min-h-[587px] border !border-[#171717] overflow-hidden">
                <img
                  src={card1}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute bottom-4 sm:!bottom-8 left-3 sm:!left-8 right-3 sm:!right-8">
                  <h3 className="text-[#fff] font-[500] text-xl md:text-2xl lg:text-3xl ">
                    <span className="text-[#005EEB]">KYC </span> verification
                  </h3>

                  <div className="flex justify-between items-end mt-4">
                    <p className="text-[#9CA3AF] font-['DM Sans'] font-[400] text-sm md:base xl:text-lg mt-3 max-w-[220px]">
                      Advanced identity verification ensures every account is real and compliant.
                    </p>

                    <HiOutlineBadgeCheck
                      className="text-white"
                      size={80}
                    />
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="relative min-h-[470px] [min-width:480px]:min-h-[700px] sm:!min-h-[450px] md:!min-h-[600px] lg:!min-h-[500px] xl:!min-h-[587px] border !border-[#171717] overflow-hidden">
                <img
                  src={card2}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute top-4 sm:!top-8 left-3 sm:!left-8 right-3 sm:!right-8">
                <h3 className="text-[#fff] font-[500] text-xl md:text-2xl lg:text-3xl ">
                        <span className="text-[#005EEB]">Encrypted </span> transactions
                      </h3>
                  <div className="flex justify-between">
                    <div>
                      {/* <h3 className="text-[#fff] font-[500] text-xl md:text-2xl lg:text-3xl ">
                        <span className="text-[#005EEB]">Encrypted </span> transactions
                      </h3> */}

                      <p className="text-[#9CA3AF] font-['DM Sans'] font-[400] text-sm md:base xl:text-lg mt-3 max-w-[220px]">
                        All data in transit and at rest is protected with end-to-end encryption.
                      </p>
                    </div>

                    <FaLock
                      className="text-white"
                      size={72}
                    />
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="relative min-h-[470px] [min-width:480px]:min-h-[700px]  sm:!min-h-[450px] md:!min-h-[600px] lg:!min-h-[500px] xl:!min-h-[587px] border !border-[#171717] overflow-hidden">
                <img
                  src={card3}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute top-4 sm:!top-8 left-3 sm:!left-8 right-3 sm:!right-8">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-[#fff] font-[500] text-xl md:text-2xl lg:text-3xl ">
                         <span className="text-[#005EEB]">Anti-fraud </span> monitoring
                      </h3>

                      <p className="text-[#9CA3AF] font-['DM Sans'] font-[400] text-sm md:base xl:text-lg mt-3 max-w-[330px]">
                        Real-time systems detect and block suspicious activity before it reaches your account.
                      </p>
                    </div>


                   <div className="flex items-start py-3 px-2 justify-center  w-[62px] h-[141px] rounded-[39px] bg-gradient-to-b from-[#0018C3] to-black"> 
                    <FaChartLine
                      className="text-white"
                      size={39}
                    />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="relative min-h-[470px] [min-width:480px]:min-h-[700px] sm:!min-h-[450px] md:!min-h-[600px] lg:!min-h-[500px] xl:!min-h-[587px] border !border-[#171717] overflow-hidden">
                <img
                  src={card4}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute top-4 sm:!top-8 left-3 sm:!left-8 right-3 sm:!right-8">
                  <h3 className="text-[#fff] font-[500] text-xl md:text-2xl lg:text-3xl ">
                     Device <span className="text-[#005EEB]"> tracking</span> 
                  </h3>

                  <p className="text-[#9CA3AF] font-['DM Sans'] font-[400] text-sm md:base xl:text-lg mt-3 ">
                    Every login and session is logged. Unrecognized devices are flagged instantly.
                  </p>
                </div>
              </div>

              {/* Card 5 */}
              <div className="relative min-h-[470px] [min-width:480px]:min-h-[700px] sm:!min-h-[450px] md:!min-h-[600px] lg:!min-h-[500px] xl:!min-h-[587px]   border !border-[#171717] overflow-hidden">
                <img
                  src={card5}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute top-4 sm:!top-8 left-3 sm:!left-8 right-3 sm:!right-8">
                <h3 className="text-[#fff] font-[500] text-xl md:text-2xl lg:text-3xl ">
                         <span className="text-[#005EEB]">24/7 </span> monitoring
                      </h3>
                  <div className="flex justify-between">
                    <div>
                      {/* <h3 className="text-[#fff] font-[500] text-xl md:text-2xl lg:text-3xl ">
                         <span className="text-[#005EEB]">24/7 </span> monitoring
                      </h3> */}

                      <p className="text-[#9CA3AF] font-['DM Sans'] font-[400] text-sm md:base xl:text-lg mt-3 max-w-[250px]">
                        Our security team and automated systems operate continuously — no downtime.
                      </p>
                    </div>

                    <TbTargetArrow
                      className="text-white"
                      size={80}
                    />
                  </div>
                </div>
              </div>

              {/* Card 6 */}
              <div className="relative min-h-[470px] [min-width:480px]:min-h-[700px] sm:!min-h-[450px] md:!min-h-[600px] lg:!min-h-[500px] xl:!min-h-[587px] border !border-[#171717] overflow-hidden">
                <img
                  src={card6}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute top-4 sm:!top-8 left-3 sm:!left-8 right-3 sm:!right-8">
                  <h3 className="text-[#fff] font-[500] text-xl md:text-2xl lg:text-3xl ">
                    <span className="text-[#005EEB]">Regulatory </span> compliance
                  </h3>

                  <p className="text-[#9CA3AF] font-['DM Sans'] font-[400] text-sm md:base xl:text-lg mt-3 ">
                    Fully compliant with applicable financial regulations and reporting standards.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>


        
        <section className="relative overflow-hidden bg-black py-6  sm:!py-10 lg:!py-16 ">
          {/* Left Glow */}
          {/* <div className="absolute bottom-0 left-0 w-[450px] h-[250px] bg-[#155DFC]/20 blur-[120px]" /> */}

          {/* Right Glow */}
          <div className="absolute bottom-[-100px] right-0 w-[300px] h-[60%] bg-[#155DFC]/40 blur-[120px]" />

          <div className="relative max-w-full !px-3 md:!px-6 lg:!px-10 xl:!px-16">
            {/* Top Content */}
            <div className="grid lg:grid-cols-2 gap-4 sm:!gap-6 lg:!gap-10 items-start mb-10">
              {/* Left */}
              <div className="text-center lg:!text-left">
                <div className="flex justify-center lg:!justify-start">
                      <p
                        className="
                          inline-flex items-center gap-2
                          text-[#00D4FF]
                          text-[10px] sm:text-xs
                          font-[400]
                          tracking-[1.4px]
                          font-['JetBrains_Mono']
                          uppercase
                          mb-2
                          px-4 py-2
                          rounded-full
                          bg-[#00D4FF0F]
                          border-t-[0.77px] border-t-[#00D4FF40]
                          shadow-[0px_3px_4px_0px_#00D4FF4D]
                        "
                      >
                        <span className="w-2 h-2 rounded-full bg-[#00D4FF] shadow-[0_0_8px_#00D4FF]"></span>
                        INFRASTRUCTURE
                      </p>
                    </div>

                <h2 className="text-white font-['Inter'] text-2xl text-center lg:!text-left sm:text-4xl md:text-5xl lg:text-3xl xl:text-[45px] font-[500] !leading-tight">
                  Built to handle whatever the market throws at it
                </h2>
              </div>

              {/* Right */}
              <div className="text-center lg:!text-left">
                <p
                  className="
                    text-[#D0D0D0]
                    text-sm sm:text-base md:text-lg text-center lg:!text-left font-[400] font-['DM Sans']
                    md:leading-7 leading-5
                  "
                >
                  A high-performance trading engine designed for the most
                  demanding market conditions. Ultra-low latency, real-time
                  processing, and 99.99% uptime — not as a goal, but as a
                  baseline.
                </p>
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {cardss.map((item, index) => (
                <div
                  key={index}
                  className="
                    bg-[#0B0B17]
                    border
                    !border-[#155DFC33]
                    rounded-2xl
                    h-[130px]
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-center
                    px-3 md:!px-6
                    transition-all
                    duration-300
                    hover:border-[#155DFC]
                    hover:shadow-[0_0_30px_rgba(21,93,252,0.15)]
                  "
                >
                  <span
                    className="
                      text-[#6B7280]
                      text-xs sm:text-sm font-[700] font-['DM Sans']
                      uppercase
                      tracking-[1.5px]
                      mb-3
                    "
                  >
                    {item.label}
                  </span>

                  <h3
                    className="
                      text-white text-sm sm:text-base lg:text-lg
                      font-[700] font-['DM Sans']
                      leading-7
                    "
                  >
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-black py-6  sm:!py-10 lg:!py-16">
          {/* Left Glow */}
          <div className="absolute left-0 bottom-0 w-[260px] h-[75%] bg-[#155DFC]/40 blur-[140px]" />

          {/* Right Glow */}
          <div className="absolute right-0 top-[-120px] w-[280px] h-[90%] bg-[#155DFC]/40 blur-[140px]" />

          <div className="relative max-w-full !px-3 md:!px-6 lg:!px-10 xl:!px-16">
            {/* Header */}
            <div className="text-center mb-6 lg:!mb-12">
              <div className="flex justify-center ">
                    <p
                      className="
                        inline-flex items-center gap-2
                        text-[#00D4FF]
                        text-[10px] sm:text-xs
                        font-semibold
                        tracking-[1.4px]
                        font-['JetBrains_Mono']
                        uppercase
                        mb-3
                        px-4 py-2
                        rounded-full
                        bg-[#00D4FF0F]
                        border-t-[0.77px] border-t-[#00D4FF40]
                        shadow-[0px_3px_4px_0px_#00D4FF4D]
                      "
                    >
                      <span className="w-2 h-2 rounded-full bg-[#00D4FF] shadow-[0_0_8px_#00D4FF]"></span>
                      GETTING STARTED
                    </p>
                  </div>

                  {/* Heading */}
                  <h2
                    className="text-white max-w-[700px] mx-auto font-['Inter'] text-2xl text-center sm:text-4xl md:text-5xl  font-[500] !leading-tight mt-2"
                  >
                    From signup to first trade in minutes
                  </h2>

                  {/* Description */}
                  <p
                    className="
                      max-w-[700px]
                      mx-auto
                      text-center
                      mt-3 font-[400] font-['DM Sans']
                      text-[#D0D0D0]
                      text-sm sm:text-lg
                      lg:text-base
                      leading-7
                    "
                  >
                    No complexity. No unnecessary friction. Four steps and you're live.
                  </p>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6  md:!gap-10">
              {steps.map((item, index) => (
                <div key={index} className="relative">
                  {/* Step Label */}
                  <div className="text-end text-white mr-3 md:!mr-6 text-sm md:text-base font-[800] font-['DM Sans'] mb-2">
                    {item.step}
                  </div>

                  {/* Card */}
                  <div className="relative h-[90px]">
                    {/* Blue Circle Behind */}
                    <div
                      className="
                        absolute
                        left-0
                        top-1/2
                        -translate-y-1/2
                        w-[110px]
                        h-[110px]
                        rounded-full
                        bg-[#0054D1]
                        z-[1]
                      "
                    />

                    {/* Card */}
                    <div
                      className="
                        absolute
                        left-[18px]
                        right-0
                        h-[90px]
                        rounded-full
                        border
                        border-[#FFFFFFA8]
                        bg-[#00000003]
                        backdrop-blur-[17.8px]
                        flex
                        items-center
                        gap-[10px]
                        p-2
                        z-[2]
                      "
                    >
                      {/* Icon */}
                      <div
                        className="
                          shrink-0
                          w-[42px]
                          h-[42px]
                          rounded-full
                          bg-[#D9D9D9]
                          flex
                          items-center
                          justify-center
                        "
                      >
                        <PiUserBold
                          size={24}
                          className="text-[#005DFF]"
                          strokeWidth={2.5}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3
                          className="
                            text-white
                            text-sm
                            md:text-base
                            font-[600]
                            font-['DM Sans']
                            leading-tight
                            truncate
                          "
                        >
                          {item.title}
                        </h3>

                        <p
                          className="
                            text-[#EAEAEA]
                            text-[10px]
                            sm:text-xs
                            font-[400]
                            font-['DM Sans']
                            leading-[1.3]
                            mt-1
                          "
                        >
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-black py-6  sm:!py-10 lg:!py-16">
          <div className="max-w-full !px-3 md:!px-6 lg:!px-10 xl:!px-16 text-center">
            {/* Heading */}
            <h2
              className="
                text-white
                text-2xl sm:text-4xl md:text-5xl 
                md:text-[45px]
                leading-[110%]
                font-[500]
                font-['Inter']
                max-w-[650px]
                mx-auto
              "
            >
              Your first trade is one step
              away
            </h2>

            {/* Description */}
            <p
              className="
                text-[#D0D0D0] font-[400] font-['DM Sans']
                text-sm
                md:text-base
                leading-[150%]
                max-w-[600px]
                mx-auto
                mt-5
              "
            >
              Join a growing community of traders who demand security,
              speed, and transparency from their exchange. No minimums.
              No complexity. Just markets.
            </p>

            {/* Buttons */}
            <div
                    className="
                      flex
                      flex-row
                      flex-wrap
                      justify-center
                      items-center
                      gap-[18px]
                      mt-4
                    "
                  >
                    {/* Button 1 */}
                    <button
                      className="
                          sm:w-auto shrink-0
                        h-[49px] font-['DM Sans']
                        px-5
                        rounded-[16px]
                        flex items-center justify-center
                        gap-2.5
                        text-[#0B0E13]
                        text-sm
                        font-bold
                        bg-gradient
                        transition-all duration-300
                        hover:-translate-y-1
                        hover:shadow-[0_16px_40px_rgba(0,132,255,0.45)]
                      "
                    >
                      Create Free Account 
                      <FaArrowRight />
                    </button>
          
                    {/* Button 2 */}
                    <button
                      className="
                          sm:w-auto shrink-0
                        h-[49px]
                        px-4
                        rounded-[16px]
                        flex items-center justify-center
                        gap-2.5
                        text-[#E8EDF5]  font-['DM Sans']
                        text-sm
                        font-semibold 
                        border !border-[#1E2740]
                        bg-[#000]
                        backdrop-blur-md
                        transition-all duration-300
                        hover:-translate-y-1
                        hover:border-[#009dff] hover:border-2
                        hover:shadow-[0_16px_40px_rgba(0,132,255,0.45)]
                      "
                    >
                      Explore Markets
                      <FaChevronRight />
                    </button>
                  </div>
          </div>
        </section>


        {/* Footer */}
  
    <footer className="w-full !font-['DM Sans'] bg-black shadow-[inset_0px_0px_34px_0px_#00D4FF80] rounded-tl-[15px] rounded-tr-[15px]  pb-4 pt-10">
      
      {/* Main Footer Box */}
      <div
        className="
        w-full
       !px-3 md:!px-6 lg:!px-10 xl:!px-16
        pt-10
        pb-4"
      >
        {/* Top Section */}
        <div className="flex flex-col md:flex-row gap-12 lg:gap-0">

  {/* Left Side - 40% */}
  <div className="w-full md:w-[40%]">
    <img
      src={
        new URL("../../../img/home/finzoex_logo.png", import.meta.url).href
      }
      alt="FinzoEX"
      className="w-[148px] object-contain"
    />

    <p
      className="
      text-[#8B9DC3]
      text-sm
      font-[400]
      font-['DM Sans']
      leading-5
      mt-5
      max-w-[300px]"
    >
      The next-generation crypto exchange built for speed,
      security, and global scale.
    </p>

    {/* Social Icons */}
    <div className="flex items-center gap-4 mt-6">
      <a
        href="#"
        className="
        w-10 h-10
        rounded-full
        flex items-center justify-center
        text-[#8B9DC3]
                hover:text-[#ffffff]
        transition-all duration-300"
      >
        <RiTelegramLine size={28} />
      </a>

      <a
        href="#"
        className="
        w-10 h-10
        rounded-full
        flex items-center justify-center
        text-[#8B9DC3]
                hover:text-[#ffffff]
        transition-all duration-300"
      >
        <RiYoutubeLine size={28} />
      </a>

      <a
        href="#"
        className="
        w-10 h-10
        rounded-full
        flex items-center justify-center
        text-[#8B9DC3]
                hover:text-[#ffffff]
        transition-all duration-300"
      >
        <BsTwitterX size={22} />
      </a>
    </div>
  </div>

  {/* Right Side - 60% */}
  <div className="w-full md:w-[60%]">
    
   <div className="grid grid-cols-2 min-[400px]:grid-cols-3 gap-10">

      {/* Products */}
      <div>
        <h3
          className="
          text-[#8B9DC3]
          text-sm
          font-[600]
          uppercase
          tracking-[1px]
          mb-3"
        >
          Products
        </h3>

        <div className="flex flex-col gap-4">
  {[
    {
      name: "Spot Trading",
      link: "/spot-trading",
    },
    {
      name: "P2P Trading",
      link: "/p2p-trading",
    },
    {
      name: "Futures",
      link: "/futures",
    },
    {
      name: "Launchpad",
      link: "/launchpad",
    },
    {
      name: "Staking",
      link: "/staking",
    },
  ].map((item, index) => (
    <a
      key={index}
      href={item.link}
      className="
      text-[#8B9DC3]
      font-[400]
      text-sm
      hover:text-[#ffffff]
      transition-all duration-300"
    >
      {item.name}
    </a>
  ))}
</div>
      </div>

      {/* Company */}
      <div>
        <h3
          className="
          text-[#8B9DC3]
          text-sm
          font-[600]
          uppercase
          tracking-[1px]
          mb-3"
        >
          Company
        </h3>

        <div className="flex flex-col gap-4">
          {[

            {
      name: "Spot Trading",
      link: "/spot-trading",
    },
            {
      name: "About Us",
      link: "/about",
    },
            {
      name: "Careers",
      link: "/careers",
    },
            {
      name: "Blog",
      link: "/blog",
    },
            {
      name: "Press",
      link: "/press",
    },
          ].map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="
               text-[#8B9DC3] font-[400]
              text-sm
                hover:text-[#ffffff]
              transition-all duration-300"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>

      {/* Support */}
      <div>
        <h3
          className="
          text-[#8B9DC3]
          text-sm
          font-[600]
          uppercase
          tracking-[1px]
          mb-3"
        >
          Support
        </h3>

        <div className="flex flex-col gap-4">
          {[
            {
              name: "Help Center",
              link: "/help-center",
            },
            {
              name: "API Docs",
              link: "/api-docs",
            },
            {
              name: "Status",
              link: "/status",
            },
            {
              name: "Community",
              link: "/community",
            },
          ].map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="
              text-[#8B9DC3] font-[400]
              text-sm
                hover:text-[#ffffff]
              transition-all duration-300"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>

    </div>
  </div>
</div>

        {/* Bottom Bar */}
        <div
          className="
          mt-10
          pt-4
          border-t border-[#1E2740]
          flex flex-col md:flex-row
          items-center
          justify-between
          gap-4"
        >
          <p className="text-[#3D4F6E] text-sm font-[400] text-center md:text-left">
            © 2026 Exchange. All rights reserved.
          </p>

          <div className="flex items-center gap-5 flex-wrap justify-center">
            {[
              {
                name: "Privacy Policy",
                link: "/privacy-policy",
              },
              {
                name: "Terms of Service",
                link: "/terms-of-service",
              },
              {
                name: "Risk Disclosure",
                link: "/risk-disclosure",
              },
            ].map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="
                text-[#3D4F6E]
                text-sm
                hover:text-[#ffffff]
                transition-all duration-300"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
      </main>
    </div>
  );
}

export default Home;











// import React, { useEffect } from "react";
// import Landing_header from "../../Newcomponent/Landing_header";
// import { useNavigate } from "react-router-dom";
// import apiService from "../../../core/service/detail";
// import { getMethod } from "../../../core/service/common.api";
// import useState from "react-usestateref";
// import Slider from "react-slick";
// import { socket } from "../../context/socket";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import bannerImage from "../../../img/New_images/taikonx/banner_image.png";
// import darkBanner from "../../../img/New_images/taikonx/dark_banner.png";
// import bitcoinIcon from "../../../img/New_images/taikonx/bitcoin-icon.png";
// import arrowImg from "../../../img/New_images/taikonx/arrow.png";
// import logoLight from "../../../img/New_images/logo_light.png";
// import logoDark from "../../../img/New_images/logo_dark.png";

// function Home() {
//   const navigate = useNavigate();
//   const [currencylistData, setcurrencylistData] = useState([]);
//   const [siteData, setsiteData] = useState({});

//   useEffect(() => {
//     gethomeCurrency();
//     getSiteDetails();
//   }, []);

//   const gethomeCurrency = async () => {
//     try {
//       var data = { apiUrl: apiService.homeCurrency };
//       var resp = await getMethod(data);
//       if (resp.status == true) setcurrencylistData(resp.Message);
//     } catch (error) {}
//   };

//   const getSiteDetails = async () => {
//     try {
//       var data = { apiUrl: apiService.getSiteDatas };
//       var resp = await getMethod(data);
//       if (resp.status == true) setsiteData(resp.data);
//     } catch (error) {}
//   };

//   const navbar = (value) => navigate(value);

//   const settings = {
//     dots: false, arrows: false, vertical: true, infinite: true,
//     speed: 0, slidesToShow: 4, slidesToScroll: 1, autoplay: true, autoplaySpeed: 1000,
//   };

//   const settingsnew = {
//     dots: false, infinite: false, speed: 500, slidesToShow: 4,
//     slidesToScroll: 1, autoplay: true, autoplaySpeed: 1000,
//     responsive: [
//       { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3, infinite: true, dots: true } },
//       { breakpoint: 700,  settings: { slidesToShow: 2, slidesToScroll: 2, initialSlide: 2, infinite: false, dots: false } },
//       { breakpoint: 600,  settings: { slidesToShow: 2, slidesToScroll: 2, initialSlide: 2, infinite: false, dots: false } },
//       { breakpoint: 480,  settings: { slidesToShow: 1, slidesToScroll: 1, infinite: false, dots: false } },
//     ],
//   };

//   return (
//     <div className="">
//       <main className="main-content bg-cover onlywhitee new_login_bb">
//         <Landing_header />

//         {/* Banner */}
        
//         <section className="banner">
//           <div className="container-lg">
//             <div className="row">
//               <div className="col-lg-6 d-flex justify-content-lg-center align-items-center">
//                 <div className="bnr">
//                   <h1 className="banner-text">Begin Trading with your <br />Favorite Coins</h1>
//                   <p className="banner-content">
//                     Welcome to Taikonz! A next-gen Blockchain and Crypto Exchange platform
//                     that offers trader with an endless assets buy and selling feature with real money.
//                   </p>
//                   <button className="banner-btn mt-4" onClick={() => navbar("register")}>
//                     Get Started
//                   </button>
//                 </div>
//               </div>
//               <div className="col-lg-6">
//                 <div className="banner-image">
//                   <div className="lightmode-banner-image">
//                     <img src={bannerImage} alt="pic" className="img-fluid" />
//                   </div>
//                   <div className="darkmode-banner-image">
//                     <img src={darkBanner} alt="pic" className="img-fluid" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Slider */}
//         {/* <section className="slider">
//           <div className="container-lg">
//             <Slider {...settingsnew}>
//               {currencylistData && currencylistData.map((obj, i) => (
//                 <div className="slider-list" key={i}>
//                   <div className="slider-logo porel">
//                     <img src={obj.Currency_image} alt="pic" className="imgblur" width="60px" />
//                   </div>
//                   <div className="slider-logo">
//                     <img src={obj.Currency_image} alt="pic" className="posab" width="60px" />
//                   </div>
//                   <h4 className="slider-heading">{obj.currencyName}</h4>
//                   <p className="slider-text">{obj.currencySymbol}</p>
//                   <span className="slider-num">{obj.estimatedValueInUSDT}</span>
//                 </div>
//               ))}
//             </Slider>
//           </div>
//         </section> */}

//         {/* Why Taikonz */}
//         <section className="taikonz">
//           <div className="container-lg">
//             <div className="row">
//               <div className="col-lg-12">
//                 <div className="y-taikonz-contant">
//                   <h1>Why Taikonz?</h1>
//                   <p>
//                     We build crypto products that are simple, elegant and secure.
//                     Whether you are an individual or an institution, we want to help you
//                     buy, sell, and store your bitcoin and cryptocurrency.
//                   </p>
//                 </div>
//               </div>
//               {["Super Quick Kyc", "Fast Transactions", "Exceptional Security"].map((title, i) => (
//                 <div className="col-lg-4" key={i}>
//                   <div className="index_2">
//                     <div className="index_1">
//                       <img src={bitcoinIcon} className="img-fluid" alt="pic" />
//                       <h3>{title}</h3>
//                       <p>Swift execution for seizing market opportunities.</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Available Currencies */}
//         <section className="currency">
//           <div className="container-lg">
//             <div className="row">
//               <div className="col-lg-6">
//                 <div className="currency-content mt-5">
//                   <h1>Available Currencies</h1>
//                   <p>There are various crypto currencies available in Taikonz, and you may easily trade and invest in all of them.</p>
//                   <button className="currency-btn mt-4" onClick={() => navbar("trade/BTC_USDT")}>
//                     Explore all
//                   </button>
//                 </div>
//               </div>
//               <div className="col-lg-6">
//                 <div className="vertival_scrolls">
//                   <Slider {...settings}>
//                     {currencylistData && currencylistData.map((obj, i) => (
//                       <div key={i}>
//                         <div className="y-bitcoin1">
//                           <div className="y-bitcoin-logo">
//                             <div className="dex_default">
//                               <img src={obj.Currency_image} className="img-fluid w-10px" alt="pic" />
//                               <div className="y-bitcoin-content">{obj.currencyName}</div>
//                               <div className="btc">{obj.currencySymbol}</div>
//                             </div>
//                           </div>
//                           <div className="arrow">
//                             <img src={arrowImg} className="img-fluid" alt="pic" />
//                             <span>{obj.coin_change}%</span>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </Slider>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Investing */}
//         <section className="investing">
//           <div className="container-lg">
//             <div className="row">
//               <div className="col-lg-12">
//                 <div className="investing-content mb-5">
//                   <h1 className="investing-heading">Investing in crypto will<br /> be easier than ever.</h1>
//                   <p className="investing-text">Taikonz makes it easier to invest and trade in crypto currency than any other platform.</p>
//                 </div>
//               </div>
//               {[
//                 { num: "01", title: "Create Account", text: "Taikonz has the potential to execute millions of transactions every second." },
//                 { num: "02", title: "Add funds", text: "The top identity verification systems complete your KYC within a few hours." },
//                 { num: "03", title: "Start investing", text: "The organisation has done all necessary to make Taikonz the most secure exchange." },
//               ].map((item, i) => (
//                 <div className="col-lg-4" key={i}>
//                   <div className="x-investing">
//                     <div className="investing-logo">{item.num}</div>
//                     <div className="x-investing-content">
//                       <h3 className="x-investing-heading">{item.title}</h3>
//                       <p className="x-investing-text">{item.text}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Crypto Platform */}
//         <section className="crypto-platform">
//           <div className="container-lg">
//             <div className="row">
//               <div className="col-lg-7">
//                 <div className="crypto-platform-content">
//                   <h1 className="platform-heading">Crypto Exchange <br />Platform</h1>
//                   <p className="platform-text">
//                     A next-gen Blockchain and Crypto Exchange platform that offers trader
//                     with an endless assets buy and selling feature with real money.
//                   </p>
//                   <button className="banner-btn mt-4" onClick={() => navbar("trade/BTC_USDT")}>
//                     Start Trading
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Footer */}
//         <section className="footer">
//           <div className="container-lg">
//             <div className="row">
//               <div className="col-lg-4">
//                 <div className="footer-taikonz">
//                   <div className="curspoint">
//                     <div className="taikonz-logo">
//                       <img onClick={() => navbar("/")} src={logoLight} alt="logo" />
//                     </div>
//                     <div className="dark_taikonz-logo">
//                       <img onClick={() => navbar("/")} src={logoDark} alt="logo" />
//                     </div>
//                   </div>
//                   <div className="copyright">{siteData.copy_right_text}</div>
//                 </div>
//               </div>
//               <div className="col-lg-8">
//                 <div className="row">
//                   <div className="col-lg-3 col-sm-4">
//                     <h4 className="page">Pages</h4>
//                     <ul className="list-items">
//                       <li onClick={() => navbar("/")}>Privacy Policy</li>
//                       <li onClick={() => navbar("/")}>About Us</li>
//                       <li onClick={() => navbar("/")}>Contact Us</li>
//                     </ul>
//                   </div>
//                   <div className="col-lg-3 col-sm-4">
//                     <h4 className="page">Products</h4>
//                     <ul className="list-items">
//                       <li onClick={() => navbar("/Stakehome")}>Staking</li>
//                       <li onClick={() => navbar("/p2p")}>P2P</li>
//                       <li onClick={() => navbar("/launchpadlistnew")}>Launchpad</li>
//                       <li onClick={() => navbar("/trade/BTC_USDT")}>Trade</li>
//                     </ul>
//                   </div>
//                   <div className="col-lg-3 col-sm-4">
//                     <h4 className="page">Social Media</h4>
//                     <ul className="list-items">
//                       <a target="_blank" rel="noreferrer" href={siteData.linkedin_url}><li>LinkedIn</li></a>
//                       <a target="_blank" rel="noreferrer" href={siteData.insta_url}><li>Instagram</li></a>
//                       <a target="_blank" rel="noreferrer" href={siteData.twitter_url}><li>Twitter</li></a>
//                       <a target="_blank" rel="noreferrer" href={siteData.fb_url}><li>Facebook</li></a>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }

// export default Home;
