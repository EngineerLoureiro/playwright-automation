import test, { expect } from "@playwright/test";
import { users, failedFormValidationMessages } from "./data";

test.beforeEach(async ({ page }) => {
  await page.goto("/form");
});
const usersDummy = users;

usersDummy.forEach((user) => {
  test(`${user.scenario} Form Validation`, async ({ page }) => {
    await page.getByRole("textbox", { name: "Name *" }).fill(user.name);

    await page.getByRole("textbox", { name: "Email *" }).fill(user.email);

    await page.getByRole("textbox", { name: "Password *" }).fill(user.password);
    await page.getByLabel("Country *").selectOption("portugal");
    await page.getByRole("radio", { name: "Male", exact: true }).check();

    user.hobbies.forEach(async (hooby) => {
      await page.locator("label").filter({ hasText: hooby }).click();
    });

    await page.getByRole("button", { name: "Send" }).click();
    await expect(page.getByText("Success!")).toBeVisible();
    await expect(page.getByText("The form has been submitted")).toBeVisible();
  });
});

test("Failed Form Validation", async ({ page }) => {
  await page.getByRole("button", { name: "Send" }).click();

  Object.values(failedFormValidationMessages).forEach(async (message) => {
    await expect(page.getByText(message)).toBeVisible();
  });
});
