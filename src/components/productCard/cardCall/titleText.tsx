type Props = { title: string };

export const TitleText = ({ title }: Props) => {
  return <p className="text-gray-600">{title}</p>;
};
