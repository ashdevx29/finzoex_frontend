import React, { useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "../../Styles/homepage.css";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Markets", path: "/markets" },
    { name: "Trade", path: "/trade/BTC_USDT" },
    { name: "Futures", path: "/futures" },
    { name: "Earn", path: "/earn" },
    { name: "Launchpad", path: "/launchpadlistnew" },
  ];

  return (
    <header className="w-full !font-['DM Sans'] bg-black">
      <div className="w-full !py-2 !px-3 md:!px-6 lg:!px-10 xl:!px-16 ">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer flex items-center"
          >
            <img
              src={
                new URL("../../img/home/finzoex_logo.png", import.meta.url)
                  .href
              }
              alt="FinzoEX"
              className="w-[148px] object-contain"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-5 lg:gap-10">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className="text-[#A5AAB5] font-['DM Sans'] font-[400] hover:text-white hover:font-[500] text-sm lg:text-base  transition-all duration-300"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Right Buttons */}
          <div className="hidden md:flex items-center gap-5">
            <button
              onClick={() => navigate("/login")}
              className="text-[#A5AAB5] font-['DM Sans'] font-[500] text-base transition-all duration-300 hover:text-white hover:scale-[1.03]"
            >
              Log In
            </button>

            <button
              onClick={() => navigate("/register")}
              className="bg-[linear-gradient(135deg,_#00D4FF_0%,_#0066FF_100%)] 
                text-[#0B0E13] px-6 py-[10px] rounded-[16px] text-sm font-[700] 
                transition-all duration-300 
                hover:scale-[1.05] 
                hover:shadow-[0_8px_30px_rgba(0,212,255,0.35)] 
                hover:brightness-110 
                active:scale-[0.98]"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden text-white"
          >
            {mobileMenu ? (
              <IoClose size={30} />
            ) : (
              <HiOutlineMenuAlt3 size={30} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
<div
  className={`md:hidden overflow-hidden transition-all bg-black duration-500 ease-in-out ${
    mobileMenu ? "max-h-[550px] opacity-100" : "max-h-0 opacity-0"
  }`}
>
  <div className="bg-[#000] border-t border-[#fff] px-3 sm:px-5 py-3 sm:py-5 flex flex-col gap-3">

    {/* Nav Items */}
    {navItems.map((item, index) => (
      <button
        key={index}
        onClick={() => {
          navigate(item.path);
          setMobileMenu(false);
        }}
        className="
        flex items-center justify-between
        text-left
        px-4 py-[14px]
        rounded-[14px]
        bg-[#000]
        border border-[#fff]
        hover:border-[#0066FF]
        hover:bg-[#121212]
        transition-all duration-300
        group"
      >
        <span
          className="
          text-[#B7BDC6]
          group-hover:text-white
          text-[15px]
          font-[500]
          transition-all duration-300"
        >
          {item.name}
        </span>

        <span
          className="
          text-[#5B6472]
          group-hover:text-[#00D4FF]
          transition-all duration-300"
        >
          →
        </span>
      </button>
    ))}

    {/* Buttons */}
    <div className="pt-4 mt-2 border-t border-[#1A1F2B] flex flex-col gap-3">

      <button
        onClick={() => navigate("/login")}
        className="
        w-full
        py-[13px]
        rounded-[14px]
        bg-[#151B24]
        text-white
        text-[15px]
        font-[600]
        hover:bg-[#1A2230]
        transition-all duration-300"
      >
        Log In
      </button>

      <button
        onClick={() => navigate("/register")}
        className="
        w-full
        py-[13px]
        rounded-[14px]
        bg-[linear-gradient(135deg,#00D4FF_0%,#0066FF_100%)]
        text-[#0B0E13]
        text-[15px]
        font-[700]
        transition-all duration-300
        hover:scale-[1.02]
        hover:brightness-110"
      >
        Get Started
      </button>

    </div>
  </div>
</div>
      {/* <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${mobileMenu ? "max-h-[500px]" : "max-h-0"
          }`}
      >
        <div className="bg-[#050505] border-t border-[#151515] px-6 py-5 flex flex-col gap-5">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                navigate(item.path);
                setMobileMenu(false);
              }}
              className="text-left text-[#B5B5B5] hover:text-white text-[15px] font-medium transition-all duration-300"
            >
              {item.name}
            </button>
          ))}

          <div className="pt-4 border-t border-[#1A1A1A] flex flex-col gap-4">
            <button
              onClick={() => navigate("/login")}
              className="text-left text-white text-[15px] font-medium"
            >
              Log In
            </button>

            <button
              onClick={() => navigate("/register")}
              className="bg-[#0EA5FF] max-w-[200px] text-white py-3 rounded-full text-[15px] font-semibold"
            >
              Get Started
            </button>
          </div>
        </div>
      </div> */}
    </header>
  );
};

export default Navbar;


// import React, { useEffect } from "react";
// import useState from "react-usestateref";
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Typography,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   Button,
//   Box,
//   useMediaQuery,
//   useTheme,
//   Grid,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import { Link, useNavigate } from "react-router-dom";
// import ToggleLight from "./Lightdark";
// import apiService from "../../core/service/detail";
// import { getMethod } from "../../core/service/common.api";
// import Moment from "moment";
// import { socket } from "../context/socket";
// import { toast } from "react-toastify";

// const App = () => {
//   const navigate = useNavigate();
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));
//   const [isOpen, setIsOpen, isOpenref] = useState(false);
//   const [notifications, setNotification] = useState("");

//   const getNotifications = async () => {
//     try {
//       var data = {
//         apiUrl: apiService.notifications,
//       };
//       var resp = await getMethod(data);
//       if (resp.status) {
//         setNotification(resp.Message);
//       } else {
//       }
//     } catch (error) {}
//   };
//   const toggleDrawer = (open) => (event) => {
//     if (
//       event.type === "keydown" &&
//       (event.key === "Tab" || event.key === "Shift")
//     ) {
//       return;
//     }

//     setDrawerOpen(open);
//   };
//   const [authtoken, setauthtoken] = useState(false);
//   useEffect(() => {
//     let token_socket = localStorage.getItem("socket_token");
//     if (token_socket) {
//       socket.connect();
//       let socketToken = token_socket.split("_")[0];
//       socket.on("socketResponse" + socketToken, function (res) {
//         console.log("notify response====", res);
//         if (res.Reason == "notify") {
//           getNotifications();
//         }

//         if (res.Message == "account_deactivate") {
//           toast.error("Your account deactivated by admin");
//           logout();
//         }
//       });
//     }

//     var user_token = localStorage.getItem("user_token");
//     if (user_token) {
//       setauthtoken(false);
//       getNotifications();
//     } else {
//       setauthtoken(true);
//     }
//     fetchTheme();

//     var curr_url = window.location.href;
//     var spliturl = curr_url != null ? curr_url.split("/") : "";
//     if (spliturl != "") {
//       if (spliturl.length > 0) {
//         if (
//           spliturl[3] == "Security" ||
//           spliturl[3] == "Kycverify" ||
//           spliturl[3] == "Userprofile"
//         ) {
//           setDrawerOpen(true);
//         } else {
//           setDrawerOpen(false);
//         }
//       }
//     }
//   }, [0]);

//   const logout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   const list = (
//     <Box
//       sx={{ width: 250 }}
//       role="presentation"
//       onClick={toggleDrawer(false)}
//       onKeyDown={toggleDrawer(false)}
//     >
//       <List>
//         {authtoken == true ? (
//           <>
//             <ListItem button key="P2P" onClick={() => navbar("p2p")}>
//               <ListItemText primary="P2P" />
//             </ListItem>
//             <ListItem button key="Trade" onClick={() => navbar("trade")}>
//               <ListItemText primary="Trade" />
//             </ListItem>
//             <ListItem button key="Staking" onClick={() => navbar("staking")}>
//               <ListItemText primary="Staking" />
//             </ListItem>
//             <ListItem
//               button
//               key="Launchpad"
//               onClick={() => navbar("launchpad")}
//             >
//               <ListItemText primary="Launchpad" />
//             </ListItem>

//             <ListItem button key="Login" onClick={() => navbar("login")}>
//               <ListItemText primary="Login" />
//             </ListItem>
//             <ListItem button key="Register" onClick={() => navbar("register")}>
//               <ListItemText primary="Register" />
//             </ListItem>
//           </>
//         ) : (
//           <>
//             <ListItem button key="P2P" onClick={() => navbar("p2p")}>
//               <ListItemText primary="P2P" />
//             </ListItem>

//             <ListItem
//               button
//               key="Trade"
//               onClick={() => navbar("trade")}
//             >
//               <ListItemText primary="Trade" />
//             </ListItem>

//             <ListItem button key="Staking" onClick={() => navbar("staking")}>
//               <ListItemText primary="Staking" />
//             </ListItem>

//             <ListItem button key="Logout" onClick={logout}>
//               <ListItemText primary="Logout" />
//             </ListItem>
//           </>
//         )}

//         {/* Add more ListItems for additional options */}
//       </List>
//     </Box>
//   );

//   const navbar = (value) => {
//     if (value == "") {
//     } else if (value == "register") {
//       navigate("/register");
//     } else if (value == "login") {
//       navigate("/login");
//     }

//     if (value == "dashboard") {
//       navigate("/Dashboardpage");
//     } else if (value == "p2p") {
//       navigate("/p2p");
//     } else if (value == "trade") {
//       navigate("/trade/BTC_USDT");
//     } else if (value == "staking") {
//       navigate("/Stakehome");
//     } else if (value == "staking") {
//       navigate("/Stakehome");
//       navigate("/login");
//     } else if (value == "launchpad") {
//       navigate("/launchpadlistnew");
//     } else if (value == "staking") {
//       navigate("/Stakehome");
//     } else if (value == "trade") {
//       navigate("/trade/BTC_USDT");
//     } else if (value == "dashboard") {
//       navigate("/Dashboardpage");
//     } else if (value == "profile") {
//       navigate("/Userprofile");
//     } else if (value == "swap") {
//       navigate("/Swaphome");
//     }
//   };

//   const homeNav = () => {
//     navigate("/");
//   };

//   const fetchTheme = () => {
//     var theme = localStorage.getItem("theme");
//     console.log(theme, "-0-0-0-0-0-0-0theme");
//     if (theme != undefined) {
//       if (theme == "light") {
//         setIsOpen(true);
//         document.body.classList.toggle("light", isOpenref.current);
//       } else {
//         setIsOpen(false);
//       }
//     } else {
//       localStorage.setItem("theme", "dark");
//       setIsOpen(false);
//     }
//   };

//   const changeTheme = (value) => {
//     localStorage.setItem("theme", value);
//     var settheme = value == "light" ? true : false;
//     setIsOpen(settheme);
//     console.log("theme set===", isOpenref.current);
//     document.body.classList.toggle("light", isOpenref.current);
//     console.log("href path---",window.location.pathname)

//     var pathsplit = window.location.pathname.split('/');

//     if(pathsplit.length > 0)
//     {
//       if(pathsplit[1] == "trade")
//       {
//         socket.emit("loadchart", value);
//       }
//     }
//   };

//   return (
//     <div>
//       <AppBar position="static" className="custom-appbar">
//         <Toolbar className="dilesd">
//           <img
//             onClick={homeNav}
//             src={new URL("../../img/home/finzoex_logo.png", import.meta.url).href}
//             className="img-fluid logo_new"
//           />
//           <img
//             onClick={homeNav}
//             src={new URL("../../img/home/finzoex_logo.png", import.meta.url).href}
//             className="img-fluid light_logo"
//           />

//           {isMobile && (
//             <IconButton
//               edge="end"
//               color="inherit"
//               aria-label="menu"
//               onClick={toggleDrawer(true)}
//             >
//               <MenuIcon className="menu_icon" />
//             </IconButton>
//           )}
//           {!isMobile && (
//             <Grid container justifyContent="flex-end" spacing={2}>
//               {/* {authtoken == true ? (
//                 ""
//               ) : (
//                 <Grid item>
//                   <Button
//                     onClick={() => navbar("dashboard")}
//                     color="inherit"
//                     className="link"
//                   >
//                     Dashboard
//                   </Button>
//                 </Grid>
//               )}  */}
//               <Grid item>
//                 <Button
//                   onClick={() => navbar("p2p")}
//                   color="inherit"
//                   className="link"
//                 >
//                   P2P
//                 </Button>
//               </Grid>
//               <Grid item>
//                 <Button
//                   onClick={() => navbar("trade")}
//                   color="inherit"
//                   className="link"
//                 >
//                   Trade
//                 </Button>
//               </Grid>
//               <Grid item>
//                 <Button
//                   onClick={() => navbar("staking")}
//                   color="inherit"
//                   className="link"
//                 >
//                   Staking
//                 </Button>
//               </Grid>
//               <Grid item>
//                 <Button
//                   onClick={() => navbar("launchpad")}
//                   color="inherit"
//                   className="link"
//                 >
//                   Launchpad
//                 </Button>
//               </Grid>
//               {authtoken == true ? "" : <Grid item></Grid>}
//               {authtoken == true ? "" : <Grid item></Grid>}
//               <Grid item></Grid>
//               {authtoken == true ? (
//                 <Grid item>
//                   <Button
//                     onClick={() => navbar("login")}
//                     color="inherit"
//                     className="secondary_header_button"
//                   >
//                     Login
//                   </Button>
//                 </Grid>
//               ) : (
//                 ""
//               )}
//               {authtoken == true ? (
//                 <Grid item>
//                   <Button
//                     onClick={() => navbar("register")}
//                     color="inherit"
//                     className="primary_header_button ml-3"
//                   >
//                     Register
//                   </Button>
//                 </Grid>
//               ) : (
//                 ""
//               )}

//               {authtoken == true ? (
//                 ""
//               ) : (
//                 <Grid item>
//                   <Button
//                     onClick={logout}
//                     color="inherit"
//                     className="primary_header_button"
//                   >
//                     Logout
//                   </Button>
//                 </Grid>
//               )}
//               <Grid item className="d-flex align-items-center">
//                 {/* <ToggleLight /> */}
//                 <div>
//                   {isOpenref.current == true ? (
//                     <div>
//                       <input
//                         type="checkbox"
//                         className="checkbox"
//                         id="checkbox"
//                         checked
//                         onClick={() => changeTheme("dark")}
//                       />
//                       <label htmlFor="checkbox" className="checkbox-label">
//                         <i className="ri-moon-fill"></i>
//                         <i className="ri-sun-fill"></i>
//                         <span className="ball"></span>
//                       </label>
//                     </div>
//                   ) : (
//                     <div>
//                       <input
//                         type="checkbox"
//                         className="checkbox"
//                         id="checkbox"
//                         onClick={() => changeTheme("light")}
//                       />
//                       <label htmlFor="checkbox" className="checkbox-label">
//                         <i className="ri-moon-fill"></i>
//                         <i className="ri-sun-fill"></i>
//                         <span className="ball"></span>
//                       </label>
//                     </div>
//                   )}
//                 </div>
//                 {authtoken == true ? (
//                   ""
//                 ) : (
//                   <div className="notification_section  padingrespos">
//                     <button
//                       className="notification"
//                       data-toggle="collapse"
//                       data-target="#notification"
//                     >
//                       <i className="bi bi-bell-fill"></i>
//                     </button>
//                     <div id="notification" className="collapse">
//                       <div className="content_notification">
//                         <h3>
//                           Notification <Link to="/Historynew">View all</Link>
//                         </h3>
//                         <div className="overflow_seee">
//                           {notifications && notifications.length > 0 ? (
//                             notifications.map((item, i) => {
//                               return (
//                                 <>
//                                   <a href={item.link} className="msg-noti">
//                                     <small>
//                                       {Moment(item.createdAt).fromNow()}
//                                     </small>
//                                     <p className="notification_cls">
//                                       {item.message}
//                                     </p>
//                                   </a>
//                                 </>
//                               );
//                             })
//                           ) : (
//                             <p>No notification found</p>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </Grid>
//             </Grid>
//           )}
//         </Toolbar>
//       </AppBar>
//       <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
//         {list}
//       </Drawer>
//       {/* Your other components and content */}
//     </div>
//   );
// };

// export default App;
