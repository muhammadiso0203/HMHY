import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  UserCheck,
  UserX,
  Search,
  Eye,
  Pencil,
  Trash2,
  Ban,
} from "lucide-react";
import { useGetStudentStats } from "../service/query/getStudentStats";
import LoadingSpinner from "@/components/loading";
import { useGetStudents } from "../service/query/getStudents";
import type { IStudent, QueryTYpe } from "../types";

const Student = () => {
  const { data, isLoading } = useGetStudentStats();
  const { data: data2, isLoading: isLoading2 }:QueryTYpe<IStudent[]> = useGetStudents();
  

  return (
    <>
      {isLoading ? (
        <>
          <LoadingSpinner />
        </>
      ) : (
        <>
          <div className="w-403 p-6 space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-2xl font-semibold">Students</h1>
              <p className="text-sm text-muted-foreground">
                Manage student accounts and permissions
              </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="h-5 w-5" />
                    <p className="text-sm font-medium">Total Students</p>
                  </div>
                  <p className="text-3xl font-semibold">{data?.data.total}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    All registered students
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <UserCheck className="h-5 w-5 text-green-600" />
                    <p className="text-sm font-medium">Active Students</p>
                  </div>
                  <p className="text-3xl font-semibold text-green-600">
                    {data?.data.active}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Can access the platform
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <UserX className="h-5 w-5 text-red-600" />
                    <p className="text-sm font-medium">Blocked Students</p>
                  </div>
                  <p className="text-3xl font-semibold text-red-600">
                    {data?.data.blocked}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Access restricted
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Search className="h-4 w-4" />
                  Filters & Search
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    className="pl-9"
                    placeholder="Search by name, phone, telegram ID..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Students List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Students List ({data2?.length ?? 0})
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {isLoading2 ? (
                  <LoadingSpinner />
                ) : !data2 || data2.length === 0 ? (
                  <p className="text-center text-muted-foreground">
                    No students found
                  </p>
                ) : (
                  data2?.map((student) => (
                    <div
                      key={student.id}
                      className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">
                            {student.firstName} {student.lastName}
                          </h3>
                          <Badge
                            className={
                              student.isBlocked
                                ? "bg-red-100 text-red-700"
                                : "bg-green-100 text-green-700"
                            }
                          >
                            {student.isBlocked ? "Blocked" : "Active"}
                          </Badge>
                        </div>

                        <div className="text-sm text-muted-foreground">
                          <p>Telegram ID: {student.telegramId ?? "-"}</p>
                          <p>Username: {student.tgUsername ?? "-"}</p>
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground">
                        <p>Phone: {student.phoneNumber}</p>
                        <p>
                          Joined:
                          {student.createdAt
                            ? new Date(student.createdAt).toLocaleDateString()
                            : "-"}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-orange-600"
                        >
                          <Ban className="h-4 w-4 mr-1" />
                          Block
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

export default Student;
