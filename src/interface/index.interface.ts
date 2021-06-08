export interface DefaultResponse {
    error: number;
    error_msg?: string;
}

export interface ErrorResponse {
    code: string,
    msg: string

}