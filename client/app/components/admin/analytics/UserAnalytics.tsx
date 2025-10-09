/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Loader from "../../loader/Loader";
import { useGetUsersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import { styles } from "@/app/styles/style";

type Props = {
  isDashboard?: boolean;
};

// const analyticsData = [
//   { name: "January 2025", count: 440 },
//   { name: "February 2025", count: 8200 },
//   { name: "March 2025", count: 4033 },
//   { name: "April 2025", count: 4502 },
//   { name: "May 2025", count: 2042 },
//   { name: "June 2025", count: 3454 },
//   { name: "July 2025", count: 356 },
//   { name: "August 2025", count: 5667 },
//   { name: "September 2025", count: 1320 },
//   { name: "October 2025", count: 6520 },
//   { name: "November 2025", count: 5480 },
//   { name: "December 2025", count: 405 },
// ];

const UserAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetUsersAnalyticsQuery({});
  const analyticsData: any = [];
  data &&
    data?.users?.last12Months?.forEach((item: any) => {
      analyticsData.push({ name: item.month, count: item.count });
    });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`${
            !isDashboard
              ? "mt-[50px]"
              : "mt-[50px] shadow-sm mb-5 rounded-sm w-[95%] mx-auto"
          }`}
        >
          <div className={`${isDashboard ? "!ml-8 mb-5" : ""}`}>
            <h1
              className={`${styles.title} ${
                isDashboard && "!text-[20px] px-5 !text-start"
              }`}
            >
              User Analytics
            </h1>
            {!isDashboard && (
              <p className={`${styles.label} pl-22`}>
                Last 12 months analytics data
              </p>
            )}
          </div>
          <div
            className={`w-full ${
              isDashboard ? "!h-[30vh] dark:bg-[#111C43]" : "h-screen"
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={!isDashboard ? "50%" : "100%"}
            >
              <AreaChart
                data={analyticsData}
                margin={{
                  top: 20,
                  right: 30,
                  bottom: 0,
                  left: 0,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#4d62d9"
                  fill="#4d62d9"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default UserAnalytics;
