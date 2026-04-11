import { Moon } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="container mx-auto px-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Moon className="w-5 h-5 text-primary" />
          <span className="font-display font-bold">NightLibrary</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © 2026 NightLibrary. Your media, your rules.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
