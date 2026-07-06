/* eslint-disable @next/next/no-img-element */
import { styles } from "@/app/styles/style";
import React, { FC, useEffect, useState, ChangeEvent, DragEvent, FormEvent } from "react";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { Dispatch, SetStateAction } from "react";

interface CourseInfo {
  name: string;
  description: string;
  price: number;
  estimatedPrice: number;
  tags: string;
  categories: string;
  level: string;
  demoURL: string;
  thumbnail: string;
}

interface Category {
  _id: string;
  title: string;
}

type Props = {
  courseInfo: CourseInfo;
  setCourseInfo: Dispatch<SetStateAction<CourseInfo>>;
  active: number;
  setActive: Dispatch<SetStateAction<number>>;
};
const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);

  interface HeroResponse {
    layout: {
      categories: Category[];
    };
  }
  const { data } = useGetHeroDataQuery("Categories", {});
  const [categories, setCategories] = useState<HeroResponse['layout']['categories']>([]);

  useEffect(() => {
    if (data) {
      setCategories(data?.layout?.categories);
    }
  }, [data]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit} className={`${styles.label}`}>
        <div>
          <label>Course Name</label>
          <input
            type="name"
            name=""
            required
            value={courseInfo.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            placeholder="Mern Stack LMS platform with Next.js 13"
            className={`${styles.input}`}
          />
        </div>
        <br />
        <div className="mb-5">
          <label className={`${styles.label}`}>Course Description</label>
          <textarea
            name=""
            id=""
            rows={8}
            cols={30}
            placeholder="Write About Yourself"
            className={`${styles.input} !h-min !py-2`}
            value={courseInfo.description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
          ></textarea>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Course Price</label>
            <input
              type="number"
              name=""
              required
              value={courseInfo.price}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCourseInfo({ ...courseInfo, price: Number(e.target.value) })
              }
              id="price"
              placeholder="29"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[50%]">
            <label className={`${styles.label}`}>Estimated Price</label>
            <input
              type="number"
              name=""
              required
              value={courseInfo.estimatedPrice}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: Number(e.target.value) })
              }
              id="price"
              placeholder="79"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label} w-[50%]`}>Course Tags</label>
            <input
              type="text"
              name=""
              required
              value={courseInfo.tags}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
              id="tags"
              placeholder="MERN"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[50%]">
            <label className={`${styles.label} w-[50%]`}>
              Course Categories
            </label>
            <select
              name=""
              id=""
              className={`${styles.input}`}
              value={courseInfo.categories}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setCourseInfo({ ...courseInfo, categories: e.target.value })
              }
            >
              <option value="">Select Category</option>
              {categories?.map((item: Category) => (
                <option value={item._id} key={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* <div> */}
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label} w-[50%]`}>Course Level</label>
            <input
              type="text"
              name=""
              required
              value={courseInfo.level}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              id="level"
              placeholder="Beginner/Intermediate/Expert"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[50%]">
            <label className={`${styles.label} w-[50%]`}>Demo Url</label>
            <input
              type="text"
              name=""
              required
              value={courseInfo.demoURL}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCourseInfo({ ...courseInfo, demoURL: e.target.value })
              }
              id="demoURL"
              placeholder="eer7fd"
              className={`${styles.input}`}
            />
          </div>
        </div>
        {/* </div> */}
        <br />
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <img
                src={courseInfo.thumbnail}
                alt=""
                className="max-h-full w-full object-cover"
              />
            ) : (
              <span className="text-black dark:text-white">
                Drag and drop your thumbnail here or click to browse
              </span>
            )}
          </label>
        </div>
        <br />
        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Next"
            className="w-full h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          />
        </div>
        <br />
        <br />
      </form>
    </div>
  );
};

export default CourseInformation;
