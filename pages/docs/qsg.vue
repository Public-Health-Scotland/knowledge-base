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
            <li>Make sure you have access to Posit Workbench [link to Access Posit Workbench on Knowledge Base].</li> 
            <li>Connect to the VPN.</li> 
            <br>
            <br>
            <br>
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
              <li>Open a new tab in Microsoft Edge, and navigate to https://pwb.publichealthscotland.org/.</li>
              <li>Login using your PHS login details</li>
              <li>Open a new session by clicking the “+ New Session button”.</li>
              <li>Select the appropriate memory for your session. Default (1 CPU and 4096MB) will usually be enough. For more guidance on session size see the 
                <a href="https://public-health-scotland.github.io/knowledge-base/docs/Posit%20Infrastructure?doc=Posit%20Workbench%20and%20Kubernetes.md"> Knowledge Base</a>
              </li>
              <li>Click “Start session” and wait for session to be ready.</li> 
            </ol> 
            <br>
            <br>
            <br>
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