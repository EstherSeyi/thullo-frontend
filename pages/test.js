import { useEffect } from "react";
import { useRouter } from "next/router";

import { useAppMutation } from "../hooks/query-hook";
import { useToken, useUser } from "../hooks/auth-hook";

const AuthTestUser = () => {
  const router = useRouter();
  const { setToken } = useToken();
  const { setUser } = useUser();
  const { mutate, isLoading } = useAppMutation(
    {
      url: "auth/local",
    },
    {
      onSuccess: (data) => {
        setToken(data.jwt);
        setUser(data?.user);

        router.push("/");
      },
      onError: (error) => {
        console.log(error?.message);
      },
    }
  );

  useEffect(() => {
    mutate({
      identifier: "Fola",
      password: "logmein",
    });
  }, []);

  return isLoading ? <p>Please Wait...</p> : null;
};

export default AuthTestUser;
