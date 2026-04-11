import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Moon, Download } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 50));

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-border/50" : ""
      }`}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Moon className="w-6 h-6 text-primary" />
          <span className="font-display text-xl font-bold">NightLibrary</span>
        </div>

        <div className="hidden sm:flex items-center gap-8">
          {["Features", "Preview", "How it Works"].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s/g, "-")}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {item}
            </a>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-cta px-5 py-2.5 rounded-xl font-display font-semibold text-sm text-primary-foreground flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
