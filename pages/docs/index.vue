<template>
  <div>
    <b-row>
      <b-col>
        <h1>Data Science - the docs</h1>
        <p>
          This page pulls together documentation relating to Data Science in
          Public Health Scotland. This is organised into sections as shown in
          the navigation on the left-side of this page. This is all stored and
          organised on a GitHub repo, each document has a button to link back,
          the aim of this is to encourage collaboration on our documentation,
          allowing us to work as a community to maintain our technical knowledge
          and guidance.
        </p>
        <p>
          You can use the <strong>search bar</strong> at the top of the page to
          look for <strong>document titles</strong>. You can also use
          <code>Ctrl</code> + <code>F</code> (or <code>⌘</code> +
          <code>F</code> on Mac) to search within the current document. To
          search across documents, visit the
          <a href="https://github.com/Public-Health-Scotland/technical-docs"
            >GitHub repository</a
          >
          and use the search function there.
        </p>
      </b-col>
    </b-row>

    <div class="mt-4">
      <b-row cols="1" cols-lg="2">
        <b-col>
          <b-card class="m-3">
            <div class="d-flex justify-content-between align-items-center">
              <h3>Top Docs</h3>
              <eva-icon name="star-outline" fill="#bd27b9"></eva-icon>
            </div>
            </br>
            <b-card-text>
              Get started with key Posit docs. 
            </b-card-text>
            <b-list-group flush>
              <b-list-group-item to="/docs/Posit%20Infrastructure">
                What is Posit?
              </b-list-group-item>
              <b-list-group-item to="/docs/Posit%20Infrastructure?doc=Quick%20guide%20to%20your%20Posit%20Workbench%20session.md">
                Quick guide to Posit Workbench sessions
              </b-list-group-item>
              <b-list-group-item to="/docs/Posit%20Infrastructure?doc=Posit%20Support.md">
                Getting support with Posit
              </b-list-group-item>
              <b-list-group-item to="/docs/Posit%20Infrastructure?doc=FAQs.md">
                Posit Frequently Asked Questions (FAQs)
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-col>
        <b-col>
          <b-card class="m-3">
            <div class="d-flex justify-content-between align-items-center">
              <h3>Quick Start Guides</h3>
              <eva-icon name="flash-outline" fill="#bd27b9"></eva-icon>
            </div>
            </br>
            <div class="d-flex mb-4">
              <b-card-text>
                Get started with a guided brief overview of setup, access, and best practice.
              </b-card-text>
            </div>
            <b-row class="mb-3">
              <b-col>
                <b-list-group flush>
                  <b-list-group-item href="/qsg">
                    <h5 class="mb-1">Posit Workbench</h5>
                    <p class="mb-1">
                      Quick start guide to using Posit Workbench, including access and starting a session.
                    </p>
                  </b-list-group-item>
                  <b-list-group-item href="#" disabled>
                    <h5 class="mb-1">Git <em>(Coming Soon)</em></h5>
                    <p class="mb-1">
                      Quick start guide to using Git, including installation and configuration on desktop and Posit Workbench.
                    </p>
                  </b-list-group-item>
                </b-list-group>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
