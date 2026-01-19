import { TrendingUp, CheckCircle, XCircle, CreditCard, Search } from "lucide-react";
import { useTotalPayments } from "../service/query/getTotalPayments";
import { Button } from "@/components/ui/button";
import { getTeachers } from "../service/query/getTeachers";

const Earnings = () => {
  const { data, isLoading } = useTotalPayments()
  const { data: data2 = [] } = getTeachers()

  if (isLoading) {
    return (
      <div className=" p-4">
        <div className="mb-4">
          <h1 className="text-xl font-semibold">Ustoz To'lovlari</h1>
          <p className="text-sm text-muted-foreground">
            Ustozlarga to'lov qilish va to'lovlar tarixini ko'rish
          </p>
        </div>
        <div className="text-center py-8">Yuklanmoqda...</div>
      </div>
    )
  }

  return (
    <div className=" p-4">
      {/* Title */}
      <div className="mb-4">
        <h1 className="text-xl font-semibold">Ustoz To'lovlari</h1>
        <p className="text-sm text-muted-foreground">
          Ustozlarga to'lov qilish va to'lovlar tarixini ko'rish
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-3">
        {/* Jami to'lanmagan */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-2 text-sm font-medium mb-3 h-15">
            <div className="flex flex-col">
              Jami to'lanmagan
              <TrendingUp className="h-4 w-4 text-orange-500" />
            </div>
          </div>

          <p className="text-2xl font-semibold text-orange-600">
            {data?.totalUnpaid?.amount?.toLocaleString() ?? 0} so'm
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {data?.totalUnpaid?.count ?? 0} ta dars
          </p>
        </div>

        {/* Jami to'langan */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-2 text-sm font-medium mb-3 h-15">
            <div className="flex flex-col">
              Jami to'langan
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
          </div>

          <p className="text-2xl font-semibold text-green-600">
            {data?.totalPaid?.amount?.toLocaleString() ?? 0} so'm
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {data?.totalPaid?.count ?? 0} ta to'lov
          </p>
        </div>

        {/* Bekor qilingan */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-2 text-sm font-medium mb-3 h-15">
            <div className="flex flex-col">
              Bekor qilingan
              <XCircle className="h-4 w-4 text-red-500" />
            </div>
          </div>

          <p className="text-2xl font-semibold text-red-600">
            {data?.canceled?.amount?.toLocaleString() ?? 0} so'm
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {data?.canceled?.count ?? 0} ta to'lov
          </p>
        </div>
      </div>

      <div className="min-h-screen mt-5">
        <div className="bg-white rounded-xl shadow-sm p-5">
          {/* Header */}
          <div className="mb-4">
            <h1 className="text-lg font-semibold">Ustozlar ro‘yxati</h1>
            <p className="text-sm text-muted-foreground">
              8 ta ustoz · Ustozni tanlang va to‘lov sahifasiga o‘ting
            </p>
          </div>

          {/* Search */}
          <div className="flex gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Ustoz nomini qidiring..."
                className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm"
              />
            </div>

            <select className="border rounded-lg px-3 text-sm">
              <option>Barchasi</option>
            </select>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-6 text-sm font-medium border-b pb-2">
            <span>Ustoz</span>
            <span>Karta raqami</span>
            <span>To‘lanmagan</span>
            <span>To‘langan</span>
            <span>Bekor qilingan</span>
            <span className="text-right">Amallar</span>
          </div>

          {/* Rows */}
          <div className="divide-y">
            {data2?.map((teacher) => (
              <div
                key={teacher.id}
                className="grid grid-cols-6 items-center py-3 text-sm"
              >
                {/* Teacher */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#6b4b3e] text-white flex items-center justify-center font-medium">
                    {teacher.fullName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{teacher.fullName}</p>
                    <p className="text-xs text-muted-foreground">
                      {teacher.email}
                    </p>
                  </div>
                </div>

                {/* Card */}
                <div>
                  {teacher.cardNumber ? (
                    <span className="px-2 py-1 text-xs border rounded-full">
                      {teacher.cardNumber}
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs bg-gray-100 rounded-full">
                      Kiritilmagan
                    </span>
                  )}
                </div>

                {/* Unpaid */}
                <div>
                  <p className="text-orange-600 font-medium">{data?.totalUnpaid?.amount?.toLocaleString()} so'm</p>
                  <p className="text-xs text-muted-foreground">{data?.totalUnpaid?.count} ta dars</p>
                </div>

                {/* Paid */}
                <div>
                  <p className="text-green-600 font-medium">{data?.totalPaid?.amount?.toLocaleString()} so'm</p>
                  <p className="text-xs text-muted-foreground">{data?.totalPaid?.count} ta to‘lov</p>
                </div>

                {/* Canceled */}
                <div>
                  <p className="text-red-600 font-medium">{data?.canceled?.amount?.toLocaleString()} so‘m</p>
                  <p className="text-xs text-muted-foreground">{data?.canceled?.count} ta</p>
                </div>

                {/* Action */}
                <div className="text-right">
                  <Button size="sm" className="gap-2">
                    <CreditCard className="h-4 w-4" />
                    To‘lov qilish
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Earnings;
