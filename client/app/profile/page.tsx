/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { FC, useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Profile from "../components/profile/Profile";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";

type Props = {};

const page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);
  return (
    <div className="min-h-screen">
      <Protected>
        <Heading
          title={`${user?.name} Profile - ScholarNet`}
          description="Mentora is a platform where students can enroll and learn courses from international teachers."
          keywords="Programming, MERN, Redux Toolkit, Machine Lerning"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          route={route}
          setRoute={setRoute}
        />
        <Profile user={user} />
        <Footer />
      </Protected>
    </div>
  );
};

export default page;
