import React from "react";
import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";
import { MainHomepage } from "../Components/MainHomepage";

export const Homepage = () => {
  document.title = "Dashboard";
  return (
    <div>
      <Navbar />
      <MainHomepage />
      <Footer />
    </div>
  );
};
