import { Card } from "@/components/ui/card";
import { Circle } from "lucide-react";

const TaskEmptyState = ({ filter }: { filter: string }) => {
  return (
    <div>
      <Card className="p-8 text-center border-0 bg-gradient-card shadow-md">
        <div className="space-y-3">
          <Circle className="mx-auto h-12 w-12 text-gray-500" />

          <h3 className="font-medium text-foreground mb-1">
            {filter === "all" && "Không có công việc nào!"}
            {filter === "active" && "Không có công việc đang hoạt động!"}
            {filter === "completed" && "Không có công việc đã hoàn thành!"}
          </h3>

          <p className="text-sm text-muted-foreground">
            {filter === "all" &&
              "Thêm công việc mới để bắt đầu quản lý công việc của bạn."}
            {filter === "active" &&
              "Chuyển sang 'Tất cả' để xem tất cả các công việc của bạn."}
            {filter === "completed" &&
              "Chuyển sang 'Tất cả' để xem tất cả các công việc của bạn."}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default TaskEmptyState;
