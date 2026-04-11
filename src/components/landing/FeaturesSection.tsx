import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Shield, Download, Play, FolderOpen, Zap, Share2, Lock, Camera,
  Globe, Film, LayoutGrid, Cpu, Smartphone, Settings,
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
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-gradient-card rounded-2xl p-6 glow-border overflow-hidden cursor-default"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 relative z-10`}>
        <feature.icon className="w-6 h-6 text-primary-foreground" />
      </div>

      <h3 className="font-display text-lg font-semibold mb-2 relative z-10">{feature.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed relative z-10">{feature.description}</p>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Features</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-3 mb-4">
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
