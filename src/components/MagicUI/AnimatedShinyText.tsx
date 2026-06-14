import { motion } from "motion/react";
import { cn } from "../../lib/utils";
import React from "react";

export const AnimatedShinyText = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.span
      initial={{ backgroundPosition: "200% center" }}
      animate={{ backgroundPosition: "-200% center" }}
      transition={{
        repeat: Infinity,
        duration: 3,
        ease: "linear",
      }}
      style={{
        backgroundSize: "200% auto",
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0) 20%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 80%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
      className={cn(
        "inline-block font-medium",
        className
      )}
    >
      {children}
    </motion.span>
  );
};
