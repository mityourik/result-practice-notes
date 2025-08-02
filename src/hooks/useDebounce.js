import { useCallback, useRef } from 'react';
import { debounce } from '../pages/Main/utils/debounce';

export const useDebounce = (callback, delay) => {
    const debouncedFn = useRef();
    const callbackRef = useRef(callback);

    callbackRef.current = callback;

    return useCallback(
        (...args) => {
            if (!debouncedFn.current) {
                debouncedFn.current = debounce((...debouncedArgs) => {
                    callbackRef.current(...debouncedArgs);
                }, delay);
            }
            return debouncedFn.current(...args);
        },
        [delay]
    );
};
