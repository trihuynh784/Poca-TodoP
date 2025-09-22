import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { limitPages } from "@/lib/data";
import { cn } from "@/lib/utils";

const PaginationComp = ({
  handlePrev,
  handleNext,
  handlePageChange,
  page,
  totalPages,
}: {
  handlePrev: () => void;
  handleNext: () => void;
  handlePageChange: (newPage: number) => void;
  page: number;
  totalPages: number;
}) => {
  const generatePages = () => {
    let pages = [];

    if (totalPages < limitPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 2) {
        pages = [1, 2, 3, "...", totalPages];
      } else if (page >= totalPages - 1) {
        pages = [1, "...", totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [1, "...", page, "...", totalPages];
      }
    }

    return pages;
  };

  const showPages = generatePages();

  return (
    <Pagination className="justify-start">
      <PaginationContent>
        {/* Trang trước */}
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePrev}
            className={cn(
              "cursor-pointer",
              page === 1 && "pointer-events-none opacity-50"
            )}
          />
        </PaginationItem>

        {/* Trang số */}
        {showPages.map((p, index) => (
          <PaginationItem key={index}>
            {p === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                className="cursor-pointer"
                isActive={p === page}
                onClick={() => {
                  if (p != page) handlePageChange(p as number)
                }}
              >
                {p}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Trang sau */}
        <PaginationItem>
          <PaginationNext
            onClick={handleNext}
            className={cn(
              "cursor-pointer",
              page === totalPages && "pointer-events-none opacity-50"
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComp;
