export const api = {
  baseURL: 'https://inspiring-easley-e7d034.netlify.app',
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
