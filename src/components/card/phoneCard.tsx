import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { useDialog } from "react-dialog-async";
import { Edit, Trash2 } from "lucide-react";
import { DeletePhoneDialog } from "../dialogs/DeletePhoneDialog";
import { EditPhoneDialog } from "../dialogs/EditPhoneDialog";
import type { Phone } from "@/models/phone";

interface PhoneCardProps {
  phone: Phone;
}

export default function PhoneCard({ phone }: PhoneCardProps) {
  const editPhoneDialog = useDialog(EditPhoneDialog);
  const deletePhoneDialog = useDialog(DeletePhoneDialog);

  const handleEdit = () => {
    if (!phone._id) return;

    editPhoneDialog.open({
      _id: phone._id,
      phone,
    });
  };

  const handleDelete = () => {
    if (!phone._id) return;

    deletePhoneDialog.open({
      _id: phone._id,
    });
  };

  return (
    <Card className="border border-zinc-200 bg-white shadow-sm transition-all duration-200 ease-out hover:shadow-md hover:border-zinc-300 group">
      <CardHeader className="space-y-1 pb-3">
        <CardTitle className="text-base font-semibold text-zinc-900 line-clamp-2 leading-tight">
          {phone.Brand}
        </CardTitle>
        <CardDescription className="text-sm font-medium text-zinc-600 tabular-nums">
          {phone.Name}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-zinc-500 mb-4 capitalize">
          Release Date: {phone.ReleaseDate}
        </p>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 h-9 border-zinc-300 text-zinc-700 transition-all duration-150 ease-out hover:bg-zinc-100 hover:text-zinc-900 hover:border-zinc-400 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            onClick={handleEdit}
          >
            <Edit className="h-3.5 w-3.5 mr-1.5" aria-hidden="true" />
            Edit
          </Button>

          <Button
            size="sm"
            variant="outline"
            className="flex-1 h-9 border-red-200 text-red-600 transition-all duration-150 ease-out hover:bg-red-50 hover:text-red-700 hover:border-red-300 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            onClick={handleDelete}
          >
            <Trash2 className="h-3.5 w-3.5 mr-1.5" aria-hidden="true" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
