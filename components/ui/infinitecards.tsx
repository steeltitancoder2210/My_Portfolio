"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    name: string;
    img: string;
    url: string;
    rating: string;
    username: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-screen overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-8 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="relative w-[400px] max-w-full flex-shrink-0 rounded-lg overflow-hidden border border-gray-800 p-3 transform transition-transform duration-300 hover:scale-105"
            style={{
              backgroundColor: "#04071d",
            }}
          >
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <div className="flex flex-col items-center text-center">
                <div className="border-2 border-white p-2 rounded-md mb-4">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-auto max-h-[200px] object-contain"
                  />
                </div>
                <span className="mt-2 text-white text-lg font-bold animate-text-pulse">
                  {item.rating}
                </span>
                <span className="text-sm text-gray-400 mt-1">
                  @{item.username}
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>

      {/* Embedded CSS for the Animation */}
      <style jsx>{`
        @keyframes textPulse {
          0%, 100% {
            color: #ffffff;
            font-weight: normal;
          }
          50% {
            color:#BF77F6;
            font-weight: bold;
          }
        }

        .animate-text-pulse {
          animation: textPulse 2s infinite;
        }
      `}</style>
    </div>
  );
};

