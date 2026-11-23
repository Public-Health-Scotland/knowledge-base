<template>
  <div class="statement">
    <PageHeader
      title="Accessibility statement for the Data Science Knowledge Base"
    />

    <p>
      This accessibility statement applies to the Public Health Scotland (PHS)
      Data Science Knowledge Base at
      <a href="https://kb.publichealthscotland.scot/"
        >kb.publichealthscotland.scot</a
      >.
    </p>

    <p>
      This website is run by the Data Science team at Public Health Scotland. We
      want as many people as possible to be able to use it. For example, that
      means you should be able to:
    </p>
    <ul>
      <li>change colours, contrast levels and fonts using browser settings</li>
      <li>zoom in up to 400% without the text spilling off the screen</li>
      <li>navigate most of the website using just a keyboard</li>
      <li>navigate most of the website using speech recognition software</li>
      <li>
        listen to the website using a screen reader (including recent versions
        of JAWS, NVDA and VoiceOver)
      </li>
    </ul>
    <p>We've also made the website text as simple as possible to understand.</p>
    <p>
      <a href="https://mcmw.abilitynet.org.uk/">AbilityNet</a> has advice on
      making your device easier to use if you have a disability.
    </p>

    <h2>How accessible this website is</h2>
    <p>We know some parts of this website are not fully accessible:</p>
    <ul>
      <li>
        some documentation pages have images without a text description, or code
        examples that don't say which language they're in
      </li>
      <li>
        feedback and course booking forms are provided by Microsoft Forms, which
        we don't control
      </li>
      <li>
        some courses and textbooks we link to are hosted on other websites,
        which have their own accessibility statements
      </li>
    </ul>

    <h2>Feedback and contact information</h2>
    <p>
      If you need information on this website in a different format, or you find
      a problem not listed on this page, email the
      <a :href="`mailto:${CONTACT}?subject=Knowledge Base - Accessibility`">
        Data Science team</a
      >
      at {{ CONTACT }}. We'll reply within 10 working days.
    </p>

    <h2>Enforcement procedure</h2>
    <p>
      The Equality and Human Rights Commission (EHRC) is responsible for
      enforcing the Public Sector Bodies (Websites and Mobile Applications) (No.
      2) Accessibility Regulations 2018 (the "accessibility regulations"). If
      you're not happy with how we respond to your complaint, contact the
      <a href="https://www.equalityadvisoryservice.com/"
        >Equality Advisory and Support Service (EASS)</a
      >.
    </p>

    <h2>Technical information about this website's accessibility</h2>
    <p>
      Public Health Scotland is committed to making its websites accessible, in
      accordance with the Public Sector Bodies (Websites and Mobile
      Applications) (No. 2) Accessibility Regulations 2018.
    </p>

    <h3>Compliance status</h3>
    <p>
      This website is partially compliant with the
      <a href="https://www.w3.org/TR/WCAG22/"
        >Web Content Accessibility Guidelines version 2.2</a
      >
      AA standard, due to the non-compliances listed below.
    </p>

    <h3>Non-accessible content</h3>
    <p>The content listed below is non-accessible for the following reasons.</p>
    <h4>Non-compliance with the accessibility regulations</h4>
    <ul>
      <li>
        Some images in documentation pages have no text alternative, so people
        using a screen reader can't access the information. This fails WCAG 2.2
        success criterion 1.1.1 (non-text content). Documentation is now checked
        for this when it's changed, and we're adding descriptions to existing
        images.
      </li>
    </ul>
    <h4>
      Content that's not within the scope of the accessibility regulations
    </h4>
    <p>
      Forms provided by Microsoft Forms and websites we link to are third-party
      content that we don't fund, develop or control.
    </p>

    <h2>What we're doing to improve accessibility</h2>
    <p>
      Every page of this website is checked automatically for accessibility
      problems whenever it changes, and documentation is checked before it's
      published. We review this statement when the website changes
      significantly.
    </p>

    <h2>Preparation of this accessibility statement</h2>
    <p>
      This statement was prepared on {{ PREPARED }}. It was last reviewed on
      {{ REVIEWED }}.
    </p>
    <p>
      This website was last tested on {{ TESTED }} by the Data Science team.
      Every page was tested with automated tools (axe) against WCAG 2.2 AA.
    </p>
  </div>
</template>

<script setup>
// The dates here must be updated whenever the statement is reviewed.
const PREPARED = "23 November 2026";
const REVIEWED = "23 November 2026";
const TESTED = "23 November 2026";
const CONTACT = "phs.datascience@phs.scot";

useHead({
  title: "Accessibility statement - PHS Data Science - Knowledge Base",
});
</script>

<style scoped>
.statement {
  max-width: 50rem;
}

.statement h2 {
  margin-top: 2rem;
}

.statement h3,
.statement h4 {
  margin-top: 1.5rem;
}
</style>
