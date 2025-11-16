import { IBaseUser } from "./common.interface";

export enum EmailType {
  Verification = "Verification",
  Welcome = "Welcome",
  Notification = "Notification",
  Alert = "Alert",
  PasswordReset = "PasswordReset",
  Invitation = "Invitation",
  Approval = "Approval",
  Reminder = "Reminder",
  Report = "Report",
  Newsletter = "Newsletter",
  Feedback = "Feedback",
  Announcement = "Announcement",
  Transactional = "Transactional",
  Support = "Support",
  Deactivation = "Deactivation",
  Custom = "Custom"
}

export enum EmailCategory {
  Authentication = "Authentication",
  User = "User",
  HR = "HR",
  IT = "IT",
  Admin = "Admin",
  Finance = "Finance",
  Project = "Project",
  Attendance = "Attendance",
  Security = "Security",
  Maintenance = "Maintenance",
  Marketing = "Marketing",
  Announcement = "Announcement",
  Support = "Support",
  Training = "Training",
  Custom = "Custom"
}

export type EmailPriority = "high" | "normal" | "low";

export interface IMailTemplate {
  templateName: string;
  fromName?: string;
  fromEmail?: string;
  cc?: string[];
  bcc?: string[];
  subject: string;
  body: string;
  placeholders: string[];
  attachments?: IMailAttachment[];
  emailType?: EmailType;
  category?: EmailCategory;
  priority?: EmailPriority;
  version?: number;
  isActive: boolean;
  createdBy?: IBaseUser;
  updatedBy?: IBaseUser;
}

export interface IMailAttachment {
  filename: string;
  url: string;
}

export interface IMailTemplateFilter {
  _id?: string;
  templateName?: string;
  emailType?: EmailType;
  category?: EmailCategory;
  isActive?: boolean;
  createdBy?: IBaseUser;
  [key: string]: any;
}

export interface IMailTemplateUpdate {
  subject?: string;
  fromName?: string;
  fromEmail?: string;
  cc?: string[];
  bcc?: string[];
  body?: string;
  placeholders?: string[];
  attachments?: IMailAttachment[];
  priority?: EmailPriority;
  emailType?: EmailType;
  category?: EmailCategory;
  version?: number;
  isActive?: boolean;
  updatedBy?: IBaseUser;
}

export type MailFieldType = Array<keyof IMailTemplate>;
