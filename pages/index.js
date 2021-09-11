import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const isLoggedIn = false;

  useEffect(() => {
    isLoggedIn ? router.push("/boards") : router.push("/login");
  }, [isLoggedIn]);

  return null;
}
