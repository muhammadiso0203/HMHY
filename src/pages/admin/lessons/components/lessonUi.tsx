import LoadingSpinner from "@/components/loading";
import { Button } from "@/components/ui/button";
import { useGetLesson } from "../../service/query/getLessons";
import { ChevronRightIcon } from "lucide-react";
import { Navigate, useNavigate } from "react-router";

const LessonUi = () => {
  const { data, isLoading } = useGetLesson();
  const navigate = useNavigate()

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
      {data?.map((lesson) => (
        <div
          key={lesson.id}
          className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-4"
        >
          {/* Top */}
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-[#6b4b3e] text-white flex items-center justify-center font-semibold text-lg">
                {lesson.teacher.image
                  ? lesson.teacher.image
                  : lesson.teacher.fullName.charAt(0)}
              </div>

              {lesson.teacher.isActive && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>

            {/* Name */}
            <div>
              <h3 className="font-medium">{lesson.teacher.fullName}</h3>
              <p className="text-sm text-muted-foreground">
                {lesson.teacher.level ?? "—"}
              </p>
            </div>
          </div>

          {/* Rating & Price */}
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">⭐</span>
              <span>{lesson.teacher.rating.toFixed(1)}</span>
            </div>

            <span className="text-muted-foreground">
              {lesson.price.toLocaleString()} so'm/h
            </span>
          </div>

          {/* Experience */}
          <p className="text-sm text-muted-foreground">
            {lesson.teacher.expirence ?? 0} experience
          </p>

          {/* Button */}
          <Button
            onClick={() => navigate(`${lesson.id}`)}
            variant="outline"
            className="w-full bg-white"
          >
            View Lessons <ChevronRightIcon />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default LessonUi;
