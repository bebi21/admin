import React from "react";
import SideBar from "./sidebar/SideBar";
import Home from "./page/Home";
import { Outlet } from "react-router-dom";
export default function AdminHome() {
  return (
    <>
      <div className="flex">
        <SideBar></SideBar>
        <div className="w-10/12 h-[100vh]">
          <Outlet />
        </div>
      </div>
    </>
  );
}
