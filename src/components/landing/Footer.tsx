import { motion } from "framer-motion";
import { Moon } from "lucide-react";

const footerLinks = [
  { label: "Features", href: "#features" },
  { label: "Preview", href: "#preview" },
  { label: "How it Works", href: "#how-it-works" },
];

const Footer = () => (
  <footer className="relative border-t border-border/50 py-16 overflow-hidden">
    {/* Background accent */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary/3 blur-[150px] pointer-events-none" />

    <div className="container mx-auto px-6">
      <div className="flex flex-col items-center gap-8">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Moon className="w-6 h-6 text-primary" />
          </motion.div>
          <span className="font-display text-xl font-bold">NightLibrary</span>
        </motion.div>

        {/* Links */}
        <div className="flex gap-8">
          {footerLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              whileHover={{ y: -2, color: "hsl(270 80% 60%)" }}
              className="text-sm text-muted-foreground transition-colors"
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full max-w-xs h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />

        <p className="text-sm text-muted-foreground">
          © 2026 NightLibrary. Your media, your rules.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
