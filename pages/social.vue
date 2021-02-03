<template>
  <div>
    <!-- <b-row align-h="end">

      <b-col cols='12' md='5'>
        <div class="filter-row">
          <b-form-input class="search" type="search" v-model="search" placeholder="Search"/>
        </div>
      </b-col>
    </b-row> -->

    <div class="title-container">
      <b-card no-body class="overflow-hidden head-card">
        <b-row no-gutters>

          <b-col md="7">
            <b-card-body title="Hey, it's time to get sociable!">
              <b-card-text>
                Below you will find a curated assortment of Data Science content and links for social and support channels.
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </div>

    <b-row>
      <b-col xs="12" md="8">
        <b-card class="mb-4">
          <div class="d-flex justify-content-between">
            <h4>Announcements</h4><eva-icon name="alert-circle-outline" fill="#bd27b9"></eva-icon>
          </div>
        </br>
          <h6>RStudio Version</h6>
          <div class="d-flex">
            <p>Currently, v4.0.3 of RStudio is being tested for rollout in March.</p>
          </div>
          <h6>Data Science Strategy</h6>
          <div class="d-flex">
            <p>Work is currently underway around the organisation's Data Science strategy. This work involves key areas around Training/Development, IT/Infrastructure, Tools/Techniques/Methodologies, and Communications/Engagement. </p>
          </div>
        </b-card>
      </b-col>

      <b-col xs="12" md="4">
        <b-card class="mb-4">
          <div class="d-flex justify-content-between">
            <h4>Social Links</h4><eva-icon name="people-outline" fill="#bd27b9"></eva-icon>
          </div>
          <div class="d-flex align-items-center social-link">
            <img class="icon" src="~/static/teams-logo.png" alt="Teams logo"><b-link href="https://teams.microsoft.com/l/team/19%3ae9f55a12b7d94ef49877ff455a07f035%40thread.tacv2/conversations?groupId=ec4250f9-b70a-4f32-9372-a232ccb4f713&tenantId=10efe0bd-a030-4bca-809c-b5e6745e499a" target="_blank" class="mb-0">PHS R User Group</b-link>
          </div>
          <div class="d-flex align-items-center social-link">
            <img class="icon" src="~/static/teams-logo.png" alt="Teams logo"><b-link href="https://teams.microsoft.com/l/team/19%3ade52fa8e8e3847e0bee59ad4322fbb04%40thread.tacv2/conversations?groupId=1d322b44-bb66-4789-bb8e-1c5cffc733b7&tenantId=10efe0bd-a030-4bca-809c-b5e6745e499a" target="_blank" class="mb-0">PHS People Development Hub</b-link>
          </div>
          <div class="d-flex align-items-center social-link">
            <img class="icon" src="~/static/slack-logo.png" alt="Slack logo"><b-link href="https://datasciencescotland.slack.com" target="_blank" class="mb-0">Data Science Scotland</b-link>
          </div>

        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <b-card class="mb-4">
          <div class="d-flex justify-content-between">
            <h4>Spotlight</h4><eva-icon name="bulb-outline" fill="#bd27b9"></eva-icon>
          </div>
        </br>
          <h6>Package Development</h6>
          <div class="d-flex">
            <p>PHS have an internally developed R package for common tasks related to Public Health data. Check out <a href="https://github.com/Public-Health-Scotland/phsmethods" target="_blank">phsmethods</a> on GitHub or get familiar with the <a href="https://scotland.shinyapps.io/phs-learnr-phsmethods/">online course</a>. Also, feel free to get in touch with the <a href="mailto:phs.transformingpublishing@phs.scot?Subject=DSKB - phsmethods">Transforming Publishing team</a> with any questions or suggestions!</p>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col >
        <b-card class="mb-4">
          <div class="d-flex justify-content-between">
            <h4>External Reading</h4><eva-icon name="bookmark-outline" fill="#bd27b9"></eva-icon>
          </div>
          </br>

          <b-row class="d-flex justify-content-between list-section">
            <b-col cols="1" class="text-center" align-self="center">
              <eva-icon name="book-outline" fill="#bd27b9"></eva-icon>
            </b-col>
            <b-col>
              <a href="https://r4ds.had.co.nz/index.html">R for Data Science (R4DS)</a>
              <i>Hadley Wickham & Garrett Grolemund</i>
              <p class="mb-0">"This book will teach you how to do data science with R: You’ll learn how to get your data into R, get it into the most useful structure, transform it, visualise it and model it. In this book, you will find a practicum of skills for data science."</p>
            </b-col>
          </b-row>

          <b-row class="d-flex justify-content-between list-section">
            <b-col cols="1" class="text-center" align-self="center">
              <eva-icon name="book-outline" fill="#bd27b9"></eva-icon>
            </b-col>
            <b-col>
              <a href="http://adv-r.had.co.nz/">Advanced R</a>
              <i>Hadley Wickham</i>
              <p class="mb-0">"This book is designed primarily for R users who want to improve their programming skills and understanding of the language. It should also be useful for programmers coming to R from other languages..."</p>
            </b-col>
          </b-row>

          <b-row class="d-flex justify-content-between list-section">
            <b-col cols="1" class="text-center" align-self="center">
              <eva-icon name="file-text-outline" fill="#bd27b9"></eva-icon>
            </b-col>
            <b-col>
              <a href="https://colinfay.me/explain-environments-eli5/">Explain R environments like I’m 5</a>
              <i>All Code No Brain, Collin Fay</i>
              <p class="mb-0">"A blog post explaining environments in R that assumes nothing about the readers experience."</p>
            </b-col>
          </b-row>

        </b-card>
      </b-col>
    </b-row>

  </div>
</template>

<script>
export default {
}
</script>

<style>
.filter-row{
  display: flex;
  align-items: center;
}

input{
  min-width: 120px;
  flex-grow: 1
}

.icon{
  max-width: 20px;
  margin: 5px;
}

.social-link{
  margin-top: 10px;
}

.list-section{
  margin-bottom: 15px;
}
</style>
