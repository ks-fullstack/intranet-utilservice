import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { IAuthenticatedRequest, IBaseUser } from "../interface/common.interface";
import { getCookies } from "../utils/common-util";
import CustomError from "../utils/custom.error";

const jwtSecretKey: string = process.env.JWT_SECRET_KEY || "";

const validateRequest = (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {   
  const accessToken = req.headers?.authorization || "";
  const refreshToken = getCookies(req).refreshToken || "";

  if ((process.env.TEST_ENV === '1' && accessToken) || accessToken && refreshToken) {
    const token = accessToken.split(" ")[1]; // Bearer <token>
    jwt.verify(token, jwtSecretKey, (err, decodeData) => {
      if (err) {
        // Invalid token
        throw new CustomError(403);
      } else {
        const userData: any = decodeData;
        req.user = userData.data as IBaseUser;
        next();
      }
    });
  } else {
    // Unauthorized request
    throw new CustomError(401);
  }
}

export { validateRequest };
