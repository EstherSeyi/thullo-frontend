import { useRouter } from "next/router";
import { useEffect } from "react";
import { useToken } from "../hooks/auth-hook";

const PrivateRoutes = ({ children }) => {
  const router = useRouter();
  const { token } = useToken();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token]);

  return <>{children}</>;
};

export default PrivateRoutes;
