import { styles } from "@/app/styles/style";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";

type Props = object;

type Faq = {
  _id: string;
  question: string;
  answer: string;
};

const FAQs = ({}: Props) => {
  const { data } = useGetHeroDataQuery("FAQ", {});
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Faq[]>([]);

  useEffect(() => {
    if (data?.layout?.faqs) {
      setQuestions(data.layout.faqs);
    }
  }, [data]);
  const toggleQuestion = (id: string) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };
  return (
    <div>
      <div className="w-[90%] 800px:w-[80%] mx-auto my-14">
        <h1 className={`${styles.title} 800px:text-[40px]`}>
          Frequently Asked Questions
        </h1>
        <div className="mt-12">
          <dl className="space-y-8">
            {questions.map((q) => (
              <div
                className={`${
                  q._id !== questions[0]?._id && "border-t"
                } border-gray-200 pt-6`}
                key={q._id}
              >
                <dt className="text-lg">
                  <button
                    className="flex items-start justify-between w-full text-left focus:outline-none"
                    onClick={() => toggleQuestion(q._id)}
                  >
                    <span className="font-medium text-black dark:text-white">
                      {q.question}
                    </span>
                    <span className="ml-6 flex-shrink-0">
                      {activeQuestion === q._id ? (
                        <HiMinus className="h-6 w-6 text-black dark:text-white" />
                      ) : (
                        <HiPlus className="h-6 w-6 text-black dark:text-white" />
                      )}
                    </span>
                  </button>
                  {activeQuestion === q._id && (
                    <dd className="mt-4 text-base text-gray-600 dark:text-gray-300">
                      {q.answer}
                    </dd>
                  )}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
