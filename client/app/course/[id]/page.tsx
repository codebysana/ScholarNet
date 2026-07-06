"use client";
import CourseDetailsPage from "../../components/courses/CourseDetailsPage";

export const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <CourseDetailsPage id={params.id} />
    </div>
  );
};

