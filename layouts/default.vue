<template>
  <div>

        <head>
          <!-- Global site tag (gtag.js) - Google Analytics -->
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-3D55TZR6QM"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-3D55TZR6QM');
          </script>
          <script src="https://cdn.lordicon.com/libs/frhvbuzj/lord-icon-2.0.2.js"></script>
        </head>

        <div class="header-container">
          <header>
            <div class="container">
              <div class="d-flex justify-content-between align-items-center">
                <div class="left">
                  <img
                    class="logo cursor-pointer"
                    src="~/static/phs-logo.png"
                    alt="PHS Logo"
                    @click="$router.push('/')">
                </div>
              </div>
            </div>
          </header>
        </div>

        <div class="nav-container">
          <b-navbar toggleable="sm" type="dark">
            <div class="container">
              <b-navbar-brand
                class="cursor-pointer"
                @click="$router.push('/')">
                  Data Science Knowledge Base
                </b-navbar-brand>

              <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

              <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">

                  <NuxtLink to="/develop" tag="b-nav-item">Develop</NuxtLink>
                  <NuxtLink to="/social" tag="b-nav-item">Social</NuxtLink>

                  <!-- <b-nav-item href=""><strong>Develop</strong></b-nav-item>
                  <b-nav-item href=""><strong>Social</strong></b-nav-item> -->
                  <b-nav-item v-b-modal.help-modal><eva-icon name="question-mark-circle-outline" fill="#fff"></eva-icon></b-nav-item>
                  <b-modal id="help-modal" size="lg" title="Help">

                    <p class="my-4"><strong>Training Request</strong> - If you can't find what you're looking for or have a specific training requirement, use this link to <a href="mailto:phs.staffdevelopment@phs.scot?Subject=DSKB - Training Request">email Staff Development.</a></p>

                    <p class="my-4"><strong>Knowledge Base Enquiry</strong> - Feedback, issues, or suggestions for the knowledge base? <a href="https://github.com/Public-Health-Scotland/knowledge-base/issues/new/choose" target="_blank">Open an issue</a> on the GitHub repo or <a href="mailto:phs.datascience@phs.scot?Subject=DSKB - Enquiry">email the Data Science team.</a></p>
                  </b-modal>
                </b-navbar-nav>
              </b-collapse>
            </div>
          </b-navbar>
        </div>

      <div class="container body">
        <Nuxt />
      </div>

      <div class="container d-flex justify-content-between align-items-center">
        <div>
          <footer>
            <b-nav>
              <b-nav-item v-b-modal.accessibility-modal>Accessibility</b-nav-item>
              <b-nav-item href="https://www.publichealthscotland.scot/contact-us/freedom-of-information-foi-and-environmental-information-regulation-eir-requests/" target="_blank">Freedom of Information</b-nav-item>
              <b-nav-item href="https://www.publichealthscotland.scot/terms-and-conditions/" target="_blank">Terms and Conditions</b-nav-item>
              <b-nav-item href="https://www.publichealthscotland.scot/our-privacy-notice/organisational-background/" target="_blank">Privacy notice</b-nav-item>
              <b-nav-item disabled>© Public Health Scotland</b-nav-item>
            </b-nav>
          </footer>
        </div>
        <div class="">
          <b-button v-b-modal.feedback-modal class="feedback-button" pill><eva-icon name="message-square-outline" fill="#fff"></eva-icon></b-button>
        </div>
      </div>

      <b-modal id="accessibility-modal" size="lg" scrollable title="Accessibility">
        <h5>Accessible Content</h5>
        This website is run by the Data Science department in Public Health Scotland. We want as many people as possible to be able to use this website. For example, that means you should be able to:

        <ul>
          <li>change colours, contrast levels and fonts</li>
          <li>zoom in up to 300% without the text spilling off the screen</li>
          <li>navigate most of the website using just a keyboard</li>
          <li>navigate most of the website using speech recognition software</li>
          <li>listen to most of the website using a screen reader (including the most recent versions of JAWS, NVDA and VoiceOver)</li>
        </ul>

        We’ve also made the website text as simple as possible to understand.

        We're always looking to improve the accessibility of this website. If you find problems not listed on this page or think we're not meeting accessibility requirements, please email the <a href="mailto:phs.datascience@phs.scot?Subject=DSKB - Accessibility">Data Science team.</a></p>

        <h5>Testing</h5>

        <i>This website is currently undergoing development and testing is not yet been complete.</i>

      </b-modal>

      <b-modal id="feedback-modal" size="xl">
        If this content doesn't load, <a target="_blank" href="https://forms.office.com/r/RhjP2yNq4y">click here</a> to open in a browser tab.
        </br>
        <div>
          <iframe width="640px" height= "1100px" src= "https://forms.office.com/Pages/ResponsePage.aspx?id=veDvEDCgykuAnLXmdF5JmlMENbvENPtAs5eceNN9kYdUQ0JJWlY4UjNOQ1ZCSVlEOUpTSEo3N0JaWS4u&embed=true" frameborder= "0" marginwidth= "0" marginheight= "0" style= "border: none; width:100%" allowfullscreen webkitallowfullscreen mozallowfullscreen msallowfullscreen> </iframe>
        </div>
      </b-modal>

  </div>
</template>

<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 14px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
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

header{
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header.h1{
  color: #bd27b9;
}

img.logo{
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

.nuxt-link-active{}

.nuxt-link-exact-active{
  font-weight: bold;
}

.feedback-button{
  background-color: #3f3685;
  border-color: #3f3685;
}

.feedback-button:hover{
  background-color: #2f2863;
  border-color: #2f2863;
}

.feedback-button:focus{
  background-color: #3f3685;
  border-color: #3f3685;
}



/* Utility */
.cursor-pointer{
  cursor: pointer;
}
</style>
