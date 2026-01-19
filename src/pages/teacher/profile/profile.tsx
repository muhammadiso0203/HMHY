import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Phone,
  User,
} from "lucide-react";
import { useGetProfileTeacher } from "../service/query/useGetProfileTeacher";

const TeacherProfile = () => {
  const { data } = useGetProfileTeacher();

  return (
    <div className="mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Profile</h1>
      </div>

      {/* Profile Card */}
      <Card className="border rounded-xl">
        <CardContent className="p-6 space-y-6">
          {/* Section title */}
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <User size={16} />
            <span>Profile Information</span>
          </div>

          {/* Avatar */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              {data?.image ? (
                <AvatarImage src={data.image} />
              ) : (
                <AvatarFallback>
                  {data?.fullName?.charAt(0)}
                </AvatarFallback>
              )}
            </Avatar>

            <div>
              <h2 className="text-lg font-semibold">{data?.fullName}</h2>
              <Badge className="mt-1">{data?.role}</Badge>
            </div>
          </div>

          {/* Fields */}
          <div className="space-y-5">
            {/* Username */}
            <div>
              <label className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                <User size={14} /> Username
              </label>
              <div className="bg-gray-100 rounded-md px-3 py-2">
                {data?.fullName}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                <Phone size={14} /> Phone
              </label>
              <div className="bg-gray-100 rounded-md px-3 py-2">
                {data?.phoneNumber}
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                Role
              </label>
              <Badge variant="secondary">{data?.role}</Badge>
            </div>

            {/* Member Since */}
            <div>
              <label className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                <Calendar size={14} /> Member Since
              </label>
              <div className="bg-gray-100 rounded-md px-3 py-2">
                {new Date(data?.createdAt || "").toLocaleString()}
              </div>
            </div>

            {/* Last Updated */}
            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                Last Updated
              </label>
              <div className="bg-gray-100 rounded-md px-3 py-2">
                {new Date(data?.updatedAt || "").toLocaleString()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherProfile;
