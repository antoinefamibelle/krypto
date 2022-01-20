import { NextFunction, Request, Response } from 'express';
import { logger } from '../../utils/logger';

/**
 * Create middleware of logs.
 */
export const loggerMiddleware = (req: Request, resp: Response, next: NextFunction): void => {
  logger.info(`LOGGED: ${req.method} | ${req.path}`);
  next();
};
