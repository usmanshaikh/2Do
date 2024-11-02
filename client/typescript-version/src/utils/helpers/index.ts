import { Dispatch } from "@reduxjs/toolkit";
import { MSG } from "../constants";
import { showSnackbar } from "../../store/slices";

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

export const hideFooter = () => {
  const isMobile = detectMobile();
  if (isMobile) {
    const footerElement = document.getElementsByClassName("menuComponentWrapper")[0] as HTMLElement | undefined;
    if (footerElement) {
      footerElement.style.display = "none";
    }
  }
};

export const showFooter = () => {
  const footerElement = document.getElementsByClassName("menuComponentWrapper")[0] as HTMLElement | undefined;
  if (footerElement) {
    footerElement.style.display = "block";
  }
};

export const detectMobile = () => {
  const toMatch = [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];
  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
};

export const setIsCompleted = (status) => {
  const completionStatusMap = {
    [MSG.STATUSES.ALL]: undefined,
    [MSG.STATUSES.PENDING]: false,
    [MSG.STATUSES.COMPLETED]: true,
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

export const getAxiosErrorMessage = (error) => {
  const errorMessage = error?.response?.data?.message || error?.message || MSG.ERROR_MESSAGE;
  return errorMessage;
};
