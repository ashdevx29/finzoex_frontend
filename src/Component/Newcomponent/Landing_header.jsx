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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
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
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isOpen, setIsOpen, isOpenref] = useState(false);
  const [notifications, setNotification] = useState("");

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
    } catch (error) {}
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
  const [authtoken, setauthtoken] = useState(false);
  useEffect(() => {
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
    } else {
      setauthtoken(true);
    }
    fetchTheme();

    var curr_url = window.location.href;
    var spliturl = curr_url != null ? curr_url.split("/") : "";
    if (spliturl != "") {
      if (spliturl.length > 0) {
        if (
          spliturl[3] == "Security" ||
          spliturl[3] == "Kycverify" ||
          spliturl[3] == "Userprofile"
        ) {
          setDrawerOpen(true);
        } else {
          setDrawerOpen(false);
        }
      }
    }
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
            <ListItem button key="Staking" onClick={() => navbar("staking")}>
              <ListItemText primary="Staking" />
            </ListItem>
            <ListItem
              button
              key="Launchpad"
              onClick={() => navbar("launchpad")}
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

            <ListItem button key="Staking" onClick={() => navbar("staking")}>
              <ListItemText primary="Staking" />
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
    if (value == "") {
    } else if (value == "register") {
      navigate("/register");
    } else if (value == "login") {
      navigate("/login");
    }

    if (value == "dashboard") {
      navigate("/Dashboardpage");
    } else if (value == "p2p") {
      navigate("/p2p");
    } else if (value == "trade") {
      navigate("/trade/BTC_USDT");
    } else if (value == "staking") {
      navigate("/Stakehome");
    } else if (value == "staking") {
      navigate("/Stakehome");
      navigate("/login");
    } else if (value == "launchpad") {
      navigate("/launchpadlistnew");
    } else if (value == "staking") {
      navigate("/Stakehome");
    } else if (value == "trade") {
      navigate("/trade/BTC_USDT");
    } else if (value == "dashboard") {
      navigate("/Dashboardpage");
    } else if (value == "profile") {
      navigate("/Userprofile");
    } else if (value == "swap") {
      navigate("/Swaphome");
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
    console.log("href path---",window.location.pathname)

    var pathsplit = window.location.pathname.split('/');

    if(pathsplit.length > 0)
    {
      if(pathsplit[1] == "trade")
      {
        socket.emit("loadchart", value);
      }
    }
  };

  return (
    <div>
      <AppBar position="static" className="custom-appbar">
        <Toolbar className="dilesd">
          <img
            onClick={homeNav}
            src={new URL("../../img/New_images/logo_dark.png", import.meta.url).href}
            className="img-fluid logo_new"
          />
          <img
            onClick={homeNav}
            src={new URL("../../img/New_images/logo_light.png", import.meta.url).href}
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
              {/* {authtoken == true ? (
                ""
              ) : (
                <Grid item>
                  <Button
                    onClick={() => navbar("dashboard")}
                    color="inherit"
                    className="link"
                  >
                    Dashboard
                  </Button>
                </Grid>
              )}  */}
              <Grid item>
                <Button
                  onClick={() => navbar("p2p")}
                  color="inherit"
                  className="link"
                >
                  P2P
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => navbar("trade")}
                  color="inherit"
                  className="link"
                >
                  Trade
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => navbar("staking")}
                  color="inherit"
                  className="link"
                >
                  Staking
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => navbar("launchpad")}
                  color="inherit"
                  className="link"
                >
                  Launchpad
                </Button>
              </Grid>
              {authtoken == true ? "" : <Grid item></Grid>}
              {authtoken == true ? "" : <Grid item></Grid>}
              <Grid item></Grid>
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
                <div>
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
                </div>
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
