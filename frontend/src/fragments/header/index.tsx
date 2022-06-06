import { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import { Link, Navigate } from "react-router-dom";

import styles from "./styles.module.css";

const Header = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const deleteSession = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserData({
      userId: "",
      email: "",
      name: "",
      role: "",
      token: "",
    });
  };

  return (
    <header className={styles.mainHeader}>
      <div>
        <Link to="/">Posts App</Link>
        <ul>
          <li>
            <Link to={"/"}>Posts</Link>
          </li>
          {!token && (
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
          )}
           {(token || userData.token) && user.role === "admin" && (
            <li>
              <Link to={"/logs"}>Logs</Link>
            </li>
          )}
          {(token || userData.token) && user.role === "admin" && (
            <li>
              <Link to={"/users"}>Users</Link>
            </li>
          )}
          {(token || userData.token) && (
            <li>
              <span role={"button"} onClick={() => deleteSession()}>
                Logout
              </span>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};
export default Header;
