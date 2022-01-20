import { StatusCodes } from "http-status-codes";
import { stripAnsi } from "../../utils/error";
import { IMSResponse } from '../../middleware/response/response';
import * as KryptoServices from './krypto.service';

import { KryptoCreateDto, KryptoEditDto, KryptoRo } from '../../middleware/response/types/krypto';

import { NextFunction, Request, Response } from 'express';

/**
 * Basic CRUD controllers.
 */
export const getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  let response: IMSResponse = {};
  try {
    // const kryptos: Array<KryptoRo> = await KryptoServices.getAllKryptos(page, limit);
    const kryptos: Array<KryptoRo> = await KryptoServices.getAllKryptos(id);
    const count: number = kryptos.length;
    response = {
      data: kryptos,
      count,
      message: 'Request Sucessfull',
      httpCode: StatusCodes.OK,
    };
    res.locals.response = response;
    next();
  } catch (err: any) {
    if (err.name === 'DbError') {
      response.message  = stripAnsi(err.message);
      response.httpCode = StatusCodes.BAD_REQUEST;
    } else {
      response.message  = 'Request Failed | Server Error'
      response.httpCode = StatusCodes.INTERNAL_SERVER_ERROR;
    }
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  let response: IMSResponse = {};
  try {
    const kryptos: Array<KryptoRo> = await KryptoServices.getKryptoById(id);
    response = {
      data: kryptos,
      count: 1,
      message: 'Request Sucessfull',
      httpCode: StatusCodes.OK,
    };
  } catch (err: any) {
    if (err.name === 'DbError') {
      response.message  = stripAnsi(err.message);
      response.httpCode = StatusCodes.BAD_REQUEST;
    } else {
      response.message  = 'Request Failed | Server Error'
      response.httpCode = StatusCodes.INTERNAL_SERVER_ERROR;
    }
  }
  res.locals.response = response;
  next();
};

export const updateCurrentKrypto = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const id: string = res.locals.krypto.id;
  const payload: KryptoEditDto = req.body as KryptoEditDto;
  let response: IMSResponse = {};
  try {
    const kryptos: Array<KryptoRo> = await KryptoServices.updateKrypto(id, payload);
    response = {
      data: kryptos,
      count: 1,
      message: 'Request Sucessfull',
      httpCode: StatusCodes.OK,
    };
  } catch (err: any) {
    if (err.name === 'DbError') {
      response.message  = stripAnsi(err.message);
      response.httpCode = StatusCodes.BAD_REQUEST;
    } else {
      response.message  = 'Request Failed | Server Error'
      response.httpCode = StatusCodes.INTERNAL_SERVER_ERROR;
    }
  }
  res.locals.response = response;
  next();
};

export const createKrypto = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const kryptoCreateDto: KryptoCreateDto = req.body as KryptoCreateDto;

  let response: IMSResponse = {};
  try {
    const krypto: Array<KryptoRo> = await KryptoServices.createKrypto(kryptoCreateDto);
    response = {
        data: krypto,
        count: 1,
        message: 'Request Sucessfull',
        httpCode: StatusCodes.CREATED,
    };
  } catch (err: any) {
    if (err.name === 'DbError') {
      response.message  = stripAnsi(err.message);
      response.httpCode = StatusCodes.BAD_REQUEST;
    } else {
      response.message  = 'Request Failed server error'
      response.httpCode = StatusCodes.INTERNAL_SERVER_ERROR;
    }
  }
  res.locals.response = response;
  next();
};
