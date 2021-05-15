export const relativeTime = (timestamp: number) => {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = Date.now() - timestamp;

  if (elapsed < msPerMinute) {
    return Math.floor(elapsed / 1000) + ' seconds ago';
  } else if (elapsed < msPerHour) {
    return Math.floor(elapsed / msPerMinute) + ' minutes ago';
  } else if (elapsed < msPerDay) {
    return Math.floor(elapsed / msPerHour) + ' hours ago';
  } else if (elapsed < msPerMonth) {
    return Math.floor(elapsed / msPerDay) + ' days ago';
  } else if (elapsed < msPerYear) {
    return Math.floor(elapsed / msPerMonth) + ' months ago';
  } else {
    return Math.floor(elapsed / msPerYear) + ' years ago';
  }
};
