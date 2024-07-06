export interface PaginationNumberProps {
  page: number | string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
  onClick: () => void;
}

export interface PaginationArrowProps {
  direction: "left" | "right";
  isDisabled?: boolean;
  onClick: () => void;
}

export interface PaginationProps {
  totalPages: number;
}

export interface IPaginationOptions {
  pageIndex?: number;
  pageSize?: number;
}
