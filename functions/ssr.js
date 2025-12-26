import serverless from "serverless-http";
import { createServer } from "../../server.js";

let app;

export const handler = async (event, context) => {
  if (!app) {
    const { app: expressApp } = await createServer();
    app = serverless(expressApp);
  }
  return app(event, context);
};
