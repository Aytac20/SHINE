import { PaginationProps } from "@/types";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  colors,
}) => {
  const buildHref = (page: number) => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", page.toString());
    if (colors && colors.length > 0) params.set("colors", colors.join(","));
    return `?${params.toString()}`;
  };

  const createPages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 4) pages.push("…");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 3) pages.push("…");

      pages.push(totalPages);
    }

    return pages;
  };

  const pages = createPages();
  const prevPage = currentPage > 1 ? currentPage - 1 : 1;
  const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;

  return (
    <div className='my-6 flex items-center justify-center gap-2 pb-10 text-xs'>
      <Link
        href={buildHref(prevPage)}
        className={`center gap-2 px-3 py-1 ${
          currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        <FaChevronLeft />
        <span>Previous</span>
      </Link>

      {pages.map((page, idx) =>
        page === "…" ? (
          <span key={idx} className='px-2 py-1'>
            …
          </span>
        ) : (
          <Link
            key={idx}
            href={buildHref(page as number)}
            className={`rounded-sm px-3 py-1 ${
              page === currentPage ? "bg-gray-200" : ""
            }`}
          >
            {page}
          </Link>
        )
      )}

      <Link
        href={buildHref(nextPage)}
        className={`center gap-2 px-3 py-1 ${
          currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        <span>Next</span>
        <FaChevronRight />
      </Link>
    </div>
  );
};

export default Pagination;
