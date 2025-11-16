import { IAuthenticatedRequest, IServiceResponse } from "../interface/common.interface";
import { IBulkMailRequest, IEmailRequest } from "../interface/email.interface";
import emailTemplateRepo from "../repos/email-template.repo";
import { sendMail } from "../utils/common-util";
import CustomError from "../utils/custom.error";

class EmailService {
  public async sendEmail(req: IAuthenticatedRequest): Promise<IServiceResponse> {
    const emailReq: IEmailRequest = req.body;
    let result: IServiceResponse;
    const emailTemplate = await emailTemplateRepo.findOne({ templateName: emailReq.templateName });
    if (emailTemplate) {
      const emailBody = { ...emailTemplate.toObject(), ...emailReq };
      const emailRes = await sendMail(emailBody);
      if (emailRes.accepted.length > 0) {
        result = {
          message: `Email sent successfully to: ${emailRes.accepted.join(", ")}`,
          data: emailRes
        };
      } else {
        throw new CustomError(500, `Failed to send email.`);
      }
    } else {
      throw new CustomError(404, `Email template with name ${emailReq.templateName} not found.`);
    }
    return result;
  }

  public async sendBulkEmail(req: IAuthenticatedRequest): Promise<IServiceResponse> {
    const emailRequests: IBulkMailRequest = req.body;
    let successCount = 0;
    let failureCount = 0;
    let failureDetails: string[] = [];
    for (const emailReq of emailRequests.bulkEmails) {
      try {
        const emailTemplate = await emailTemplateRepo.findOne({ templateName: emailReq.templateName });
        if (emailTemplate) {
          const emailBody = { ...emailTemplate.toObject(), ...emailReq };
          const emailRes = await sendMail(emailBody);
          if (emailRes.accepted.length > 0) {
            successCount++;
          } else {
            failureCount++;
            failureDetails.push(`Failed to send email to: ${emailReq.receiverEmail}`);
          }
        } else {
          failureCount++;
          failureDetails.push(`Email template with name ${emailReq.templateName} not found.`);
        }
      } catch (error) {
        failureCount++;
        failureDetails.push(`Failed to send email to: ${emailReq.receiverEmail}`);
      }
    }
    return {
      message: `Bulk email sent successfully: ${successCount}, failed: ${failureCount}`,
      data: {
        success: successCount,
        failure: failureCount,
        failureDetails
      }
    };
  }
}

export default new EmailService();
