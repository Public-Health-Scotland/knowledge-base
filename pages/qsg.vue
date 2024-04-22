<template>
<div>
  <h1>Posit Workbench Quick Start Guide</h1>
  <b-carousel
    id="qsg_carousel"
    style="text-shadow: 0px 0px 2px #000"
    no-animation
    :interval="0"
    indicators
    controls
    img-width="1024"
    img-height="1024"
  >
    <b-carousel-slide>
      <template #img>
        <b-card
        title="Welcome to the Posit Workbench Quick Start Guide"
        border-variant="light">
          <b-card-text>
            This quick start guide is aimed at people who have not used Posit workbench before, or those who need a refresher in how to use it.
            This guide will take you through how to open Posit Workbench, how to start a new session, best practice when using the workbench, and how to troubleshoot.
            Use the buttons  below to navigate between sections.
          </b-card-text>
          <br>
          <b-card-title>Prior to using Posit Workbench</b-card-title>
          <b-card-text>
            <li>Make sure you have access to Posit Workbench. See <strong><NuxtLink
                to="/docs/Posit%20Infrastructure?doc=How%20to%20Access%20Posit%20Workbench.md"
                >Access to Posit Workbench</NuxtLink></strong> for guidance.</li>
            <li>Connect to the VPN.</li>
          </b-card-text>
        </b-card>
    </template>
    </b-carousel-slide>
    <b-carousel-slide>
      <template #img>
        <b-card
        title="In browser"
        sub-title="Complete the following steps in the browser"
        border-variant="light">
          <b-card-text>
            <ol type="1">
              <li>Open a new tab in Microsoft Edge, and navigate to the <strong><a href="https://pwb.publichealthscotland.org/auth-sign-in">Posit Workbench</a></strong>.</li>
              <br>
              <li>Login using your PHS login details</li>
              <br>
              <li>Open a new session by clicking the “+ New Session button”.</li>
              <br>
              <img src="/new_session_button_home.png" alt="New session button home">
              <br><br>
              <li>Select the appropriate memory for your session. Default (1 CPU and 4096MB) will usually be enough. For more guidance on session size see
                <strong><NuxtLink
                to="/docs/Posit%20Infrastructure?doc=Posit%20Workbench%20and%20Kubernetes.md"
                >Posit Workbench and Kubernetes</NuxtLink
              ></strong>
              </li>
              <br>
              <li>Click “Start session” and wait for session to be ready.</li>
              <br>
              <img src="/start_session_popup.png" alt="Start session popup">
            </ol>
          </b-card-text>
        </b-card>
      </template>
    </b-carousel-slide>
    <b-carousel-slide>
      <template #img>
        <b-card
        title="In Workbench Session"
        sub-title = "Complete the following steps in the session you just opened"
        border-variant="light">
          <b-card-text>
            <ol type="1">
              <li>Agree/OK/Yes at the prompt in the Console.</li>
              <br>
              <li>If you need a second session, click the <img src = another_session.png alt="New session button"> button.</li>
            </ol>
          </b-card-text>
        </b-card>
      </template>
    </b-carousel-slide>
    <b-carousel-slide>
      <template #img>
        <b-card
        title="Best practice"
        sub-title="Tips on how to make the most out of Posit Workbench for yourself and your colleagues "
        border-variant="light">
          <b-card-text>
            <ol type="1">
              <li>Only request as much memory and as many CPUs you need for your work, not the max you have access to.
                This will improve the performance of the Workbench. For more guidance on memory see
                <strong><NuxtLink
                to="/docs/Posit%20Infrastructure?doc=Posit%20Workbench%20and%20Kubernetes.md"
                >Posit Workbench and Kubernetes</NuxtLink
              ></strong>
              </li>
              <br>
              <li>When you are finished using the workbench, close your session/s <img src = close_session.png alt="Close session button">.
                This will free up Workbench memory for other users.
                All open sessions will automatically close at 8pm, unless they are marked “NIGHT”. For more guidance see
                <strong><NuxtLink
                to="/docs/Posit%20Infrastructure?doc=Overnight%20Sessions.md"
                >Overnight Sessions</NuxtLink
              ></strong>
              </li>
              <br>
              <li>When working in a project, first open a small session and then open a bigger session with the project from within the small session. For step-by-step instructions see the
                <strong><NuxtLink to="docs/Posit%20Infrastructure?doc=FAQs.md#how-do-i-open-or-switch-to-another-project">FAQ page</NuxtLink></strong>
                </li>
            </ol>
          </b-card-text>
        </b-card>
      </template>
    </b-carousel-slide>
    <b-carousel-slide>
      <template #img>
        <b-card
        title="Troubleshooting"
        sub-title="Common issues and where to find help"
        border-variant="light">
          <b-card-text>
            <ol type="1">
              <li>Session closes: Check that you have a big enough session open for your work.
                Memory usage can be seen here <img src = memory_indicator.png alt="Memory usage indicator">. If you need more memory, request it from the Data Science Team <strong><NuxtLink
                to="/docs/Posit%20Infrastructure?doc=Posit%20Support.md"
                >here</NuxtLink
              ></strong>
              </li>
              <br>
              <li>For more help with Posit visit the
                <strong><a href="https://teams.microsoft.com/l/team/19%3Ae9f55a12b7d94ef49877ff455a07f035%40thread.tacv2/conversations?groupId=ec4250f9-b70a-4f32-9372-a232ccb4f713&tenantId=10efe0bd-a030-4bca-809c-b5e6745e499a">
                  PHS Data and Intelligence Forum</a></strong> on Microsoft Teams, or see the
                  <strong><NuxtLink to = "/docs/Posit%20Infrastructure?doc=FAQs.md">FAQ page</NuxtLink></strong>
                </li>
            </ol>
          </b-card-text>
        </b-card>
      </template>
    </b-carousel-slide>
  </b-carousel>
</div>
</template>

<script>
export default {
  data: () => ({
    hideCarouselButtonClass: 'hide-carousel-button'
  }),
  async mounted() {
    await this.$nextTick()
    const nextCarouselBtn = document.getElementsByClassName('carousel-control-next')[0]
    const prevCarouselBtn = document.getElementsByClassName('carousel-control-prev')[0]
    // Hide the prev carousel button on initial load
    prevCarouselBtn.classList.add(this.hideCarouselButtonClass)

    const carouselIndicators = document.getElementsByClassName('carousel-indicators')[0]
    const carouselIndicatorsSize = carouselIndicators.childNodes.length - 1

    // Listeners for on click events
    this.createCarouselEventListeners({
      carouselIndicators,
      listenerType: 'click',
      carouselIndicatorsSize,
      nextCarouselBtn,
      prevCarouselBtn
    })

    // Listeners for keydown events. Currently restricting it to 'Enter' key.
    this.createCarouselEventListeners({
      carouselIndicators,
      listenerType: 'keydown',
      carouselIndicatorsSize,
      nextCarouselBtn,
      prevCarouselBtn
    })
  },
  methods: {
    createCarouselEventListeners({
      carouselIndicators,
      listenerType,
      carouselIndicatorsSize,
      nextCarouselBtn,
      prevCarouselBtn
    }) {
      carouselIndicators.childNodes.forEach((indicator, idx) => {
        indicator.addEventListener(listenerType, (e) => {
          if ((listenerType === 'keydown' && e.key === 'Enter') || listenerType === 'click') {
            if (idx === 0) {
              prevCarouselBtn.classList.add(this.hideCarouselButtonClass)
              nextCarouselBtn.classList.remove(this.hideCarouselButtonClass)
            } else if (idx === carouselIndicatorsSize) {
              nextCarouselBtn.classList.add(this.hideCarouselButtonClass)
              prevCarouselBtn.classList.remove(this.hideCarouselButtonClass)
            } else {
              prevCarouselBtn.classList.remove(this.hideCarouselButtonClass)
              nextCarouselBtn.classList.remove(this.hideCarouselButtonClass)
            }
          }
        })
      })

      prevCarouselBtn.addEventListener(listenerType, (e) => {
        if ((listenerType === 'keydown' && e.key === 'Enter') || listenerType === 'click') {
          if (carouselIndicators.childNodes[0].classList.contains('active')) {
            prevCarouselBtn.classList.add(this.hideCarouselButtonClass)
          }
          nextCarouselBtn.classList.remove(this.hideCarouselButtonClass)
        }
      })

      nextCarouselBtn.addEventListener(listenerType, () => {
        if ((listenerType === 'keydown' && e.key === 'Enter') || listenerType === 'click') {
          if (carouselIndicators.childNodes[carouselIndicatorsSize].classList.contains('active')) {
            nextCarouselBtn.classList.add(this.hideCarouselButtonClass)
          }
          prevCarouselBtn.classList.remove(this.hideCarouselButtonClass)
        }
      })
    }
  }
}
</script>

<style>
.carousel {
  text-shadow: none !important;
}

.carousel-inner {
  margin-top: 80px;
  z-index: 500;
}

.carousel-indicators {
  top: -25px;
  justify-content:center;
  margin:0;
  padding-left:15px;
  padding-right:15px;
}

.carousel-indicators li {
  background-color: #575857;
  width: 15px;
  height: 15px;
  border-radius: 100%;
}

.carousel-control-next,
.carousel-control-prev {
  top: -20px;
  z-index: 400;
  display: flex;
  align-items: flex-start;
}

.carousel-control-prev-icon {
 background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%575857' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E") !important;
}

.carousel-control-next-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%575857' viewBox='0 0 8 8'%3E%3Cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E") !important;
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
  margin-bottom: 1.2rem !important
}
.card-text {
  font-weight: normal !important;
}

.card-body {
  padding-right: 8rem;
  padding-left: 8rem;
  padding-top: 3rem;
}
/* Custom class to hide carousel nav buttons */
.hide-carousel-button {
  display: none;
}
</style>
