import type { ProductPaginationProps } from "../types/productPaginationProps";

export const Pagination = ({
  page,
  totalPages,
  onChange,
}: ProductPaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex gap-2 justify-center mt-4">
      <button
        disabled={page === 10}
        onClick={() => onChange(page - 1)}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Prev
      </button>

      <span className="px-2 py-1">
        {page} / {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};
