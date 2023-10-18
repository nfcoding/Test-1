import React, { Fragment, useState } from "react";
import SideBar from "../sidebar/SideBar";
import { Collapse, Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarText, NavbarToggler } from "reactstrap";

const Layout = ({ children }) => {
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);
  return (
    <Fragment>
      <div className="App wrapper">
        <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
        {children}
      </div>
    </Fragment>
  );
};

export default Layout;
