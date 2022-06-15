export function truncateString(str, number = 90) {
  let modifiedStr = str;
  if (str.length > number) modifiedStr = `${str.slice(0, number)}...`;
  return modifiedStr;
}
