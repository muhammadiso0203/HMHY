import {
  BookOpen,
  CheckCircle,
  Clock,
  DollarSign,
  GraduationCap,
  Star,
  Users,
  XCircle,
} from "lucide-react";
import "@/index.css";
import { useNavigate } from "react-router-dom";
import { getStatistic } from "../service/query/getStatistic";
import LoadingSpinner from "@/components/loading";

const Dashboard = () => {
  const navigate = useNavigate();
  const { data, isLoading } = getStatistic();
  
  
  

  return (
    <div className="w-404">
      <div className="bg-linear-to-r from-teal-500 to-blue-600  p-8 text-white rounded-[10px]">
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          Xush kelibsiz, Muhammad! 👋
        </h1>
        <p className="mt-2 text-gray-100 font-semibold">
          Bugungi platformangiz statistikasi
        </p>
      </div>
      {isLoading ? (
        <>
          <LoadingSpinner />
        </>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-5">
            <div
              onClick={() => navigate("/app/admin/teachers")}
              className="bg-white rounded-2xl p-5 w-97 h-48.5 shadow-sm mt-7
                transition-transform duration-100 ease-out
                hover:scale-[1.04]"
            >
              <div className="items-center gap-3">
                <h3 className="text-gray-600 font-semibold">Ustozlar</h3>
                <div className="w-15 h-10 rounded-xl bg-blue-50 flex items-center justify-start">
                  <Users className="text-blue-600 w-5 h-5 ml-3" />
                </div>
              </div>

              <div className="mt-10">
                <p className="text-3xl font-bold text-black">
                  {data?.teacher.length}
                </p>
                <p className="text-[13px] text-gray-400">
                  {data?.teacher?.length} faol                  
                </p>
              </div>
            </div>

            <div
              onClick={() => navigate("/app/admin/students")}
              className="bg-white rounded-2xl p-5 w-97 h-48.5 shadow-sm mt-7
                transition-transform duration-100 ease-out
                hover:scale-[1.04]"
            >
              <div className="items-center gap-3">
                <h3 className="text-gray-600 font-semibold">Talabalar</h3>
                <div className="w-15 h-10 rounded-xl bg-green-50 flex items-center justify-start">
                  <GraduationCap className="text-green-600 w-5 h-5 ml-3" />
                </div>
              </div>

              <div className="mt-10">
                <p className="text-3xl font-bold text-black">
                  {data?.student.length}
                </p>
                <p className="text-[13px] text-gray-400">
                  {data?.student.length} faol
                </p>
              </div>
            </div>

            <div
              onClick={() => navigate("/app/admin/lessons")}
              className="bg-white rounded-2xl p-5 w-97 h-48.5 shadow-sm mt-7
                transition-transform duration-100 ease-out
                hover:scale-[1.04]"
            >
              <div className="items-center gap-3">
                <h3 className="text-gray-600 font-semibold">Darslar</h3>
                <div className="w-15 h-10 rounded-xl bg-purple-50 flex items-center justify-start">
                  <BookOpen className="text-purple-600 w-5 h-5 ml-3" />
                </div>
              </div>

              <div className="mt-10">
                <p className="text-3xl font-bold text-black">
                  {data?.lesson.length}
                </p>
                <p className="text-[13px] text-gray-400">
                  Jami darslar {data?.lesson.length}ta
                </p>
              </div>
            </div>

            <div
              onClick={() => navigate("/app/admin/payments")}
              className="bg-white rounded-2xl p-5 w-97 h-48.5 shadow-sm mt-7
                transition-transform duration-100 ease-out
                hover:scale-[1.04]"
            >
              <div className="items-center gap-3">
                <h3 className="text-gray-600 font-semibold">Daromad</h3>
                <div className="w-15 h-10 rounded-xl bg-yellow-50 flex items-center justify-start">
                  <DollarSign className="text-yellow-600 w-5 h-5 ml-3" />
                </div>
              </div>

              <div className="mt-10">
                <p className="text-3xl font-bold text-black">
                  {data?.earning.length}
                </p>
                <p className="text-[13px] text-gray-400">
                  Jami daromad {data?.earning.length}ta
                </p>
              </div>
            </div>
          </div>
          {/* TOP CARDS */}
          <div className="grid grid-cols-3 gap-6 mt-7">
            {/* TALABALAR */}
            <div className="bg-white rounded-2xl shadow p-5 space-y-4">
              <div className="flex items-center gap-2 font-semibold">
                <GraduationCap className="w-5 h-5 text-green-600" />
                Talabalar
              </div>

              <div className="flex justify-between items-center bg-green-50 px-4 py-3 rounded-xl">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Faol
                </div>
                <span className="font-bold text-green-600">
                  {data?.student.length}
                </span>
              </div>

              <div className="flex justify-between items-center bg-red-50 px-4 py-3 rounded-xl">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <XCircle className="w-4 h-4 text-red-600" />
                  Bloklangan
                </div>
                <span className="font-bold text-red-600">0</span>
              </div>
            </div>

            {/* USTOZLAR */}
            <div className="bg-white rounded-2xl shadow p-5 space-y-4">
              <div className="flex items-center gap-2 font-semibold">
                <Users className="w-5 h-5 text-blue-600" />
                Ustozlar
              </div>

              <div className="flex justify-between items-center bg-blue-50 px-4 py-3 rounded-xl">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  Jami
                </div>
                <span className="font-bold text-blue-600">
                  {data?.teacher.length}
                </span>
              </div>

              <div className="flex justify-between items-center bg-purple-50 px-4 py-3 rounded-xl">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Star className="w-4 h-4 text-purple-600" />
                  O‘rtacha reyting
                </div>
                <span className="font-bold text-purple-600">4.5</span>
              </div>
            </div>

            {/* TO‘LOVLAR */}
            <div className="bg-white rounded-2xl shadow p-5 space-y-4">
              <div className="flex items-center gap-2 font-semibold">
                <DollarSign className="w-5 h-5 text-yellow-600" />
                To‘lovlar
              </div>

              <div className="flex justify-between items-center bg-yellow-50 px-4 py-3 rounded-xl">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 text-yellow-600" />
                  Jami
                </div>
                <span className="font-bold text-yellow-600">
                  {data?.earning.length}
                </span>
              </div>

              <div className="flex justify-between items-center bg-orange-50 px-4 py-3 rounded-xl">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Clock className="w-4 h-4 text-orange-600" />
                  Kutilmoqda
                </div>
                <span className="font-bold text-orange-600">
                  {data?.earning.length}
                </span>
              </div>
            </div>
          </div>

          {/* TEZKOR HARAKATLAR */}
          <div className="bg-white rounded-2xl shadow p-6 mt-7">
            <h2 className="font-semibold mb-4">Tezkor harakatlar</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button
                onClick={() => navigate("/app/admin/teachers")}
                className="bg-blue-50 rounded-2xl p-6 flex flex-col items-center gap-2 hover:bg-blue-100"
              >
                <Users className="w-6 h-6 text-blue-600" />
                <span className="font-medium">Ustozlar</span>
              </button>

              <button
                onClick={() => navigate("/app/admin/students")}
                className="bg-green-50 rounded-2xl p-6 flex flex-col items-center gap-2 hover:bg-green-100"
              >
                <GraduationCap className="w-6 h-6 text-green-600" />
                <span className="font-medium">Talabalar</span>
              </button>

              <button
                onClick={() => navigate("/app/admin/lessons")}
                className="bg-purple-50 rounded-2xl p-6 flex flex-col items-center gap-2 hover:bg-purple-100"
              >
                <BookOpen className="w-6 h-6 text-purple-600" />
                <span className="font-medium">Darslar</span>
              </button>

              <button
                onClick={() => navigate("/app/admin/payments")}
                className="bg-yellow-50 rounded-2xl p-6 flex flex-col items-center gap-2 hover:bg-yellow-100"
              >
                <DollarSign className="w-6 h-6 text-yellow-600" />
                <span className="font-medium">To‘lovlar</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
