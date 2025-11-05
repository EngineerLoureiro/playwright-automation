import test, { expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/login");
});

test("Sucessful validation", async ({ page }) => {
  const username = process.env.ALLOWED_USERNAME;
  const password = process.env.ALLOWED_PASSWORD;

  if (!username || !password) {
    throw new Error("Missing ALLOWED_USERNAME or ALLOWED_PASSWORD in .env");
  }
  await page
    .getByRole("textbox", { name: "Type your username" })
    .fill(username);
  await page
    .getByRole("textbox", { name: "Type your password" })
    .fill(password);
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("User successfully logged in!")).toBeVisible();
});

test("Login blocked", async ({ page }) => {
  const username = process.env.BLOCKED_USERNAME;
  const password = process.env.BLOCKED_PASSWORD;

  if (!username || !password) {
    throw new Error("Missing ALLOWED_USERNAME or ALLOWED_PASSWORD in .env");
  }
  await page
    .getByRole("textbox", { name: "Type your username" })
    .fill(username);
  await page
    .getByRole("textbox", { name: "Type your password" })
    .fill(password);
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("User blocked!")).toBeVisible();
});

test("Invalid User", async ({ page }) => {
  const username = process.env.INVALID_USERNAME;
  const password = process.env.INVALID_PASSWORD;

  if (!username || !password) {
    throw new Error("Missing ALLOWED_USERNAME or ALLOWED_PASSWORD in .env");
  }
  await page
    .getByRole("textbox", { name: "Type your username" })
    .fill(username);
  await page
    .getByRole("textbox", { name: "Type your password" })
    .fill(password);
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("User not found!")).toBeVisible();
});

test("Temporary block", async ({ page }) => {
  const username = process.env.ALLOWED_USERNAME;
  const password = process.env.INVALID_PASSWORD;

  if (!username || !password) {
    throw new Error("Missing ALLOWED_USERNAME or ALLOWED_PASSWORD in .env");
  }
  await test.step("Fill in credentials", async () => {
    await page
      .getByRole("textbox", { name: "Type your username" })
      .fill(username);
    await page
      .getByRole("textbox", { name: "Type your password" })
      .fill(password);
  });

  await page.getByRole("button", { name: "Login" }).click({ clickCount: 3 });

  await expect(page.getByText("User temporarily blocked!")).toBeVisible();
});
