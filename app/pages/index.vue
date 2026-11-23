<template>
  <div>
    <PageHeader title="Hey, you ready to learn?">
      <p>
        Welcome to the PHS Data Science Knowledge Base. It is here that you'll
        find access to all resources related to Data Science (R, Python, git,
        etc.) created by and for PHS staff. This includes in-person and online
        training, internally developed textbooks, and all technical
        documentation, including guidance, how-tos, and best practice.
      </p>
      <p>
        <strong>Data Science</strong> is used in the broadest possible sense,
        capturing introductory content to technologies, and pulling existing and
        creating new more advanced content from the topic experts across the
        organisation. If you have something to offer, get in touch by
        <a href="mailto:phs.datascience@phs.scot?Subject=DSKB - Enquiry"
          >emailing the Data Science team.</a
        >
      </p>
    </PageHeader>

    <div>
      <b-row cols="1" cols-sm="2" cols-lg="4" class="text-center mb-3">
        <b-col v-for="tile in tiles" :key="tile.title" class="mb-4">
          <!-- The button's link covers the whole tile (stretched-link), so the
               icon can be clicked too while keyboards still stop only once. -->
          <div class="home-tile" @focusin="play">
            <lord-icon
              :src="`${baseURL}icons/lordicon/${tile.icon}.json`"
              trigger="hover"
              target=".home-tile"
              colors="primary:#3f3685,secondary:#80ba27"
              stroke="light"
              class="home-icon"
              aria-hidden="true"
            />
            <h2 class="h5">{{ tile.title }}</h2>
            <p>{{ tile.text }}</p>
            <!-- A link styled as a button: it goes to another page, so screen
                 readers should hear "link" (b-button adds role="button"). -->
            <NuxtLink
              :to="tile.to"
              class="btn btn-primary home-cta stretched-link"
              >{{ tile.action }}</NuxtLink
            >
          </div>
        </b-col>
      </b-row>
    </div>

    <div class="mt-4">
      <b-row>
        <b-col class="grid">
          <div class="card-deck">
            <b-card class="m-4">
              <div class="d-flex justify-content-between align-items-center">
                <h4>Quick Start Guides</h4>
                <Icon name="lucide:zap" size="24" class="icon-accent" />
              </div>
              <br />
              <div class="d-flex mb-4">
                <b-card-text>
                  Get started with a guided brief overview of setup, access, and
                  best practice.
                </b-card-text>
              </div>
              <b-row class="mb-3">
                <b-col>
                  <b-list-group flush>
                    <b-list-group-item to="/quick-start/posit-workbench">
                      <h5 class="mb-1">Posit Workbench</h5>
                      <p class="mb-1">
                        Quick start guide to using Posit Workbench, including
                        access and starting a session.
                      </p>
                    </b-list-group-item>
                    <b-list-group-item disabled>
                      <h5 class="mb-1">Git <em>(Coming Soon)</em></h5>
                      <p class="mb-1">
                        Quick start guide to using Git, including installation
                        and configuration on desktop and Posit Workbench.
                      </p>
                    </b-list-group-item>
                  </b-list-group>
                </b-col>
              </b-row>
            </b-card>

            <b-card class="m-4">
              <div class="d-flex justify-content-between align-items-center">
                <h4>Learning Pathways</h4>
                <Icon name="lucide:compass" size="24" class="icon-accent" />
              </div>
              <br />
              <div class="d-flex mb-4">
                <b-card-text>
                  Structured learning pathways to find the right courses for
                  your development.
                </b-card-text>
              </div>
              <b-row class="mb-3">
                <b-col>
                  <b-list-group flush>
                    <b-list-group-item to="/develop/r-pathway">
                      <h5 class="mb-1">R Pathway</h5>
                      <p class="mb-1">
                        A structured pathway to learning R, including topic-led
                        training modules, guidance, and related technologies.
                      </p>
                    </b-list-group-item>
                    <b-list-group-item disabled>
                      <h5 class="mb-1">Python <em>(Coming Soon)</em></h5>
                      <p class="mb-1">
                        A structured pathway to learning Python, including
                        topic-led training modules, guidance, and related
                        technologies.
                      </p>
                    </b-list-group-item>
                  </b-list-group>
                </b-col>
              </b-row>
            </b-card>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script setup>
const { baseURL } = useRuntimeConfig().app;

// Animated icons by Lordicon, served with the site. Each plays once when its
// tile is hovered or its link gets keyboard focus, and stays still for people
// who ask for reduced motion.
const tiles = [
  {
    title: "Courses",
    action: "View courses",
    to: { path: "/develop" },
    icon: "courses",
    text: "Internally developed courses from foundations to specific topics relevant to all data-informed roles.",
  },
  {
    title: "Textbooks",
    action: "View textbooks",
    to: { path: "/develop", query: { type: ["Textbook"] } },
    icon: "textbooks",
    text: "For learning or reference, see a complete textbook on one of the technologies.",
  },
  {
    title: "Documentation",
    action: "View documentation",
    to: { path: "/docs" },
    icon: "documentation",
    text: "Keeping everyone on the same page, sharing common knowledge. This includes style guides, FAQs, etc.",
  },
  {
    title: "FAQs",
    action: "View FAQs",
    to: "/docs/posit-infrastructure/faqs/",
    icon: "faqs",
    text: "Frequently asked questions about the Posit infrastructure.",
  },
];

// The hover trigger follows the pointer over the tile. Keyboard focus lands on
// the link inside, so it plays the icon here.
function play(event) {
  const icon = event.currentTarget.querySelector("lord-icon");
  if (!icon?.play) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  icon.play({ from: "start" });
}

// The element is only needed here, so it loads with this page.
onMounted(async () => {
  if (customElements.get("lord-icon")) return;
  const { defineElement } = await import("@lordicon/element");
  if (!customElements.get("lord-icon")) defineElement();
});
</script>

<style>
.filter-row {
  display: flex;
  align-items: center;
}

input.search {
  min-width: 120px;
  flex-grow: 1;
}

.filter {
  flex: 0 1 auto;
}

.tag-cloud {
  padding: 0 10px;
}

.tag-button {
  margin: 2px 0;
}

b-button {
  margin-top: red;
}

b-dropdown {
  margin-right: 15px;
}

.grid {
  display: grid;
}

.btn-block {
  margin-bottom: 20px;
}

.coming-soon {
  color: var(--phs-blue);
  float: right;
}
</style>
