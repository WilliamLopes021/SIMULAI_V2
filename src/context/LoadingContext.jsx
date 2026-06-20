import { createContext, useState, useEffect, useMemo } from "react";

export const LoadingContext = createContext();

let incrementFn = () => {};
let decrementFn = () => {};

export const startGlobalLoading = () => {
  if (incrementFn) incrementFn();
};

export const stopGlobalLoading = () => {
  if (decrementFn) decrementFn();
};

export function LoadingProvider({ children }) {
  const [loadingCount, setLoadingCount] = useState(0);

  const incrementLoading = () => {
    setLoadingCount((prevCount) => prevCount + 1);
  };

  const decrementLoading = () => {
    setLoadingCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  useEffect(() => {
    incrementFn = incrementLoading;
    decrementFn = decrementLoading;

    return () => {
      incrementFn = () => {};
      decrementFn = () => {};
    };
  }, []);

  const setLoadingTrue = () => startGlobalLoading();
  const setLoadingFalse = () => stopGlobalLoading();

  const value = useMemo(
    () => ({
      isLoading: loadingCount > 0,
      loadingCount,
      setLoading: (state) => {
        if (state) setLoadingTrue();
        else setLoadingFalse();
      },
    }),
    [loadingCount],
  );

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
}
