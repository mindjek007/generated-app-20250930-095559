import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, UtensilsCrossed, X, LogIn, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";
import { Separator } from "./ui/separator";
const navItems = [
  { href: "/", label: "Stalls" },
  { href: "/about", label: "About" },
];
export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    toast.info("You have been logged out.");
    setIsOpen(false);
    navigate("/");
  };
  const handleLinkClick = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-xs pr-0">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b px-6 py-4">
            <NavLink
              to="/"
              className="flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <UtensilsCrossed className="h-7 w-7 text-brand" />
              <span className="font-display text-xl font-bold tracking-tight">
                Urban Chowk
              </span>
            </NavLink>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close Menu</span>
            </Button>
          </div>
          <nav className="flex flex-1 flex-col justify-between p-6">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "text-lg font-medium transition-colors hover:text-brand",
                      isActive ? "text-brand" : "text-foreground/80"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <Separator />
              {isAuthenticated ? (
                <>
                  <Button variant="ghost" className="justify-start gap-2 text-lg font-medium text-foreground/80" onClick={() => handleLinkClick('/admin')}>
                    <LayoutDashboard className="h-5 w-5" />
                    Dashboard
                  </Button>
                  <Button variant="ghost" className="justify-start gap-2 text-lg font-medium text-foreground/80" onClick={handleLogout}>
                    <LogOut className="h-5 w-5" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button variant="ghost" className="justify-start gap-2 text-lg font-medium text-foreground/80" onClick={() => handleLinkClick('/admin/login')}>
                  <LogIn className="h-5 w-5" />
                  Admin Login
                </Button>
              )}
            </div>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}