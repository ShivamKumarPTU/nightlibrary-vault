import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Download, Play, ChevronDown, Sparkles } from "lucide-react";
import screenshotHome from "@/assets/screenshot-home.png";
import screenshotVault from "@/assets/screenshot-vault.png";
import screenshotCompleted from "@/assets/screenshot-completed.png";

const TextReveal = ({ children, delay = 0 }: { children: string; delay?: number }) => (
  <span className="inline-block overflow-hidden">
    <motion.span
      initial={{ y: "110%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.8, delay, ease: [0.33, 1, 0.68, 1] }}
      className="inline-block"
    >
      {children}
    </motion.span>
  </span>
);

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Radial spotlight */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 30%, hsl(270 80% 60% / 0.08) 0%, transparent 60%)",
        }}
      />

      {/* Animated grid lines */}
      <div className="absolute inset-0 grid-bg opacity-30">
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(hsl(270 80% 60% / 0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <motion.div style={{ y, opacity, scale }} className="relative z-10 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left: Copy */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <span className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm mb-6">
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Sparkles className="w-4 h-4 text-glow-warm" />
                </motion.span>
                <span className="text-muted-foreground">Privacy-first media vault</span>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Securely store, download, and manage photos, videos & files — with powerful playback and total privacy.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px hsl(270 80% 60% / 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="group relative bg-gradient-cta px-8 py-4 rounded-2xl font-display font-semibold text-lg text-primary-foreground flex items-center justify-center gap-2 overflow-hidden"
              >
                {/* Button shine */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 55%, transparent 60%)",
                  }}
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
                />
                <Download className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Download Now</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "hsl(240 6% 18%)" }}
                whileTap={{ scale: 0.95 }}
                className="glass px-8 py-4 rounded-2xl font-display font-semibold text-lg flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Stats with count-up feel */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="flex gap-8 mt-10 justify-center lg:justify-start"
            >
              {[
                { value: "100K+", label: "Downloads" },
                { value: "4.8★", label: "Rating" },
                { value: "256-bit", label: "Encryption" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="font-display text-2xl font-bold text-gradient-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Phone mockups with floating animation */}
          <motion.div style={{ y: phoneY }} className="flex-1 relative flex justify-center items-center">
            <div className="relative w-[280px] h-[560px] sm:w-[300px] sm:h-[600px]">
              {/* Rotating glow ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-30px] rounded-full z-0"
                style={{
                  background: "conic-gradient(from 0deg, transparent 0%, hsl(270 80% 60% / 0.1) 25%, transparent 50%, hsl(190 90% 50% / 0.08) 75%, transparent 100%)",
                }}
              />

              {/* Back left phone */}
              <motion.div
                initial={{ opacity: 0, x: -80, rotateY: 15 }}
                animate={{ opacity: 0.5, x: -60, rotateY: 10 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute -left-16 top-8 w-[220px] h-[440px] phone-mockup z-0"
              >
                <img src={screenshotVault} alt="Vault view" className="w-full h-full object-cover" />
              </motion.div>

              {/* Back right phone */}
              <motion.div
                initial={{ opacity: 0, x: 80, rotateY: -15 }}
                animate={{ opacity: 0.5, x: 60, rotateY: -10 }}
                transition={{ duration: 1, delay: 0.9 }}
                className="absolute -right-16 top-8 w-[220px] h-[440px] phone-mockup z-0"
              >
                <img src={screenshotCompleted} alt="Completed view" className="w-full h-full object-cover" />
              </motion.div>

              {/* Center phone — floating */}
              <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.6, type: "spring", stiffness: 100 }}
                className="relative z-10 w-full h-full"
              >
                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="phone-mockup w-full h-full"
                >
                  <img src={screenshotHome} alt="NightLibrary Home" className="w-full h-full object-cover" />
                </motion.div>
                <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-primary/10 blur-[50px]" />
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
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
