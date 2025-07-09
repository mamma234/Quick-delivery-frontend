import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Restaurants from "./pages/Restaurants";
import Order from "./pages/Order";
import Payment from "./pages/Payment";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Restaurants</Link>{" | "}
        <Link to="/order">Order</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Restaurants />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/order" element={<Order />} />
        <Route path="/pay/:orderId" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
