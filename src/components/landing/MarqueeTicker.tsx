import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Download, Zap, Lock, Eye, Star } from "lucide-react";
import { useRef } from "react";
import { RevealLine } from "./TextReveal";

const items = [
  { icon: Shield, text: "Military Grade Encryption" },
  { icon: Lock, text: "Fingerprint Lock" },
  { icon: Download, text: "Downloads in Background" },
  { icon: Zap, text: "Lightning Fast" },
  { icon: Eye, text: "No Data Tracking" },
  { icon: Shield, text: "Private Vault" },
  { icon: Lock, text: "Auto-Lock" },
 
  { icon: Zap, text: "Smart Storage" },
  { icon: Eye, text: "Hidden Gallery" },

];

const MarqueeTicker = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax skew based on scroll speed
  const skewX = useTransform(scrollYProgress, [0, 0.5, 1], [-2, 0, 2]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="relative py-8 overflow-hidden"
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10" style={{ background: "linear-gradient(90deg, hsl(240 10% 3%), transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10" style={{ background: "linear-gradient(270deg, hsl(240 10% 3%), transparent)" }} />

      {/* Row 1 */}
      <motion.div
        style={{ skewX }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="flex gap-6 whitespace-nowrap mb-4"
      >
        {[...items, ...items].map((item, i) => (
          <motion.div
            key={`r1-${i}`}
            whileHover={{ scale: 1.1, y: -3, boxShadow: "0 0 20px hsl(270 80% 60% / 0.15)" }}
            className="flex items-center gap-3 px-5 py-2.5 glass rounded-full flex-shrink-0 premium-glow cursor-default transition-all duration-300"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <item.icon className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="text-sm font-medium text-muted-foreground"><RevealLine delay={(i % 6) * 0.025}>{item.text}</RevealLine></span>
          </motion.div>
        ))}
      </motion.div>

      {/* Row 2 (reverse direction) */}
      <motion.div
        style={{ skewX: useTransform(scrollYProgress, [0, 0.5, 1], [2, 0, -2]) }}
        animate={{ x: ["-50%", "0%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-6 whitespace-nowrap"
      >
        {[...items.slice(6), ...items.slice(0, 6), ...items.slice(6), ...items.slice(0, 6)].map((item, i) => (
          <motion.div
            key={`r2-${i}`}
            whileHover={{ scale: 1.1, y: -3, boxShadow: "0 0 20px hsl(190 90% 50% / 0.15)" }}
            className="flex items-center gap-3 px-5 py-2.5 glass rounded-full flex-shrink-0 cursor-default transition-all duration-300"
          >
            <motion.div
              whileHover={{ rotate: -360 }}
              transition={{ duration: 0.5 }}
            >
              <item.icon className="w-4 h-4 text-accent" />
            </motion.div>
            <span className="text-sm font-medium text-muted-foreground"><RevealLine delay={(i % 6) * 0.025}>{item.text}</RevealLine></span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default MarqueeTicker;
