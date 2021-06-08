import { DefaultResponse } from "../index.interface";

export interface ServerStatus {
    name: string;
    status: string;
    message: string;
}
export interface MarketSymbol extends DefaultResponse {
    result: {
        id: number;
        symbol: string;
        info: string;
    }[]
}

export interface SymBol {
    [key: string]: Ticker_information
}
export interface Ticker_information {
    id: number;
    last: number;
    lowestAsk: number;
    highestBid: number;
    percentChange: number;
    baseVolume: number;
    quoteVolume: number;
    isFrozen: number;
    high24hr: number;
    low24hr: number;
    change: number;
    prevClose: number;
    prevOpen: number;
}


export interface ListRecentTrade extends DefaultResponse {
    result: TradeDetail[]
}
export interface TradeDetail {
    timestamp: number;
    rate: number;
    amount: number;
    side: string;

}