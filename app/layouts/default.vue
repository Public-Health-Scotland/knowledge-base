<template>
  <div>
    <div class="header-container">
      <header>
        <div class="container">
          <div class="d-flex justify-content-between align-items-center">
            <div class="left">
              <NuxtLink to="/">
                <img class="logo" src="/phs-logo.png" alt="PHS Logo" />
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

              <b-nav-item v-b-modal.help-modal aria-label="Help"
                ><Icon
                  name="lucide:circle-question-mark"
                  size="24"
                  class="icon-light"
              /></b-nav-item>
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

    <div class="container body">
      <slot />
    </div>

    <div
      class="container my-3 d-flex justify-content-between align-items-center"
    >
      <div>
        <footer class="d-print-none">
          <b-nav>
            <b-nav-item v-b-modal.accessibility-modal>Accessibility</b-nav-item>
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
            <b-nav-item disabled>© Public Health Scotland</b-nav-item>
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

    <b-modal
      id="accessibility-modal"
      size="lg"
      scrollable
      title="Accessibility"
    >
      <h5>Accessible Content</h5>
      <p>
        This website is run by the Data Science department in Public Health
        Scotland. We want as many people as possible to be able to use this
        website. For example, that means you should be able to:
      </p>

      <ul>
        <li>change colours, contrast levels and fonts</li>
        <li>zoom in up to 300% without the text spilling off the screen</li>
        <li>navigate most of the website using just a keyboard</li>
        <li>navigate most of the website using speech recognition software</li>
        <li>
          listen to most of the website using a screen reader (including the
          most recent versions of JAWS, NVDA and VoiceOver)
        </li>
      </ul>

      <p>
        We’ve also made the website text as simple as possible to understand.
      </p>

      <p>
        We're always looking to improve the accessibility of this website. If
        you find problems not listed on this page or think we're not meeting
        accessibility requirements, please email the
        <a href="mailto:phs.datascience@phs.scot?Subject=DSKB - Accessibility"
          >Data Science team.</a
        >
      </p>

      <h5>Testing</h5>

      <i
        >This website is currently undergoing development and testing is not yet
        been complete.</i
      >
    </b-modal>

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
  font-family:
    "Source Sans Pro",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    sans-serif;
  font-size: 14px;
  word-spacing: 1px;
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
  color: #bd27b9;
}

img.logo {
  height: 100px;
  display: block;
  margin-left: -2%;
}

.nav-container {
  background-color: #3f3685;
  position: relative;
  margin-bottom: 30px;
}

.nav-header {
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  margin: 5px;
}

.router-link-exact-active {
  font-weight: bold;
}

.feedback-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #3f3685;
  border-color: #3f3685;
}

.feedback-button:hover {
  background-color: #2f2863;
  border-color: #2f2863;
}

.feedback-button:focus {
  background-color: #3f3685;
  border-color: #3f3685;
}

/* Utility */
.cursor-pointer {
  cursor: pointer;
}
</style>
