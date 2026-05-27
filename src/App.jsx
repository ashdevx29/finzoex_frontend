import "./App.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import Login from "./Component/Login";
import RegisterNew from "./Component/RegisterNew";
import Resetpass from "./Component/Resetpass";
import Chart from "./Component/Chart";
import IdleTimeOutHandler from "./Component/IdleTimeOutHandler";
import Privacy from "./Component/Privacy";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// New Pages
import Landingpage from "./Component/Pages/Dashboard/Landingpage";
import Dashboard from "./Component/Pages/Dashboard/Dashboard";

import LaunchpadList from "./Component/Pages/Launchpad/LaunchpadList";
import LaunchpadApplyNew from "./Component/Pages/Launchpad/LaunchpadApply";
import Launchpadbuynew from "./Component/Pages/Launchpad/Launchpadbuynew";

import P2phomeNew from "./Component/Pages/P2p/P2phome";
import P2ppostad from "./Component/Pages/P2p/P2ppostad";
import P2pinnerchat from "./Component/Pages/P2p/P2pinnerchat";
import P2pinnerchat2 from "./Component/Pages/P2p/P2pinnerchat2";
import P2pconfirm from "./Component/Pages/P2p/P2pconfirm";
import P2pvieworder from "./Component/Pages/P2p/P2pvieworder";

import Userprofile from "./Component/Pages/Profile/Userprofile";
import Kycverify from "./Component/Pages/Profile/Kycverify";
import Security from "./Component/Pages/Profile/Security";
import Refferal from "./Component/Pages/Profile/Refferal";
import Supportnew from "./Component/Pages/Profile/Support";
import Historynew from "./Component/Pages/Profile/History";
import Sessionhistory from "./Component/Pages/Profile/Sessionhistory";
import Paymentmethod from "./Component/Pages/Profile/Paymentmethod";
import Tfastatus from "./Component/Pages/Profile/Tfastatus";

import Stakehome from "./Component/Pages/Stake/Stakehome";
import Stakedetails from "./Component/Pages/Stake/Stakedetails";
import Stakeconfirm from "./Component/Pages/Stake/Stakeconfirm";
import Stakebackup from "./Component/Pages/Stake/stakebackup";

import Swaphome from "./Component/Pages/Swap/Swaphome";
import Swaphomenew from "./Component/Pages/Swap/Swaphomenew";
import Swapdetails from "./Component/Pages/Swap/Swapdetails";
import Swapconfirm from "./Component/Pages/Swap/Swapconfirm";

import TradeNew from "./Component/Pages/Trade/Tradehome";

import Withdraw from "./Component/Withdraw";
import Deposit from "./Component/Deposit";

import { removeAuthToken } from "./core/lib/localStorage";

function RequireAuth({ children }) {
  const data = localStorage.getItem("user_token");
  return data ? children : (removeAuthToken(), null);
}

function App() {
  const [isActive, setIsActive] = useState(true);

  return (
    <Router>
      <IdleTimeOutHandler
        onActive={() => setIsActive(true)}
        onIdle={() => setIsActive(false)}
      />
      <ToastContainer />
      <Routes>
        {/* ===== Before Login ===== */}
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterNew />} />
        <Route path="/Resetpass" element={<Resetpass />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/Tfalogin" element={<Tfastatus />} />
        <Route path="/trade/:pair" element={<TradeNew />} />
        <Route path="/tradeview/:pair" element={<Chart />} />
        <Route path="/p2p" element={<P2phomeNew />} />
        <Route path="/p2p/post-ad" element={<P2ppostad />} />
        <Route path="/p2p/confirm-order/:id" element={<P2pinnerchat />} />
        <Route path="/p2p/chat/:id" element={<P2pinnerchat2 />} />
        <Route path="/p2p/complete/:id" element={<P2pconfirm />} />
        <Route path="/p2p/view-order/:id" element={<P2pvieworder />} />
        <Route path="/launchpadlistnew" element={<LaunchpadList />} />
        <Route path="/LaunchpadApply" element={<LaunchpadApplyNew />} />
        <Route path="/Launchpadbuynew/:id" element={<Launchpadbuynew />} />
        <Route path="/Stakehome" element={<Stakehome />} />

        {/* ===== After Login ===== */}
        <Route path="/Dashboardpage" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/Userprofile" element={<RequireAuth><Userprofile /></RequireAuth>} />
        <Route path="/Kycverify" element={<RequireAuth><Kycverify /></RequireAuth>} />
        <Route path="/Security" element={<RequireAuth><Security /></RequireAuth>} />
        <Route path="/Refferal" element={<RequireAuth><Refferal /></RequireAuth>} />
        <Route path="/Supportnew" element={<RequireAuth><Supportnew /></RequireAuth>} />
        <Route path="/Historynew" element={<RequireAuth><Historynew /></RequireAuth>} />
        <Route path="/Sessionhistory" element={<RequireAuth><Sessionhistory /></RequireAuth>} />
        <Route path="/Paymentmethod" element={<RequireAuth><Paymentmethod /></RequireAuth>} />
        <Route path="/Stakedetails" element={<RequireAuth><Stakedetails /></RequireAuth>} />
        <Route path="/Stakeconfirm" element={<RequireAuth><Stakeconfirm /></RequireAuth>} />
        <Route path="/Stakebackup" element={<RequireAuth><Stakebackup /></RequireAuth>} />
        <Route path="/Swaphome" element={<RequireAuth><Swaphome /></RequireAuth>} />
        <Route path="/Swaphomenew" element={<RequireAuth><Swaphomenew /></RequireAuth>} />
        <Route path="/Swapdetails" element={<RequireAuth><Swapdetails /></RequireAuth>} />
        <Route path="/Swapconfirm" element={<RequireAuth><Swapconfirm /></RequireAuth>} />
        <Route path="/Withdraw" element={<RequireAuth><Withdraw /></RequireAuth>} />
        <Route path="/deposit" element={<RequireAuth><Deposit /></RequireAuth>} />
      </Routes>
    </Router>
  );
}

export default App;
