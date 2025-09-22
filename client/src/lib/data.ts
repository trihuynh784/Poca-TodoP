import type { PaginationOption } from "@/shemaValidations/system";

export const FilterType = {
  all: "Tất cả",
  active: "Chưa làm",
  completed: "Hoàn thành",
};

export const options: PaginationOption[] = [
  {
    value: "today",
    label: "Hôm nay",
  },
  {
    value: "week",
    label: "Tuần này",
  },
  {
    value: "month",
    label: "Tháng này",
  },
  {
    value: "all",
    label: "Tất cả",
  },
];

export const limitTasks = 4;
export const limitPages = 4;
