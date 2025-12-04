import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function ProductDialogHeader({ title }: { title: string }) {
  return (
    <DialogHeader>
      <DialogTitle>{title}</DialogTitle>
    </DialogHeader>
  );
}
