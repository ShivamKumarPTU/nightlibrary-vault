import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Lock, Camera, Globe, Film, LayoutGrid, Zap, Share2, Settings } from "lucide-react";
import { RevealLine, WordCascade } from "./TextReveal";

const features = [
  { icon: Lock, title: "Privacy & Security", description: "App lock, biometric auth, auto-lock, hidden gallery, secure vault storage, emergency lock.", size: "lg:col-span-2 lg:row-span-2", tone: "primary" },
  { icon: Globe, title: "Video Downloader", description: "Download from YouTube, Instagram, Twitter/X. Background downloading with FFmpeg auto-merge.", size: "lg:col-span-2", tone: "accent" },
  { icon: Film, title: "Built-in Media Player", description: "Smooth playback, gesture controls, brightness, volume, seek, and subtitle support.", size: "", tone: "warm" },
  { icon: LayoutGrid, title: "Smart Organization", description: "Grid/list views, sorting, folders, and fast thumbnail caching.", size: "", tone: "primary" },
  { icon: Camera, title: "Media Import & Capture", description: "Import from device, camera capture, bulk import, multi-format support with thumbnail previews.", size: "lg:col-span-2", tone: "accent" },
  { icon: Zap, title: "Performance", description: "Fast image loading, efficient caching, optimized storage, and background workers.", size: "", tone: "warm" },
  { icon: Share2, title: "Secure Sharing", description: "Share to WhatsApp, Gmail and more via FileProvider with temporary cache handling.", size: "", tone: "primary" },
  { icon: Settings, title: "Full Control", description: "Toggle features, manage storage, clear cache, customize floating button behavior.", size: "lg:col-span-2", tone: "accent" },
];

const toneStyles = {
  primary: {
    icon: "bg-primary text-primary-foreground",
    wash: "radial-gradient(circle at 20% 18%, hsl(var(--primary) / 0.20), transparent 44%)",
    line: "from-primary via-accent to-primary",
  },
  accent: {
    icon: "bg-accent text-accent-foreground",
    wash: "radial-gradient(circle at 78% 22%, hsl(var(--accent) / 0.18), transparent 46%)",
    line: "from-accent via-primary to-accent",
  },
  warm: {
    icon: "bg-glow-warm text-primary-foreground",
    wash: "radial-gradient(circle at 50% 0%, hsl(var(--glow-warm) / 0.16), transparent 48%)",
    line: "from-glow-warm via-primary to-accent",
  },
};

const FeatureCard = ({ feature, index }: { feature: (typeof features)[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-40px" });
  const [hovered, setHovered] = useState(false);
  const styles = toneStyles[feature.tone as keyof typeof toneStyles];

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [64, 0, 0, -32]);
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 1, 1, 0.65]);
  const rotateX = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [8, 0, 0, -5]);

  return (
    <motion.article
      ref={ref}
      style={{ y, opacity, rotateX, perspective: 1200 }}
      initial={{ scale: 0.94 }}
      animate={isInView ? { scale: 1 } : { scale: 0.94 }}
      transition={{ duration: 0.5, delay: index * 0.035 }}
      whileHover={{ y: -10, scale: 1.018 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`group relative min-h-[220px] overflow-hidden rounded-2xl border border-border/70 bg-gradient-card p-6 shadow-card will-change-transform ${feature.size}`}
    >
      <motion.div className="absolute inset-0" animate={{ opacity: hovered ? 1 : 0.62 }} style={{ background: styles.wash }} />
      <motion.div
        className="absolute inset-x-6 top-0 h-px bg-gradient-to-r opacity-70"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, delay: 0.12 + index * 0.04 }}
      />
      <motion.div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${styles.line}`} initial={{ scaleX: 0 }} animate={hovered ? { scaleX: 1 } : { scaleX: 0 }} transition={{ duration: 0.35 }} style={{ transformOrigin: "left" }} />

      <div className="relative z-10 flex h-full flex-col justify-between gap-8">
        <div className="flex items-start justify-between gap-5">
          <motion.div animate={hovered ? { rotate: [0, -4, 4, 0], y: -3 } : { rotate: 0, y: 0 }} transition={{ duration: 0.45 }} className={`flex h-12 w-12 items-center justify-center rounded-xl ${styles.icon}`}>
            <feature.icon className="h-6 w-6" />
          </motion.div>
          <span className="font-display text-sm text-muted-foreground">0{index + 1}</span>
        </div>

        <div>
          <motion.h3 initial={{ opacity: 0, y: 14 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }} transition={{ duration: 0.5, delay: 0.08 }} className="font-display text-2xl font-semibold leading-tight">
            <RevealLine delay={0.04}>{feature.title}</RevealLine>
          </motion.h3>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }} transition={{ duration: 0.5, delay: 0.16 }} className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {feature.description}
          </motion.p>
        </div>
      </div>
    </motion.article>
  );
};

const SectionTitle = ({ badge, title1, title2, subtitle }: { badge: string; title1: string; title2: string; subtitle: string }) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: false, margin: "-60px" });
  const { scrollYProgress } = useScroll({ target: titleRef, offset: ["start end", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 0.3], [60, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <motion.div ref={titleRef} style={{ y: titleY, opacity: titleOpacity }} className="mb-14 max-w-3xl">
      <motion.span initial={{ opacity: 0, scale: 0.7 }} animate={titleInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }} transition={{ type: "spring", delay: 0.2 }} className="inline-block text-sm font-semibold text-primary uppercase tracking-widest glass px-4 py-1.5 rounded-full premium-glow">
        {badge}
      </motion.span>
      <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mt-5 mb-4 leading-tight">
        <motion.span initial={{ opacity: 0, y: 20 }} animate={titleInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3, duration: 0.6 }} className="inline-block">
          <RevealLine delay={0.05}>{title1}</RevealLine>
        </motion.span>
        <br />
        <motion.span initial={{ opacity: 0, y: 20 }} animate={titleInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5, duration: 0.6 }} className="inline-block text-gradient-primary">
          <RevealLine delay={0.12}>{title2}</RevealLine>
        </motion.span>
      </h2>
      <motion.p initial={{ opacity: 0, y: 12 }} animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }} transition={{ delay: 0.6 }} className="text-muted-foreground text-lg max-w-2xl">
        <WordCascade text={subtitle} delay={0.08} className="justify-start" />
      </motion.p>
    </motion.div>
  );
};

const FeaturesSection = () => (
  <section id="features" className="relative py-24 sm:py-32">
    <div className="absolute top-1/3 left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-primary/5 blur-[180px] pointer-events-none" />

    <div className="container mx-auto px-6">
      <SectionTitle
        badge="Features"
        title1="Everything you need."
        title2="Nothing you don't."
        subtitle="A cinematic control surface for private media, fast downloads, secure sharing, and tuned playback."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[220px] lg:grid-cols-4">
        {features.map((feature, i) => (
          <FeatureCard key={feature.title} feature={feature} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
