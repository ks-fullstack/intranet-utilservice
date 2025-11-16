import { Router } from "express";
import { validateRequest } from "../middlewares/auth.middleware";
import emailController from "../controllers/email.controller";

class EmailRouter {
  public readonly router: Router = Router();

  constructor() {
    this.router.post("/internal/send", emailController.sendEmail);
    this.router.post("/internal/send-bulk", emailController.sendBulkEmail);
    this.router.post("/send", validateRequest, emailController.sendEmail);
    this.router.post("/send-bulk", validateRequest, emailController.sendBulkEmail);
  }
}

export default new EmailRouter();
