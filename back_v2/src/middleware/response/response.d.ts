import { StatusCodes } from "http-status-codes";

import { KryptoRo } from "./types/krypto";
import { UserRo } from "./types/user";

export interface IGenericObject {
  [key: string]: unknown
}

export interface IRo {
  metadata: {
    status_code:          number,
    total:                number,
    total_per_page:       number,
    current_endpoint:     string,
    next:                 string,
    previous:             string
  },
  success:                  boolean,
  message:                  string,
  data:                     Array<IGenericObject>
}

export interface IMSResponse {
  data?    :  UserRo[] | KryptoRo[],
  count?   :  number,
  message? :  string,
  httpCode?:  StatusCodes
}
