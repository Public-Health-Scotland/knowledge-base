# PHS Data Science - Knowledge Base

[![GitHub release (latest by
date)](https://img.shields.io/github/v/release/Public-Health-Scotland/knowledge-base)](https://github.com/Public-Health-Scotland/knowledge-base/releases/latest)

The PHS Data Science Knowledge Base is a web app that collates all resources related to Data Science (R, Python, git, etc.) created by and for PHS staff. This includes booking for in-person and access to online training, guidance documents, and internally developed textbooks. There is also a social page for announcements related to Data Science in the organisation, social links, and a list of relevant external materials such as textbooks and blogs.

## Directory structure

```
├── app                        // application source (Nuxt 4)
│   ├── app.vue                // root component
│   ├── assets                 // stylesheets and data
│   │   ├── courses.json       // data for courses and content
│   │   ├── doc-redirects.json // old documentation addresses and where they moved
│   │   └── resources.json     // data for other resources (e.g. textbooks)
│   ├── components             // shared components
│   ├── layouts
│   │   └── default.vue        // site-wide template
│   └── pages                  // one file per route
├── lib/docs                   // reads and renders technical-docs at build time
├── modules/docs.js            // adds every doc page to the build
├── server                     // build-time data for the docs pages
├── public                     // files served as-is (images, video, CNAME)
├── scripts                    // development scripts
├── test
│   ├── unit                   // Vitest unit tests
│   └── e2e                    // Playwright end-to-end tests
├── .github/workflows          // CI checks, deploy and release workflows
├── nuxt.config.js             // Nuxt configuration
└── package.json
```

`.output/` (the generated site) and `.nuxt/` are build output, and `.content-src/` holds a copy of technical-docs. None of these are committed.

## Build Setup

The site is built with [Nuxt 4](https://nuxt.com) (Vue 3) and [Bootstrap 5](https://getbootstrap.com) via [BootstrapVueNext](https://bootstrap-vue-next.github.io/bootstrap-vue-next/). It needs Node.js 22 (see `.nvmrc`).

```bash
# install dependencies
npm install

# download the documentation from technical-docs (run again to update it)
npm run docs:fetch

# serve with hot reload at http://localhost:3000
npm run dev

# generate the static site into .output/public (what CI runs on deploy)
npm run generate

# serve the generated site as it will be deployed
npm run preview
```

### Documentation pages

The pages under `/docs/` are built from the [technical-docs](https://github.com/Public-Health-Scotland/technical-docs) repository when the site is generated, so visitors' browsers never call the GitHub API. Each folder in technical-docs is a section (its `README.md` is the section page) and each Markdown file in it is a document, at `/docs/<section>/<document>/`. Addresses are made from the names, e.g. `Posit Infrastructure/FAQs.md` is `/docs/posit-infrastructure/faqs/`.

- To build from your own technical-docs checkout, set `KB_DOCS_DIR`, e.g. `KB_DOCS_DIR=../technical-docs npm run dev`.
- Links in technical-docs that point to files which don't exist are listed as warnings during `npm run generate`.
- A doc can start with optional details between two `---` lines: `title`, `description`, `order` (position in its section), `author`, `last_reviewed` and `review_interval` (months). They're read in `lib/docs/frontmatter.mjs`. A value that can't be used is reported and ignored, so it never stops the build.
- Docs pages show breadcrumbs, a contents list (from `##` and `###` headings), previous and next links in section order, and copy buttons on code. GitHub callouts such as `> [!NOTE]` and `> [!WARNING]` are shown with their label. Styles are in `app/assets/css/content.css`.
- Search on the docs pages looks through the text of every doc. The build saves it as `/api/docs/search.json` (`lib/docs/search-index.mjs`), which is only downloaded when someone starts typing in the search box.
- `npm run docs:check` checks the content and explains how to fix each problem. The rules, their wording and the reference for technical-docs' contributing guide (`npm run docs:check -- --rules`) are all in `lib/docs/rules.mjs`. CI runs it as a report only, since content problems are fixed in technical-docs.
- The live site rebuilds within 30 minutes of a change to technical-docs (see `.github/workflows/deploy.yml`).
- Older addresses, such as `/docs/Posit%20Infrastructure?doc=FAQs.md`, redirect to the new ones using `app/assets/doc-redirects.json`. If a document is renamed or moved, add its old address there, e.g. `"/docs/r/old-name": "/docs/r/new-name/"`, so bookmarks keep working.

### Checks

```bash
# lint and formatting
npm run lint

# lint only the files changed against a branch, as CI does
npm run lint:changed -- origin/main

# unit tests
npm test

# end-to-end tests against the generated site (run `npm run generate` first -
# the first run needs `npx playwright install chromium`)
npm run test:e2e
```

## Deployment

|                |                                                                                                                                                                                                                |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Trigger**    | Every push to `main` (including a merged pull request), or manually via `workflow_dispatch` from the Actions tab                                                                                               |
| **Produces**   | The live site, published to GitHub Pages                                                                                                                                                                       |
| **Comes from** | [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) runs `npm ci && npm run generate`, which builds the Nuxt app into `.output/public` - that output is uploaded and deployed as the Pages artifact |

No manual build, no committing build output, and no merging to a `gh-pages` branch - `.output/` is regenerated on every deploy and not tracked in git (see `.gitignore`).

## Committing changes

Before opening a pull request against `main`:

- **Build:** run `npm run generate` locally and confirm it completes without errors - this is exactly what CI runs, so a local failure will fail the deploy too.
- **Test:** run `npm test` and `npm run test:e2e` (see [Checks](#checks)), then use `npm run dev` to check the page(s) your change affects, including any page that shares a layout or component you touched.
- **Commit style:** follow the [contribution guidance](CONTRIBUTING.md#git-commit-messages).
- Changes are made via pull request into `main` - merging triggers the deploy described above.

## Releases

A release is a `vX.Y.Z` git tag plus a GitHub Release, cut manually via two chained workflows - separate and independent from deployment, which happens automatically on every merge whether or not a release is ever cut. See [CONTRIBUTING - Branching and Release Process](CONTRIBUTING.md#branching-and-release-process) for the process to follow when using these.

### 1. Prepare Release

|                |                                                                                                                                                                                          |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Trigger**    | Manual - Actions tab → [Prepare Release](../../actions/workflows/release-prepare.yml) → choose `patch`, `minor`, or `major`                                                              |
| **Produces**   | A `release/vX.Y.Z` branch, and a pull request from it into `main`, labelled `release`                                                                                                    |
| **Comes from** | [`.github/workflows/release-prepare.yml`](.github/workflows/release-prepare.yml) applies the chosen bump to whatever version is currently in `package.json` on `main`, via `npm version` |

### 2. Publish Release

|                |                                                                                                                                                                                                                                                                                                                        |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Trigger**    | Automatic, when a pull request labelled `release` is merged                                                                                                                                                                                                                                                            |
| **Produces**   | A git tag `vX.Y.Z` on `main`, and a [GitHub Release](../../releases) with auto-generated notes                                                                                                                                                                                                                         |
| **Comes from** | [`.github/workflows/release-publish.yml`](.github/workflows/release-publish.yml) reads the version from `package.json` on `main` _after_ the merge, and generates release notes from the pull requests merged since the previous release tag - nothing is fixed or recorded at the point Prepare Release was triggered |

### Expectations and limitations

- Deployment and releases are independent: every merge to `main` deploys the live site whether or not a release is ever cut.
- Both release workflows depend on `main`'s pull-request requirement - `workflow_dispatch` cannot bypass branch protection, so a version bump goes through the same review as any other change. If branch protection is ever relaxed and someone pushes to `main` directly, that change won't appear in a release's auto-generated notes (they're generated from merged pull requests, not raw commits).
- The `release` label is required for `release-publish.yml` to trigger. `release-prepare.yml` creates it automatically if missing - don't remove it from an open release pull request, or the tag/release won't be created on merge.
- See [CONTRIBUTING - Branching and Release Process](CONTRIBUTING.md#branching-and-release-process) for the sequencing to follow (e.g. merging the release PR last) to make sure a release captures the changes you expect.
- Major releases run "Prepare Release" at the _start_ and collect work on the release branch instead - see [CONTRIBUTING - Major releases](CONTRIBUTING.md#major-releases).

## Contributing

This app currently has one developer, [Russell McCreath](https://github.com/rmccreath) with oversight from the [PHS Data Science team](mailto:phs.datascience@phs.scot). For details on how to contribute, please see the [contribution guidance](CONTRIBUTING.md).
