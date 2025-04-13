import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SocioConnect } from "../Context";

const Dashboard = () => {
  const { server } = useContext(SocioConnect);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [media, setMedia] = useState([]);
  const [comments, setComments] = useState({});

  const getComments = (IG_MEDIA_ID) => {
    axios
      .get(`${server}/auth/get/comments/${IG_MEDIA_ID}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMediaData = (id) => {
    axios
      .get("http://localhost:5000/auth/media")
      .then((res) => {
        console.log(res.data);
        for (let i = 0; i < res.data.length; i++) {
          const element = res.data[i];
          getComments(element.id);
        }

        setMedia(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/profile")
      .then((res) => {
        console.log(res.data);
        setProfile(res.data);
        getMediaData(res.data.id);
      })
      .catch(() => navigate("/"));
  }, []);

  const handleCommentChange = (mediaId, value) => {
    setComments((prev) => ({ ...prev, [mediaId]: value }));
  };

  const handleComment = (mediaId) => {
    const message = comments[mediaId];
    if (!message) return alert("Comment cannot be empty.");

    axios
      .post(`http://localhost:5000/auth/media/${mediaId}/comments`, { message })
      .then(() => {
        alert("Comment posted!");
        setComments((prev) => ({ ...prev, [mediaId]: "" }));
      })
      .catch(() => alert("Error posting comment"));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Welcome, {profile?.username}</h2>
      <h3 style={styles.subHeader}>Your Media</h3>
      <div style={styles.mediaGrid}>
        {media.map((m) => (
          <div key={m.id} style={styles.card}>
            {m.media_type === "IMAGE" && (
              <img src={m.media_url} alt={m.caption} style={styles.media} />
            )}
            {m.media_type === "VIDEO" && (
              <video controls style={styles.media}>
                <source src={m.media_url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <p style={styles.caption}>{m.caption}</p>
            <input
              type="text"
              value={comments[m.id] || ""}
              onChange={(e) => handleCommentChange(m.id, e.target.value)}
              placeholder="Write a comment..."
              style={styles.input}
            />
            <button onClick={() => handleComment(m.id)} style={styles.button}>
              Reply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 900,
    margin: "0 auto",
    padding: 20,
    fontFamily: "Arial, sans-serif",
  },
  header: {
    color: "#333",
  },
  subHeader: {
    color: "#555",
    marginBottom: 20,
  },
  mediaGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 20,
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: 10,
    padding: 15,
    width: "calc(50% - 20px)",
    background: "#fafafa",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  media: {
    width: "100%",
    maxHeight: 400,
    objectFit: "cover",
    borderRadius: 8,
    marginBottom: 10,
  },
  caption: {
    fontSize: 16,
    margin: "10px 0",
    color: "#444",
  },
  input: {
    width: "100%",
    padding: 8,
    borderRadius: 5,
    border: "1px solid #ccc",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "8px 12px",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
};

export default Dashboard;
