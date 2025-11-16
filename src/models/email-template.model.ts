import mongoose, { Schema } from "mongoose";
import { EmailCategory, EmailType, IMailAttachment, IMailTemplate,  } from "../interface/email-template.interface";

const emailTemplateSchema: Schema<IMailTemplate> = new Schema(
  {
    templateName: {
      type: String,
      required: true,
      unique: true,
    },
    emailType: {
      type: String,
      enum: EmailType
    },
    category: {
      type: String,
      enum: EmailCategory
    },
    fromName: { 
      type: String 
    },
    fromEmail: { 
      type: String 
    },
    cc:  {
      type: [String],
    },
    bcc: {
      type: [String],
    },
    subject: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    placeholders: {
      type: [String],
    },
    attachments: {
      type: Array<IMailAttachment>(),
    },
    priority: {
      type: String,
      enum: ["high", "normal", "low"],
      default: "normal",
    },
    version: {
      type: Number,
      default: 1,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: Object,
    },
    updatedBy: {
      type: Object,
    },
  },
  {
    strict: true,
    timestamps: true,
  }
);

emailTemplateSchema.index({ templateName: 1, emailType: 1, category: 1, isActive: 1 }, { unique: true });

const emailTemplate = mongoose.model("EmailTemplate", emailTemplateSchema);

export default emailTemplate;
