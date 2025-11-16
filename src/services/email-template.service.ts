import emailTemplateRepo from "../repos/email-template.repo";
import { IAuthenticatedRequest, IServiceResponse } from "../interface/common.interface";
import { IMailTemplate, IMailTemplateFilter, IMailTemplateUpdate, MailFieldType } from "../interface/email-template.interface";
import validationService from "./validation.service";
import AppConstants from "../constants/app.constant";

class EmailTemplateService {
  public async getOne(req: IAuthenticatedRequest): Promise<IServiceResponse> {
    const { fields } = req.query;
    const fieldSelection: MailFieldType = typeof fields === 'string' ? fields.split(",") as MailFieldType : [];
    const resObj = await emailTemplateRepo.getOne(req.params.id, fieldSelection);
    const result: IServiceResponse = {
      count: resObj ? 1 : 0,
      data: resObj,
      message: 1 + AppConstants.GetResponseMessage,
    };
    return result;
  }

  public async getAll(req: IAuthenticatedRequest): Promise<IServiceResponse> {
    const { fields, filter } = req.query;
    const filterExp =  typeof filter === 'string' ? filter : "";
    const fieldSelection: MailFieldType = typeof fields === 'string' ? fields.split(",") as MailFieldType : [];

    const resObj = await emailTemplateRepo.getAll(filterExp, fieldSelection);
    const result: IServiceResponse = {
      count: resObj.length,
      data: resObj,
      message: resObj.length + AppConstants.GetResponseMessage,
    };
    return result;
  }

  public async getCount(req: IAuthenticatedRequest): Promise<IServiceResponse> {
    const filterExp = req.params.filter || "";
    const resObj = await emailTemplateRepo.getCount(filterExp);
    const result: IServiceResponse = {
      count: resObj,
      data: resObj,
      message: resObj + AppConstants.GetResponseMessage,
    };
    return result;
  }

  public async create(req: IAuthenticatedRequest): Promise<IServiceResponse> {
    validationService.validatePostPayload(req);
    const inputData: IMailTemplate = req.body;
    inputData.createdBy = req.user;

    const resObj = await emailTemplateRepo.create(inputData);
    const result: IServiceResponse = {
      count: Array.isArray(resObj) ? resObj.length : 1,
      data: resObj,
      message: AppConstants.CreateResponseMessage,
    };
    return result;
  }

  public async update(req: IAuthenticatedRequest): Promise<IServiceResponse> {
    validationService.validateFiterExpression(req);
    validationService.validateUpdateDataPayload(req);
    const filterExp: IMailTemplateFilter = req.body.filterExp || "";
    const requestedDataToUpdate: IMailTemplateUpdate = req.body.data || "";
    requestedDataToUpdate.updatedBy = req.user;
    const resObj = await emailTemplateRepo.update(filterExp, requestedDataToUpdate);
    const result: IServiceResponse = {
      count: resObj.modifiedCount,
      data: resObj,
      message: resObj.modifiedCount + AppConstants.UpdateResponeMessage,
    };
    return result;
  }

  public async delete(req: IAuthenticatedRequest): Promise<IServiceResponse> {
    validationService.validateFiterExpression(req);
    const filterExp: IMailTemplateFilter = req.body.filterExp || "";
    const resObj = await emailTemplateRepo.delete(filterExp);
    const result: IServiceResponse = {
      count: resObj.deletedCount,
      message: resObj.deletedCount + AppConstants.DeleteResponeMessage,
    };
    return result;
  }

  public async search(req: IAuthenticatedRequest): Promise<IServiceResponse> {
    validationService.validateFiterExpression(req);
    const filterExp: IMailTemplateFilter = req.body.filterExp || "";
    const fields = req.body.fields;
    const fieldSelection: MailFieldType = typeof fields === 'string' ? fields.split(",") as MailFieldType : [];
    let resObj;
    if (req.originalUrl.includes("all")) {
      resObj = await emailTemplateRepo.findAll(filterExp, fieldSelection);
    } else {
      resObj = await emailTemplateRepo.findOne(filterExp, fieldSelection);
    }
    const recordCount = Array.isArray(resObj) ? resObj.length : 1;
    const result: IServiceResponse = {
      count: recordCount,
      data: resObj,
      message: recordCount + AppConstants.GetResponseMessage,
    };
    return result;
  }
}

export default new EmailTemplateService();
