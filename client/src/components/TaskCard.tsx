import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { http } from "@/lib/http";
import { cn } from "@/lib/utils";
import type { Task } from "@/shemaValidations/task";
import {
  Calendar,
  Circle,
  CircleCheckBig,
  Loader,
  SquarePen,
  Trash2,
} from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { toast } from "sonner";

const TaskCard = ({
  task,
  handleTaskChange,
}: {
  task: Task;
  handleTaskChange: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [isEditting, setIsEditting] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(task.title || "");

  const handleChangeTitle = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setUpdateTitle(target.value);
  };

  const handleKeyPress = async (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      try {
        setLoading(true);
        await http.patch(`/api/tasks/${task._id}`, {
          title: updateTitle,
        });
        handleTaskChange();
        toast.success("Cập nhật tiêu đề công việc thành công!");
      } catch (error) {
        toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau!" + error);
      } finally {
        setLoading(false);
        setIsEditting(false);
      }
    }
  };

  const handleChangeStatus = async () => {
    try {
      setLoading(true);
      if (task.status === "active") {
        await http.patch(`/api/tasks/${task._id}`, {
          status: "completed",
          completedAt: new Date().toISOString(),
        });
        toast.success(`${task.title} đã đổi sang hoàn thành.`);
      } else {
        await http.patch(`/api/tasks/${task._id}`, {
          status: "active",
          completedAt: null,
        });
        toast.success(`${task.title} đã đổi sang chưa hoàn thành.`);
      }
      handleTaskChange();
    } catch (error) {
      toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau!" + error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async () => {
    try {
      setLoading(true);
      await http.delete(`/api/tasks/${task._id}`);
      toast.success(`Xóa công việc "${task.title.toUpperCase()}" thành công!`, {
        duration: 5000,
      });
    } catch (error) {
      toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau!" + error);
    } finally {
      setLoading(false);
      handleTaskChange();
    }
  };

  return (
    <>
      {loading ? (
        <Card
          className={cn(
            "p-6 items-center bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group"
          )}
        >
          <Loader className="animate-spin" />
        </Card>
      ) : (
        <Card
          className={cn(
            "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group"
          )}
        >
          <div className="flex items-center gap-4 text-muted-foreground">
            {/* Nút tròn */}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-full transition-all duration-200",
                task.status === "active"
                  ? "hover:text-muted-foreground"
                  : "text-success hover:text-success/80"
              )}
              onClick={() => handleChangeStatus()}
            >
              {task.status === "active" ? <Circle /> : <CircleCheckBig />}
            </Button>

            {/* Tiêu đề công việc và ngày giờ bắt đầu công việc */}
            <div className="flex-1">
              {/* Tiêu đề */}
              {isEditting ? (
                <Input
                  className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
                  placeholder="Nhập tiêu đề công việc..."
                  autoFocus
                  value={updateTitle}
                  onChange={(e) => handleChangeTitle(e)}
                  onKeyPress={(e) => handleKeyPress(e.nativeEvent)}
                  onBlur={() => {
                    setIsEditting(false);
                    setUpdateTitle(task.title || "");
                  }}
                />
              ) : (
                <p
                  className={cn(
                    "text-base text-foreground transition-all duration-200",
                    task.status === "completed" &&
                    "line-through text-muted-foreground"
                  )}
                >
                  {task.title}
                </p>
              )}

              {/* Ngày giờ bắt đầu công việc */}
              <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                <Calendar className="size-3" />
                <span className="text-xs">
                  {new Date(task.createdAt).toLocaleString()}
                </span>

                {task.completedAt instanceof Date ? (
                  <>
                    <span className="text-xs"> - </span>
                    <Calendar className="size-3" />
                    <span className="text-xs">
                      {new Date(task.completedAt).toLocaleString()}
                    </span>
                  </>
                ) : ""}
              </div>
            </div>

            {/* Nút chỉnh sửa và xóa */}
            <div className="hidden group-hover:inline-flex gap-2 animate-slide-up">
              <Button
                variant="ghost"
                size={"icon"}
                className="transition-colors hover:text-info"
                onClick={() => setIsEditting(true)}
              >
                <SquarePen />
              </Button>

              <Button
                variant={"ghost"}
                size={"icon"}
                className="transition-colors hover:text-destructive"
                onClick={() => handleDeleteTask()}
              >
                <Trash2 />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default TaskCard;
