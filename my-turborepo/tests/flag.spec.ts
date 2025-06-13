import { test, expect } from "@playwright/test";

test("Créer un flag via le formulaire", async ({ page }) => {
  await page.goto("http://localhost:3000/flags");

  const name = "Flag E2E";
  const description = "Test Playwright";

  await page.getByPlaceholder("Nom").fill(name);
  await page.getByPlaceholder("Description").fill(description);
  await page.getByRole("button", { name: "Créer" }).click();

  await expect(page.getByText(name)).toBeVisible();
  await expect(page.getByText(description)).toBeVisible();
});
