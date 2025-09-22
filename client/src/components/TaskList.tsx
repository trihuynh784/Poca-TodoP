import TaskCard from "@/components/TaskCard";
import TaskEmptyState from "@/components/TaskEmptyState";
import type { Task } from "@/shemaValidations/task";

const TaskList = ({
  filter = "all",
  tasks,
  handleTaskChange,
}: {
  filter: string;
  tasks: Task[];
  handleTaskChange: () => void;
}) => {
  if (!tasks || tasks.length === 0) return <TaskEmptyState filter={filter} />;

  return (
    <div className="space-y-4">
      {tasks.map((task, index) => (
        <TaskCard
          key={task?._id ?? index}
          task={task}
          handleTaskChange={handleTaskChange}
        />
      ))}
    </div>
  );
};

export default TaskList;
