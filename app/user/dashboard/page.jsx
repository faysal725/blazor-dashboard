import Header from "@/components/Header";
import React from "react";

export default function userDashboardPage() {
  return (
    <div>
      <Header
        title="Welcome, User!"
      />
      <section>
        <h2>Recent Orders</h2>
        <ul>
          <li>Order #123 - Shipped</li>
          <li>Order #124 - Pending</li>
        </ul>
      </section>
    </div>
  );
}
