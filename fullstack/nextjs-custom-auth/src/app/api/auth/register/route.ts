import { NextResponse } from "next/server";

import {
  generateAccessToken,
  hashPasswordAndRegisterUser,
  isEmailTaken,
} from "@/$server/security";
import { z } from "zod";
import { registerSchema } from "@/schemas";

export async function POST(request: Request) {
  try {
    const data = registerSchema.parse(await request.json());
    const emailInUse = await isEmailTaken(data.email);
    if (emailInUse)
      return new Response("Email already in use", { status: 400 });

    const user = await hashPasswordAndRegisterUser({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
    });
    if (!user) return new Response("Unable to register user", { status: 500 });
    const jwtToken = generateAccessToken({
      id: user.id,
      email: user.email,
    });

    return new Response("User registered", {
      status: 201,

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
