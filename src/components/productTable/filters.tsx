type FiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export const Filters = ({ search, onSearchChange }: FiltersProps) => (
  <div className="mb-4">
    <input
      type="text"
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Search products..."
      className="border p-2 rounded w-full"
    />
  </div>
);
