import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import { useRef, useState, MouseEvent } from "react";
import { X } from "lucide-react";
import { RevealLine } from "./TextReveal";

// Import custom feature images
import smartOrgImg from "@/assets/SmartOrganisation.png";
import speedImg from "@/assets/SpeedFeature.png";
import sharingImg from "@/assets/SharingImage.png";
import cameraImg from "@/assets/ImportFromCamera.png";
import playerImg from "@/assets/MediaPlayer.png";
import encryptImg from "@/assets/MilitaryGradeEncryption.png";
import privacyImg from "@/assets/privacy.png";
import downloadImg from "@/assets/DownloadMedia.png";
import noScreenshotsImg from "@/assets/no screenshots.png";
import notificationImg from "@/assets/notification.png";
import multipleSelectImg from "@/assets/mulitpleselect.png";
import shakeToCloseImg from "@/assets/shakeToClose.png";

/* ================= FEATURES DATA (12 IMAGES) ================= */

const features = [
  { id: 1, image: smartOrgImg,      title: "Smart Organisation" },
  { id: 2, image: privacyImg,       title: "Privacy First" },
  { id: 3, image: sharingImg,       title: "Secure Sharing" },
  { id: 4, image: encryptImg,       title: "Military Encryption" },
  { id: 5, image: playerImg,        title: "Media Player" },
  { id: 6, image: speedImg,         title: "Lightning Speed" },
  { id: 7, image: downloadImg,      title: "Background Downloads" },
  { id: 8, image: cameraImg,        title: "Direct Capture" },
  { id: 9, image: noScreenshotsImg, title: "No Screenshots" },
  { id: 10, image: notificationImg, title: "Discreet Notifications" },
  { id: 11, image: multipleSelectImg,title: "Batch Management" },
  { id: 12, image: shakeToCloseImg, title: "Shake to Close" },
];

const rows = [
  features.slice(0, 4),
  features.slice(4, 8),
  features.slice(8, 12),
];

/* ================= 3D FLIP CARD ================= */

const FeatureCard = ({
  feature,
  index,
  onSelect,
}: {
  feature: typeof features[0];
  index: number;
  onSelect: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Scroll-driven entrance — mirrors HowItWorksSection
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y         = useSpring(useTransform(scrollYProgress, [0, 0.32, 0.78, 1], [84, 0, 0, -28]),  { stiffness: 120, damping: 24 });
  const opacity   = useTransform(scrollYProgress, [0, 0.22, 0.82, 1], [0, 1, 1, 0.72]);
  const scale     = useSpring(useTransform(scrollYProgress, [0, 0.28, 0.78, 1], [0.9, 1, 1, 0.96]), { stiffness: 130, damping: 20 });
  const rotateZ   = useSpring(
    useTransform(scrollYProgress, [0, 0.28, 0.78, 1],
      [index % 2 === 0 ? 2.5 : -2.5, 0, 0, index % 2 === 0 ? -1.25 : 1.25]),
    { stiffness: 110, damping: 22 }
  );
  const glowOpacity = useTransform(scrollYProgress, [0.08, 0.32, 0.72, 1], [0, 0.7, 0.45, 0]);

  // 3D Magnetic tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltX  = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]),  { stiffness: 150, damping: 25 });
  const tiltY  = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]),  { stiffness: 150, damping: 25 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top)  / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -8, scale: 1.02, rotate: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      className="relative group cursor-pointer p-3 will-change-transform"
      style={{ y, opacity, scale, rotate: rotateZ, perspective: "1200px" } as any}
    >
      {/* Scroll glow */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="pointer-events-none absolute -inset-8 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.25),transparent_60%)] blur-2xl"
      />

      {/* 3D tilt wrapper */}
      <motion.div
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-2xl shadow-2xl transition-[border-color,background] duration-500 group-hover:border-primary/40 group-hover:bg-white/[0.04]"
      >
        {/* Image — full original aspect ratio */}
        <img
          src={feature.image}
          alt={feature.title}
          className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />

        {/* ── SLIDE-UP OVERLAY ── */}
        <div
          className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]"
          style={{
            background: "linear-gradient(to top, rgba(8,6,20,0.95) 0%, rgba(15,10,35,0.88) 60%, transparent 100%)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            padding: "2.5rem 1.5rem 1.5rem",
          }}
        >
          {/* Accent glow line */}
          <div className="h-[2px] w-12 rounded-full bg-gradient-to-r from-primary to-accent mb-3 mx-auto" />

          <h3 className="font-display text-base sm:text-lg font-bold text-white text-center leading-tight mb-2">
            {feature.title}
          </h3>

          <p className="text-white/50 text-xs text-center mb-4">
            Click to view in full detail
          </p>

          <div className="flex justify-center">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-medium backdrop-blur-sm hover:bg-white/20 transition-colors">
              View Feature →
            </span>
          </div>
        </div>

        {/* Edge glow on hover */}
        <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: "inset 0 0 40px hsl(var(--primary) / 0.12)" }}
        />
      </motion.div>
    </motion.div>
  );
};

/* ================= STATIC ROW (4 COLS) ================= */

const FeatureRow = ({
  items,
  rowIndex,
  onSelect,
}: {
  items: typeof features;
  rowIndex: number;
  onSelect: (item: typeof features[0]) => void;
}) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
    {items.map((item, i) => (
      <FeatureCard
        key={item.id}
        feature={item}
        index={rowIndex * 4 + i}
        onSelect={() => onSelect(item)}
      />
    ))}
  </div>
);

/* ================= MAIN SECTION ================= */

const FeaturesSection = () => {
  const [selectedFeature, setSelectedFeature] = useState<typeof features[0] | null>(null);

  return (
    <section id="features" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent/20 blur-[150px] rounded-full" />
      </div>

      {/* Heading */}
      <div className="container mx-auto px-6 relative z-10 mb-16">
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-glow-warm uppercase tracking-widest inline-block"
          >
            Capabilities
          </motion.span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-3">
            <RevealLine>Powerful Features</RevealLine>{" "}
            <RevealLine delay={0.1} className="text-gradient-warm">
              Built for You
            </RevealLine>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mt-4 max-w-lg mx-auto text-base"
          >
            Experience a new level of privacy with our cutting-edge feature set.
          </motion.p>
        </div>
      </div>

      {/* 4×3 Grid */}
      <div className="container mx-auto px-3">
        {rows.map((row, i) => (
          <FeatureRow key={i} items={row} rowIndex={i} onSelect={setSelectedFeature} />
        ))}
      </div>

      {/* Pop-out Modal */}
      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 md:p-12"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFeature(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-2xl"
            />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl bg-white/[0.03] rounded-[3rem] border border-white/10 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.6)] z-10 flex flex-col items-center justify-center p-6 sm:p-12"
            >
              {/* Close */}
              <button
                onClick={() => setSelectedFeature(null)}
                className="absolute top-6 right-6 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors z-20"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Image */}
              <img
                src={selectedFeature.image}
                alt={selectedFeature.title}
                className="max-w-full max-h-[70vh] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              />

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mt-8 text-center"
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {selectedFeature.title}
                </h3>
                <p className="text-muted-foreground text-base">
                  Detailed view of feature capabilities.
                </p>
              </motion.div>

              {/* Modal Glows */}
              <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute -top-1/4 -left-1/4 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full" />
                <div className="absolute -bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-accent/20 blur-[120px] rounded-full" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FeaturesSection;