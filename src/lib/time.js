// Convert milliseconds since epoch to friendly time i.e. "123456789" => "x months ago

export const SECOND = 1000;
export const MINUTE = 60*SECOND;
export const HOUR = 60*MINUTE;
export const DAY = 24*HOUR;
export const WEEK = 7*DAY;

export function friendlyDuration(millis) {
  let friendly = '';
  let weeks = Math.floor(millis / WEEK);
  if(weeks >= 1) {
    friendly += `${weeks} ${weeks > 1 ? 'weeks' : 'week'} `;
  }

  let days = Math.floor((millis - weeks*WEEK) / DAY);
  if (days >= 1) {
    friendly += `${days} ${days > 1 ? "days" : "day"} `;
  }

  let hours = Math.floor((millis - weeks*WEEK - days*DAY) / HOUR);
  if (hours >= 1) {
    friendly += `${hours} ${hours > 1 ? 'hours' : 'hour'} `;
  }


  let minutes = Math.floor((millis - weeks*WEEK - days*DAY - hours*HOUR) / MINUTE);
  if (minutes >= 1) {
    friendly += `${minutes} ${minutes > 1 ? "minutes" : "minute"} `;
  }

  let seconds = Math.floor((millis - weeks*WEEK - days*DAY - hours*HOUR - minutes*MINUTE * MINUTE) / SECOND);
  if (seconds >= 1) {
    friendly += `${seconds} ${seconds > 1 ? "seconds" : "second"}`;
  }

  return friendly;
}

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