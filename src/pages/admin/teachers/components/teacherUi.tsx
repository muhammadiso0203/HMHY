import { Mail, Phone, Star, Globe, BadgeCheck } from "lucide-react";
import type { ITeacher } from "../../types";
import { useDeleteTeacher } from "../../service/mutation/useDeleteTeacher";
import { toast } from "sonner";

interface Props {
  teacher: ITeacher;
}



const TeacherCard = ({ teacher }: Props) => {
  const softdeleteTeacher = useDeleteTeacher()

  const handleDelete = (id: string) => {
    softdeleteTeacher.mutate(id, {
      onSuccess: () => {
        toast("Teacher o`chirildi", {
          position: "bottom-right",
        });
      },
      onError: (error) => {
        console.log(error, "error");
        toast("Teacher o`chirilmadi", {
          position: "bottom-right",
        });
      },
    });
  };
  return (
    <div className="bg-white rounded-xl border p-4 flex items-center justify-between gap-6">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold text-gray-700">
          {teacher.image ? (
            <img
              src={teacher.image}
              alt={teacher.fullName}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            teacher.fullName.charAt(0)
          )}
        </div>

        {/* Info */}
        <div className="space-y-1">
          {/* Name + status */}
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-lg">
              {teacher.fullName}
            </h2>

            {teacher.isActive && (
              <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                <BadgeCheck size={14} /> Active
              </span>
            )}
          </div>

          {/* Language + Level */}
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Globe size={14} /> English
            </span>
            <span className="flex items-center gap-1">
              🎓 {teacher.level ?? "A1"}
            </span>
          </div>

          {/* Email + Phone */}
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Mail size={14} /> {teacher.email}
            </span>
            <span className="flex items-center gap-1">
              <Phone size={14} /> {teacher.phoneNumber}
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* Rating */}
        <div className="flex items-center gap-1 text-sm">
          <Star className="text-yellow-400 fill-yellow-400" size={16} />
          <span>{teacher.rating ?? 0.0}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button className="px-3 py-1.5 border rounded-md text-sm hover:bg-gray-100">
            More
          </button>
          <button className="px-3 py-1.5 border rounded-md text-sm hover:bg-gray-100">
            Deactivate
          </button>
          <button className="px-3 py-1.5 border rounded-md text-sm hover:bg-gray-100">
            Edit
          </button>
          <button onClick={() => handleDelete(teacher.id)} className="px-3 py-1.5 bg-red-500 text-white rounded-md text-sm hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;
