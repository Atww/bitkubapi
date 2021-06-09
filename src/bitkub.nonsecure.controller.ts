import { AxiosResponse } from 'axios'
import { ListRecentTrade, MarketSymbol, ServerStatus, SymBol, TradeDetail } from './interface/NonSecure/IServerStatus.interface';
import INonSecureBase from './interface/INonSecure.interface';
import BitkubController from './bitkub.controller';
class BitkubNonSecure extends BitkubController implements INonSecureBase {
    constructor() {
        super();
        this.axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*",
        this.axios.defaults.headers.common['Access-Control-Allow-Headers'] = "*",

        this.interceptResponse();
    }
    getSymbols(): Promise<string[]> {
        return new Promise<string[]>(async (resolve, reject) => {
            try {
                const response: MarketSymbol = await this.market_symbols();
                let arraySymbol = [];
                response.result.forEach(({symbol})=>{
                    let [THB,Symbol] = symbol.split("_");
                    if(Symbol){
                        arraySymbol.push(Symbol);
                    }
                })
                resolve(arraySymbol);
            } catch (error) {
                reject(this.response.error(error))
            }
        });
        
    }
    status(): Promise<ServerStatus[]> {
        return new Promise<ServerStatus[]>(async (resolve, reject) => {
            try {
                const response: AxiosResponse = await this.axios.get('/api/status')
                const status: ServerStatus[] = response.data;
                resolve(status);
            } catch (error) {
                reject(this.response.error(error))
            }

        });
    }
    servertime(): Promise<number> {
        return new Promise<number>(async (resolve, reject) => {
            try {
                const response: AxiosResponse = await this.axios.get('/api/servertime')
                const servertime: number = response.data;
                resolve(servertime);
            } catch (error) {
                reject(this.response.error(error))
            }

        });
    }
    market_symbols(): Promise<MarketSymbol> {
        return new Promise<MarketSymbol>(async (resolve, reject) => {
            try {
                const response: AxiosResponse = await this.axios.get('/api/market/symbols')
                const marketSymbol: MarketSymbol = response.data;
                resolve(marketSymbol);
            } catch (error) {
                reject(this.response.error(error))
            }

        });
    }
    market_ticker(symbol?: string): Promise<SymBol> {
        return new Promise<SymBol>(async (resolve, reject) => {
            try {
                const response: AxiosResponse = await this.axios.get(`/api/market/ticker${symbol ? '?sym=' + symbol : ''}`)
                const marketDetail: SymBol = response.data;
                resolve(marketDetail);
            } catch (error) {
                reject(this.response.error(error))
            }

        });
    }
    market_trade(symbol: string, limit: number = 10): Promise<ListRecentTrade> {
        return new Promise<ListRecentTrade>(async (resolve, reject) => {
            try {
                const response: AxiosResponse = await this.axios.get(`/api/market/trades?sym=${symbol}&lmt=${limit}`)
                const TempTradeDetail = <ListRecentTrade>{
                    error: response.data.error,
                    error_msg: response.data.error_msg,
                };
                TempTradeDetail.result = [];
                var IMyTable: Array<keyof TradeDetail> = ["timestamp", "rate", "amount", "side"];
                response.data.result.forEach((item: []) => {
                    const T_Detail = <TradeDetail>{};
                    item.forEach((val, index) => {
                        T_Detail[IMyTable[index]] = val
                    })
                    TempTradeDetail.result.push(T_Detail);
                })
                resolve(TempTradeDetail);
            } catch (error) {
                reject(this.response.error(error))
            }

        });
    }
}
export default BitkubNonSecure