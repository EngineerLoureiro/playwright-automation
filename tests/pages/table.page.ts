import { expect, Locator, Page } from "@playwright/test";

export class TablePage {
  page: Page;
  characterName: (name: string) => Locator;
  characterImage: (name: string) => Locator;
  characterHouse: (name: string) => Locator;
  characterBirth: (birth: string) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.characterName = (name: string) => {
      return page.locator(`#tableCharacterName${name}`);
    };
    this.characterImage = (name: string) => {
      return page.getByRole("img", { name: name });
    };
    this.characterHouse = (name: string) => {
      return page.locator(`#tableCharacterHouse${name}`);
    };
    this.characterBirth = (birth: string) => {
      return page.getByRole("cell", { name: birth });
    };
  }

  async navigateToTable() {
    await this.page.goto("/table");
  }

  fillCharacterName(name: string) {
    return this.characterName(name);
  }

  fillCharacterImage(name: string) {
    return this.characterImage(name);
  }

  fillCharacterHouse(name: string) {
    return this.characterHouse(name);
  }

  fillCharacterBirth(birth: string) {
    return this.characterBirth(birth);
  }
}
