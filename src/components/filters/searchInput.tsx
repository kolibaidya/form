import type { SearchInputProps } from "../types/searchInputProps";

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
}) => {
  return (
    <input
      type="text"
      placeholder="Search product..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded p-2 w-full"
    />
  );
};
