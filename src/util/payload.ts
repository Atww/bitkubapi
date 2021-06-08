import { createHmac } from 'crypto';
import BitkubNonSecure from '../bitkub.nonsecure.controller'
import { IPayload } from '../interface/Secure/IPayload.interface';
class PayLoad {
    private bitkubserver: BitkubNonSecure;
    private BitKub_Secret_Key: string;

    constructor(BitKub_Secret_Key: string) {
        this.BitKub_Secret_Key = BitKub_Secret_Key;
        this.bitkubserver = new BitkubNonSecure();
    }
    private createSignature(body: IPayload): string {
        const str = JSON.stringify(body);
        let hashSignature: string = createHmac('sha256', this.BitKub_Secret_Key)
            .update(str)
            .digest("hex");
        return hashSignature;
    }

    public async createBodyPayload(payload?: IPayload): Promise<object> {
        const body: IPayload = {
            ...payload
        };
        if (!body.ts) {
            const time = await this.bitkubserver.servertime();
            body.ts = time;
        }
        const hash = this.createSignature(body);
        body.sig = hash;
        return body;
    }

}
export default PayLoad