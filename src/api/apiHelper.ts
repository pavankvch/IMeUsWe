import { AxiosRequestConfig } from "axios";
/**
 * Axios instance configured with base URL and default headers.
 * @type {AxiosInstance}
 */
export declare const apiService: import("axios").AxiosInstance;
/**
 * Sends a GET request.
 * @template T
 * @param {string} url - The URL to send the request to.
 * @returns {Promise<T>} The response data.
 * @throws {Error} If the request fails.
 */
export declare const getRequest: <T>(url: string) => Promise<T | undefined>;
/**
 * Sends a POST request.
 * @template T
 * @template TData
 * @param {string} url - The URL to send the request to.
 * @param {TData} data - The data to send in the request body.
 * @param {AxiosRequestConfig} [config={}] - Optional Axios request configuration.
 * @returns {Promise<T>} The response data.
 * @throws {Error} If the request fails.
 */
export declare const postRequest: <T, TData>(url: string, data: TData, config?: AxiosRequestConfig) => Promise<T | undefined>;
/**
 * Sends a PUT request.
 * @template T
 * @template U
 * @param {string} url - The URL to send the request to.
 * @param {U} data - The data to send in the request body.
 * @param {AxiosRequestConfig} [config={}] - Optional Axios request configuration.
 * @returns {Promise<T>} The response data.
 * @throws {Error} If the request fails.
 */
export declare const putRequest: <T, U>(url: string, data: U, config?: AxiosRequestConfig) => Promise<T | undefined>;
/**
 * Sends a DELETE request.
 * @template T
 * @param {string} url - The URL to send the request to.
 * @param {AxiosRequestConfig} [config={}] - Optional Axios request configuration.
 * @returns {Promise<T>} The response data.
 * @throws {Error} If the request fails.
 */
export declare const deleteRequest: <T>(url: string, config?: AxiosRequestConfig) => Promise<T | undefined>;
/**
 * Sends a GET request using a URL without the axios instance.
 * @template T
 * @param {string} url - The URL to send the request to.
 * @param {AxiosRequestConfig} [config={}] - Optional Axios request configuration.
 * @returns {Promise<T>} The response data.
 * @throws {Error} If the request fails.
 */
export declare const getRequestWithUrl: <T>(url: string, config?: AxiosRequestConfig) => Promise<T | undefined>;
/**
 * Sends a POST request using a URL without the axios instance.
 * @template T
 * @template U
 * @param {string} url - The URL to send the request to.
 * @param {U} data - The data to send in the request body.
 * @param {AxiosRequestConfig} [config={}] - Optional Axios request configuration.
 * @returns {Promise<T>} The response data.
 * @throws {Error} If the request fails.
 */
export declare const postRequestWithUrl: <T, U>(url: string, data: U, config?: AxiosRequestConfig) => Promise<T | undefined>;
