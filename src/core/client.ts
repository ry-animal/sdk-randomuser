import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { SDKConfig, ApiError } from '../types';

/**
 * HTTP Client for handling API requests
 */
export class HttpClient {
  private axiosInstance: AxiosInstance;

  /**
   * Create a new HTTP client instance
   * @param config SDK configuration options
   */
  constructor(private config: SDKConfig) {
    this.axiosInstance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 10000,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });

    this.setupInterceptors();
  }

  /**
   * Set up request and response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      config => {
        // You can modify the request config here
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        // Transform error to a standardized format
        const apiError: ApiError = {
          code: error.response?.status?.toString() || 'UNKNOWN',
          message: error.response?.data?.message || error.message || 'Unknown error occurred',
          details: error.response?.data?.details || {},
        };

        return Promise.reject(apiError);
      }
    );
  }

  /**
   * Make a GET request
   * @param url Endpoint URL
   * @param params URL parameters
   * @param config Additional Axios config
   */
  public async get<T>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, {
      params,
      ...config,
    });
    return response.data;
  }

  /**
   * Make a POST request
   * @param url Endpoint URL
   * @param data Request body
   * @param config Additional Axios config
   */
  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  /**
   * Make a PUT request
   * @param url Endpoint URL
   * @param data Request body
   * @param config Additional Axios config
   */
  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  /**
   * Make a PATCH request
   * @param url Endpoint URL
   * @param data Request body
   * @param config Additional Axios config
   */
  public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.patch<T>(url, data, config);
    return response.data;
  }

  /**
   * Make a DELETE request
   * @param url Endpoint URL
   * @param config Additional Axios config
   */
  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }
}
