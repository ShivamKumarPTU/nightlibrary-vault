import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Download, ArrowRight } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [80, 0, 0, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.8, 1], [0.88, 1, 1, 0.95]);

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          style={{ y, opacity, scale }}
          className="relative rounded-3xl overflow-hidden will-change-transform"
        >
          {/* Animated gradient background */}
          <motion.div
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
            style={{
              background: "linear-gradient(270deg, hsl(270 80% 55%), hsl(190 90% 45%), hsl(270 80% 55%), hsl(35 100% 55%))",
              backgroundSize: "300% 100%",
            }}
          />
          <div className="absolute inset-0 grid-bg opacity-15" />

          {/* Floating orbs */}
          <motion.div
            animate={{ y: [-20, 20, -20], x: [-15, 15, -15], scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-10 right-10 w-40 h-40 rounded-full bg-primary-foreground/10 blur-[50px]"
          />
          <motion.div
            animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-primary-foreground/5 blur-[60px]"
          />

          {/* Sparkle particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [-10, 10, -10],
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              className="absolute w-1 h-1 rounded-full bg-primary-foreground/40"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
            />
          ))}

          <div className="relative z-10 py-16 sm:py-24 px-8 text-center">
            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.1 }}
              className="flex justify-center gap-12 mb-10"
            >
              {[
                { value: 100000, label: "Downloads", suffix: "+" },
                { value: 4.8, label: "App Rating", suffix: "★", decimals: 1 },
                { value: 50, label: "Countries", suffix: "+" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.1 }}
                  className="text-center"
                >
                  <div className="font-display text-3xl font-bold text-primary-foreground">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={2} decimals={stat.decimals || 0} />
                  </div>
                  <div className="text-sm text-primary-foreground/60">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6"
            >
              Ready to take control
              <br />
              of your media?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4 }}
              className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-10"
            >
              Join thousands who trust NightLibrary with their private media. Free to download, forever.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(255,255,255,0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="group relative bg-primary-foreground text-background px-8 py-4 rounded-2xl font-display font-semibold text-lg flex items-center justify-center gap-2 overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(105deg, transparent 40%, rgba(0,0,0,0.05) 45%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.05) 55%, transparent 60%)",
                  }}
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
                />
                <Download className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Get NightLibrary</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-2xl font-display font-semibold text-lg flex items-center justify-center gap-2 transition-colors"
              >
                Learn More
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
