import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface DayItem {
  key: string;
  date: Date;
}

interface HeaderAndDaysProps {
  days: DayItem[];
  isLoading: boolean;
  selectedDate: string | null;
  onSelectDate: (key: string) => void;
}

export const HeaderAndDays = ({
  days,
  isLoading,
  selectedDate,
  onSelectDate,
}: HeaderAndDaysProps) => {
  return (
    <>
      <div className="flex items-center justify-between max-w-auto">
        <div>
          <h1 className="text-2xl font-semibold">My Lessons</h1>
          <p className="text-sm text-gray-500">Manage your lesson schedule</p>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4 max-sm:grid-cols-2 max-md:grid-cols-3 max-lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 7 }).map((_, idx) => (
              <Skeleton key={idx} className="h-24 rounded-xl" />
            ))
          : days.map(({ key, date }) => {
              const isActive = key === selectedDate;

              return (
                <Card
                  key={key}
                  onClick={() => onSelectDate(key)}
                  className={cn(
                    "min-w-[90px] h-25 flex items-center justify-center cursor-pointer border rounded-[10px] transition-all",
                    isActive && "border-teal-400 shadow-sm"
                  )}
                >
                  <CardContent className="p-3 text-center">
                    <p className="text-xs text-gray-500">
                      {new Intl.DateTimeFormat("uz-UZ", {
                        weekday: "short",
                      }).format(date)}
                    </p>
                    <p
                      className={cn(
                        "text-xl font-semibold",
                        isActive && "text-teal-500"
                      )}
                    >
                      {new Intl.DateTimeFormat("uz-UZ", {
                        day: "2-digit",
                      }).format(date)}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Intl.DateTimeFormat("uz-UZ", {
                        month: "short",
                      }).format(date)}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
      </div>
    </>
  );
};


