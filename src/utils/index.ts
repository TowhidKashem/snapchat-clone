import qs from 'qs';

// Escape a user input string for use in a REGEX search
export const escapeRegex = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Helper to remove async/await try/catch litter
// @Credit: https://gist.github.com/DavidWells/54f9dd1af4a489e5f1358f33ce59e8ad
export const promise = (promise) =>
  promise
    .then((data) => {
      if (data instanceof Error) return [data];
      return [null, data];
    })
    .catch((err) => [err]);

export const api = async (url, params = {}) => {
  url += qs.stringify(params, { addQueryPrefix: true });
  const [error, response] = await promise(fetch(url).then((response) => response.json()));
  return [error, response];
};
