import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("Home");
    } else if (location.pathname === "/add") {
      setActiveTab("AddUser");
    } else if (location.pathname === "/about") {
      setActiveTab("About");
    }
  }, []);

  return (
    <div className="flex flex-row items-center justify-between px-4 p-4 bg-slate-300 ">
      <h1 className="text-3xl  font-semibold ">User Management System</h1>
      <div className="flex flex-row gap-4 items-center justify-between px-4 ">
        <Link to="/">
          <p
            className={` ${
              activeTab === "Home"
                ? "bg-teal-300 border-2 border-slate-400 "
                : "bg-slate-50"
            }  px-2 p-2 rounded-md hover:underline  `}
            onClick={() => setActiveTab("Home")}
          >
            Home
          </p>
        </Link>
        <Link to="/add">
          <p
            className={` ${
              activeTab === "AddUser"
                ? "bg-teal-300 border-2 border-slate-400 "
                : "bg-slate-50"
            }  px-2 p-2 rounded-md hover:underline  `}
            onClick={() => setActiveTab("AddUser")}
          >
            Add User
          </p>
        </Link>
        <Link to="/about">
          <p
            className={` ${
              activeTab === "About"
                ? "bg-teal-300 border-2 border-slate-400 "
                : "bg-slate-50"
            }  px-2 p-2 rounded-md hover:underline  `}
            onClick={() => setActiveTab("About")}
          >
            About
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
