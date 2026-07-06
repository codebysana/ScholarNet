// New Client Folder

/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/routes/Hero";
import Courses from "./components/routes/Courses";
import Reviews from "./components/routes/Reviews";
import FAQS from "./components/faqs/FAQs";
import Footer from "./components/Footer"
// import "../globals.css"

const Page: FC = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  return (
    <div>
      <Heading
        title="ScholarNet"
        description="ScholarNet is a platform where students can enroll and learn courses from international teachers."
        keywords="Programming, MERN, Redux Toolkit, Machine Lerning"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />
      <Hero />
      <Courses />
      <Reviews />
      <FAQS />
      <Footer />
    </div>
  );
};

export default Page;
