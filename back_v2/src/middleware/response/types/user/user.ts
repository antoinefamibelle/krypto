export interface UserCreateDto {
  user_first_name?         : string,
  user_last_name?          : string,
  user_email              : string,
  user_phone?             : string,
  user_username?            : string,
  user_password           : string,
  user_is_active          : boolean,
}

export interface UserEditDto {
  user_first_name?        : string,
  user_last_name?         : string,
  user_email?             : string,
  user_password?          : string,
  user_username?            : string,
  user_phone?             : string,
  user_is_active?         : boolean,
}

export interface UserLoginAuthDto {
  user_password           : string,
  user_email              : string
}

export interface UserLoginAuthRo {
  status_code             : number,
  message                 : string,
  data?                   : UserAuthRo
}

export interface UserRo {
  id                      : string,
  user_first_name         : string | null,
  user_last_name          : string | null,
  user_email              : string,
  user_phone              : string | null,
  user_username             : string | null,
  user_is_active          : boolean,
  user_created_at         : Date,
  user_updated_at         : Date
}

export interface UserAuthRo {
  id                      : string,
  user_token              : string,
  user_first_name         : string | null,
  user_last_name          : string | null,
  user_phone              : string | null,
  user_username             : string | null,
  user_email              : string,
  user_is_active          : boolean,
  user_created_at         : Date,
  user_updated_at         : Date
}
