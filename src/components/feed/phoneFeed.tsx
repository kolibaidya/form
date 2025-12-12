import type { Phone } from "@/models/phone";
import { PhoneTable } from "../table/phoneTable";

interface PhoneFeedProps {
  phones: Phone[];
}

export const PhoneFeed = ({ phones }: PhoneFeedProps) => {
  return <PhoneTable phones={phones} />;
};
