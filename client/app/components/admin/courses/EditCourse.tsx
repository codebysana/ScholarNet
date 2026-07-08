"use client";
import React, { FC, useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import {
  useEditCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/courses/coursesApi";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type Props = {
  id: string;
};

interface Course {
  _id: string;
  name: string;
  description: string;
  price: number;
  estimatedPrice: number;
  tags: string;
  level: string;
  demoURL: string;
  categories: string;
  thumbnail: {
    url: string;
  };
  benefits: { title: string }[];
  prerequisites: { title: string }[];
  courseData: {
    videoUrl: string;
    title: string;
    description: string;
    videoSection: string;
    videoDuration: string;
    links: {
      title: string;
      url: string;
    }[];
    suggestion: string;
  }[];
}

interface EditCoursePayload {
  name: string;
  description: string;
  price: number;
  estimatedPrice: number;
  tags: string;
  thumbnail: string;
  level: string;
  demoURL: string;
  totalVideos: number;
  benefits: { title: string }[];
  prerequisites: { title: string }[];
  courseContent: {
    videoUrl: string;
    title: string;
    description: string;
    videoSection: string;
    videoDuration: string;
    links: {
      title: string;
      url: string;
    }[];
    suggestion: string;
  }[];
}

const EditCourse: FC<Props> = ({ id }) => {
  const [editCourse, { isSuccess, error }] = useEditCourseMutation();
  const { data } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const editCourseData =
    (data as { allCourses?: Course[] } | undefined)?.allCourses?.find(
      (i: Course) => i._id === id
    );
  console.log(editCourseData);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course Updated Successfully");
      redirect("/admin/all-courses");
    }
    if (error) {
      const fetchError = error as FetchBaseQueryError;

      if (
        fetchError.data &&
        typeof fetchError.data === "object" &&
        "message" in fetchError.data
      ) {
        toast.error((fetchError.data as { message: string }).message);
      }
    }
  }, [isSuccess, error]);

  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: 0,
    estimatedPrice: 0,
    tags: "",
    level: "",
    demoURL: "",
    categories: "",
    thumbnail: "",
  });
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      title: "",
      description: "",
      videoUrl: "",
      videoSection: "Untitled Section",
      videoDuration: "",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);
  
  const [courseData, setCourseData] = useState<EditCoursePayload>({
    name: "",
    description: "",
    price: 0,
    estimatedPrice: 0,
    tags: "",
    thumbnail: "",
    level: "",
    demoURL: "",
    totalVideos: 0,
    benefits: [],
    prerequisites: [],
    courseContent: [],
  });

  console.log(courseData);

  useEffect(() => {
    
    if (editCourseData) {
      setCourseInfo({
        name: editCourseData.name,
        description: editCourseData.description,
        price: editCourseData.price,
        estimatedPrice: editCourseData?.estimatedPrice,
        tags: editCourseData.tags,
        level: editCourseData.level,
        demoURL: editCourseData.demoURL ?? "",
        categories: editCourseData?.categories ?? "",
        thumbnail: editCourseData?.thumbnail?.url ?? "",
      });
      setBenefits(editCourseData.benefits);
      setPrerequisites(editCourseData.prerequisites);
      setCourseContentData(editCourseData.courseData);
    }
  }, [editCourseData]);

  const handleSubmit = async () => {
    // format benefits array
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    // format prerequisites array
    const formattedPrerequisites = prerequisites.map((prerequisites) => ({
      title: prerequisites.title,
    }));
    // format course content array
    const formattedCourseContentData = courseContentData.map(
      (courseContent) => ({
        videoUrl: courseContent.videoUrl,
        title: courseContent.title,
        description: courseContent.description,
        videoSection: courseContent.videoSection,
        videoDuration: courseContent.videoDuration,
        links: courseContent.links.map((link) => ({
          title: link.title,
          url: link.url,
        })),
        suggestion: courseContent.suggestion,
      })
    );
    // prepare our data object
    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: Number(courseInfo.price),
      estimatedPrice: Number(courseInfo.estimatedPrice),
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoURL: courseInfo.demoURL,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseContent: formattedCourseContentData,
    };
    setCourseData(data);
  };

  // console.log(courseData);
  const handleCourseCreate = async () => {
    if (!editCourseData?._id) {
      toast.error("Course data not loaded yet. Please try again.");
      return;
    }
    const data = courseData;
    await editCourse({ id: editCourseData._id, data });
  };
  return (
    <div className="w-full flex min-h-screen bg-[#0D1422]">
      <div className="w-[80%]">
        {active == 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}

        {/* course data */}
        {active == 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}

        {/*  */}
        {active == 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleSubmit={handleSubmit}
          />
        )}

        {active == 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCourseCreate={handleCourseCreate}
            isEdit={true}
          />
        )}
      </div>
      <div className="w-[20%] t-[100px] h-screen fixed z-[-1] top-18 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourse;
