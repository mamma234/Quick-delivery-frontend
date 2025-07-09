import React, { useState, useEffect } from "react";
import API from "../api";
import { useParams } from "react-router-dom";

export default function Payment() {
  const { orderId } = useParams();
  const [amount, setAmount] = useState(0);
  const [pmid, setPmid] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await API.get(`/order/${orderId}`);
        // Simple sum of item prices, assuming backend returns full items info
        let total = 0;
        if (res.data.items) {
          total = res.data.items.reduce((a, b) => a + (b.price || 100), 0); // fallback if price missing
        }
        setAmount(total * 100); // Stripe expects paise
      } catch {
        setMsg("Cannot fetch order.");
      }
    }
    fetchOrder();
  }, [orderId]);

  async function handlePay(e) {
    e.preventDefault();
    try {
      const res = await API.post("/pay", { amount, payment_method_id: pmid });
      setMsg("Payment successful!");
    } catch {
      setMsg("Payment failed.");
    }
  }

  return (
    <div>
      <h2>Pay for Order</h2>
      <div>Order ID: {orderId}</div>
      <div>Amount: ₹{amount / 100}</div>
      <form onSubmit={handlePay}>
        <input placeholder="Stripe Payment Method ID" value={pmid} onChange={e => setPmid(e.target.value)} required />
        <button type="submit">Pay</button>
      </form>
      {msg && <div>{msg}</div>}
    </div>
  );
}
