"use client";
import { cn } from "@/lib/utils";
import { motion, useInView, type TargetAndTransition } from "framer-motion";
import React from "react";

type TimelineContentProps = {
  children: React.ReactNode;
  animationNum?: number;
  timelineRef: React.RefObject<HTMLElement>;
  as?: React.ElementType;
  className?: string;
  customVariants: {
    visible: (i: number) => TargetAndTransition;
    hidden: TargetAndTransition;
  };
};

export const TimelineContent: React.FC<TimelineContentProps> = ({
  children,
  animationNum = 0,
  timelineRef,
  as = "div",
  className,
  customVariants,
}) => {
  const isInView = useInView(timelineRef, { once: true });
  const MotionComponent = motion(as);

  return (
    <MotionComponent
      className={cn(className)}
      custom={animationNum}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={customVariants}
    >
      {children}
    </MotionComponent>
  );
};
