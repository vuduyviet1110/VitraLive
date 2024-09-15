import createViewerToken from "@/actions/token";
import { useEffect, useState } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
const useViewerToken = (hostIndentity: string) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");

  useEffect(() => {
    const createToken = async () => {
      try {
        const token = await createViewerToken(hostIndentity);
        setToken(token);
        console.log(token);

        const decodedToken = jwtDecode(token) as JwtPayload & { name: string };
        decodedToken.name ? setName(decodedToken.name) : "";
        decodedToken.jti ? setIdentity(decodedToken.jti) : "";
      } catch (error) {
        console.log(token);
        console.log(error);
      }
    };

    createToken();
  }, [hostIndentity]);
  return {
    token,
    name,
    identity,
  };
};
export default useViewerToken;
