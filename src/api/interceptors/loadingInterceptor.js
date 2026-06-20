import {
  startGlobalLoading,
  stopGlobalLoading,
} from "../../context/LoadingContext";

export const loadingInterceptor = (instance) => {
  instance.interceptors.request.use((config) => {
    startGlobalLoading();
    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      stopGlobalLoading();
      return response;
    },
    (error) => {
      stopGlobalLoading();
      return Promise.reject(error);
    }
  );

  return instance;
};
