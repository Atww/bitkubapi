import axiosInit from './util/axios';
import { AxiosInstance, AxiosResponse } from 'axios'
import { BITKUB_URL } from './util/constant';
import { E_ErrorResponse } from './interface/Bitkub_Error';
import Response from './util/Response';

class BitkubController {
    protected axios: AxiosInstance;
    protected response: Response;
    constructor() {
        this.axios = axiosInit(BITKUB_URL);
        this.response = new Response();
    }

    protected interceptResponse() {
        this.axios.interceptors.response.use(function (response: AxiosResponse) {
            if (typeof response.data == 'object' && "error" in response.data) {
                response.data.error_msg = E_ErrorResponse[response.data.error] ?? "ไม่พบ Error Code ที่ Server Bitkub ตอบกลับกรุณาแจ้งผู้พัฒนา"
            }
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response;
        }, function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            return Promise.reject(error);
        });
    }

}

export default BitkubController