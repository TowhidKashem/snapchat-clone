// Helper to remove async/await try/catch litter
// https://gist.github.com/DavidWells/54f9dd1af4a489e5f1358f33ce59e8ad
export const promise = (promise: Promise<any>) =>
  promise
    .then((data) => {
      if (data instanceof Error) return [data];
      return [null, data];
    })
    .catch((err) => [err]);
