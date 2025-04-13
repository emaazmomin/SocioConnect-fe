import React, { useEffect, useState } from "react";
import { Outlet, replace, useLocation, useNavigate } from "react-router-dom";
import { SocioConnect } from "../Context";
import { vars } from "../../AppVariables";
import axios from "axios";

export default function Wrapper() {
  const server = vars.server;
  const location = useLocation();
  const navigate = useNavigate();
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(true);
  const [callApi, setCallApi] = useState(true);
  const [profile, setProfile] = useState(null);

  const getProfileInfo = (userId) => {
    axios
      .get(`${server}/auth/profile/${userId}`)
      .then((res) => {
        localStorage.setItem("userId", res.data.id);
        localStorage.setItem("profile", JSON.stringify(res.data));
        setProfile(res.data);
        setUserId(res.data.id);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = () => {
    console.log("called");
    setCallApi(false);
    localStorage.clear();
    setUserId();
    setProfile();
    setLoading(true);

    // navigate("/", { replace: true });
  };

  useEffect(() => {
    if (!userId) {
      let userId = localStorage.getItem("userId");
      let profile = JSON.parse(localStorage.getItem("profile"));
      console.log("useeffect", userId, profile, location);
      if (!userId || userId === "null" || userId === "undefined" || !profile) {
        if (
          location.pathname === "/dashboard" &&
          location.search.split("=")[1] &&
          callApi
        ) {
          getProfileInfo(location.search.split("=")[1]);
        } else {
          setLoading(false);
        }
      } else {
        setProfile(profile);
        setUserId(userId);
        setLoading(false);
      }
    }
  }, [userId]);

  if (!loading) {
    return (
      <SocioConnect.Provider
        value={{
          userId,
          server,
          profile,
          logout,
        }}
      >
        <Outlet />
      </SocioConnect.Provider>
    );
  }
}
