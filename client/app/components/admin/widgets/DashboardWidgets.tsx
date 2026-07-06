/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useState } from "react";
import { BiBorderLeft } from "react-icons/bi";
import UserAnalytics from "../analytics/UserAnalytics";
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress } from "@mui/material";
import OrderAnalytics from "../analytics/OrderAnalytics";
import AllInvoices from "../order/AllInvoices";
import {
  useGetOrdersAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} from "@/redux/features/analytics/analyticsApi";

type Props = {
  open?: boolean;
  value?: number;
};

type ComparePercentage = {
  currentMonth: number;
  previousMonth: number;
  percentChange: number;
};

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
    </Box>
  );
};
const DashboardWidgets: FC<Props> = ({ open }) => {
  const [comparePercentage, setComparePercentage] = useState<ComparePercentage | null>(null);
  const [ordersComparePercentage, setOrdersComparePercentage] = useState<ComparePercentage | null>(null);
  const [userComparePercentage, setUserComparePercentage] = useState<ComparePercentage | null>(null);
  const { data, isLoading } = useGetUsersAnalyticsQuery({});
  const { data: ordersData, isLoading: ordersLoading } =
    useGetOrdersAnalyticsQuery({});

  const ordersPercentChange = ordersComparePercentage?.percentChange ?? 0;
  const usersPercentChange = userComparePercentage?.percentChange ?? 0;

  useEffect(() => {
    if (isLoading && ordersLoading) {
      return;
    } else {
      if (data && ordersData) {
        const usersLastTwoMonths = data?.users?.last12Months?.slice(-2) ?? [];

        const ordersLastTwoMonths =
          ordersData?.orders?.last12Months?.slice(-2) ?? [];

        if (usersLastTwoMonths.length === 2 && ordersLastTwoMonths === 2) {
          const usersCurrentMonth = usersLastTwoMonths[1].count;
          const usersPreviousMonth = usersLastTwoMonths[0].count;

          const ordersCurrentMonth = ordersLastTwoMonths[1].count;
          const ordersPreviousMonth = ordersLastTwoMonths[0].count;

          const usersPercentChange =
            usersPreviousMonth !== 0
              ? ((usersCurrentMonth - usersPreviousMonth) /
                  usersPreviousMonth) *
                100
              : 100;

          const ordersPercentChange =
            ordersPreviousMonth !== 0
              ? ((ordersCurrentMonth - ordersPreviousMonth) /
                  ordersPreviousMonth) *
                100
              : 100;

          setUserComparePercentage({
            currentMonth: usersCurrentMonth,
            previousMonth: usersPreviousMonth,
            percentChange: usersPercentChange,
          });

          setOrdersComparePercentage({
            currentMonth: ordersCurrentMonth,
            previousMonth: ordersPreviousMonth,
            percentChange: ordersPercentChange,
          });
        }
      }
    }
  }, [isLoading, ordersLoading, data, ordersData]);
  return (
    // <div className="mt-[30px] min-h-screen w-full max-w-7xl mx-auto px-4">
    //   <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    //     <div className="lg:col-span-2 py-6 bg-transparent mt-4 flex-1">
    //       <UserAnalytics isDashboard={true} />
    //     </div>

    //     <div className="pt-[80px] pr-3">
    //       <div className="dark:bg-[#111C43] rounded-sm shadow mb-8">
    //         <div className="flex items-center p-5 justify-between">
    //           <div className="">
    //             <BiBorderLeft className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
    //             <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
    //               {ordersComparePercentage?.currentMonth}
    //             </h5>
    //             <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]">
    //               Sales Obtained
    //             </h5>
    //           </div>
    //           <div className="">
    //             <CircularProgressWithLabel
    //               value={ordersComparePercentage?.percentChange > 0 ? 100 : 0}
    //               open={open}
    //             />
    //             <h5 className="text-center pt-4">
    //               {ordersComparePercentage?.percentChange > 0
    //                 ? "+" + ordersComparePercentage?.percentChange.toFixed(2)
    //                 : "-" +
    //                   ordersComparePercentage?.percentChange.toFixed(2)}{" "}
    //               %
    //             </h5>
    //           </div>
    //         </div>
    //       </div>

    //       <div className=" dark:bg-[#111C43] rounded-sm shadow my-8">
    //         <div className="flex items-center p-5 justify-between">
    //           <div className="">
    //             <PiUsersFourLight className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
    //             <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
    //               {userComparePercentage?.currentMonth}
    //             </h5>
    //             <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]">
    //               New Users
    //             </h5>
    //           </div>
    //           <div className="">
    //             <CircularProgressWithLabel
    //               value={userComparePercentage?.percentChange > 0 ? 100 : 0}
    //               open={open}
    //             />
    //             <h5 className="text-center pt-4">
    //               {userComparePercentage?.percentChange > 0
    //                 ? "+" + userComparePercentage?.percentChange.toFixed(2)
    //                 : "-" +
    //                   userComparePercentage?.percentChange.toFixed(2)}{" "}
    //               %
    //             </h5>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-[30px]">
    //     <div className="lg:col-span-2 dark:bg-[#111c43] shadow-sm py-6 rounded-sm mx-5 mt-3 flex-1">
    //       <OrderAnalytics isDashboard={true} />
    //     </div>
    //     <div className="dark:bg-[#fff] text-black shadow-sm rounded-sm mr-3 flex-1">
    //       <h5 className="text-[20px] font-[400] font-Poppins p-3">
    //         Recent Transactions
    //       </h5>
    //       <AllInvoices isDashboard={true} />
    //     </div>
    //   </div>
    // </div>

    <div className="mt-[120px] h-screen w-full max-w-5xl mx-auto px-4 space-y-8">
      <h1 className="text-[20px] font-[500]">Learning Graphs</h1>
      {/* Users Analytics + Stats */}
      <div className="bg-[#111C43] rounded-2xl shadow-md p-6 flex flex-col lg:flex-row gap-6">
        {/* Left: User Analytics */}
        <div className="flex-[2] flex flex-col">
          <div className="flex-1">
            <UserAnalytics isDashboard={true} />
          </div>
        </div>

        {/* Right: Sales + New Users */}
        <div className="flex-[1] flex flex-col gap-3 justify-center">
          {/* Sales Obtained */}
          <div className="bg-[#0F172A] rounded-xl p-5 flex justify-between items-center">
            <div>
              <BiBorderLeft className="text-[#01b19a] text-[28px]" />
              <p className="mt-2 text-white text-[22px] font-semibold">
                {ordersComparePercentage?.currentMonth}
              </p>
              <p className="text-[#01b19a] text-[14px] font-medium">
                Sales Obtained
              </p>
            </div>
            <div className="text-center">
              <CircularProgressWithLabel
                value={(ordersComparePercentage?.percentChange ?? 0) > 0 ? 100 : 0}
                open={open}
              />
              <p className="pt-2 text-[#01b19a] text-sm font-medium">
                {(ordersComparePercentage?.percentChange ?? 0) > 0
                  ? "+" + ordersComparePercentage?.percentChange.toFixed(2)
                  : "-" +
                    ordersComparePercentage?.percentChange.toFixed(2)}{" "}
                %
              </p>
            </div>
          </div>

          {/* New Users */}
          <div className="bg-[#0F172A] rounded-xl p-5 flex justify-between items-center">
            <div>
              <PiUsersFourLight className="text-[#01b19a] text-[28px]" />
              <p className="mt-2 text-white text-[22px] font-semibold">
                {userComparePercentage?.currentMonth}
              </p>
              <p className="text-[#01b19a] text-[14px] font-medium">
                New Users
              </p>
            </div>
            <div className="text-center">
              <CircularProgressWithLabel
                value={(userComparePercentage?.percentChange ?? 0) > 0 ? 100 : 0}
                open={open}
              />
              <p className="pt-2 text-[#01b19a] text-sm font-medium">
                {(userComparePercentage?.percentChange ?? 0) > 0
                  ? "+" + (userComparePercentage?.percentChange ?? 0).toFixed(2)
                  : "-" + (userComparePercentage?.percentChange ?? 0).toFixed(2)}{" "}
                %
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Analytics + Recent Transactions */}
      <div className="bg-[#111C43] rounded-2xl shadow-md p-6 flex flex-col lg:flex-row gap-6">
        {/* Left: Order Analytics */}
        <div className="flex-[2] flex flex-col">
          <div className="flex-1">
            <OrderAnalytics isDashboard={true} />
          </div>
        </div>

        {/* Right: Recent Transactions */}
        <div className="flex-[1] bg-[#0F172A] rounded-xl p-5 text-white flex flex-col">
          <h2 className="text-[18px] font-semibold mb-4">
            Recent Transactions
          </h2>
          <div className="flex-1 overflow-y-auto">
            <AllInvoices isDashboard={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
