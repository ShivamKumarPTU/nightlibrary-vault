import { motion } from "framer-motion";

const LightStreaks = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    {/* Diagonal light streak 1 */}
    <motion.div
      animate={{
        x: ["-100%", "200%"],
        opacity: [0, 0.15, 0.15, 0],
      }}
      transition={{ duration: 8, repeat: Infinity, repeatDelay: 4, ease: "linear" }}
      className="absolute top-0 left-0 w-[2px] h-[200%] bg-gradient-to-b from-transparent via-primary to-transparent"
      style={{ transform: "rotate(25deg)", transformOrigin: "top left" }}
    />
    {/* Diagonal light streak 2 */}
    <motion.div
      animate={{
        x: ["-100%", "200%"],
        opacity: [0, 0.1, 0.1, 0],
      }}
      transition={{ duration: 10, repeat: Infinity, repeatDelay: 6, ease: "linear", delay: 3 }}
      className="absolute top-0 left-0 w-[1px] h-[200%] bg-gradient-to-b from-transparent via-accent to-transparent"
      style={{ transform: "rotate(35deg)", transformOrigin: "top left" }}
    />
    {/* Horizontal glow sweep */}
    <motion.div
      animate={{ x: ["-100vw", "100vw"] }}
      transition={{ duration: 12, repeat: Infinity, repeatDelay: 8, ease: "linear" }}
      className="absolute top-1/3 w-[400px] h-[1px]"
      style={{
        background: "linear-gradient(90deg, transparent, hsl(270 80% 60% / 0.2), transparent)",
      }}
    />
  </div>
);

export default LightStreaks;
