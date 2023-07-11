import { test, expect } from "@playwright/test";
import { generateRandomString } from "../utils";

test("Register workflow", async ({ page }) => {
  const randomEmail = generateRandomString(8) + "@gmail.com";
  const randomPassword = generateRandomString(8);
  const randomFirstName = generateRandomString(8);
  const randomLastName = generateRandomString(8);

  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Registrieren" }).click();
  await page.getByLabel("Email address").click();
  await page.getByLabel("Email address").fill(randomEmail);
  await page.getByLabel("First Name").click();
  await page.getByLabel("First Name").fill(randomFirstName);
  await page.getByLabel("Last Name").click();
  await page.getByLabel("Last Name").fill(randomLastName);
  await page.getByLabel("Password").click();
  await page.getByLabel("Password").fill(randomPassword);

  await page.getByRole("button", { name: "Register" }).click();
  // should navigate to /dashboard
  await page.waitForURL("http://localhost:3000/dashboard");

  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Einloggen" }).click();
  await page.getByLabel("Email address").click();
  await page.getByLabel("Email address").fill(randomEmail);

  await page.getByLabel("Password").click();
  await page.getByLabel("Password").fill(randomPassword);

  await page.getByRole("button", { name: "Einloggen" }).click();
  await page.waitForURL("http://localhost:3000/dashboard");
});
