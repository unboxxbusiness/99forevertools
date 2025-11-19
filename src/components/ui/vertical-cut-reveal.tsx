"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface VerticalCutRevealProps {
  text: string;
  splitBy?: "chars" | "words";
  className?: string;
  containerClassName?: string;
}

const VerticalCutReveal: React.FC<VerticalCutRevealProps> = ({
  text,
  splitBy = "chars",
  className,
  containerClassName,
  ...props
}) => {
  const splitText = splitBy === "chars" ? text.split("") : text.split(" ");
  
  const textElements = splitText.map((unit, i) => (
    <div key={i} className={cn("animate-fade-in", className)}>
        {unit === " " ? "\u00A0" : unit}
    </div>
  ));

  return (
    <div
      aria-label={text}
      className={cn("flex", containerClassName)}
      {...props}
    >
      {textElements}
    </div>
  );
};

export { VerticalCutReveal };
