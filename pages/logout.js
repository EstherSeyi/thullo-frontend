import { useRouter } from "next/router";
import { useEffect } from "react";

import { useToken, useUser } from "../hooks/auth-hook";
import { useAppInfo } from "../hooks/use-app-info";

const Logout = () => {
  const { clearToken } = useToken();
  const { clearUser } = useUser();
  const { clearAppInfo } = useAppInfo();
  const router = useRouter();

  useEffect(() => {
    clearToken();
    clearUser();
    clearAppInfo();
    router.push("/");
  }, []);

  return null;
};

export default Logout;
