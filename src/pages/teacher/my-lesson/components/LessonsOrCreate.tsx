import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, Plus, Video } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { ILessons } from "@/pages/admin/types";

interface LessonsOrCreateProps {
  isLoading: boolean;
  showCreate: boolean;
  selectedDate: string | null;
  selectedLessons: ILessons[];
  durationLabel: string | null;
  formError: string | null;
  isCreateError: boolean;
  isCreating: boolean;
  hourOptions: string[];
  minuteOptions: string[];
  startHour: string;
  startMinute: string;
  endHour: string;
  endMinute: string;
  setStartHour: (value: string) => void;
  setStartMinute: (value: string) => void;
  setEndHour: (value: string) => void;
  setEndMinute: (value: string) => void;
  setShowCreate: (value: boolean) => void;
  setFormError: (value: string | null) => void;
  handleCreateLesson: () => void;
  formatFullDate: (date: string) => string;
  formatTime: (date: string) => string;
  lessonName: string;
  setLessonName: (value: string) => void;
  price: string;
  setPrice: (value: string) => void;
  // Yangi qo'shilgan propslar:
  googleMeetUrl: string;
  setGoogleMeetUrl: (value: string) => void;
}

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
  googleMeetUrl,
  setGoogleMeetUrl,
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
              <label className="text-sm font-medium">Dars nomi *</label>
              <input
                value={lessonName}
                onChange={(e) => setLessonName(e.target.value)}
                className="border rounded-md px-3 py-2 w-full"
                placeholder="Masalan: Speaking practice"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Narx (so'm) *</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                min={0}
                className="border rounded-md px-3 py-2 w-full"
                placeholder="Masalan: 50000"
              />
            </div>

            {/* Google Meet URL Input - Yangi qism */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Video size={16} className="text-blue-500" />
                Google Meet URL
              </label>
              <input
                value={googleMeetUrl}
                onChange={(e) => setGoogleMeetUrl(e.target.value)}
                className="border rounded-md px-3 py-2 w-full bg-slate-50"
                placeholder="https://meet.google.com/..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Time *</label>
                <div className="flex gap-2">
                  <select
                    className="border rounded-md px-3 py-2 flex-1"
                    value={startHour}
                    onChange={(e) => setStartHour(e.target.value)}
                  >
                    {hourOptions.map((h) => (
                      <option key={h}>{h}</option>
                    ))}
                  </select>
                  <select
                    className="border rounded-md px-3 py-2 flex-1"
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
                    className="border rounded-md px-3 py-2 flex-1"
                    value={endHour}
                    onChange={(e) => setEndHour(e.target.value)}
                  >
                    {hourOptions.map((h) => (
                      <option key={h}>{h}</option>
                    ))}
                  </select>
                  <select
                    className="border rounded-md px-3 py-2 flex-1"
                    value={endMinute}
                    onChange={(e) => setEndMinute(e.target.value)}
                  >
                    {minuteOptions.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-500">
              Duration:{" "}
              <Badge variant="secondary">
                {durationLabel ?? "Invalid time range"}
              </Badge>
            </p>

            {formError && <p className="text-sm text-red-600">{formError}</p>}
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
                className="border rounded-lg p-4 flex items-center justify-between hover:border-teal-500 transition-colors"
              >
                <div className="flex-1">
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
                  <p className="text-xs text-gray-400 mt-1">
                    {lesson.student
                      ? `${lesson.student.firstName} ${lesson.student.lastName}`
                      : "No student assigned"}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <div className="flex gap-2 items-center">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "capitalize",
                        lesson.status === "booked" &&
                          "bg-yellow-100 text-yellow-700",
                        lesson.status === "completed" &&
                          "bg-green-100 text-green-700",
                        lesson.status === "cancelled" &&
                          "bg-red-100 text-red-700",
                      )}
                    >
                      {lesson.status}
                    </Badge>
                  </div>

                  {/* AGAR GOOGLE MEET URL BO'LSA TUGMA CHIQADI */}
                  {lesson.googleMeetsUrl ? (
                    <Button
                      size="sm"
                      variant="default"
                      className="bg-teal-600 hover:bg-teal-700 h-8 gap-2"
                      onClick={() =>
                        window.open(lesson.googleMeetsUrl, "_blank")
                      }
                    >
                      <Video size={14} />
                      Darsga qo'shilish
                    </Button>
                  ) : (
                    <div className="text-xs text-gray-400 italic">
                      Link biriktirilmagan
                    </div>
                  )}

                  <div className="text-sm font-semibold text-gray-700">
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
            <p className="text-sm font-medium">
              Ushbu kun uchun darslar mavjud emas
            </p>
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
