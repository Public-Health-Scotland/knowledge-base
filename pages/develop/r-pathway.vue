<template>
  <div>
    <div class="title-container">
      <b-card no-body class="overflow-hidden head-card">
        <b-row no-gutters>
          <b-col sm="12" md="9">
            <b-card-body>
              <h3>R Pathway</h3>
              <b-card-text>
                Here is the pathway for learning and development in R.
              </b-card-text>
            </b-card-body>
          </b-col>
          <b-col align-self='center'>
            <b-button @click="$router.push('/docs/R')" variant="outline-primary">
              R Documentation
            </b-button>
          </b-col>
        </b-row>
      </b-card>
    </div>

    <div>
      <b-row cols="1" cols-md="2">
        <b-col cols="12" lg="6">
          <h4>What is R?</h4>
          <b-row>
            <b-col>
              <p>This video is an overview of what R is and what it can do. Without getting into technical details, the video has a focus on how to get started and build your skills within PHS.</p>
              <p>This page has all resources related to R. See below for the training pathway, this is split into 3 sections (each link will take you directly to the section on this page): </p>
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
          </b-row>

        </b-col>
        <b-col cols="12" lg="6">
          <video width="100%" controls>
            <source src="~/static/phs-r-overview.mp4" type="video/mp4">
            <track kind="subtitles" srclang="en" src="phs-r-overview_vtt_English.vtt" label="English">
          </video>
        </b-col>
      </b-row>

      <div>
        <b-row>
          <b-col>
            <b-row>
              <b-col>
                <a id="get_started"></a>
                <h4 class="mt-5">Get Started</h4>
                <b-row cols="1" cols-md="2" cols-lg="3" class="pr-md-0 pr-lg-5">

                  <b-col
                  class="grid"
                  v-for='course in courses.filter( course => course.technology == "R" && course.level == "1" && course.link != "")'
                  :key="course.title">
                    <b-card-group deck>
                      <b-card
                      class="mb-4">
                        <b-card-title>
                          <NuxtLink :to="'/develop/' + course.slug" class="course-link">{{course.title}}</NuxtLink>
                        </b-card-title>
                        <b-card-text>
                          {{course.description}}
                        </b-card-text>

                        <template v-slot:footer>

                          <b-list-group flush>
                            <b-list-group-item class="d-flex justify-content-between align-items-center" v-if="course.f2f != ''">
                              In-Person Course
                              <!-- <b-button
                                v-b-modal.booking-modal
                                variant="primary"
                                @click="selectedCourse = course">
                                Book
                              </b-button> -->
                              <b-button variant="outline-secondary" disabled>
                                Closed
                              </b-button>
                            </b-list-group-item>
                            <b-list-group-item class="d-flex justify-content-between align-items-center" v-if="course.online != ''">
                              Online Course
                              <b-button
                                :href="course.online"
                                target="_blank"
                                variant="primary">
                                Start
                              </b-button>
                            </b-list-group-item>
                            <b-list-group-item class="coming-soon ml-auto" v-if="course.f2f == '' && course.online == ''">
                              <i>Coming Soon</i>
                            </b-list-group-item>
                          </b-list-group>

                        </template>

                      </b-card>
                  </b-card-group>

                  </b-col>

                </b-row>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <a id="take_it_further"></a>
                <h4 class="mt-5">Take it Further</h4>

                <b-row cols="1" cols-md="2" cols-lg="3" class="pr-md-0 pr-lg-5">

                  <b-col
                  class="grid"
                  v-for='course in courses.filter( course => course.technology == "R" && course.level == "2" && course.link != "")'
                  :key="course.title">
                    <b-card-group deck>
                      <b-card
                      class="mb-4">
                        <b-card-title>
                          <NuxtLink :to="'/develop/' + course.slug" class="course-link">{{course.title}}</NuxtLink>
                        </b-card-title>
                        <b-card-text>
                          {{course.description}}
                        </b-card-text>

                        <template v-slot:footer>

                          <b-list-group flush>
                            <b-list-group-item class="d-flex justify-content-between align-items-center" v-if="course.f2f != ''">
                              In-Person Course
                              <!-- <b-button
                                v-b-modal.booking-modal
                                variant="primary"
                                @click="selectedCourse = course">
                                Book
                              </b-button> -->
                              <b-button variant="outline-secondary" disabled>
                                Closed
                              </b-button>
                            </b-list-group-item>
                            <b-list-group-item class="d-flex justify-content-between align-items-center" v-if="course.online != ''">
                              Online Course
                              <b-button
                                :href="course.online"
                                target="_blank"
                                variant="primary">
                                Start
                              </b-button>
                            </b-list-group-item>
                            <b-list-group-item class="coming-soon ml-auto" v-if="course.f2f == '' && course.online == ''">
                              <i>Coming Soon</i>
                            </b-list-group-item>
                          </b-list-group>

                        </template>

                      </b-card>
                  </b-card-group>

                  </b-col>
                </b-row>
              </b-col>
            </b-row>

            <b-row>
              <b-col>
                <a id="get_advanced"></a>
                <h4 class="mt-5">Get Advanced</h4>

                <b-row cols="1" cols-md="2" cols-lg="3" class="pr-md-0 pr-lg-5">

                  <b-col
                  class="grid"
                  v-for='course in courses.filter( course => course.technology == "R" && course.level == "3" && course.link != "")'
                  :key="course.title">
                    <b-card-group deck>
                      <b-card
                      class="mb-4">
                        <b-card-title>
                          <NuxtLink :to="'/develop/' + course.slug" class="course-link">{{course.title}}</NuxtLink>
                        </b-card-title>
                        <b-card-text>
                          {{course.description}}
                        </b-card-text>

                        <template v-slot:footer>

                          <b-list-group flush>
                            <b-list-group-item class="d-flex justify-content-between align-items-center" v-if="course.f2f != ''">
                              In-Person Course
                              <!-- <b-button
                                v-b-modal.booking-modal
                                variant="primary"
                                @click="selectedCourse = course">
                                Book
                              </b-button> -->
                              <b-button variant="outline-secondary" disabled>
                                Closed
                              </b-button>
                            </b-list-group-item>
                            <b-list-group-item class="d-flex justify-content-between align-items-center" v-if="course.online != ''">
                              Online Course
                              <b-button
                                :href="course.online"
                                target="_blank"
                                variant="primary">
                                Start
                              </b-button>
                            </b-list-group-item>
                            <b-list-group-item class="coming-soon ml-auto" v-if="course.f2f == '' && course.online == ''">
                              <i>Coming Soon</i>
                            </b-list-group-item>
                          </b-list-group>

                        </template>

                      </b-card>
                  </b-card-group>

                  </b-col>
                </b-row>

              </b-col>
            </b-row>

            <b-row>
              <b-col>
                <h4 class="mt-5">Related Technologies</h4>

                <b-row cols="1" cols-md="2" cols-lg="3" class="pr-md-0 pr-lg-5">
                  <b-col
                  class="grid"
                  v-for="course in courses.filter( course => course.related.includes('R'))" :key="course.title">
                    <b-card-group deck>
                      <b-card class="mb-4">
                        <b-card-title>
                          <NuxtLink :to="'/develop/' + course.slug" class="course-link">
                            {{course.title}}
                          </NuxtLink>
                        </b-card-title>
                        <b-card-text>
                          {{course.description}}
                        </b-card-text>

                        <template v-slot:footer>

                          <b-list-group flush>
                            <b-list-group-item class="d-flex justify-content-between align-items-center" v-if="course.f2f != ''">
                              In-Person Course
                              <!-- <b-button
                                v-b-modal.booking-modal
                                variant="primary"
                                @click="selectedCourse = course">
                                Book
                              </b-button> -->
                              <b-button variant="outline-secondary" disabled>Closed</b-button>
                            </b-list-group-item>
                            <b-list-group-item class="d-flex justify-content-between align-items-center" v-if="course.online != ''">
                              Online Course
                              <b-button
                                :href="course.online"
                                target="_blank"
                                variant="primary">
                                Start
                              </b-button>
                            </b-list-group-item>
                            <b-list-group-item class="coming-soon ml-auto" v-if="course.f2f == '' && course.online == ''">
                              <i>Coming Soon</i>
                            </b-list-group-item>
                          </b-list-group>

                        </template>

                      </b-card>
                    </b-card-group>

                  </b-col>
                </b-row>

              </b-col>
            </b-row>

          </b-col>

        </b-row>
      </div>

    </div>

    <b-modal id="guidance-modal" size="xl" scrollable :title="selectedResource.title">
      If this content doesn't load, <a target="_blank" :href="selectedResource.richLink">click here</a> to open in a browser tab.
      </br>
    </br>
      <vue-markdown class="guidance-md" :source="selectedResource.md"></vue-markdown>
    </b-modal>

    <b-modal id="booking-modal" size="xl">
      If this content doesn't load, <a target="_blank" :href="selectedCourse.f2f">click here</a> to open in a browser tab.
      </br>
      <div v-if="selectedCourse.f2f">
        <iframe width="640px" height= "1550px" :src= "selectedCourse.f2f" frameborder= "0" marginwidth= "0" marginheight= "0" style= "border: none; width:100%" allowfullscreen webkitallowfullscreen mozallowfullscreen msallowfullscreen> </iframe>
      </div>
    </b-modal>

  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import courses from '@/assets/courses.json'
import resources from '@/assets/resources.json'

export default {
  components: { VueMarkdown },
  data(){
    return {
      courses,
      resources,
      selectedCourse: {},
      selectedResource: {}
    }
  },
  computed:{
    pathwayResources(){
      let resources = this.resources.filter(resource => resource.technology == "R")
    }
  },
  methods:{
    async showGuidance(resource){
      resource.md = await this.$axios.$get('https://secret-ocean-49799.herokuapp.com/'+resource.link)
      this.selectedResource=resource
    }
  }
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
