import { motion } from "framer-motion";
import heroVideo from "@/assets/hero-bg-video.mp4";

type HeroVideoBackgroundProps = {
  backgroundImage?: string;
};

const HeroVideoBackground = ({ backgroundImage }: HeroVideoBackgroundProps) => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    {backgroundImage ? (
      <motion.div
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
    ) : (
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.35 }}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      </motion.div>
    )}

    {/* Gradient overlays for blending */}
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(to bottom, hsl(240 10% 3% / 0.2) 0%, transparent 40%, transparent 60%, hsl(240 10% 3% / 0.1) 100%)",
      }}
    />
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 70% 50% at 50% 40%, transparent 0%, hsl(240 10% 3% / 0.6) 100%)",
      }}
    />

    {/* Vignette */}
    <div
      className="absolute inset-0"
      style={{
        boxShadow: "inset 0 0 200px 60px hsl(240 10% 3% / 0.7)",
      }}
    />
  </div>
);

export default HeroVideoBackground;
