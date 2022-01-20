import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes"

import { IRo, IGenericObject } from "./response.d";

/**
 * This is the function that we are using to build the response object.
 * @param {Request} req
 * @param {Response} res
 *
 * @returns {void}
 **/
export const buildRo = (req: Request, res: Response): void => {
  const data: Array<IGenericObject> = res.locals.response.data || [];
  const count: number = res.locals.response.count || 0;
  const message: string = res.locals.response.message || '';
  const httpCode: number = res.locals.response.httpCode || StatusCodes.INTERNAL_SERVER_ERROR;

  const result: IRo = {
    metadata: {
      status_code: httpCode,
      total: count,
      total_per_page: data.length,
      current_endpoint: req.originalUrl,
      next: '',
      previous: '',
    },
    success: false,
    message: message,
    data: data,
  };

  /**
   * Setup pagination
   **/
  if ((req.query?.page || req.query?.limit || Number(count) > 10) && req.method === 'GET') {
    const page: number = Number(req.query?.page) || 0;
    const limit: number = Number(req.query?.limit) || 10;
    const query = queryParamsCtx(req.query as IGenericObject);

    /**
     * Setup current enpoint for RO
     **/
    result.metadata.current_endpoint = `${req.baseUrl}/?page=${page}&limit=${limit}${query}`;

    /**
     * Setup next and previous
     **/
    result.metadata.previous = `${req.baseUrl}/?page=${page - 1}&limit=${limit}${query}`;
    result.metadata.next = `${req.baseUrl}/?page=${page + 1}&limit=${limit}${query}`;

    /**
     * Setup next and previous if page = 0 or last page
     **/
    if (page === 0) {
      result.metadata.previous = '';
    }
    if (result.metadata.total_per_page < limit) {
      result.metadata.next = '';
    }
  }

  /**
   * Set success to false if status code is different 2xx
   **/
  if (httpCode === StatusCodes.OK || httpCode === StatusCodes.CREATED) {
    result.success = true;
  }

  res.status(httpCode).json(result);
};



/**
 * @description
 * Construct the paramaters for url given parameters already exist in url.
 **/
export const queryParamsCtx = (query: IGenericObject): string => {
  let queryFormatted = '';
  for (const param in query) {
    if (param !== 'page' && param !== 'limit') {
      queryFormatted = `${queryFormatted}&${param}=${query[param]}`;
    }
  }
  return queryFormatted;
};
