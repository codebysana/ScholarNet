"use client";
import React, { FC, useEffect, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import { useLogoutQuery } from "../../../redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import CourseCard from "../courses/CourseCard";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { UserCourseData, CourseDetails } from "@/app/types/course";

type Props = {
  user: UserCourseData;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [active, setActive] = useState(1);
  const [avatar] = useState<string | null>(null);
  const [logout, setLogout] = useState(false);
  const [courses, setCourses] = useState<CourseDetails[]>([]);

  const {} = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const queryResult = useGetUsersAllCoursesQuery(undefined, {});
  const data = queryResult.data as { courses: CourseDetails[] } | undefined;

  const logoutHandler = async () => {
    setLogout(true);
    await signOut();
  };

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (data && Array.isArray(data.courses)) {
      const filteredCourses = user.courses
        .map((userCourse) =>
          data.courses.find((course: CourseDetails) => course._id === userCourse._id)
        )
        .filter((course): course is CourseDetails => course !== undefined);
      setCourses(filteredCourses);
    }
  }, [data, user]);

  return (
    // <div className="w-full mx-auto flex gap-6 mt-20 mb-20">
    //   <div
    //     className={`w-[60px] md:w-[310px] h-[calc(100vh-80px)] dark:bg-slate-900 bg-white bg-opacity-90 border dark:border-white/10 border-black/10 rounded-md shadow-sm sticky ${
    //       scroll ? "top-28" : "top-8"
    //     }`}
    //   >
    //     <SideBarProfile
    //       user={user}
    //       active={active}
    //       setActive={setActive}
    //       avatar={avatar}
    //       logoutHandler={logoutHandler}
    //     />
    //   </div>
    //   <div className="w-full">
    //     {active === 1 && (
    //       <div className="w-full h-full bg-transparent">
    //         <ProfileInfo user={user} avatar={avatar} />
    //       </div>
    //     )}
    //     {active === 2 && (
    //       <div className="w-full h-full bg-transparent">
    //         <ChangePassword />
    //       </div>
    //     )}
    //     {active === 3 && (
    //       <div className="w-full pl-7 px-2 800px:px-10 800px:pl-8">
    //         <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-3 xl:gap-[35px]">
    //           {courses &&
    //             courses.map((item: any, index: number) => (
    //               <CourseCard
    //                 item={item}
    //                 key={index}
    //                 user={user}
    //                 isProfile={true}
    //               />
    //             ))}
    //         </div>
    //         {courses.length === 0 && (
    //           <h1 className="text-center text-[18px] font-Poppins">
    //             You don't have any purchased yet
    //           </h1>
    //         )}
    //       </div>
    //     )}
    //   </div>
    // </div>
    <div className="max-w-5xl mx-auto mt-16 mb-16 px-4">
      <div className="flex gap-6 bg-white dark:bg-[#111A39] rounded-2xl shadow-lg overflow-hidden">
        {/* Sidebar */}
        <div
          className={`w-[70px] md:w-[280px] h-[calc(100vh-80px)] text-[18px] font-[400] dark:bg-[#111A39] bg-white bg-opacity-90 border dark:border-white/10 border-black/10 rounded-md shadow-sm sticky ${
            scroll ? "top-28" : "top-8"
          }`}
        >
          <SideBarProfile
            user={user}
            active={active}
            setActive={setActive}
            avatar={avatar}
            logoutHandler={logoutHandler}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 mt-7">
          {active === 1 && (
            <div className="">
              <ProfileInfo user={user} avatar={avatar} />
            </div>
          )}

          {active === 2 && (
            <div className="flex-1 p-6 ">
              <ChangePassword />
            </div>
          )}

          {active === 3 && (
            <div className="w-full">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {courses?.map((item, index) => (
                  <div
                    key={index}
                    className="transform transition-all hover:scale-[1.02] hover:shadow-md"
                  >
                    <CourseCard item={item} isProfile={true} />
                  </div>
                ))}
              </div>
              {courses.length === 0 && (
                <h1 className="text-center text-[16px] font-Poppins text-gray-500 mt-8">
                  You don’t have any purchased courses yet
                </h1>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
