<template>
  <div>
    <a href="#main-content" class="skip-link visually-hidden-focusable">
      Skip to main content
    </a>

    <div class="header-container">
      <header>
        <div class="container">
          <div class="d-flex justify-content-between align-items-center">
            <div class="left">
              <NuxtLink to="/">
                <img
                  class="logo"
                  src="/phs-logo.png"
                  alt="Public Health Scotland - Knowledge Base home"
                />
              </NuxtLink>
            </div>
          </div>
        </div>
      </header>
    </div>

    <div class="nav-container d-print-none">
      <b-navbar toggleable="sm" data-bs-theme="dark" :container="false">
        <div class="container">
          <b-navbar-brand to="/">Data Science Knowledge Base</b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ms-auto">
              <b-nav-item to="/develop">Develop</b-nav-item>
              <b-nav-item to="/docs">Documentation</b-nav-item>
              <b-nav-item to="/social">Social</b-nav-item>

              <li class="nav-item">
                <button
                  v-b-modal.help-modal
                  type="button"
                  class="nav-link btn btn-link"
                  aria-label="Help"
                >
                  <Icon
                    name="lucide:circle-question-mark"
                    size="24"
                    class="icon-light"
                  />
                </button>
              </li>
              <b-modal id="help-modal" size="lg" title="Help">
                <p class="my-4">
                  <strong>Training Request</strong> - If you can't find what
                  you're looking for or have a specific training requirement,
                  use this link to
                  <a
                    href="mailto:phs.staffdevelopment@phs.scot?Subject=DSKB - Training Request"
                    >email Staff Development.</a
                  >
                </p>

                <p class="my-4">
                  <strong>Knowledge Base Enquiry</strong> - Feedback, issues, or
                  suggestions for the knowledge base?
                  <a
                    href="https://github.com/Public-Health-Scotland/knowledge-base/issues/new/choose"
                    target="_blank"
                    >Open an issue</a
                  >
                  on the GitHub repo or
                  <a
                    href="mailto:phs.datascience@phs.scot?Subject=DSKB - Enquiry"
                    >email the Data Science team.</a
                  >
                </p>
              </b-modal>
            </b-navbar-nav>
          </b-collapse>
        </div>
      </b-navbar>
    </div>

    <main id="main-content" class="container body" tabindex="-1">
      <slot />
    </main>

    <div
      class="container my-3 d-flex justify-content-between align-items-center"
    >
      <div>
        <footer class="d-print-none">
          <b-nav>
            <b-nav-item to="/accessibility/">Accessibility</b-nav-item>
            <b-nav-item v-b-modal.attribution-modal>Attributions</b-nav-item>
            <b-nav-item
              href="https://www.publichealthscotland.scot/contact-us/freedom-of-information-foi-and-environmental-information-regulation-eir-requests/"
              target="_blank"
              >Freedom of Information</b-nav-item
            >
            <b-nav-item
              href="https://www.publichealthscotland.scot/terms-and-conditions/"
              target="_blank"
              >Terms and Conditions</b-nav-item
            >
            <b-nav-item
              href="https://www.publichealthscotland.scot/our-privacy-notice/organisational-background/"
              target="_blank"
              >Privacy notice</b-nav-item
            >
            <li class="nav-item">
              <span class="nav-link text-body-secondary">
                © Public Health Scotland
              </span>
            </li>
          </b-nav>
        </footer>
      </div>
      <div class="">
        <b-button
          v-b-modal.feedback-modal
          class="feedback-button"
          pill
          aria-label="Feedback"
          ><Icon name="lucide:message-square" size="24" class="icon-light"
        /></b-button>
      </div>
    </div>

    <b-modal id="attribution-modal" size="lg" scrollable title="Attributions">
      <h5>Attributions</h5>

      <ul>
        <li>
          Icons by
          <a
            href="https://lucide.dev/"
            target="_blank"
            rel="noopener noreferrer"
            >Lucide</a
          >
          (ISC licence)
        </li>
        <li>
          Animated icons on the home page by
          <a
            href="https://lordicon.com/"
            target="_blank"
            rel="noopener noreferrer"
            >Lordicon</a
          >
          (free licence)
        </li>
      </ul>
    </b-modal>

    <!-- lazy: the form loads from Microsoft only when the dialog opens. -->
    <b-modal id="feedback-modal" size="xl" lazy>
      If this content doesn't load,
      <a target="_blank" href="https://forms.office.com/r/RhjP2yNq4y"
        >click here</a
      >
      to open in a browser tab.
      <br />
      <div>
        <iframe
          title="Knowledge Base feedback form"
          width="640px"
          height="1100px"
          src="https://forms.office.com/Pages/ResponsePage.aspx?id=veDvEDCgykuAnLXmdF5JmlMENbvENPtAs5eceNN9kYdUQ0JJWlY4UjNOQ1ZCSVlEOUpTSEo3N0JaWS4u&embed=true"
          frameborder="0"
          marginwidth="0"
          marginheight="0"
          style="border: none; width: 100%"
          allowfullscreen
          webkitallowfullscreen
          mozallowfullscreen
          msallowfullscreen
        >
        </iframe>
      </div>
    </b-modal>
  </div>
</template>

<style>
html {
  text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  position: relative;
  min-height: 100%;
}

.body {
  margin-bottom: 100px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.header-container {
  padding-top: 15px;
}

header {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header.h1 {
  color: var(--phs-accent);
}

img.logo {
  height: 100px;
  display: block;
  margin-left: -2%;
}

.nav-container {
  background-color: var(--phs-purple);
  position: relative;
  margin-bottom: 30px;
}

.nav-header {
  font-size: 16px;
  font-weight: 700;
  color: var(--phs-white);
  margin: 5px;
}

.navbar .router-link-exact-active {
  font-weight: bold;
}

.feedback-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--phs-purple);
  border-color: var(--phs-purple);
}

.feedback-button:hover {
  background-color: var(--phs-purple-80);
  border-color: var(--phs-purple-80);
}

.feedback-button:focus {
  background-color: var(--phs-purple);
  border-color: var(--phs-purple);
}

.skip-link {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  z-index: 2000;
  padding: 0.5rem 1rem;
  color: var(--phs-white);
  background-color: var(--phs-purple);
}

/* Utility */
.cursor-pointer {
  cursor: pointer;
}
</style>
