import { useState } from "react";
import { produce } from "immer";
import { motion, AnimatePresence, Transition } from "framer-motion";
import { PlusCircle, GripVertical, Trash2, Edit } from "lucide-react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { MenuCategory, MenuItem, MenuItemFormData } from "@shared/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { MenuItemForm } from "./MenuItemForm";
interface MenuManagerProps {
  menu: MenuCategory[];
  onMenuChange: (menu: MenuCategory[]) => void;
}
type EditingState = {
  categoryId: string;
  itemId?: string;
} | null;
function SortableMenuItem({ categoryId, item, onEdit, onDelete }: { categoryId: string; item: MenuItem; onEdit: (item: MenuItem) => void; onDelete: (itemId: string) => void; }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: `${categoryId}-${item.id}` });
  const style = { transform: CSS.Transform.toString(transform), transition };
  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-2 bg-background p-2 rounded-md border">
      <div {...attributes} {...listeners} className="cursor-grab touch-none p-1">
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </div>
      <img src={item.imageUrl} alt={item.name} className="h-12 w-12 rounded-sm object-cover" />
      <div className="flex-grow">
        <p className="font-medium">{item.name}</p>
        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
      </div>
      <Button variant="ghost" size="icon" onClick={() => onEdit(item)}><Edit className="h-4 w-4" /></Button>
      <Button variant="ghost" size="icon" onClick={() => onDelete(item.id!)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
    </div>
  );
}
export function MenuManager({ menu, onMenuChange }: MenuManagerProps) {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingState, setEditingState] = useState<EditingState>(null);
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));
  const handleAddCategory = () => {
    if (newCategoryName.trim() === "") return;
    const newCategory: MenuCategory = {
      id: `temp-cat-${Date.now()}`,
      name: newCategoryName.trim(),
      items: [],
    };
    onMenuChange([...menu, newCategory]);
    setNewCategoryName("");
  };
  const handleDeleteCategory = (categoryId: string) => {
    onMenuChange(menu.filter(c => c.id !== categoryId));
  };
  const handleItemSubmit = (categoryId: string, data: MenuItemFormData) => {
    const updatedMenu = produce(menu, draft => {
      const category = draft.find(c => c.id === categoryId);
      if (!category) return;
      if (editingState?.itemId) {
        // Editing existing item
        const itemIndex = category.items.findIndex(i => i.id === editingState.itemId);
        if (itemIndex > -1) {
          category.items[itemIndex] = {
            ...category.items[itemIndex],
            ...data,
          };
        }
      } else {
        // Adding new item
        const newItem: MenuItem = {
          ...data,
          id: crypto.randomUUID(),
          rating: { average: 0, count: 0 },
        };
        category.items.push(newItem);
      }
    });
    onMenuChange(updatedMenu);
    setEditingState(null);
  };
  const handleDeleteItem = (categoryId: string, itemId: string) => {
    const updatedMenu = produce(menu, draft => {
      const category = draft.find(c => c.id === categoryId);
      if (category) {
        category.items = category.items.filter(i => i.id !== itemId);
      }
    });
    onMenuChange(updatedMenu);
  };
  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active.id !== over.id) {
      const [activeCategoryId, activeItemId] = active.id.split('-');
      const [overCategoryId, overItemId] = over.id.split('-');
      const updatedMenu = produce(menu, draft => {
        const activeCategory = draft.find(c => c.id === activeCategoryId);
        const overCategory = draft.find(c => c.id === overCategoryId);
        if (!activeCategory || !overCategory) return;
        const activeIndex = activeCategory.items.findIndex(i => i.id === activeItemId);
        const overIndex = overCategory.items.findIndex(i => i.id === overItemId);
        if (activeIndex === -1 || overIndex === -1) return;
        if (activeCategoryId === overCategoryId) {
          overCategory.items = arrayMove(overCategory.items, activeIndex, overIndex);
        } else {
          const [movedItem] = activeCategory.items.splice(activeIndex, 1);
          overCategory.items.splice(overIndex, 0, movedItem);
        }
      });
      onMenuChange(updatedMenu);
    }
  }
  const allItemIds = menu.flatMap(c => c.items.map(i => `${c.id}-${i.id}`));
  const transition: Transition = { duration: 0.3, ease: "easeInOut" };
  const formAnimation = {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: 'auto' },
    exit: { opacity: 0, height: 0 },
    transition: transition
  };
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Menu Management</h3>
        <Accordion type="multiple" className="w-full" defaultValue={menu.map(c => c.id!)}>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={allItemIds} strategy={verticalListSortingStrategy}>
              {menu.map(category => (
                <AccordionItem value={category.id!} key={category.id}>
                  <div className="flex items-center">
                    <AccordionTrigger className="flex-grow">{category.name}</AccordionTrigger>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteCategory(category.id!)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <AccordionContent>
                    <div className="space-y-2 p-2">
                      {category.items.map(item => (
                        <div key={item.id}>
                          <AnimatePresence>
                            {editingState?.categoryId === category.id && editingState?.itemId === item.id && (
                              <motion.div {...formAnimation}>
                                <MenuItemForm
                                  menuItem={item}
                                  onSubmit={(data) => handleItemSubmit(category.id!, data)}
                                  onCancel={() => setEditingState(null)}
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>
                          {!(editingState?.categoryId === category.id && editingState?.itemId === item.id) && (
                            <SortableMenuItem
                              categoryId={category.id!}
                              item={item}
                              onEdit={() => setEditingState({ categoryId: category.id!, itemId: item.id! })}
                              onDelete={(itemId) => handleDeleteItem(category.id!, itemId)}
                            />
                          )}
                        </div>
                      ))}
                      <AnimatePresence>
                        {editingState?.categoryId === category.id && !editingState.itemId && (
                          <motion.div {...formAnimation}>
                            <MenuItemForm
                              onSubmit={(data) => handleItemSubmit(category.id!, data)}
                              onCancel={() => setEditingState(null)}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {(!editingState || editingState.categoryId !== category.id) && (
                        <>
                          {category.items.length === 0 && (
                            <p className="text-sm text-muted-foreground text-center py-4">No items in this category yet.</p>
                          )}
                          <Button variant="outline" className="w-full mt-2" onClick={() => setEditingState({ categoryId: category.id! })}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Add Menu Item
                          </Button>
                        </>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </SortableContext>
          </DndContext>
        </Accordion>
        <div className="mt-6 flex gap-2">
          <Input
            placeholder="New category name..."
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
          />
          <Button onClick={handleAddCategory}>Add Category</Button>
        </div>
      </CardContent>
    </Card>
  );
}