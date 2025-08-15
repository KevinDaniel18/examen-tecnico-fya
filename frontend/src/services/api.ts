import { CreateCredit } from "@/types/credits";
import { CreateUser, LoginUserData } from "@/types/user";
import { instance } from "./axiosInstance";

export const createCredit = (creditData: CreateCredit) =>
  instance.post("/credits", creditData);

export const getCredits = () => instance.get("/credits");

export const createUser = (userData: CreateUser) =>
  instance.post("/users", userData);

export const getUsers = () => instance.get("/users");

export const loginUser = (userData: LoginUserData) =>
  instance.post("/auth/login", userData);
