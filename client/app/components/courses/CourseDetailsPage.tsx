import { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import CourseDetails from "./CourseDetails";
import Footer from "../Footer";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import {
  useCreatePaymentIndentMutation,
  useGetStripePublishablekeyQuery,
} from "@/redux/features/orders/ordersApi";

type Props = {
  id: string;
};

type Course = {
  price: number;
  name: string;
  tags?: string | string[];
  [key: string]: unknown;
};

const CourseDetailsPage = ({ id }: Props) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetCourseDetailsQuery(id);
  const course = (data as { course?: Course } | undefined)?.course;
  const { data: config } = useGetStripePublishablekeyQuery({});
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [createPaymentIndent, { data: paymentIndentData }] =
    useCreatePaymentIndentMutation();

  useEffect(() => {
    if (config) {
      const publishablekey = config?.publishablekey;
      setStripePromise(loadStripe(publishablekey));
    }
    if (course) {
      const amount = Math.round(course.price * 100);
      createPaymentIndent(amount);
    }
  }, [course, config, createPaymentIndent]);

  useEffect(() => {
    if (paymentIndentData) {
      setClientSecret(paymentIndentData?.client_secret);
    }
  }, [paymentIndentData]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={(course?.name ?? "") + " - ScholarNet"}
            description={
              "ScholarNet is a programming community which is developed by Unknown for helping programmers."
            }
            keywords={
              typeof course?.tags === "string"
                ? course.tags
                : Array.isArray(course?.tags)
                ? course.tags.join(", ")
                : ""
            }
          />
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          {stripePromise && course && (
            <CourseDetails
              setRoute={setRoute}
              setOpen={setOpen}
              data={course}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
            />
          )}
          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
