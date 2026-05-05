import { motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { MouseEvent, useRef } from "react";
import { Quote, Star } from "lucide-react";
import { RevealLine } from "./TextReveal";

const testimonials = [
  {
    text: "I tested the vault and it's exactly what I needed. The disguise mode is incredibly clever — no one suspects a thing.",
    name: "Arjun S.",
    role: "Beta Tester",
    rating: 5,
    avatar: "AS",
  },
  {
    text: "The video downloader works flawlessly. Background downloads with auto-merge — I haven't seen this in any free app.",
    name: "Neha P.",
    role: "Beta Tester",
    rating: 5,
    avatar: "NP",
  },
  {
    text: "Super clean UI. The built-in player with gesture controls feels premium. Hard to believe this is free.",
    name: "Rahul M.",
    role: "Beta Tester",
    rating: 5,
    avatar: "RM",
  },
  {
    text: "Shake-to-lock is genius. The biometric unlock is instant. This feels more secure than paid alternatives.",
    name: "Sneha K.",
    role: "Beta Tester",
    rating: 5,
    avatar: "SK",
  },
  {
    text: "I've tried many vault apps — this is the first one that actually feels well-made. Password manager is a great bonus.",
    name: "Vikram D.",
    role: "Beta Tester",
    rating: 5,
    avatar: "VD",
  },
  {
    text: "Local-only storage with AES-256? That's real privacy. No cloud means no leaks. Exactly what I was looking for.",
    name: "Priya R.",
    role: "Beta Tester",
    rating: 5,
    avatar: "PR",
  },
];

/* ================= TESTIMONIAL CARD ================= */

const TestimonialCard = ({ t, index }: { t: (typeof testimonials)[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-20px" });

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const springTiltX = useSpring(tiltX, { stiffness: 200, damping: 18 });
  const springTiltY = useSpring(tiltY, { stiffness: 200, damping: 18 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    tiltX.set(y * -10);
    tiltY.set(x * 10);
    glowX.set(((e.clientX - rect.left) / rect.width) * 100);
    glowY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springTiltX,
        rotateY: springTiltY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group relative bg-gradient-card rounded-2xl p-6 glow-border overflow-hidden will-change-transform flex-shrink-0 w-[320px] sm:w-[360px] cursor-default select-none"
    >
      {/* Dynamic spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
        style={{
          background: `radial-gradient(circle at ${glowX}% ${glowY}%, hsl(var(--primary) / 0.2), transparent 60%)`,
        }}
      />

      {/* Shimmer sweep */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(120deg, transparent 20%, hsl(var(--foreground) / 0.06) 42%, transparent 62%)",
        }}
      />

      {/* Floating quote */}
      <motion.div
        animate={{ y: [-2, 2, -2], rotate: [-3, 3, -3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transform: "translateZ(30px)" }}
      >
        <Quote className="w-8 h-8 text-primary/20 mb-4" />
      </motion.div>

      {/* Stars */}
      <div className="flex gap-1 mb-3" style={{ transform: "translateZ(20px)" }}>
        {Array.from({ length: t.rating }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0, rotate: -180 }}
            transition={{ delay: index * 0.1 + i * 0.06 + 0.2, type: "spring", stiffness: 200 }}
          >
            <Star className="w-4 h-4 fill-glow-warm text-glow-warm" />
          </motion.div>
        ))}
      </div>

      {/* Review text */}
      <p
        className="text-foreground/90 text-sm leading-relaxed mb-5 relative z-10"
        style={{ transform: "translateZ(25px)" }}
      >
        "{t.text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 relative z-10" style={{ transform: "translateZ(20px)" }}>
        <motion.div
          whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
          transition={{ type: "spring", stiffness: 300 }}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-primary-foreground shadow-[0_4px_16px_hsl(var(--primary)/0.3)]"
        >
          {t.avatar}
        </motion.div>
        <div>
          <p className="font-display font-semibold text-sm">{t.name}</p>
          <p className="text-xs text-muted-foreground">{t.role}</p>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/0 group-hover:via-primary/40 to-transparent transition-all duration-500" />

      {/* Corner glow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/5 blur-[40px] pointer-events-none"
      />
    </motion.div>
  );
};

/* ================= AUTO-SCROLLING MARQUEE ROW ================= */

const MarqueeRow = ({
  items,
  direction = "left",
  speed = 35,
}: {
  items: typeof testimonials;
  direction?: "left" | "right";
  speed?: number;
}) => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Duplicate items for seamless loop
  const duplicated = [...items, ...items];

  return (
    <div
      ref={marqueeRef}
      className="relative w-full overflow-hidden group/marquee"
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />

      <motion.div
        className="flex gap-6 py-4"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        style={{ width: "max-content" }}
        whileHover={{ animationPlayState: "paused" }}
      >
        {duplicated.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} t={t} index={i % items.length} />
        ))}
      </motion.div>
    </div>
  );
};

/* ================= SECTION ================= */

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: false, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleY = useSpring(useTransform(scrollYProgress, [0, 0.25], [60, 0]), { stiffness: 80, damping: 20 });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.18], [0, 1]);
  const titleScale = useSpring(useTransform(scrollYProgress, [0, 0.25], [0.92, 1]), { stiffness: 80, damping: 20 });

  // Background parallax
  const bgY1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Split testimonials into two rows


  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background layers */}
      <motion.div style={{ y: bgY1 }} className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [-20, 20, -20], y: [-10, 10, -10] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[150px]"
        />
      </motion.div>

      <motion.div style={{ y: bgY2 }} className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [15, -15, 15], y: [8, -8, 8] }}
          transition={{ duration: 16, repeat: Infinity }}
          className="absolute bottom-1/4 left-0 w-[350px] h-[350px] rounded-full bg-primary/5 blur-[130px]"
        />
      </motion.div>

      <div className="container mx-auto px-6">
        {/* Title */}
        <motion.div
          ref={titleRef}
          style={{ y: titleY, opacity: titleOpacity, scale: titleScale }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={titleInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-block text-sm font-semibold text-primary uppercase tracking-widest glass px-4 py-1.5 rounded-full premium-glow"
          >
            Testimonials
          </motion.span>

         <h2 className="font-display text-4xl sm:text-5xl font-bold mt-5 overflow-hidden">
  <RevealLine>Early testers</RevealLine>{" "}
  <RevealLine delay={0.1} className="text-gradient-warm">
    love it
  </RevealLine>
</h2>

<motion.p
  initial={{ opacity: 0, y: 20 }}
  animate={titleInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.7, delay: 0.3 }}
  className="text-muted-foreground mt-4 max-w-lg mx-auto text-base"
>
  Hear from our beta testers who got early access to NightVault.
</motion.p>
        </motion.div>
      </div>

      {/* Two-row auto-scrolling marquee — opposite directions */}
 <MarqueeRow items={testimonials} direction="left" speed={35} />

      {/* Bottom stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="container mx-auto px-6 mt-16"
      >
        <div className="flex flex-wrap justify-center gap-8 sm:gap-16">
         {[
  { value: "12+", label: "Core Features" },
  { value: "Military Grade", label: "AES-256 Encryption" },
  { value: "Zero", label: "Data Collected" },
  { value: "100%", label: "Free" },
].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1 }}
              whileHover={{ scale: 1.08, y: -4 }}
              className="text-center cursor-default"
            >
              <div className="font-display text-2xl sm:text-3xl font-bold text-gradient-primary">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;