import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./components/login_admin/Login";
import { Routes, Route } from "react-router-dom";
import AdminHome from "./components/admin_home/AdminHome";
import Home from "./components/admin_home/page/Home";
import Product from "./components/admin_home/page/Product";
import Bill from "./components/admin_home/page/Bill";
import AdminList from "./components/admin_home/page/AdminList";
import Category from "./components/admin_home/page/Category";
import Ticket from "./components/admin_home/page/Ticket";
import Penefit from "./components/admin_home/page/Penefit";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminHome />}>
          <Route path="home" element={<Home />} />
          <Route path="product" element={<Product />} />
          <Route path="bill" element={<Bill />} />
          <Route path="adminlist" element={<AdminList />} />
          <Route path="category" element={<Category />} />
          <Route path="penefit" element={<Penefit />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
