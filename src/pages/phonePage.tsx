import { CreatePhoneDialog } from "@/components/dialogs/CreatePhoneDialog";
import ErrorDisplay from "@/components/ErrorDisplay";
import { PhoneFeed } from "@/components/feed/phoneFeed";
import LoadingDisplay from "@/components/LoadingDisplay";
import { PhoneTable } from "@/components/table/phoneTable";
import { Card, CardContent } from "@/components/ui/card";
import { useFetchPhones } from "@/hooks/phoneHooks";

export const PhonePage = () => {
  const { data: phones = [], isLoading, isError, error } = useFetchPhones();

  if (isLoading) {
    return <LoadingDisplay />;
  }

  if (isError) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <div className="w-full max-w-none" aria-label="Phones Page" role="region">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-900">
              Phones
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              Manage and view your phone catalog
            </p>
          </div>
          <CreatePhoneDialog />
        </div>
        {phones.length === 0 && (
          <p className="text-sm text-zinc-500">No phones found</p>
        )}
        {phones.length > 0 && (
          <div className="space-y-6">
            <div className="block md:hidden">
              <PhoneFeed phones={phones} />
            </div>

            <div className="hidden md:block">
              <Card className="border border-zinc-200 shadow-sm">
                <CardContent className="p-0">
                  <PhoneTable phones={phones} />
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
