import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { logo } from "./assets";

import { Home, CreatePost, Signup } from "./pages";

const App = () => {
  const [email, setEmail] = useState("");
  const [isAuth, setIsAuth] = useState(true);
  useEffect(() => {
    const storedEmail = localStorage.getItem("authenticated");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <header
          className="w-full flex justify-between items-center bg-white
         sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]"
        >
          <Link to="/">
            <img src={logo} alt="logo" className="w-28 object-contain" />
          </Link>
          <div className="space-x-5">
            <Link
              to="/create-post"
              className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
            >
              Create
            </Link>

            {email && window.location.pathname === "/" ? (
              <Link
                className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
                onClick={() => {
                  localStorage.removeItem("authenticated");
                  setEmail("");
                  window.location.reload();
                  alert("Logout successful");
                }}
              >
                Logout
              </Link>
            ) : (
              <Link
                to="/signup"
                className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
              >
                Login or Signup
              </Link>
            )}

            <p>{email}</p>
          </div>
        </header>
        <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
};

export default App;
