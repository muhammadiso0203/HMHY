import { Card, CardContent } from "@/components/ui/card";
import {
    CheckCircle2,
    XCircle,
    AlertTriangle,
    Wallet,
} from "lucide-react";
import { useGetPaymentStatistic } from "../service/query/useGetPaymentStatistic";
import { useGetPayments } from "../service/query/useGetPayments";

const Payments = () => {
    const { data } = useGetPaymentStatistic()
    const { data: data2 } = useGetPayments()
    return (
        <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
            {/* HEADER */}
            <div>
                <h1 className="text-xl font-semibold text-slate-900">
                    To‘lovlarim
                </h1>
                <p className="text-sm text-slate-500">
                    O‘tkazilgan to‘lovlar va statistika
                </p>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* PAID */}
                <Card>
                    <CardContent className="p-5 space-y-3">
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            To‘langan
                        </div>
                        <div className="text-2xl font-semibold text-emerald-600">
                            {data?.totalPaid?.amount} so‘m
                        </div>
                        <p className="text-xs text-slate-500">{data?.totalPaid?.count} ta to‘lov</p>
                    </CardContent>
                </Card>

                {/* UNPAID */}
                <Card>
                    <CardContent className="p-5 space-y-3">
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <AlertTriangle className="w-4 h-4 text-orange-500" />
                            To‘lanmagan
                        </div>
                        <div className="text-2xl font-semibold text-orange-500">
                            {data?.totalUnpaid?.amount} so‘m
                        </div>
                        <p className="text-xs text-slate-500">{data?.totalUnpaid?.count} ta dars</p>
                    </CardContent>
                </Card>

                {/* CANCELED */}
                <Card>
                    <CardContent className="p-5 space-y-3">
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <XCircle className="w-4 h-4 text-red-500" />
                            Bekor qilingan
                        </div>
                        <div className="text-2xl font-semibold text-red-500">
                            {data?.canceled?.amount} so‘m
                        </div>
                        <p className="text-xs text-slate-500">{data?.canceled?.count} ta dars</p>
                    </CardContent>
                </Card>
            </div>

            {/* HISTORY */}
            <Card>
                <CardContent className="p-6 space-y-6">
                    <div>
                        <h2 className="text-sm font-semibold text-slate-900">
                            To‘lovlar tarixi
                        </h2>
                        <p className="text-xs text-slate-500">
                            Sizga amalga oshirilgan barcha to‘lovlar ro‘yxati
                        </p>
                    </div>

                    {/* PAYMENTS LIST */}
                    {data2 && data2.length > 0 ? (
                        <div className="space-y-4">
                            {data2.map((payment) => (
                                <div
                                    key={payment.id}
                                    className="flex items-center justify-between border rounded-lg p-4 bg-white"
                                >
                                    {/* LEFT */}
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-slate-900">
                                            {payment.notes}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            {new Date(payment.paidAt).toLocaleDateString()}
                                        </p>
                                    </div>

                                    {/* CENTER */}
                                    <div className="text-sm text-slate-600">
                                        {payment.lessons.length} ta dars
                                    </div>

                                    {/* RIGHT */}
                                    <div className="text-right">
                                        <p className="font-semibold text-slate-900">
                                            {payment.teacherAmount.toLocaleString()} so‘m
                                        </p>
                                        <p
                                            className={`text-xs ${payment.isCanceled ? "text-red-500" : "text-emerald-600"
                                                }`}
                                        >
                                            {payment.isCanceled ? "Bekor qilingan" : "To‘langan"}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* EMPTY STATE */
                        <div className="flex flex-col items-center justify-center py-20 text-center text-slate-500">
                            <div className="p-2 bg-gray-100 rounded-[10px] mb-2">
                                <Wallet className="w-5 h-5 text-gray-400" />
                            </div>
                            <p className="font-bold text-sm text-gray-600">
                                To‘lovlar topilmadi
                            </p>
                            <p className="text-xs">
                                To‘lovlar ro‘yxati bo‘sh
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

        </div>
    );
}


export default Payments;