import { Router } from "express";
import emailTemplateController from "../controllers/email-template.controller";
import { validateRequest } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/access-control.middleware";
import { AccessControlAccess } from "../constants/app.constant";

class EmailTemplateRouter {
  public readonly router: Router = Router();

  constructor() {
    this.router.get("/get/list", validateRequest, authorizeRoles(...AccessControlAccess.AllAccess), emailTemplateController.getAll);
    this.router.get("/get/count", validateRequest, authorizeRoles(...AccessControlAccess.AllAccess), emailTemplateController.getCount);
    this.router.get("/get/:id", validateRequest, authorizeRoles(...AccessControlAccess.AllAccess), emailTemplateController.getOne);
    this.router.post("/create", validateRequest, authorizeRoles(...AccessControlAccess.AllAccess), emailTemplateController.create);
    this.router.put("/update", validateRequest, authorizeRoles(...AccessControlAccess.AllAccess), emailTemplateController.update);
    this.router.delete("/delete", validateRequest, authorizeRoles(...AccessControlAccess.AllAccess), emailTemplateController.delete);
    this.router.post("/search/all", validateRequest, emailTemplateController.search);
    this.router.post("/search", validateRequest, emailTemplateController.search);
  }
}

export default new EmailTemplateRouter();
