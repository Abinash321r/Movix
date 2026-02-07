import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [auth, setAuth] = useState(null);
 const SERVER_URL=import.meta.env.VITE_APP_SERVER_URL
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/checkcookie`, {
          method: "GET",
          credentials: "include",
        });

        const result = await res.json();
        console.log("Server Response:", result);

        if (res.ok) {
          setAuth(true);
        } else {
          setAuth(false);
        }

      } catch (err) {
        console.log("Error verifying token:", err);
        setAuth(false);
      }
    };

    checkAuth();
  }, []);

if (auth === null) return <p>Checking Auth...</p>;

  return auth ? children : <Navigate to="/" replace />;
}
