import { Link } from "react-router";
import { ShieldCheck, GraduationCap } from "lucide-react";

const First = () => {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex gap-10 max-sm:flex-col">
        {/* Admin Card */}
        <Link
          to="/admin/login"
          className="group w-56 h-56 flex flex-col items-center justify-center 
                     rounded-2xl bg-white shadow-lg 
                     hover:shadow-2xl hover:-translate-y-1 transition"
        >
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 mb-4">
            <ShieldCheck className="w-8 h-8 text-blue-600 group-hover:scale-110 transition" />
          </div>
          <span className="text-lg font-semibold text-gray-800">
            Admin Panel
          </span>
        </Link>

        {/* Teacher Card */}
        <Link
          to="/teacher/login"
          className="group w-56 h-56 flex flex-col items-center justify-center 
                     rounded-2xl bg-white shadow-lg 
                     hover:shadow-2xl hover:-translate-y-1 transition"
        >
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 mb-4">
            <GraduationCap className="w-8 h-8 text-green-600 group-hover:scale-110 transition" />
          </div>
          <span className="text-lg font-semibold text-gray-800">
            Teacher Panel
          </span>
        </Link>
      </div>
    </div>
  );
};

export default First;
