import React, { useContext } from "react";
import { SocioConnect } from "../Context";
import { Navigate, Outlet } from "react-router-dom";

export default function NonPrivateWrapper() {
  const { userId } = useContext(SocioConnect);
  if (!userId) {
    return <Outlet />;
  }
  return <Navigate to={"/dashboard"} />;
}
