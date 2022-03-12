export const GENERIC_ERROR = 'Something went wrong!';
export const GENERIC_ERROR_RETRY = 'Something went wrong, please try again!';

type Options = Record<string, string | number | boolean | Object | any[]> | null;

export const api = {
  baseURL: './api',
  get: (endpoint: string, external = false) =>
    api.respond('get', endpoint, null, external),
  post: (endpoint: string, options: Options) => api.respond('post', endpoint, options),
  put: (endpoint: string, options: Options) => api.respond('put', endpoint, options),
  patch: (endpoint: string, options: Options) => api.respond('patch', endpoint, options),
  delete: (endpoint: string) => api.respond('delete', endpoint),
  respond: async (
    method: string,
    endpoint: string,
    data?: Options,
    external?: boolean
  ) => {
    const url = external ? endpoint : api.baseURL + endpoint;
    const options = data
      ? {
          headers: new Headers({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(data)
        }
      : {};
    try {
      const response = await fetch(url, { method, ...options });
      const data = await response.json();
      return [null, data];
    } catch (error) {
      return [error];
    }
  }
};

export const debounce = (func: () => void, wait: number) => {
  let timeout: ReturnType<typeof setTimeout> | null;
  return function executedFunction(...args: any) {
    const later = () => {
      timeout = null;
      // @ts-ignore
      func(...args);
    };
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const sleep = (milliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));
