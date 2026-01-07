import {
  ArrowLeft,
  Search,
  RefreshCcw,
  Calendar,
  User,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router";
import { getDeletedTeacher } from "../service/query/getDeletedTeacher";
import LoadingSpinner from "@/components/loading";

const DeletedTeacher = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = getDeletedTeacher();

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Xatolik yuz berdi</div>;

  const teachers = data?.data ?? [];

  return (
    <div className="min-h-screen px-25 py-5 w-404">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 mb-2"
          >
            <ArrowLeft size={18} /> Orqaga
          </button>
          <h1 className="text-2xl font-semibold">O‘chirilgan Ustozlar</h1>
          <p className="text-sm text-gray-500">
            O‘chirilgan ustozlarni ko‘rish va boshqarish
          </p>
        </div>

        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            placeholder="Ism, email yoki telefon bo‘yicha"
            className="pl-10 pr-4 py-2 rounded-lg border bg-white text-sm w-72"
          />
        </div>
      </div>

      {/* LIST */}
      <div className="space-y-6">
        {teachers.length === 0 ? (
          <div className="text-center text-gray-500">
            O‘chirilgan ustozlar yo‘q
          </div>
        ) : (
          teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-xl border p-6 space-y-4"
            >
              {/* Top */}
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-xl bg-blue-500 text-white flex items-center justify-center text-2xl font-semibold">
                    {teacher.fullName?.charAt(0)}
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold">
                      {teacher.fullName}
                    </h2>
                    <p className="text-sm text-gray-500">{teacher.email}</p>
                    <p className="text-sm text-gray-500">
                      {teacher.phoneNumber}
                    </p>
                  </div>
                </div>

                <div className="text-right space-y-2">
                  <button className="flex items-center gap-2 border px-4 py-1.5 rounded-lg text-sm hover:bg-gray-100">
                    <RefreshCcw size={16} /> Tiklash
                  </button>
                  <button className="text-sm text-gray-600 hover:underline">
                    Batafsil
                  </button>
                </div>
              </div>

              {/* Info rows */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                  <Calendar size={16} className="text-gray-500" />
                  <span>
                    O‘chirilgan:{" "}
                    <b>{new Date(teacher.updatedAt).toLocaleString()}</b>
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                  <User size={16} className="text-gray-500" />
                  <span>
                    O‘chirgan: <b>Admin</b>
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                  <Calendar size={16} className="text-gray-500" />
                  <span>
                    Tiklash muddati: <b>—</b>
                  </span>
                </div>

                <div className="flex items-center">
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                    ✓ Tiklash mumkin
                  </span>
                </div>
              </div>

              {/* Reason */}
              <div className="bg-yellow-50 border border-yellow-200 text-sm p-4 rounded-lg">
                <b>Sabab:</b> 
              </div>

              {/* Footer */}
              <div className="flex items-center gap-4 text-sm">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg">
                  {teacher.level ?? "—"}
                </span>

                <span className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg">
                  <Star
                    size={14}
                    className="fill-yellow-400 text-yellow-400"
                  />
                  {teacher.rating ?? 0}
                </span>

                <span>{teacher.hourPrice}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DeletedTeacher;
