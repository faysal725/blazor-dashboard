import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ReduxProvider from "@/components/redux/ReduxProvider";
import React from "react";

export default function layout({ children }) {
  return (
    <ReduxProvider>
      <div className="bg-white min-h-[60vh]">
        <Navbar />
        {children}
      </div>

      <Footer />
    </ReduxProvider>
  );
}
