import { expect, test, describe, it, beforeAll } from "vitest";
import { prisma } from "../../src/$server/db";
import {
  generateAccessToken,
  hashPassword,
  hashPasswordAndRegisterUser,
  isEmailTaken,
  verifyAccessToken,
  verifyPassword,
} from "../../src/$server/security";
import bcrypt from "bcrypt";
import { generateRandomString } from "../utils";
import { User } from "@prisma/client";

describe("Security Functions", () => {
  let randomUser: User;
  beforeAll(async () => {
    const randomEmail = generateRandomString(10) + "@gmail.com";
    const randomPassword = generateRandomString(10);
    const randomFirstName = generateRandomString(10);
    const randomLastName = generateRandomString(10);
    const user = await prisma.user.create({
      data: {
        email: randomEmail,
        firstName: randomFirstName,
        lastName: randomLastName,
        password: await hashPassword(randomPassword),
      },
    });

    randomUser = user;
  });

  describe("hashPassword", () => {
    it("should hash the password", async () => {
      const password = "password";
      const hashedPassword = await hashPassword(password);
      const isMatch = await bcrypt.compare(password, hashedPassword);
      expect(isMatch).toBe(true);
    });
  });

  describe("verifyPassword", () => {
    it("should verify the password", async () => {
      const password = "password";
      const hashedPassword = await bcrypt.hash(password, 10);
      const isMatch = await verifyPassword(password, hashedPassword);
      expect(isMatch).toBe(true);
    });

    it("should return false for incorrect password", async () => {
      const password = "password";
      const hashedPassword = await bcrypt.hash("incorrectPassword", 10);
      const isMatch = await verifyPassword(password, hashedPassword);
      expect(isMatch).toBe(false);
    });
  });

  describe("generateAccessToken and verify", () => {
    it("should generate an access token", () => {
      const payload = {
        email: "test@example.com",
        id: "1234567890",
      };
      const token = generateAccessToken(payload);

      const decodedToken = verifyAccessToken(token);
      expect(decodedToken.email).toEqual(payload.email);
      expect(decodedToken.id).toEqual(payload.id);
    });
  });

  it("should throw an error for an invalid access token", () => {
    const invalidToken = "invalidAccessToken";
    expect(() => {
      verifyAccessToken(invalidToken);
    }).toThrow();
  });

  describe("isEmailTaken", () => {
    it("should return true if email is taken", async () => {
      const email = randomUser!.email;
      const result = await isEmailTaken(email);
      expect(result).toBeTruthy();
    });

    it("should return false if email is not taken", async () => {
      const email = "new-email@example.com";
      const result = await isEmailTaken(email);
      expect(result).toBeFalsy();
    });
  });
});
