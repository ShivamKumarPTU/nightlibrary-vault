import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Download, ArrowRight } from "lucide-react";

const CTASection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-cta opacity-90" />
          <div className="absolute inset-0 grid-bg opacity-20" />

          {/* Floating orbs */}
          <motion.div
            animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-10 right-10 w-32 h-32 rounded-full bg-primary-foreground/10 blur-[40px]"
          />
          <motion.div
            animate={{ y: [20, -20, 20] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-primary-foreground/5 blur-[50px]"
          />

          <div className="relative z-10 py-16 sm:py-24 px-8 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6"
            >
              Ready to take control
              <br />
              of your media?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-10"
            >
              Join thousands who trust NightLibrary with their private media. Free to download, forever.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255,255,255,0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary-foreground text-background px-8 py-4 rounded-2xl font-display font-semibold text-lg flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Get NightLibrary
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-2xl font-display font-semibold text-lg flex items-center justify-center gap-2 hover:bg-primary-foreground/10 transition-colors"
              >
                Learn More
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
