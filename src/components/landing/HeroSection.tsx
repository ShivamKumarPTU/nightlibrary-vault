import { motion, type MotionStyle, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { CSSProperties, MouseEvent, ReactNode, useRef, useState } from "react";
import { Download, Play, Sparkles } from "lucide-react";
import screenshotHome from "@/assets/screenshot-home.png";
import screenshotVault from "@/assets/screenshot-vault.png";
import screenshotCompleted from "@/assets/screenshot-completed.png";
import screenshotImport from "@/assets/screenshot-import.png";
import screenshotDownload from "@/assets/screenshot-download.png";
import screenshotReading from "@/assets/screenshot-reading.png";
import screenshotLibrary from "@/assets/screenshot-library.png";
import screenshotPasswords from "@/assets/screenshot-passwords.png";
import screenshotContacts from "@/assets/screenshot-contacts.png";
import HeroVideoBackground from "./HeroVideoBackground";
import AnimatedCounter from "./AnimatedCounter";

const screens = [
  { src: screenshotHome, label: "Home" },
  { src: screenshotVault, label: "Vault" },
  { src: screenshotCompleted, label: "Media" },
  { src: screenshotImport, label: "Import" },
  { src: screenshotDownload, label: "Download" },
  { src: screenshotReading, label: "Reading" },
  { src: screenshotLibrary, label: "Library" },
  { src: screenshotPasswords, label: "Passwords" },
  { src: screenshotContacts, label: "Contacts" },
];

const crispImageStyle = {
  imageRendering: "auto",
  transform: "translateZ(0)",
  backfaceVisibility: "hidden",
} as const;

const CharReveal = ({ children, delay = 0, className = "" }: { children: string; delay?: number; className?: string }) => (
  <span className={`inline-flex overflow-hidden ${className}`}>
    {children.split("").map((char, i) => (
      <motion.span
        key={`${char}-${i}`}
        initial={{ y: "120%", opacity: 0, rotateX: 90, scale: 0.78 }}
        animate={{ y: "0%", opacity: 1, rotateX: 0, scale: [0.78, 1.18, 1] }}
        transition={{
          duration: 0.72,
          delay: delay + i * 0.028,
          ease: [0.215, 0.61, 0.355, 1],
        }}
        className="inline-block"
        style={{ transformOrigin: "bottom", textShadow: "0 0 22px hsl(var(--primary) / 0.16)" }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </span>
);

const MagneticWord = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <motion.span
    whileHover={{ y: -10, scale: 1.035, textShadow: "0 14px 34px hsl(var(--primary) / 0.45)" }}
    transition={{ type: "spring", stiffness: 320, damping: 18 }}
    className={`inline-block cursor-default ${className}`}
  >
    {children}
  </motion.span>
);

const WordReveal = ({ children, delay = 0, className = "" }: { children: string; delay?: number; className?: string }) => (
  <span className={`inline-flex flex-wrap gap-x-[0.3em] overflow-hidden ${className}`}>
    {children.split(" ").map((word, i) => (
      <motion.span
        key={`${word}-${i}`}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.7, delay: delay + i * 0.08, ease: [0.33, 1, 0.68, 1] }}
        className="inline-block"
      >
        {word}
      </motion.span>
    ))}
  </span>
);

const GlowingButton = ({ children, primary = false, icon: Icon, delay = 0 }: any) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 14 });
  const springY = useSpring(y, { stiffness: 180, damping: 14 });
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleMouseMove = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.18);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.18);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const ripple = { id: Date.now(), x: event.clientX - rect.left, y: event.clientY - rect.top };
    setRipples((items) => [...items, ripple]);
    window.setTimeout(() => setRipples((items) => items.filter((item) => item.id !== ripple.id)), 650);
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 34, scale: 0.86 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 12, delay }}
      whileHover={{
        scale: 1.055,
        boxShadow: primary
          ? "0 0 52px hsl(var(--primary) / 0.46), 0 0 110px hsl(var(--accent) / 0.18)"
          : "0 0 32px hsl(var(--foreground) / 0.12)",
      }}
      whileTap={{ scale: 0.96 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      onClick={handleClick}
      style={{ x: springX, y: springY }}
      className={`group relative px-8 py-4 rounded-2xl font-display font-semibold text-lg flex items-center justify-center gap-2 overflow-hidden ${
        primary ? "bg-gradient-cta text-primary-foreground" : "glass"
      }`}
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{
          background: "linear-gradient(105deg, transparent 34%, hsl(var(--foreground) / 0.18) 48%, hsl(var(--foreground) / 0.28) 52%, transparent 66%)",
        }}
        animate={{ x: ["-140%", "160%"] }}
        transition={{ duration: 1.35, repeat: Infinity, repeatDelay: 0.6 }}
      />
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.45 }}
          animate={{ scale: 4.8, opacity: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="absolute h-12 w-12 rounded-full bg-foreground/30"
          style={{ left: ripple.x - 24, top: ripple.y - 24 }}
        />
      ))}
      <span className="relative z-10">
        <Icon className="h-5 w-5" />
      </span>
      <span className="relative z-10">{children}</span>
      {primary && <span className="relative z-10 ml-1">→</span>}
    </motion.button>
  );
};

const CylindricalAppCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(0);
  const step = 360 / screens.length;
  const halfStepSin = Math.sin((Math.PI / screens.length));
  const cardWidthMultiplier = Number((2 * halfStepSin * 0.98).toFixed(3));
  const { scrollYProgress } = useScroll({ target: carouselRef, offset: ["start end", "end start"] });
  const scrollRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -8]);
  const scrollY = useTransform(scrollYProgress, [0, 0.5, 1], [34, 0, -26]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.96]);

  return (
    <motion.div
      ref={carouselRef}
      style={{
        y: scrollY,
        scale: scrollScale,
        rotateX: scrollRotateX,
        perspective: "1250px",
        "--cylinder-radius": "clamp(248px, 29vw, 280px)",
        "--card-width": `calc(var(--cylinder-radius) * ${cardWidthMultiplier})`,
      } as MotionStyle & CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex min-h-[500px] w-full items-center justify-center sm:min-h-[600px]"
    >
      <motion.div className="absolute top-8 z-20 text-center" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.15, type: "spring", stiffness: 120 }}>
        <span className="glass premium-glow inline-flex rounded-full px-4 py-2 font-display text-sm text-muted-foreground">
          {screens[active].label} preview
        </span>
      </motion.div>

      <div
        className="hero-cylinder-spin relative w-[var(--card-width)] aspect-[456/1000]"
        style={{ transformStyle: "preserve-3d", animationPlayState: hovered ? "paused" : "running" }}
      >
        {screens.map((screen, index) => (
          <div
            key={screen.label}
            className="absolute inset-0 will-change-transform"
            style={{
              transform: `rotateY(${index * step}deg) translateZ(var(--cylinder-radius))`,
              backfaceVisibility: "hidden",
            }}
          >
            <motion.button
              type="button"
              onClick={() => setActive(index)}
              onHoverStart={() => setActive(index)}
              initial={{ opacity: 0, y: 36, scale: 0.86 }}
              animate={{ opacity: 1, y: 0, scale: active === index ? 1.025 : 0.98 }}
              transition={{ delay: 1.35 + index * 0.055, type: "spring", stiffness: 110, damping: 16 }}
              whileHover={{ y: -12, scale: 1.045 }}
              whileTap={{ scale: 0.97 }}
              className="group relative h-full w-full overflow-hidden rounded-[1.8rem] border border-border/75 bg-card shadow-phone outline-none transition-colors duration-300 hover:border-primary/70"
            >
              <img src={screen.src} alt={`${screen.label} app screenshot`} className="h-full w-full object-contain" style={crispImageStyle} />
              <motion.span
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{ background: "linear-gradient(110deg, transparent 34%, hsl(var(--foreground) / 0.14) 48%, transparent 62%)" }}
                animate={{ x: ["-120%", "150%"] }}
                transition={{ duration: 1.15, repeat: Infinity, repeatDelay: 0.7 }}
              />
              <span className="absolute inset-x-4 bottom-4 translate-y-4 rounded-full border border-border/60 bg-background/70 px-3 py-1.5 text-xs font-medium text-foreground opacity-0 backdrop-blur-xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {screen.label}
              </span>
              {active === index && <span className="pointer-events-none absolute inset-0 rounded-[1.8rem] border-2 border-primary shadow-[0_0_34px_hsl(var(--primary)/0.38)]" />}
            </motion.button>
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-6 z-20 flex justify-center gap-2 sm:bottom-5">
        {screens.map((screen, index) => (
          <button
            key={`dot-${screen.label}`}
            type="button"
            aria-label={`Show ${screen.label}`}
            onClick={() => setActive(index)}
            className={`h-1.5 rounded-full bg-primary shadow-[0_0_14px_hsl(var(--primary)/0.55)] transition-all duration-300 ${active === index ? "w-8 opacity-100" : "w-1.5 opacity-40 hover:opacity-80"}`}
          />
        ))}
      </div>
    </motion.div>
  );
};

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.62], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.62], [1, 0.92]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const headlineX = useTransform(scrollYProgress, [0, 0.55], [0, -72]);
  const subtitleY = useTransform(scrollYProgress, [0, 0.48], [0, -28]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.48], [1, 0.2]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <HeroVideoBackground />

      <motion.div
        animate={{ opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-[1]"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 30%, hsl(var(--primary) / 1) 0%, transparent 60%)" }}
      />

      <motion.div style={{ scale: bgScale }} className="absolute inset-0 grid-bg opacity-20">
        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0"
          style={{ backgroundImage: "linear-gradient(hsl(var(--primary) / 0.04) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />
      </motion.div>

      <motion.div style={{ y, opacity, scale }} className="relative z-10 container mx-auto px-6">
        <div className="grid items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
          <div className="text-center lg:text-left">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm mb-6 premium-glow">
                <motion.span animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
                  <Sparkles className="w-4 h-4 text-glow-warm" />
                </motion.span>
                <WordReveal delay={0.3}>Privacy-first media vault</WordReveal>
                <motion.span animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-2 h-2 rounded-full bg-accent" />
              </span>
            </motion.div>

            <motion.h1 style={{ x: headlineX }} className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
              <MagneticWord>
                <CharReveal delay={0.4}>Your Media.</CharReveal>
              </MagneticWord>
              <br />
              <MagneticWord className="text-gradient-primary">
                <CharReveal delay={0.8}>Your Rules.</CharReveal>
              </MagneticWord>
              <br />
              <MagneticWord className="text-gradient-warm">
                <CharReveal delay={1.2}>Your Vault.</CharReveal>
              </MagneticWord>
            </motion.h1>

            <motion.p
              style={{ y: subtitleY, opacity: subtitleOpacity }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              <WordReveal delay={1.7}>Securely store, download, and manage photos, videos & files — with powerful playback and total privacy.</WordReveal>
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <GlowingButton primary icon={Download} delay={2.0}>Download Now</GlowingButton>
              <GlowingButton icon={Play} delay={2.12}>Watch Demo</GlowingButton>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.3 }} className="flex gap-8 mt-10 justify-center lg:justify-start">
              {[
                { value: 100, suffix: "K+", label: "Downloads" },
                { value: 4.8, suffix: "★", label: "Rating", decimals: 1 },
                { value: 256, suffix: "-bit", label: "Encryption" },
              ].map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.3 + i * 0.15 }} whileHover={{ scale: 1.1, y: -4 }} className="text-center cursor-default">
                  <div className="font-display text-2xl font-bold text-gradient-primary">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={2.5} decimals={stat.decimals || 0} />
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div style={{ y: phoneY }} className="relative flex justify-center items-center">
            <div className="absolute inset-x-8 top-16 bottom-16 rounded-full bg-primary/10 blur-[80px]" />
            <CylindricalAppCarousel />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
