import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UtensilsCrossed, Search } from "lucide-react";
import { api } from "@/lib/api-client";
import type { StallSummary } from "@shared/types";
import { StallCard } from "@/components/StallCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
function StallsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-[4/3] w-full rounded-lg" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}
export function HomePage() {
  const [stalls, setStalls] = useState<StallSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  useEffect(() => {
    api<StallSummary[]>("/api/stalls")
      .then(setStalls)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);
  const categories = useMemo(() => {
    const allCategories = stalls.map((stall) => stall.category);
    return ["All", ...Array.from(new Set(allCategories))];
  }, [stalls]);
  const filteredStalls = useMemo(() => {
    return stalls.filter((stall) => {
      const matchesCategory = activeCategory === 'All' || !activeCategory || stall.category === activeCategory;
      const matchesSearch =
        stall.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stall.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [stalls, searchTerm, activeCategory]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-muted/30 py-24 md:py-32 lg:py-40">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
            >
              <UtensilsCrossed className="mx-auto h-16 w-16 text-brand" />
            </motion.div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-6 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl"
            >
              Urban Chowk Culinary Collective
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
            >
              Discover a world of flavors from the best street food vendors, all
              in one place. Your next favorite meal is just a click away.
            </motion.p>
          </div>
        </div>
      </section>
      {/* Stalls Grid Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Explore Our Stalls
          </h2>
          {/* Search and Filter Controls */}
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by stall or cuisine..."
                className="w-full pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category || (category === 'All' && !activeCategory) ? "default" : "outline"}
                  onClick={() => setActiveCategory(category === 'All' ? null : category)}
                  className={cn("rounded-full", (activeCategory === category || (category === 'All' && !activeCategory)) && "bg-brand text-brand-foreground hover:bg-brand/90")}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          {loading ? (
            <StallsGridSkeleton />
          ) : error ? (
            <p className="text-center text-destructive">{error}</p>
          ) : (
            <motion.div layout className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence>
                {filteredStalls.map((stall) => (
                  <motion.div
                    key={stall.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <StallCard stall={stall} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
          {!loading && filteredStalls.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg font-medium text-muted-foreground">No stalls match your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}