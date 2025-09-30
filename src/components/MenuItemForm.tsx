import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MenuItem, MenuItemFormData, MenuItemFormDataSchema } from "@shared/types";
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
interface MenuItemFormProps {
  menuItem?: MenuItem;
  onSubmit: (data: MenuItemFormData) => void;
  onCancel: () => void;
}
export function MenuItemForm({ menuItem, onSubmit, onCancel }: MenuItemFormProps) {
  const form = useForm<MenuItemFormData>({
    resolver: zodResolver(MenuItemFormDataSchema),
    defaultValues: menuItem ? {
      name: menuItem.name,
      description: menuItem.description,
      price: menuItem.price,
      imageUrl: menuItem.imageUrl,
    } : {
      name: "",
      description: "",
      price: 0,
      imageUrl: "",
    },
  });
  const handleSubmit = (data: MenuItemFormData) => {
    onSubmit(data);
    form.reset();
  };
  return (
    <Form {...form}>
      <div className="space-y-4 p-4 bg-muted/50 rounded-lg border">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Carne Asada Taco" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="A short, tasty description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 3.50" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />
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
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="button" onClick={form.handleSubmit(handleSubmit)}>Save Item</Button>
        </div>
      </div>
    </Form>
  );
}