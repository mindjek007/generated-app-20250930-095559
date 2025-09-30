import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Utensils } from "lucide-react";
import type { StallSummary } from "@shared/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
interface StallCardProps {
  stall: StallSummary;
}
export function StallCard({ stall }: StallCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link to={`/stalls/${stall.id}`} className="group block">
        <Card className="overflow-hidden transition-shadow duration-300 group-hover:shadow-xl">
          <CardHeader className="p-0">
            <div className="aspect-w-4 aspect-h-3 overflow-hidden">
              <img
                src={stall.imageUrl}
                alt={stall.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <h3 className="font-display text-xl font-semibold tracking-tight">
              {stall.name}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {stall.cuisine}
            </p>
          </CardContent>
          <CardFooter className="flex flex-wrap items-center justify-between gap-2 p-4 pt-0">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{stall.category}</Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Utensils className="h-3 w-3" />
                {stall.menuItemCount} {stall.menuItemCount === 1 ? 'item' : 'items'}
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-500" />
              <span className="text-sm font-medium text-muted-foreground">
                {stall.rating.average.toFixed(1)} ({stall.rating.count})
              </span>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}