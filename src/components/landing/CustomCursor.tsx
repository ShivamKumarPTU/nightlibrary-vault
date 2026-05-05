import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const CustomCursor = () => {
  const [cursorType, setCursorType] = useState("default");
  const [isVisible, setIsVisible] = useState(false);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for fluid movement
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check what's under the cursor
      const target = e.target as HTMLElement;
      const isPointer = window.getComputedStyle(target).cursor === "pointer" || 
                        target.tagName === "BUTTON" || 
                        target.tagName === "A" ||
                        target.closest("button") ||
                        target.closest("a");
      
      setCursorType(isPointer ? "pointer" : "default");
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Main Ring */}
          <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary/50 pointer-events-none z-[9999]"
            style={{
              x: cursorX,
              y: cursorY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{
              scale: cursorType === "pointer" ? 1.5 : 1,
              borderColor: cursorType === "pointer"
                ? "hsl(var(--primary) / 0.9)"
                : "hsl(var(--primary) / 0.5)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />

          {/* Center Dot */}
          <motion.div
            className="fixed top-0 left-0 w-1.5 h-1.5 bg-primary rounded-full pointer-events-none z-[10000]"
            style={{
              x: mouseX,
              y: mouseY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{
              scale: cursorType === "pointer" ? 0 : 1,
              opacity: cursorType === "pointer" ? 0 : 1,
            }}
          />

          {/* Pulse Effect on Click */}
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9998] border-2 border-primary/30 rounded-full"
            style={{
              x: mouseX,
              y: mouseY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ scale: 0, opacity: 0 }}
            whileTap={{ scale: 4, opacity: [0.5, 0] }}
            transition={{ duration: 0.5 }}
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default CustomCursor;
