import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import { useGetAllAdmin } from "../service/query/getAllAdmin";
import { useGetAdmin } from "../service/query/getAdminById";
import { useCreateAdmin } from "../service/mutation/useCreateAdmin";
import { useUpdateAdmin } from "../service/mutation/useUpdateAdmin";
import { useDeleteAdmin } from "../service/mutation/useDeleteAdmin";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

/* ===== TYPES ===== */
type ModalMode = "DETAIL" | "EDIT" | "CREATE" | null;

const Admins = () => {
  const queryClient = useQueryClient();
  const token = Cookies.get("token");

  /* ===== AUTH ===== */
  const decodedToken = token ? jwtDecode<{ role: string }>(token) : null;
  const userRole = decodedToken?.role;

  /* ===== STATE ===== */
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedAdminId, setSelectedAdminId] = useState<string | undefined>();

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");

  /* ===== QUERIES ===== */
  const { data: admins } = useGetAllAdmin();

  const { data: adminDetails, isLoading } = useGetAdmin(
    modalMode && modalMode !== "CREATE" ? selectedAdminId : undefined
  );

  /* ===== MUTATIONS ===== */
  const { mutate: createAdmin, isPending: creating } = useCreateAdmin();
  const { mutate: updateAdmin, isPending: updating } = useUpdateAdmin(
    selectedAdminId ?? ""
  );
  const { mutate: deleteAdmin } = useDeleteAdmin();

  /* ===== HELPERS ===== */
  const resetForm = () => {
    setUsername("");
    setPhone("");
    setPassword("");
  };

  /* ===== AUTO SWITCH: DETAIL YO‘Q → EDIT ===== */
  useEffect(() => {
    if (modalMode === "DETAIL" && adminDetails === null) {
      setModalMode("EDIT");
    }
  }, [adminDetails, modalMode]);

  /* ===== HANDLERS ===== */
  const handleCreate = () => {
    createAdmin(
      { username, phoneNumber: phone, password },
      {
        onSuccess: () => {
          toast("Admin qo‘shildi");
          queryClient.invalidateQueries({ queryKey: ["admins"] });
          setModalMode(null);
          resetForm();
        },
      }
    );
  };

  const handleUpdate = () => {
    if (!selectedAdminId) return;

    updateAdmin(
      {
        username,
        phoneNumber: phone || undefined,
        password: password || undefined,
      },
      {
        onSuccess: () => {
          toast("Admin yangilandi");
          queryClient.invalidateQueries({ queryKey: ["admins"] });
          setModalMode(null);
          setSelectedAdminId(undefined);
          resetForm();
        },
      }
    );
  };

  const handleDelete = (id: string) => {
    deleteAdmin(id, {
      onSuccess: () => {
        toast("Admin o‘chirildi");
        queryClient.invalidateQueries({ queryKey: ["admins"] });
      },
    });
  };

  const onlyAdmins = admins?.filter((a) => a.role === "ADMIN");

  const filteredAdmin = onlyAdmins?.filter((admin) => {
    const admins = search.trim();
    return (
      admin.username.toLowerCase().includes(admins) ||
      (admin.phoneNumber?.includes(admins) ?? false)
    );
  });

  /* ===== RENDER ===== */
  return (
    <div className="p-4 w-400">
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold">Admins</h1>

        <div className="flex-1 ">
          <Input
            placeholder="Search..."
            className="h-8 bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {userRole === "SUPER_ADMIN" && (
          <Button onClick={() => setModalMode("CREATE")}>+ Add Admin</Button>
        )}
      </div>

      {/* LIST */}
      <div className="mt-8 space-y-3">
        {filteredAdmin?.map((admin) => (
          <Card key={admin.id} className="h-20">
            <CardContent className="flex justify-between items-center h-full px-5">
              <div className="flex gap-4 items-center">
                <Avatar>
                  <AvatarFallback>
                    {admin.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <div className="flex gap-2 items-center">
                    <b>{admin.username}</b>
                    <Badge>{admin.role}</Badge>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone size={14} />
                    {admin.phoneNumber ?? "-"}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedAdminId(admin.id);
                    setModalMode("DETAIL");
                  }}
                >
                  More
                </Button>

                {userRole === "SUPER_ADMIN" && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedAdminId(admin.id);
                        setUsername(admin.username);
                        setPhone(admin.phoneNumber ?? "");
                        setPassword("");
                        setModalMode("EDIT");
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(admin.id)}
                    >
                      Delete
                    </Button>
                  </>
                )}

              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ===== ONE MODAL ===== */}
      <Dialog
        open={!!modalMode}
        onOpenChange={(v) => {
          if (!v) {
            setModalMode(null);
            setSelectedAdminId(undefined);
            resetForm();
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {modalMode === "CREATE"
                ? "Add Admin"
                : modalMode === "EDIT"
                  ? "Edit Admin"
                  : "Admin Details"}
            </DialogTitle>
          </DialogHeader>

          {/* LOADING */}
          {isLoading && modalMode !== "CREATE" ? (
            <p>Loading...</p>
          ) : modalMode === "DETAIL" && adminDetails ? (
            /* ===== DETAILS ===== */
            <div className="space-y-2 text-sm">
              <Row label="ID" value={adminDetails.id} />
              <Row label="Username" value={adminDetails.username} />
              <Row label="Phone" value={adminDetails.phoneNumber ?? "-"} />
              <Row label="Role" value={adminDetails.role} />
              <Row label="Created At" value={adminDetails.createdAt} />
            </div>
          ) : (
            /* ===== CREATE / EDIT FORM ===== */
            <div className="space-y-3">
              <Input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <Input
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <Input
                type="password"
                placeholder={
                  modalMode === "EDIT" ? "New password (optional)" : "Password"
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                disabled={creating || updating}
                onClick={modalMode === "CREATE" ? handleCreate : handleUpdate}
              >
                {creating || updating ? "Saving..." : "Save"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admins;

/* ===== HELPER ===== */
const Row = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex justify-between border rounded px-3 py-2">
    <span className="text-gray-500">{label}</span>
    <span className="truncate max-w-[220px]">{value}</span>
  </div>
);
