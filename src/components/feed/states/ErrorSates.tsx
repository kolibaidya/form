type Props = {
  message?: string;
};

export const ErrorState = ({ message }: Props) => (
  <div className="text-center py-20 text-red-500">
    {message || "Something went wrong while fetching products."}
  </div>
);
