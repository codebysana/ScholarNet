"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import Loader from "@/app/components/loader/Loader";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import CourseContent from "../../components/courses/CourseContent";

type Props = {
  params: { id: string };
};

const Page = ({ params }: Props) => {
  const { id } = params.id;

  const { data, isLoading, error } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    if (data) {
      const isPurchased = data.user?.courses?.find(
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
      ) : (
        <div>
          <CourseContent id={id} user={data.user} />
        </div>
      )}
    </>
  );
};

export default Page;
