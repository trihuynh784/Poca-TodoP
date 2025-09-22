import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { http } from "@/lib/http";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { CreateTaskSchema, type FormCreateTask } from "@/shemaValidations/task";

const AddTask = ({ handleTaskChange }: { handleTaskChange: () => void }) => {
  const form = useForm<FormCreateTask>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
      title: ""
    }
  })

  const handleSubmit = async (values: FormCreateTask) => {
    const title = values.title.trim();

    try {
      await http.post("/api/tasks/create", { title });
      toast.success("Thêm công việc thành công!");
      form.reset();
    } catch (error) {
      toast.error("Thêm công việc thất bại!" + error);
    } finally {
      handleTaskChange();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex items-center gap-3 p-4 bg-white border rounded-xl shadow-sm max-w-screen"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex-1 relative">
              <FormControl>
                <Input
                  {...field}
                  placeholder="Bạn cần làm gì hôm nay...?"
                  className="h-12 text-base bg-slate-50 border-border/50 focus:border-primary focus:ring-primary/20"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="gradient"
          size="xl"
          className="h-12 px-6 text-md flex items-center"
        >
          <Plus className="mr-2 h-5 w-5" />
          Thêm
        </Button>
      </form>
    </Form>
  );
};

export default AddTask;
