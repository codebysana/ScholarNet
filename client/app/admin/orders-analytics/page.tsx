"use client";
import React, { use } from "react";
import Heading from "@/app/utils/Heading";
import AdminSidebar from "@/app/components/admin/sidebar/AdminSidebar";
import DashboardHeader from "@/app/components/admin/DashboardHeader";
import OrderAnalytics from "@/app/components/admin/analytics/OrderAnalytics";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  console.log("id", id);
  return (
    <div>
      <Heading
        title="ScholarNet - Admin"
        description="ScholarNet is a platform for students to learn and get help from teachers."
        keywords="Programming, Mern, Redux, Machine Learning"
      />
      <div className="flex h-screen">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHeader />
          <OrderAnalytics />
        </div>
      </div>
    </div>
  );
};

export default Page;
