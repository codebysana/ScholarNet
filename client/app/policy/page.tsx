"use client";
import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Policy from "./Policy";

type Props = object;

const Page = ({}: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem] = useState(2);
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <Heading
        title="Privacy Policy - ScholarNet"
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
      <Policy />
      <Footer />
    </div>
  );
};

export default Page;
