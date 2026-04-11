import { motion } from "framer-motion";

const GradientMesh = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    {/* Slow-moving gradient mesh blobs */}
    <motion.div
      animate={{
        scale: [1, 1.3, 1],
        x: [0, 60, -30, 0],
        y: [0, -40, 20, 0],
        rotate: [0, 45, -20, 0],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full"
      style={{
        background: "radial-gradient(circle, hsl(270 80% 50% / 0.06) 0%, transparent 70%)",
        filter: "blur(80px)",
      }}
    />
    <motion.div
      animate={{
        scale: [1.2, 1, 1.4, 1.2],
        x: [0, -50, 30, 0],
        y: [0, 60, -20, 0],
        rotate: [0, -30, 60, 0],
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[30%] -right-[15%] w-[50vw] h-[50vw] rounded-full"
      style={{
        background: "radial-gradient(circle, hsl(190 90% 50% / 0.04) 0%, transparent 70%)",
        filter: "blur(100px)",
      }}
    />
    <motion.div
      animate={{
        scale: [1, 1.5, 1.1, 1],
        x: [0, 40, -60, 0],
        y: [0, -30, 50, 0],
      }}
      transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -bottom-[10%] left-[20%] w-[45vw] h-[45vw] rounded-full"
      style={{
        background: "radial-gradient(circle, hsl(35 100% 55% / 0.03) 0%, transparent 70%)",
        filter: "blur(90px)",
      }}
    />
  </div>
);

export default GradientMesh;
