import React, { useEffect, useState } from "react";
import API from "../api";

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [coords, setCoords] = useState({ lat: 12.9716, lng: 77.5946 }); // Default: Bangalore
  const [err, setErr] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
      },
      () => {} // Ignore errors, keep default coords
    );
  }, []);

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const res = await API.get(`/restaurants?lat=${coords.lat}&lng=${coords.lng}`);
        setRestaurants(res.data);
      } catch {
        setErr("Please login to view restaurants.");
      }
    }
    fetchRestaurants();
  }, [coords]);

  if (err) return <div>{err} <a href="/login">Login</a></div>;

  return (
    <div>
      <h2>Nearby Restaurants</h2>
      <ul>
        {restaurants.map(r => (
          <li key={r._id}>
            <b>{r.name}</b> - {r.address}
            <ul>
              {r.menu.map((item, i) => (
                <li key={i}>{item.name} - ₹{item.price}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
