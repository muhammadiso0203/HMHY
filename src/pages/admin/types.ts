export interface ILangMessage {
  uz: string;
  en: string;
  ru: string;
}

export interface ITeacher {
  id: string;
  email: string;
  password: string;
  fullName: string;
  image: string | null;
  phoneNumber: string;
  cardNumber: string | null;
  isActive: boolean;
  isDelete: boolean;
  role: "TEACHER" | string;
  specification: string | null;
  level: string | null;
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
}

export interface ITeacherDataWrapper {
  statusCode: number;
  message: ILangMessage;
  data: ITeacher[];
}

export interface IGetTeachersResponse {
  statusCode: number;
  message: ILangMessage;
  data: ITeacher[];
}

export interface IStudentsResponse {
  data: {
    id: string;
    lastName: string;
    firstName: string;
    phoneNumber: string;
    email: string | null;
    telegramId: string | null;
    role: "student" | string;
    tgId: string | null;
    tgUsername: string | null;
    isBlocked: boolean;
    blockedAt: string | null;
    blockedReason: string | null;
    step: string;
    chatId: string | null;
    notification: string | null;
    createdAt: string; // ISO date
    updatedAt: string; // ISO date
  }[];
  total: number;
  page: number;
  lastPage: number;
}

export interface ILessonsResponse {
  statusCode: number;
  message: {
    uz: string;
    en: string;
    ru: string;
  };
  data: {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
    googleMeetsUrl: string;
    status: string;
    googleEventId: string | null;
    price: number;
    isPaid: boolean;
    teacherId: string;
    studentId: string;
    teacherPayment: string | null;
    meetingUrl: string | null;
    bookedAt: string | null;
    remainedSendAt: string | null;
    completedAt: string | null;
    notification: string | null;
    transaction: string | null;
    createdAt: string;
    updatedAt: string;
    teacher: {
      id: string;
      email: string;
      fullName: string;
      image: string | null;
      phoneNumber: string;
      isActive: boolean;
      isDelete: boolean;
      role: string;
      rating: number;
      createdAt: string;
      updatedAt: string;
    };
    student: {
      id: string;
      lastName: string;
      firstName: string;
      phoneNumber: string;
      email: string | null;
      role: string;
      isBlocked: boolean;
      createdAt: string;
      updatedAt: string;
    };
  }[];
}

export interface IDashboardStatsResponse {
  statusCode: number;
  message: {
    uz: string;
    en: string;
    ru: string;
  };
  data: {
    teacher: { length: number };
    student: { length: number };
    lesson: { length: number };
    earning: { length: number };
  };
}


export interface IDeletedTeacher {
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

    role: "TEACHER" | "ADMIN" | "STUDENT";

    specification: string | null;
    level: string | null;
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
  }[];
}

