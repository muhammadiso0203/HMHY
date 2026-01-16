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

export interface IStudent {
  id: string;
  firstName: string;
  lastName: string;
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
}

export interface IStudentsResponse {
  data: IStudent[];
  total: number;
  page: number;
  lastPage: number;
}

export interface QueryTYpe<T> {
  data?: T;
  isLoading: boolean;
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
  teacher: { length: number };
  student: { length: number };
  lesson: { length: number };
  earning: { length: number };
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

export interface ITeacherById {
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
    createdAt: string;
    updatedAt: string;
    googleAccessToken: string | null;
    googleRefreshToken: string | null;
  };
}

export interface ITeacherEdit {
  fullName: string;
  phoneNumber: string;
  description: string; // Bio
  expirence: string; // "1 Year"
  hourPrice: number; // 0
  level: string; // B1
  portfolioLink: string; // Video link
  cardNumber: string; // 8600....
  specification: string; // English
}

export interface IStudentStats {
  statusCode: number;
  message: {
    uz: string;
    en: string;
    ru: string;
  };
  data: {
    total: number;
    active: number;
    blocked: number;
  };
}

export interface ICreateAdmin {
  username: string;
  password: string;
  phoneNumber: string;
}

export interface IAdmin {
  id: string;

  username: string;
  fullName: string | null;
  phoneNumber: string | null;

  isActive: boolean;
  isDelete: boolean;

  role: "ADMIN";

  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}


export interface IAdminResponse {
  id: number;
  username: string;
  phoneNumber: string;
  password: string;
}

export interface IAllAdmin {
  id: string;
  username: string;
  fullName: string | null;
  phoneNumber: string;
  isActive: boolean;
  isDelete: boolean;
  role: "ADMIN" | "SUPER_ADMIN";
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}

export interface IStudentById {
  id: string;

  firstName: string;
  lastName: string;

  phoneNumber: string;
  email: string | null;

  role: "student" | string;

  telegramId: number | null;
  tgId: number | null;
  tgUsername: string | null;

  isBlocked: boolean;
  blockedAt: string | null;
  blockedReason: string | null;

  step: "START" | string;
  chatId: number | null;

  notification: boolean | null;

  createdAt: string;
  updatedAt: string;
}


export interface IStudentUpdate {
  firstName?: string;
  lastName?: string;

  phoneNumber?: string;
  email?: string;
  role?: "student";

  tgId?: string;
  tgUsername?: string;

  isBlocked?: boolean;
  blockedReason?: string | null;

  lesson?: string;          // uuid
  lessonHistory?: string;   // uuid
  notification?: string;    // uuid
}

export interface IAdminUpdate {
  username?: string;
  password?: string;
  phoneNumber?: string;
}


export interface ILessons {
  id: string;
  name: string;

  startTime: string; // ISO
  endTime: string;   // ISO

  googleMeetsUrl: string;
  status: "available" | "booked" | "completed" | "cancelled";

  googleEventId: string | null;
  price: number;
  isPaid: boolean;

  teacherId: string;
  studentId: string | null;

  teacherPayment: number | null;
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
    expirence: number | null;

    createdAt: string;
    updatedAt: string;

    googleAccessToken: string | null;
    googleRefreshToken: string | null;
  };

  student: {
    id: string;
    lastName: string;
    firstName: string;
    phoneNumber: string;

    email: string | null;
    telegramId: string | null;
    role: "student";

    tgId: string | null;
    tgUsername: string | null;

    isBlocked: boolean;
    blockedAt: string | null;
    blockedReason: string | null;

    step: string;
    chatId: string | null;
    notification: string | null;

    createdAt: string;
    updatedAt: string;
  } | null;
}

export interface ITotalPayments {
  totalPaid: {
    count: number;
    amount: number;
  };
  totalUnpaid: {
    count: number;
    amount: number;
  };
  canceled: {
    count: number;
    amount: number;
  };
}


export interface IAdminProfile {
  id: string;
  username: string;
  fullName: string | null;
  phoneNumber: string;
  isActive: boolean;
  isDelete: boolean;
  role: "SUPER_ADMIN" | "ADMIN" | "TEACHER" | "STUDENT";
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}

export interface IAdminUpdate {
  username?: string;
  phoneNumber?: string;
  password?: string;
  newPassword?: string;
}



export interface ITransaction {
  id: string;
  paymeId: string | null;
  clickId: string | null;

  lessonId: string;
  studentId: string;

  amount: string;
  createTime: string;
  performTime: string | null;
  cancelTime: string | null;
  reason: string | null;

  provider: "PAYME" | "CLICK";
  state: "PAID" | "PENDING" | "CANCELLED";

  lesson: {
    id: string;
    name: string;
    startTime: string;
    endTime: string;

    googleMeetsUrl: string;
    meetingUrl: string | null;
    googleEventId: string | null;

    status: "available" | "booked" | "completed" | "cancelled";
    price: number;
    isPaid: boolean;

    teacherId: string;
    studentId: string | null;
    teacherPayment: number | null;

    bookedAt: string | null;
    remainedSendAt: string | null;
    completedAt: string | null;

    notification: any | null;
    transaction: any | null;

    createdAt: string;
    updatedAt: string;
  };

  student: {
    id: string;
    firstName: string;
    lastName: string;

    phoneNumber: string;
    email: string | null;

    role: "student" | "teacher" | "admin";

    telegramId: number | null;
    tgId: number | null;
    tgUsername: string | null;

    isBlocked: boolean;
    blockedAt: string | null;
    blockedReason: string | null;

    step: string;
    chatId: number | null;

    notification: any | null;

    createdAt: string;
    updatedAt: string;
  };

  createdAt: string;
  updatedAt: string;
}

export interface ITransactionsResponse {
  statusCode: number;
  message: ILangMessage;
  data: ITransaction[];
}
