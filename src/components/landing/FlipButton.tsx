import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef, ReactNode, MouseEvent } from "react";

interface FlipButtonProps {
  children: ReactNode;
  primary?: boolean;
  icon?: any;
  delay?: number;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const FlipButton = ({ children, primary = false, icon: Icon, delay = 0, onClick, className = "" }: FlipButtonProps) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isPressed, setIsPressed] = useState(false);

  // 3D tilt motion values
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 15 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 15 });

  // Reactive gloss gradient derived from motion values
  const glossBackground = useTransform(
    [glowX, glowY],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, ${
        primary ? "rgba(255, 255, 255, 0.4)" : "rgba(255, 255, 255, 0.2)"
      } 0%, transparent 70%)`
  );

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const hw = rect.width / 2;
    const hh = rect.height / 2;
    // Dramatic tilt: max ±20deg
    rotateY.set(((cx - hw) / hw) * 20);
    rotateX.set(-((cy - hh) / hh) * 15);
    // glow follow
    glowX.set((cx / rect.width) * 100);
    glowY.set((cy / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
    setIsPressed(false);
  };

  const handleInternalClick = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ripple = { id: Date.now(), x: e.clientX - rect.left, y: e.clientY - rect.top };
    setRipples((items) => [...items, ripple]);
    window.setTimeout(() => setRipples((items) => items.filter((item) => item.id !== ripple.id)), 700);
    if (onClick) onClick(e);
  };

  return (
    <div style={{ perspective: "1000px" }} className={`inline-flex ${className}`}>
      <motion.button
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay, type: "spring", stiffness: 120 }}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onClick={handleInternalClick}
        className="group relative cursor-pointer select-none"
      >
        {/* Button Shadow/Edge Layer */}
        <div 
          className={`absolute inset-0 rounded-2xl transform-gpu translate-y-[4px] transition-all duration-200 ${
            primary ? "bg-primary/40 brightness-50" : "bg-muted/40"
          }`}
          style={{ transform: "translateZ(-10px)" }}
        />

        {/* Main Button Surface */}
        <div
          className={`relative px-8 py-4 rounded-2xl font-display font-semibold text-lg flex items-center justify-center gap-3 overflow-hidden transition-all duration-200 transform-gpu ${
            primary 
              ? "bg-gradient-cta text-primary-foreground shadow-[0_8px_20px_rgba(var(--primary),0.3)]" 
              : "glass shadow-xl"
          }`}
          style={{ 
            transform: isPressed ? "translateZ(0px)" : "translateZ(20px)",
            transformStyle: "preserve-3d"
          }}
        >
          {/* Dynamic gloss layer */}
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: glossBackground, transform: "translateZ(1px)" }}
          />

          {/* Sweeping shimmer */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
            style={{
              background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 55%, transparent 70%)",
              transform: "translateZ(2px)"
            }}
            animate={{ x: ["-140%", "160%"] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />

          {/* Icon and Text with Parallax & Rolling Flip */}
          <span 
            className="relative z-10 flex items-center gap-3"
            style={{ transform: "translateZ(30px)" }}
          >
            {Icon && <Icon className="h-5 w-5 drop-shadow-lg" />}
            
            <span className="relative h-[1.5em] overflow-hidden">
              <span className="flex flex-col transition-transform duration-500 ease-[0.33,1,0.68,1] group-hover:-translate-y-1/2">
                <span className="flex h-[1.5em] items-center drop-shadow-md">
                  {children}
                </span>
                <span className={`flex h-[1.5em] items-center drop-shadow-md ${primary ? "text-white" : "text-primary"}`}>
                  {children}
                </span>
              </span>
            </span>

            {primary && (
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="group-hover:translate-x-1 transition-transform duration-300"
              >
                →
              </motion.span>
            )}
          </span>

          {/* Ripple Effect */}
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 6, opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute h-10 w-10 rounded-full bg-white/20 pointer-events-none"
              style={{ left: ripple.x - 20, top: ripple.y - 20, transform: "translateZ(5px)" }}
            />
          ))}
        </div>
      </motion.button>
    </div>
  );
};

export default FlipButton;
