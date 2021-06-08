import { ServerStatus, MarketSymbol, SymBol, ListRecentTrade } from './NonSecure/IServerStatus.interface';
import { Balances } from './Secure/IResponse.interface';

interface ISecureBase {
    current_balances(): Promise<Balances>;
}

export default ISecureBase