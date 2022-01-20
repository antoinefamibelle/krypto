import { logger } from '../../utils/logger';
import { DbError } from '../../utils/error';
import PrismaClient from '../../utils/database';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { StatusCodes } from "http-status-codes";

import { UserCreateDto, UserRo, UserAuthRo, UserLoginAuthDto, UserLoginAuthRo, UserCreateDtoSchema, UserEditDto } from '../../middleware/response/types/user';

import { ctxUserResponse, ctxUserAuthResponse, tokenSigning } from './user.helper';

const jwtSecret: string = String(process.env.JWT) || "secretJWT";

/**
 * Get All Users
 * @param {string} id
 *
 * @returns {Promise<Array<UserRo>>}
 *  */
export const getAllUsers = async (): Promise<Array<UserRo>> => {
  try {
    const users: Array<User> = await PrismaClient.user.findMany();
    const response: Array<UserRo> = users.map((user) => ctxUserResponse(user));
    return response;
  } catch (err: any) {
    logger.error(err);
    throw new DbError(err.message);
  }
};

export const getUserById = async (id: string): Promise<Array<UserRo>> => {
  try {
    const user: User | null = await PrismaClient.user.findUnique({
      where: {
        id
      }
    });
    if (!user) {
      return []
    }
    const response: Array<UserRo> = [ctxUserResponse(user)];
    return response;
  } catch (err: any) {
    logger.error(err);
    throw new DbError(err.message);
  }
};

export const updateUser = async (id: string, payload: UserEditDto): Promise<Array<UserRo>> => {
  try {
    const user: User | null = await PrismaClient.user.update({
      where: {
        id
      },
      data: payload
    });
    if (!user) {
      return []
    }
    const response: Array<UserRo> = [ctxUserResponse(user)];
    return response;
  } catch (err: any) {
    logger.error(err);
    throw new DbError(err.message);
  }
};

export const registerUser = async (userCreateDto: UserCreateDto): Promise<Array<UserRo>> => {
  const salt = await bcrypt.genSalt(10) // Generate a salt with 10 round ! The more there is round the more it is secured
  const password = await bcrypt.hash(userCreateDto.user_password, salt); // Hashing the password

  try {
    const user: User = await PrismaClient.user.create({
      data: {
        user_email: userCreateDto.user_email,
        user_first_name: userCreateDto.user_first_name,
        user_last_name: userCreateDto.user_last_name,
        user_password: password,
        user_phone: userCreateDto.user_phone,
        user_username: userCreateDto.user_username
      }
    });

    const payload = { user: { id: user.id } };
    const token = await tokenSigning(payload, jwtSecret);
    const response: Array<UserAuthRo> = [ctxUserAuthResponse(user, String(token))];
    return response;
  } catch (err: any) {
    logger.error(err);
    throw new DbError(err.message);
  }
}

export const loginUser = async (userLoginAuthDto: UserLoginAuthDto): Promise<UserLoginAuthRo> => {
  try {
    const user: User | null = await PrismaClient.user.findUnique({
      where: {
        user_email: userLoginAuthDto.user_email
      }
    });
    if (!user) {
      const response: UserLoginAuthRo = {
        status_code: StatusCodes.NOT_FOUND,
        message: 'User not found'
      };
      return response;
    }

    const isMatch = await bcrypt.compare(userLoginAuthDto.user_password, user.user_password); //Compare the users password encrypted in Database with the password given
    if (!isMatch) {
      const response: UserLoginAuthRo = {
        status_code: StatusCodes.UNAUTHORIZED,
        message: 'Invalid credentials'
      };
      return response;
    }
    const payload = { user: { id: user.id } };
    const token = await tokenSigning(payload, jwtSecret);
    const buildResponse: UserAuthRo = ctxUserAuthResponse(user, String(token));
    const response: UserLoginAuthRo = {
      status_code: 200,
      message: 'Login successfull',
      data: buildResponse
    };
    return response;
  } catch (err: any) {
    logger.error(err);
    throw new DbError(err.message);
  }
}

/**
 * Get number of rows inside the table.
 *
 * @returns {Promise<number>}
 */
export const countAllUsers = async (): Promise<number> => {
  try {
    const count: number = await PrismaClient.user.count();
    return count;
  } catch (err) {
    logger.error(err);
    return 0;
  }
};
