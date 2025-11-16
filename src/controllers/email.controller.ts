import { NextFunction, Request, Response } from "express";
import emailService from "../services/email.service";
import responseInterceptor from "../utils/response.interceptor";

class EmailController {
  public sendEmail(req: Request, res: Response, next: NextFunction) {
    try {
      emailService
        .sendEmail(req)
        .then((result) => {
          responseInterceptor(res, result);
        })
        .catch((err) => {
          next(err);
        });
    } catch (err) {
      next(err);
    }
  }

  public sendBulkEmail(req: Request, res: Response, next: NextFunction) {
    try {
      emailService
        .sendBulkEmail(req)
        .then((result) => {
          responseInterceptor(res, result);
        })
        .catch((err) => {
          next(err);
        });
    } catch (err) {
      next(err);
    }
  }
}

export default new EmailController();
