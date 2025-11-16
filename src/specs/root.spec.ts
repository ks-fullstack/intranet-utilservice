import http, { Server } from "http";
import jwt from "jsonwebtoken";
import { agent as request } from "supertest";
import MongoConnection from "../db/mongo-connection";
import APIConfig from "../utils/config";
import ExpressApp from "../utils/express-app";
import EmailTemplateTestCase from "./test_case/email-template.spec";
import { expect } from "chai";
import { describe } from "mocha";

let server: Server;
let authToken: string;

// Set up the chai Http assertion library
const apiBasePath = APIConfig.config.apiBasePath;
const agent = request(ExpressApp.app);

describe(`Util Micro Service`, function() {
  this.timeout(10000);

  before(async () => {
    await ExpressApp.connectApp();
    server = http.createServer(ExpressApp.app);
    await server.listen();
  });

  // This after hook will execute after ALL nested test suites complete
  // including all child tests from Email Template Test Case
  after(async () => {
    await MongoConnection.disconnectDB();
    await server.close();
  });

  describe("Executing test case", () => {
    const emailTemplateTestCase = new EmailTemplateTestCase(agent, apiBasePath + "/email-template");

    it("should check if authToken exist", async () => {
      authToken = await jwt.sign(
        { 
          data : {
            userId: process.env.TEST_USERNAME?.trim() || "",
            role: "superadmin"
          }
        },
        process.env.JWT_SECRET_KEY!,
        { expiresIn: "1h" }
      );
      expect(authToken).to.exist;
      emailTemplateTestCase.setToken(authToken);
    });

    describe("Execute Email Template Testcase", function () {
      emailTemplateTestCase.executeTestCase();
    });
  });
});
