import { expect, Locator, Page } from "@playwright/test";

export class FormPage {
  page: Page;
  nameInput: Locator;
  email: Locator;
  password: Locator;
  country: Locator;
  gender: (value: string) => Locator;
  hobbies: (hobbies: string[]) => void;
  successTitle: Locator;
  successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByRole("textbox", { name: "Name *" });
    this.email = page.getByRole("textbox", { name: "Email *" });
    this.password = page.getByRole("textbox", { name: "Password *" });
    this.country = page.getByLabel("Country *");
    this.gender = (value: string) => {
      return page.getByRole("radio", { name: value, exact: true });
    };
    this.hobbies = async (hobbies: string[]) => {
      for (const hobby of hobbies) {
        await page.locator("label").filter({ hasText: hobby }).click();
      }
    };
    this.successTitle = page.getByText("Success!");
    this.successMessage = page.getByText("The form has been submitted");
  }

  async navigateToForm() {
    await this.page.goto("/form");
  }

  async fillName(name: string) {
    await this.nameInput.fill(name);
  }
  async fillEmail(email: string) {
    await this.email.fill(email);
  }
  async fillPassword(password: string) {
    await this.password.fill(password);
  }
  async fillCountry(country: string) {
    await this.country.selectOption(country);
  }

  async selectGender(gender: string) {
    await this.gender(gender).check();
  }

  async selectHobbies(hobbies: string[]) {
    await this.hobbies(hobbies);
  }

  async assertSubmitted() {
    await expect(this.successTitle).toBeVisible();
    await expect(this.successMessage).toBeVisible();
  }
}
