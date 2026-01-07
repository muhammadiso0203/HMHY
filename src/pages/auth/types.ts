export interface IResponse {
  statusCode: number;
  message: {
    uz: string;
    en: string;
    ru: string;
  };
  data: {
    message: string;
    accessToken: string;
    adminId: string;
  };
}
