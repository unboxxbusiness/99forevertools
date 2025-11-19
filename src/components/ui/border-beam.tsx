"use client";

import { cn } from "@/lib/utils";
import React, { forwardRef, useMemo } from "react";

const BorderBeam = forwardRef<
  HTMLDivElement,
  {
    className?: string;
    size?: number;
    duration?: number;
    borderWidth?: number;
    anchor?: number;
    colorFrom?: string;
    colorTo?: string;
    delay?: number;
  }
>(
  (
    {
      className,
      size = 200,
      duration = 15,
      anchor = 90,
      borderWidth = 1.5,
      colorFrom = "hsl(var(--primary))",
      colorTo = "hsl(var(--primary) / 0.1)",
      delay = 0,
    },
    ref
  ) => {
    const id = useMemo(() => `border-beam-${Math.random().toString(36).substr(2, 9)}`, []);

    return (
      <div
        ref={ref}
        className={cn(
          "absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]",
          // mask styles
          "![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
          // hokusai says this is "the most important part"
          "after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-border-beam after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]",
          className
        )}
        style={
          {
            "--border-width": borderWidth,
            "--size": size,
            "--duration": `${duration}s`,
            "--anchor": anchor,
            "--color-from": colorFrom,
            "--color-to": colorTo,
            "--delay": `-${delay}s`,
          } as React.CSSProperties
        }
      >
        <style>
          {`
            @keyframes border-beam {
              100% {
                offset-distance: 100%;
              }
            }
          `}
        </style>
      </div>
    );
  }
);
BorderBeam.displayName = "BorderBeam";

export { BorderBeam };
