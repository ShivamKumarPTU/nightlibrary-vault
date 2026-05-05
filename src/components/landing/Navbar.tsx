import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Moon, Download } from "lucide-react";
import { useState } from "react";

const navItems = ["Features", "How it Works","Get in Touch"];

import FlipLink from "./FlipLink";
import FlipButton from "./FlipButton";

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
            NightVault
          </motion.span>
        </motion.div>

        <div className="hidden sm:flex items-center gap-8">
          {navItems.map((item, i) => (
            <FlipLink
              key={item}
              onClick={() => {
                const sectionId = item.toLowerCase().replace(/\s/g, "-");
                document.getElementById(sectionId)?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              {item}
            </FlipLink>
          ))}
        </div>

        <FlipButton primary icon={Download} delay={0.6} className="scale-90">
          Launching Soon
        </FlipButton>
      </div>
    </motion.nav>
  );
};

export default Navbar;
