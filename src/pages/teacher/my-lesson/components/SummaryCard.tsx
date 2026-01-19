import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { SummaryCardProps } from "../../types";



export const SummaryCard = ({
  selectedDate,
  isError,
  formatFullDate,
  onOpenCreate,
}: SummaryCardProps) => {
  return (
    <Card>
      <CardContent className="py-1 flex items-center justify-between">
        <div>
          <h2 className="font-medium">
            {selectedDate ? formatFullDate(selectedDate) : "No lesson dates"}
          </h2>
          {isError && (
            <p className="text-xs text-red-500 mt-1">
              Unable to load lessons. Please try again.
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={onOpenCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Create Lesson
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};


