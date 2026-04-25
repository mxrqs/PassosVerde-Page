import express from "express";
import cors from "cors";
import { pinoHttp } from "pino-http";
import router from "./routes/index.js";
import { logger } from "./lib/logger.js";
import type { IncomingMessage, ServerResponse } from "http";
import type { ReqId } from "pino-http";

// Tipos customizados para request com ID do pino-http
// Versão: 1.0.1 - TypeScript strict mode fixes
type PinoRequest = IncomingMessage & { id?: ReqId };
type PinoResponse = ServerResponse;

const app = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req: any) {
        return {
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res: any) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
