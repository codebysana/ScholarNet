"use client";
import { use } from "react";
import CourseDetailsPage from "../../components/courses/CourseDetailsPage";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  return (
    <div>
      <CourseDetailsPage id={id} />
    </div>
  );
};

export default Page;