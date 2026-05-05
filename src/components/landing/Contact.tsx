import { motion, useInView, useMotionValue, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { FormEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { Send, MessageCircle, Mail, Shield, Bug, HelpCircle, Star, CheckCircle, Loader2, ChevronDown, X } from "lucide-react";
import emailjs from "@emailjs/browser";
import { RevealLine } from "./TextReveal";
import React from "react";
import { createPortal } from "react-dom";
/* ================= CONFIG ================= */

const EMAILJS_SERVICE_ID = "service_i597mpn";
const EMAILJS_TEMPLATE_ID = "template_aevjqco";
const EMAILJS_PUBLIC_KEY = "_gRJcujBsQGyuWnej";

/* ================= DATA ================= */

const topicOptions = [
  "Bug Report",
  "Feature Request",
  "Account / Login Issue",
  "Privacy Concern",
  "General Feedback",
  "Other",
];

/* ================= MODAL CONTENT DATA ================= */

const faqItems = [
  {
    question: "What is NightVault?",
    answer:
      "NightVault is a secure digital vault designed to store and manage your sensitive data locally on your device with robust encryption — keeping your information private and fully under your control.",
  },
  {
    question: "Is my data encrypted?",
    answer:
      "Yes. All your data is encrypted using AES-256 encryption and stored locally on your device. No one — not even us — can access your stored information.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. NightVault works entirely without account creation. Just download the app and start using it instantly — no sign-ups, no emails, no hassle.",
  },
  {
    question: "Is NightVault free to use?",
    answer:
      "Yes, NightVault is completely free. There are no premium tiers, no hidden charges, and no subscriptions. Every feature is available to all users at no cost.",
  },
  {
    question: "Can I use NightVault on multiple devices?",
    answer:
      "Multi-device support is not available yet, but it's actively being developed and will be included in an upcoming update. Stay tuned!",
  },
  {
    question: "Will there be account creation and password reset in the future?",
    answer:
      "Yes! Account creation and password reset functionality are planned features that will arrive in the next major update, enabling cloud sync and enhanced security options.",
  },
  {
    question: "Where is my data stored?",
    answer:
      "All your data is stored locally on your device. Nothing is uploaded to external servers, giving you complete ownership and privacy over your information.",
  },
  {
    question: "What happens if I uninstall the app?",
    answer:
      "Since all data is stored locally and there's no cloud backup yet, uninstalling the app will permanently delete your stored data. We recommend exporting important data before uninstalling.",
  },
];

const privacyContent = [
  {
    title: "Data Collection",
    description: "We collect only the minimum data necessary to provide our services — your email, name, and encrypted vault contents. We never sell your personal information to third parties.",
  },
  {
    title: "Encryption",
    description: "All vault data is encrypted end-to-end using AES-256. Your encryption keys are derived from your master password, which we never store or transmit.",
  },
  {
    title: "Third-Party Services",
    description: "We use limited third-party services (analytics, crash reporting) that receive anonymized, non-identifiable data only.",
  },
  {
    title: "Data Retention",
    description: "Your data is retained only as long as your account is active. Upon deletion, all data is permanently removed from our servers within 30 days.",
  },
  {
    title: "Your Rights",
    description: "You have the right to access, export, correct, or delete your data at any time from your account settings.",
  },
];

/* ================= QUICK LINKS (updated) ================= */

const quickLinks = [
  { icon: HelpCircle, label: "FAQ", description: "Common questions answered", modalKey: "faq" as const },
  { icon: Shield, label: "Privacy Policy", description: "How we protect your data", modalKey: "privacy" as const },
  { icon: Star, label: "Rate Us", description: "Love NightVault? Leave a review", modalKey: "rate" as const },
];

type ModalType = "faq" | "privacy" | "rate" | null;

/* ================= FAQ ACCORDION ITEM ================= */

const FaqItem = ({ item, index }: { item: (typeof faqItems)[0]; index: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="border border-border/50 rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-card/80 transition-colors"
      >
        <span className="text-sm font-semibold text-foreground">{item.question}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-4 text-sm text-muted-foreground">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ================= STAR RATING ================= */

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleSubmitRating = () => {
    if (rating === 0) return;
    // You can integrate an API call here to save the rating
    console.log("Rating submitted:", { rating, feedback });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4 py-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
        >
          <CheckCircle className="w-16 h-16 text-green-400" />
        </motion.div>
        <h3 className="text-xl font-semibold text-foreground">Thank you!</h3>
        <p className="text-sm text-muted-foreground text-center">
          Your {rating}-star rating has been recorded. We appreciate your feedback!
        </p>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <p className="text-sm text-muted-foreground text-center">
        How would you rate your experience with NightVault?
      </p>

      {/* Stars */}
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(0)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="p-1"
          >
            <Star
              className={`w-10 h-10 transition-colors duration-200 ${
                star <= (hoveredStar || rating)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-muted-foreground/30"
              }`}
            />
          </motion.button>
        ))}
      </div>

      {rating > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm font-medium text-foreground"
        >
          {rating === 1 && "😞 We'll do better"}
          {rating === 2 && "😐 Thanks for the honesty"}
          {rating === 3 && "🙂 Good to know"}
          {rating === 4 && "😊 Glad you like it!"}
          {rating === 5 && "🤩 You're awesome!"}
        </motion.p>
      )}

      {/* Optional feedback */}
      <textarea
        placeholder="Any additional feedback? (optional)"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        rows={3}
        className="w-full bg-card/50 border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none resize-none focus:border-primary/40 transition-colors"
      />

      <motion.button
        type="button"
        onClick={handleSubmitRating}
        disabled={rating === 0}
        whileHover={{ scale: rating > 0 ? 1.03 : 1 }}
        whileTap={{ scale: rating > 0 ? 0.97 : 1 }}
        className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
          rating > 0
            ? "bg-gradient-cta text-primary-foreground cursor-pointer"
            : "bg-muted/20 text-muted-foreground cursor-not-allowed"
        }`}
      >
        Submit Rating
      </motion.button>
    </div>
  );
};

/* ================= MODAL ================= */
/* ================= MODAL (Portal-based) ================= */
/* ================= MODAL (Portal + Flexbox centering) ================= */

const QuickLinkModal = ({
  activeModal,
  onClose,
}: {
  activeModal: ModalType;
  onClose: () => void;
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeModal]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (activeModal) {
      window.addEventListener("keydown", handleKey);
    }
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeModal, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {activeModal && (
        /* 
          ✅ Fixed full-screen flex wrapper — THIS is the centering mechanism.
          No transform needed, so Framer Motion can't break it.
        */
        <div
          key="modal-wrapper"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          />

          {/* Modal — centered by parent flexbox, not by transform */}
          <motion.div
            key="modal-content"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "32rem",
              maxHeight: "85vh",
              display: "flex",
              flexDirection: "column",
              borderRadius: "1rem",
              overflow: "hidden",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            }}
            className="bg-card border border-border/60"
          >
            {/* Header */}
            <div
              style={{ flexShrink: 0 }}
              className="flex items-center justify-between p-5 border-b border-border/40"
            >
              <h3 className="font-display text-lg font-bold text-foreground">
                {activeModal === "faq" && "Frequently Asked Questions"}
                {activeModal === "privacy" && "Privacy Policy"}
                {activeModal === "rate" && "Rate NightVault"}
              </h3>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted/20 transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </motion.button>
            </div>

            {/* Scrollable body */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                overscrollBehavior: "contain",
                padding: "1.25rem",
              }}
              className="space-y-4"
            >
              {activeModal === "faq" &&
                faqItems.map((item, i) => (
                  <FaqItem key={i} item={item} index={i} />
                ))}

              {activeModal === "privacy" && (
                <>
                  <p className="text-xs text-muted-foreground mb-2">
                    Last updated: January 2025
                  </p>
                  {privacyContent.map((section, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="space-y-1.5"
                    >
                      <h4 className="text-sm font-semibold text-foreground">
                        {section.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {section.description}
                      </p>
                      {i < privacyContent.length - 1 && (
                        <div className="border-b border-border/30 pt-2" />
                      )}
                    </motion.div>
                  ))}
                </>
              )}

              {activeModal === "rate" && <StarRating />}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

/* ================= ANIMATED INPUT ================= */

const AnimatedInput = ({
  label,
  type = "text",
  placeholder,
  name,
  required = false,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  placeholder: string;
  name: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <label className="block text-sm font-semibold text-foreground mb-2">{label}</label>
      <motion.div
        animate={{
          borderColor: focused ? "hsl(var(--primary))" : "hsl(var(--border))",
          boxShadow: focused ? "0 0 20px hsl(var(--primary) / 0.15)" : "0 0 0px transparent",
        }}
        transition={{ duration: 0.3 }}
        className="relative rounded-xl border bg-card/50 backdrop-blur-sm overflow-hidden"
      >
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none"
        />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-accent to-primary origin-center"
        />
      </motion.div>
    </motion.div>
  );
};

/* ================= ANIMATED SELECT ================= */

const AnimatedSelect = ({
  label,
  name,
  options,
  value,
  onChange,
}: {
  label: string;
  name: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <label className="block text-sm font-semibold text-foreground mb-2">{label}</label>
      <motion.div
        animate={{
          borderColor: focused ? "hsl(var(--primary))" : "hsl(var(--border))",
          boxShadow: focused ? "0 0 20px hsl(var(--primary) / 0.15)" : "0 0 0px transparent",
        }}
        transition={{ duration: 0.3 }}
        className="relative rounded-xl border bg-card/50 backdrop-blur-sm overflow-hidden"
      >
        <select
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent px-4 py-3.5 text-sm text-foreground outline-none appearance-none cursor-pointer"
        >
          <option value="" className="bg-card text-foreground">
            Select a topic
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-card text-foreground">
              {opt}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
          <ChevronDown className="w-4 h-4" />
        </div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-accent to-primary origin-center"
        />
      </motion.div>
    </motion.div>
  );
};

/* ================= ANIMATED TEXTAREA ================= */

const AnimatedTextarea = ({
  label,
  placeholder,
  name,
  required = false,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  name: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <label className="block text-sm font-semibold text-foreground mb-2">{label}</label>
      <motion.div
        animate={{
          borderColor: focused ? "hsl(var(--primary))" : "hsl(var(--border))",
          boxShadow: focused ? "0 0 20px hsl(var(--primary) / 0.15)" : "0 0 0px transparent",
        }}
        transition={{ duration: 0.3 }}
        className="relative rounded-xl border bg-card/50 backdrop-blur-sm overflow-hidden"
      >
        <textarea
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={4}
          className="w-full bg-transparent px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none resize-none"
        />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-accent to-primary origin-center"
        />
      </motion.div>
    </motion.div>
  );
};

/* ================= QUICK LINK CARD (updated — button instead of <a>) ================= */

const QuickLinkCard = ({
  item,
  index,
  onClick,
}: {
  item: (typeof quickLinks)[0];
  index: number;
  onClick: () => void;
}) => {
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 200, damping: 18 });
  const springTiltY = useSpring(tiltY, { stiffness: 200, damping: 18 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    tiltX.set(((e.clientY - rect.top) / rect.height - 0.5) * -8);
    tiltY.set(((e.clientX - rect.left) / rect.width - 0.5) * 8);
  };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 100, damping: 18 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        tiltX.set(0);
        tiltY.set(0);
      }}
      style={{
        rotateX: springTiltX,
        rotateY: springTiltY,
        transformPerspective: 800,
      }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/40 backdrop-blur-sm transition-colors duration-300 cursor-pointer"
    >
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-colors duration-300">
        <item.icon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">{item.label}</p>
        <p className="text-xs text-muted-foreground">{item.description}</p>
      </div>
    </motion.div>
  );
};

/* ================= CONTACT SECTION ================= */

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const titleInView = useInView(titleRef, { once: false, margin: "-60px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleY = useSpring(useTransform(scrollYProgress, [0, 0.25], [60, 0]), { stiffness: 80, damping: 20 });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.18], [0, 1]);
  const titleScale = useSpring(useTransform(scrollYProgress, [0, 0.25], [0.92, 1]), { stiffness: 80, damping: 20 });
  const bgY1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          topic: formData.topic,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      setSuccess(true);
      setFormData({ name: "", email: "", topic: "", message: "" });

      setTimeout(() => setSuccess(false), 5000);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  const update = (field: string) => (value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  return (
    <>
      {/* Modal rendered at top level so it overlays everything */}
      <QuickLinkModal activeModal={activeModal} onClose={() => setActiveModal(null)} />

      <section ref={sectionRef} id="get-in-touch" className="relative py-24 sm:py-32 overflow-hidden">
        {/* Background parallax layers */}
        <motion.div style={{ y: bgY1 }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[100px]" />
        </motion.div>
        <motion.div style={{ y: bgY2 }} className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/5 blur-[120px]" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10">
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
              Contact
            </motion.span>

            <h2 className="font-display text-4xl sm:text-5xl font-bold mt-5 overflow-hidden">
              <RevealLine>Get in</RevealLine>{" "}
              <RevealLine delay={0.1} className="text-gradient-warm">
                Touch
              </RevealLine>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-muted-foreground mt-4 max-w-lg mx-auto text-base"
            >
              Have a question, found a bug, or want a new feature? We'd love to hear from you.
            </motion.p>
          </motion.div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 max-w-5xl mx-auto">
            {/* LEFT — Form */}
            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
              className="space-y-5 bg-gradient-card rounded-2xl p-6 sm:p-8 glow-border relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  background:
                    "radial-gradient(circle at 20% 20%, hsl(var(--primary) / 0.06), transparent 50%)",
                }}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 relative z-10">
                <AnimatedInput
                  label="Your Name"
                  placeholder="e.g. Rahul Sharma"
                  name="name"
                  required
                  value={formData.name}
                  onChange={update("name")}
                />
                <AnimatedInput
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  name="email"
                  required
                  value={formData.email}
                  onChange={update("email")}
                />
              </div>

              <div className="relative z-10">
                <AnimatedSelect
                  label="Topic"
                  name="topic"
                  options={topicOptions}
                  value={formData.topic}
                  onChange={update("topic")}
                />
              </div>

              <div className="relative z-10">
                <AnimatedTextarea
                  label="Message"
                  placeholder="Tell us what's on your mind — describe the issue, idea, or feedback..."
                  name="message"
                  required
                  value={formData.message}
                  onChange={update("message")}
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-400 text-sm relative z-10"
                >
                  <Bug className="w-4 h-4" />
                  {error}
                </motion.div>
              )}

              <div className="relative z-10">
                <SubmitButton loading={loading} success={success} />
              </div>
            </motion.form>

            {/* RIGHT — Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.15 }}
              className="space-y-6"
            >
              {/* Direct Contact Card */}
              <div className="bg-gradient-card rounded-2xl p-6 glow-border relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    background:
                      "radial-gradient(circle at 80% 30%, hsl(var(--accent) / 0.1), transparent 50%)",
                  }}
                />

                <h3 className="font-display text-lg font-semibold mb-2 relative z-10">Prefer direct contact?</h3>
                <p className="text-sm text-muted-foreground mb-5 relative z-10">
                  Reach us through your preferred channel.
                </p>

                <motion.a
                  href="mailto:support.nightvault@gmail.com"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 0 30px hsl(var(--primary) / 0.3)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl bg-gradient-cta text-primary-foreground font-semibold text-sm relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(105deg, transparent 34%, hsl(var(--foreground) / 0.12) 48%, transparent 66%)",
                    }}
                    animate={{ x: ["-140%", "160%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                  />
                  <Mail className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">support.nightvault@gmail.com</span>
                </motion.a>

                <motion.a
                  href="https://t.me/nightvaultConnect"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-3 w-full py-3.5 mt-3 rounded-xl border border-border/60 hover:border-primary/40 text-foreground font-semibold text-sm transition-colors duration-300"
                >
                  <MessageCircle className="w-4 h-4" />
                  Join Telegram Community
                </motion.a>
              </div>

              {/* Quick Links — now with onClick */}
              <div className="space-y-3">
                <h3 className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-wider px-1">
                  Quick Links
                </h3>
                {quickLinks.map((item, i) => (
                  <QuickLinkCard
                    key={item.label}
                    item={item}
                    index={i}
                    onClick={() => setActiveModal(item.modalKey)}
                  />
                ))}
              </div>

              {/* Response time note */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10"
              >
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  We typically respond within <span className="text-foreground font-medium">24 hours</span>. For urgent issues, email us directly.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

/* ================= SUBMIT BUTTON ================= */

const SubmitButton = ({ loading, success }: { loading: boolean; success: boolean }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 14 });
  const springY = useSpring(y, { stiffness: 180, damping: 14 });

  const handleMouseMove = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.15);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.15);
  };

  return (
    <motion.button
      type="submit"
      disabled={loading || success}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: springX, y: springY }}
      whileHover={{
        scale: 1.04,
        boxShadow: "0 0 40px hsl(var(--primary) / 0.4), 0 0 80px hsl(var(--accent) / 0.15)",
      }}
      whileTap={{ scale: 0.96 }}
      className={`relative w-full py-4 rounded-2xl font-display font-semibold text-lg flex items-center justify-center gap-3 overflow-hidden transition-colors duration-300 group ${
        success
          ? "bg-green-500/20 border border-green-500/40 text-green-400"
          : "bg-gradient-cta text-primary-foreground"
      }`}
    >
      {!success && !loading && (
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, transparent 34%, hsl(var(--foreground) / 0.15) 48%, hsl(var(--foreground) / 0.25) 52%, transparent 66%)",
          }}
          animate={{ x: ["-140%", "160%"] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
        />
      )}

      <span className="relative z-10 flex items-center gap-2">
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : success ? (
          <>
            <CheckCircle className="w-5 h-5" />
            Message Sent!
          </>
        ) : (
          <span className="flex items-center gap-2">
            <Send className="w-5 h-5" />
            <span className="relative h-[1.5em] overflow-hidden">
              <span className="flex flex-col transition-transform duration-500 ease-[0.33,1,0.68,1] group-hover:-translate-y-1/2">
                <span className="flex h-[1.5em] items-center">
                  Send Message →
                </span>
                <span className="flex h-[1.5em] items-center text-white">
                  Send Message →
                </span>
              </span>
            </span>
          </span>
        )}
      </span>
    </motion.button>
  );
};

export default ContactSection;