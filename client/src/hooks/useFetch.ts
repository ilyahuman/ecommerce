import { useCallback, useEffect, useState } from 'react';
import axios, { Method } from 'axios';
import { AuthToken } from '../types';

export function getAuthToken() {
    const storedToken = localStorage.getItem('token');
    let token: AuthToken | null = null;
    debugger;
    if (storedToken) {
        token = JSON.parse(storedToken);
    }

    if (token) {
        // for Express back-end
        return { authorization: `Bearer ${token.accessToken}` };
    } else {
        return {};
    }
}

export const useFetch = <Req = any, Res = any>() => {
    const [response, setResponse] = useState<Res | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const request = useCallback(
        async (url: string, method?: Method, request?: Req) => {
            try {
                setLoading(true);

                const { data } = await axios.request<Res>({
                    url: url,
                    method: method,
                    data: request,
                    headers: getAuthToken(),
                });

                if (data) {
                    setResponse(data);
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                setError(error.message);
            }
        },
        []
    );

    return {
        request,
        response,
        loading,
        error,
    };
};
