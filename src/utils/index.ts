// Escape a user input string for use in a REGEX search
export const escapeRegex = (string: string) =>
  string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Helper to remove async/await try/catch litter
// https://gist.github.com/DavidWells/54f9dd1af4a489e5f1358f33ce59e8ad
export const promise = (promise) =>
  promise
    .then((data) => {
      if (data instanceof Error) return [data];
      return [null, data];
    })
    .catch((err) => [err]);

export const api = {
  baseURL: 'http://localhost:3050/api',
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
    const [error, response] = await promise(
      fetch(url, {
        method,
        ...options
      }).then((response) => response.json())
    );
    return [error, response];
  }
};

// Recursive function to load scripts in order then perform callback
export const loadScripts = (scripts, callback?) => {
  const loadScript = (index) => {
    const script = document.createElement('script');
    script.src = scripts[index];
    script.onload = () => {
      if (index + 1 !== scripts.length) loadScript(index + 1);
      else if (callback) callback();
    };
    document.body.appendChild(script);
  };
  loadScript(0);
};

export const randomArrayVal = (arr) => arr[Math.floor(Math.random() * arr.length)];

// https://gist.github.com/liamnewmarch/a345fbf0c4fdf938d9844b82a4f127ab
export const relativeTime = (timestamp: number) => {
  const { language = 'en-US' } = navigator;
  //@ts-ignore
  const formatter = new Intl.RelativeTimeFormat(language, {
    numeric: 'auto',
    style: 'long'
  });
  const ms = timestamp - Date.now();
  const years = Math.ceil(ms / 31536e6);
  if (years) return formatter.format(years, 'year');
  const months = Math.ceil(ms / 168e6);
  if (months) return formatter.format(months, 'month');
  const days = Math.ceil(ms / 864e5);
  if (days) return formatter.format(days, 'day');
  const hours = Math.ceil(ms / 36e5);
  if (hours) return formatter.format(hours, 'hour');
  const minutes = Math.ceil(ms / 6e4);
  if (minutes) return formatter.format(minutes, 'minute');
  const seconds = Math.ceil(ms / 1e3);
  return formatter.format(seconds, 'second');
};

export const playSound = (sound: string) => {
  const soundMap = {
    newAppMessage: './audio/blip.mp3',
    newSystemMessage: './audio/ding.mp3',
    cameraShutter: './audio/shutter.mp3'
  };
  new Audio(soundMap[sound]).play();
};

export const celsiusToFahrenheit = (celsius: number): number =>
  Math.round(celsius * 1.8 + 32);
