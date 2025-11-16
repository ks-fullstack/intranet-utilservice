import emailTemplate from "../models/email-template.model";
import { IMailTemplate, IMailTemplateFilter, IMailTemplateUpdate, MailFieldType } from "../interface/email-template.interface";

class EmailTemplateRepo {

  private defaultSelectedFields = "_id templateName fromName fromEmail cc bcc subject body placeholders attachments category emailType priority isActive createdBy updatedBy";
  private defaultSearchFields = "-_id templateName fromName fromEmail cc bcc subject body placeholders attachments category emailType priority";

  public getOne(id: string, selectedFields?: MailFieldType) {
    const selectedFieldsExp = this.defaultSelectedFields + (selectedFields?.join(' ') || '');
    return emailTemplate.findById(id).select(selectedFieldsExp);
  }

  public getAll(filter: string, selectedFields?: MailFieldType) {
    const filterExp: IMailTemplateFilter = filter ? JSON.parse(filter) : {};
    const selectFieldsExp = this.defaultSelectedFields + (selectedFields?.join(" ") || "");
    return emailTemplate.find(filterExp).select(selectFieldsExp);
  }

  public getCount(filter: string) {
    const filterExp: IMailTemplateFilter = filter ? JSON.parse(filter) : {};
    return emailTemplate.find(filterExp).estimatedDocumentCount();
  }

  public create(inputData: IMailTemplate | IMailTemplate[]) {
    return emailTemplate.insertMany(inputData);
  }

  public update(filter: IMailTemplateFilter, inputData: IMailTemplateUpdate) {
    return emailTemplate.updateMany(filter, inputData, { new: true });
  }

  public delete(filter: IMailTemplateFilter) {
    return emailTemplate.deleteMany(filter);
  }

  public findAll(filter: IMailTemplateFilter, selectedFields?: MailFieldType) {
    const selectedFieldsExp = this.defaultSearchFields + (selectedFields?.join(' ') || '');
    return emailTemplate.find(filter).select(selectedFieldsExp);
  }

  public findOne(filter: IMailTemplateFilter, selectedFields?: MailFieldType) {
    const selectedFieldsExp = this.defaultSearchFields + (selectedFields?.join(' ') || '');
    return emailTemplate.findOne(filter).select(selectedFieldsExp);
  }
}

export default new EmailTemplateRepo();
