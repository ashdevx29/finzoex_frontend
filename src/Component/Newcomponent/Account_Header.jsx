import React, { useEffect } from "react";
import useState from "react-usestateref";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  useMediaQuery,
  useTheme,
  Grid,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate, NavLink } from "react-router-dom";
import ToggleLight from "./Lightdark";
import apiService from "../../core/service/detail";
import { getMethod } from "../../core/service/common.api";
import Moment from "moment";
import { socket } from "../context/socket";
import { toast } from "react-toastify";

const App = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [isOpen, setIsOpen, isOpenref] = useState(false);
  const [notifications, setNotification] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const getNotifications = async () => {
    try {
      var data = {
        apiUrl: apiService.notifications,
      };
      var resp = await getMethod(data);
      if (resp.status) {
        setNotification(resp.Message);
      } else {
      }
    } catch (error) { }
  };
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  const currentUrl = window.location.href;

  console.log(currentUrl, "currentUrl");
  const currentPath = currentUrl.split("/")[3];
  console.log(URL, "URL");
  const [authtoken, setauthtoken] = useState(false);
  const [Activestate, setActivestate, Activestateref] =
    useState(currentPath);
  const [currenychoose, setCurrencyChoose, currenychooseref] = useState("INR");

  useEffect(() => {
    // setCurrencyChoose(localStorage.getItem("currency"));
    let token_socket = localStorage.getItem("socket_token");
    if (token_socket) {
      socket.connect();
      let socketToken = token_socket.split("_")[0];
      socket.on("socketResponse" + socketToken, function (res) {
        console.log("notify response====", res);
        if (res.Reason == "notify") {
          getNotifications();
        }

        if (res.Message == "account_deactivate") {
          toast.error("Your account deactivated by admin");
          logout();
        }
      });
    }

    var user_token = localStorage.getItem("user_token");
    if (user_token) {
      setauthtoken(false);
      getNotifications();
      //socket.emit("dashboardvalue", "INR");
    } else {
      setauthtoken(true);
    }
    fetchTheme();
    // var curr_url = window.location.href;
    // var spliturl = (curr_url != null) ? curr_url.split("/") : "";
    // if(spliturl != "")
    // {
    //   if(spliturl.length > 0)
    //   {
    //     if(spliturl[3] == "Security" || spliturl[3] == "Kycverify" || spliturl[3] == "Userprofile")
    //     {
    //       setDrawerOpen(true);
    //     }
    //     else
    //     {
    //       setDrawerOpen(false);
    //     }
    //   }
    // }
  }, [0]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const list = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {authtoken == true ? (
          <>
            <ListItem button key="P2P" onClick={() => navbar("p2p")}>
              <ListItemText primary="P2P" />
            </ListItem>
            <ListItem button key="Trade" onClick={() => navbar("trade")}>
              <ListItemText primary="Trade" />
            </ListItem>
            <ListItem button key="Staking" onClick={() => navbar("Staking")}>
              <ListItemText primary="Staking" />
            </ListItem>
            <ListItem
              button
              key="Launchpad"
              onClick={() => navbar("Launchpad")}
            >
              <ListItemText primary="Launchpad" />
            </ListItem>
            <ListItem button key="Login" onClick={() => navbar("login")}>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button key="Register" onClick={() => navbar("register")}>
              <ListItemText primary="Register" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem
              button
              key="Dashboard"
              onClick={() => navbar("Dashboardpage")}
            >
              <ListItemText primary="Dashboard" />
            </ListItem>

            <ListItem button key="P2P" onClick={() => navbar("p2p")}>
              <ListItemText primary="P2P" />
            </ListItem>

            <ListItem
              button
              key="Trade"
              onClick={() => navbar("trade")}
            >
              <ListItemText primary="Trade" />
            </ListItem>

            <ListItem button key="Staking" onClick={() => navbar("Stakehome")}>
              <ListItemText primary="Staking" />
            </ListItem>

            <ListItem
              button
              key="Launchpad"
              onClick={() => navbar("launchpadlistnew")}
            >
              <ListItemText primary="Launchpad" />
            </ListItem>

            <ListItem button key="Swap" onClick={() => navbar("Swaphome")}>
              <ListItemText primary="Swap" />
            </ListItem>
            <ListItem button key="history" onClick={() => navbar("Historynew")}>
              <ListItemText primary="History" />
            </ListItem>
            {/* <ListItem button key="INR" onClick={() => navbar("INR")}>
              <ListItemText primary="INR" />
            </ListItem> */}

            {/* <ListItem button key="Port" onClick={() => navbar("Userprofile")}>
              <ListItemText primary="Account" />
            </ListItem> */}
            <ListItem button key="Port" onClick={() => navbar("Userprofile")}>
              <ListItemText
                primary="Account"
                classes={{
                  primary: "gradient-text"
                }}
              />
            </ListItem>

            <ListItem button key="Logout" onClick={logout}>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        )}

        {/* Add more ListItems for additional options */}
      </List>
    </Box>
  );

  const navbar = (value) => {
    console.log(value, "value");
    if (value == "") {
    } else if (value == "register") {
      navigate("/register");
    } else if (value == "login") {
      navigate("/login");
    }

    if (value == "Dashboardpage") {
      navigate("/Dashboardpage");
    } else if (value == "p2p") {
      navigate("/p2p");
    } else if (value == "trade") {
      navigate("/trade/BTC_USDT");
    } else if (value == "Stakehome") {
      navigate("/Stakehome");
    } else if (value == "Stakehome") {
      navigate("/Stakehome");
      navigate("/login");
    } else if (value == "launchpadlistnew") {
      navigate("/launchpadlistnew");
    } else if (value == "Stakehome") {
      navigate("/Stakehome");
    } else if (value == "trade") {
      navigate("/trade/BTC_USDT");
    } else if (value == "Dashboardpage") {
      navigate("/Dashboardpage");
    } else if (value == "Userprofile") {
      navigate("/Userprofile");
    } else if (value == "Swaphome") {
      navigate("/Swaphome");
    } else if (value == "Historynew") {
      navigate("/Historynew");
      setActivestate("Historynew");
    }
  };

  const homeNav = () => {
    navigate("/");
  };

  const fetchTheme = () => {
    var theme = localStorage.getItem("theme");
    console.log(theme, "-0-0-0-0-0-0-0theme");
    if (theme != undefined) {
      if (theme == "light") {
        setIsOpen(true);
        document.body.classList.toggle("light", isOpenref.current);
      } else {
        setIsOpen(false);
      }
    } else {
      localStorage.setItem("theme", "dark");
      setIsOpen(false);
    }
  };

  const changeTheme = (value) => {
    localStorage.setItem("theme", value);
    var settheme = value == "light" ? true : false;
    setIsOpen(settheme);
    console.log("theme set===", isOpenref.current);
    document.body.classList.toggle("light", isOpenref.current);

    var pathsplit = window.location.pathname.split('/');

    if (pathsplit.length > 0) {
      if (pathsplit[1] == "trade") {
        socket.emit("loadchart", value);
      }
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (currency) => {
    setCurrencyChoose(currency);
    // navigate("/Dashboardpage");
    console.log(currency, "currency");
    socket.emit("dashboardvalue", currency);

    // window. location. reload();
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="static" className="custom-appbar">
        <Toolbar className="dilesd">
          <img
            onClick={homeNav}
            src={new URL("../../img/home/finzoex_logo.png", import.meta.url).href}
            className="img-fluid logo_new"
          />
          <img
            onClick={homeNav}
            src={new URL("../../img/home/finzoex_logo.pngg", import.meta.url).href}
            className="img-fluid light_logo"
          />

          {isMobile && (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon className="menu_icon" />
            </IconButton>
          )}
          {!isMobile && (
            <Grid container justifyContent="flex-end" spacing={2}>
              {authtoken == true ? (
                ""
              ) : (
                <Grid item>
                  <Button
                    onClick={() => navbar("Dashboardpage")}
                    color="inherit"
                    className={
                      Activestateref.current == "Dashboardpage"
                        ? "link active"
                        : "link"
                    }
                  >
                    Dashboard
                  </Button>
                </Grid>
              )}
              <Grid item>
                <Button
                  onClick={() => navbar("p2p")}
                  color="inherit"
                  className={
                    Activestateref.current == "p2p" ? "link active" : "link"
                  }
                >
                  P2P
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => navbar("trade")}
                  color="inherit"
                  className={
                    Activestateref.current == "trade" ? "link active" : "link"
                  }
                >
                  Trade
                </Button>
              </Grid>

              <Grid item>
                <Button
                  onClick={() => navbar("Stakehome")}
                  color="inherit"
                  className={
                    Activestateref.current == "Stakehome"
                      ? "link active"
                      : "link"
                  }
                >
                  Staking
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => navbar("launchpadlistnew")}
                  color="inherit"
                  className={
                    Activestateref.current == "launchpadlistnew"
                      ? "link active"
                      : "link"
                  }
                >
                  Launchpad
                </Button>
              </Grid>
              {authtoken == true ? (
                ""
              ) : (
                <Grid item>
                  <Button
                    onClick={() => navbar("Swaphome")}
                    color="inherit"
                    className={
                      Activestateref.current == "Swaphome"
                        ? "link active"
                        : "link"
                    }
                  >
                    Swap
                  </Button>
                </Grid>
              )}
              {authtoken == true ? (
                ""
              ) : (
                <Grid item>
                  <Button
                    onClick={() => navbar("Historynew")}
                    color="inherit"
                    className={
                      Activestateref.current == "Historynew"
                        ? "link active"
                        : "link"
                    }
                  >
                    History
                  </Button>
                </Grid>
              )}
              {authtoken == true ? (
                ""
              ) : (
                <Grid item>
                  <Button
                    onClick={() => navbar("Userprofile")}
                    color="inherit"
                    className={
                      Activestateref.current == "Userprofile"
                        ? "link active gradient-btn"
                        : "link gradient-btn"
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      className="gradient-icon w-4 h-4 mr-1"
                    >
                      <defs>
                        <linearGradient id="userGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#00D4FF" />
                          <stop offset="100%" stopColor="#0066FF" />
                        </linearGradient>
                      </defs>

                      <path
                        stroke="url(#userGradient)"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>

                    <span className="gradient-text">Account</span>
                  </Button>
                </Grid>
              )}
              {authtoken == true ? (
                ""
              ) : (
                <>
                  <Grid item>
                    <Button
                      aria-controls="currency-menu"
                      aria-haspopup="true"
                      onClick={handleMenuClick}
                      color="inherit"
                      className="link INR"
                    >
                      {currenychooseref.current}{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </Button>
                    <Menu
                      className=""
                      id="currency-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={() => handleMenuItemClick("INR")}>
                        INR
                      </MenuItem>
                      <MenuItem onClick={() => handleMenuItemClick("USD")}>
                        USD
                      </MenuItem>
                      {/* Add more MenuItem for other currencies */}
                    </Menu>
                  </Grid>
                </>
              )}
              {authtoken == true ? (
                <Grid item>
                  <Button
                    onClick={() => navbar("login")}
                    color="inherit"
                    className="secondary_header_button"
                  >
                    Login
                  </Button>
                </Grid>
              ) : (
                ""
              )}
              {authtoken == true ? (
                <Grid item>
                  <Button
                    onClick={() => navbar("register")}
                    color="inherit"
                    className="primary_header_button ml-3"
                  >
                    Register
                  </Button>
                </Grid>
              ) : (
                ""
              )}

              {authtoken == true ? (
                ""
              ) : (
                <Grid item>
                  <Button
                    onClick={logout}
                    color="inherit"
                    className="primary_header_button"
                  >
                    Logout
                  </Button>
                </Grid>
              )}
              <Grid item className="d-flex align-items-center">
                {/* <ToggleLight /> */}
                {/* <div>
                  {isOpenref.current == true ? (
                    <div>
                      <input
                        type="checkbox"
                        className="checkbox"
                        id="checkbox"
                        checked
                        onClick={() => changeTheme("dark")}
                      />
                      <label htmlFor="checkbox" className="checkbox-label">
                        <i className="ri-moon-fill"></i>
                        <i className="ri-sun-fill"></i>
                        <span className="ball"></span>
                      </label>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="checkbox"
                        className="checkbox"
                        id="checkbox"
                        onClick={() => changeTheme("light")}
                      />
                      <label htmlFor="checkbox" className="checkbox-label">
                        <i className="ri-moon-fill"></i>
                        <i className="ri-sun-fill"></i>
                        <span className="ball"></span>
                      </label>
                    </div>
                  )}
                </div> */}
                {authtoken == true ? (
                  ""
                ) : (
                  <div className="notification_section  padingrespos">
                    <button
                      className="notification"
                      data-toggle="collapse"
                      data-target="#notification"
                    >
                      <i className="bi bi-bell-fill"></i>
                    </button>
                    <div id="notification" className="collapse">
                      <div className="content_notification">
                        <h3>
                          Notification <Link to="/Historynew">View all</Link>
                        </h3>
                        <div className="overflow_seee">
                          {notifications && notifications.length > 0 ? (
                            notifications.map((item, i) => {
                              return (
                                <>
                                  <a href={item.link} className="msg-noti">
                                    <small>
                                      {Moment(item.createdAt).fromNow()}
                                    </small>
                                    <p className="notification_cls">
                                      {item.message}
                                    </p>
                                  </a>
                                </>
                              );
                            })
                          ) : (
                            <p>No notification found</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Grid>
            </Grid>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {list}
      </Drawer>
      {/* Your other components and content */}
    </div>
  );
};

export default App;
