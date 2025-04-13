import React, { useContext } from "react";
import "../Styles/Navbar.css";
import { SocioConnect } from "../Context";

export default function Navbar() {
  const { logout } = useContext(SocioConnect);
  return (
    <div className="border-bottom shadow-sm sticky-top navbar-bg p-2 d-flex justify-content-between align-items-center">
      <h4 className="fw-semibold text-white mx-2">SocioConnect</h4>
      <button onClick={logout} className="mt-1 btn btn-sm btn-primary">
        Logout
      </button>
    </div>
  );
}
