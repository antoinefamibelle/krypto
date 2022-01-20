import { StatusCodes } from "http-status-codes";
import { stripAnsi } from "../../utils/error";
import { IMSResponse } from '../../middleware/response/response.d';
import * as UserServices from './user.service';

import { UserCreateDto, UserEditDto, UserLoginAuthDto, UserRo,UserLoginAuthRo } from '../../middleware/response/types/user';

import { NextFunction, Request, Response } from 'express';

/**
 * Basic CRUD controllers.
 */
export const getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // const page: number = Number(payload?.query?.page) || 0;
  // const limit: number = Number(payload?.query?.limit) || 10;

  let response: IMSResponse = {};
  try {
    // const users: Array<UserRo> = await UserServices.getAllUsers(page, limit);
    const users: Array<UserRo> = await UserServices.getAllUsers();
    const count: number = await UserServices.countAllUsers();
    response = {
      data: users,
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

export const getCurrentUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let response: IMSResponse = {};
  try {
    // const users: Array<UserRo> = await UserServices.getAllUsers(page, limit);
    const users: Array<UserRo> = await UserServices.getUserById(res.locals.user.id);
    response = {
      data: users,
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

export const getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  let response: IMSResponse = {};
  try {
    // const users: Array<UserRo> = await UserServices.getAllUsers(page, limit);
    const users: Array<UserRo> = await UserServices.getUserById(id);
    response = {
      data: users,
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

export const updateCurrentUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const id: string = res.locals.user.id;
  const payload: UserEditDto = req.body as UserEditDto;
  let response: IMSResponse = {};
  try {
    // const users: Array<UserRo> = await UserServices.getAllUsers(page, limit);
    const users: Array<UserRo> = await UserServices.updateUser(id, payload);
    response = {
      data: users,
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

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userCreateDto: UserCreateDto = req.body as UserCreateDto;

  let response: IMSResponse = {};
  try {
    const user: Array<UserRo> = await UserServices.registerUser(userCreateDto);
    response = {
        data: user,
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

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  console.log(req.body)
  const userLoginDto: UserLoginAuthDto = req.body as UserLoginAuthDto;

  let response: IMSResponse = {};
  try {
    const user: UserLoginAuthRo = await UserServices.loginUser(userLoginDto);
    if (user.data) {
      response = {
        data: [user.data],
        count: 1,
        message: 'Request Sucessfull',
        httpCode: StatusCodes.OK,
      };
    }
    else {
      response = {
        data: [],
        count: 0,
        message: user.message,
        httpCode: user.status_code,
      };
    }
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
