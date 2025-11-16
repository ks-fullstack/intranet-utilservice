import { NextFunction, Request, Response } from "express";
import emailTemplateService from "../services/email-template.service";
import responseInterceptor from "../utils/response.interceptor";

class EmailTemplateController {
  public getOne(req: Request, res: Response, next: NextFunction) {
    emailTemplateService.getOne(req).then((result) => {
        responseInterceptor(res, result);
      }).catch((err) => {
        next(err);
      });
  }

  public getAll(req: Request, res: Response, next: NextFunction) {
    emailTemplateService.getAll(req).then((result) => {
        responseInterceptor(res, result);
      }).catch((err) => {
        next(err);
      });
  }

  public getCount(req: Request, res: Response, next: NextFunction) {
    emailTemplateService.getCount(req).then((result) => {
        responseInterceptor(res, result);
      }).catch((err) => {
        next(err);
      });
  }

  public create(req: Request, res: Response, next: NextFunction) {
    emailTemplateService.create(req).then((result) => {
        responseInterceptor(res, result);
      }).catch((err) => {
        next(err);
      });
  }

  public update(req: Request, res: Response, next: NextFunction) {
    emailTemplateService.update(req).then((result) => {
        responseInterceptor(res, result);
      }).catch((err) => {
        next(err);
      });
  }

  public delete(req: Request, res: Response, next: NextFunction) {
    try {
      emailTemplateService.delete(req).then((result) => {
          responseInterceptor(res, result);
        }).catch((err) => {
          next(err);
        });
    } catch (err) {
      next(err);
    }
  }

  public search(req: Request, res: Response, next: NextFunction) {
    try {
      emailTemplateService.search(req).then((result) => {
          responseInterceptor(res, result);
        }).catch((err) => {
          next(err);
        });
    } catch (err) {
      next(err);
    }
  }
}

export default new EmailTemplateController();
