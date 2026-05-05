import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Download, ArrowRight } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import { RevealLine, WordCascade } from "./TextReveal";
import FlipButton from "./FlipButton";

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
           {/* Pre-launch badge */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
  transition={{ delay: 0.1 }}
  className="flex flex-col items-center gap-4 mb-10"
>
  {/* Launching soon pill */}
  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 backdrop-blur-sm">
    <span className="relative flex h-2.5 w-2.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
    </span>
    <span className="text-sm font-medium text-primary-foreground/90">
      Launching Soon — Be the First to Try
    </span>
  </div>

  {/* Real stats */}
  <div className="flex justify-center gap-12">
    {[
      { value: "12+", label: "Features" },
      { value: "AES-256", label: "Encryption" },
      { value: "100%", label: "Free Forever" },
    ].map((stat, i) => (
      <motion.div
        key={stat.label}
        whileHover={{ scale: 1.1 }}
        className="text-center"
      >
        <div className="font-display text-2xl sm:text-3xl font-bold text-primary-foreground">
          {stat.value}
        </div>
        <div className="text-sm text-primary-foreground/60">{stat.label}</div>
      </motion.div>
    ))}
  </div>
</motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6"
            >
              <RevealLine>Ready to take control</RevealLine>
              <br />
              <RevealLine delay={0.12}>of your media?</RevealLine>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4 }}
              className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-10"
            >
              <WordCascade text="A privacy-first vault for your media. No accounts, no cloud, no compromises. Free forever." />
          {/* <WordCascade text="A privacy-first vault for your media. No accounts, no cloud, no compromises. Free forever." /> */}  
          { /*<WordCascade text="Join thousands who trust NightLibrary with their private media. Free to download, forever." />*/}
              
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <FlipButton primary icon={Download}>
                Get NightVault
              </FlipButton>
              
              <FlipButton 
                icon={ArrowRight} 
                onClick={() => {
                  document.getElementById("features")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
              >
                Learn More
              </FlipButton>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
