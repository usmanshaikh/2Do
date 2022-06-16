export function truncateString(str, number = 90) {
  let modifiedStr = str;
  if (str.length > number) {
    str = str.slice(0, number).trim();
    if (str[str.length - 1] === ".") {
      str = str.slice(0, -1);
      // checking if string already have dot then remove.
    }
    modifiedStr = `${str}...`;
  }
  return modifiedStr;
}
