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
│   │   └── resources.json     // data for other resources (e.g. textbooks)
│   ├── layouts
│   │   └── default.vue        // site-wide template
│   └── pages                  // one file per route
├── public                     // files served as-is (images, video, CNAME)
├── scripts                    // development scripts
├── test
│   ├── unit                   // Vitest unit tests
│   └── e2e                    // Playwright end-to-end tests
├── .github/workflows          // CI checks, deploy and release workflows
├── nuxt.config.js             // Nuxt configuration
└── package.json
```

`.output/` (the generated site) and `.nuxt/` are build output - not committed, gitignored.

## Build Setup

The site is built with [Nuxt 4](https://nuxt.com) (Vue 3) and [Bootstrap 5](https://getbootstrap.com) via [BootstrapVueNext](https://bootstrap-vue-next.github.io/bootstrap-vue-next/). It needs Node.js 22 (see `.nvmrc`).

```bash
# install dependencies
npm install

# serve with hot reload at http://localhost:3000
npm run dev

# generate the static site into .output/public (what CI runs on deploy)
npm run generate

# preview the generated site locally
npx http-server .output/public
```

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

|                |                                                                                                                                                                                                               |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Trigger**    | Every push to `main` (including a merged pull request), or manually via `workflow_dispatch` from the Actions tab                                                                                              |
| **Produces**   | The live site, published to GitHub Pages                                                                                                                                                                      |
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
