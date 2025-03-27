// app/api/orders/route.js
import { NextResponse } from "next/server";
import { db, insertOrder, insertOrderItem } from "@/lib/db";

export async function POST(req) {
  try {
    // Get user from custom header
    const userHeader = req.headers.get("x-user");
    const user = userHeader ? JSON.parse(userHeader) : null;
    console.log("User from x-user header in /api/orders:", user);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cartData = await req.json();
    const {
      fullName,
      phone,
      address,
      deliveryCharge,
      productQty,
      products,
      subtotal,
      total,
    } = cartData;

    if (!products || products.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const createdAt = Date.now();
    const orderData = { ...cartData, createdAt };

    const orderResult = insertOrder.run(
      user.id,
      fullName,
      phone,
      address,
      deliveryCharge,
      productQty,
      subtotal,
      total,
      createdAt,
      "pending"
    );
    const orderId = orderResult.lastInsertRowid;

    products.forEach((product) => {
      insertOrderItem.run(
        orderId,
        product.id,
        product.title,
        product.price,
        product.quantity || 1,
        product.thumbnail
      );
    });

    return NextResponse.json(
      {
        message: "Order placed successfully",
        orderId,
        order: orderData,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    // Get user from custom header
    const userHeader = req.headers.get("x-user");
    const user = userHeader ? JSON.parse(userHeader) : null;
    console.log("User from x-user header in /api/orders GET:", user);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch orders for this user
    const ordersStmt = db.prepare(`
        SELECT 
          id, full_name, phone, address, delivery_charge, product_qty, 
          subtotal, total, created_at, status
        FROM orders
        WHERE user_id = ?
      `);
    const orders = ordersStmt.all(user.id);

    // Fetch order items for each order
    const itemsStmt = db.prepare(`
        SELECT 
          order_id, product_id, title, price, quantity, thumbnail
        FROM order_items
        WHERE order_id = ?
      `);

    const ordersWithItems = orders.map((order) => ({
      ...order,
      products: itemsStmt.all(order.id),
    }));

    return NextResponse.json({ orders: ordersWithItems }, { status: 200 });
  } catch (error) {
    console.error("Fetch orders error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
