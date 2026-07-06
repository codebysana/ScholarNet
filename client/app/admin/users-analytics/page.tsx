"use client";
import React from "react";
import Heading from "../../utils/Heading";
// import AdminProtected from "@/app/hooks/adminProtected";
import DashboardHeader from "../../components/admin/DashboardHeader";
import AdminSidebar from "../../components/admin/sidebar/AdminSidebar";
import UserAnalytics from "../../components/admin/analytics/UserAnalytics";

const Page = () => {
  return (
    <div>
      {/* <AdminProtected> */}
      <Heading
        title="ScholarNet - Admin"
        description="ScholarNet is a platform for students to learn and get help from teachers."
        keywords="Programming, Mern, Redux, Machine Learning"
      />
      <div className="flex">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHeader />
          <UserAnalytics />
        </div>
      </div>
      {/* </AdminProtected> */}
    </div>
  );
};

export default Page;
