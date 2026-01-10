import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useGetTeacherById } from "@/pages/admin/service/query/getTeacherById";
import { useUpdateTeacher } from "@/pages/admin/service/mutation/useUpdateTeacher";

export const TeacherActions = ({ teacher, handleDelete }: any) => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  // backend endpointlar
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [expirence, setExpirence] = useState("");
  const [hourPrice, setHourPrice] = useState(0);
  const [level, setLevel] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [specification, setSpecification] = useState("");

  const { data } = useGetTeacherById(open ? teacher.id : undefined);
  const { mutate: updateTeacherMutate } = useUpdateTeacher(teacher.id);

  useEffect(() => {
    if (data && edit) {
      setFullName(data.fullName ?? "");
      setPhoneNumber(data.phoneNumber ?? "");
      setDescription(data.description ?? "");
      setExpirence(data.expirence ?? "");
      setHourPrice(data.hourPrice ?? 0);
      setLevel(data.level ?? "");
      setCardNumber(data.cardNumber ?? "");
      setPortfolioLink(data.portfolioLink ?? "");
      setSpecification(data.specification ?? "");
    }
  }, [data, edit]);

  return (
    <>
      {/* BUTTONS */}
      <div className="flex gap-2">
        <button
          onClick={() => {
            setOpen(true);
            setEdit(false);
          }}
          className="px-3 py-1.5 border rounded-md text-sm hover:bg-gray-100"
        >
          More
        </button>

        <button className="px-3 py-1.5 border rounded-md text-sm hover:bg-gray-100">
          Deactivate
        </button>

        <button
          onClick={() => {
            setOpen(true);
            setEdit(true);
          }}
          className="px-3 py-1.5 border rounded-md text-sm hover:bg-gray-100"
        >
          Edit
        </button>

        <button
          onClick={() => handleDelete(teacher.id)}
          className="px-3 py-1.5 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
        >
          Delete
        </button>
      </div>

      {/* MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className=" bg-white max-w-sm rounded-xl text-sm">
          <DialogTitle className="text-center font-bold">
            {edit ? "Teacher edit" : <>{teacher.fullName}</>}
          </DialogTitle>

          {edit ? (
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                updateTeacherMutate(
                  {
                    fullName,
                    phoneNumber,
                    description,
                    expirence,
                    hourPrice,
                    level,
                    cardNumber,
                    portfolioLink,
                    specification,
                  },
                  {
                    onSuccess: () => {
                      setEdit(false);
                      setOpen(false);
                    },
                  }
                );
              }}
            >
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
                placeholder="Full name"
              />

              <input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
                placeholder="Phone "
              />

              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
                placeholder="Bio"
              />
              <input
                value={expirence}
                onChange={(e) => setExpirence(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
                placeholder="Exprience"
              />
              <input
                type="number"
                value={hourPrice}
                onChange={(e) => setHourPrice(+e.target.value)}
                className="w-full border rounded-md px-3 py-2"
                placeholder="HourPrice"
              />
              <input
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
                placeholder="Level"
              />
              <input
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
                placeholder="9860600011112211"
              />
              <input
                value={portfolioLink}
                onChange={(e) => setPortfolioLink(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
                placeholder="PortfolioLink"
              />
              <input
                value={specification}
                onChange={(e) => setSpecification(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
                placeholder="Specification"
              />

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-slate-900 text-white py-2 rounded-md"
                >
                  Save
                </button>

                <button
                  type="button"
                  onClick={() => {setOpen(false)}}
                  className="flex-1 border py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="flex justify-center py-3">
                <div className="h-16 w-16 rounded-full bg-amber-800 text-white flex items-center justify-center text-xl font-bold">
                  {teacher.imageUrl ? (
                    <img alt="teacherImage" src={teacher?.imageUrl} />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-amber-800 text-white flex items-center justify-center text-xl font-bold">
                      {teacher?.fullName?.[0]}
                    </div>
                  )}
                </div>
              </div>

              {[
                ["ID", data?.id],
                ["Email", data?.email],
                ["Phone", data?.phoneNumber],
                ["O'qitiladigan til", data?.specification],
                ["Level", data?.level],
                ["Rating", data?.rating],
                ["Experience", `${data?.expirence} year`],
                ["Soatlik narx", `${data?.hourPrice} so'm`],
                ["Faol", data?.isActive ? "Ha" : "Yo‘q"],
                ["Yaratilgan", data?.createdAt],
                ["Yaratilmagan", data?.updatedAt],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between border border-gray-400 rounded-md px-3 py-2"
                >
                  <span className="text-gray-500">{label}</span>
                  <span className="font-medium truncate max-w-40">{value}</span>
                </div>
              ))}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
