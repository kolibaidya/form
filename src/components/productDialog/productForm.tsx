import { Input } from "@/components/ui/input";

export function ProductForm(props: {
  nameRef: React.RefObject<HTMLInputElement>;
  titleRef: React.RefObject<HTMLInputElement>;
  priceRef: React.RefObject<HTMLInputElement>;
  categoryRef: React.RefObject<HTMLInputElement>;
  descriptionRef: React.RefObject<HTMLInputElement>;
}) {
  return (
    <div className="space-y-2">
      <Input placeholder="Name" ref={props.nameRef} />
      <Input placeholder="title" ref={props.titleRef} />
      <Input placeholder="Price" ref={props.priceRef} />
      <Input placeholder="Category" ref={props.categoryRef} />
      <Input placeholder="Description" ref={props.descriptionRef} />
    </div>
  );
}
