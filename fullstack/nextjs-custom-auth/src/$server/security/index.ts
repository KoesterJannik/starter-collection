import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import { prisma } from "../db";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

export const hashPassword = async (password: string) => {
  const SALT = process.env.BCRYPT_SALT_ROUNDS;
  if (!SALT) throw new Error("SALT is not defined");
  return await bcrypt.hash(password, parseInt(SALT));
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};

type AccessTokenPayload = {
  email: string;
  id: string;
};

export const generateAccessToken = (payload: AccessTokenPayload) => {
  const SECRET = process.env.JWT_ACCESS_SECRET;
  const EXPIRES_IN = process.env.JWT_EXPIRES_IN;
  if (!SECRET) throw new Error("SECRET is not defined");
  if (!EXPIRES_IN) throw new Error("EXPIRES_IN is not defined");
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });
};

export const verifyAccessToken = (token: string) => {
  const SECRET = process.env.JWT_ACCESS_SECRET;
  if (!SECRET) throw new Error("SECRET is not defined");
  return jwt.verify(token, SECRET) as AccessTokenPayload;
};

export const isEmailTaken = async (email: string) => {
  return await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
};

export const hashPasswordAndRegisterUser = async (data: {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}) => {
  const hashedPassword = await hashPassword(data.password);
  return await prisma.user.create({
    data: {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: hashedPassword,
    },
  });
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
};

export const getUserByTokenOrRedirect = async () => {
  try {
    const allTokens = cookies().getAll();

    const token = cookies().get("token");

    if (!token || !token.value || token.value === "") {
      return redirect("/login");
    }
    const decrytedToken = verifyAccessToken(token.value as string) as any;
    const user = await prisma.user.findUnique({
      where: {
        id: decrytedToken.id,
      },
    });
    return user;
  } catch (error) {
    return redirect("/login");
  }
};
export const getUser = async () => {
  try {
    const allTokens = cookies().getAll();

    const token = cookies().get("token");

    if (!token || !token.value || token.value === "") {
      return null;
    }
    const decrytedToken = verifyAccessToken(token.value as string) as any;
    const user = await prisma.user.findUnique({
      where: {
        id: decrytedToken.id,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};
