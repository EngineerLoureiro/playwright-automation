import { expect, test } from "@playwright/test";

import hpCharacters from "./data/hpCharacters.json";

for (const c of hpCharacters) {
  test("Character " + c.name, async ({ page }) => {
    const name = c.name.replace(" ", "");
    const birth = c.dateOfBirth ? c.dateOfBirth : "Unknown";
    await page.goto("/table");

    await expect(page.locator(`#tableCharacterName${name}`)).toBeVisible();

    await expect(page.getByRole("img", { name: c.name })).toBeVisible();

    await expect(page.locator(`#tableCharacterHouse${name}`)).toBeVisible();

    await expect(page.getByRole("cell", { name: birth })).toBeVisible();
  });
}
