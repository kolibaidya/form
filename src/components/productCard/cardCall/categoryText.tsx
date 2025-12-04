type Props = { category: string };

export const CategoryText = ({ category }: Props) => {
  return <span className="text-xs">{category}</span>;
};
