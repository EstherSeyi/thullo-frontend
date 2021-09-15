import { useRouter } from "next/router";
import { useEffect } from "react";

import { useToken, useUser } from "../hooks/auth-hook";

const Logout = () => {
  const { clearToken } = useToken();
  const { clearUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    clearToken();
    clearUser();
    router.push("/");
  }, []);

  return null;
};

export default Logout;
