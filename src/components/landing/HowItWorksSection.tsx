import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Download, FolderLock, Play, Shield } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

const steps = [
  { icon: Download, title: "Import or Download", description: "Add files from your device, camera, or download from the web.", number: "01", color: "from-primary to-primary/60" },
  { icon: FolderLock, title: "Auto-Secure", description: "Everything is instantly encrypted and hidden from your gallery.", number: "02", color: "from-accent to-accent/60" },
  { icon: Play, title: "Enjoy & Organize", description: "Play, sort, and manage your media with powerful built-in tools.", number: "03", color: "from-glow-warm to-glow-warm/60" },
  { icon: Shield, title: "Stay Protected", description: "Biometric lock, auto-lock, and zero data sharing keep you safe.", number: "04", color: "from-primary to-accent" },
];

const StepCard = ({ step, index, sectionInView }: { step: typeof steps[0]; index: number; sectionInView: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [90, 0, 0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.75, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.82, 1, 1, 0.88]);
  const rotateZ = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [index % 2 === 0 ? 3 : -3, 0, 0, index % 2 === 0 ? -2 : 2]
  );

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale, rotate: rotateZ }}
      whileHover={{ y: -8, scale: 1.03 }}
      className="relative group will-change-transform"
    >
      <div className="bg-gradient-card rounded-2xl p-6 glow-border h-full relative overflow-hidden premium-glow">
        {/* Large background number */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0.1, 0.3], [0, 0.04]) }}
          className="text-7xl font-display font-bold absolute top-2 right-4 select-none text-foreground"
        >
          {step.number}
        </motion.div>

        {/* Icon with gradient background */}
        <motion.div
          whileHover={{ rotate: [-5, 5, 0], scale: 1.1 }}
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 relative`}
        >
          <step.icon className="w-6 h-6 text-primary-foreground" />
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
            className={`absolute inset-0 rounded-xl bg-gradient-to-br ${step.color} blur-md`}
          />
        </motion.div>

        <h3 className="font-display text-lg font-semibold mb-2 relative z-10">{step.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed relative z-10">{step.description}</p>

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
    <section ref={sectionRef} className="relative py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          ref={titleRef}
          style={{ y: titleY, opacity: titleOpacity }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-glow-warm uppercase tracking-widest">How It Works</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-3">
            Simple as <span className="text-gradient-warm">1-2-3-4</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} sectionInView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
