import MyLessons from "@/pages/teacher/lessons/lessons";
import TeacherLessons from "@/pages/teacher/my-lesson/lesson";
import TeacherProfile from "@/pages/teacher/profile/profile";

export default [
    {
        path: 'my-lessons',
        page: MyLessons,
    },
    {
        path: 'profile',
        page: TeacherProfile,
    },
    {
        path: 'schedule',
        page: TeacherLessons,
    }
]