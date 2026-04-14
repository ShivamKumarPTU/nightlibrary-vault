import { motion } from "framer-motion";

const shapes = [
  { size: 6, x: "10%", y: "20%", delay: 0, duration: 12 },
  { size: 4, x: "85%", y: "15%", delay: 2, duration: 15 },
  { size: 8, x: "70%", y: "60%", delay: 4, duration: 18 },
  { size: 3, x: "20%", y: "75%", delay: 1, duration: 14 },
  { size: 5, x: "50%", y: "40%", delay: 3, duration: 16 },
  { size: 4, x: "90%", y: "80%", delay: 5, duration: 20 },
];

const FloatingElements = () => (
  <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
    {shapes.map((s, i) => (
      <motion.div
        key={i}
        animate={{
          y: [-20, 20, -20],
          x: [-10, 10, -10],
          rotate: [0, 180, 360],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: s.duration,
          repeat: Infinity,
          delay: s.delay,
          ease: "easeInOut",
        }}
        className="absolute rounded-full border border-primary/10"
        style={{
          width: s.size,
          height: s.size,
          left: s.x,
          top: s.y,
        }}
      />
    ))}

    {/* Larger glowing orbs */}
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.06, 0.03] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[30%] left-[15%] w-[300px] h-[300px] rounded-full bg-primary"
      style={{ filter: "blur(120px)" }}
    />
    <motion.div
      animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.02, 0.05, 0.02] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      className="absolute bottom-[20%] right-[10%] w-[250px] h-[250px] rounded-full bg-accent"
      style={{ filter: "blur(120px)" }}
    />
  </div>
);

export default FloatingElements;
