import { Pagination } from "@/components/pagination/pagination";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const ProductPagination = ({
  page,
  totalPages,
  onPageChange,
}: Props) => (
  <Pagination page={page} totalPages={totalPages} onChange={onPageChange} />
);
