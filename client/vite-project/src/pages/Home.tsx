import React from "react";
import Header from "../components/header/Header";
import Carouse from "../components/Carouse/Carouse";
import Bestseller from "../components/Bestseller/Bestseller";
import Listproduct from "../components/Listproduct/Listproduct";
import Footer from "../components/footer/Footer";

export default function Home() {
  return (
    <>
      <Header></Header>
      <Carouse></Carouse>
      <Bestseller></Bestseller>
      <Listproduct></Listproduct>
      <Footer></Footer>
    </>
  );
}
