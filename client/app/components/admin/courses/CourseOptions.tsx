import React, { FC } from "react";
import { FcCheckmark } from "react-icons/fc";

type Props = {
  active: number;
  setActive: (active: number) => void;
};

const CourseOptions: FC<Props> = ({ active }) => {
  const options: string[] = [
    "Course Information",
    "Course Options",
    "Course Content",
    "Content Preview",
  ];
  return (
    <div>
      {options.map((option: string, index: number) => (
        <div key={index} className={`w-full flex py-5`}>
          <div
            className={`w-[35px] h-[35px] rounded-full flex items-center justify-center ${
              active + 1 > index ? "bg-blue-500" : "bg-[#384766]"
            } relative`}
          >
            <FcCheckmark className="text-[25px]" />
            {index !== options.length - 1 && (
              <div
                className={`absolute h-[30px] w-1 cursor-pointer ${
                  active + 1 > index ? "bg-blue-500" : "bg-[#384766]"
                } bottom-[-100%]`}
              ></div>
            )}
          </div>
          <h5
            className={`pl-3 ${
              active === index
                ? "dark:text-white text-black"
                : "dark:text-white text-black"
            } text-[20px]`}
          >
            {option}
          </h5>
        </div>
      ))}
    </div>
  );
};

export default CourseOptions;
