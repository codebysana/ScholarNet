/* eslint-disable @typescript-eslint/no-require-imports */
import { styles } from "@/app/styles/style";
import Image from "next/image";
import ReviewCard from "../Review/ReviewCard";

type Props = {};
export const reviews = [
  {
    name: "Gene Bates",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/85.jpg",
    profession: "Student | Cambridge University",
    comment:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo eius itaque autem dolorum! Non temporibus, similique sint eveniet nostrum sapiente blanditiis nemo eius nisi excepturi autem tempora, aliquam, porro placeat!",
  },
  {
    name: "John Doe",
    rating: 4.5,
    avatar: "https://randomuser.me/api/portraits/men/64.jpg",
    profession: "Full Stack Developer | Quarter LTD",
    comment:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo eius itaque autem dolorum! Non temporibus, similique sint eveniet nostrum sapiente blanditiis nemo eius nisi excepturi autem tempora, aliquam, porro placeat!",
  },
  {
    name: "Emma Watson",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    profession: "Computer Systems Engineering Student | Brazil",
    comment:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo eius itaque autem dolorum! Non temporibus, similique sint eveniet nostrum sapiente blanditiis nemo eius nisi excepturi autem tempora, aliquam, porro placeat!",
  },
  {
    name: "Jonas Schemedtman",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/men/94.jpg",
    profession: "Junior Web Developer | UK",
    comment:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo eius itaque autem dolorum! Non temporibus, similique sint eveniet nostrum sapiente blanditiis nemo eius nisi excepturi autem tempora, aliquam, porro placeat!",
  },
  {
    name: "Ruth Johnson",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/90.jpg",
    profession: "Junior Web Developer | UK",
    comment:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo eius itaque autem dolorum! Non temporibus, similique sint eveniet nostrum sapiente blanditiis nemo eius nisi excepturi autem tempora, aliquam, porro placeat!",
  },
];

const Reviews = ({}: Props) => {
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto">
      <div className="w-full 800px:flex items-center">
        <div className="800px:w-[50%] w-full ">
          <Image
            src={require("../../../public/assets/business-img.png")}
            alt="business"
            width={700}
            height={700}
          />
        </div>
        <div className="800px:w-[50%] w-full">
          <h3 className={`${styles.title} 800px:!text=[40px] capitalize text-left`}>
            Our students are <span className="text-gradient">Our Stength</span>
            <br /> See what they say about us
          </h3>
          <br />
          <p className={styles.label}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis ab
            rem animi molestiae suscipit quas, ad provident nesciunt voluptas
            architecto sit tenetur inventore quia ex nisi perspiciatis, alias
            officia eaque?
          </p>
        </div>
        <br />
        <br />
      </div>
      <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(3)]:!mt-[60px] md:[&>*:nth-child(6)]:!mt-[-40px]">
        {reviews &&
          reviews.map((i, index) => <ReviewCard item={i} key={index} />)}
      </div>
    </div>
  );
};

export default Reviews;
