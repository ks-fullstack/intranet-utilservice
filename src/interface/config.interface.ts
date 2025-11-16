import { CookieOptions } from "express";
import { ConnectOptions } from "mongoose";
import SMTPConnection from "nodemailer/lib/smtp-connection";

export interface IConfig {
  apiBasePath: string;
  cookieSettings: CookieOptions;
  dbConnectionStr: string;
  dbName: string;
  dbUsername: string;
  dbPassword: string;
  dbSettings: IDBSettings;
  disableLogs: boolean;
  emailSettings: SMTPConnection.Options;
  securitySettings: ISecuritySettings;
  serviceName: string;
  externalApisConfig?: Record<string, IExternalApiConfig>;
}

export interface IDBSettings extends ConnectOptions {
  appname: string;
  connectTimeoutMS: number;
  heartbeatFrequencyMS: number;
  replicaSet: string;
  retryWrites: boolean;
  socketTimeoutMS: number;
  ssl: boolean;
}

export interface ISecuritySettings {
  allowCredentials: boolean;
  allowHeaders: string;
  allowedMethod: string;
  allowedOrigin: string;
}

export interface IExternalApiConfig {
  baseUrl: string;
  timeout: number;
  apiKey?: string;
  authHeaderName?: string;
  defaultHeaders?: Record<string, string>;
  retryCount?: number;
  enabled?: boolean;
}
