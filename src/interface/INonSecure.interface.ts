import { ServerStatus, MarketSymbol, SymBol, ListRecentTrade } from './NonSecure/IServerStatus.interface';

interface INonSecureBase {
    status(): Promise<ServerStatus[]>; //Get endpoint status. When status is not ok, it is highly recommended to wait until the status changes back to ok.
    servertime(): Promise<number>; // Get server timestamp.
    market_symbols(): Promise<MarketSymbol>; //List all available symbols.
    market_ticker(symbol?: string): Promise<SymBol>; //Get ticker information.
    market_trade(symbol: string, limit: number): Promise<ListRecentTrade>; //List recent trades.
    getSymbols():Promise<string[]> // Utill Func to get Array Symbols
}

export default INonSecureBase