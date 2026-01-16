import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Ban, Eye, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetStudent } from "../../service/query/getStudentById";
import { useUpdateStudent } from "../../service/mutation/useUpdateStudent";
import LoadingSpinner from "@/components/loading";
import type { IStudent } from "../../types";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteStudent } from "../../service/mutation/useDeleteStudent";

interface ButtonsProps {
  student: IStudent;
}

const Buttons = ({ student }: ButtonsProps) => {
  const client = useQueryClient();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [tgUsername, setTgUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // 👉 dialog ochilgandagina studentni olib kelamiz
  const { data, isLoading } = useGetStudent(open ? student.id : "");

  const { mutate, isPending } = useUpdateStudent(student.id);
  const deleteTeacher = useDeleteStudent();

  const handleDelete = (id: string) => {
    deleteTeacher.mutate(id, {
      onSuccess: () => {
        toast("Student o‘chirildi", {
          position: "bottom-right",
        });

        client.invalidateQueries({
          queryKey: ["students"],
        });

        setOpen(false);
      },
    });
  };

  useEffect(() => {
    if (data && edit) {
      setFirstName(data.firstName ?? "");
      setLastName(data.lastName ?? "");
      setTgUsername(data.tgUsername ?? "");
      setEmail(data.email ?? "");
      setPhoneNumber(data.phoneNumber ?? "");
    }
  }, [data, edit]);

  // 👉 loader
  if (isLoading) {
    return (
      <div className="p-4">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      {/* ACTION BUTTONS */}
      <div className="grid grid-cols-2 gap-2 p-4">
        <Button
          onClick={() => {
            setOpen(true);
            setEdit(false);
          }}
          variant="outline"
          size="sm"
          className="bg-white"
        >
          <Eye className="h-4 w-4 mr-1" />
          Details
        </Button>

        <Button
          onClick={() => {
            setEdit(true);
            setOpen(true);
          }}
          variant="outline"
          size="sm"
          className="bg-white"
        >
          <Pencil className="h-4 w-4 mr-1" />
          Edit
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="text-orange-600 bg-white"
        >
          <Ban className="h-4 w-4 mr-1" />
          Block
        </Button>

        <Button
          onClick={() => handleDelete(student.id)}
          variant="outline"
          size="sm"
          className="text-red-600 bg-white"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </div>

      {/* DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white max-w-sm rounded-xl text-sm">
          <DialogTitle className="text-center font-bold">
            {edit
              ? "Student edit"
              : data
              ? `${data.firstName} ${data.lastName}`
              : "Student"}
          </DialogTitle>

          {edit ? (
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                mutate(
                  {
                    firstName,
                    lastName,
                    tgUsername,
                    email,
                    phoneNumber,
                  },
                  {
                    onSuccess: () => {
                      toast("Student yangilandi", { position: "top-right" });

                      client.invalidateQueries({
                        queryKey: ["student", student.id],
                      });

                      client.invalidateQueries({
                        queryKey: ["students"],
                      });

                      setEdit(false);
                      setOpen(false);
                    },
                  }
                );
              }}
            >
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
                placeholder="First name"
              />

              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
                placeholder="Last name"
              />

              <input
                value={tgUsername}
                onChange={(e) => setTgUsername(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
                placeholder="Telegram username"
              />

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
                placeholder="Email"
              />

              <input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
                placeholder="Phone number"
              />

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 bg-slate-900 text-white py-2 rounded-md disabled:opacity-50"
                >
                  {isPending ? "Saving..." : "Save"}
                </button>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 border py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-2">
              {[
                ["ID", data?.id],
                ["First Name", data?.firstName],
                ["Last Name", data?.lastName],
                ["Telegram ID", data?.telegramId],
                ["Username", data?.tgUsername],
                ["Phone", data?.phoneNumber],
                ["Email", data?.email],
                ["Created At", data?.createdAt],
                ["Updated At", data?.updatedAt],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between border rounded-md px-3 py-2"
                >
                  <span className="text-gray-500">{label}</span>
                  <span className="font-medium truncate max-w-40">
                    {value ?? "-"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Buttons;
