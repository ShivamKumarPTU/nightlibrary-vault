import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Download, FolderLock, Play, Shield } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import { RevealLine, WordCascade } from "./TextReveal";

const steps = [
  { icon: Download, title: "Import or Download", description: "Add files from your device, camera, or download from the web.", color: "from-primary to-primary/60" },
  { icon: FolderLock, title: "Auto-Secure", description: "Everything is instantly encrypted and hidden from your gallery.", color: "from-accent to-accent/60" },
  { icon: Play, title: "Enjoy & Organize", description: "Play, sort, and manage your media with powerful built-in tools.", color: "from-glow-warm to-glow-warm/60" },
  { icon: Shield, title: "Stay Protected", description: "Biometric lock, auto-lock, and zero data sharing keep you safe.", color: "from-primary to-accent" },
];

const StepCard = ({ step, index, sectionInView }: { step: typeof steps[0]; index: number; sectionInView: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useSpring(useTransform(scrollYProgress, [0, 0.32, 0.78, 1], [84, 0, 0, -28]), { stiffness: 120, damping: 24 });
  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.82, 1], [0, 1, 1, 0.72]);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.28, 0.78, 1], [0.9, 1, 1, 0.96]), { stiffness: 130, damping: 20 });
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.28, 0.78, 1], [index % 2 === 0 ? 2.5 : -2.5, 0, 0, index % 2 === 0 ? -1.25 : 1.25]), { stiffness: 110, damping: 22 });
  const glowOpacity = useTransform(scrollYProgress, [0.08, 0.32, 0.72, 1], [0, 0.7, 0.45, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale, rotate: rotateZ }}
      whileHover={{ y: -14, scale: 1.045, rotate: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="relative group h-full will-change-transform"
    >
      <div className="bg-gradient-card rounded-2xl p-6 glow-border h-full relative overflow-hidden premium-glow transition-[box-shadow,transform,border-color] duration-500 ease-out group-hover:shadow-[var(--shadow-premium)] group-hover:border-primary/40">
        <motion.div
          style={{ opacity: glowOpacity }}
          className="pointer-events-none absolute -inset-12 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.32),transparent_58%)] blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        />
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "linear-gradient(120deg, transparent 20%, hsl(var(--foreground) / 0.08) 42%, transparent 62%)" }}
        />
        {/* Icon with gradient background */}
        <motion.div
          whileHover={{ rotate: [-6, 6, 0], scale: 1.12 }}
          transition={{ type: "spring", stiffness: 300, damping: 14 }}
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 relative z-10 shadow-[0_16px_36px_-18px_hsl(var(--primary)/0.7)]`}
        >
          <step.icon className="w-6 h-6 text-primary-foreground" />
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
            className={`absolute inset-0 rounded-xl bg-gradient-to-br ${step.color} blur-md`}
          />
        </motion.div>

        <h3 className="font-display text-lg font-semibold mb-2 relative z-10"><RevealLine delay={0.04}>{step.title}</RevealLine></h3>
        <p className="text-sm text-muted-foreground leading-relaxed relative z-10"><WordCascade text={step.description} delay={0.08} className="justify-start" /></p>

        {/* Hover glow */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/0 group-hover:via-primary/40 to-transparent transition-all duration-500" />
      </div>

      {/* Animated connector line */}
      {index < steps.length - 1 && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={sectionInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: index * 0.15 + 0.5, duration: 0.6 }}
          className="hidden lg:block absolute top-1/2 -right-3 w-6 h-[2px]"
          style={{
            background: "linear-gradient(90deg, hsl(var(--primary) / 0.3), hsl(var(--accent) / 0.3))",
            transformOrigin: "left",
          }}
        />
      )}
    </motion.div>
  );
};

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: false, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.3], [50, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section ref={sectionRef} id="how-it-works" className="relative py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          ref={titleRef}
          style={{ y: titleY, opacity: titleOpacity }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-glow-warm uppercase tracking-widest">How It Works</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-3 overflow-hidden">
            <RevealLine>Simple as</RevealLine> <RevealLine delay={0.1} className="text-gradient-warm">1-2-3-4</RevealLine>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <StepCard key={step.title} step={step} index={i} sectionInView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
