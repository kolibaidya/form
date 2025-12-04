import type { CategorySelectProps } from "../types/categorySelectProps";

export const CategorySelect: React.FC<CategorySelectProps> = ({
  categories,
  selected,
  onChange,
}) => {
  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded p-2 w-full"
    >
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
};
