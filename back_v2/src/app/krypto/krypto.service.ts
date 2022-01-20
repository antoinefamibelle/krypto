import { logger } from '../../utils/logger';
import { DbError } from '../../utils/error';
import PrismaClient from '../../utils/database';
import { Krypto } from '@prisma/client';
import { StatusCodes } from "http-status-codes";

import { KryptoCreateDto, KryptoRo, KryptoCreateDtoSchema, KryptoEditDto } from '../../middleware/response/types/krypto';

import { ctxKryptoResponse } from './krypto.helper';

/**
 * Get All Kryptos
 * @param {string} id
 *
 * @returns {Promise<Array<KryptoRo>>}
 *  */
export const getAllKryptos = async (id: string): Promise<Array<KryptoRo>> => {
  try {
    const kryptos: Array<Krypto> = await PrismaClient.krypto.findMany({
      where: {
        user_id: id
      }
    });
    const response: Array<KryptoRo> = kryptos.map((krypto) => ctxKryptoResponse(krypto));
    return response;
  } catch (err: any) {
    logger.error(err);
    throw new DbError(err.message);
  }
};

export const getKryptoById = async (id: string): Promise<Array<KryptoRo>> => {
  try {
    const krypto: Krypto | null = await PrismaClient.krypto.findUnique({
      where: {
        id
      }
    });
    if (!krypto) {
      return []
    }
    const response: Array<KryptoRo> = [ctxKryptoResponse(krypto)];
    return response;
  } catch (err: any) {
    logger.error(err);
    throw new DbError(err.message);
  }
};

export const updateKrypto = async (id: string, payload: KryptoEditDto): Promise<Array<KryptoRo>> => {
  try {
    const krypto: Krypto | null = await PrismaClient.krypto.update({
      where: {
        id
      },
      data: payload
    });
    if (!krypto) {
      return []
    }
    const response: Array<KryptoRo> = [ctxKryptoResponse(krypto)];
    return response;
  } catch (err: any) {
    logger.error(err);
    throw new DbError(err.message);
  }
};

export const createKrypto = async (id: string, payload: KryptoCreateDto): Promise<Array<KryptoRo>> => {
  try {
    const krypto: Krypto | null = await PrismaClient.krypto.create({
      data: {
        krypto_name: payload.krypto_name,
        user: {
          connect: {
            id
          }
        }
      }
    });
    if (!krypto) {
      return []
    }
    const response: Array<KryptoRo> = [ctxKryptoResponse(krypto)];
    return response;
  } catch (err: any) {
    logger.error(err);
    throw new DbError(err.message);
  }
};

/**
 * Get number of rows inside the table.
 *
 * @returns {Promise<number>}
 */
export const countAllKryptos = async (): Promise<number> => {
  try {
    const count: number = await PrismaClient.krypto.count();
    return count;
  } catch (err) {
    logger.error(err);
    return 0;
  }
};
