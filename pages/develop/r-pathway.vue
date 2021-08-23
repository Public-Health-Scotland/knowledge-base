<template>
  <div>
    <div class="title-container">
      <b-card no-body class="overflow-hidden head-card">
        <b-row no-gutters>
          <b-col sm="12" md="9">
            <b-card-body title="R Pathway">
              <b-card-text>
                PHS has made efforts to build an infrastructure for R. Here, the pathway for learning and development is laid out, including training and guidance.
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </div>

    <div>
      <b-row cols="1" cols-md="2">
        <b-col cols="12" lg="6">
          <h5>What is R?</h5>
          <b-row>
            <b-col>
              <p>This video is an overview of what R is and what it can do. Without getting into technical details, the video has a focus on how to get started and build your skills within PHS.</p>
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col class="text-center grid" align-self='center'>
              <b-button variant="outline-primary" @click="$router.push('#get_started')">Get Started</b-button>
            </b-col>
            <b-col class="text-center grid" align-self='center'>
              <b-button variant="outline-primary" @click="$router.push('#take_it_further')">Take it Further</b-button>
            </b-col>
            <b-col class="text-center grid" align-self='center'>
              <b-button variant="outline-primary" @click="$router.push('#get_advanced')">Get Advanced</b-button>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="12" lg="6">
            <b-embed
              type="iframe"
              aspect="16by9"
              src="https://www.youtube.com/embed/9kYUGMg_14s"
              allowfullscreen
            ></b-embed>
        </b-col>
      </b-row>

      <div>
        <b-row cols="1" cols-lg="2">
          <b-col cols="12" lg="9">
            <b-row>
              <b-col>
                <a id="get_started"></a>
                <h4 class="mt-5">Get Started</h4>
                <b-row cols="1" cols-md="2" class="pr-md-0 pr-lg-5">
                  <b-col class="grid">
                    <b-card
                    title="Introduction to R"
                    sub-title="Online"
                    tag="article"
                    class="mb-4">
                      <b-card-text>
                        A beginner's course for learning R from the basics.
                      </b-card-text>
                      <template v-slot:footer>
                        <b-button variant="primary">
                          Start
                        </b-button>
                      </template>
                    </b-card>
                  </b-col>

                  <b-col>
                    <b-card
                    title="Introduction to R"
                    sub-title="In-Person"
                    tag="article"
                    class="mb-4">
                      <b-card-text>
                        A beginner's course for learning R from the basics.
                      </b-card-text>
                      <template v-slot:footer>
                        <b-button variant="primary">
                          Book
                        </b-button>
                      </template>
                    </b-card>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <a id="take_it_further"></a>
                <h4 class="mt-5">Take it Further</h4>

                <b-row cols="1" cols-md="2" class="pr-md-0 pr-lg-5">
                  <b-col class="grid">
                    <b-card
                    title="R Markdown"
                    sub-title="Online"
                    tag="article"
                    class="mb-4">
                      <b-card-text>
                        Learn about building reports and other functionality of R Markdown.
                      </b-card-text>
                      <template v-slot:footer>
                        <b-button variant="primary">
                          Start
                        </b-button>
                      </template>
                    </b-card>
                  </b-col>

                  <b-col>
                    <b-card
                    title="Data Visualisation in R"
                    sub-title="Online"
                    tag="article"
                    class="mb-4">
                      <b-card-text>
                        Learn about data viz using R. This course has a focus on ggplot2 but includes an introduction to plotly.
                      </b-card-text>
                      <template v-slot:footer>
                        <b-button variant="primary">
                          Start
                        </b-button>
                      </template>
                    </b-card>
                  </b-col>
                </b-row>


              </b-col>
            </b-row>

            <b-row>
              <b-col>
                <a id="get_advanced"></a>
                <h4 class="mt-5">Get Advanced</h4>

                <b-row cols="1" cols-md="2" class="pr-md-0 pr-lg-5">
                  <b-col class="grid">
                    <b-card
                    title="R Shiny"
                    sub-title="In-Person"
                    tag="article"
                    class="mb-4">
                      <b-card-text>
                        Learn how to develop web apps and dashboards using R Shiny.
                      </b-card-text>
                      <template v-slot:footer>
                        <b-button variant="primary">
                          Book
                        </b-button>
                      </template>
                    </b-card>
                  </b-col>
                </b-row>

              </b-col>
            </b-row>

            <b-row>
              <b-col>
                <h4 class="mt-5">Related Technologies</h4>

                <b-row cols="1" cols-md="2" class="pr-md-0 pr-lg-5">
                  <b-col class="grid">
                    <b-card
                    title="Introduction to Git"
                    sub-title="In-Person Course"
                    tag="article"
                    class="mb-4">
                      <b-card-text>
                        Learn how to develop web apps and dashboards using R Shiny.
                      </b-card-text>
                      <template v-slot:footer>
                        <b-button variant="primary">
                          Book
                        </b-button>
                      </template>
                    </b-card>
                  </b-col>
                </b-row>

              </b-col>
            </b-row>

          </b-col>

          <b-col cols="12" lg="3">
            <b-row>
              <b-col>
                <h4 class="mt-5">Guidance</h4>

                <b-list-group>
                  <b-list-group-item href="#">R Style Guide<eva-icon class="float-right" name="file-text-outline" fill="#bd27b9"></eva-icon></b-list-group-item>
                  <b-list-group-item href="#">R Textbook<eva-icon class="float-right" name="book-outline" fill="#bd27b9"></eva-icon></b-list-group-item>
                </b-list-group>

              </b-col>
            </b-row>

          </b-col>
        </b-row>
      </div>

    </div>
  </div>
</template>

<script>
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

  .filter{
    flex: 0 1 auto;
  }

  .title-container{
    margin-bottom: 20px;
  }

  .head-card{
    border: none;
  }

  .tag-cloud{
    padding: 0 10px;
  }

  .tag-button{
    margin: 2px 0;
  }

  b-button{
    margin-top: red;
  }

  b-dropdown{
    margin-right: 15px;
  }

  .grid{
    display: grid;
  }

  .multiselect__option--highlight, .multiselect__option--highlight::after{
    background: #80BA27 !important;
  }

  .multiselect__option--selected.multiselect__option--highlight, .multiselect__option--selected.multiselect__option--highlight::after{
    background: #bd27b9 !important;
  }

  .multiselect__tag{
    background: #80BA27 !important;
  }

  .btn-primary{
    background-color: #0078d4;
    float: right;
  }

  .coming-soon{
    color: #0078d4;
    float: right;
  }
  .guidance-md {
    padding: 0 20px;
  }
  .guidance-md img{
    width: 100%;
  }

  footer{
    margin-top: 50px;
    margin-bottom: 50px;
  }
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
