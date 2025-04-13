import React, { useContext } from "react";
import "../Styles/InstagramLoginPage.css";
import { SocioConnect } from "../Context";

export default function InstagramLoginPage() {
  const { server } = useContext(SocioConnect);
  const handleInstagramLogin = () => {
    // Replace with your Instagram OAuth URL
    // window.location.href =
    //   "https://api.instagram.com/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=user_profile&response_type=code";

    window.location.href = `${server}/auth/instagram`;
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center page-hw"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1740&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <div className="card rectangle-hw p-4 bg-white rounded shadow">
        <h4 className="text-center mx-5">Welcome Back to Socio Connect</h4>
        <p className="subheading">Login to continue with Instagram</p>
        <button onClick={handleInstagramLogin} className="instagram-button">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
            alt="Instagram"
            className="icon"
            style={{ width: "24px", height: "24px", marginRight: "10px" }}
          />
          Login with Instagram
        </button>
      </div>
    </div>
  );
}
