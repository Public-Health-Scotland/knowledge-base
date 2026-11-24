import { defineConfig, devices } from "@playwright/test";

// Serves the generated static site the same way GitHub Pages does:
// unknown paths fall back to 404.html, which boots the client-side router.
const SITE_DIR = process.env.SITE_DIR || ".output/public";
const PORT = Number(process.env.PORT || 4173);

export default defineConfig({
  testDir: "test/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `npx http-server "${SITE_DIR}" -p ${PORT} -a 127.0.0.1 -c-1 --silent`,
    url: `http://127.0.0.1:${PORT}/`,
    reuseExistingServer: !process.env.CI,
  },
});
