import Constants from 'expo-constants';
import { Httpresult, HttpResponse } from '@/types'
const { API_BASE_URL } = Constants.expoConfig?.extra || {};


interface RequestOptions extends RequestInit {
    headers?: Record<string, string>;
    body?: any;
    params?: Record<string, string>;
}

const useHttp = () => {

    const requsest = async <T>(endpoint: string, options: RequestOptions = {}): Httpresult<T> => {
        const { body, ...restOptions } = options;
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                ...restOptions,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Request failed');
            }

            const data = await response.json();
            return data as HttpResponse<T>;
        } catch (err) {
            console.error('Error in useHttp:', err);
            return {
                status: 500,
                data: null as T,
                message: 'Request failed',
            };
        } finally {
        }
    };

    const get = <T>(endpoint: string, option?: RequestOptions) => requsest<T>(endpoint, { method: 'GET', ...option })
    const post = <T>(endpoint: string, option?: RequestOptions) => requsest<T>(endpoint, { method: 'POST', ...option })
    const put = <T>(endpoint: string, option?: RequestOptions) => requsest<T>(endpoint, { method: 'PUT', ...option })
    const del = <T>(endpoint: string, option?: RequestOptions) => requsest<T>(endpoint, { method: 'DELETE', ...option })

    return { get, post, put, del };
}

export default useHttp;
