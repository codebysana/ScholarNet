import { Box, IconButton, Typography } from "@mui/material";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import Link from "next/link";
import Image from "next/image";
import React, { FC, JSX, useEffect, useState } from "react";
import {
  MdArrowBackIos,
  MdHouse,
  MdManageHistory,
  MdOndemandVideo,
  MdOutlineArrowForwardIos,
  MdPeopleOutline,
  MdQuiz,
  MdWysiwyg,
} from "react-icons/md";
import { useSelector } from "react-redux";
import avatarDefault from "../../../../public/assets/avatar.jpg";
// import "react-pro-sidebar/dist/css/style.css";
import { useTheme } from "next-themes";
import { RiGlobeLine, RiGroupFill, RiReceiptLine } from "react-icons/ri";
import { FcVideoCall } from "react-icons/fc";
import { BiBarChart, BiMapPin } from "react-icons/bi";
import { AiOutlineLogout } from "react-icons/ai";

interface itemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const Item: FC<itemProps> = ({ title, to, icon, selected, setSelected }) => {
  return (
    <Link href={to} style={{ textDecoration: "none", cursor: "pointer" }}>
      <MenuItem
        active={selected === title}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography className="!text-[16px] !font-Poppins">{title}</Typography>
      </MenuItem>
    </Link>
  );
};

interface AuthState {
  user?: {
    avatar?: { url?: string } | string;
    name?: string;
    role?: string;
  };
}

const AdminSidebar = () => {
  const { user } = useSelector((state: { auth: AuthState }) => state.auth);
  // const [logout, setLogout] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);
  const { theme,  } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // const logoutHandler = () => {
  //   setLogout(true);
  // };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${
            theme === "dark" ? "#060b18 !important" : "#fff !important"
          }`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
          cursor: "pointer",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
          cursor: "pointer",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
          opacity: 1,
          display: "flex",
          justifyContent: "justify-center",
          alignItems: "center",
          gap: "8px",
          fontFamily: "Poppins",
          lineHeight: "20px",
        },
        "& .pro-menu-item": {
          color: `${theme !== "dark" && "#000"}`,
        },
      }}
      className="!bg-white dark:bg-[#060b18]"
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          overflowY: "auto",
          width: "20%",
        }}
      >
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MdOutlineArrowForwardIos /> : undefined}
            style={{
              margin: "0px 0 20px 0",
              padding: "20px 0px 0px 0px",
              color: "#fff",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Link href={"/"}>
                  <h3 className="text-[25px] tracking-wider font-Poppins uppercase dark:text-white text-black">
                    ScholarNet
                  </h3>
                </Link>
                <IconButton
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="inline-block "
                >
                  <MdArrowBackIos className="text-black dark:text-[#ffffffc1] ml-1 cursor-pointer" />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Image
                  src={
                    typeof user?.avatar === "string"
                      ? user?.avatar
                      : user?.avatar?.url ?? avatarDefault
                  }
                  alt="profile-user"
                  width={100}
                  height={100}
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    border: "3px solid #5b5fe6",
                  }}
                />
              </Box>
              <Box
                textAlign="center"
                className="flex justify-center items-center gap-3"
              >
                <Typography
                  variant="h4"
                  className="!text-[20px] text-black dark:text-[#ffffffc1]"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user?.name}
                </Typography>
                <Typography
                  variant="h6"
                  className="!text-[16px] text-black dark:text-[#ffffffc1] capitalize"
                  sx={{ m: "15px 0 0 0" }}
                >
                  ({user?.role})
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/admin"
              icon={<MdHouse />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              className="!text-[20px] text-black dark:text-[#ffffffc1] capitalize !font-[400] leading-10"
              sx={{ m: "15px 0 5px 20px" }}
            >
              {!isCollapsed && "Data"}
            </Typography>

            <Item
              title="Users"
              to="/admin/users"
              icon={<RiGroupFill />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Invoices"
              to="/admin/invoices"
              icon={<RiReceiptLine />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              className="!text-[20px] text-black dark:text-[#ffffffc1] capitalize !font-[400] leading-10"
              sx={{ m: "20px 0 5px 20px" }}
            >
              {!isCollapsed && "Content"}
            </Typography>

            <Item
              title="Create Course"
              to="/admin/create-course"
              icon={<FcVideoCall />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Live Courses"
              to="/admin/courses"
              icon={<MdOndemandVideo />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              className="!text-[20px] text-black dark:text-[#ffffffc1] capitalize !font-[400] leading-10"
              sx={{ m: "20px 0 5px 20px" }}
            >
              {!isCollapsed && "Customization"}
            </Typography>
            <Item
              title="Hero"
              to="/admin/hero"
              icon={<RiGlobeLine />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQs"
              to="/admin/faqs"
              icon={<MdQuiz />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Categories"
              to="/admin/categories"
              icon={<MdWysiwyg />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              className="!text-[20px] text-black dark:text-[#ffffffc1] capitalize !font-[400] leading-10"
              sx={{ m: "20px 0 5px 20px" }}
            >
              {!isCollapsed && "Controllers"}
            </Typography>
            <Item
              title="Manage Team"
              to="/admin/team"
              icon={<MdPeopleOutline />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              className="!text-[20px] text-black dark:text-[#ffffffc1] capitalize !font-[400] leading-10"
              sx={{ m: "20px 0 5px 20px" }}
            >
              {!isCollapsed && "Analytics"}
            </Typography>
            <Item
              title="Courses Analytics"
              to="/admin/courses-analytics"
              icon={<BiBarChart />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Orders Analytics"
              to="/admin/orders-analytics"
              icon={<BiMapPin />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Users Analytics"
              to="/admin/users-analytics"
              icon={<MdManageHistory />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              className="!text-[20px] text-black dark:text-[#ffffffc1] capitalize !font-[400] leading-10"
              sx={{ m: "20px 0 5px 20px" }}
            >
              {!isCollapsed && "Extras"}
            </Typography>
            <Item
              title="Logout"
              to="/admin/logout"
              icon={<AiOutlineLogout />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default AdminSidebar;
