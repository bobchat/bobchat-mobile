// Convert milliseconds since epoch to friendly time i.e. "123456789" => "x months ago
export function timeSince (date) {
  let millis = date.getTime();
  if (!millis) return 'Moments Ago';

  var seconds = Math.floor((new Date() - millis) / 1000);
  var interval = Math.floor(seconds / (60 * 60 * 24 * 365));


  if (interval >= 1) {
    return interval + ` year${(interval != 1) ? 's' : ''} ago`;
  }

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval + ` month${(interval != 1) ? 's' : ''} ago`;
  }

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + ` day${(interval != 1) ? 's' : ''} ago`;
  }

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + ` hour${(interval != 1) ? 's' : ''} ago`;
  }

  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + ` minute${(interval != 1) ? 's' : ''} ago`;
  }

  if (seconds > 0) {
    return seconds + ` second${(interval != 1) ? 's' : ''} ago`;
  }

  return 'Moments ago';
}