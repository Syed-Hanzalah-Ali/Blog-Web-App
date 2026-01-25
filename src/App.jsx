import React, { useEffect, useState } from "react";
import { authService } from "./appwrite/auth";
import { login, logout } from "./store/auth.Slice.js";
import { useDispatch } from "react-redux";
import { Footer, Header } from "./components/index.js";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        // runs everytime
        setLoading(false);
      });
  }, []);
  return (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      {loading === false ? (
        <div className="w-full-block">
          <Header />
          <main></main>
          <Footer />
        </div>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}

export default App;
