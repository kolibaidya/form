import { Button } from "@/components/ui/button";

type Props = {
  onAdd: () => void;
};

export const ProductHeader = ({ onAdd }: Props) => (
  <div className="flex justify-between items-center">
    <h1 className="text-2xl font-bold">Products</h1>
    <Button onClick={onAdd}>Add Product +</Button>
  </div>
);
