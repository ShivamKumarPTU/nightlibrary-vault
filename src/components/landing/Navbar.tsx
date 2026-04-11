import { motion, useScroll, useTransform } from "framer-motion";
import { Moon, Download } from "lucide-react";

const Navbar = () => {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.8]);
  const blur = useTransform(scrollY, [0, 100], [0, 20]);

  return (
    <motion.nav
      style={{
        backgroundColor: `hsl(240 10% 3% / ${bgOpacity.get()})`,
        backdropFilter: `blur(${blur.get()}px)`,
      }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-transparent"
    >
      <motion.div
        style={{ borderColor: useTransform(scrollY, [0, 100], ["transparent", "hsl(240 6% 18% / 0.5)"]) }}
        className="border-b"
      >
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Moon className="w-6 h-6 text-primary" />
            <span className="font-display text-xl font-bold">NightLibrary</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden sm:flex items-center gap-8"
          >
            {["Features", "Preview", "How it Works"].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/\s/g, "-")}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {item}
              </a>
            ))}
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-cta px-5 py-2.5 rounded-xl font-display font-semibold text-sm text-primary-foreground flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download
          </motion.button>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
