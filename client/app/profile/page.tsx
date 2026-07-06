"use client";
import React, { FC, useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Profile from "../components/profile/Profile";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";

type Props = object;

type UserCourse = {
  _id: string;
};

type User = {
  courses: UserCourse[];
  name?: string;
  email?: string;
  avatar?: { url?: string } | string | null;
  role?: string;
  [key: string]: unknown;
};


type RootState = {
  auth: {
    user: User | null;
  };
};

const Page: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem] = useState(5);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: RootState) => state.auth);
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
        {user && <Profile user={user} />}
        <Footer />
      </Protected>
    </div>
  );
};

export default Page;
