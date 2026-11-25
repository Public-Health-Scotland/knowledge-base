// Documentation pages are built into the site from technical-docs. These
// tests use the real content, so they check documents that are unlikely to
// be renamed (the R section and its style guide).
import { expect, test } from "@playwright/test";

// Records requests to GitHub or for page data. Pages built into the site
// carry their own data, so none should be made.
function watchRequests(page) {
  const requests = [];
  page.on("request", (request) => {
    const url = request.url();
    if (url.includes("api.github.com") || url.includes("/api/")) {
      requests.push(url);
    }
  });
  return requests;
}

test.beforeEach(async ({ page }) => {
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (route) => route.abort());
});

const heading = (page, name) =>
  page.getByRole("heading", { level: 1, name, exact: true });

test("section and document pages are built into the site", async ({ page }) => {
  const requests = watchRequests(page);

  await page.goto("/docs/r/");
  await expect(heading(page, "R")).toBeVisible();

  await page.goto("/docs/r/r-style-guide/");
  await expect(heading(page, "R Style Guide")).toBeVisible();
  await expect(page).toHaveTitle(/^R Style Guide - /);
  await expect(
    page.getByRole("link", { name: "View on GitHub" }),
  ).toHaveAttribute(
    "href",
    /github\.com\/Public-Health-Scotland\/technical-docs\/blob\/main\/R\/R%20Style%20Guide\.md$/,
  );

  expect(requests).toEqual([]);
});

test("navigation moves between documents without fetching content", async ({
  page,
}) => {
  await page.goto("/docs/");
  const requests = watchRequests(page);
  const nav = page.getByRole("navigation", { name: "Documentation sections" });

  await nav.getByRole("link", { name: "R", exact: true }).click();
  await expect(page).toHaveURL(/\/docs\/r\/$/);
  await nav.getByRole("link", { name: "R Style Guide" }).click();
  await expect(page).toHaveURL(/\/docs\/r\/r-style-guide\/$/);
  await expect(heading(page, "R Style Guide")).toBeVisible();

  expect(requests).toEqual([]);
});

test("search finds documents by title", async ({ page }) => {
  await page.goto("/docs/");
  await page
    .getByRole("combobox", { name: "Search the documentation" })
    .fill("r style guide");
  await page
    .getByRole("option")
    .filter({ hasText: "R Style Guide" })
    .first()
    .click();

  await expect(page).toHaveURL(/\/docs\/r\/r-style-guide\/$/);
});

test("links between documents use the new addresses", async ({ page }) => {
  await page.goto("/docs/posit-infrastructure/");
  const hrefs = await page
    .locator("article a[href]")
    .evaluateAll((links) => links.map((a) => a.getAttribute("href")));

  expect(hrefs).toContain(
    "/docs/posit-infrastructure/posit-workbench-and-kubernetes/",
  );
  expect(hrefs.filter((href) => /\?doc=|^[^h#].*\.md(#|$)/.test(href))).toEqual(
    [],
  );
});

test.describe("addresses from before v3 redirect", () => {
  for (const [from, to, title] of [
    [
      "/docs/Posit%20Infrastructure?doc=FAQs.md#installing-packages",
      /\/docs\/posit-infrastructure\/faqs\/#installing-packages$/,
      "Posit Infrastructure - Frequently Asked Questions",
    ],
    [
      "/docs/R?doc=R%20Style%20Guide.md",
      /\/docs\/r\/r-style-guide\/$/,
      "R Style Guide",
    ],
    ["/docs/R", /\/docs\/r\/$/, "R"],
    // A document that no longer exists goes to its section.
    ["/docs/R?doc=Removed%20Doc.md", /\/docs\/r\/$/, "R"],
  ]) {
    test(from, async ({ page }) => {
      const response = await page.goto(from);
      expect(response.status()).toBe(200);
      await expect(page).toHaveURL(to);
      await expect(heading(page, title)).toBeVisible();
    });
  }
});

test("unknown documents show the not-found page", async ({ page }) => {
  await page.goto("/docs/r/no-such-doc/");
  await expect(
    page.getByRole("heading", { name: "Page not found" }),
  ).toBeVisible();
});

test("heading links keep plain addresses and land on the heading", async ({
  page,
}) => {
  await page.goto("/docs/r/r-style-guide/#10---r-user-group");
  await expect(
    page.locator('[id="user-content-10---r-user-group"]'),
  ).toBeInViewport();
});

test("links within a doc scroll to the heading, and back returns", async ({
  page,
}) => {
  await page.goto("/docs/posit-infrastructure/faqs/");
  const heading = page.locator('[id="user-content-posit-connect"]');
  await page
    .locator("article")
    .getByRole("link", { name: "Posit Connect", exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(/\/faqs\/#posit-connect$/);
  await expect(heading).toBeInViewport();
  // Clear of the navbar, not hidden under it.
  const box = await heading.boundingBox();
  expect(box.y).toBeGreaterThanOrEqual(0);

  await page.goBack();
  await expect(heading).not.toBeInViewport();
  await page.goForward();
  await expect(heading).toBeInViewport();
});

test("search finds documents by their text and opens one from the keyboard", async ({
  page,
}) => {
  await page.goto("/docs/");
  const requests = watchRequests(page);
  const search = page.getByRole("combobox", {
    name: "Search the documentation",
  });
  const results = page.getByRole("listbox", { name: "Search results" });

  // The search text is only downloaded once someone starts searching.
  await page.waitForLoadState("networkidle");
  expect(requests).toEqual([]);

  await search.fill("lintr");
  await expect(results.getByRole("option").first()).toContainText(
    "R Style Guide",
  );
  await expect(search).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator(".docs-search [role=status]")).toHaveText(
    /\d+ results?\./,
  );

  await search.press("Escape");
  await expect(results).toBeHidden();
  await search.press("ArrowDown");
  await expect(search).toHaveAttribute("aria-activedescendant", /option-0$/);
  await search.press("Enter");

  await expect(page).toHaveURL(/\/docs\/r\/r-style-guide\/$/);
  await expect(heading(page, "R Style Guide")).toBeVisible();
  expect(requests).toEqual([expect.stringContaining("/api/docs/search.json")]);
});

test("document pages have breadcrumbs, contents and page details", async ({
  page,
}) => {
  await page.goto("/docs/r/r-style-guide/");

  const breadcrumb = page.getByRole("navigation", { name: "Breadcrumb" });
  await expect(breadcrumb.getByRole("link")).toHaveText(["Documentation", "R"]);
  await expect(breadcrumb.locator("[aria-current=page]")).toHaveText(
    "R Style Guide",
  );

  const contents = page.getByRole("navigation", { name: "On this page" });
  const first = contents.getByRole("link").first();
  const target = (await first.getAttribute("href")).slice(1);
  expect(target).not.toMatch(/^user-content-/);
  await expect(
    page.locator(`article [id="user-content-${target}"]`),
  ).toHaveCount(1);

  await expect(
    page.getByRole("link", { name: "Suggest a change" }),
  ).toHaveAttribute("href", /\/technical-docs\/edit\/main\/R\//);

  // Docs aren't given an order yet, so none are linked in turn.
  await expect(
    page.getByRole("navigation", { name: "Previous and next documents" }),
  ).toHaveCount(0);
});

test("section pages are the last breadcrumb, not a page inside themselves", async ({
  page,
}) => {
  await page.goto("/docs/r/");
  const breadcrumb = page.getByRole("navigation", { name: "Breadcrumb" });
  await expect(breadcrumb.getByRole("link")).toHaveText(["Documentation"]);
  await expect(breadcrumb.locator("[aria-current=page]")).toHaveText("R");
});

test("code is coloured by its language", async ({ page }) => {
  await page.goto("/docs/r/r-style-guide/");
  await expect(
    page.locator("article pre code span.line span[style*=color]").first(),
  ).toBeVisible();
});

test("code blocks have a copy button that says when it worked", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/docs/r/r-style-guide/");

  const button = page.getByRole("button", { name: "Copy code" }).first();
  await button.click();
  await expect(button).toHaveText("Copied");
  await expect(page.locator(".doc-page [role=status]")).toHaveText(
    "Code copied",
  );
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied.length).toBeGreaterThan(0);

  // The language label is shown but isn't copied with the code.
  const block = page.locator(".code-block", { has: button });
  await expect(block.locator(".code-language")).toHaveText("R");
  expect(copied).not.toMatch(/^R\n/);
  expect(copied).toBe(
    (await block.locator("pre").innerText()).replace(/\n$/, ""),
  );
});
