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


export interface SummaryCardProps {
    selectedDate: string | null;
    isLoading: boolean;
    hasLessons: boolean;
    isError: boolean;
    formatFullDate: (date: string) => string;
    onOpenCreate: () => void;
}

export interface ITeacherUpdateProfile {
    name?: string;
    image?: string;
    hourPrice?: number;
    phone?: string;
    level?: string;
    experience?: string;
    bio?: string;
    portfolioVideoLink?: string;
    cardNumber?: string;
    teachingLanguage?: string;
    lessons?: string[];
    password?: string;
    newPassword?: string;
}


export interface IPayments {
  id: string;
  teacherId: string;
  lessons: string[];

  totalLessonAmount: number;
  platformComission: number;
  platformAmount: number;
  teacherAmount: number;

  paidBy: string;
  paidAt: string;

  isCanceled: boolean;
  canceledAt: string | null;
  canceledBy: string | null;
  canceledReason: string | null;

  notes: string;

  teacher: {
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

    createdAt: string;
    updatedAt: string;

    googleAccessToken: string | null;
    googleRefreshToken: string | null;
  };

  admin: {
    id: string;
    username: string;

    fullName: string | null;
    phoneNumber: string | null;

    isActive: boolean;
    isDelete: boolean;
    role: "ADMIN";

    createdAt: string;
    updatedAt: string;
  };

  createdAt: string;
  updatedAt: string;
}
