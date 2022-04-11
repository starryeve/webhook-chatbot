/// <reference types="node" />
declare type HttpHeader = number | string | string[];
declare type HttpHeaders = NodeJS.Dict<HttpHeader>;
interface RequestConfig {
    url: string;
    headers?: HttpHeaders;
    data?: unknown;
}
declare function post<R>(config: RequestConfig): Promise<R>;
declare function get<R>(config: RequestConfig): Promise<R>;
export { get, post };
