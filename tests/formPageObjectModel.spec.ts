import test from "@playwright/test";
import { FormPage } from "./pages/form.page";
import { users } from "./data";

for (const user of users) {
  test(`FORM FILLING  FOR ${user.name}`, async ({ page }) => {
    const form = new FormPage(page);

    await form.navigateToForm();
    await form.fillName(user.name);
    await form.fillCountry(user.country);
    await form.fillEmail(user.email);
    await form.fillPassword(user.password);
    await form.selectGender(user.gender);
    await form.selectHobbies(user.hobbies);
  });
}
