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
  {
    path: "/accessibility/",
    heading: "Accessibility statement for the Data Science Knowledge Base",
  },
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
    await expect(
      page.getByRole("link", {
        name: "Public Health Scotland - Knowledge Base home",
      }),
    ).toBeVisible();
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

test("the accessibility statement is linked from every page", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .locator("footer")
    .getByRole("link", { name: "Accessibility", exact: true })
    .click();

  await expect(page).toHaveURL(/\/accessibility\/$/);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Accessibility statement for the Data Science Knowledge Base",
    }),
  ).toBeVisible();
});

test("a skip link takes keyboard users to the main content", async ({
  page,
}) => {
  await page.goto("/develop/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to main content" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
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

// Scripts, styles, fonts and icons are all served with the site, so pages
// work on networks that block other hosts and share nothing with them.
test("pages load nothing from other websites", async ({ page }) => {
  const external = [];
  page.on("request", (request) => {
    if (!request.url().startsWith("http://127.0.0.1")) {
      external.push(request.url());
    }
  });
  for (const { path } of PAGES) {
    await page.goto(path);
    await page.waitForLoadState("networkidle");
  }
  expect(external).toEqual([]);
});

test("the feedback form loads when its dialog opens", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("iframe")).toHaveCount(0);
  await page.getByRole("button", { name: "Feedback" }).click();
  await expect(page.locator("iframe")).toHaveAttribute(
    "src",
    /^https:\/\/forms\.office\.com\//,
  );
});

test("home page tiles have one link each, which the icon is part of", async ({
  page,
}) => {
  await page.goto("/");
  const tiles = page.locator(".home-tile");
  await expect(tiles).toHaveCount(4);
  for (const tile of await tiles.all()) {
    await expect(tile.getByRole("link")).toHaveCount(1);
  }
  await expect(page.locator(".home-tile lord-icon").first()).toHaveAttribute(
    "aria-hidden",
    "true",
  );

  // The link's stretched area sits over the icon, so a click there follows it.
  const icon = await page.locator(".home-tile lord-icon").first().boundingBox();
  await page.mouse.click(icon.x + icon.width / 2, icon.y + icon.height / 2);
  await expect(page).toHaveURL(/\/develop\/?$/);
});

// Resolves with whether the Courses icon finished an animation once its button
// has keyboard focus.
async function coursesIconPlaysOnFocus(page) {
  await page.goto("/");
  const icon = page.locator(".home-tile lord-icon").first();
  await icon.evaluate(async (element) => {
    await customElements.whenDefined("lord-icon");
    await element.readyPromise;
  });
  const played = icon.evaluate(
    (element) =>
      new Promise((resolve) => {
        element.addEventListener("complete", () => resolve(true));
        setTimeout(() => resolve(false), 3000);
      }),
  );
  await page.getByRole("link", { name: "View courses" }).focus();
  return played;
}

test("home page icons play when their link gets keyboard focus", async ({
  page,
}) => {
  expect(await coursesIconPlaysOnFocus(page)).toBe(true);
});

test("home page icons stay still for people who ask for less motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(await coursesIconPlaysOnFocus(page)).toBe(false);
});
