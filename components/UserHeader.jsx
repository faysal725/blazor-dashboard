"use client";
import { useSelector } from "react-redux";
import Header from "./Header";

export default function UserHeader() {
  const { name, email, id } = useSelector((state) => state.userR);

  return <Header title={`Welcome, ${name}!`} />;
}
