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

import bannerImage from "../../../img/New_images/taikonx/banner_image.png";
import darkBanner from "../../../img/New_images/taikonx/dark_banner.png";
import bitcoinIcon from "../../../img/New_images/taikonx/bitcoin-icon.png";
import arrowImg from "../../../img/New_images/taikonx/arrow.png";
import logoLight from "../../../img/New_images/logo_light.png";
import logoDark from "../../../img/New_images/logo_dark.png";

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

  const settings = {
    dots: false, arrows: false, vertical: true, infinite: true,
    speed: 0, slidesToShow: 4, slidesToScroll: 1, autoplay: true, autoplaySpeed: 1000,
  };

  const settingsnew = {
    dots: false, infinite: false, speed: 500, slidesToShow: 4,
    slidesToScroll: 1, autoplay: true, autoplaySpeed: 1000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3, infinite: true, dots: true } },
      { breakpoint: 700,  settings: { slidesToShow: 2, slidesToScroll: 2, initialSlide: 2, infinite: false, dots: false } },
      { breakpoint: 600,  settings: { slidesToShow: 2, slidesToScroll: 2, initialSlide: 2, infinite: false, dots: false } },
      { breakpoint: 480,  settings: { slidesToShow: 1, slidesToScroll: 1, infinite: false, dots: false } },
    ],
  };

  return (
    <div className="">
      <main className="main-content bg-cover onlywhitee new_login_bb">
        <Landing_header />

        {/* Banner */}
        <section className="banner">
          <div className="container-lg">
            <div className="row">
              <div className="col-lg-6 d-flex justify-content-lg-center align-items-center">
                <div className="bnr">
                  <h1 className="banner-text">Begin Trading with your <br />Favorite Coins</h1>
                  <p className="banner-content">
                    Welcome to Taikonz! A next-gen Blockchain and Crypto Exchange platform
                    that offers trader with an endless assets buy and selling feature with real money.
                  </p>
                  <button className="banner-btn mt-4" onClick={() => navbar("register")}>
                    Get Started
                  </button>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="banner-image">
                  <div className="lightmode-banner-image">
                    <img src={bannerImage} alt="pic" className="img-fluid" />
                  </div>
                  <div className="darkmode-banner-image">
                    <img src={darkBanner} alt="pic" className="img-fluid" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slider */}
        {/* <section className="slider">
          <div className="container-lg">
            <Slider {...settingsnew}>
              {currencylistData && currencylistData.map((obj, i) => (
                <div className="slider-list" key={i}>
                  <div className="slider-logo porel">
                    <img src={obj.Currency_image} alt="pic" className="imgblur" width="60px" />
                  </div>
                  <div className="slider-logo">
                    <img src={obj.Currency_image} alt="pic" className="posab" width="60px" />
                  </div>
                  <h4 className="slider-heading">{obj.currencyName}</h4>
                  <p className="slider-text">{obj.currencySymbol}</p>
                  <span className="slider-num">{obj.estimatedValueInUSDT}</span>
                </div>
              ))}
            </Slider>
          </div>
        </section> */}

        {/* Why Taikonz */}
        <section className="taikonz">
          <div className="container-lg">
            <div className="row">
              <div className="col-lg-12">
                <div className="y-taikonz-contant">
                  <h1>Why Taikonz?</h1>
                  <p>
                    We build crypto products that are simple, elegant and secure.
                    Whether you are an individual or an institution, we want to help you
                    buy, sell, and store your bitcoin and cryptocurrency.
                  </p>
                </div>
              </div>
              {["Super Quick Kyc", "Fast Transactions", "Exceptional Security"].map((title, i) => (
                <div className="col-lg-4" key={i}>
                  <div className="index_2">
                    <div className="index_1">
                      <img src={bitcoinIcon} className="img-fluid" alt="pic" />
                      <h3>{title}</h3>
                      <p>Swift execution for seizing market opportunities.</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Available Currencies */}
        <section className="currency">
          <div className="container-lg">
            <div className="row">
              <div className="col-lg-6">
                <div className="currency-content mt-5">
                  <h1>Available Currencies</h1>
                  <p>There are various crypto currencies available in Taikonz, and you may easily trade and invest in all of them.</p>
                  <button className="currency-btn mt-4" onClick={() => navbar("trade/BTC_USDT")}>
                    Explore all
                  </button>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="vertival_scrolls">
                  <Slider {...settings}>
                    {currencylistData && currencylistData.map((obj, i) => (
                      <div key={i}>
                        <div className="y-bitcoin1">
                          <div className="y-bitcoin-logo">
                            <div className="dex_default">
                              <img src={obj.Currency_image} className="img-fluid w-10px" alt="pic" />
                              <div className="y-bitcoin-content">{obj.currencyName}</div>
                              <div className="btc">{obj.currencySymbol}</div>
                            </div>
                          </div>
                          <div className="arrow">
                            <img src={arrowImg} className="img-fluid" alt="pic" />
                            <span>{obj.coin_change}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Investing */}
        <section className="investing">
          <div className="container-lg">
            <div className="row">
              <div className="col-lg-12">
                <div className="investing-content mb-5">
                  <h1 className="investing-heading">Investing in crypto will<br /> be easier than ever.</h1>
                  <p className="investing-text">Taikonz makes it easier to invest and trade in crypto currency than any other platform.</p>
                </div>
              </div>
              {[
                { num: "01", title: "Create Account", text: "Taikonz has the potential to execute millions of transactions every second." },
                { num: "02", title: "Add funds", text: "The top identity verification systems complete your KYC within a few hours." },
                { num: "03", title: "Start investing", text: "The organisation has done all necessary to make Taikonz the most secure exchange." },
              ].map((item, i) => (
                <div className="col-lg-4" key={i}>
                  <div className="x-investing">
                    <div className="investing-logo">{item.num}</div>
                    <div className="x-investing-content">
                      <h3 className="x-investing-heading">{item.title}</h3>
                      <p className="x-investing-text">{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Crypto Platform */}
        <section className="crypto-platform">
          <div className="container-lg">
            <div className="row">
              <div className="col-lg-7">
                <div className="crypto-platform-content">
                  <h1 className="platform-heading">Crypto Exchange <br />Platform</h1>
                  <p className="platform-text">
                    A next-gen Blockchain and Crypto Exchange platform that offers trader
                    with an endless assets buy and selling feature with real money.
                  </p>
                  <button className="banner-btn mt-4" onClick={() => navbar("trade/BTC_USDT")}>
                    Start Trading
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <section className="footer">
          <div className="container-lg">
            <div className="row">
              <div className="col-lg-4">
                <div className="footer-taikonz">
                  <div className="curspoint">
                    <div className="taikonz-logo">
                      <img onClick={() => navbar("/")} src={logoLight} alt="logo" />
                    </div>
                    <div className="dark_taikonz-logo">
                      <img onClick={() => navbar("/")} src={logoDark} alt="logo" />
                    </div>
                  </div>
                  <div className="copyright">{siteData.copy_right_text}</div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-3 col-sm-4">
                    <h4 className="page">Pages</h4>
                    <ul className="list-items">
                      <li onClick={() => navbar("/")}>Privacy Policy</li>
                      <li onClick={() => navbar("/")}>About Us</li>
                      <li onClick={() => navbar("/")}>Contact Us</li>
                    </ul>
                  </div>
                  <div className="col-lg-3 col-sm-4">
                    <h4 className="page">Products</h4>
                    <ul className="list-items">
                      <li onClick={() => navbar("/Stakehome")}>Staking</li>
                      <li onClick={() => navbar("/p2p")}>P2P</li>
                      <li onClick={() => navbar("/launchpadlistnew")}>Launchpad</li>
                      <li onClick={() => navbar("/trade/BTC_USDT")}>Trade</li>
                    </ul>
                  </div>
                  <div className="col-lg-3 col-sm-4">
                    <h4 className="page">Social Media</h4>
                    <ul className="list-items">
                      <a target="_blank" rel="noreferrer" href={siteData.linkedin_url}><li>LinkedIn</li></a>
                      <a target="_blank" rel="noreferrer" href={siteData.insta_url}><li>Instagram</li></a>
                      <a target="_blank" rel="noreferrer" href={siteData.twitter_url}><li>Twitter</li></a>
                      <a target="_blank" rel="noreferrer" href={siteData.fb_url}><li>Facebook</li></a>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
