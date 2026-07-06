"use client";
import React from "react";
import Heading from "../../utils/Heading";
import AdminSidebar from "../../components/admin/sidebar/AdminSidebar";
import AllInvoices from "@/app/components/admin/order/AllInvoices";

type Props = object;

const Page = ({}: Props) => {
  return (
    <div>
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
          <AllInvoices />
        </div>
      </div>
    </div>
  );
};

export default Page;
