export const api = {
  baseURL: '/api',
  get: (endpoint, external = false) => api.respond('get', endpoint, null, external),
  post: (endpoint, options) => api.respond('post', endpoint, options),
  put: (endpoint, options) => api.respond('put', endpoint, options),
  patch: (endpoint, options) => api.respond('patch', endpoint, options),
  delete: (endpoint) => api.respond('delete', endpoint),
  respond: async (method, endpoint, data?, external?) => {
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

// Helper to remove async/await try/catch litter
export const promise = (promise: Promise<[boolean, any]>) =>
  promise
    .then((data) => {
      if (data instanceof Error) return [data];
      return [null, data];
    })
    .catch((err) => [err]);

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const sleep = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));
