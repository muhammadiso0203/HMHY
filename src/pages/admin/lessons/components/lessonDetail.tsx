import { ArrowLeft, Search, Filter, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useGetLesson } from "../../service/query/getLessons";
import { useMemo, useState } from "react";

const LessonDetail = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { data, isLoading } = useGetLesson();

  const searchStudent = useMemo(() => {
    return data?.filter((lessom) => {
      const search2 = search.toLowerCase();
      return (
        lessom.student?.firstName?.toLowerCase().includes(search2) ||
        lessom.student?.lastName?.toLowerCase().includes(search2)
      );
    });
  }, [data, search]);

  if (isLoading) {
    return (
      <div className="p-10 text-center text-muted-foreground">
        Loading lessons...
      </div>
    );
  }

  return (
    <div className="w-400 p-6">
      {/* Header */}
      <div className="mb-6">
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="mb-3 flex items-center gap-2 bg-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Teachers
        </Button>

        <h1 className="text-2xl font-semibold">Teacher's Lessons</h1>
        <p className="text-sm text-muted-foreground">
          Manage and view all lessons for this teacher
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
        <div className="flex items-center gap-2 mb-4 font-medium text-sm">
          <Filter className="h-4 w-4" />
          Filters
        </div>

        <div className="grid grid-cols-5 gap-3">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search by student name..."
              className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm"
            />
          </div>

          {/* Status */}
          <Select>
            <SelectTrigger className="w-73">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="booked">Booked</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          {/* Payment */}
          <Select>
            <SelectTrigger className="w-73">
              <SelectValue placeholder="All Payments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="unpaid">Unpaid</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">Reset Filters</Button>
        </div>
      </div>

      {/* Lessons Table */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-medium">Lessons</h2>
          <span className="text-sm text-muted-foreground">
            {data?.length ?? 0} total lessons
          </span>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-6 text-sm font-medium border-b pb-3">
          <span>Date & Time</span>
          <span>Student</span>
          <span>Status</span>
          <span>Price</span>
          <span>Payment</span>
          <span className="text-right">Actions</span>
        </div>

        {/* Table Body */}
        {searchStudent && searchStudent.length > 0 ? (
          searchStudent.map((lesson) => (
            <div
              key={lesson.id}
              className="grid grid-cols-6 items-center text-sm py-4 border-b"
            >
              {/* Date & Time */}
              <div>
                <p className="font-medium">
                  {new Date(lesson.startTime).toLocaleTimeString()} –{" "}
                  {new Date(lesson.endTime).toLocaleTimeString()}
                </p>
              </div>

              {/* Student */}
              <div>
                {lesson.student
                  ? `${lesson.student.firstName} ${lesson.student.lastName}`
                  : "—"}
              </div>

              {/* Status */}
              <div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium
                    ${
                      lesson.status === "available"
                        ? "bg-green-100 text-green-700"
                        : lesson.status === "booked"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                >
                  {lesson.status}
                </span>
              </div>

              {/* Price */}
              <div>{lesson.price.toLocaleString()} so'm</div>

              {/* Payment */}
              <div
                className={`text-xs font-medium ${
                  lesson.isPaid ? "text-green-600" : "text-red-600"
                }`}
              >
                {lesson.isPaid ? "Paid" : "Unpaid"}
              </div>

              {/* Actions */}
              <div className="text-right">
                <Button className="w-10 h-5 bg-white text-black hover:bg-white">
                  ...
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Calendar className="h-10 w-10 mb-3" />
            <p>No lessons found</p>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center text-sm text-muted-foreground pt-4">
          <span>
            Showing {data?.length ?? 0} of {data?.length ?? 0} results
          </span>

          <div className="flex items-center gap-2">
            <span>Show:</span>
            <Select defaultValue="20">
              <SelectTrigger className="w-30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 per page</SelectItem>
                <SelectItem value="20">20 per page</SelectItem>
                <SelectItem value="50">50 per page</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetail;
