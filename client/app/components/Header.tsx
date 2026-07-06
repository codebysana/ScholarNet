/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItems from "../utils/navItems";
import ThemeSwitcher from "../utils/themeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/customModal";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Verification from "./auth/Verification";
import { useSelector } from "react-redux";
import Image from "next/image";
import avatar from "../../public/assets/avatar.jpg";
import { useSession } from "next-auth/react";
import {
  useLogoutQuery,
  useSocialAuthMutation,
} from "../../redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, open, setOpen, route, setRoute }) => {
  const [active, setActive] = useState(false);
  const [logout, setLogout] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const { data } = useSession();
  const { user } = useSelector((state: any) => state.auth);
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const {
    data: userData,
    isLoading,
    refetch,
  } = useLoadUserQuery(undefined, {});
  const {} = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });

  useEffect(() => {
    if (!isLoading) {
      if (!userData) {
        if (data) {
          socialAuth({
            name: data?.user?.name,
            email: data?.user?.email,
            avatar: data?.user?.image,
          });
          refetch();
        }
      }
      if (data === null) {
        if (isSuccess) {
          toast.success("Login Successfully!");
        }
      }
      if (data === null && !isLoading && !userData) {
        setLogout(true);
      }
    }
  }, [data, userData, isLoading, isSuccess, error, refetch, socialAuth]);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      {
        setOpenSidebar(false);
      }
    }
  };

  // console.log(user);
  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
            : "w-full border-b dark:shadow dark:border-[#ffffff1c] h-[80px] z-[80]"
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link
                href={"/"}
                className={`text-[25px] font-poppins font-[500] text-black dark:text-white`}
              >
                ScholarNet
              </Link>
            </div>
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
              {/* only for mobile */}
              <div className="800px:hidden">
                <HiOutlineMenuAlt3
                  onClick={() => setOpenSidebar(true)}
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                />
              </div>
              {userData ? (
                <Link href={"/profile"}>
                  <Image
                    width={30}
                    height={30}
                    src={
                      userData.user.avatar ? userData.user.avatar.url : avatar
                    }
                    alt=""
                    className="w-[30px] h-[30px] rounded-full cursor-pointer"
                    style={{
                      border: activeItem === 5 ? "2px solid #37a39a" : "none",
                    }}
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  onClick={() => setOpen(true)}
                  size={25}
                  className="hidden 800px:block cursor-pointer dark:text-white text-black ml-2"
                />
              )}
            </div>
          </div>
        </div>
        {/*mobile sidebar */}
        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed z-[9999999999] bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
              <NavItems activeItem={activeItem} isMobile={true} />
              {userData ? (
                <Link href={"/profile"}>
                  <Image
                    src={
                      userData.user.avatar ? userData.user.avatar.url : avatar
                    }
                    alt=""
                    className="w-[30px] h-[30px] rounded-full ml-[20px] cursor-pointer"
                    style={{
                      border: activeItem === 5 ? "2px solid #37a39a" : "none",
                    }}
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  onClick={() => setOpen(true)}
                  size={25}
                  className="hidden 800px:block cursor-pointer dark:text-white text-black ml-2"
                />
              )}
              <br />
              <br />
              <p>Copyright &copy; 2025 ScholarNet</p>
            </div>
          </div>
        )}
      </div>
      {route === "Login" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
              refetch={refetch}
            />
          )}
        </>
      )}
      {/* Sign up */}
      {route === "Sign-Up" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Signup}
            />
          )}
        </>
      )}
      {/* verification */}
      {route === "Verification" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Verification}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
