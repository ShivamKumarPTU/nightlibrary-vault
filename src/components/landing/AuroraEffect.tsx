import { motion } from "framer-motion";

const AuroraEffect = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    {/* Aurora band 1 */}
    <motion.div
      animate={{
        x: ["-20%", "20%", "-10%", "-20%"],
        y: ["-10%", "5%", "-5%", "-10%"],
        rotate: [-5, 8, -3, -5],
        scaleX: [1, 1.3, 0.9, 1],
      }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[-20%] left-[-10%] w-[120%] h-[40%]"
      style={{
        background: "linear-gradient(90deg, transparent 0%, hsl(270 80% 60% / 0.04) 20%, hsl(190 90% 50% / 0.06) 50%, hsl(270 80% 60% / 0.04) 80%, transparent 100%)",
        filter: "blur(60px)",
        borderRadius: "50%",
      }}
    />
    {/* Aurora band 2 */}
    <motion.div
      animate={{
        x: ["10%", "-15%", "5%", "10%"],
        y: ["0%", "-8%", "5%", "0%"],
        rotate: [3, -6, 4, 3],
        scaleX: [1.1, 0.8, 1.2, 1.1],
      }}
      transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[50%] left-[-5%] w-[110%] h-[35%]"
      style={{
        background: "linear-gradient(90deg, transparent 0%, hsl(35 100% 55% / 0.03) 30%, hsl(270 80% 60% / 0.05) 60%, transparent 100%)",
        filter: "blur(80px)",
        borderRadius: "50%",
      }}
    />
    {/* Subtle horizontal scan line */}
    <motion.div
      animate={{ y: ["-100%", "200%"] }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute left-0 right-0 h-[1px]"
      style={{
        background: "linear-gradient(90deg, transparent, hsl(270 80% 60% / 0.08), transparent)",
      }}
    />
  </div>
);

export default AuroraEffect;
