import React, { useState } from "react";
import API from "../api";

export default function Order() {
  const [restaurantId, setRestaurantId] = useState("");
  const [items, setItems] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("");
  const [order, setOrder] = useState(null);

  async function handleOrder(e) {
    e.preventDefault();
    // Format items: "Pizza, Burger"
    const itemList = items.split(",").map(i => ({ name: i.trim() }));
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const res = await API.post("/order", {
          restaurant: restaurantId,
          items: itemList,
          address,
          location: [pos.coords.longitude, pos.coords.latitude]
        });
        setOrder(res.data.order);
        setStatus("Order placed! Order ID: " + res.data.order._id);
      } catch {
        setStatus("Order failed. Try again.");
      }
    });
  }

  return (
    <div>
      <h2>Place Order</h2>
      <form onSubmit={handleOrder}>
        <input placeholder="Restaurant ID" value={restaurantId} onChange={e => setRestaurantId(e.target.value)} required />
        <input placeholder="Items (comma separated)" value={items} onChange={e => setItems(e.target.value)} required />
        <input placeholder="Delivery Address" value={address} onChange={e => setAddress(e.target.value)} required />
        <button type="submit">Place Order</button>
      </form>
      {status && <div>{status}</div>}
      {order && <a href={`/pay/${order._id}`}>Pay Now</a>}
    </div>
  );
}
