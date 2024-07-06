import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import clsx from "clsx";
import { PaginationArrowProps, PaginationNumberProps, PaginationProps } from "interfaces/pagination.ts";
import { useSearchParams } from "react-router-dom";
import { generatePagination } from "utils/generatePagination.ts";

import React, { useEffect, useState } from "react";

const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
  const allPages = generatePagination(currentPage, totalPages);

  useEffect(() => {
    setCurrentPage(Number(searchParams.get("page")) || 1);
  }, [searchParams]);

  const handlePageChange = (pageNumber: number | string) => {
    setCurrentPage(Number(pageNumber));

    if (Number(pageNumber) > 1) {
      searchParams.set("page", pageNumber.toString());
      setSearchParams(searchParams);
    } else {
      searchParams.delete("page");
      setSearchParams(searchParams);
    }
  };

  return (
    <>
      <div className="w-full p-3 inline-flex items-center justify-center">
        <PaginationArrow direction="left" onClick={() => handlePageChange(currentPage - 1)} isDisabled={currentPage <= 1} />

        <div className="flex -space-x-px">
          {allPages.map((page, index) => {
            let position: "first" | "last" | "single" | "middle" | undefined;

            if (index === 0) position = "first";
            if (index === allPages.length - 1) position = "last";
            if (allPages.length === 1) position = "single";
            if (page === "...") position = "middle";

            return (
              <PaginationNumber
                key={index}
                page={page}
                position={position}
                isActive={currentPage === page}
                onClick={() => handlePageChange(page)}
              />
            );
          })}
        </div>

        <PaginationArrow
          direction="right"
          onClick={() => handlePageChange(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </>
  );
};

export default Pagination;

const PaginationNumber: React.FC<PaginationNumberProps> = (props) => {
  const { page, position, isActive, onClick } = props;

  const className = clsx("flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center text-sm font-semibold border", {
    "rounded-l-md": position === "first" || position === "single",
    "rounded-r-md": position === "last" || position === "single",
    "z-10 bg-slate-900 border-bg-slate-900 dark:bg-gray-500 dark:border-white text-white": isActive,
    "hover:bg-gray-100 dark:hover:bg-gray-800": !isActive && position !== "middle",
    "text-gray-300": position === "middle",
  });

  return isActive || position === "middle" ? (
    <div className={className} onClick={onClick}>
      {page}
    </div>
  ) : (
    <button aria-label={`pagination page ${page}`} className={className} onClick={onClick}>
      {page}
    </button>
  );
};

const PaginationArrow: React.FC<PaginationArrowProps> = (props) => {
  const { direction, isDisabled, onClick } = props;

  const className = clsx("flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-md border", {
    "pointer-events-none text-gray-300": isDisabled,
    "hover:bg-gray-100 dark:hover:bg-gray-800": !isDisabled,
    "mr-2 md:mr-4": direction === "left",
    "ml-2 md:ml-4": direction === "right",
  });

  const icon = direction === "left" ? <IconArrowNarrowLeft className="w-4" /> : <IconArrowNarrowRight className="w-4" />;

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <button aria-label={`pagination arrow ${direction}`} onClick={onClick} className={className}>
      {icon}
    </button>
  );
};
