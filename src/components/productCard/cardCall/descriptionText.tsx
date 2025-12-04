type Props = { description: string };

export const DescriptionText = ({ description }: Props) => {
  return <p className="text-sm line-clamp-3">{description}</p>;
};
