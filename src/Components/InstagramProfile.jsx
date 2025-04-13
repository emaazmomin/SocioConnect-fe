import React, { useContext, useEffect, useState } from "react";
import "../Styles/InstagramProfile.css";
import axios from "axios";
import { SocioConnect } from "../Context";
import Navbar from "./Navbar";

function InstagramProfile() {
  const { server, userId, profile, logout } = useContext(SocioConnect);
  const [activeTab, setActiveTab] = useState("posts");
  const [media, setMedia] = useState([]);

  const getComments = (IG_MEDIA_ID) => {
    axios
      .get(`http://localhost:5000/auth/get/comments/${IG_MEDIA_ID}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMediaData = () => {
    axios
      .get(`${server}/auth/media/${userId}`)
      .then((res) => {
        setMedia(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (userId) {
      getMediaData();
    }
  }, [userId]);

  return (
    <>
      <Navbar />
      <div className="container my-3">
        {profile && (
          <div className="d-flex align-items-center mb-4 border p-2 rounded shadow-sm">
            <div>
              <img
                src={profile.profile_picture_url}
                alt="Profile"
                className="rounded-circle me-3 profile-img"
              />
            </div>
            <div className="d-flex flex-column">
              <h4>{profile.username}</h4>
              <div className="d-flex gap-2">
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <p className="mb-0 fw-bold">{profile.follows_count}</p>
                  <p className="mb-0">Followers</p>
                </div>
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <p className="mb-0 fw-bold">{profile.followers_count}</p>
                  <p className="mb-0">Followers</p>
                </div>
                {/* <div className="d-flex flex-column align-items-center justify-content-center">
                <p className="mb-0 fw-bold">{profile.media_count}</p>
                <p>Posts</p>
              </div> */}
              </div>
              {/* <button
                onClick={logout}
                className="mt-1 btn btn-sm btn-outline-danger"
              >
                Logout
              </button> */}
            </div>
          </div>
        )}
        <div className="border p-2 shadow-sm rounded">
          {profile && (
            <p className="mt-1 mb-2 fw-semibold">
              Total Post: {profile.media_count}
            </p>
          )}
          <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
              <button
                className={`nav-link fw-semibold ${activeTab === "posts" ? "active" : ""}`}
                onClick={() => setActiveTab("posts")}
              >
                Posts
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link fw-semibold ${activeTab === "reels" ? "active" : ""}`}
                onClick={() => setActiveTab("reels")}
              >
                Reels
              </button>
            </li>
          </ul>
          <div className="media-grid">
            {activeTab === "posts" &&
              media.map(
                (post) =>
                  post.media_type === "IMAGE" && (
                    <div
                      key={post.id}
                      className="media-card border rounded shadow-sm"
                    >
                      <img
                        src={post.media_url}
                        alt="Post"
                        className="media rounded-top"
                      />
                      {post.caption ? (
                        <div
                          className="caption p-2 fw-semibold"
                          dangerouslySetInnerHTML={{
                            __html: post.caption.replace(/\n/g, "<br>"),
                          }}
                        ></div>
                      ) : (
                        <div className="p-2 text-secondary">No Caption</div>
                      )}
                    </div>
                  )
              )}
          </div>
          <div className="media-grid">
            {activeTab === "reels" &&
              media.map(
                (post) =>
                  post.media_type !== "IMAGE" && (
                    <div
                      key={post.id}
                      className="media-card border rounded shadow-sm"
                    >
                      <video controls className="media rounded-top">
                        <source src={post.media_url} type="video/mp4" />
                      </video>
                      {post.caption ? (
                        <div
                          className="caption p-2 fw-semibold"
                          dangerouslySetInnerHTML={{
                            __html: post.caption.replace(/\n/g, "<br>"),
                          }}
                        ></div>
                      ) : (
                        <div className="p-2 text-secondary">No Caption</div>
                      )}
                    </div>
                  )
              )}
          </div>
        </div>
      </div>
    </>
  );
}

export default InstagramProfile;
