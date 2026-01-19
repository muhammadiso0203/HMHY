import MyLessons from "@/pages/teacher/lessons/lessons";
import TeacherLessons from "@/pages/teacher/my-lesson/lesson";
import Payments from "@/pages/teacher/payments/payments";
import TeacherProfile from "@/pages/teacher/profile/profile";

export default [
    {
        path: 'my-lessons',
        page: MyLessons,
    },
    {
        path: 'schedule',
        page: TeacherLessons,
    },
    {
        path: 'payments',
        page: Payments,
    },
    {
        path: 'profile',
        page: TeacherProfile,
    },
]