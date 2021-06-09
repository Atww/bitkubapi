import axios, { AxiosResponse, AxiosError, } from 'axios'
import BitkubController from './bitkub.controller';
import PayLoad from './util/payload'
import { IPayload } from './interface/Secure/IPayload.interface';
import ISecureBase from './interface/ISecure.interface';
import { Balances, PlaceBid, Wallet } from './interface/Secure/IResponse.interface';
class BitkubSecure extends BitkubController implements ISecureBase {
    private BitKub_API_Key: string;
    private BitKub_Secret_Key: string;
    private payload: PayLoad;

    constructor(BitKub_API_Key: string, BitKub_Secret_Key: string) {
        super();
        this.BitKub_API_Key = BitKub_API_Key;
        this.BitKub_Secret_Key = BitKub_Secret_Key;
        this.payload = new PayLoad(this.BitKub_Secret_Key);

        this.axios.defaults.headers.common['Accept'] = "application/json";
        this.axios.defaults.headers.common['Content-type'] = "application/json";
        this.axios.defaults.headers.common['X-BTK-APIKEY'] = BitKub_API_Key;

        this.interceptResponse();
    }
    createBuyOrder(symbol: string, amount: number, rate: number, type: 'limit' | 'market',isTest:boolean=false): Promise<PlaceBid> {
        return new Promise<PlaceBid>(async (resolve, reject) => {
            try {
                if(type === "market"){
                    rate = 0;
                }
                const body: IPayload = await this.payload.createBodyPayload({
                    sym:symbol,
                    amt:amount,
                    rat:rate,
                    typ:type,
                });
                const response: AxiosResponse = await this.axios.post(`/api/market/place-bid${isTest ? '/test':''}`, {
                    ...body
                })
                const walletUser: PlaceBid = response.data;
                resolve(walletUser);
            } catch (error) {
                reject(this.response.error(error))
            }
        });
    }
    avaliable_wallet(): Promise<Wallet> {
        return new Promise<Wallet>(async (resolve, reject) => {
            try {
                const body: IPayload = await this.payload.createBodyPayload();
                const response: AxiosResponse = await this.axios.post('/api/market/balances', {
                    ...body
                })
                const walletUser: Wallet = response.data;
                resolve(walletUser);
            } catch (error) {
                reject(this.response.error(error))
            }

        });
    }

    current_balances(): Promise<Balances> {
        return new Promise<Balances>(async (resolve, reject) => {
            try {
                const body: IPayload = await this.payload.createBodyPayload();
                const response: AxiosResponse = await this.axios.post('/api/market/balances', {
                    ...body
                })
                const balancesUser: Balances = response.data;
                resolve(balancesUser);
            } catch (error) {
                reject(this.response.error(error))
            }

        });
    }
}

export default  BitkubSecure