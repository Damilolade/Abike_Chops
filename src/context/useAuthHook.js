import { useContext } from "react";
import { AuthContext } from "./AuthContextCreator";

export const useAuth = () => useContext(AuthContext);
