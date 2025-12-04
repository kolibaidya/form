type Props = { name: string };

export const NameText = ({ name }: Props) => {
  return <span className="font-bold">{name}</span>;
};
