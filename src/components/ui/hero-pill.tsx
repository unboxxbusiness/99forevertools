
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
        "flex w-auto items-center space-x-2 rounded-full",
        "bg-primary/20 ring-1 ring-accent",
        "px-2 py-1 whitespace-pre",
        "group",
        className
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className={cn(
        "w-fit rounded-full bg-accent px-2 py-0.5",
        "text-xs font-medium text-primary sm:text-sm",
        "text-center"
      )}>
        {announcement}
      </div>
      <p className="text-xs font-medium text-primary sm:text-sm">
        {label}
      </p>
      <MoveRight
        className="ml-1 h-4 w-4 text-primary transition-transform group-hover:translate-x-1"
      />
    </motion.a>
  );
}
