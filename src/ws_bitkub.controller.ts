import { on } from "ws";
import { BITKUB_URL_WS } from './util/constant';

class WebSocketBitkubController {
    private serviceName: string
    private serviceType: string
    private symbol: string
    private ws: WebSocket
    constructor() {
    }
    public setStreamName(serviceName: string, serviceType: string, symbol: string): void {
        this.serviceName = serviceName;
        this.serviceType = serviceType;
        this.symbol = symbol;
        this.ws = new WebSocket(`${BITKUB_URL_WS}/${serviceName}.${serviceType}.${symbol}`)
    }
    public getWs() {
        return this.ws;
    }

}

export  {WebSocketBitkubController}