type Props = { price: number };

export const PriceText = ({ price }: Props) => {
  return <p className="text-lg font-semibold">${price}</p>;
};
