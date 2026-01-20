import { useEffect, useMemo, useState } from "react";
import { useGetTeacherLessons } from "../service/query/useGetLessons";
import { useCreateLesson } from "../service/mutation/useCreateLesson";
import { useGetProfileTeacher } from "../service/query/useGetProfileTeacher";
import type { ILessons } from "@/pages/admin/types";
import { toast } from "sonner";
import { HeaderAndDays } from "./components/HeaderAndDays";
import { SummaryCard } from "./components/SummaryCard";
import { LessonsOrCreate } from "./components/LessonsOrCreate";

const formatDateKey = (date: string) =>
    new Date(date).toISOString().split("T")[0];

const formatFullDate = (date: string) =>
    new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(new Date(date));

const formatTime = (date: string) =>
    new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(date));

const buildLessonMap = (lessons: ILessons[]) => {
    return lessons.reduce<Record<string, ILessons[]>>((acc, lesson) => {
        const key = formatDateKey(lesson.startTime);
        acc[key] = acc[key] || [];
        acc[key].push(lesson);
        return acc;
    }, {});
};

const TeacherLessons = () => {
    const {
        data: lessons = [],
        isLoading,
        isError,
        refetch,
    } = useGetTeacherLessons();
    const {
        mutateAsync: createLesson,
        isPending: isCreating,
        isError: isCreateError,
    } = useCreateLesson();

    const { data: teacherProfile } = useGetProfileTeacher();

    const lessonMap = useMemo(() => buildLessonMap(lessons), [lessons]);

    // Bugundan boshlab 7 kunlik massiv (kechagi kunlar chiqmaydi)
    const days = useMemo(
        () =>
            Array.from({ length: 7 }, (_, i) => {
                const d = new Date();
                d.setDate(d.getDate() + i);
                const key = d.toISOString().split("T")[0];
                return { key, date: d };
            }),
        []
    );

    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [showCreate, setShowCreate] = useState(false);
    const [startHour, setStartHour] = useState("09");
    const [startMinute, setStartMinute] = useState("00");
    const [endHour, setEndHour] = useState("10");
    const [endMinute, setEndMinute] = useState("00");
    const [formError, setFormError] = useState<string | null>(null);
    const [lessonName, setLessonName] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        if (!selectedDate && days.length) {
            setSelectedDate(days[0].key);
        }
    }, [days, selectedDate]);

    const selectedLessons = selectedDate ? lessonMap[selectedDate] || [] : [];
    const durationLabel: string | null = useMemo(() => {
        if (!selectedDate) return null;
        const start = new Date(`${selectedDate}T${startHour}:${startMinute}:00`);
        const end = new Date(`${selectedDate}T${endHour}:${endMinute}:00`);
        const diffMs = end.getTime() - start.getTime();
        if (Number.isNaN(diffMs) || diffMs <= 0) return null;
        const totalMinutes = Math.floor(diffMs / 60000);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours ? `${hours}h ` : ""}${minutes}m`.trim();
    }, [selectedDate, startHour, startMinute, endHour, endMinute]);

    const handleCreateLesson = async () => {
        if (!selectedDate) {
            setFormError("Please select a date first.");
            return;
        }

        if (!teacherProfile?.id) {
            setFormError("Teacher ma'lumoti topilmadi. Qayta login qilib ko‘ring.");
            return;
        }

        if (!lessonName.trim()) {
            setFormError("Dars nomini kiriting.");
            return;
        }

        const numericPrice = Number(price);
        if (!numericPrice || numericPrice <= 0) {
            setFormError("Narxni to‘g‘ri kiriting.");
            return;
        }

        const start = new Date(`${selectedDate}T${startHour}:${startMinute}:00`);
        const end = new Date(`${selectedDate}T${endHour}:${endMinute}:00`);

        if (end <= start) {
            setFormError("End time must be after start time.");
            return;
        }

        setFormError(null);
        try {
            await createLesson({
                name: lessonName.trim(),
                price: numericPrice,
                startTime: start.toISOString(),
                endTime: end.toISOString(),
                teacherId: teacherProfile.id,
            });
            toast.success("Dars yaratildi");
            setShowCreate(false);
            setLessonName("");
            setPrice("");
            refetch();

        } catch (error) {
            toast.error("Dars yaratilmadi")
        }
    };

    const hourOptions = Array.from({ length: 24 }, (_, i) =>
        String(i).padStart(2, "0")
    );
    const minuteOptions = ["00", "15", "30", "45"];

    return (
        <div className="space-y-6">
            <HeaderAndDays
                days={days}
                isLoading={isLoading}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
            />

            <SummaryCard
                selectedDate={selectedDate}
                isLoading={isLoading}
                hasLessons={!!selectedLessons.length}
                isError={isError}
                formatFullDate={formatFullDate}
                onOpenCreate={() => setShowCreate(true)}
            />

            <LessonsOrCreate
                isLoading={isLoading}
                showCreate={showCreate}
                selectedDate={selectedDate}
                selectedLessons={selectedLessons}
                durationLabel={durationLabel}
                formError={formError}
                isCreateError={isCreateError}
                isCreating={isCreating}
                hourOptions={hourOptions}
                minuteOptions={minuteOptions}
                startHour={startHour}
                startMinute={startMinute}
                endHour={endHour}
                endMinute={endMinute}
                setStartHour={setStartHour}
                setStartMinute={setStartMinute}
                setEndHour={setEndHour}
                setEndMinute={setEndMinute}
                setShowCreate={setShowCreate}
                setFormError={setFormError}
                handleCreateLesson={handleCreateLesson}
                formatFullDate={formatFullDate}
                formatTime={formatTime}
                lessonName={lessonName}
                setLessonName={setLessonName}
                price={price}
                setPrice={setPrice} googleMeetUrl={""} setGoogleMeetUrl={function (): void {
                    throw new Error("Function not implemented.");
                } }            />
        </div>
    );
};

export default TeacherLessons;
