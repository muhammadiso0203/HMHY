import LoadingSpinner from '@/components/loading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getLesson } from '@/pages/admin/service/query/getLesson'
import { Clock, Video } from 'lucide-react'

const LessonList = () => {
  const { data, isLoading } = getLesson()
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

      {isLoading ? <><LoadingSpinner /></> : <>
        {data?.data?.map((lesson) => (
          <Card key={lesson.id} className="rounded-xl">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <Badge
                  className={
                    lesson.status === "AVAILABLE"
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
                <div className="flex items-center gap-2 text-blue-600">
                  <Video size={14} />
                  {lesson.googleMeetsUrl}
                </div>
              </div>

              <Button variant="outline" className="w-full">
                Darsga qo‘shilish
              </Button>
            </CardContent>
          </Card>
        ))}
      </>}

    </div >
  )
}

export default LessonList;