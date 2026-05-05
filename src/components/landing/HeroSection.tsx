import { motion, useMotionValue, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { CSSProperties, MouseEvent, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Download, Play, Sparkles } from "lucide-react";
import FlipButton from "./FlipButton";
import screenshot1 from "@/assets/Screenshot_20260501_115130.png";
import screenshot2 from "@/assets/Screenshot_20260501_115148.png";
import screenshot3 from "@/assets/Screenshot_20260501_115203.png";
import screenshot4 from "@/assets/Screenshot_20260501_115214.png";
import screenshot5 from "@/assets/Screenshot_20260501_115237.png";
import screenshot6 from "@/assets/Screenshot_20260501_115252.png";
import screenshot7 from "@/assets/Screenshot_20260501_115316.png";
import screenshot8 from "@/assets/Screenshot_20260501_115326.png";
import screenshot9 from "@/assets/Screenshot_20260501_115343.png";
import screenshot10 from "@/assets/Screenshot_20260501_115446.png";
import screenshot11 from "@/assets/Screenshot_20260501_115458.png";
import screenshot12 from "@/assets/Screenshot_20260501_115510.png";
import screenshot13 from "@/assets/Screenshot_20260501_115525.png";
import screenshot14 from "@/assets/Screenshot_20260501_115557.png";
import screenshot15 from "@/assets/Screenshot_20260501_115621.png";
import screenshot16 from "@/assets/Screenshot_20260501_115651.png";
import screenshot17 from "@/assets/Screenshot_20260501_115804.png";
import screenshot18 from "@/assets/Screenshot_20260501_115834.png";
import screenshot19 from "@/assets/Screenshot_20260501_120105.png";
import screenshot20 from "@/assets/Screenshot_20260501_120217.png";
import HeroVideoBackground from "./HeroVideoBackground";
import AnimatedCounter from "./AnimatedCounter";

const screens = [
  { src: screenshot2, label: "Welcome" },
  { src: screenshot1, label: "Private Vault" },
  { src: screenshot3, label: "Discreet Access" },
  { src: screenshot4, label: "Secret Entry 1" },
  { src: screenshot5, label: "Secret Entry 2" },
  { src: screenshot6, label: "Create PIN" },
  { src: screenshot7, label: "Night Focus" },
  { src: screenshot8, label: "Library" },
  { src: screenshot9, label: "Settings" },
  { src: screenshot10, label: "Discreet Reader" },
  { src: screenshot11, label: "Passwords" },
  { src: screenshot12, label: "Contacts" },
  { src: screenshot13, label: "Add Contact" },
  { src: screenshot14, label: "Add Credential" },
  { src: screenshot15, label: "In Progress" },
  { src: screenshot16, label: "Import Media" },
  { src: screenshot17, label: "Video Player" },
  { src: screenshot18, label: "Audio Player" },
  { src: screenshot19, label: "Camera Capture" },
  { src: screenshot20, label: "Download Video" },
];

const crispImageStyle = {
  imageRendering: "crisp-edges",
  MozImageRendering: "crisp-edges",
  WebkitImageRendering: "crisp-edges",
  transform: "translateZ(0)",
  backfaceVisibility: "hidden",
} as const;

const CharReveal = ({ children, delay = 0, className = "" }: { children: string; delay?: number; className?: string }) => (
  <span className={`inline-flex overflow-hidden ${className}`}>
    {children.split("").map((char, i) => (
      <motion.span
        key={`${char}-${i}`}
        initial={{ y: "120%", opacity: 0, rotateX: 90, scale: 0.78 }}
        animate={{ y: "0%", opacity: 1, rotateX: 0, scale: [0.78, 1.18, 1] }}
        transition={{
          duration: 0.72,
          delay: delay + i * 0.028,
          ease: [0.215, 0.61, 0.355, 1],
        }}
        className="inline-block"
        style={{ transformOrigin: "bottom", textShadow: "0 0 22px hsl(var(--primary) / 0.16)" }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </span>
);

const MagneticWord = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <motion.span
    whileHover={{ y: -10, scale: 1.035, textShadow: "0 14px 34px hsl(var(--primary) / 0.45)" }}
    transition={{ type: "spring", stiffness: 320, damping: 18 }}
    className={`inline-block cursor-default ${className}`}
  >
    {children}
  </motion.span>
);

const WordReveal = ({ children, delay = 0, className = "" }: { children: string; delay?: number; className?: string }) => (
  <span className={`inline-flex flex-wrap gap-x-[0.3em] overflow-hidden ${className}`}>
    {children.split(" ").map((word, i) => (
      <motion.span
        key={`${word}-${i}`}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.7, delay: delay + i * 0.08, ease: [0.33, 1, 0.68, 1] }}
        className="inline-block"
      >
        {word}
      </motion.span>
    ))}
  </span>
);



const AndroidMockupSlider = () => {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [8, -8]), { stiffness: 100, damping: 20 });
  const parallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 100, damping: 20 });

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const scrollScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1, 0.94]);
  const scrollY = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -30]);

  const total = screens.length;

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > active ? 1 : -1);
      setActive(index);
    },
    [active]
  );

  const next = useCallback(() => {
    setDirection(1);
    setActive((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setDirection(-1);
    setActive((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-play
  useEffect(() => {
    if (isPaused) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }
    autoPlayRef.current = setInterval(next, 1000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPaused, next]);

  // Touch/Swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  };

  // Mouse parallax
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const getOffset = (index: number) => {
    let diff = index - active;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  const getVisibleScreens = () => {
    const visible: { index: number; offset: number }[] = [];
    for (let i = 0; i < total; i++) {
      const offset = getOffset(i);
      if (Math.abs(offset) <= 2) {
        visible.push({ index: i, offset });
      }
    }
    return visible.sort((a, b) => Math.abs(a.offset) - Math.abs(b.offset));
  };

  return (
    <motion.div
      ref={containerRef}
      style={{ y: scrollY, scale: scrollScale }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative flex flex-col items-center justify-center w-full min-h-[520px] sm:min-h-[620px] select-none"
    >
      {/* Glow behind active phone */}
      <div className="absolute inset-x-8 top-16 bottom-16 rounded-full bg-primary/10 blur-[50px] pointer-events-none" />

      {/* Phone slider area */}
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="relative w-full max-w-[700px] h-[420px] sm:h-[520px] md:h-[580px] flex items-center justify-center"
      >
        <AnimatePresence initial={false} custom={direction}>
          {getVisibleScreens().map(({ index, offset }) => {
            const isActive = offset === 0;
            const absOffset = Math.abs(offset);

            return (
              <motion.div
                key={`${screens[index].label}-${index}`}
                custom={direction}
                initial={{
                  x: direction > 0 ? 300 : -300,
                  scale: 0.7,
                  opacity: 0,
                  rotateY: direction > 0 ? 25 : -25,
                }}
                animate={{
                  x: offset * 180,
                  scale: isActive ? 1 : 0.75 - absOffset * 0.05,
                  opacity: isActive ? 1 : 0.5 - (absOffset - 1) * 0.15,
                  rotateY: offset * -8,
                  z: isActive ? 100 : -absOffset * 80,
                }}
                exit={{
                  x: direction > 0 ? -300 : 300,
                  scale: 0.7,
                  opacity: 0,
                  rotateY: direction > 0 ? -25 : 25,
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 26,
                  mass: 0.8,
                }}
                onClick={() => {
                  if (!isActive) goTo(index);
                }}
                className={`absolute cursor-pointer ${isActive ? "z-30" : absOffset === 1 ? "z-20" : "z-10"}`}
                style={{
                  perspective: "1200px",
                  filter: isActive ? "none" : `blur(${absOffset * 1.5}px) brightness(0.6)`,
                }}
              >
                {/* Phone screenshot */}
                <motion.div
                  whileHover={isActive ? { y: -8, scale: 1.02 } : {}}
                  whileTap={isActive ? { scale: 0.98 } : {}}
                  className={`relative overflow-hidden rounded-[2rem] transition-shadow duration-500 ${
                    isActive
                      ? "shadow-[0_20px_80px_-12px_hsl(var(--primary)/0.4),0_8px_30px_-8px_rgba(0,0,0,0.5)]"
                      : "shadow-[0_8px_30px_-8px_rgba(0,0,0,0.3)]"
                  }`}
                  style={{ width: "clamp(180px, 28vw, 240px)" }}
                >
                  <img
                    src={screens[index].src}
                    alt={`${screens[index].label} screenshot`}
                    className="w-full h-auto object-contain"
                    style={crispImageStyle}
                    draggable={false}
                  />

                  {/* Shine effect on active */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(110deg, transparent 30%, hsl(var(--foreground) / 0.08) 45%, hsl(var(--foreground) / 0.14) 50%, transparent 65%)",
                      }}
                      animate={{ x: ["-120%", "150%"] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    />
                  )}

                  {/* Active border glow */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 rounded-[2rem] border-2 border-primary/60 shadow-[inset_0_0_20px_hsl(var(--primary)/0.1)] pointer-events-none"
                    />
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Active screen label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mt-4 text-center"
        >
          <span className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {screens[active].label}
            <span className="text-muted-foreground text-xs">
              {active + 1}/{total}
            </span>
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Arrow buttons */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none px-2 sm:px-4 z-40">
        <motion.button
          whileHover={{ scale: 1.15, x: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={prev}
          className="pointer-events-auto p-2 sm:p-3 rounded-full glass border border-border/50 hover:border-primary/50 transition-colors shadow-lg backdrop-blur-xl"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.15, x: 2 }}
          whileTap={{ scale: 0.9 }}
          onClick={next}
          className="pointer-events-auto p-2 sm:p-3 rounded-full glass border border-border/50 hover:border-primary/50 transition-colors shadow-lg backdrop-blur-xl"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
        </motion.button>
      </div>

      {/* Dot indicators */}
      <div className="flex gap-1.5 mt-4 flex-wrap justify-center max-w-xs">
        {screens.map((screen, index) => (
          <button
            key={`dot-${screen.label}`}
            type="button"
            aria-label={`Show ${screen.label}`}
            onClick={() => goTo(index)}
            className={`rounded-full transition-all duration-300 ${
              active === index
                ? "w-7 h-2 bg-primary shadow-[0_0_12px_hsl(var(--primary)/0.6)]"
                : "w-2 h-2 bg-muted-foreground/40 hover:bg-muted-foreground/70"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.62], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.62], [1, 0.92]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const headlineX = useTransform(scrollYProgress, [0, 0.55], [0, -72]);
  const subtitleY = useTransform(scrollYProgress, [0, 0.48], [0, -28]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.48], [1, 0.2]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  const heroBackgroundImage: string | undefined = undefined;

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <HeroVideoBackground backgroundImage={heroBackgroundImage} />

      <motion.div
        animate={{ opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-[1]"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 30%, hsl(var(--primary) / 1) 0%, transparent 60%)",
        }}
      />

      <motion.div style={{ scale: bgScale }} className="absolute inset-0 grid-bg opacity-20">
        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(hsl(var(--primary) / 0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </motion.div>

      <motion.div style={{ y, opacity, scale }} className="relative z-10 container mx-auto px-6">
        <div className="grid items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
          <div className="text-center lg:text-left">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm mb-6 premium-glow">
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Sparkles className="w-4 h-4 text-glow-warm" />
                </motion.span>
                <WordReveal delay={0.3}>Your private media vault</WordReveal>
                <motion.span
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-accent"
                />
              </span>
            </motion.div>

            <motion.h1
              style={{ x: headlineX }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
            >
              <MagneticWord>
                <CharReveal delay={0.4}>Hide Your Media.</CharReveal>
              </MagneticWord>
              <br />
              <MagneticWord className="text-gradient-primary">
                <CharReveal delay={0.8}>Lock It.</CharReveal>
              </MagneticWord>
              <br />
              <MagneticWord className="text-gradient-warm">
                <CharReveal delay={1.2}>Protect It.</CharReveal>
              </MagneticWord>
            </motion.h1>

            <motion.p
              style={{ y: subtitleY, opacity: subtitleOpacity }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              <WordReveal delay={1.7}>
               Store and play your photos and videos — completely private, always on your device. No cloud. No accounts
              </WordReveal>
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <FlipButton primary icon={Download} delay={2.0}>
              Launching Soon
              </FlipButton>
              <FlipButton icon={Play} delay={2.12}>
                Watch Demo
              </FlipButton>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.3 }}
              className="flex gap-8 mt-10 justify-center lg:justify-start"
            >
          {[
  { value: 256, suffix: "-bit", label: "Military Grade Encryption" },
  { value: 0, suffix: "", label: "Data Collected", display: "Zero" },
  { value: 100, suffix: "%", label: "Free Forever" },
].map((stat, i) => (
  <motion.div
    key={stat.label}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 2.3 + i * 0.15 }}
    whileHover={{ scale: 1.1, y: -4 }}
    className="text-center cursor-default"
  >
    <div className="font-display text-2xl font-bold text-gradient-primary">
      {"display" in stat ? (
        stat.display
      ) : (
        <AnimatedCounter
          target={stat.value}
          suffix={stat.suffix}
          duration={2.5}
          decimals={0}
        />
      )}
    </div>
    <div className="text-sm text-muted-foreground">{stat.label}</div>
  </motion.div>
))}
            </motion.div>
          </div>

          <motion.div style={{ y: phoneY }} className="relative flex justify-center items-center">
            <AndroidMockupSlider />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;