"use client";

import { use, useEffect } from "react";
import { redirect } from "next/navigation";
import Loader from "@/app/components/loader/Loader";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import CourseContent from "../../components/courses/CourseContent";

type Props = {
  params: Promise<{ id: string }>;
};

const Page = ({ params }: Props) => {
  const { id } = use(params);

  const { data, isLoading, error } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    if (data) {
      const isPurchased = data.user?.allCourses?.find(
        (item: { _id: string }) => item._id === id,
      );
      if (!isPurchased || error) {
        redirect("/");
      }
      if (error) {
        redirect("/");
      }
    }
  }, [data, error, id]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : data?.user ? (
        <div>
          <CourseContent id={id} user={data.user} />
        </div>
      ) : null}
    </>
  );
};

export default Page;
