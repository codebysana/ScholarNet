import { styles } from "@/app/styles/style";
import React, { FC } from "react";
import toast from "react-hot-toast";
import { MdAddCircle } from "react-icons/md";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleBenefitChange = (index: number, value: string) => {
    const updateBenefits = [...benefits];
    updateBenefits[index].title = value;
    setBenefits(updateBenefits);
  };

  const handleAddBenefits = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handlePrerequisitesChange = (index: number, value: string) => {
    const updatePrerequisites = [...prerequisites];
    updatePrerequisites[index].title = value;
    setPrerequisites(updatePrerequisites);
  };

  const handleAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const prevButton = () => {
    setActive(active - 1);
  };
  const handleOptions = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill the fields for go to next");
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24 block">
      <div>
        <label htmlFor="email" className={`${styles.label} text-[20px]`}>
          What are the benefits for studentsin this course
        </label>{" "}
        <br />
        {benefits.map((benefit: { title: string }, index: number) => (
          <input
            type="text"
            key={index}
            name="benefits"
            placeholder="You will be able to build a full stack LMS Platform..."
            required
            className={`${styles.input} my-2`}
            value={benefit.title}
            onChange={(e) => handleBenefitChange(index, e.target.value)}
          />
        ))}
        <MdAddCircle
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddBenefits}
        />
      </div>
      {/* pre-requisites */}
      <div>
        <label htmlFor="email" className={`${styles.label} text-[20px]`}>
          What are the pre-requisites for students in this course
        </label>{" "}
        <br />
        {prerequisites.map((prerequisite: { title: string }, index: number) => (
          <input
            type="text"
            key={index}
            name="prerequisites"
            placeholder="You need basic knowledge of MERN Stack"
            required
            className={`${styles.input} my-2`}
            value={prerequisite.title}
            onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
          />
        ))}
        <MdAddCircle
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddPrerequisites}
        />
      </div>
      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Previous
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseData;
