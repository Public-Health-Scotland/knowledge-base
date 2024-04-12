<template>
<div>
  <h1>Posit Workbench Quick Start Guide</h1>
  <b-carousel
    id="qsg_carousel"
    style="text-shadow: 0px 0px 2px #000"
    no-animation
    no-wrap
    :interval="0"
    indicators
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
            <br><br><br>
          </b-card-text>
        </b-card>
    </template>
    </b-carousel-slide>
    <b-carousel-slide>
      <template #img>
        <b-card
        title="In browser"
        border-variant="light">
          <b-card-text>
            <ol type="1">
              <li>Open a new tab in Microsoft Edge, and navigate to the <strong><a href="https://pwb.publichealthscotland.org/auth-sign-in">Posit Workbench</a></strong>.</li>
              <br>
              <li>Login using your PHS login details</li>
              <br>
              <img src="/sign_in.png" alt="Sign in Posit Workbench">
              <br><br>
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
            <br><br><br>
          </b-card-text>
        </b-card>
      </template>
    </b-carousel-slide>
    <b-carousel-slide>
      <template #img>
        <b-card
        title="In Workbench Session"
        border-variant="light">
          <b-card-text>
            <ol type="1">
              <li>Agree/OK/Yes at the prompt in the Console.</li>
              <br>
              <li>If you need a second session, click the <img src = another_session.png alt="New session button"> button.</li>
            </ol> 
            <br><br><br>
          </b-card-text>
        </b-card>
      </template>
    </b-carousel-slide>
    <b-carousel-slide>
      <template #img>
        <b-card
        title="Best practice"
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
              <li>When working in a project, first open a small session and then open a bigger session with the project from within the small session.</li>
            </ol> 
            <br><br><br>
          </b-card-text>
        </b-card>
      </template>
    </b-carousel-slide>
    <b-carousel-slide>
      <template #img>
        <b-card
        title="Troubleshooting"
        border-variant="light">
          <b-card-text>
            <ol type="1">
              <li>Session closes: Check that you have a big enough session open for your work. 
                Memory usage can be seen here <img src = memory_indicator.png alt="Memory usage indicator">. If you need more memory, request it from the Data Science Team <strong><NuxtLink
                to="/docs/Posit%20Infrastructure?doc=Posit%20Support.md"
                >here</NuxtLink
              ></strong>
              </li>
            </ol> 
            <br><br><br>
          </b-card-text>
        </b-card>
      </template>
    </b-carousel-slide>
  </b-carousel>
</div>
</template>


<style>

.carousel {
  text-shadow: none !important;
}

.carousel-indicators li {
    background-color: #575857;
    width: 15px;
    height: 15px;
    border-radius: 100%;
}

.carousel-indicators active {
    background-color: #000000;
}

.card-title {
  font-size: 1.5rem !important;
}

.card-text {
  font-weight: normal !important;
}
</style>