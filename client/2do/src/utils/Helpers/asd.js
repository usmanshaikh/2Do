import constants from "../constants";

const MSG = constants.message;

export const truncateString = (str, number = 90) => {
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
};

export const addLeadingZero = (n) => {
  return n < 10 && n >= 1 ? "0" + n : n;
};

export const slugify = (str) => {
  return str.split(" ").join("-");
};

export const unslugify = (str) => {
  return str.split("-").join(" ");
};

export const hideFooter = () => {
  const isMobile = detectMobile();
  if (isMobile) document.getElementsByClassName("menuComponentWrapper")[0].style.display = "none";
};

export const showFooter = () => {
  document.getElementsByClassName("menuComponentWrapper")[0].style.display = "block";
};

export const detectMobile = () => {
  const toMatch = [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];
  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
};

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

export const setIsCompleted = (status) => {
  const completionStatusMap = {
    [MSG.STATUS_ALL]: undefined,
    [MSG.STATUS_PENDING]: false,
    [MSG.STATUS_COMPLETED]: true,
  };
  if (status in completionStatusMap) {
    return completionStatusMap[status];
  }
  return null;
};

export const setPageTitle = (location) => {
  const { pathname, search } = location;
  const params = new URLSearchParams(search);
  const editStatus = params.get("edit");

  const titleMap = {
    "/task": "Task",
    "/checklist": "Checklist",
    "/category": "Category",
    "/profile": "Profile",
  };

  if (pathname.startsWith("/task/add-edit-task")) {
    return editStatus === "true" ? "Edit Task" : "Add Task";
  }
  if (pathname.startsWith("/checklist/add-edit-checklist")) {
    return editStatus === "true" ? "Edit Checklist" : "Add Checklist";
  }

  return titleMap[pathname] || "2Do";
};
