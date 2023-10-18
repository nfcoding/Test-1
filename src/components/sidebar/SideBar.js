import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/loginSlice";
import Cookie from "universal-cookie";

const SideBar = ({ isOpen, toggle }) => {
  const cookie = new Cookie();
  const location = useLocation();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.login.status);

  const handleLogout = () => {
    window.location.href = "/";

    dispatch(login(false));
    cookie.remove("token");
  };

  useEffect(() => {
    // if (!status) {
    //   window.location.href = "/";
    // }

    if (!cookie.get("token")) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className={classNames("sidebar", { "is-open": isOpen })}>
      <div className="sidebar-header">
        <div className="d-flex justify-content-center align-items-center"></div>
        <span color="info" onClick={toggle} style={{ color: "#fff" }}>
          &times;
        </span>
      </div>
      <div className="side-menu">
        <Nav vertical className="list-unstyled pb-3">
          <NavItem>
            <NavLink tag={Link} to={"/checklist"} id="sidebar-link" style={location.pathname === "/checklist" ? { backgroundColor: "#46484b" } : {}}>
              <FontAwesomeIcon icon={faUser} className="me-2" />
              Checklist
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink tag={Link} id="sidebar-link" onClick={() => handleLogout()}>
              <FontAwesomeIcon icon={faDoorOpen} className="me-2" />
              logout
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    </div>
  );
};

export default SideBar;
