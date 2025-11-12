import { expect, test } from "@playwright/test";
import { TablePage } from "./pages/table.page";
import hpCharacters from "./data/hpCharacters.json";

for (const c of hpCharacters) {
  test("Character " + c.name, async ({ page }) => {
    const table = new TablePage(page);
    const name = c.name.replace(" ", "");
    const birth = c.dateOfBirth ? c.dateOfBirth : "Unknown";

    await table.navigateToTable();
    await expect(table.fillCharacterName(name)).toBeVisible();
    await expect(table.fillCharacterImage(c.name)).toBeVisible();
    await expect(table.fillCharacterHouse(name)).toBeVisible();
    await expect(table.fillCharacterBirth(birth)).toBeVisible();
  });
}
