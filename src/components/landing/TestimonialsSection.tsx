import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    text: "Finally an app that takes my privacy seriously. The vault feature is incredible — my media feels truly safe.",
    name: "Sarah K.",
    role: "Content Creator",
    rating: 5,
  },
  {
    text: "The video downloader is a game-changer. Background downloads + auto-merge? It just works perfectly every time.",
    name: "Marcus T.",
    role: "Digital Artist",
    rating: 5,
  },
  {
    text: "Clean UI, blazing fast, and the built-in player with gesture controls is better than most standalone players.",
    name: "Priya D.",
    role: "Photographer",
    rating: 5,
  },
];

const TestimonialCard = ({ t, index }: { t: typeof testimonials[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative bg-gradient-card rounded-2xl p-6 glow-border overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: "linear-gradient(105deg, transparent 40%, hsl(270 80% 60% / 0.05) 45%, hsl(270 80% 60% / 0.1) 50%, hsl(270 80% 60% / 0.05) 55%, transparent 60%)",
        }}
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      />

      <Quote className="w-8 h-8 text-primary/20 mb-4" />
      
      <div className="flex gap-1 mb-3">
        {Array.from({ length: t.rating }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.15 + i * 0.08 + 0.3 }}
            className="text-glow-warm text-sm"
          >
            ★
          </motion.span>
        ))}
      </div>

      <p className="text-foreground/90 text-sm leading-relaxed mb-4 relative z-10">"{t.text}"</p>
      <div className="relative z-10">
        <p className="font-display font-semibold text-sm">{t.name}</p>
        <p className="text-xs text-muted-foreground">{t.role}</p>
      </div>
    </motion.div>
  );
};

const TestimonialsSection = () => {
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
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Testimonials</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-3">
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
