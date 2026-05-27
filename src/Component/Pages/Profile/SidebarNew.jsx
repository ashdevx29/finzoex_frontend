import React, {useState} from "react";
import {Link, useNavigate, NavLink} from "react-router-dom";
import {Grid, Paper, Container} from "@mui/material";
import {Button} from "semantic-ui-react";
import {Checkbox} from "semantic-ui-react";
import {Dropdown} from "semantic-ui-react";

function SidebarNew() {
  return (
    <>
      <aside className="asidemeni">
        <div className="mennu_side">
          <div className="manu_items">
            <button
              className="btn w-100 button_accorndi"
              type="button"
              data-toggle="collapse"
              data-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              <div className="">
                <div className="dropdown_butn">
                  <div className="icon_menu">
                    <i className="ri-user-3-line"></i> <span>Account</span>
                  </div>
                  <i className="ri-arrow-down-s-line"></i>
                </div>
              </div>
            </button>
            <div className="collapse" id="collapseExample">
              <div className="card card-body bg_tras">
                <NavLink to="/Userprofile" className="navlink_new">
                  Personal information
                </NavLink>
                <NavLink to="/Kycverify" className="navlink_new">
                  KYC
                </NavLink>
                <NavLink to="/Security" className="navlink_new">
                  Account Security
                </NavLink>
              </div>
            </div>
          </div>
          <div className="menu_items menu_items_fex">
            <NavLink to="/Refferal" className="navlink_new">
              <i className="ri-team-line"></i> Referral
            </NavLink>
          </div>
          <div className="menu_items menu_items_fex">
            <NavLink to="/paymentmethod" className="navlink_new">
              <i className="ri-bank-card-line"></i> Payment Methods
            </NavLink>
          </div>

          <div className="menu_items menu_items_fex">
            <NavLink to="/Historynew" className="navlink_new">
              <i className="ri-time-line"></i>History
            </NavLink>
          </div>

          <div className="menu_items menu_items_fex">
            <NavLink to="/Supportnew" className="navlink_new">
              <i className="ri-question-line"></i> Help
            </NavLink>
          </div>

          <div className="menu_items menu_items_fex">
            <NavLink to="/Sessionhistory" className="navlink_new">
              <i className="ri-question-line"></i> Login History
            </NavLink>
          </div>
         

        </div>
      </aside>
    </>
  );
}

export default SidebarNew;
