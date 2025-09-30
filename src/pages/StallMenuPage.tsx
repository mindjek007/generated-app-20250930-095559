import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ChefHat } from "lucide-react";
import { api } from "@/lib/api-client";
import type { Stall, MenuItem, Rating } from "@shared/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { StarRating } from "@/components/StarRating";
import { toast } from "sonner";
function MenuItemCard({ item, stallId, onRate }: { item: MenuItem, stallId: string, onRate: (newRating: Rating) => void }) {
  const handleRate = async (rating: number) => {
    try {
      // Optimistic update can be complex, so we'll just show a toast and let the parent refetch or update.
      // For this implementation, we'll just call the API.
      // A more advanced version would update the stall state in the parent.
      toast.promise(
        api(`/api/stalls/${stallId}/menu-items/${item.id}/rate`, {
          method: 'POST',
          body: JSON.stringify({ rating }),
        }),
        {
          loading: 'Submitting your rating...',
          success: `Thanks for rating ${item.name}!`,
          error: 'Failed to submit rating.',
        }
      );
    } catch (error) {
      // Toast handles error message
    }
  };
  return (
    <div className="flex items-start gap-4 rounded-lg p-4 transition-colors hover:bg-muted/50">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="h-24 w-24 rounded-md object-cover"
      />
      <div className="flex-1">
        <h4 className="font-semibold">{item.name}</h4>
        <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <p className="font-semibold text-brand">${item.price.toFixed(2)}</p>
          <StarRating rating={item.rating.average} onRate={handleRate} size={16} />
        </div>
      </div>
    </div>
  );
}
function MenuPageSkeleton() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Skeleton className="mb-8 h-8 w-32" />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Skeleton className="mb-4 h-10 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Separator className="my-8" />
          <div>
            <Skeleton className="mb-6 h-8 w-48" />
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-start gap-4">
                  <Skeleton className="h-24 w-24 rounded-md" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-5 w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <Skeleton className="h-[500px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
function AboutStallCard({ stall }: { stall: Stall }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About {stall.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <img
          src={stall.imageUrl}
          alt={stall.name}
          className="mb-4 aspect-video w-full rounded-md object-cover"
        />
        <p className="text-sm text-muted-foreground">{stall.description}</p>
      </CardContent>
    </Card>
  );
}
export function StallMenuPage() {
  const { stallId } = useParams<{ stallId: string }>();
  const [stall, setStall] = useState<Stall | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!stallId) return;
    api<Stall>(`/api/stalls/${stallId}`)
      .then(setStall)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [stallId]);
  const handleStallRate = async (rating: number) => {
    if (!stall) return;
    try {
      const updatedStall = await api<Stall>(`/api/stalls/${stall.id}/rate`, {
        method: 'POST',
        body: JSON.stringify({ rating }),
      });
      setStall(updatedStall);
      toast.success(`Thanks for rating ${stall.name}!`);
    } catch (error) {
      toast.error('Failed to submit rating.');
    }
  };
  const handleMenuItemRate = (itemId: string, newRating: Rating) => {
    // This is a placeholder for a more complex state update.
    // For now, we rely on toasts and don't update the UI immediately to avoid complexity.
  };
  if (loading) {
    return <MenuPageSkeleton />;
  }
  if (error || !stall) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-destructive">
          {error || "Stall not found."}
        </h2>
        <Button asChild variant="link" className="mt-4">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all stalls
          </Link>
        </Button>
      </div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Button asChild variant="ghost" className="mb-8">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Stalls
          </Link>
        </Button>
        <div className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              {stall.name}
            </h1>
            <div className="mt-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Badge variant="secondary" className="text-base">
                <ChefHat className="mr-2 h-4 w-4" /> {stall.cuisine}
              </Badge>
              <div className="flex items-center gap-2">
                <StarRating rating={stall.rating.average} onRate={handleStallRate} />
                <span className="text-sm text-muted-foreground">
                  {stall.rating.average.toFixed(1)} ({stall.rating.count} ratings)
                </span>
              </div>
            </div>
            <div className="mt-8 lg:hidden">
              <AboutStallCard stall={stall} />
            </div>
            <Separator className="my-8" />
            <div className="space-y-12">
              {stall.menu.length > 0 ? stall.menu.map((category) => (
                <section key={category.id}>
                  <h2 className="font-display text-3xl font-semibold">
                    {category.name}
                  </h2>
                  <div className="mt-6 space-y-4">
                    {category.items.map((item) => (
                      <MenuItemCard key={item.id} item={item} stallId={stallId!} onRate={(newRating) => handleMenuItemRate(item.id, newRating)} />
                    ))}
                  </div>
                </section>
              )) : (
                <div className="text-center py-16 text-muted-foreground">
                  <p>This stall's menu is coming soon!</p>
                </div>
              )}
            </div>
          </div>
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <AboutStallCard stall={stall} />
            </div>
          </aside>
        </div>
      </div>
    </motion.div>
  );
}