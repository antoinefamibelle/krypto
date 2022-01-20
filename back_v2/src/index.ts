import express, { Application } from 'express';
import appMonitor from 'express-status-monitor';
import cors, { CorsOptions } from 'cors';
import figlet from "figlet";
import { Server } from 'http';
import { routerPing } from './middleware/ping';
import { loggerMiddleware } from './middleware/logger'
import { closeGracefullyEverything } from './utils/error';

import router from './router';
import { logger } from './utils/logger';

const port: string | number = process.env.PORT || 8000;
const app: Application = express();
let server: Server | undefined = undefined;
/**
 * Declare middlewares.
 */
app.use(appMonitor());
app.use(loggerMiddleware);
app.use(express.json());

/**
 * Setup CORS.
 */
const whitelist = ['http://localhost:8080'];
const corsOptions: CorsOptions = {
  origin: function (origin: string | undefined, callback: Function): void {
    if (whitelist.indexOf(String(origin)) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET, HEAD, PUT, PATCH, POST, DELETE'],
};
app.use(cors(corsOptions));

/**
 * Declare routes.
 */
app.use(router);
app.use(routerPing);

/**
 * Handle assets.
 */
app.use(express.static('public'));

/**
 * Start the server.
 */

try {
  server = app.listen(port, async (): Promise<void> => {
    logger.info(`Server is listening on the http://localhost:${port}`);
    figlet(`KRYPTO SERVER ${port}`, (err, data) => {
      if(err) {
        logger.error("Something went wrong...", err)
        return
      };
      console.log(data)
    })
  });
} catch (error) {
  console.error(`Error occured`);
}

/**
 * Close gracefully the server.
 */
closeGracefullyEverything({
  app: server
})
