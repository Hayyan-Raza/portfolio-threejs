import { cn } from "../../lib/utils";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

export const Meteors = ({
  number = 20,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const [meteors, setMeteors] = useState<number[]>([]);

  useEffect(() => {
    setMeteors(new Array(number).fill(0));
  }, [number]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {meteors.map((el, idx) => {
        const leftBase = Math.floor(Math.random() * window.innerWidth * 1.5) - window.innerWidth * 0.25;
        const duration = Math.random() * 5 + 3;
        const delay = Math.random() * 2 + 0.2;

        return (
          <motion.span
            key={"meteor" + idx}
            initial={{
              top: -50,
              left: leftBase + "px",
              opacity: 0,
            }}
            animate={{
              top: window.innerHeight + 50 + "px",
              left: leftBase - window.innerHeight * 0.8 + "px", // Moves diagonally
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: "linear"
            }}
            className={cn(
              "absolute h-0.5 w-0.5 rounded-[9999px] bg-slate-400 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
              "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
              className
            )}
          ></motion.span>
        );
      })}
    </div>
  );
};
