import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    text: "Finally an app that takes my privacy seriously. The vault feature is incredible — my media feels truly safe.",
    name: "Sarah K.",
    role: "Content Creator",
    rating: 5,
    avatar: "SK",
  },
  {
    text: "The video downloader is a game-changer. Background downloads + auto-merge? It just works perfectly every time.",
    name: "Marcus T.",
    role: "Digital Artist",
    rating: 5,
    avatar: "MT",
  },
  {
    text: "Clean UI, blazing fast, and the built-in player with gesture controls is better than most standalone players.",
    name: "Priya D.",
    role: "Photographer",
    rating: 5,
    avatar: "PD",
  },
];

const TestimonialCard = ({ t, index }: { t: typeof testimonials[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: 15, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, scale: 1.03, boxShadow: "0 20px 60px hsl(270 80% 60% / 0.1)" }}
      className="group relative bg-gradient-card rounded-2xl p-6 glow-border overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Floating quote */}
      <motion.div
        animate={{ y: [-2, 2, -2], rotate: [-3, 3, -3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Quote className="w-8 h-8 text-primary/20 mb-4" />
      </motion.div>

      <div className="flex gap-1 mb-3">
        {Array.from({ length: t.rating }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ delay: index * 0.15 + i * 0.08 + 0.3, type: "spring", stiffness: 200 }}
          >
            <Star className="w-4 h-4 fill-glow-warm text-glow-warm" />
          </motion.div>
        ))}
      </div>

      <p className="text-foreground/90 text-sm leading-relaxed mb-5 relative z-10">"{t.text}"</p>

      <div className="flex items-center gap-3 relative z-10">
        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-primary-foreground"
        >
          {t.avatar}
        </motion.div>
        <div>
          <p className="font-display font-semibold text-sm">{t.name}</p>
          <p className="text-xs text-muted-foreground">{t.role}</p>
        </div>
      </div>

      {/* Corner glow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/5 blur-[40px] pointer-events-none"
      />
    </motion.div>
  );
};

const TestimonialsSection = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 sm:py-32">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [-20, 20, -20], y: [-10, 10, -10] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-accent/3 blur-[150px]"
        />
      </div>

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
            className="inline-block text-sm font-semibold text-primary uppercase tracking-widest glass px-4 py-1.5 rounded-full premium-glow"
          >
            Testimonials
          </motion.span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-5">
            Loved by <span className="text-gradient-warm">thousands</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
