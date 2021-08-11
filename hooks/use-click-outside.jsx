import { useEffect } from "react";

const useClickOutside = (ref, action) => {
  const handleClick = (event) => {
    if (ref?.current?.contains(event.target)) {
      return;
    }
    action();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
};

export default useClickOutside;
