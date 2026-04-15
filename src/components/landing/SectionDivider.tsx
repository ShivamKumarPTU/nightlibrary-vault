import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const SectionDivider = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scaleX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0.3]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0.2]);
  const dotScale = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]);

  return (
    <div ref={ref} className="relative flex items-center justify-center py-4">
      <motion.div
        style={{ scaleX, opacity }}
        className="w-full max-w-md h-[1px]"
      >
        <div
          className="w-full h-full"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), hsl(var(--accent) / 0.3), transparent)",
          }}
        />
      </motion.div>
      <motion.div
        style={{ scale: dotScale, opacity }}
        className="absolute w-2 h-2 rounded-full bg-primary/50"
      />
    </div>
  );
};

export default SectionDivider;
