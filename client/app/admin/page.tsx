"use client";
import React from "react";
import Heading from "../utils/Heading";
import AdminSidebar from "../components/admin/sidebar/AdminSidebar";
import AdminProtected from "../hooks/adminProtected";
import DashboardHero from "../components/admin/DashboardHero";

type Props = object;

const Page = ({}: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="ScholarNet - Admin"
          description="ScholarNet is a platform for students to learn and get help from community."
          keywords="Programming, Mern, Redux, Machine Learning"
        />
        <div className="flex h-[200vh]">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHero isDashboard={true} />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
