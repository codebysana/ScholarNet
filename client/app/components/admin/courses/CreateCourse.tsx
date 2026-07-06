"use client";
import React, { useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import { useCreateCourseMutation } from "@/redux/features/courses/coursesApi";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface Benefit {
  title: string;
}

interface Prerequisite {
  title: string;
}

interface CourseLink {
  title: string;
  url: string;
}

interface CourseContentItem {
  title: string;
  description: string;
  videoUrl: string;
  videoSection: string;
  videoDuration: string;
  links: CourseLink[];
  suggestion: string;
}

interface CoursePayload {
  name: string;
  description: string;
  price: number;
  estimatedPrice: number;
  tags: string;
  categories: string;
  thumbnail: string;
  level: string;
  demoURL: string;
  totalVideos: number;
  benefits: Benefit[];
  prerequisites: Prerequisite[];
  courseData: CourseContentItem[];
}

const CreateCourse = () => {
  const [createCourse, { isLoading, isSuccess, error }] =
    useCreateCourseMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course created successfully");
      redirect("/admin/courses");
    }
    if (error) {
      const fetchError = error as FetchBaseQueryError;
      const data = fetchError.data;
      if (data && typeof data === "object" && "message" in data) {
        toast.error((data as { message: string }).message);
      } else {
        toast.error("An error occurred while creating the course.");
      }
    }
  }, [isLoading, isSuccess, error]);

  const [active, setActive] = useState(0);

  interface CourseInfo {
  name: string;
  description: string;
  price: number;
  estimatedPrice: number;
  tags: string;
  level: string;
  categories: string;
  demoURL: string;
  thumbnail: string;
}

  const [courseInfo, setCourseInfo] = useState<CourseInfo>({
    name: "",
    description: "",
    price: 0,
    estimatedPrice: 0,
    tags: "",
    level: "",
    categories: "",
    demoURL: "",
    thumbnail: "",
  })

  const [benefits, setBenefits] = useState<Benefit[]>([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState<Prerequisite[]>([
    { title: "" },
  ]);
  const [courseContentData, setCourseContentData] = useState<
    CourseContentItem[]
  >([
    {
      videoUrl: "",
      title: "",
      description: "",
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

  const [courseData, setCourseData] = useState<CoursePayload | null>(null);
  console.log("courseData", courseData);
  
  // const buildCoursePayload = () => {
  //   // format benefits & prerequisites
  //   const formattedBenefits = benefits.map((b) => ({ title: b.title }));
  //   const formattedPrerequisites = prerequisites.map((p) => ({
  //     title: p.title,
  //   }));

  //   // format course content
  //   const formattedCourseContentData = courseContentData.map((cc) => ({
  //     videoUrl: cc.videoUrl,
  //     title: cc.title,
  //     description: cc.description,
  //     videoDuration: cc.videoDuration,
  //     videoSection: cc.videoSection,
  //     links: (cc.links || []).map((l) => ({ title: l.title, url: l.url })),
  //     suggestion: cc.suggestion,
  //   }));

  //   // normalize categories: accept either array or comma-separated string (defensive)
  //   const categoryValue: string[] = (() => {
  //     if (Array.isArray(courseInfo.categories)) {
  //       return courseInfo.categories
  //         .map((c) => (c || "").toString().trim())
  //         .filter(Boolean);
  //     }
  //     if (typeof courseInfo.categories === "string") {
  //       if (!courseInfo.categories.trim()) return [];
  //       return courseInfo.categories
  //         .split(",")
  //         .map((c) => c.trim())
  //         .filter(Boolean);
  //     }
  //     return [];
  //   })();

  //   return {
  //     name: courseInfo.name,
  //     description: courseInfo.description,
  //     price: courseInfo.price,
  //     estimatedPrice: courseInfo.estimatedPrice,
  //     tags: courseInfo.tags,
  //     categories: categoryValue,
  //     thumbnail: courseInfo.thumbnail,
  //     level: courseInfo.level,
  //     demoURL: courseInfo.demoURL,
  //     totalVideos: courseContentData.length,
  //     benefits: formattedBenefits,
  //     prerequisites: formattedPrerequisites,
  //     courseData: formattedCourseContentData,
  //   };
  // };

  // const handleSubmit = async () => {
  //   // format benefits array
  //   const formattedBenefits = benefits.map((benefit) => ({
  //     title: benefit.title,
  //   }));
  //   // format prerequisites array
  //   const formattedPrerequisites = prerequisites.map((prerequisites) => ({
  //     title: prerequisites.title,
  //   }));
  //   // format course content array
  //   const formattedCourseContentData = courseContentData.map(
  //     (courseContent) => ({
  //       videoUrl: courseContent.videoUrl,
  //       title: courseContent.title,
  //       description: courseContent.description,
  //       videoDuration: courseContent.videoDuration,
  //       videoSection: courseContent.videoSection,
  //       links: courseContent.links.map((link) => ({
  //         title: link.title,
  //         url: link.url,
  //       })),
  //       suggestion: courseContent.suggestion,
  //     })
  //   );
  //   // category value
  //   const categoryValue = Array.isArray(courseInfo.categories)
  //     ? courseInfo.categories.filter((cat) => cat.trim() !== "")
  //     : [];
  //   // prepare our data object
  //   const data = {
  //     name: courseInfo.name,
  //     description: courseInfo.description,
  //     price: courseInfo.price,
  //     estimatedPrice: courseInfo.estimatedPrice,
  //     tags: courseInfo.tags,
  //     categories: categoryValue,
  //     thumbnail: courseInfo.thumbnail,
  //     level: courseInfo.level,
  //     demoURL: courseInfo.demoURL,
  //     totalVideos: courseContentData.length,
  //     benefits: formattedBenefits,
  //     prerequisites: formattedPrerequisites,
  //     courseData: formattedCourseContentData,
  //   };
  //   setCourseData(data);
  // };

  // console.log(courseData);

  const buildCoursePayload = (): CoursePayload => {
    const formattedBenefits = benefits.map((b) => ({ title: b.title }));
    const formattedPrerequisites = prerequisites.map((p) => ({
      title: p.title,
    }));
    const formattedCourseContentData = courseContentData.map((c) => ({
      videoUrl: c.videoUrl,
      title: c.title,
      description: c.description,
      videoDuration: c.videoDuration,
      videoSection: c.videoSection,
      links: (c.links || []).map((l) => ({ title: l.title, url: l.url })),
      suggestion: c.suggestion,
    }));

    // Normalize categories: accept array or comma-separated string
    let categoryValue = "";

    if (
      typeof courseInfo.categories === "string" &&
      courseInfo.categories.trim() !== ""
    ) {
      categoryValue = courseInfo.categories.trim(); // ✅ plain string
    }

    return {
      name: courseInfo.name,
      description: courseInfo.description,
      price: Number(courseInfo.price) || 0,
      estimatedPrice: Number(courseInfo.estimatedPrice) || 0,
      tags: courseInfo.tags,
      categories: categoryValue,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoURL: courseInfo.demoURL,
      totalVideos: formattedCourseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContentData,
    };
  };

  const handleSubmit = async (): Promise<CoursePayload> => {
    const data = buildCoursePayload();
    setCourseData(data); // keep for backward compatibility if other code reads courseData
    return data;
  };

  // const handleCourseCreate = async (e: any) => {
  //   const data = buildCoursePayload(); // <-- use live data, not stale courseData state

  //   if (!data?.categories || !data.categories.length) {
  //     toast.error("Please select at least one category");
  //     return;
  //   }

  //   if (!isLoading) {
  //     await createCourse(data).unwrap();
  //   }
  // };

  // const handleCourseCreate = async (e: any) => {
  //   const data = courseData;

  //   if (!data?.categories?.length) {
  //     toast.error("Please select at least one category");
  //     return;
  //   }

  //   if (!isLoading) {
  //     await createCourse(data).unwrap();
  //   }
  // };

  const handleCourseCreate = async () => {
    const data = buildCoursePayload();
    if (!isLoading) {
      await createCourse(data).unwrap();
    }
  };

  return (
    <div className="w-full flex min-h-screen">
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
            courseData={buildCoursePayload()}
            handleCourseCreate={handleCourseCreate}
            isEdit={false}
          />
        )}
      </div>
      <div className="w-[20%] t-[100px] h-screen fixed z-[-1] top-18 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourse;
