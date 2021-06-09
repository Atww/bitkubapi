import { DefaultResponse } from "../index.interface";

export interface Balances extends DefaultResponse {
    result: {
        [Symbol: string]:{
            available: number;
            reserved: number;
        }
    }
}
export interface Wallet extends DefaultResponse {
    result: {
        [Symbol: string]:number
    }
}
export interface Wallet extends DefaultResponse {
    result: {
        [Symbol: string]:number
    }
}

export interface PlaceBid extends DefaultResponse {
    result:{
        /** order id */
        id: number; 
        /** order hash */
        hash: string;
        /** order type */
        typ: string;
        /** spending amount */
        amt: number;
        /** rate */
        rat: number;
        /** fee */
        fee: number;
        /** fee credit used */
        cre: number;
        /** amount to receive */
        rec: number;
        /** timestamp */
        ts: number;
    }
  }
  