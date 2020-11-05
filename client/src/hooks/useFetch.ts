import { AxiosResponse } from 'axios';
import { useCallback, useState } from 'react';

export const useFetch = <Res = any>() => {
    const [response, setResponse] = useState<Res | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    let isMounted = true;

    const setIsMounted = () => (isMounted = !isMounted);

    const request = useCallback(
        async (
            apiServiceCall: () => Promise<AxiosResponse<Res>>,
            callback?: () => void
        ) => {
            try {
                setLoading(true);

                const { data } = await apiServiceCall();

                if (data && isMounted) {
                    setResponse(data);
                    setLoading(false);
                    if (callback) callback();
                }
            } catch (error) {
                setLoading(false);
                setError(`${error.response.data.message}\n${error.message}`);
            }
        },
        []
    );

    return {
        request,
        response,
        loading,
        error,
        setIsMounted,
    };
};
