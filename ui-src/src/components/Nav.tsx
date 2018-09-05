import * as React from "react";
import "./Nav.css";

const Nav = () =>
  <nav className="nav nav-pills flex-column flex-sm-row">
    <a className="flex-sm-fill text-sm-center nav-link active" href="/">All Apps</a>
    <a className="flex-sm-fill text-sm-center nav-link disabled" href="#">My Profile</a>
    <a className="flex-sm-fill text-sm-center nav-link" href="/produceapp">Upload an App</a>
    <a className="flex-sm-fill text-sm-center nav-link disabled" href="#">Recent Downloads</a>
  </nav>
export default Nav;
