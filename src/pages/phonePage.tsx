import { useFetchPhones } from "@/hooks/phoneHooks";
import ErrorDisplay from "@/components/ErrorDisplay";
import LoadingDisplay from "@/components/LoadingDisplay";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PhoneFeed } from "@/components/feed/phoneFeed";

export const PhonePage = () => {
  const { isLoading, data: phones, error } = useFetchPhones();

  return (
    <div className="w-full">
      {isLoading && <LoadingDisplay />}
      {error && <ErrorDisplay error={error} />}
      {phones && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-900">
              Phones
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              Manage your phone inventory with sorting, filtering, and pagination
            </p>
          </div>
          <Card className="border border-zinc-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Phone Inventory</CardTitle>
              <CardDescription>
                View and manage your phone collection
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <PhoneFeed phones={phones} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
