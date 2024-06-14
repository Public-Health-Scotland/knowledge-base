<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item @click="$router.push('/')">Home</b-breadcrumb-item>
      <b-breadcrumb-item @click="$router.push('/docs')">
        Documentation
      </b-breadcrumb-item>
      <b-breadcrumb-item active>Quick Start Guides</b-breadcrumb-item>
      <b-breadcrumb-item active>Posit Workbench</b-breadcrumb-item>
    </b-breadcrumb>

    <b-row class="pt-4">
      <b-col>
        <h3>Quick Start - Posit Workbench</h3>
      </b-col>
    </b-row>

    <div>
      <b-tabs class="mt-4" align="center" v-model="tabIndex">
        <b-tab title="Setup">
          <b-card>
            <h4>Welcome to the Posit Workbench Quick Start Guide</h4>
            <b-card-text>
              This quick start guide is aimed at new Posit Workbench users, or
              those who need a refresher in how to use it. You can navigate
              between sections using the tab buttons at the top or buttons to
              progress through each section at the bottom of every page. This
              guide will take you through:
              <ul class="mt-2">
                <li>Setup</li>
                <li><span @click="tabIndex = 1" class="link">Access</span></li>
                <li>
                  <span @click="tabIndex = 2" class="link">Best Practice</span>
                </li>
                <li>
                  <span @click="tabIndex = 3" class="link"
                    >Troubleshooting</span
                  >
                </li>
              </ul>
            </b-card-text>
            <div class="mt-3">
              <h4 class="mt-5">Setup</h4>
              <b-card-text>
                <ul class="mt-2">
                  <li>
                    <strong>Setup user account on Posit.</strong>
                    You'll need an account in order to access Posit Workbench,
                    this is handled via Service Now with specific guidance here:
                    <NuxtLink
                      to="/docs/Posit%20Infrastructure?doc=How%20to%20Access%20Posit%20Workbench.md"
                    >
                      Access to Posit Workbench </NuxtLink
                    >.
                    <em>
                      Accounts may be deactivated following inactivity, the
                      guidance document includes details on what to do if this
                      affects you.
                    </em>
                  </li>
                  <li>
                    <strong>Setup network.</strong>
                    You need to be on the internal network to access Posit
                    Workbench. This can be accessed onsite or by using the VPN.
                  </li>
                </ul>
              </b-card-text>
            </div>
            <div class="d-flex justify-content-end">
              <b-button
                @click="tabIndex = 1"
                variant="outline-primary"
                class="mt-2"
                >Next Page</b-button
              >
            </div>
          </b-card>
        </b-tab>
        <b-tab title="Access">
          <b-card>
            <h4>Accessing Posit Workbench</h4>
            <b-card-text>
              To start using the PHS Posit Workbench, follow the steps below:
              <h5 class="mt-3">Logging in</h5>
              <ol class="mt-2">
                <li>
                  In a support browser (Microsoft Edge or Google Chrome),
                  navigate to the
                  <a
                    target="_blank"
                    href="https://pwb.publichealthscotland.org/auth-sign-in"
                  >
                    PHS Posit Workbench
                  </a>
                  login page.
                </li>
                <li>
                  Login using your PHS LDAP credentials (the same as your laptop
                  login).
                </li>
              </ol>
              <h5 class="mt-5">Starting a session</h5>
              <ol class="mt-2">
                <li>
                  Open a new session by clicking the "+ New Session button" at
                  the top left of the Posit Workbench home screen.
                </li>
                <img
                  src="/quick-start/posit-workbench/new_session_button_home.png"
                  alt="New session button home"
                  class="text-image my-4 d-flex justify-content-center"
                />
                <li>
                  Enter details for the session, including the IDE (e.g. RStudio
                  or VS Code). Pay particular attention to the memory and CPU
                  for your session. The default (1 CPU and 4096MB) will usually
                  be enough but a smaller session can also be appropriate for
                  some tasks. For more guidance on session size see
                  <NuxtLink
                    to="/docs/Posit%20Infrastructure?doc=Posit%20Workbench%20and%20Kubernetes.md"
                    >Posit Workbench and Kubernetes</NuxtLink
                  >.
                </li>
                <li>
                  Click "Start session" and wait for session to be ready. Larger
                  sessions will take longer to allocate resources on the
                  infrastructure but any session should be available within
                  minutes of clicking "Start Session".
                </li>
                <img
                  src="/quick-start/posit-workbench/start_session_popup.png"
                  alt="Start session popup"
                  class="text-image my-4 d-flex justify-content-center"
                />
              </ol>
              <h5 class="mt-5">Starting to work</h5>
              <ol class="mt-2">
                <li>
                  If 'Join session when ready' was selected from the 'New
                  session' diaglog box, the session should automatically start
                  and show the selected IDE (e.g. RStudio). Otherwise, select
                  the created session from the list on the Posit Workbench
                  homescreen.
                </li>
                <li>
                  In RStudio, you are then asked to confirm you have read and
                  agree to the
                  <NuxtLink
                    to="/docs/Posit%20Infrastructure?doc=Acceptable%20Usage%20Policy%20for%20Posit%20Workbench.md"
                    >Acceptable Use Policy</NuxtLink
                  >
                  in the R console with an alternating prompt keyword.
                </li>
              </ol>
            </b-card-text>
            <div class="d-flex justify-content-between">
              <b-button
                @click="tabIndex = 0"
                variant="outline-primary"
                class="mt-2"
                >Prev Page</b-button
              >
              <b-button
                @click="tabIndex = 2"
                variant="outline-primary"
                class="mt-2"
                >Next Page</b-button
              >
            </div>
          </b-card>
        </b-tab>
        <b-tab title="Best Practice">
          <b-card>
            <h4>Using Posit Workbench</h4>
            <b-card-text>
              To be able to make the most efficient and robust use of Posit
              Workbench for any task, it is important to follow best practice.
              This includes:
              <ul class="mt-2">
                <li>
                  <strong
                    >Only request as much memory and as many CPUs you need for
                    your work</strong
                  >, not the max you have access to. This will maximise the
                  performance and minimise the costs. For more guidance on
                  memory see
                  <NuxtLink
                    to="/docs/Posit%20Infrastructure?doc=Posit%20Workbench%20and%20Kubernetes.md"
                    >Posit Workbench and Kubernetes</NuxtLink
                  >.
                </li>
                <li>
                  <strong>Close your session(s)</strong> when finished working
                  on that project or are going to be taking a longer than 10
                  minute break, by clicking
                  <img
                    src="/quick-start/posit-workbench/close_session.png"
                    alt="Close session button"
                  />. All open sessions will automatically close at 8pm, unless
                  they are marked “NIGHT”. For more guidance see
                  <NuxtLink
                    to="/docs/Posit%20Infrastructure?doc=Overnight%20Sessions.md"
                    >Overnight Sessions</NuxtLink
                  >.
                </li>
                <li>
                  <strong
                    >If working in a large project stored on stats, use a
                    'project opener session'.</strong
                  >
                  This utilises a small session which has minimal impact on the
                  infrastructure to then launch the larger session. For more
                  guidance see
                  <NuxtLink
                    to="/docs/Posit%20Infrastructure?doc=FAQs.md#how-do-i-open-or-switch-to-another-project"
                    >Project Opener Sessions</NuxtLink
                  >
                  in the FAQs section.
                </li>
              </ul>
            </b-card-text>
            <div class="d-flex justify-content-between">
              <b-button
                @click="tabIndex = 1"
                variant="outline-primary"
                class="mt-2"
                >Prev Page</b-button
              >
              <b-button
                @click="tabIndex = 3"
                variant="outline-primary"
                class="mt-2"
                >Next Page</b-button
              >
            </div>
          </b-card>
        </b-tab>
        <b-tab title="Troubleshooting">
          <b-card>
            <h4>Getting Help with Posit Workbench</h4>
            <b-card-text>
              It's a normal part of the process to debug and troubleshoot
              issues. However, sometimes it can make it more difficult when
              you're not sure if it's the infrastructure. Here are some common
              concerns and links to help you resolve them:
              <ul class="mt-2">
                <li>
                  <strong>Sessions closing?</strong> Check that you have enough
                  memory in your session for the work you're trying to do.
                  Memory usage can be seen here
                  <img
                    src="/quick-start/posit-workbench/memory_indicator.png"
                    alt="Memory usage indicator"
                  />. If you need more memory, request it from the Data Science
                  Team by following the guidance
                  <NuxtLink
                    to="/docs/Posit%20Infrastructure?doc=Posit%20Support.md"
                    >here</NuxtLink
                  >
                </li>
                <li>
                  <strong>Package installation issues?</strong> There are
                  various packages, especially for geospatial work, that require
                  a different installation process. See the
                  <NuxtLink
                    to="/docs/Posit%20Infrastructure?doc=FAQs.md#installing-packages"
                    >Installing Packages</NuxtLink
                  >
                  FAQ section.
                </li>
                <li>
                  <strong>Other issues?</strong> There's extensive
                  <NuxtLink
                    to="/docs/Posit%20Infrastructure?doc=Posit%20Support.md"
                    >Posit Support</NuxtLink
                  >
                  guidance here, including troubleshooting steps, a link to the
                  <a
                    target="_blank"
                    href="https://teams.microsoft.com/l/team/19%3Ae9f55a12b7d94ef49877ff455a07f035%40thread.tacv2/conversations?groupId=ec4250f9-b70a-4f32-9372-a232ccb4f713&tenantId=10efe0bd-a030-4bca-809c-b5e6745e499a"
                  >
                    PHS Data and Intelligence Forum</a
                  >
                  for community support, and details on how to raise specific
                  issues.
                </li>
              </ul>
            </b-card-text>
            <div class="d-flex justify-content-between">
              <b-button
                @click="tabIndex = 2"
                variant="outline-primary"
                class="mt-2"
                >Prev Page</b-button
              >
            </div>
          </b-card>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabIndex: 0,
    };
  },
  methods: {},
};
</script>

<style scoped>
.breadcrumb {
  background-color: white;
}

.card {
  margin-top: 2rem;
  border: none;
}

.card-title {
  font-size: 1.7rem !important;
  margin-bottom: 1.3rem;
}

.card-subtitle {
  font-size: 1.2rem !important;
  margin-bottom: 1.2rem !important;
}
.card-text {
  font-weight: normal !important;
}

.card-body {
  padding-right: 8rem;
  padding-left: 8rem;
  padding-top: 3rem;
}

.link {
  color: #007bff;
  cursor: pointer;
}

.text-image {
  width: 80%;
  margin: auto;
}
</style>
