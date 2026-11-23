// Smoke tests for the public pages. They describe what users see today, so
// framework and dependency upgrades can be checked against them.
import { expect, test } from "@playwright/test";

const PAGES = [
  { path: "/", heading: "Hey, you ready to learn?" },
  { path: "/develop/", heading: "Develop" },
  { path: "/develop/r-pathway/", heading: "R Pathway" },
  { path: "/develop/introduction-to-r/", heading: "Introduction to R" },
  { path: "/social/", heading: "Hey, it's time to get sociable!" },
  {
    path: "/quick-start/posit-workbench/",
    heading: "Quick Start - Posit Workbench",
  },
  { path: "/docs/", heading: "Data Science - the docs" },
];

// Keep tests independent of third-party services by blocking external hosts.
test.beforeEach(async ({ page }) => {
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (route) => route.abort());
});

function collectErrors(page) {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (
      message.type() === "error" &&
      !message.text().startsWith("Failed to load resource")
    ) {
      errors.push(message.text());
    }
  });
  return errors;
}

for (const { path, heading } of PAGES) {
  test(`${path} renders without errors`, async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto(path);

    await expect(
      page.getByRole("heading", { name: heading, exact: true }),
    ).toBeVisible();
    await expect(page.getByRole("img", { name: "PHS Logo" })).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test("main navigation links reach each section", async ({ page }) => {
  await page.goto("/");
  const nav = page.locator(".nav-container");

  for (const [name, url] of [
    ["Develop", /\/develop\/?$/],
    ["Documentation", /\/docs\/?$/],
    ["Social", /\/social\/?$/],
  ]) {
    await nav.getByRole("link", { name, exact: true }).click();
    await expect(page).toHaveURL(url);
  }
});

test("develop page lists courses and other resources", async ({ page }) => {
  await page.goto("/develop/");

  await expect(
    page.getByRole("heading", { name: "Introduction to R", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Git Guide" })).toBeVisible();
});

test("develop page can be opened filtered to textbooks", async ({ page }) => {
  await page.goto("/develop/?type=Textbook");

  await expect(page.getByRole("heading", { name: "Git Guide" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Introduction to R", exact: true }),
  ).toHaveCount(0);
});

test("help dialog opens from the navigation and closes", async ({ page }) => {
  await page.goto("/");
  const helpButton = page
    .getByRole("button", { name: "Help" })
    .or(page.locator(".nav-container .navbar-nav .nav-link").last());

  await helpButton.click();
  const dialog = page.getByRole("dialog", { name: "Help" });
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("link", { name: "Open an issue" }),
  ).toBeVisible();

  await dialog.getByRole("button", { name: "Close" }).first().click();
  await expect(dialog).toBeHidden();
});

test("accessibility information opens from the footer", async ({ page }) => {
  await page.goto("/");
  await page
    .locator("footer")
    .getByText("Accessibility", { exact: true })
    .click();

  await expect(
    page.getByRole("dialog", { name: "Accessibility" }),
  ).toBeVisible();
});

test("pages not generated at build time are served through the app", async ({
  page,
}) => {
  const response = await page.goto("/develop/introduction-to-r/");
  expect(response.status()).toBeLessThan(500);
  await expect(
    page.getByRole("heading", { name: "Introduction to R", exact: true }),
  ).toBeVisible();
});
