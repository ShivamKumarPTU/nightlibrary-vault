import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Moon, Download } from "lucide-react";
import { useState } from "react";

const navItems = ["Features", "Preview", "How it Works"];

const Navbar = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 50));

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass border-b border-border/50 py-0" : "py-1"
      }`}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Moon className="w-6 h-6 text-primary" />
          </motion.div>
          <motion.span
            className="font-display text-xl font-bold"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            NightLibrary
          </motion.span>
        </motion.div>

        <div className="hidden sm:flex items-center gap-8">
          {navItems.map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              whileHover={{ y: -2, color: "hsl(270 80% 70%)" }}
              className="relative text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              {item}
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-accent origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(270 80% 60% / 0.3)" }}
          whileTap={{ scale: 0.95 }}
          className="relative bg-gradient-cta px-5 py-2.5 rounded-xl font-display font-semibold text-sm text-primary-foreground flex items-center gap-2 overflow-hidden"
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
            }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
          />
          <Download className="w-4 h-4 relative z-10" />
          <span className="relative z-10">Download</span>
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
