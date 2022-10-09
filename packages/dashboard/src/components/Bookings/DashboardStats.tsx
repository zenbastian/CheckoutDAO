import React from "react";
import "./DashboardContent.css";

export default function DashboardStats() {
  return (
    <div className="statsContainer">
      <div className="stat">
        <h3>Total Bookings</h3>
        <p>2</p>
      </div>
      <div className="stat">
        <h3>Total Transactions</h3>
        <p>2</p>
      </div>
      <div className="stat">
        <h3>Cumulative Rewards</h3>
        <p>DAI 102</p>
      </div>
    </div>
  );
}
