import { useEffect, useState } from "react";
import CourseCard from "../courses/CourseCard";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";

 type CourseData = {
   [key: string]: unknown;
 };
  
interface Course {
  _id: string;
  name: string;
  ratings: number;
  purchased: number;
  price: number;
  estimatedPrice: number;
  courseData: CourseData[];
  thumbnail: { url: string };
  [key: string]: unknown;
}

type Props = object;

const Courses = ({}: Props) => {
  const {  data } = useGetUsersAllCoursesQuery(undefined, {});
  console.log(data);
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    setCourses((data as { courses?: Course[] } | undefined)?.courses ?? []);
  }, [data]);
  return (
    <div>
      <div className={`w-[90%] 800px:w-[80%] m-auto`}>
        <h1 className="mt-15 text-center font-Poppins text-[25px] leading-[40px] sm:text-2xl lg:text-4xl dark:text-white">
          Expand Your Career
          <span className="text-gradient">{" "}Opportunity</span>
          <br />
          Opportunity with Our Courses
        </h1>
        <br />
        <br />
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-10 border-0">
          {courses?.map((item: Course, index: number) => (
            <CourseCard item={item} key={index} />
          ))}
        </div>
      </div>
      ;
    </div>
  );
};

export default Courses;
