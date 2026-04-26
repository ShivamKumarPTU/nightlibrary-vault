import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

export const RevealLine = ({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-40px" });

  return (
    <span ref={ref} className={`inline-block overflow-hidden align-bottom ${className}`}>
      <motion.span
        initial={{ y: "110%", opacity: 0, scale: 0.96 }}
        animate={inView ? { y: "0%", opacity: 1, scale: 1 } : { y: "110%", opacity: 0, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 130, damping: 18, delay }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
};

export const WordCascade = ({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-35px" });

  return (
    <span ref={ref} className={`inline-flex flex-wrap justify-center gap-x-[0.32em] gap-y-1 overflow-hidden ${className}`}>
      {text.split(" ").map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{ y: "115%", opacity: 0, rotateX: 35 }}
          animate={inView ? { y: "0%", opacity: 1, rotateX: 0 } : { y: "115%", opacity: 0, rotateX: 35 }}
          whileHover={{ y: -4, textShadow: "0 10px 24px hsl(var(--primary) / 0.38)" }}
          transition={{ duration: 0.52, delay: delay + index * 0.035, ease: [0.33, 1, 0.68, 1] }}
          className="inline-block cursor-default"
          style={{ transformOrigin: "bottom" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};
