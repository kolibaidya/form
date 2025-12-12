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
    <div>
      {isLoading && <LoadingDisplay />}
      {error && <ErrorDisplay error={error} />}
      {phones && (
        <Card className="xl">
          <CardHeader>
            <CardTitle>Phone page</CardTitle>
            <CardDescription>
              A list of phones fetched from the server. You can now Create,
              Edit, and Delete phones. You can view the phones in a table with
              sorting, filtering, and pagination.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <PhoneFeed phones={phones} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};
