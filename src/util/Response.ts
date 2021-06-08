import axios, { AxiosError } from 'axios'
import { ErrorResponse } from '../interface/index.interface';

class Response {
    constructor() {
    }

    public error(error: any): ErrorResponse {
        const response = <ErrorResponse>{};
        if (axios.isAxiosError(error)) {
            const ErrAxios: AxiosError = error;
            response.code = ErrAxios.code?.toString() ?? '-';
            response.msg = ErrAxios.message
        } else {
            response.code = error
            response.msg = 'เกิดขึ้นผิดพลาด'
        }
        return response

    }


}
export default Response