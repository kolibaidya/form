import { Button } from "@/components/ui/button";

export function ProductDialogActions(props: {
  onCancel: () => void;
  onSave: () => void;
}) {
  return (
    <div className="flex justify-end mt-4 gap-2">
      <Button variant="outline" onClick={props.onCancel}>
        Cancel
      </Button>
      <Button onClick={props.onSave}>Save</Button>
    </div>
  );
}
