/* eslint-disable @next/next/no-img-element */
import { styles } from "@/app/styles/style";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";

type Props = object;

const EditHero: FC<Props> = ({}: Props) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isSuccess, error }] = useEditLayoutMutation(
    {}
  );

  useEffect(() => {
    console.log("API data", data);
    if (data?.layout?.banner) {
      setTitle(data?.layout?.banner.title);
      setSubTitle(data?.layout?.banner.subTitle);
      setImage(data?.layout?.banner.image.url);
    }
    if (isSuccess) {
      refetch();
      toast.success("Layout Updated Successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as { data?: { message?: string } };
        toast.error(errorData?.data?.message || "Something went wrong");
      }
    }
  }, [data, isSuccess, error, refetch]);

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (reader.readyState === 2) {
          setImage(e.target?.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    await editLayout({
      type: "Banner",
      image,
      title,
      subTitle,
    });
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-[#0a0d1c] 1000px:flex items-center px-14 pt-20 gap-7 transition-colors duration-300">
      {/* Image Section */}
      <div className="w-full 1000px:w-[45%] flex items-center justify-center relative mb-12 1000px:mb-0">
        <div
          className="w-[300px] h-[300px] 1100px:w-[400px] 1100px:h-[400px] 1500px:w-[500px] 1500px:h-[500px] rounded-full 
                    bg-gradient-to-b from-[#cfd9ff] to-[#ffffff] dark:from-[#1b1e35] dark:to-[#0a0d1c]
                    flex items-center justify-center transition-colors duration-300"
        >
          <img
            src={image}
            alt="edit image"
            className="w-[85%] h-full object-contain z-10"
          />
          <input
            type="file"
            id="banner"
            accept="image/*"
            onChange={handleUpdate}
            className="hidden"
          />
          <label htmlFor="banner" className="absolute bottom-20 right-14 z-20">
            <AiOutlineCamera className="text-black dark:text-white text-[20px] cursor-pointer transition-colors duration-300" />
          </label>
        </div>
      </div>

      {/* Text Section */}
      <div className="w-full 1000px:w-[55%] flex flex-col justify-center text-left">
        <textarea
          className="overflow-hidden resize-none w-full bg-transparent text-[32px] 1000px:text-[50px] 1500px:text-[60px] font-bold leading-tight font-sans outline-none 
                 text-black dark:text-white transition-colors duration-300"
          placeholder="Improve Your Online Learning Experience Better Instantly"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          rows={3}
        />
        <br />
        <textarea
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          placeholder="We have 40k+ online courses & 500k+ registered students. Find your desired course from here."
          className="overflow-hidden resize-none w-full font-medium text-[16px] 1000px:text-[18px] bg-transparent font-sans outline-none 
                 text-[#000000ac] dark:text-[#edfff4] transition-colors duration-300"
        ></textarea>
        <br />
        <div
          className={`mt-6 ${
            styles.button
          } w-[120px] h-[45px] text-center flex items-center justify-center rounded 
                  bg-[#cccccc34] text-black dark:text-white transition-colors duration-300
        ${
          data?.layout?.banner?.title !== title ||
          data?.layout?.banner?.subTitle !== subTitle ||
          data?.layout?.banner?.image !== image
            ? "cursor-pointer bg-[#42d383]"
            : "cursor-not-allowed"
        }`}
          onClick={
            data?.layout?.banner?.title !== title ||
            data?.layout?.banner?.subTitle !== subTitle ||
            data?.layout?.banner?.image !== image
              ? handleEdit
              : () => null
          }
        >
          Save
        </div>
      </div>
    </div>
  );
};

export default EditHero;
