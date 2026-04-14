import { motion } from "framer-motion";
import { Shield, Download, Zap, Lock, Eye, Star } from "lucide-react";

const items = [
  { icon: Shield, text: "256-bit Encryption" },
  { icon: Lock, text: "Biometric Lock" },
  { icon: Download, text: "Background Downloads" },
  { icon: Zap, text: "Lightning Fast" },
  { icon: Eye, text: "Zero Tracking" },
  { icon: Star, text: "4.8★ Rating" },
  { icon: Shield, text: "Private Vault" },
  { icon: Lock, text: "Auto-Lock" },
  { icon: Download, text: "Multi-Platform" },
  { icon: Zap, text: "Optimized Storage" },
  { icon: Eye, text: "Hidden Gallery" },
  { icon: Star, text: "100K+ Users" },
];

const MarqueeTicker = () => (
  <div className="relative py-8 overflow-hidden border-y border-border/30">
    {/* Fade edges */}
    <div className="absolute left-0 top-0 bottom-0 w-32 z-10" style={{ background: "linear-gradient(90deg, hsl(240 10% 3%), transparent)" }} />
    <div className="absolute right-0 top-0 bottom-0 w-32 z-10" style={{ background: "linear-gradient(270deg, hsl(240 10% 3%), transparent)" }} />

    {/* Row 1 */}
    <motion.div
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="flex gap-6 whitespace-nowrap mb-4"
    >
      {[...items, ...items].map((item, i) => (
        <motion.div
          key={`r1-${i}`}
          whileHover={{ scale: 1.08, y: -2 }}
          className="flex items-center gap-3 px-5 py-2.5 glass rounded-full flex-shrink-0 premium-glow cursor-default"
        >
          <item.icon className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">{item.text}</span>
        </motion.div>
      ))}
    </motion.div>

    {/* Row 2 (reverse direction) */}
    <motion.div
      animate={{ x: ["-50%", "0%"] }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="flex gap-6 whitespace-nowrap"
    >
      {[...items.slice(6), ...items.slice(0, 6), ...items.slice(6), ...items.slice(0, 6)].map((item, i) => (
        <motion.div
          key={`r2-${i}`}
          whileHover={{ scale: 1.08, y: -2 }}
          className="flex items-center gap-3 px-5 py-2.5 glass rounded-full flex-shrink-0 cursor-default"
        >
          <item.icon className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-muted-foreground">{item.text}</span>
        </motion.div>
      ))}
    </motion.div>
  </div>
);

export default MarqueeTicker;
