import React, { FC, useEffect, useState, useCallback } from "react";
import ThemeSwitcher from "../../../app/utils/themeSwitcher";
import { io } from "socket.io-client";
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "@/redux/features/notifications/notificationsApi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { format } from "timeago.js";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = io(ENDPOINT, {
  transports: ["websocket"],
});

type Notification = {
  _id: string;
  title: string;
  message: string;
  status: "read" | "unread";
  createdAt: string;
};

type Props = {
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [audio] = useState(
    new Audio(
      "https://res.cloudinary.com/dsqbqjbms/video/upload/v1755049307/mixkit-water-bubble-1317_wlegzh.wav"
    )
  );

  const playerNotificationSound = useCallback(() => {
    audio.play();
  }, [audio]);

  useEffect(() => {
    if (data) {
      setNotifications(
        data.notifications.filter((item: Notification) => item.status === "unread")
      );
    }
    if (isSuccess) {
      refetch();
    }
    audio.load();
  }, [data, isSuccess, refetch, audio]);

  useEffect(() => {
    socketId.on("newNoification", () => {
      refetch();
      playerNotificationSound();
    });
  }, [ refetch, playerNotificationSound]);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
  };

  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0">
      <ThemeSwitcher />
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen && setOpen(!open)}
      >
        <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
        <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center font-semibold">
          {notifications && notifications.length}
        </span>
      </div>
      {open && (
        <div className="w-[350px] h-[50vh] dark:bg-[#111c43] bg-white shadow-xl absolute top-16 z-10 rounded">
          <h5 className="text-center text-[20px] font-Poppins text-black dark:text-white p-3">
            Notifications
          </h5>
          {notifications &&
            notifications.map((item: Notification, index: number) => (
              <div
                className="dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47]"
                key={index}
              >
                <div className="w-full flex items-center justify-between p-2">
                  <p className="text-black dark:text-white">{item.title}</p>
                  <p
                    className="text-black dark:text-white cursor-pointer"
                    onClick={() => handleNotificationStatusChange(item._id)}
                  >
                    Mark as read
                  </p>
                </div>
                <p className="px-2 text-black dark:text-white cursor-pointer">
                  {item.message}
                </p>
                <p className="p-2 text-black dark:text-white text-[14px]">
                  {format(item.createdAt)}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
