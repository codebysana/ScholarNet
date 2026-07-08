import { styles } from "@/app/styles/style";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "@/redux/features/user/userApi";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import avatarIcon from "../../../public/assets/avatar.jpg";
import toast from "react-hot-toast";
import {  UserCourseData } from "@/app/types/course";

type Props = {
  avatar: string | null;
  user: UserCourseData;
};

const ProfileInfo: FC<Props> = ({ user, avatar }) => {
  const [name, setName] = useState(user.name || "");
  const [loadUser, setLoadUser] = useState(false);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [editProfile, { isSuccess: success, error: isError }] =
    useEditProfileMutation();
  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });

  const imageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar({
          avatar,
        });
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess || success) {
      setLoadUser(true);
    }
    if (error || isError) {
      console.log(error);
    }
    if (success) {
      toast.success("Profile Updated Successfully");
    }
  }, [isSuccess, error, success, isError]);

  // useEffect(() => {
  //   if (loadUser) {
  //     refetch();
  //     setLoadUser(false); // Reset after load
  //   }
  // }, [loadUser]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name !== "") {
      await editProfile({
        name: name,
      });
    }
  };
  return (
    <>
      <div className="w-full flex justify-center">
        <div className="relative">
          <Image
            src={
              typeof user.avatar === "string"
                ? user.avatar
                : user.avatar?.url || avatar || avatarIcon
            }
            alt="avatar"
            width={120}
            height={120}
            className="w-28 h-28 cursor-pointer border-[3px] border-[#37a39a] rounded-full"
          />
          <input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png, image/jpg, image/jpeg, image/webp"
          />
          <label htmlFor="avatar">
            <div className="w-7 h-7 bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera size={20} className="z-1" />
            </div>
          </label>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full">
        <form onSubmit={handleSubmit}>
          <div className="w-full md:w-1/2 mx-auto">
            <div className="w-full">
              <label className="block pb-2">Full Name</label>
              <input
                type="text"
                className={`${styles.input} w-full mb-4`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-full pt-2">
              <label className="block pb-2">Email Address</label>
              <input
                type="text"
                className={`${styles.input} w-full mb-1`}
                required
                value={user?.email}
                readOnly
              />
            </div>
            <input
              type="submit"
              value="Update"
              className="w-full h-10 border border-[#37a39a] text-center dark:text-white text-black rounded-md mt-8 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileInfo;
