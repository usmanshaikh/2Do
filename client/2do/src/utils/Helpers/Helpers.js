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

export function hideFooter() {
  const isMobile = detectMobile();
  if (isMobile) document.getElementsByClassName("menuComponentWrapper")[0].style.display = "none";
}

export function showFooter() {
  document.getElementsByClassName("menuComponentWrapper")[0].style.display = "block";
}

function detectMobile() {
  const toMatch = [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];
  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
}
