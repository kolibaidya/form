import type { Phone } from "@/models/phone";
import PhoneCard from "../card/phoneCard";

interface PhoneFeedProps {
  phones: Phone[];
}

export const PhoneFeed = ({ phones }: PhoneFeedProps) => {
  if (phones.length === 0) {
    return (
      <p className="text-sm text-center text-gray-500">No phones available.</p>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {phones.map((phone) => (
        <PhoneCard key={phone._id} phone={phone} />
      ))}
    </div>
  );
};
