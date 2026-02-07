import React, { useState } from "react";
import "./Signup_login.css";
import { useDispatch, useSelector } from "react-redux";
import { getProfileUrl, getLogout } from "../../store/homeslice";

function Signup_login({ show, onClose }) {

  const SERVER_URL=import.meta.env.VITE_APP_SERVER_URL
  const dispatch = useDispatch();
  const profileUrl = useSelector((state) => state.home.profile_url);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loadingSignup, setLoadingSignup] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleLogout = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        dispatch(getLogout());
        setMessage("Logged out Successfully!");
        setTimeout(() => onClose(), 800);
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleSubmit = async (e, isLogin) => {
    e.preventDefault();
    setMessage("");

    if (isLogin) setLoadingLogin(true);
    else setLoadingSignup(true);

    try {
      let res;

      if (isLogin) {
        res = await fetch(`${SERVER_URL}/logindata`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        const data = new FormData();
        data.append("username", formData.username);
        data.append("email", formData.email);
        data.append("password", formData.password);
        data.append("profilePic", profilePic);

        res = await fetch(`${SERVER_URL}/signupdata`, {
          method: "POST",
          credentials: "include",
          body: data,
        });
      }

      const result = await res.json();

      if (res.ok) {
        setMessage(isLogin ? "Login Successful!" : "Signup Successful!");

        if (result.user?.profilePic) {
          dispatch(getProfileUrl(result.user.profilePic));
        }

        setTimeout(() => {}, 1000);
      } else {
        setMessage(result.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server not responding!");
    }

    setLoadingLogin(false);
    setLoadingSignup(false);
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">

        <h2>{profileUrl!==null ? "Account" : "Signup / Login"}</h2>

        {message && <p className="message">{message}</p>}

        {profileUrl==null ? (
          <form>

            <input type="text" name="username" placeholder="Username"
              onChange={handleChange} required />

            <input type="email" name="email" placeholder="Email"
              onChange={handleChange} required />

            <input type="password" name="password" placeholder="Password"
              onChange={handleChange} required />

            <label className="upload-label">
              Upload Profile
              <input type="file" accept="image/*"
                onChange={handleFileChange} hidden />
            </label>

            {preview && (
              <img className="preview-image" src={preview} alt="Preview" />
            )}

            <button type="submit"
              disabled={loadingSignup}
              onClick={(e) => handleSubmit(e, false)}
              className="signup-btn"
            >
              {loadingSignup ? "Signing up..." : "Signup"}
            </button>

            <button type="button"
              disabled={loadingLogin}
              onClick={(e) => handleSubmit(e, true)}
              className="login-btn"
            >
              {loadingLogin ? "Logging in..." : "Login"}
            </button>

          </form>
        ) : (
          <>
            <img src={profileUrl} className="preview-image" alt="Profile" />
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}

        <button className="close-btn" onClick={onClose}>✕</button>
      </div>
    </div>
  );
}

export default Signup_login;
