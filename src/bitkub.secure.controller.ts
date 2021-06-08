import axios, { AxiosResponse, AxiosError, } from 'axios'
import BitkubController from './bitkub.controller';
import PayLoad from './util/payload'
import { IPayload } from './interface/Secure/IPayload.interface';
import ISecureBase from './interface/ISecure.interface';
import { Balances } from './interface/Secure/IResponse.interface';
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