import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Edit, Trash2, LogOut } from "lucide-react";
import { api } from "@/lib/api-client";
import type { Stall } from "@shared/types";
import type { StallFormData } from "@/components/StallForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { StallForm } from "@/components/StallForm";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuthStore } from "@/stores/authStore";
export function AdminPage() {
  const [stalls, setStalls] = useState<Stall[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedStall, setSelectedStall] = useState<Stall | undefined>(undefined);
  const [stallToDelete, setStallToDelete] = useState<Stall | null>(null);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const handleLogout = () => {
    logout();
    toast.info("You have been logged out.");
    navigate("/admin/login");
  };
  const fetchStalls = async () => {
    setLoading(true);
    try {
      const allStalls = await api<Stall[]>("/api/stalls/all-details");
      setStalls(allStalls);
    } catch (error) {
      toast.error("Failed to fetch stalls.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStalls();
  }, []);
  const handleFormSubmit = async (data: StallFormData) => {
    setIsSubmitting(true);
    try {
      if (selectedStall) {
        // Update
        const updatedStall = await api<Stall>(`/api/stalls/${selectedStall.id}`, {
          method: "PUT",
          body: JSON.stringify(data),
        });
        setStalls(stalls.map((s) => (s.id === updatedStall.id ? updatedStall : s)));
        setSelectedStall(updatedStall); // Keep dialog open and refresh data
        toast.success("Stall updated successfully!");
      } else {
        // Create
        const newStall = await api<Stall>("/api/stalls", {
          method: "POST",
          body: JSON.stringify(data),
        });
        setStalls([...stalls, newStall]);
        toast.success("Stall created successfully!");
        setIsFormOpen(false); // Close dialog on creation
        setSelectedStall(undefined);
      }
    } catch (error) {
      toast.error(`Failed to ${selectedStall ? 'update' : 'create'} stall.`);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleDeleteStall = async () => {
    if (!stallToDelete) return;
    try {
      await api(`/api/stalls/${stallToDelete.id}`, { method: "DELETE" });
      setStalls(stalls.filter((s) => s.id !== stallToDelete.id));
      toast.success("Stall deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete stall.");
    } finally {
      setIsDeleteAlertOpen(false);
      setStallToDelete(null);
    }
  };
  const openEditDialog = (stall: Stall) => {
    setSelectedStall(stall);
    setIsFormOpen(true);
  };
  const openNewDialog = () => {
    setSelectedStall(undefined);
    setIsFormOpen(true);
  };
  const openDeleteDialog = (stall: Stall) => {
    setStallToDelete(stall);
    setIsDeleteAlertOpen(true);
  };
  const renderActions = (stall: Stall) => (
    <div className="flex items-center justify-end gap-2">
      <Button variant="ghost" size="icon" onClick={() => openEditDialog(stall)}>
        <Edit className="h-4 w-4" />
        <span className="sr-only">Edit {stall.name}</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => openDeleteDialog(stall)}
        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">Delete {stall.name}</span>
      </Button>
    </div>
  );
  const renderDesktopView = () => (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Cuisine</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Menu Items</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            [...Array(3)].map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-8 w-20 ml-auto" /></TableCell>
              </TableRow>
            ))
          ) : stalls.length > 0 ? (
            stalls.map((stall) => (
              <TableRow key={stall.id}>
                <TableCell className="font-medium">{stall.name}</TableCell>
                <TableCell>{stall.cuisine}</TableCell>
                <TableCell>{stall.category}</TableCell>
                <TableCell>{stall.menu.reduce((acc, cat) => acc + cat.items.length, 0)}</TableCell>
                <TableCell className="text-right">{renderActions(stall)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No stalls found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
  const renderMobileView = () => (
    <div className="space-y-4">
      {loading ? (
        [...Array(3)].map((_, i) => (
          <Card key={i}><CardContent className="p-4"><Skeleton className="h-24 w-full" /></CardContent></Card>
        ))
      ) : stalls.length > 0 ? (
        stalls.map((stall) => (
          <Card key={stall.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{stall.name}</span>
                {renderActions(stall)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                <p><span className="font-medium text-foreground">Cuisine:</span> {stall.cuisine}</p>
                <p><span className="font-medium text-foreground">Category:</span> {stall.category}</p>
                <p><span className="font-medium text-foreground">Menu Items:</span> {stall.menu.reduce((acc, cat) => acc + cat.items.length, 0)}</p>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center py-16 text-muted-foreground">
          No stalls found.
        </div>
      )}
    </div>
  );
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Admin Dashboard
        </h1>
        <div className="flex w-full flex-col-reverse gap-2 sm:w-auto sm:flex-row">
          <Button onClick={handleLogout} variant="outline" className="w-full sm:w-auto">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button onClick={openNewDialog} className="w-full sm:w-auto">
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Stall
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{selectedStall ? "Edit" : "Add New"} Stall</DialogTitle>
                <DialogDescription>
                  {selectedStall ? "Edit the details of your stall." : "Add a new stall to the food court."} Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <StallForm
                key={selectedStall?.id} // Add key to re-mount form on stall change
                stall={selectedStall}
                onSubmit={handleFormSubmit}
                onCancel={() => { setIsFormOpen(false); setSelectedStall(undefined); }}
                isSubmitting={isSubmitting}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {isMobile ? renderMobileView() : renderDesktopView()}
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the stall "{stallToDelete?.name}" and all of its menu items.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteStall}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}