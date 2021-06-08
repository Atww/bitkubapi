import { BITKUB_URL_WS } from './util/constant';
import WebSocket from 'ws'
class WebSocketBitkubController {
    private serviceName: string
    private serviceType: string
    private symbol: string
    private ws: WebSocket
    constructor() {
    }
    public setFullStreamName(serviceName: string, serviceType: string, symbol: string): void {
        this.serviceName = serviceName;
        this.serviceType = serviceType;
        this.symbol = symbol;
    }
    public setServiceName(serviceName: string): void {
        this.serviceName = serviceName;
    }
    public setServiceType(serviceType: string): void {
        this.serviceType = serviceType;
    }
    public setSymbol(symbol: string): void {
        this.symbol = symbol;
    }
    public getStreamName() :string {
        return `${this.serviceName}.${this.serviceType}.${this.symbol}`;
    }
    public initWebSocket():void{
        this.ws = new WebSocket(`${BITKUB_URL_WS}/${this.serviceName}.${this.serviceType}.${this.symbol}`)
    }
    public getWebSocket():WebSocket{
        return this.ws
    }
}

export default WebSocketBitkubController