import { Express } from "express";
import { IRoutes } from "../interface/router.interface";
import emailTemplateRouter from "./email-template.router";
import healthRouter from "./health.router";
import emailRouter from "./email.router";

class MainRoute {
  public apiRoutes: IRoutes[];

  constructor(apiBasePath: string) {
    this.apiRoutes = [
      {
        path: "/",
        router: healthRouter.router,
      },
      {
        path: apiBasePath + "/email-template",
        router: emailTemplateRouter.router,
      },
      {
        path: apiBasePath + "/email",
        router: emailRouter.router,
      }
    ];
  }

  public initializeRouting(app: Express) {
    this.apiRoutes.forEach((routeObj: IRoutes) => {
      app.use(routeObj.path, routeObj.router);
    });
  }
}

export default MainRoute;
