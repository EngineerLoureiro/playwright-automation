import { test, expect } from "@playwright/test";

test("Menu LOGIN validation", async ({ page }) => {
  await page.goto("https://playground-drab-six.vercel.app/");

  await expect(page).toHaveTitle("Playground page");

  // Click the get started link.
  await page.getByRole("link", { name: "LOGIN" }).click();

  await expect(page.getByRole("heading", { name: "LOGIN" })).toBeVisible();
});
