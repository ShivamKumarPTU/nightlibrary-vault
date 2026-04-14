import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

import screenshotHome from "@/assets/screenshot-home.png";
import screenshotVault from "@/assets/screenshot-vault.png";
import screenshotCompleted from "@/assets/screenshot-completed.png";
import screenshotImport from "@/assets/screenshot-import.png";
import screenshotDownload from "@/assets/screenshot-download.png";
import screenshotReading from "@/assets/screenshot-reading.png";
import screenshotLibrary from "@/assets/screenshot-library.png";
import screenshotPasswords from "@/assets/screenshot-passwords.png";
import screenshotContacts from "@/assets/screenshot-contacts.png";

const screens = [
  { src: screenshotHome, label: "Home", description: "Your evening companion" },
  { src: screenshotVault, label: "Vault", description: "Secure private storage" },
  { src: screenshotCompleted, label: "Media", description: "All your files organized" },
  { src: screenshotImport, label: "Import", description: "Add files easily" },
  { src: screenshotDownload, label: "Download", description: "Fetch from the web" },
  { src: screenshotReading, label: "Reading", description: "Night reading mode" },
  { src: screenshotLibrary, label: "Library", description: "Your saved content" },
  { src: screenshotPasswords, label: "Passwords", description: "Manage credentials" },
  { src: screenshotContacts, label: "Contacts", description: "Private contacts" },
];

const ScreenshotsSection = () => {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate3d = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -8]);

  // Auto-cycle through screenshots
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % screens.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary blur-[200px] pointer-events-none"
      />

      <div className="container mx-auto px-6">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-accent uppercase tracking-widest">App Preview</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-3 mb-4">
            Beautifully crafted.
            <br />
            <span className="text-gradient-primary">Every screen.</span>
          </h2>
        </motion.div>

        {/* Main phone preview with 3D perspective */}
        <div className="flex flex-col items-center gap-10" style={{ perspective: "1500px" }}>
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.85, rotateY: -15, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, rotateY: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.85, rotateY: 15 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="relative"
          >
            <motion.div
              style={{ rotateX: rotate3d }}
              className="w-[260px] h-[520px] sm:w-[300px] sm:h-[600px] phone-mockup"
            >
              <img
                src={screens[active].src}
                alt={screens[active].label}
                className="w-full h-full object-cover"
              />
              {/* Screen glare */}
              <motion.div
                animate={{ opacity: [0, 0.3, 0], x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)",
                }}
              />
            </motion.div>
            <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-primary/8 blur-[60px]" />
          </motion.div>

          {/* Labels with animated underline */}
          <motion.div
            key={`label-${active}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h3 className="font-display text-2xl font-bold">{screens[active].label}</h3>
            <p className="text-muted-foreground">{screens[active].description}</p>
            {/* Progress dots */}
            <div className="flex gap-2 justify-center mt-4">
              {screens.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === active ? "w-8 bg-primary" : "w-1.5 bg-muted-foreground/30"
                  }`}
                  whileHover={{ scale: 1.5 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Thumbnail strip with glow on active */}
          <div className="flex gap-3 overflow-x-auto pb-4 max-w-full scrollbar-hide">
            {screens.map((screen, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActive(i)}
                className={`relative flex-shrink-0 w-16 h-28 sm:w-20 sm:h-36 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  i === active
                    ? "border-primary shadow-glow"
                    : "border-border/50 opacity-40 hover:opacity-80"
                }`}
              >
                <img src={screen.src} alt={screen.label} className="w-full h-full object-cover" />
                {i === active && (
                  <motion.div
                    layoutId="activeThumb"
                    className="absolute inset-0 border-2 border-primary rounded-xl"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Parallax floating text */}
      <motion.div style={{ x }} className="absolute bottom-8 whitespace-nowrap font-display text-[120px] font-bold text-foreground/[0.02] select-none pointer-events-none">
        NIGHTLIBRARY • SECURE • PRIVATE • POWERFUL • NIGHTLIBRARY • SECURE • PRIVATE •
      </motion.div>
    </section>
  );
};

export default ScreenshotsSection;
