import { useState } from "react";
import Loader from "../loader/Loader";
import Heading from "@/app/utils/Heading";
import CourseContentMedia from "./CourseContentMedia";
import { useGetCourseContentQuery } from "@/redux/features/courses/coursesApi";
import Header from "../Header";
import CourseContentList from "./CourseContentList";
import {
  User,
  CourseContentResponse,
} from "@/app/types/course";
 type Props = {
   id: string;
   user: User;
 };

const CourseContent = ({ id, user }: Props) => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const {
    data: contentData,
    isLoading,
    refetch,
  } = useGetCourseContentQuery(id, { refetchOnMountOrArgChange: true });
  const [activeVideo, setActiveVideo] = useState(0);
  const data = (contentData as CourseContentResponse)?.content ?? [];
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            activeItem={1}
            open={open}
            setOpen={setOpen}
            route={route}
            setRoute={setRoute}
          />
          <div className="w-full grid 800px:grid-cols-10">
            <Heading
              title={data[activeVideo]?.title}
              description="anything"
              keywords={data[activeVideo]?.tags || ""}
            />
            <div className="col-span-7">
              <CourseContentMedia
                id={id}
                data={data}
                user={user}
                refetch={refetch}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
              />
            </div>
            <div className="hidden 800px:block 800px:col-span-3">
              <CourseContentList
                data={data}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CourseContent;
