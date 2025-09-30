import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Stall, StallSchema, MenuCategory } from "@shared/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MenuManager } from "./MenuManager";
export type StallFormData = Omit<Stall, 'id' | 'rating'>;
interface StallFormProps {
  stall?: Stall;
  onSubmit: (data: StallFormData) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}
const formSchema = StallSchema.omit({ id: true, rating: true });
export function StallForm({ stall, onSubmit, onCancel, isSubmitting }: StallFormProps) {
  const form = useForm<StallFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: stall ? {
      name: stall.name,
      cuisine: stall.cuisine,
      category: stall.category,
      description: stall.description,
      imageUrl: stall.imageUrl,
      menu: stall.menu,
    } : {
      name: "",
      cuisine: "",
      category: "",
      description: "",
      imageUrl: "",
      menu: [],
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stall Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Taco Town" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cuisine"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cuisine</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Mexican" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Street Food" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://images.unsplash.com/..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="A brief description of the stall." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="menu"
          render={({ field }) => (
            <FormItem>
              <MenuManager menu={field.value} onMenuChange={field.onChange} />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "Saving..." : "Save Stall"}
          </Button>
        </div>
      </form>
    </Form>
  );
}