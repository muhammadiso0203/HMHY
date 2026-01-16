import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, BookOpen } from "lucide-react";
import LessonUi from "./components/lessonUi";

const Lessons = () => {
  return (
    <div className="w-400 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <BookOpen className="w-8 h-8" /> Lessons Management
        </h1>
        <p className="text-sm text-muted-foreground">
          View and manage all teacher lessons
        </p>
      </div>

      {/* Filters Card */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        {/* Filters title */}
        <div className="flex items-center gap-2 mb-4 text-sm font-medium">
          <Filter className="h-4 w-4" />
          Filters
        </div>

        {/* Inputs */}
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search */}
          <div className="relative w-180">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by teacher name..."
              className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>

          {/* Level select */}
          <Select>
            <SelectTrigger className="w-100 rounded-lg text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>

          {/* Rating select */}
          <Select>
            <SelectTrigger className="w-100 rounded-lg text-sm">
              <SelectValue  />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="5">5 Stars</SelectItem>
              <SelectItem value="4">4+ Stars</SelectItem>
              <SelectItem value="3">3+ Stars</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <LessonUi/>
    </div>
  );
};

export default Lessons;
