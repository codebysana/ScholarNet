/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Label,
  YAxis,
  LabelList,
} from "recharts";
import Loader from "../../loader/Loader";
import { useGetCoursesAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import { styles } from "@/app/styles/style";

type Props = object;

type AnalyticsDataItem = {
  name: string;
  uv: number;
};

const CourseAnalytics = ({}: Props) => {
  const { data, isLoading } = useGetCoursesAnalyticsQuery({});

//   const analyticsData = [
//     { name: "Jun 2025", uv: 3 },
//     { name: "July 2025", uv: 2 },
//     { name: "August 2025", uv: 5 },
//     { name: "September 2025", uv: 7 },
//     { name: "October 2025", uv: 2 },
//     { name: "November 2025", uv: 5 },
//     { name: "December 2025", uv: 7 },
//   ];

  const analyticsData: AnalyticsDataItem[] = [];

  data &&
    data?.allCourses?.last12Months?.forEach(
      (item: { month: string; count: number }) => {
        analyticsData.push({ name: item.month, uv: item.count });
      }
    );

  const minValue = 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-screen w-[95%] mx-auto">
          <div className="mt-[50px]">
            <h1 className={`${styles.title} px-5 !text-start`}>
              Courses Analytics
            </h1>
            <p className={`${styles.label} px-5`}>
              Last 12 months analytics data
            </p>
          </div>

          <div className="w-full h-[90%] flex items-center justify-center">
            <ResponsiveContainer width="90%" height="50%">
              <BarChart width={150} height={300} data={analyticsData}>
                <XAxis dataKey="name">
                  <Label offset={0} position="insideBottom" />
                </XAxis>
                <YAxis domain={[minValue, "auto"]} />
                <Bar dataKey="uv" fill="#3faf82">
                  <LabelList dataKey="uv" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAnalytics;
