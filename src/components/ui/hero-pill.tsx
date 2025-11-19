
"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";
import { MoveRight } from "lucide-react";

interface HeroPillProps {
  href: string;
  label: string;
  announcement?: string;
  className?: string;
  isExternal?: boolean;
}

export function HeroPill({ 
  href, 
  label, 
  announcement = "📣 Announcement",
  className,
  isExternal = false,
}: HeroPillProps) {
  return (
    <motion.a
      href={href}
      target={isExternal ? "_blank" : undefined}
      className={cn(
        "flex w-fit items-center justify-center rounded-full",
        "bg-primary/10 ring-1 ring-primary/20",
        "flex-col gap-2 p-2 text-center sm:flex-row sm:gap-0 sm:p-1",
        "group",
        className
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className={cn(
        "w-fit rounded-full bg-accent px-2.5 py-1",
        "text-xs font-semibold text-primary"
      )}>
        {announcement}
      </div>
      <p className="flex items-center text-xs font-semibold text-primary sm:text-sm sm:px-2">
        {label}
        <MoveRight
          className="ml-1.5 h-4 w-4 text-primary transition-transform group-hover:translate-x-1"
        />
      </p>
    </motion.a>
  );
}
