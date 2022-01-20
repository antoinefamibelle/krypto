import jwt from 'jsonwebtoken';
import { User } from "@prisma/client"

import { UserRo, UserAuthRo } from '../../middleware/response/types/user';

export function ctxUserResponse(user: User): UserRo {
  return {
    id                : user.id,
    user_email        : user.user_email,
    user_first_name   : user?.user_first_name,
    user_last_name    : user?.user_last_name,
    user_phone        : user.user_phone,
    user_username       : user.user_username,
    user_is_active    : user.user_is_active,
    user_created_at   : user.user_created_at,
    user_updated_at   : user.user_updated_at,
  };
}

export function ctxUserAuthResponse(user: User, token: string): UserAuthRo {
  return {
    id                : user.id,
    user_token        : token,
    user_email        : user.user_email,
    user_first_name   : user.user_first_name,
    user_last_name    : user.user_last_name,
    user_phone        : user.user_phone,
    user_username       : user.user_username,
    user_is_active    : user.user_is_active,
    user_created_at   : user.user_created_at,
    user_updated_at   : user.user_updated_at,
  };
}

export async function tokenSigning(payload: any, jwtSecret: string): Promise<string> {
  const token = await jwt.sign(payload, jwtSecret, { expiresIn: 3600 * 24 * 31 });
  return token;
}
