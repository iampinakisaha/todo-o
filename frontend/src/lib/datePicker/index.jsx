"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CustomDatePicker = ({ dateReturn = "", name = "", value = "" }) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const currentDay = new Date().getDate();

  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const [date, setDate] = React.useState();

  const handleSetDate = (selectedDate) => {
    setDate(selectedDate);
    dateReturn(selectedDate);
    setIsPopoverOpen(false); // Close the popover
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-auto justify-start text-left font-normal mr-2 p-0.5 px-1 h-8 items-center",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP")
          ) : (
            <span>{value ? format(value, "PPP") : name ? name : "Date"}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <Select
          onValueChange={(value) =>
            handleSetDate(addDays(new Date(), parseInt(value)))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Today</SelectItem>
            <SelectItem value="1">Tomorrow</SelectItem>
            <SelectItem value="3">In 3 days</SelectItem>
            <SelectItem value="7">In a week</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSetDate}
            fromMonth={new Date(currentYear, currentMonth, currentDay)}
            toMonth={new Date(currentYear + 20, 11)}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CustomDatePicker;
