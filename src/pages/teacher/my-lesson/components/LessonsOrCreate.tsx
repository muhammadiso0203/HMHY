import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { LessonsOrCreateProps } from "../../types";



export const LessonsOrCreate = ({
  isLoading,
  showCreate,
  selectedDate,
  selectedLessons,
  durationLabel,
  formError,
  isCreateError,
  isCreating,
  hourOptions,
  minuteOptions,
  startHour,
  startMinute,
  endHour,
  endMinute,
  setStartHour,
  setStartMinute,
  setEndHour,
  setEndMinute,
  setShowCreate,
  setFormError,
  handleCreateLesson,
  formatFullDate,
  formatTime,
  lessonName,
  setLessonName,
  price,
  setPrice,
}: LessonsOrCreateProps) => {
  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center gap-2 font-medium">
          <Calendar size={18} />
          {selectedDate
            ? `Lessons for ${formatFullDate(selectedDate)}`
            : "Lessons"}
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton key={idx} className="h-16 rounded-lg" />
            ))}
          </div>
        ) : showCreate ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Dars nomi</label>
              <input
                value={lessonName}
                onChange={(e) => setLessonName(e.target.value)}
                className="border rounded-md px-3 py-2 w-full"
                placeholder="Masalan: Speaking practice"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Narx (so'm)</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                min={0}
                className="border rounded-md px-3 py-2 w-full"
                placeholder="Masalan: 50000"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Start Time *</label>
              <div className="flex gap-2">
                <select
                  className="border rounded-md px-3 py-2"
                  value={startHour}
                  onChange={(e) => setStartHour(e.target.value)}
                >
                  {hourOptions.map((h) => (
                    <option key={h}>{h}</option>
                  ))}
                </select>
                <span className="self-center">:</span>
                <select
                  className="border rounded-md px-3 py-2"
                  value={startMinute}
                  onChange={(e) => setStartMinute(e.target.value)}
                >
                  {minuteOptions.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">End Time *</label>
              <div className="flex gap-2">
                <select
                  className="border rounded-md px-3 py-2"
                  value={endHour}
                  onChange={(e) => setEndHour(e.target.value)}
                >
                  {hourOptions.map((h) => (
                    <option key={h}>{h}</option>
                  ))}
                </select>
                <span className="self-center">:</span>
                <select
                  className="border rounded-md px-3 py-2"
                  value={endMinute}
                  onChange={(e) => setEndMinute(e.target.value)}
                >
                  {minuteOptions.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>

            <p className="text-sm text-gray-500">
              Duration:{" "}
              <Badge variant="secondary">
                {durationLabel ?? "Invalid time range"}
              </Badge>
            </p>

            {formError && (
              <p className="text-sm text-red-600">{formError}</p>
            )}
            {isCreateError && (
              <p className="text-sm text-red-600">
                Could not create lesson. Please try again.
              </p>
            )}

            <div className="flex gap-3 pt-2">
              <Button
                className="flex-1"
                onClick={handleCreateLesson}
                disabled={isCreating || !durationLabel}
              >
                {isCreating ? "Creating..." : "Create Lesson"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowCreate(false);
                  setFormError(null);
                }}
                disabled={isCreating}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : selectedLessons.length ? (
          <div className="space-y-3">
            {selectedLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="border rounded-lg p-4 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-teal-500" />
                    <span className="font-medium">
                      {lesson.name || "Lesson"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatTime(lesson.startTime)} –{" "}
                    {formatTime(lesson.endTime)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {lesson.student
                      ? `${lesson.student.firstName} ${lesson.student.lastName}`
                      : "No student assigned"}
                  </p>
                </div>

                <div className="text-right space-y-2">
                  <Badge
                    variant="secondary"
                    className={cn(
                      "capitalize",
                      lesson.status === "booked" &&
                        "bg-yellow-100 text-yellow-700",
                      lesson.status === "completed" &&
                        "bg-green-100 text-green-700",
                      lesson.status === "cancelled" &&
                        "bg-red-100 text-red-700"
                    )}
                  >
                    {lesson.status}
                  </Badge>
                  <div className="text-sm text-gray-600">
                    {lesson.price?.toLocaleString()} so'm
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
            <div className="w-12 h-12 rounded-full border border-dashed flex items-center justify-center text-gray-400">
              i
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">
                Ushbu kun uchun darslar mavjud emas
              </p>
              <p className="text-xs text-gray-500">
                Dars jadvalingizni boshqarish uchun yangi dars qo&apos;shing.
              </p>
            </div>
            <Button variant="outline" onClick={() => setShowCreate(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Yangi dars qo&apos;shish
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};


