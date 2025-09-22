import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FilterType } from "@/lib/data";
import { CheckCheck, Funnel, LoaderCircle } from "lucide-react";

const icons = {
  all: <Funnel className="mr-2" />,
  active: <LoaderCircle className="mr-2" />,
  completed: <CheckCheck className="mr-2" />,
};

const TaskFilter = ({
  filter = "all",
  setFilter,
  activeTaskCount = 0,
  completedTaskCount = 0,
}: {
  activeTaskCount: number;
  completedTaskCount: number;
  filter: "all" | "active" | "completed";
  setFilter: (filter: "all" | "active" | "completed") => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-center">
      {/* Phần thống kê chưa làm và đã làm */}
      <div className="flex gap-3">
        <Badge
          variant={"secondary"}
          className="bg-white/50 text-accent-foreground border-info/20"
        >
          {activeTaskCount} Chưa hoàn thành
        </Badge>
        <Badge
          variant={"outline"}
          className="bg-white/50 text-success border-success/20"
        >
          {completedTaskCount} Đã hoàn thành
        </Badge>
      </div>

      {/* Phần bộ lọc */}
      <div className="flex flex-col gap-3 sm:flex-row">
        {Object.keys(FilterType).map((type) => (
          <Button
            key={type}
            variant={filter === type ? "default" : "outline"}
            size={"sm"}
            onClick={() => setFilter(type as "all" | "active" | "completed")}
            className="capitalize"
          >
            {icons[type as keyof typeof icons]}
            {FilterType[type as keyof typeof FilterType]}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TaskFilter;
