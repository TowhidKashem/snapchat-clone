import { Object } from 'types';

type Options = Object<any> | null;

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

// https://gist.github.com/DavidWells/54f9dd1af4a489e5f1358f33ce59e8ad
export const promise = (promise: Promise<[boolean, any]>) =>
  promise
    .then((data) => {
      if (data instanceof Error) return [data];
      return [null, data];
    })
    .catch((err) => [err]);

// https://levelup.gitconnected.com/debounce-in-javascript-improve-your-applications-performance-5b01855e086
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
