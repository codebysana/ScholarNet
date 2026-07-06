import { styles } from "@/app/styles/style";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { HiMinus, HiPlus } from "react-icons/hi";
import {IoMdAddCircleOutline} from "react-icons/io";
import Loader from "../../loader/Loader";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

interface FaqQuestion {
  _id?: string;
  question: string;
  answer: string;
  active?: boolean;
}

const EditFaqs = () => {
  const { data, isLoading } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isSuccess: layoutSuccess, error }] =
    useEditLayoutMutation();

  const [questions, setQuestions] = useState<FaqQuestion[]>([]);
  useEffect(() => {
    if (data) {
      setQuestions(data.layout.faqs);
    }
    if (layoutSuccess) {
      toast.success("FAQS updated successfully");
    }
     if (error) {
       const fetchError = error as FetchBaseQueryError;

       if (
         fetchError.data &&
         typeof fetchError.data === "object" &&
         "message" in fetchError.data
       ) {
         toast.error((fetchError.data as { message: string }).message);
       }
     }
  }, [data, layoutSuccess, error]);
  console.log(data);

  const toggleQuestion = (id: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    );
  };

  const handleQuestionChange = (id: string, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, question: value } : q))
    );
  };

  const handleAnswerChange = (id: string, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, answer: value } : q))
    );
  };

  const newFaqsHandler = () => {
    setQuestions([
      ...questions,
      {
        _id: `${Date.now()}-${Math.random()}`,
        question: "",
        answer: "",
      },
    ]);
  };

  const areQuestionsUnchanged = (
    originalQuestions: FaqQuestion[],
    newQuestions: FaqQuestion[]
  ) => {
    return JSON.stringify(originalQuestions) === JSON.stringify(newQuestions);
  };

  const isAnyQuestionEmpty = (questions: FaqQuestion[]) => {
    return questions.some((q) => q.question === "" || q.answer === "");
  };

  const handleEdit = async () => {
    if (
      data &&
      !areQuestionsUnchanged(data.layout.faqs, questions) &&
      !isAnyQuestionEmpty(questions)
    ) {
      await editLayout({
        type: "FAQs",
        faqs: questions,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px]">
          <div className="mt-12">
            <dl className="space-y-8">
              {questions.map((q: FaqQuestion) => (
                <div
                  key={q._id}
                  className={`${
                    q._id !== questions[0]?._id && "border_t"
                  } border-gray-200 pt-6`}
                >
                  <dt className="text-lg">
                      <button
                      className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
                      onClick={() => toggleQuestion(q._id!)}
                    >
                      <input
                        className={`${styles.input} border-none`}
                        value={q.question}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleQuestionChange(q._id!, e.target.value)
                        }
                        placeholder="Add your question..."
                      />
                      <span className="ml-6 flex-shrink-0">
                        {q.active ? (
                          <HiMinus className="h-6 w-6" />
                        ) : (
                          <HiPlus className="h-6 ww-6" />
                        )}
                      </span>
                    </button>
                  </dt>
                  {q.active && (
                    <dd className="mt-2 pr-12">
                      <input
                        className={`${styles.input} border-none`}
                        value={q.answer}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleAnswerChange(q._id!, e.target.value)
                        }
                        placeholder="Add your answer"
                      />
                      <span className="ml-6 flex-shrink-0">
                        <AiOutlineDelete
                          className="dark:text-white text-black text-[18px] cursor-pointer"
                          onClick={() => {
                            setQuestions((prevQuestions) =>
                              prevQuestions.filter((item) => item._id !== q._id)
                            );
                          }}
                        />
                      </span>
                    </dd>
                  )}
                </div>
              ))}
            </dl>
            <br />
            <br />
            <IoMdAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer"
              onClick={newFaqsHandler}
            />
          </div>
          <div
            className={`${
              styles.button
            } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] ${
              areQuestionsUnchanged(data.layout.faqs, questions) ||
              isAnyQuestionEmpty(questions)
                ? "cursor-not-allowed"
                : "cursor-pointer !bg-[#42d383]"
            } rounded absolute bottom-12 right-12`}
            onClick={
              areQuestionsUnchanged(data.layout.faqs, questions) ||
              isAnyQuestionEmpty(questions)
                ? () => null
                : handleEdit
            }
          ></div>
        </div>
      )}
    </>
  );
};

export default EditFaqs;
