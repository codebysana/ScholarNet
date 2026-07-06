/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FAQs from "../components/faqs/FAQs";

type Props = object;

const page = ({}: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem] = useState(4);
  const [route, setRoute] = useState("Login");

  return (
    <div className="min-h-screen">
      <Heading
        title="FAQs - ScholarNet"
        description="ScholarNet is a learning management system for helping programmers."
        keywords="Programming, Mern"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />
      <FAQs />
      <Footer />
    </div>
  );
};

export default page;
