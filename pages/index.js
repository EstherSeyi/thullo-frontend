import { useRouter } from "next/router";
import { useEffect } from "react";

import { useToken } from "../hooks/auth-hook";

export default function Home() {
  const { token } = useToken();

  const router = useRouter();
  const isLoggedIn = token?.length;

  useEffect(() => {
    isLoggedIn ? router.push("/boards") : router.push("/login");
  }, [isLoggedIn]);

  return null;
}
