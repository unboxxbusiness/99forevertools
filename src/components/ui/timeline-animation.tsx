"use client";
import { cn } from "@/lib/utils";
import React from "react";

type TimelineContentProps = {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
};

export const TimelineContent: React.FC<TimelineContentProps> = ({
  children,
  as = "div",
  className,
}) => {
  const Component = as;

  return (
    <Component
      className={cn(className, "animate-fade-in")}
    >
      {children}
    </Component>
  );
};
