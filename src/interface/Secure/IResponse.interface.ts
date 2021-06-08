import { DefaultResponse } from "../index.interface";

export interface Balances extends DefaultResponse {
    result: {
        [Symbol: string]:{
            available: number;
            reserved: number;
        }
    }
}