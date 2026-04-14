import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Download, Play, ChevronDown, Sparkles } from "lucide-react";
import screenshotHome from "@/assets/screenshot-home.png";
import screenshotVault from "@/assets/screenshot-vault.png";
import screenshotCompleted from "@/assets/screenshot-completed.png";
import HeroVideoBackground from "./HeroVideoBackground";
import AnimatedCounter from "./AnimatedCounter";

const TextReveal = ({ children, delay = 0 }: { children: string; delay?: number }) => (
  <span className="inline-block overflow-hidden">
    <motion.span
      initial={{ y: "110%", opacity: 0 }}
      animate={{ y: "0%", opacity: 1 }}
      transition={{ duration: 0.8, delay, ease: [0.33, 1, 0.68, 1] }}
      className="inline-block"
    >
      {children}
    </motion.span>
  </span>
);

const GlowingButton = ({ children, primary = false, icon: Icon, delay = 0 }: any) => (
  <motion.button
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    whileHover={{
      scale: 1.05,
      boxShadow: primary
        ? "0 0 50px hsl(270 80% 60% / 0.5), 0 0 100px hsl(270 80% 60% / 0.2)"
        : "0 0 30px hsl(240 6% 30% / 0.3)",
    }}
    whileTap={{ scale: 0.95 }}
    className={`group relative px-8 py-4 rounded-2xl font-display font-semibold text-lg flex items-center justify-center gap-2 overflow-hidden ${
      primary
        ? "bg-gradient-cta text-primary-foreground"
        : "glass"
    }`}
  >
    {primary && (
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.2) 55%, transparent 60%)",
        }}
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      />
    )}
    {/* Ripple on hover */}
    <motion.div
      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
      style={{
        background: primary
          ? "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)"
          : "radial-gradient(circle at center, hsl(270 80% 60% / 0.08) 0%, transparent 70%)",
      }}
    />
    <Icon className="w-5 h-5 relative z-10" />
    <span className="relative z-10">{children}</span>
  </motion.button>
);

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <HeroVideoBackground />

      {/* Radial spotlight that breathes */}
      <motion.div
        animate={{ opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-[1]"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 30%, hsl(270 80% 60% / 1) 0%, transparent 60%)",
        }}
      />

      {/* Animated grid lines */}
      <motion.div style={{ scale: bgScale }} className="absolute inset-0 grid-bg opacity-20">
        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(hsl(270 80% 60% / 0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </motion.div>

      <motion.div style={{ y, opacity, scale }} className="relative z-10 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left: Copy */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm mb-6 premium-glow">
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Sparkles className="w-4 h-4 text-glow-warm" />
                </motion.span>
                <span className="text-muted-foreground">Privacy-first media vault</span>
                <motion.span
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-green-500"
                />
              </span>
            </motion.div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
              <TextReveal delay={0.3}>Your Media.</TextReveal>
              <br />
              <span className="text-gradient-primary">
                <TextReveal delay={0.5}>Your Rules.</TextReveal>
              </span>
              <br />
              <span className="text-gradient-warm">
                <TextReveal delay={0.7}>Your Vault.</TextReveal>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Securely store, download, and manage photos, videos & files — with powerful playback and total privacy.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <GlowingButton primary icon={Download} delay={1.1}>
                Download Now
              </GlowingButton>
              <GlowingButton icon={Play} delay={1.2}>
                Watch Demo
              </GlowingButton>
            </div>

            {/* Animated stats counters */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="flex gap-8 mt-10 justify-center lg:justify-start"
            >
              {[
                { value: 100, suffix: "K+", label: "Downloads" },
                { value: 4.8, suffix: "★", label: "Rating", decimals: 1 },
                { value: 256, suffix: "-bit", label: "Encryption" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + i * 0.15 }}
                  whileHover={{ scale: 1.1, y: -4 }}
                  className="text-center cursor-default"
                >
                  <div className="font-display text-2xl font-bold text-gradient-primary">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={2.5} decimals={stat.decimals || 0} />
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Phone mockups with floating animation */}
          <motion.div style={{ y: phoneY }} className="flex-1 relative flex justify-center items-center">
            <div className="relative w-[280px] h-[560px] sm:w-[300px] sm:h-[600px]" style={{ perspective: "1200px" }}>
              {/* Rotating glow ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-40px] rounded-full z-0"
                style={{
                  background: "conic-gradient(from 0deg, transparent 0%, hsl(270 80% 60% / 0.12) 25%, transparent 50%, hsl(190 90% 50% / 0.1) 75%, transparent 100%)",
                }}
              />

              {/* Second rotating ring (counter direction) */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-60px] rounded-full z-0"
                style={{
                  background: "conic-gradient(from 90deg, transparent 0%, hsl(35 100% 55% / 0.05) 25%, transparent 50%, hsl(270 80% 60% / 0.06) 75%, transparent 100%)",
                }}
              />

              {/* Back left phone */}
              <motion.div
                initial={{ opacity: 0, x: -80, rotateY: 25 }}
                animate={{ opacity: 0.5, x: -60, rotateY: 12 }}
                transition={{ duration: 1.2, delay: 0.8 }}
                className="absolute -left-16 top-8 w-[220px] h-[440px] phone-mockup z-0"
              >
                <img src={screenshotVault} alt="Vault view" className="w-full h-full object-cover" />
              </motion.div>

              {/* Back right phone */}
              <motion.div
                initial={{ opacity: 0, x: 80, rotateY: -25 }}
                animate={{ opacity: 0.5, x: 60, rotateY: -12 }}
                transition={{ duration: 1.2, delay: 0.9 }}
                className="absolute -right-16 top-8 w-[220px] h-[440px] phone-mockup z-0"
              >
                <img src={screenshotCompleted} alt="Completed view" className="w-full h-full object-cover" />
              </motion.div>

              {/* Center phone — floating with 3D tilt */}
              <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.8, rotateX: 20 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                transition={{ duration: 1.2, delay: 0.6, type: "spring", stiffness: 80 }}
                className="relative z-10 w-full h-full"
              >
                <motion.div
                  animate={{ y: [-6, 6, -6], rotateY: [-2, 2, -2] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="phone-mockup w-full h-full"
                >
                  <img src={screenshotHome} alt="NightLibrary Home" className="w-full h-full object-cover" />
                  {/* Screen reflection */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%)",
                    }}
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                  />
                </motion.div>
                <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-primary/10 blur-[60px]" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-muted-foreground/30 flex items-start justify-center p-1"
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
