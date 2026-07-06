import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import {
  useAddAnswerInQuestionMutation,
  useAddNewQuestionMutation,
  useAddReplyInReviewMutation,
  useAddReviewInCourseMutation,
  useGetCourseDetailsQuery,
} from "@/redux/features/courses/coursesApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import { format } from "timeago.js";
import { io } from "socket.io-client";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = io(ENDPOINT, {
  transports: ["websocket"],
});
import {
  User,
  Link,
  Question,
  QuestionReply,
  Review,
  ReviewReply,
  CourseContent,
  CourseDetailsResponse,
} from "@/app/types/course";

type Props = {
  id: string;
  data: CourseContent[];
  refetch: () => void;
  user: User;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
};

const CourseContentMedia = ({
  id,
  data,
  user,
  refetch,
  activeVideo,
  setActiveVideo,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  const [answer, setAnswer] = useState("");
  const [reply, setReply] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [isReviewReply, setIsReviewReply] = useState(false);
  const [reviewId, setReviewId] = useState("");

  const {
    data: courseData,
    refetch: courseRefetch,
  } = useGetCourseDetailsQuery(id, {
    refetchOnMountOrArgChange: true,
  }) as {
    data?: CourseDetailsResponse;
    refetch: () => void;
  };
  const course = courseData?.course;
  const [
    addNewQuestion,
    { isSuccess, error, isLoading: questionCreationLoading },
  ] = useAddNewQuestionMutation({});

  const [
    addAnswerInQuestion,
    {
      isSuccess: answerSuccess,
      error: answerError,
      isLoading: answerCreationLoading,
    },
  ] = useAddAnswerInQuestionMutation();

  const [
    addReviewInCourse,
    {
      isSuccess: reviewSuccess,
      error: reviewError,
      isLoading: reviewCreationLoading,
    },
  ] = useAddReviewInCourseMutation();

  const [
    addReplyInReview,
    {
      isSuccess: replySuccess,
      error: replyError,
      isLoading: replyCreationLoading,
    },
  ] = useAddReplyInReviewMutation();

  const isReviewExists = course?.reviews?.find(
    (item: ReviewReply) => item.user._id === user._id
  );

  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Question can't be empty");
    } else {
      console.log({ question, courseId: id, contentId: data[activeVideo]._id });
      addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      toast.success("Question Added Successfully");
      socketId.emit("notification", {
        title: "New Question Received",
        message: `You have a new question ${data[activeVideo].title}`,
        userId: user._id,
      });
    }
    if (answerSuccess) {
      setAnswer("");
      refetch();
      toast.success("Answer added successfully");
      if (user.role !== "admin") {
        socketId.emit("notification", {
          title: "New Question Reply Received",
          message: `You have a new question reply in ${data[activeVideo].title}`,
          userId: user._id,
        });
      }
    }
    if (error) {
      const err = error as FetchBaseQueryError;

      if ("data" in err) {
        toast.error((err.data as { message: string }).message);
      }
    }
    if (answerError) {
      const err = answerError as FetchBaseQueryError;

      if ("data" in err) {
        toast.error((err.data as { message: string }).message);
      }
    }
    if (reviewSuccess) {
      setReview("");
      setRating(1);
      courseRefetch();
      toast.success("Review added successfully");
      socketId.emit("notification", {
        title: "New Question Received",
        message: `You have a new question ${data[activeVideo].title}`,
        userId: user._id,
      });
    }
    if (reviewError) {
      const err = reviewError as FetchBaseQueryError;

      if ("data" in err) {
        toast.error((err.data as { message: string }).message);
      }
    }
    if (replySuccess) {
      setReply("");
      courseRefetch();
      toast.success("Reply added successfully");
    }
    if (replyError) {
      const err = replyError as FetchBaseQueryError;

      if ("data" in err) {
        toast.error((err.data as { message: string }).message);
      }
    }
  }, [
    isSuccess,
    error,
    answerSuccess,
    answerError,
    reviewSuccess,
    reviewError,
    replySuccess,
    replyError,
    activeVideo,
    data,
    refetch,
    courseRefetch,
    user._id,
    user.role,
  ]);

  const handleAnswerSubmit = () => {
    addAnswerInQuestion({
      answer,
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId: questionId,
    });
    // console.log("Handle Submit");
  };

  // console.log("Question Id", questionId);

  const handleReviewSubmit = () => {
    if (review.length === 0) {
      toast.error("Review can't be empty");
    } else {
      addReviewInCourse({ review, rating, courseId: id });
    }
  };

  const handleReviewReplySubmit = () => {
    if (!replyCreationLoading) {
      if (reply === "") {
        toast.error("Reply can't be empty");
      } else {
        addReplyInReview({ comment: reply, courseId: id, reviewId });
      }
    }
  };

  return (
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />
      <div className="w-full flex items-center justify-between my-3">
        <div
          className={`${
            styles.button
          } text-white !w-[unset] !min-h-[40px] !py-[unset] ${
            activeVideo === 0 && "!cursor-no-drop opacity-[0.8]"
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2" />
          Prev Lesson
        </div>
        <div
          className={`${
            styles.button
          } text-white !w-[unset] !min-h-[40px] !py-[unset] ${
            data.length - 1 === activeVideo && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          Next Lesson <AiOutlineArrowRight className="ml-2" />
        </div>
      </div>
      <h1 className="pt-2 text-[25px] font-[600] dark:text-white text-black">
        {data[activeVideo].title}
      </h1>{" "}
      <br />
      <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
        {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5
            key={index}
            className={`800px:text-[20px] cursor-pointer  ${
              activeBar === index
                ? "text-red-500"
                : "dark:text-white text-black"
            }`}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>{" "}
      <br />
      {activeBar === 0 && (
        <p className="text-[18px] whitespace-pre-line mb-3 dark:text-white text-black">
          {data[activeVideo]?.description}
        </p>
      )}
      {activeBar === 1 && (
        <div className="">
          {data[activeVideo]?.links.map((item: Link, index: number) => (
            <div className="mb-5" key={index}>
              <h2 className="800px:text-[20px] 800px:inline-block dark:text-white text-black">
                {item.title && item.title + " :"}
              </h2>
              <a
                href={item.url}
                className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2"
              >
                {item.url}
              </a>
            </div>
          ))}
        </div>
      )}
      {activeBar === 2 && (
        <>
          <div className="flex w-full">
            <Image
              src={
                user.avatar
                  ? user.avatar.url
                  : "https://res.cloudinary.com/dsqbqjbms/image/upload/v1755069843/girl-headshot_wrkeje.webp"
              }
              width={50}
              height={50}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <textarea
              name=""
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              id=""
              cols={40}
              rows={5}
              placeholder="Write your question..."
              className="outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
            ></textarea>
          </div>
          <div className="w-full flex justify-end">
            <div
              className={`${
                styles.button
              } !w-[120px] !h-[40px] text-[18px] mt-5 ${
                questionCreationLoading && "cursor-not-allowed"
              }`}
              onClick={questionCreationLoading ? () => {} : handleQuestion}
            >
              Submit
            </div>
          </div>
          <br />
          <br />
          <div className="w-full h-[1px] bg-[#ffffff3b]">
            <div>
              <CommentReply
                data={data}
                answer={answer}
                setAnswer={setAnswer}
                questionId={questionId}
                setQuestionId={setQuestionId}
                activeVideo={activeVideo}
                handleAnswerSubmit={handleAnswerSubmit}
                answerCreationLoading={answerCreationLoading}
              />
            </div>
          </div>
        </>
      )}
      {activeBar === 3 && (
        <div className="w-full">
          <>
            {isReviewExists && (
              <>
                <div className="flex w-full">
                  <Image
                    src={
                      user.avatar
                        ? user.avatar.url
                        : "https://res.cloudinary.com/dsqbqjbms/image/upload/v1755069843/girl-headshot_wrkeje.webp"
                    }
                    width={50}
                    height={50}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                  <div className="w-full">
                    <h5 className="pl-3 text-[20px] font-[500] dark:text-white text-black">
                      Give a rating <span className="text-red-500">*</span>
                    </h5>
                    <div className="flex w-full ml-2 pb-3">
                      {[1, 2, 3, 4, 5].map((i) =>
                        rating >= i ? (
                          <AiFillStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246, 186, 0"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        ) : (
                          <AiOutlineStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246, 186, 0"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        )
                      )}
                    </div>
                    <textarea
                      name=""
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      id=""
                      cols={40}
                      rows={5}
                      placeholder="Write your comment..."
                      className="outline-none bg-transparent 800px:ml-3 border border-[#ffffff57] w-[95%] 800px:w-full p-2 rounded text-[18px] font-Poppins"
                    ></textarea>
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <div
                    className={`${
                      styles.button
                    } !w-[120px] !h-[40px] text-[10px] mt-5 800px:mr-0 mr-2 ${
                      reviewCreationLoading && "cursor-no-drop"
                    }`}
                    onClick={
                      reviewCreationLoading ? () => {} : handleReviewSubmit
                    }
                  >
                    Submit
                  </div>
                </div>
              </>
            )}
            <br />
            <div className="w-full h-[1px] bg-[#ffffff3b]">
              <div className="w-full">
                {(course?.reviews?.slice().reverse().map(
                  (item: Review, index: number) => (
                    <div
                      className="w-full my-5 dark:text-white text-black"
                      key={index}
                    >
                      <div className="w-full flex">
                        <div>
                          <Image
                            src={
                              item.user.avatar
                                ? item.user.avatar.url
                                : "https://res.cloudinary.com/dsqbqjbms/image/upload/v1755069843/girl-headshot_wrkeje.webp"
                            }
                            width={50}
                            height={50}
                            alt=""
                            className="w-[50px] h-[50px] rounded-full object-cover"
                          />
                        </div>
                        <div className="ml-2">
                          <h1 className="text-[18px]">{item?.user.name}</h1>
                          <Ratings rating={item.rating} />
                          <p>{item.comment}</p>
                          <small className="dark:text-[#ffffff83] text-[#0000009e]">
                            {format(item.createdAt)} *
                          </small>
                        </div>
                      </div>
                      {user.role === "admin" && (
                        <span
                          className={`${styles.label} !ml-10 cursor-pointer`}
                          onClick={() => {
                            setIsReviewReply(true);
                            setReviewId(item._id);
                          }}
                        >
                          Add Reply{" "}
                        </span>
                      )}
                      {isReviewReply && (
                        <div className="w-full flex relative">
                          <input
                            type="text"
                            name=""
                            id=""
                            value={reply}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReply(e.target.value)}
                            placeholder="Enter your reply"
                            className="block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#000] dark:border-[#fff] p-[5px] w-[95%]"
                            // className={`${styles.input} !border-[0px] rounded-none w-[90%] ml-[10%]  !border-b`}
                          />
                          <button
                            type="submit"
                            className="absolute right-0 bottom-1"
                            onClick={handleReviewReplySubmit}
                          >
                            Submit
                          </button>
                        </div>
                      )}
                      {item.commentReplies.map((commentReply: ReviewReply) => (
                        <div key={commentReply._id} className="w-full flex 800px:ml-16 my-5">
                          <div className="w-[50px] h-[50px]">
                            <Image
                              src={
                                commentReply.user.avatar
                                  ? commentReply.user.avatar.url
                                  : "https://res.cloudinary.com/dsqbqjbms/image/upload/v1755069843/girl-headshot_wrkeje.webp"
                              }
                              width={50}
                              height={50}
                              alt=""
                              className="w-[50px] h-[50px] rounded-full object-cover"
                            />
                          </div>
                          <div className="pl-2">
                            <div className="flex items-center">
                              <h5 className="text-[20px]">{commentReply.user.name}</h5>
                              <VscVerifiedFilled className="text-[#0095f6] ml-2 text-[20px]" />
                            </div>
                            <p>{commentReply.comment}</p>
                            <small className="text-[#ffffff83]">
                              {format(commentReply.createdAt)}
                            </small>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                )) || <h1 className="text-[20px]">No Reviews Yet</h1>}
              </div>
            </div>
            <br />
          </>
        </div>
      )}
    </div>
  );
};

interface CommentReplyProps {
  data: CourseContent[];
  activeVideo: number;
  answer: string;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
  questionId: string;
  setQuestionId: React.Dispatch<React.SetStateAction<string>>;
  handleAnswerSubmit: () => void;
  answerCreationLoading: boolean;
}

const CommentReply = ({
  data,
  activeVideo,
  answer,
  questionId,
  setAnswer,
  setQuestionId,
  handleAnswerSubmit,
  answerCreationLoading,
}: CommentReplyProps) => {
  return (
    <>
      <div className="w-full my-3">
        {data[activeVideo].questions.map((item, index) => (
          <CommentItem
            key={index}
            item={item}
            answer={answer}
            questionId={questionId}
            setAnswer={setAnswer}
            setQuestionId={setQuestionId}
            handleAnswerSubmit={handleAnswerSubmit}
            answerCreationLoading={answerCreationLoading}
          />
        ))}
      </div>
    </>
  );
};

interface CommentItemProps {
  item: Question;
  answer: string;
  questionId: string;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
  setQuestionId: React.Dispatch<React.SetStateAction<string>>;
  handleAnswerSubmit: () => void;
  answerCreationLoading: boolean;
}

const CommentItem = ({
  item,
  answer,
  questionId,
  setAnswer,
  setQuestionId,
  handleAnswerSubmit,
  answerCreationLoading,
}: CommentItemProps) => {
  const [replyActive, setReplyActive] = useState(false);
  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          <div>
            <Image
              src={
                item.user.avatar
                  ? item.user.avatar.url
                  : "https://res.cloudinary.com/dsqbqjbms/image/upload/v1755069843/girl-headshot_wrkeje.webp"
              }
              width={50}
              height={50}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </div>
          <div className="pl-3 dark:text-white text-black">
            <h5 className="text-[20px]">{item?.user.name}</h5>
            <p>{item?.question}</p>
            <small className="text-[#000000b8] dark:text-[#ffffff83]">
              {!item.createdAt ? "" : format(item?.createdAt)} *
            </small>
          </div>
        </div>
        <div className="w-full flex">
          <span
            className="800px:pl-16 text-[#000000b8] dark:text-[#ffffff83] cursor-pointer mr-2"
            onClick={() => {
              setReplyActive(!replyActive);
              setQuestionId(item._id);
            }}
          >
            {!replyActive
              ? item.questionReplies.length !== 0
                ? "All Replies"
                : "Add Reply"
              : "Hide Replies"}
          </span>
          <BiMessage
            size={20}
            className="dark:text-[#00000083]  text-[#000000b8] cursor-pointer"
          />
          <span className="pl-1 mt-[-4px] cursor-pointer text-[#000000b8]  dark:text-[#ffffff83]">
            {item.questionReplies.length}
          </span>
        </div>

        {replyActive && questionId === item._id && (
          <>
            {item.questionReplies.map((reply: QuestionReply, index: number) => (
              <div
                className="w-full flex 800px:ml-16 my-5 text-black dark:text-white"
                key={index}
              >
                <div>
                  <Image
                    src={
                      reply.user.avatar
                        ? reply.user.avatar.url
                        : "https://res.cloudinary.com/dsqbqjbms/image/upload/v1755069843/girl-headshot_wrkeje.webp"
                    }
                    width={50}
                    height={50}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                </div>
                <div className="pl-2">
                  <div className="flex item-center">
                    <h5 className="text-[20px]">{reply.user.name}</h5>
                    {reply.user.role === "admin" && (
                      <VscVerifiedFilled className="text-[#0095f6] ml-2 text-[20px]" />
                    )}
                  </div>
                  <p>{reply.answer}</p>

                  <small className="text-[#ffffff83]">
                    {reply.createdAt ? format(reply.createdAt) : ""} *
                  </small>
                </div>
              </div>
            ))}
            <>
              <div className="w-full flex relative dark:text-white text-black">
                <input
                  type="text"
                  placeholder="Enter your answer..."
                  value={answer}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAnswer(e.target.value)}
                  className={`block 800px:ml-12 mt-12 outline-none bg-transparent border-b border-[#00000027] text-black dark:text-white dark:border-[#fff] p-[5px] w-[95%] ${
                    answer === "" ||
                    (answerCreationLoading && "cursor-not-allowed")
                  }`}
                />
                <button
                  type="submit"
                  className="absolute right-0 bottom-1"
                  onClick={handleAnswerSubmit}
                  disabled={answer === "" || answerCreationLoading}
                >
                  Submit
                </button>
              </div>
              <br />
            </>
          </>
        )}
      </div>
    </>
  );
};

export default CourseContentMedia;
