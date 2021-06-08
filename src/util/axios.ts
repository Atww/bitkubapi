import axios, { AxiosInstance } from 'axios'
function axiosInit(baseUrl: string, timeout = 10000, headers = {}) {
    const Instance: AxiosInstance = axios.create({
        baseURL: baseUrl,
        timeout,
        headers
    });
    return Instance;
}

export default axiosInit;