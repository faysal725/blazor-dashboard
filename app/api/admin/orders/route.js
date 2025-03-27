// app/api/admin/orders/route.js
import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";
import { restrictTo } from "@/lib/auth";

export async function GET(req) {
  try {
    // User info from middleware
    const user = req.user;
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Restrict to admin role
    restrictTo(user, "admin");

    // Fetch all orders with user details
    const ordersStmt = db.prepare(`
      SELECT 
        o.id, 
        o.full_name, 
        o.phone, 
        o.address, 
        o.delivery_charge, 
        o.product_qty, 
        o.subtotal, 
        o.total, 
        o.created_at, 
        o.status,
        u.id AS user_id,
        u.name AS user_name,
        u.email AS user_email
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
    `);
    const orders = ordersStmt.all();

    // Fetch order items for each order
    const itemsStmt = db.prepare(`
      SELECT 
        order_id, 
        product_id, 
        title, 
        price, 
        quantity, 
        thumbnail
      FROM order_items
      WHERE order_id = ?
    `);

    const ordersWithDetails = orders.map((order) => ({
      ...order,
      products: itemsStmt.all(order.id),
    }));

    return NextResponse.json({ orders: ordersWithDetails }, { status: 200 });
  } catch (error) {
    console.error("Fetch admin orders error:", error.message);
    if (error.message === "Insufficient permissions") {
      return NextResponse.json(
        { error: "Forbidden: Admin access required" },
        { status: 403 }
      );
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
