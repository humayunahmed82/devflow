import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "./RenderTag";

const RightSidebar = () => {
  const hotQuestion = [
    {
      _id: "1",
      title: "How do I use exprees as a custom server in Next.js?",
    },
    {
      _id: "2",
      title: "Cascading Deletes in SQLAlchemy?",
    },
    {
      _id: "3",
      title:
        "best preactices for data fetching in a Next.js application with server side rendering (SSR)?",
    },
    {
      _id: "4",
      title: "How to perfectly center a Div with Tailwind CSS?",
    },
    {
      _id: "5",
      title: "Redux Toolkit not updating state as Expected?",
    },
  ];

  const popularTag = [
    {
      _id: "1",
      name: "JavaScript",
      totalQuestions: 5,
    },
    {
      _id: "2",
      name: "React",
      totalQuestions: 4,
    },
    {
      _id: "3",
      name: "Next",
      totalQuestions: 8,
    },
    {
      _id: "4",
      name: "Vue",
      totalQuestions: 3,
    },
    {
      _id: "5",
      name: "Redux",
      totalQuestions: 10,
    },
  ];

  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div className="">
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestion.map((question) => (
            <Link
              href={`/questions/${question._id}`}
              key={question._id}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="text-dark500_light700 body-medium">
                {question.title}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                width={20}
                height={20}
                alt="chevron Right"
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTag.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
