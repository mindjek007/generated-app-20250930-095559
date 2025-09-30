import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UtensilsCrossed, LayoutDashboard, LogOut } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { MobileNav } from "./MobileNav";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";
const navItems = [
  { href: "/", label: "Stalls" },
  { href: "/about", label: "About" },
];
export function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();
  const handleLogout = () => {
    logout();
    toast.info("You have been logged out.");
    navigate("/");
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 md:gap-4">
          <MobileNav />
          <Link to="/" className="flex items-center gap-2">
            <UtensilsCrossed className="h-7 w-7 text-brand" />
            <span className="hidden font-display text-xl font-bold tracking-tight sm:inline-block">
              Urban Chowk
            </span>
          </Link>
        </div>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={cn(
                  "relative transition-colors hover:text-foreground/80",
                  isActive ? "text-foreground" : "text-foreground/60"
                )}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    className="absolute bottom-[-4px] left-0 right-0 h-0.5 bg-brand"
                    layoutId="underline"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </NavLink>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="icon" asChild className="hidden md:inline-flex">
                <Link to="/admin">
                  <LayoutDashboard className="h-5 w-5" />
                  <span className="sr-only">Admin Dashboard</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout} className="hidden md:inline-flex">
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Logout</span>
              </Button>
            </>
          ) : null}
          <ThemeToggle className="relative" />
        </div>
      </div>
    </header>
  );
}