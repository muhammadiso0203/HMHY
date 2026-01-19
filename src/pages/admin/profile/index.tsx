import { User, Phone, Calendar, Pencil, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useGetProfile } from "../service/query/useGetProfile";
import { useUpdateMe } from "../service/mutation/useUpdateMe";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const Profile = () => {
  const queryClient = useQueryClient();

  const { data } = useGetProfile();
  const { mutate, isPending } = useUpdateMe();

  /* ===== Edit Profile ===== */
  const [openEdit, setOpenEdit] = useState(false);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");

  /* ===== Change Password ===== */
  const [openPassword, setOpenPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  /* data kelganda edit inputlarga joylaymiz */
  useEffect(() => {
    if (data) {
      setUsername(data.username ?? "");
      setPhone(data.phoneNumber ?? "");
    }
  }, [data]);

  /* ===== Update Profile ===== */
  const handleUpdateProfile = () => {
    mutate(
      {
        username,
        phoneNumber: phone,
      },
      {
        onSuccess: () => {
          toast.success("Profile updated successfully");
          queryClient.invalidateQueries({ queryKey: ["profile"] });
          setOpenEdit(false);
        },
        onError: () => {
          toast.error("Failed to update profile");
        },
      }
    );
  };

  /* ===== Change Password ===== */
  const handleChangePassword = () => {
    mutate(
    {
      password: currentPassword,
      newPassword,
    },
    {
      onSuccess: () => {
        toast.success("Password changed successfully");
        setOpenPassword(false);
      },
      onError: () => {
        toast.error("Wrong current password");
      },
    }
  );
    setOpenPassword(false);
    setCurrentPassword("");
    setNewPassword("");
  };

  return (
    <div className="p-4">
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">My Profile</h1>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="gap-2 bg-white"
            onClick={() => setOpenEdit(true)}
          >
            <Pencil className="h-4 w-4" />
            Edit Profile
          </Button>

          <Button
            variant="outline"
            className="gap-2 bg-white"
            onClick={() => setOpenPassword(true)}
          >
            <Lock className="h-4 w-4" />
            Change Password
          </Button>
        </div>
      </div>

      {/* ===== Profile Card ===== */}
      <Card className="p-6 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 font-medium mb-6">
          <User className="h-4 w-4" />
          Profile Information
        </div>

        {/* Username */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
            <User className="w-4 h-4" /> Username
          </p>
          <p className="font-medium bg-gray-100 p-2 rounded-lg border">
            {data?.username || "—"}
          </p>
        </div>

        {/* Phone */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
            <Phone className="w-4 h-4" /> Phone
          </p>
          <p className="font-medium bg-gray-100 p-2 rounded-lg border">
            {data?.phoneNumber || "—"}
          </p>
        </div>

        {/* Role */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-1">Role</p>
          <span className="inline-block px-3 py-1 text-sm rounded-lg bg-blue-50 text-blue-600 font-medium">
            {data?.role}
          </span>
        </div>

        {/* Dates */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
            <Calendar className="w-4 h-4" /> Member Since
          </p>
          <p className="font-medium bg-gray-100 p-2 rounded-lg border">
            {data?.createdAt
              ? new Date(data.createdAt).toLocaleString()
              : "—"}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-1">Last Updated</p>
          <p className="font-medium bg-gray-100 p-2 rounded-lg border">
            {data?.updatedAt
              ? new Date(data.updatedAt).toLocaleString()
              : "—"}
          </p>
        </div>
      </Card>

      {/* ===== EDIT PROFILE MODAL ===== */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm mb-1 block">Username</label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm mb-1 block">Phone</label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEdit(false)}>
              Cancel
            </Button>
            <Button disabled={isPending} onClick={handleUpdateProfile}>
              {isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ===== CHANGE PASSWORD MODAL ===== */}
      <Dialog open={openPassword} onOpenChange={setOpenPassword}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm mb-1 block">Current Password</label>
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm mb-1 block">New Password</label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setOpenPassword(false);
                setCurrentPassword("");
                setNewPassword("");
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleChangePassword}
              disabled={!currentPassword || !newPassword}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
