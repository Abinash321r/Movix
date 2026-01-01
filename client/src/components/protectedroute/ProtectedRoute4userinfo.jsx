import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileUrl, getLogout } from "../../store/homeslice";

export default function ProtectedRoute({ children }) {
 const dispatch = useDispatch();
 
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/checkcookie", {
          method: "GET",
          credentials: "include",
        });

        const result = await res.json();
        console.log("Server Response:", result);
       if (result?.info?.profilePic) {
                 dispatch(getProfileUrl(result?.info?.profilePic));
               }
       
      } catch (err) {
        console.log("Error verifying token:", err);
      }
    };

    checkAuth();
  }, []);
   return children;
}
