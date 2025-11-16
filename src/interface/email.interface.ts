import { IMailTemplate } from "./email-template.interface";

export interface IEmailRequest {
    templateName: string;
    receiverEmail: string | string[];
    placeholderData?: Record<string, string>;
}

export interface IBulkMailRequest {
    bulkEmails: IEmailRequest[];
}

export interface IEmail extends IMailTemplate {
    receiverEmail: string | string[];
    placeholderData?: Record<string, string>;
}
