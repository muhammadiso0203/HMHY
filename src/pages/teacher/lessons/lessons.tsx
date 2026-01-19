import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Calendar,
  Clock,
  Layers,

} from "lucide-react";
import { getLessonStats } from "../service/query/getLessonStats";
import LoadingSpinner from "@/components/loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetLesson } from "@/pages/admin/service/query/getLessons";
import { Link } from "react-router";





const MyLessons = () => {
  const { data } = getLessonStats()
  const { data: data2, isLoading } = useGetLesson()

  return (
    <>

      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold flex items-center gap-2">
              <BookOpen size={22} />
              Mening Darslarim
            </h1>
            <p className="text-sm text-gray-500">
              O‘quvchilar tomonidan band qilingan darslar ro‘yxati
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-blue-600 font-medium">JAMI DARSLAR</p>
                <h2 className="text-2xl font-bold">{data?.data?.totalLessons}</h2>
              </div>
              <BookOpen className="text-blue-500" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-green-600 font-medium">BAND DARSLAR</p>
                <h2 className="text-2xl font-bold">{data?.data?.bookedLessons}</h2>
              </div>
              <Calendar className="text-green-500" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-purple-600 font-medium">SAHIFA</p>
                <h2 className="text-2xl font-bold">{data?.data?.totalPages}</h2>
              </div>
              <Layers className="text-purple-500" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {isLoading ? <><LoadingSpinner /></> : <>
            {data2?.map((lesson) => (
              <Card key={lesson.id} className="rounded-xl">
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge
                      className={
                        lesson.status === "available"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }
                    >
                      {lesson.status}
                    </Badge>
                    <div className="text-right">
                      <p className="font-semibold">{lesson.price}</p>
                      <p className="text-xs text-gray-400">NARXI</p>
                    </div>
                  </div>

                  <h3 className="font-semibold text-lg">{lesson.name}</h3>

                  <div className="text-sm text-gray-500 space-y-1">
                    <div className="flex items-center gap-2">
                      <Clock size={14} />
                      {lesson.startTime}
                    </div>
                  </div>
                  <Link to={lesson.googleMeetsUrl}>
                    <Button variant="outline" className="w-full">
                      Darsga qo‘shilish
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </>}

        </div >
        {/* <LessonList /> */}


      </div>
    </>
  );
};

export default MyLessons;
