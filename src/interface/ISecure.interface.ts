import { Balances,Wallet,PlaceBid } from './Secure/IResponse.interface';

interface ISecureBase {
    avaliable_wallet(): Promise<Wallet>; // only avaliable wallet 
    current_balances(): Promise<Balances>; //available and reserved balances 
    createBuyOrder(symbol:string,amount:number,rate:number,type:"limit" | "market",isTest:boolean): Promise<PlaceBid>; //available and reserved balances 
}

export default ISecureBase