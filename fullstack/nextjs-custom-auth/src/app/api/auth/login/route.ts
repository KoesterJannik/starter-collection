import { NextResponse } from "next/server";

import {
  generateAccessToken,
  getUserByEmail,
  hashPasswordAndRegisterUser,
  isEmailTaken,
  verifyPassword,
} from "@/$server/security";
import { z } from "zod";
import { loginSchema } from "@/schemas";

export async function POST(request: Request) {
  try {
    const data = loginSchema.parse(await request.json());
    const doesUserExist = await getUserByEmail(data.email);
    if (!doesUserExist)
      return new Response("User does not exist", { status: 400 });
    const doPasswordsMatch = await verifyPassword(
      data.password,
      doesUserExist.password
    );
    if (!doPasswordsMatch)
      return new Response("Invalid password", { status: 400 });
    const jwtToken = generateAccessToken({
      id: doesUserExist.id,
      email: doesUserExist.email,
    });

    return new Response("User logged in", {
      status: 200,

      headers: { "Set-Cookie": `token=${jwtToken}; path=/` },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.flatten().fieldErrors;
      console.log(errorMessage);
      return new Response(JSON.stringify(errorMessage), { status: 400 });
    }
    console.log(error);
    return new Response("Invalid data", { status: 400 });
  }
}
