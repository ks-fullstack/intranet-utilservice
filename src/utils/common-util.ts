import { Request } from "express";
import fs from "fs";
import nodemailer from "nodemailer";
import { IEmail } from "../interface/email.interface";
import APIConfig from "./config";

const readJSONFile = (filePath: string) => {
  const file = fs.readFileSync(filePath).toString();
  return JSON.parse(file);
}

const getCookies = (req: Request) => {
  let cookies: any = {};
  let cookieList = req.headers.cookie?.split(";");
  if (cookieList) {
    cookieList.forEach((cookie) => {
      let [key, value] = cookie.split("=");
      cookies[key.trim()] = value.trim();
    });
  }
  return cookies;
}

const sendMail = async(emailObj: IEmail) => {
  const emailSettings = APIConfig.config.emailSettings;
  emailSettings.auth = {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD
  }
  const transporter = nodemailer.createTransport(emailSettings);

  try {
    const emailFrom = `${emailObj.fromName || 'Intranet Admin'} <${ emailObj.fromEmail || process.env.EMAIL_USER}>`;
    const emailOptions : nodemailer.SendMailOptions = {
      from: emailFrom,
      to: emailObj.receiverEmail,
      subject: formatEmailData(emailObj.subject, emailObj.placeholderData || {}),
      html: formatEmailData(emailObj.body, emailObj.placeholderData || {})
    }
    if (emailObj.cc && emailObj.cc.length > 0) {
      emailOptions.cc = emailObj.cc;
    }
    if (emailObj.bcc && emailObj.bcc.length > 0) {
      emailOptions.bcc = emailObj.bcc;
    }
    if (emailObj.attachments && emailObj.attachments.length > 0) {
      emailOptions.attachments = emailObj.attachments.map(att => ({
        filename: att.filename,
        path: att.url
      }));
    }
    const emailRes = await transporter.sendMail(emailOptions);
    return emailRes;
  } catch (error) {
    throw new Error('Failed to send email: ' + (error as Error).message);
  }
}

const formatEmailData = (templateBody: string, replacements: Record<string, string>): string => {
  let formattedBody = templateBody;
  for (const [key, value] of Object.entries(replacements)) {
    const regex = new RegExp(`\\$${key}\\$`, "g"); // match all occurrences of $KEY$
    formattedBody = formattedBody.replace(regex, value);
  }
  return formattedBody;
}

export { getCookies, readJSONFile, sendMail };
