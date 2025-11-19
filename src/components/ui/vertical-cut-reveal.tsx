"use client";
import React, { useRef } from "react";
import { motion, useInView, type Variants, type Transition } from "motion/react";

interface VerticalCutRevealProps {
  text: string;
  splitBy?: "chars" | "words";
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center";
  duration?: number;
  className?: string;
  containerClassName?: string;
  transition?: Transition;
  reverse?: boolean;
}

const VerticalCutReveal: React.FC<VerticalCutRevealProps> = ({
  text,
  splitBy = "chars",
  staggerDuration = 0.05,
  staggerFrom = "first",
  duration = 0.4,
  className,
  containerClassName,
  transition,
  reverse = false,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const mainVariants: Variants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: staggerDuration,
        staggerDirection: staggerFrom === "last" ? -1 : 1,
      },
    },
  };

  const charVariants: Variants = {
    initial: {
      y: reverse ? "-100%" : "100%",
    },
    animate: {
      y: "0%",
    },
  };

  const splitText = splitBy === "chars" ? text.split("") : text.split(" ");
  const textElements = splitText.map((unit, i) => (
    <div key={i} className="overflow-hidden">
      <motion.div
        aria-hidden
        variants={charVariants}
        transition={
          transition || {
            duration,
          }
        }
        className={className}
      >
        {unit === " " ? "\u00A0" : unit}
      </motion.div>
    </div>
  ));

  return (
    <motion.div
      ref={ref}
      aria-label={text}
      variants={mainVariants}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      className={`flex ${containerClassName}`}
      {...props}
    >
      {textElements}
    </motion.div>
  );
};

export { VerticalCutReveal };
