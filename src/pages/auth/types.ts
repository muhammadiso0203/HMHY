export interface MessageT {
  uz: string;
  en: string;
  ru: string;
}

export interface AdminData {
  message: string;
  accessToken: string;
  adminId: string;
}

export interface LoginResponse {
  statusCode: number;
  message: MessageT;
  data: AdminData;
}

export interface LoginT {
  username: string;
  password: string;
}