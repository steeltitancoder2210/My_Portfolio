

"use client";

import { useEffect, useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import { cn } from "@/lib/utils";
import { BackgroundGradientAnimation } from "../ui/gradientbg";
import animationData from "@/data/confetti.json";
import MagicButton from "./magicbutton";
import GridGlobe from "./gridglobe";

const techStacks = [
  "ReactJS",
  "Express",
  "Typescript",
  "VueJS",
  "NuxtJS",
  "GraphQL",
  "C++",
  "Python",
  "Data Structures",
  "Algorithms",
  "Competitive Programming",
  "LeetCode",
  "Codeforces",
  "Hackerrank",
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const defaultOptions = {
    loop: copied,
    autoplay: copied,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleCopy = () => {
    const text = "hsu@jsmastery.pro";
    navigator.clipboard.writeText(text);
    setCopied(true);
  };
  const handleDownload = () => {
    const resumeLink = "link_to_your_resume.pdf"; // Replace with your resume link
    const link = document.createElement("a");
    link.href = resumeLink;
    link.download = "My_Resume.pdf"; // Specify the name of the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setCopied(true); // Assuming you want to keep the copied state for the animation or change it to a more appropriate state name.
  };

  useEffect(() => {
    if (id === 3) {
      const target = document.getElementById(`tech-stack-${id}`);
      if (target) {
        const observer = new IntersectionObserver(
          (entries) => {
            const entry = entries[0];
            setIsVisible(entry.isIntersecting); // Update state based on intersection
          },
          { threshold: 0.2 } // Adjust the threshold as needed
        );
        observer.observe(target);

        return () => observer.disconnect(); // Cleanup on unmount
      }
    }
  }, [id]);

  return (
    <div
      className={cn(
        "row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4",
        className
      )}
      style={{
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      <div className={`${id === 6 ? "flex justify-center" : ""} h-full`}>
        <div className="w-full h-full absolute">
          {img && (
            <img
              src={img}
              alt={img}
              className={cn(imgClassName, "object-cover object-center")}
            />
          )}
        </div>
        <div
          className={`absolute right-0 -bottom-5 ${id === 5 ? "w-full opacity-80" : ""}`}
        >
          {spareImg && (
            <img
              src={spareImg}
              alt={spareImg}
              className="object-cover object-center w-full h-full"
            />
          )}
        </div>
        {id === 6 && (
          <BackgroundGradientAnimation>
            <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl"></div>
          </BackgroundGradientAnimation>
        )}

        <div
          className={cn(
            titleClassName,
            "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10"
          )}
        >
          <div className="font-sans font-extralight md:max-w-32 md:text-xs lg:text-base text-sm text-[#C1C2D3] z-10">
            {description}
          </div>
          <div className="font-sans text-lg lg:text-3xl max-w-96 font-bold z-10">
            {title}
          </div>

          {id === 2 && <GridGlobe />}

          {id === 3 && (
            <div id={`tech-stack-${id}`} className="flex flex-wrap gap-2 lg:gap-4 mt-4">
              {techStacks.map((stack, index) => (
                <motion.span
                  key={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"} // Animate only when visible
                  transition={{ delay: index * 0.2 }}
                  className="py-2 px-4 text-xs lg:text-base rounded-lg text-center bg-[#10132E] text-white"
                >
                  {stack}
                </motion.span>
              ))}
            </div>
          )}

          {id === 6 && (
            <div className="mt-5 relative">
              <div
                className={`absolute -bottom-5 right-0 ${copied ? "block" : "block"}`}
              >
                <Lottie options={defaultOptions} height={200} width={400} />
              </div>

              <MagicButton
              title={copied ? "Resume Downloaded!" : "Download My Resume"}
              icon={<HiOutlineDocumentDownload/>}
                position="left"
                handleClick={handleDownload}
                otherClasses="!bg-[#161A31]"
              />
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
