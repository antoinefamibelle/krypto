export interface KryptoEditDto {
  krypto_name    : string | "",
  krypto_amount? : any,
  krypto_average_price?: any
}

export interface KryptoCreateDto {
  krypto_name           : string,
  user_id                     :string
}

export interface KryptoRo {
  id                      : string,
  krypto_name    : string,
  krypto_amount  : number | "",
  krypto_average_price : number | "",
  krypto_created_at         : Date,
  krypto_updated_at         : Date
}
