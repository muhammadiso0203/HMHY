import type { ILessons } from "../admin/types";

export interface ITeacherProfile {
    statusCode: number;
    message: {
        uz: string;
        en: string;
        ru: string;
    };
    data: {
        id: string;
        email: string;
        password: string;
        fullName: string;
        image: string | null;
        phoneNumber: string;
        cardNumber: string | null;
        isActive: boolean;
        isDelete: boolean;
        role: "TEACHER";
        specification: string | null;
        level: string | null;
        reason: string | null;
        description: string | null;
        hourPrice: number;
        portfolioLink: string | null;
        imageUrl: string | null;
        rating: number;
        expirence: string | null;
        createdAt: string; // ISO date
        updatedAt: string; // ISO date
        googleAccessToken: string | null;
        googleRefreshToken: string | null;
    }
}

export interface LessonsOrCreateProps {
    isLoading: boolean;
    showCreate: boolean;
    selectedDate: string | null;
    selectedLessons: ILessons[];
    durationLabel: string | null;
    formError: string | null;
    isCreateError: boolean;
    isCreating: boolean;
    hourOptions: string[];
    minuteOptions: string[];
    startHour: string;
    startMinute: string;
    endHour: string;
    endMinute: string;
    setStartHour: (v: string) => void;
    setStartMinute: (v: string) => void;
    setEndHour: (v: string) => void;
    setEndMinute: (v: string) => void;
    setShowCreate: (v: boolean) => void;
    setFormError: (v: string | null) => void;
    handleCreateLesson: () => void;
    formatFullDate: (date: string) => string;
    formatTime: (date: string) => string;
    lessonName: string;
    setLessonName: (v: string) => void;
    price: string;
    setPrice: (v: string) => void;
}

export interface SummaryCardProps {
    selectedDate: string | null;
    isLoading: boolean;
    hasLessons: boolean;
    isError: boolean;
    formatFullDate: (date: string) => string;
    onOpenCreate: () => void;
}