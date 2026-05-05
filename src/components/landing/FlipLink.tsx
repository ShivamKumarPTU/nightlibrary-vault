import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FlipLinkProps {
  children: string;
  onClick?: () => void;
  className?: string;
}

const FlipLink = ({ children, onClick, className = "" }: FlipLinkProps) => {
  return (
    <motion.button
      onClick={onClick}
      initial="initial"
      whileHover="hover"
      className={`relative block overflow-hidden whitespace-nowrap text-xs sm:text-sm font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground bg-transparent border-none cursor-pointer ${className}`}
    >
      <div className="relative h-[1.2em] overflow-hidden">
        <motion.div
          variants={{
            initial: { y: 0 },
            hover: { y: "-50%" },
          }}
          transition={{
            duration: 0.5,
            ease: [0.33, 1, 0.68, 1],
          }}
          className="flex flex-col"
        >
          <span className="flex h-[1.2em] items-center">
            {children}
          </span>
          <span className="flex h-[1.2em] items-center text-primary">
            {children}
          </span>
        </motion.div>
      </div>
      
      {/* Subtle underline */}
      <motion.span
        variants={{
          initial: { scaleX: 0 },
          hover: { scaleX: 1 },
        }}
        transition={{ duration: 0.3 }}
        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-accent origin-left"
      />
    </motion.button>
  );
};

export default FlipLink;
