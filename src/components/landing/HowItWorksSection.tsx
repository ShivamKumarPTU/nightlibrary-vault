import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Download, FolderLock, Play, Shield } from "lucide-react";

const steps = [
  { icon: Download, title: "Import or Download", description: "Add files from your device, camera, or download from the web.", number: "01" },
  { icon: FolderLock, title: "Auto-Secure", description: "Everything is instantly encrypted and hidden from your gallery.", number: "02" },
  { icon: Play, title: "Enjoy & Organize", description: "Play, sort, and manage your media with powerful built-in tools.", number: "03" },
  { icon: Shield, title: "Stay Protected", description: "Biometric lock, auto-lock, and zero data sharing keep you safe.", number: "04" },
];

const HowItWorksSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-glow-warm uppercase tracking-widest">How It Works</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-3">
            Simple as <span className="text-gradient-warm">1-2-3-4</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative group"
            >
              <div className="bg-gradient-card rounded-2xl p-6 glow-border h-full relative overflow-hidden">
                <motion.div
                  whileHover={{ rotate: -5, scale: 1.1 }}
                  className="text-6xl font-display font-bold text-foreground/[0.04] absolute top-2 right-4 select-none"
                >
                  {step.number}
                </motion.div>
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>

              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
