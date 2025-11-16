import { Request } from 'express';

export interface IServiceResponse {
  data?: any;
  message: string;
  count?: number;
  token?: string;
}

export interface IServiceResponseExtend extends IServiceResponse {
  success: boolean;
  statusCode: number;
}

export interface IJWTVerifyToken {
  isValid: boolean;
  data: any | undefined;
}

export interface IBaseUser {
  userId: string;
  emailId: string;
  mobileNo: string;
  role: string;
}

export interface IAuthenticatedRequest extends Request {
  user?: IBaseUser;
}
