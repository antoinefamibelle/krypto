import { Krypto } from "@prisma/client"

import { KryptoRo } from '../../middleware/response/types/krypto';

export function ctxKryptoResponse(krypto: Krypto): KryptoRo {
  return {
    id                : krypto.id,
    krypto_amount: krypto.krypto_amount,
    krypto_average_price: krypto.krypto_average_price,
    krypto_name:  krypto.krypto_name,
    krypto_created_at   : krypto.krypto_created_at,
    krypto_updated_at   : krypto.krypto_updated_at,
  };
}
