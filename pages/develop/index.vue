<template>
  <div>

    <div class="title-container">
      
      <b-row no-gutters>
        <b-col md="7">
          <b-card no-body class="overflow-hidden head-card"></b-card>
            <b-card-body>
              <h3>Develop</h3>
              <b-card-text>
                Training and support materials related to Data Science in PHS
              </b-card-text>
              <b-button variant="outline-primary" class="mt-2" @click="$router.push('/develop/r-pathway')">R Pathway</b-button>
            </b-card-body>
          </b-card>
        </b-col>
        
        <b-col md="1">
        </b-col>

        <b-col md="4" align-self='center'>
          <b-form-input class="search mt-5" type="search" v-model="search" placeholder="Search"/>
          <b-dropdown
            class="filter float-right mt-3 mr-3"
            variant="outline-secondary"
            right
            text="Category">
            <b-dropdown-form style="width: 200px">
              <b-form-group
                label="Filter on type:"
                v-slot="{ ariaDescribedby }">
                <b-form-checkbox-group
                  v-model="filterSelected"
                  :aria-describedby="ariaDescribedby"
                  name="filterSelected"
                  stacked>
                  <b-form-checkbox value="In-Person Course">In-Person Course</b-form-checkbox>
                  <b-form-checkbox value="Online Course">Online Course</b-form-checkbox>
                  <b-form-checkbox value="Guidance">Guidance</b-form-checkbox>
                  <b-form-checkbox value="Textbook">Textbook</b-form-checkbox>
                  <b-form-checkbox value="Coming Soon"><i>Coming Soon</i></b-form-checkbox>
                </b-form-checkbox-group>
              </b-form-group>
            </b-dropdown-form>
          </b-dropdown>
        </b-col>
      </b-row>


      <b-row align-h="end">
        
      </b-row>

    </div>

    <b-row cols="1" cols-sm="2" cols-lg="3" class="mt-4">
      <b-col>
        <h4 class="mb-3">Courses</h4>
      </b-col>
    </b-row>

    <b-row>
      <b-col
        v-if="displayCourses.length == 0">
        <p>Filter and search query return <strong>no results</strong>. If you can't find what you're looking for, why not <a href="mailto:phs.datascience@phs.scot; phs.staffdevelopment@phs.scot?Subject=DSKB - Course Enquiry">email us</a>?</p>
      </b-col>
    </b-row>

    <b-row cols="1" cols-sm="2" cols-lg="3">

      <b-col
        class="grid"
        v-for="course in displayCourses"
        :key="course.title">
        <b-card-group deck>
          <b-card
            class="mb-4">
            <b-card-title>
              <NuxtLink :to="'develop/' + course.slug" class="course-link">{{course.title}}</NuxtLink>
            </b-card-title>
            <b-card-text>
              {{course.description}}
            </b-card-text>

            <template v-slot:footer>

                <b-list-group flush>
                  <b-list-group-item class="d-flex justify-content-between align-items-center" v-if="course.f2f != ''">
                    In-Person Course
                    <b-button
                      v-b-modal.booking-modal
                      variant="primary"
                      @click="selectedCourse = course">
                      Book
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

    <b-row cols="1" cols-sm="2" cols-lg="3">
      <b-col>
        <h4 class="mb-3 mt-5">Other Resources</h4>
      </b-col>
    </b-row>

    <b-row>
      <b-col
        v-if="displayResources.length == 0">
        <p>Filter and search query return <strong>no results</strong>. If you can't find what you're looking for, why not <a href="mailto:phs.datascience@phs.scot; phs.staffdevelopment@phs.scot?Subject=DSKB - Resource Enquiry">email us</a>?</p>
      </b-col>
    </b-row>

    <b-row cols="1" cols-sm="2" cols-lg="3">
      <b-col
        class="grid"
        v-for="resource in displayResources"
        :key="resource.title">
        <b-card-group deck>
          <b-card
            :title="resource.title"
            class="mb-4">
            <b-card-text>
              {{resource.description}}
            </b-card-text>

            <template v-slot:footer>

              <b-list-group flush>
                <b-list-group-item class="d-flex justify-content-between align-items-center" v-if="resource.type == 'Guidance'">
                  Guidance
                  <b-button
                    :href="resource.richLink"
                    target="_blank"
                    variant="primary">
                    Open
                  </b-button>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center" v-if="resource.type == 'Textbook'">
                  Textbook
                  <b-button
                    :href="resource.link"
                    target="_blank"
                    variant="primary">
                    Open
                  </b-button>
                </b-list-group-item>

              </b-list-group>

            </template>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>

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
import Multiselect from 'vue-multiselect'
import VueMarkdown from 'vue-markdown'
import courses from '@/assets/courses.json'
import resources from '@/assets/resources.json'

export default {
  components: { Multiselect, VueMarkdown },
  data(){
    return {
      courses,
      resources,
      selectedTags: [],
      selectedTypes: [],
      selectedCourse: {},
      selectedResource: {},
      search: '',
      filterSelected: ["Online Course", "In-Person Course", "Textbook", "Guidance"]
    }
  },
  computed:{
    tags(){
      let tags = []
      this.courses.forEach(course => tags = tags.concat(course.tags))
      return [...new Set(tags)]
    },
    types(){
      let types = []
      this.courses.forEach(course => types = types.concat(course.type))
      return [...new Set(types)]
    },

    displayCourses(){
      // Add all the courses that have at least 1 matching tags
      // to the list of selectedTags
      //
      let courses = this.courses

      if(!this.filterSelected.includes("Coming Soon")) {
        courses = courses.filter(course =>
          course.f2f != "" || course.online != "")
      }

      if(this.search.length > 0 && this.search.length <= 1){
        courses = courses.filter( course => {
          if(course.tags.includes(this.search.toLowerCase())) return true
          else return false
        })
      } else if (this.search.length > 1){
        courses = courses.filter( course => {
          if(course.title.toLowerCase().includes(this.search.toLowerCase())) return true
          else if(course.description.toLowerCase().includes(this.search.toLowerCase())) return true
          else return false
        })
      }

      if(this.filterSelected.includes("In-Person Course") && this.filterSelected.includes("Online Course")) {
        courses = courses.filter( course => {
          if(course.type.includes("In-Person Course") || course.type.includes("Online Course")) return true
        })
      } else if (this.filterSelected.includes("In-Person Course")){
        courses = courses.filter( course => {
          if(course.type.includes("In-Person Course")) return true
        })
      } else if (this.filterSelected.includes("Online Course")){
        courses = courses.filter( course => {
          if(course.type.includes("Online Course")) return true
        })
      } else {
        courses = courses.filter(course =>
          !course.type.includes("In-Person Course") && !course.type.includes("Online Course"))
      }

      return courses
    },

    displayResources(){
      let resources = this.resources

      if(!this.filterSelected.includes("Coming Soon")) {
        resources = resources.filter(resource =>
          resource.link != "")
      }

      if(this.search.length > 0 && this.search.length <= 1){
        resources = resources.filter( resource => {
          if(resource.tags.includes(this.search.toLowerCase())) return true
          else return false
        })
      } else if (this.search.length > 1){
        resources = resources.filter( resource => {
          if(resource.title.toLowerCase().includes(this.search.toLowerCase())) return true
          else if(resource.description.toLowerCase().includes(this.search.toLowerCase())) return true
          else return false
        })
      }

      resources = resources.filter( resource => {
        if(this.filterSelected.includes(resource.type)) return true
        else return false
      })

      return resources
    }
  },



  methods:{
    async showGuidance(resource){
      resource.md = await this.$axios.$get('https://secret-ocean-49799.herokuapp.com/'+resource.link)
      this.selectedResource=resource
    }
  },

  created(){
    if(this.$route.query.type){
      this.filterSelected = this.$route.query.type

      this.$router.push({query: {}}) // Clear the query in the URL
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

  .card-footer{
    background-color: #ffffff;
  }

  .btn-primary{
    background-color: #0078d4;
    float: right;
  }

  .course-link{
    color: black;
  }

  .coming-soon{
    color: #0078d4;
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
