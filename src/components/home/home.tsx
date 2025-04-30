"use client";
import React, { useEffect, useState } from "react";
import Plate from "@/assets/plate.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

const home = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [firstSentenceCharacters, setFirstSentenceCharacters] = useState<
    string[]
  >([]);
  const [secondSentenceCharacters, setSecondSentenceCharacters] = useState<
    string[]
  >([]);
  const [firstSentenceIndex, setFirstSentenceIndex] = useState(0);
  const [secondSentenceIndex, setSecondSentenceIndex] = useState(0);

  const sentences = [
    "LeetCode is the best platform to help you enhance your skills, expand your knowledge and prepare for technical interviews.",
    "Explore is a well-organized tool that helps you get the most out of LeetCode by providing structure to guide your progress towards the next step in your programming career.",
  ];

  useEffect(() => {
    // Split the first sentence into characters
    const firstSentenceArray = sentences[0].split("");
    setFirstSentenceCharacters(firstSentenceArray);

    // Split the second sentence into characters
    const secondSentenceArray = sentences[1].split("");
    setSecondSentenceCharacters(secondSentenceArray);

    // Use intervals to update the indices for both sentences
    const firstSentenceInterval = setInterval(() => {
      setFirstSentenceIndex((prevIndex) => prevIndex + 1);
    }, 50);

    const secondSentenceInterval = setInterval(() => {
      setSecondSentenceIndex((prevIndex) => prevIndex + 1);
    }, 50);

    // Clear the intervals when all characters have been processed
    if (firstSentenceIndex === firstSentenceArray.length) {
      clearInterval(firstSentenceInterval);
    }
    if (secondSentenceIndex === secondSentenceArray.length) {
      clearInterval(secondSentenceInterval);
    }

    // Cleanup: clear the intervals if the component unmounts
    return () => {
      clearInterval(firstSentenceInterval);
      clearInterval(secondSentenceInterval);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const appearPosition = 400;
      const scrollY = window.scrollY;

      if (scrollY >= appearPosition) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="bg-gradient-to-r from-zinc-800 to-slate-800 px-28">
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="transform scale-100 hover:scale-110 transition-transform duration-300 ease-in-out lg:w-72 md:w-2/4 w-5/6 mb-10 md:mb-0">
            <Image
              className="object-cover object-center rounded-[30px] origin-bottom -rotate-12 lg:ml-24"
              alt="ICOn"
              src={Plate}
            />
          </div>
          <div className="lg:flex-grow lg:w-2/4 md:w-1/2 lg:pl-80 md:pl-16 flex flex-col md:items-start md:text-left justify-center items-center text-center">
            <h1 className="title-font sm:text-5xl text-3xl mb-4 font-medium text-white">
              A New Way to Learn
            </h1>
            <p className="mb-8 text-gray-400 leading-relaxed">
              {firstSentenceCharacters
                .slice(0, firstSentenceIndex + 1)
                .join("")}
            </p>
            <div className="flex justify-center">
              <button
                className="inline-flex text-base rounded-[20px] text-white bg-lime-400 border-0 py-2 px-4 focus:outline-none hover:bg-lime-600 transform scale-100 hover:scale-110 transition-transform duration-300 ease-in-out"
                onClick={() => {
                  router.push("/accounts/signUp");
                }}
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className={`text-gray-600 body-font`}>
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow lg:items-end md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start mb-16 md:mb-0 items-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium  text-lime-300">
              Start Exploring
            </h1>
            <p className="text-right opacity-50 mb-8 leading-relaxed">
              {secondSentenceCharacters
                .slice(0, secondSentenceIndex + 1)
                .join("")}
            </p>
            <div className="flex justify-center">
              <button className="inline-flex text-indigo-200 border-0 py-2 px-6 focus:outline-none hover:text-indigo-600 rounded text-base">
                Get Started {`>`}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default home;
