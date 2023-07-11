import { LoginFormData, RegisterFormData } from "@/types";
import axios from "axios";

export const registerUser = async (data: RegisterFormData) => {
  return await axios.post("/api/auth/register", data);
};

export const loginUser = async (data: LoginFormData) => {
  return await axios.post("/api/auth/login", data);
};

export const logoutUser = async () => {
  return await axios.post("/api/auth/logout");
};
