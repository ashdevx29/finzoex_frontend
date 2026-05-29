import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import Header from "./Header";
import {Button} from "@material-ui/core";

import {socket} from "./context/socket";
import apiService from "../core/service/detail";
import {postMethod} from "../core/service/common.api";
import {getMethod} from "../core/service/common.api";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
function Footer() {
  const [siteData, setSiteData] = useState({});

  useEffect(() => {
    fetchTfaData();
  }, [0]);

  const fetchTfaData = async () => {
    try {
      var data = {
        apiUrl: apiService.getSiteDatas,
      };
      var resp = await getMethod(data);
      console.log(resp.data, "=--=-=-resp-=-=-=-=-=resp=-=-");
      setSiteData(resp.data);
    } catch (error) {}
  };
  const [value, setValue] = useState();

  // /get_sitedata
  return (
    <div className="center_textxx pt-0 bg-trans">
      {/* <div className="cta-trading-now">
        <h2 className="has-text-align-center">
          Start <span className="blue">Trading</span> Now
        </h2>
      </div>

      <div className="row justify-center">
        <div className="col-lg-6 d-flex justify-center">
          <div className="phone_number donwload-form">
            <PhoneInput
              placeholder="Enter phone number"
              value={value}
              onChange={setValue}
            />
            <Button className="btn--blue footer_roeund ">
              <span>
                <i className="bi bi-arrow-right"></i>
              </span>
            </Button>
          </div>
        </div>
      </div> */}
      <footer className="rn-footer-one bg-color--1- rn-section-gap  mt_md--80 mt_sm--80 pt-0">
        <div className="site-footer">
          <div className="site-info brder-non">
            <div className="container">
              <div className="site-info__row">
                <section id="block-4" className="widget widget_block widget_text">
                  <p className="site-info__copyright">
                     ©2022 FinzoX. All rights reserved
                  </p>
                </section>
                <section id="nav_menu-7" className="widget widget_nav_menu">
                  {" "}
                  <div className="menu-social-menu-container">
                    <ul id="menu-social-menu" className="menu">
                      <li
                        id="menu-item-751"
                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-751"
                      >
                        <a
                          target="_blank"
                          rel="noopener"
                          href="https://www.facebook.com/zebpay/"
                          className="nav-link"
                        >
                          <img
                            className="item-icon"
                            src="https://zebpay.com/wp-content/uploads/2022/02/icon_fb_v1.svg"
                            alt=""
                          />
                          <span className="item-label">Facebook</span>
                        </a>
                      </li>
                      <li
                        id="menu-item-752"
                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-752"
                      >
                        <a
                          target="_blank"
                          rel="noopener"
                          href="https://www.instagram.com/zebpayofficial/"
                          className="nav-link"
                        >
                          <img
                            className="item-icon"
                            src="https://zebpay.com/wp-content/uploads/2022/02/icon_insta_v1.svg"
                            alt=""
                          />
                          <span className="item-label">Instagram</span>
                        </a>
                      </li>
                      <li
                        id="menu-item-753"
                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-753"
                      >
                        <a
                          target="_blank"
                          rel="noopener"
                          href="https://www.linkedin.com/company/zebpay/"
                          className="nav-link"
                        >
                          <img
                            className="item-icon"
                            src="https://zebpay.com/wp-content/uploads/2022/02/icon_linkedIn_v1.svg"
                            alt=""
                          />
                          <span className="item-label">LinkedIn</span>
                        </a>
                      </li>
                      <li
                        id="menu-item-754"
                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-754"
                      >
                        <a
                          target="_blank"
                          rel="noopener"
                          href="https://twitter.com/zebpay"
                          className="nav-link"
                        >
                          <img
                            className="item-icon"
                            src="https://zebpay.com/wp-content/uploads/2022/02/icon_twitter_v1.svg"
                            alt=""
                          />
                          <span className="item-label">Twitter</span>
                        </a>
                      </li>
                      <li
                        id="menu-item-755"
                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-755"
                      >
                        <a
                          target="_blank"
                          rel="noopener"
                          href="https://www.youtube.com/user/ZebpayTube"
                          className="nav-link"
                        >
                          <img
                            className="item-icon"
                            src="https://zebpay.com/wp-content/uploads/2022/02/icon_youtube_v1.svg"
                            alt=""
                          />
                          <span className="item-label">YouTube</span>
                        </a>
                      </li>
                      <li
                        id="menu-item-756"
                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-756"
                      >
                        <a
                          target="_blank"
                          rel="noopener"
                          href="https://in.pinterest.com/zebpayofficial/"
                          className="nav-link"
                        >
                          <img
                            className="item-icon"
                            src="https://zebpay.com/wp-content/uploads/2022/02/icon_pint_v1.svg"
                            alt=""
                          />
                          <span className="item-label">Pinterest</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </section>{" "}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
