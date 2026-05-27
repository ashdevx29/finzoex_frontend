import React, {useEffect} from "react";
import useState from "react-usestateref";
import {Button} from "@material-ui/core";
import "react-dropdown/style.css";
import "rc-slider/assets/index.css";
import Headernew from "./Header";
import TradePage from "./Tradenew";
import {Link, useNavigate} from "react-router-dom";
import {socket} from "./context/socket";
import apiService from "../core/service/detail";
import {postMethod,getMethod} from "../core/service/common.api";
import Moment from "moment";

function Newsideheader() {
  const [loginCheck, setloginCheck] = useState(false);
  const [isOpen, setIsOpen, isOpenref] = useState(false);
  const [themeMode, setthemeMode] = useState("");
  const [notifications, setNotification] = React.useState("");
  let navigate = useNavigate();
  
  useEffect(() => {
    document.body.classList.toggle("light", isOpenref.current);
    fetchTheme();
    let userToken = localStorage.getItem("user_token");
    if (userToken) {
      setloginCheck(true);
      getNotifications();
    } else {
      setloginCheck(false);
    }

    let token_socket = localStorage.getItem("socket_token");
    if (token_socket) {
      socket.connect();
      let socketToken = token_socket.split("_")[0];
      socket.on("socketResponse" + socketToken, function (res) {
        console.log("notify response====", res);
        if (res.Reason == "notify") {
          getNotifications();
        }
      });
    }
  }, [0]);
  const fetchTheme = async () => {
    var theme = await localStorage.getItem("theme");
    setthemeMode(theme);
    if (theme !== undefined) {
      if (theme === "light") {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    } else {
      localStorage.setItem("theme", "dark");
      setIsOpen(false);
    }
  };
  const changeTheme = (value) => {
    if (value) {
      localStorage.setItem("theme", value);
      var settheme = value === "light" ? true : false;
      setthemeMode(settheme);
      setIsOpen(settheme);
      document.body.classList.toggle("light", isOpenref.current);
    }
  };

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

  const read_notification = async (params) => {
    // var onj = {
    //   _id: params._id
    // };
    // var data = {
    //   apiUrl: apiService.readNotify,
    //   payload: onj,
    // };
    // var resp = await postMethod(data);
    // console.log(resp.Message, "-=-=-resp=-=-");
    // if (resp.status) {
        navigate(params.link)
    // }
    // else
    // {

    // }
  };

  return (
    <>
      <header className="sideber_header">
        <div className="mr-auto">
          {/* <TradePage thememode={themeMode}/> */}
          {/* <div className="search_banner">
            <i className="bi bi-search"></i>
            <input type="text" placeholder="Search token" />
          </div> */}
        </div>
        <div className="ml-auto">
          <div className="menu_profile">
            <div className="dropdown">
              {loginCheck && loginCheck === true
                ? ""
                : // <button
                  //   className="btn btn-secondary dropdown-toggle"
                  //   type="button"
                  //   id="dropdownMenuButton"
                  //   data-toggle="dropdown"
                  //   aria-haspopup="true"
                  //   aria-expanded="false"
                  // >
                  //   <img
                  //     src={new URL("../img/newimg/AIEC.png", import.meta.url).href}
                  //     className="logo "
                  //   />
                  // </button>
                  ""}
              {/* <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <a className="dropdown-item" href="#">
                  Something else
                </a>
              </div> */}
            </div>
            {isOpenref.current === true ? (
              <Button onClick={() => changeTheme("dark")}>
                <i style={{color: "black"}} className="bi bi-moon"></i>
              </Button>
            ) : (
              <Button onClick={() => changeTheme("light")}>
                <i className="bi bi-sun"></i>
              </Button>
            )}
            {loginCheck && loginCheck == true ? (
              <div className="notification_section  padingrespos menu_profile notifycount ">
                <Button>
                  <i
                    className="bi bi-bell-fill"
                    data-toggle="collapse"
                    data-target="#notification"
                  ></i>
                </Button>
                <div className="count_data">{notifications.length}</div>
                {/* <button
                  className="btn btn-primary-alta notification"
                  data-toggle="collapse"
                  data-target="#notification"
                >
                  <i className="bi bi-bell-fill"></i>
                </button> */}
                <div id="notification" className="collapse">
                  <div className="content_notification">
                    <h3>
                      Notification <Link to="/profile">View all</Link>
                    </h3>

                    <div className="overflow_seee">
                      {notifications && notifications.length > 0
                        ? notifications.map((item, i) => {
                            return (
                              <>
                                <a className="msg-noti" onClick={() =>read_notification(item)}>
                                  <small>
                                    {Moment(item.createdAt).fromNow()}
                                  </small>
                                  <p>{item.message}</p>
                                </a>
                              </>
                            );
                          })
                        : ""}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </header>
      <div className="header-non fixed_header bg-none">
        <Headernew />
      </div>
    </>
  );
}

export default Newsideheader;
