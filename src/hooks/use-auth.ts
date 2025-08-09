import { jwtDecode } from "jwt-decode";
import type { DecodedToken } from "@/types/decoded-token";
import { useState, useEffect } from "react";

export function useAuth() {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [invalidToken, setInvalidToken] = useState<boolean>(false);
  const [tokenNotFound, setTokenNotFound] = useState<boolean>(false);
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (!authToken) {
      setTokenNotFound(true);
      return;
    }

    try {
      const decodedUser = jwtDecode<DecodedToken>(authToken);
      setUser(decodedUser);
    } catch (error: unknown) {
      if (error) {
        setInvalidToken(true);
      }
    }
  }, [authToken]);

  return { user, authToken, invalidToken, tokenNotFound };
}
