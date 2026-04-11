import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Shield, Download, Play, ChevronDown } from "lucide-react";
import screenshotHome from "@/assets/screenshot-home.png";
import screenshotVault from "@/assets/screenshot-vault.png";
import screenshotCompleted from "@/assets/screenshot-completed.png";

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/8 blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full bg-glow-warm/5 blur-[80px]"
        />
      </div>

      <div className="absolute inset-0 grid-bg opacity-40" />

      <motion.div style={{ y, opacity, scale }} className="relative z-10 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left: Copy */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm mb-6"
              >
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Privacy-first media vault</span>
              </motion.span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
            >
              Your Media.
              <br />
              <span className="text-gradient-primary">Your Rules.</span>
              <br />
              <span className="text-gradient-warm">Your Vault.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Securely store, download, and manage photos, videos & files — with powerful playback and total privacy.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(270 80% 60% / 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-cta px-8 py-4 rounded-2xl font-display font-semibold text-lg text-primary-foreground flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Now
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

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex gap-8 mt-10 justify-center lg:justify-start"
            >
              {[
                { value: "100K+", label: "Downloads" },
                { value: "4.8★", label: "Rating" },
                { value: "256-bit", label: "Encryption" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-2xl font-bold text-gradient-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Phone mockups */}
          <div className="flex-1 relative flex justify-center items-center">
            <div className="relative w-[280px] h-[560px] sm:w-[300px] sm:h-[600px]">
              {/* Back left phone */}
              <motion.div
                initial={{ opacity: 0, x: -80, rotateY: 15 }}
                animate={{ opacity: 0.6, x: -60, rotateY: 10 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute -left-16 top-8 w-[220px] h-[440px] phone-mockup z-0"
              >
                <img src={screenshotVault} alt="Vault view" className="w-full h-full object-cover" />
              </motion.div>

              {/* Back right phone */}
              <motion.div
                initial={{ opacity: 0, x: 80, rotateY: -15 }}
                animate={{ opacity: 0.6, x: 60, rotateY: -10 }}
                transition={{ duration: 1, delay: 0.9 }}
                className="absolute -right-16 top-8 w-[220px] h-[440px] phone-mockup z-0"
              >
                <img src={screenshotCompleted} alt="Completed view" className="w-full h-full object-cover" />
              </motion.div>

              {/* Center phone (main) */}
              <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.6, type: "spring", stiffness: 100 }}
                className="relative z-10 w-full h-full phone-mockup"
              >
                <img src={screenshotHome} alt="NightLibrary Home" className="w-full h-full object-cover" />
                {/* Glow behind phone */}
                <div className="absolute -inset-4 -z-10 rounded-[3rem] bg-primary/10 blur-[40px]" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
