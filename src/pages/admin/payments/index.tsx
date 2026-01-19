import {
  Download,
  Clock,
  TrendingUp,
  XCircle,
  Search,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetTransaction } from "../service/query/getTransaction";
import LoadingSpinner from "@/components/loading";

const Payments = () => {
  const { data, isLoading } = useGetTransaction();

  const transactions = data?.data ?? [];

  const paid = transactions.filter(t => t.state === "PAID");
  const pending = transactions.filter(t => t.state === "PENDING");
  const cancelled = transactions.filter(t => t.state === "CANCELLED");

  const totalRevenue = paid.reduce(
    (sum, t) => sum + Number(t.amount),
    0
  );

  const pendingAmount = pending.reduce(
    (sum, t) => sum + Number(t.amount),
    0
  );

  const cancelledAmount = cancelled.reduce(
    (sum, t) => sum + Number(t.amount),
    0
  );

  const successRate =
    transactions.length === 0
      ? 0
      : Math.round((paid.length / transactions.length) * 100);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
          <p className="text-sm text-gray-500">
            Manage and monitor all payment transactions
          </p>
        </div>
        <Button variant="outline" className="bg-white gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Summary Cards */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

          {/* Total Revenue */}
          <Card className="border-none shadow-sm">
            <CardContent className="p-5">
              <p className="text-sm font-medium text-gray-500 mb-4">
                Total Revenue
              </p>
              <div className="space-y-1">
                <p className="text-2xl font-bold">
                  {totalRevenue.toLocaleString()} so'm
                </p>
                <p className="text-xs text-gray-400">
                  {paid.length} paid transactions
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Pending */}
          <Card className="border-none shadow-sm">
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-4">
                <p className="text-sm font-medium text-gray-500">
                  Pending Payments
                </p>
                <Clock className="h-4 w-4 text-orange-400" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">
                  {pendingAmount.toLocaleString()} so'm
                </p>
                <p className="text-xs text-gray-400">
                  {pending.length} pending
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Success Rate */}
          <Card className="border-none shadow-sm">
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-4">
                <p className="text-sm font-medium text-gray-500">
                  Success Rate
                </p>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">
                  {successRate}%
                </p>
                <p className="text-xs text-gray-400">
                  {paid.length} of {transactions.length}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Cancelled */}
          <Card className="border-none shadow-sm">
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-4">
                <p className="text-sm font-medium text-gray-500">
                  Canceled
                </p>
                <XCircle className="h-4 w-4 text-red-500" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">
                  {cancelledAmount.toLocaleString()} so'm
                </p>
                <p className="text-xs text-gray-400">
                  {cancelled.length} canceled
                </p>
              </div>
            </CardContent>
          </Card>

        </div>
      )}

      {/* Filters */}
      <Card className="mb-6 border-none shadow-sm">
        <CardContent>
          <div className="flex items-center gap-2 mb-4 text-sm font-medium text-gray-700">
            <Filter className="h-4 w-4" />
            Filters
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by student, teacher, ID..."
              className="pl-9 h-10 border-gray-200 w-375"
            />
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="border-none shadow-sm">
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Transactions
            </h2>
            <span className="text-sm text-gray-400">
              {transactions.length} total transactions
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm font-medium text-gray-500 border-b">
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Student</th>
                  <th className="pb-3">Teacher</th>
                  <th className="pb-3 text-right">Amount</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Provider</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  transactions.map(transaction => (
                    <tr
                      key={transaction.id}
                      className="border-b text-sm hover:bg-gray-50"
                    >
                      <td className="py-4">
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4">
                        {transaction.student.firstName}{" "}
                        {transaction.student.lastName}
                      </td>
                      <td className="py-4 text-gray-600">
                        {transaction.lesson.teacherId}
                      </td>
                      <td className="py-4 text-right font-medium">
                        {Number(transaction.amount).toLocaleString()} so'm
                      </td>
                      <td className="py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            transaction.state === "PAID"
                              ? "bg-green-100 text-green-700"
                              : transaction.state === "PENDING"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {transaction.state}
                        </span>
                      </td>
                      <td className="py-4">
                        {transaction.provider}
                      </td>
                      <td className="py-4 text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-10 text-center text-gray-400"
                    >
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6 pt-6 border-t">
            <div className="text-sm text-gray-500">
              Showing <b>1</b> to <b>{transactions.length}</b> of{" "}
              <b>{transactions.length}</b> results
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Show:</span>
              <Select defaultValue="20">
                <SelectTrigger className="w-32 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 per page</SelectItem>
                  <SelectItem value="20">20 per page</SelectItem>
                  <SelectItem value="50">50 per page</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payments;
