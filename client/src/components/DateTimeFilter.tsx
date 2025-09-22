import { ChevronsUpDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, type Dispatch, type SetStateAction } from "react";
import { options } from "@/lib/data";
import type { PaginationOption } from "@/shemaValidations/system";
import { toast } from "sonner";

export default function DateTimeFilter({
  dateQuery,
  setDateQuery,
}: {
  dateQuery: string;
  setDateQuery: Dispatch<SetStateAction<string>>;
}) {
  const [open, setOpen] = useState(false);

  const handleSelect = async (
    currentValue: string,
    option: PaginationOption
  ) => {
    setDateQuery(currentValue);
    toast.success(`Các công việc của "${option.label}"`);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="lg"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="max-w-[150px] justify-between"
        >
          {dateQuery &&
            options.find((option) => option.value === dateQuery)?.label}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[150px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) =>
                    handleSelect(currentValue, option)
                  }
                >
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
