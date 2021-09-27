import { useState } from "react";

export const useAppInfo = () => {
  const getAppInfo = () => {
    if (typeof window !== "undefined" && window?.sessionStorage) {
      const appSting = sessionStorage.getItem("app");
      const app = JSON.parse(appSting);
      return app;
    }
  };

  const [appInfo, setAppInfo] = useState(getAppInfo());

  const saveAppInfo = (key, value) => {
    if (window !== undefined && window?.sessionStorage) {
      sessionStorage.setItem(
        "app",
        JSON.stringify({ ...appInfo, [key]: value })
      );
      setAppInfo((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    }
  };

  const clearAppInfo = () => {
    if (window !== undefined && window?.sessionStorage) {
      sessionStorage.removeItem("app");
      setAppInfo(null);
    }
  };

  return {
    setAppInfo: saveAppInfo,
    appInfo,
    clearAppInfo,
  };
};
