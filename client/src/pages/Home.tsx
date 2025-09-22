import AddTask from "@/components/AddTask";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Pagination from "@/components/Pagination";
import TaskList from "@/components/TaskList";
import TaskFilter from "@/components/TaskFilter";
import DateTimeFilter from "@/components/DateTimeFilter";
import { useCallback, useEffect, useState } from "react";
import { http } from "@/lib/http";
import type { Task } from "@/shemaValidations/task";
import { limitTasks } from "@/lib/data";

const Home = () => {
  const [tasks, setTasks] = useState<Task[] | []>([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [dateQuery, setDateQuery] = useState("today");
  const [page, setPage] = useState(1);

  const fetchData = useCallback(async () => {
    const result = await http.get(`/api/tasks?filter=${dateQuery}`);
    setTasks(result.tasks);
    setActiveTaskCount(parseInt(result.activeTaskCount));
    setCompletedTaskCount(parseInt(result.completedTaskCount));
  }, [dateQuery]);

  useEffect(() => {
    fetchData();
  }, [fetchData, dateQuery]);

  useEffect(() => {
    setPage(1);
  }, [filter, dateQuery])

  const handleTaskChange = () => {
    fetchData();
  };

  const filteredTasks: Task[] | null = tasks.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active" && task;
      case "completed":
        return task.status === "completed" && task;
      default:
        return task;
    }
  });

  const visibleTasks = filteredTasks.slice(
    (page - 1) * limitTasks,
    page * limitTasks
  );

  const totalPages = Math.ceil(filteredTasks.length / limitTasks);

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <div className="min-h-screen w-full bg-[#fefcff] relative">
        {/* Dreamy Sky Pink Glow */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
          }}
        />
        <div className="container pt-8 mx-auto relative z-10">
          <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
            <Header />
            <AddTask handleTaskChange={handleTaskChange} />
            <TaskFilter
              filter={filter}
              setFilter={setFilter}
              activeTaskCount={activeTaskCount}
              completedTaskCount={completedTaskCount}
            />
            <TaskList
              filter={filter}
              tasks={visibleTasks}
              handleTaskChange={handleTaskChange}
            />
            <div className="flex items-center justify-between">
              <Pagination
                handlePrev={handlePrev}
                handleNext={handleNext}
                handlePageChange={handlePageChange}
                page={page}
                totalPages={totalPages}
              />
              <DateTimeFilter
                dateQuery={dateQuery}
                setDateQuery={setDateQuery}
              />
            </div>
            <Footer
              activeTaskCount={activeTaskCount}
              completedTaskCount={completedTaskCount}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
