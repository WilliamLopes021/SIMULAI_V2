let isRefreshing = false;
let failedQueue = [];

let getAccessToken = () => null; // será definido pelo AuthContext
let refreshAuth = () => null;
 
export const setAccessTokenGetter = (fn) => {
  getAccessToken = fn;
};

export const setRefreshAuthFunction= (refresh) => {
  refreshAuth = refresh;
}

// access
const authInterceptor = (instance) => {
  instance.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return instance(originalRequest);
            })
            .catch(Promise.reject);
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const newTokens = await refreshAuth();
          failedQueue.forEach((p) => p.resolve(newTokens.acessToken));
          failedQueue = [];
          isRefreshing = false;

          return instance({
            ...originalRequest,
            headers: {
              ...originalRequest.headers,
              Authorization: `Bearer ${newTokens.acessToken}`,
            },
          });
        } catch (err) {
          failedQueue.forEach((p) => p.reject(err));
          failedQueue = [];
          isRefreshing = false;
          throw err;
        }
      }

      throw error;
    }
  );

  return instance;
};

export default authInterceptor;
