import constants from "../constants";

const MSG = constants.message;

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

export function addLeadingZero(n) {
  return n < 10 && n >= 1 ? "0" + n : n;
}

export function slugify(str) {
  return str.split(" ").join("-");
}

export function unslugify(str) {
  return str.split("-").join(" ");
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

export const getLocalAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const getLocalRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const setLocalAccessToken = (token) => {
  return localStorage.setItem("accessToken", token);
};

export const setLocalRefreshToken = (token) => {
  return localStorage.setItem("refreshToken", token);
};

export const filterByToBoolean = (str) => {
  let status;
  switch (str) {
    case MSG.FITER_BY_ALL:
      status = undefined;
      break;
    case MSG.FITER_BY_PENDING:
      status = false;
      break;
    case MSG.FITER_BY_COMPLETED:
      status = true;
      break;
  }
  return status;
};
