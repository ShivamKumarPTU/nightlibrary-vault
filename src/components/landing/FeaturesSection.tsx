import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Lock, Camera, Globe, Film, LayoutGrid, Zap, Share2, Settings,
} from "lucide-react";

const features = [
  {
    icon: Lock,
    title: "Privacy & Security",
    description: "App lock, biometric auth, auto-lock, hidden gallery, secure vault storage, emergency lock.",
    color: "from-primary to-primary/60",
  },
  {
    icon: Camera,
    title: "Media Import & Capture",
    description: "Import from device, camera capture, bulk import, multi-format support with thumbnail previews.",
    color: "from-accent to-accent/60",
  },
  {
    icon: Globe,
    title: "Video Downloader",
    description: "Download from YouTube, Instagram, Twitter/X. Background downloading with FFmpeg auto-merge.",
    color: "from-glow-warm to-glow-warm/60",
  },
  {
    icon: Film,
    title: "Built-in Media Player",
    description: "Smooth playback, gesture controls, brightness/volume/seek, subtitle support.",
    color: "from-primary to-accent",
  },
  {
    icon: LayoutGrid,
    title: "Smart Organization",
    description: "Grid/list views, sort by date/size/name, folder organization, fast thumbnail caching.",
    color: "from-accent to-glow-warm",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Fast image loading, efficient caching, optimized storage, background workers.",
    color: "from-glow-warm to-primary",
  },
  {
    icon: Share2,
    title: "Secure Sharing",
    description: "Share files to WhatsApp, Gmail and more via FileProvider with temp cache handling.",
    color: "from-primary to-glow-warm",
  },
  {
    icon: Settings,
    title: "Full Control",
    description: "Toggle features, manage storage, clear cache, customize floating button & behavior.",
    color: "from-accent to-primary",
  },
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={{ y: -8, scale: 1.03 }}
      className="group relative bg-gradient-card rounded-2xl p-6 glow-border overflow-hidden cursor-default"
    >
      {/* Hover shine effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: "linear-gradient(105deg, transparent 40%, hsl(270 80% 60% / 0.06) 45%, hsl(270 80% 60% / 0.12) 50%, hsl(270 80% 60% / 0.06) 55%, transparent 60%)",
        }}
      />

      {/* Icon with pulse ring */}
      <div className="relative mb-4">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
          className={`absolute inset-0 w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} blur-md`}
        />
        <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
          <feature.icon className="w-6 h-6 text-primary-foreground" />
        </div>
      </div>

      <h3 className="font-display text-lg font-semibold mb-2 relative z-10">{feature.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed relative z-10">{feature.description}</p>

      {/* Bottom border glow on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/0 group-hover:via-primary/40 to-transparent transition-all duration-500" />
    </motion.div>
  );
};

const FeaturesSection = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });

  return (
    <section id="features" className="relative py-24 sm:py-32">
      {/* Section divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-16 bg-gradient-to-b from-transparent to-border" />

      <div className="container mx-auto px-6">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={titleInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-block text-sm font-semibold text-primary uppercase tracking-widest glass px-4 py-1.5 rounded-full"
          >
            Features
          </motion.span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-5 mb-4">
            Everything you need.
            <br />
            <span className="text-gradient-primary">Nothing you don't.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A complete media vault with powerful tools, all wrapped in a beautiful minimal interface.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
