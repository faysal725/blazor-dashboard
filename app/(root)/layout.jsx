import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

export default function layout({ children }) {
  return (
    <>
      <div className="bg-white min-h-[60vh]">
        <Navbar />
        {children}
      </div>

      <Footer />
    </>
  );
}
