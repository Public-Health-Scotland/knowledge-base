<template>
  <div>
    <b-row align-h="end">

      <b-col cols='12' md='5'>
        <div class="filter-row">
          <b-form-input class="search" type="search" v-model="search" placeholder="Search"/>

          <b-dropdown
            class="filter"
            size="lg"
            variant="link"
            toggle-class="text-decoration-none"
            no-caret
            right
            offset='-15'>
            <template #button-content>
              <eva-icon name="funnel-outline" fill="#bd27b9"></eva-icon><span class="sr-only">Filter</span>
            </template>
            <b-dropdown-form style="width: 200px">
              <b-form-group
                label="Filter"
                v-slot="{ ariaDescribedby }">
                <b-form-checkbox-group
                  v-model="filterSelected"
                  :aria-describedby="ariaDescribedby"
                  name="filterSelected"
                  stacked>
                  <b-form-checkbox value="Online Course">Online Course</b-form-checkbox>
                  <b-form-checkbox value="In-Person Course">In-Person Course</b-form-checkbox>
                  <b-form-checkbox value="Textbook">Textbook</b-form-checkbox>
                  <b-form-checkbox value="Guidance">Guidance</b-form-checkbox>
                  <b-form-checkbox value="Coming Soon"><i>Coming Soon</i></b-form-checkbox>
                </b-form-checkbox-group>
              </b-form-group>
            </b-dropdown-form>
          </b-dropdown>
        </div>
      </b-col>
    </b-row>

    <div class="title-container">
      <b-card no-body class="overflow-hidden head-card">
        <b-row no-gutters>

          <b-col md="7">
            <b-card-body title="Hey, you ready to learn?">
              <b-card-text>
                Welcome to the PHS Data Science Knowledge Base. It is here that you'll find access to all resources related to Data Science (R, Python, git, etc.) created by and for PHS staff. This includes in-person and online training, guidance documents, and internally developed textbooks.
              </b-card-text>
            </b-card-body>
          </b-col>

          <b-col md="1">
          </b-col>

          <b-col md="4" align-self='center'>
            <div class="tag-cloud">
              <b-button class="tag-button" variant="outline-secondary" @click="search = 'R'">R</b-button>
              <b-button class="tag-button" variant="outline-secondary" @click="search = 'git'">git</b-button>
              <b-button class="tag-button" variant="outline-secondary" @click="search = 'Python'">Python</b-button>
              <b-button class="tag-button" variant="outline-secondary" @click="search = 'SQL'">SQL</b-button>
              <b-button class="tag-button" variant="outline-secondary" @click="search = 'Viz'">Viz</b-button>
            </div>
          </b-col>

        </b-row>
      </b-card>
    </div>

    <b-row cols="1" cols-sm="2" cols-lg="3">
      <b-col
        class="grid"
        v-for="course in displayCourses"
        :key="course.title">
        <b-card-group deck>
          <b-card
            :title="course.title"
            :sub-title="course.type"
            :img-src="course.image"
            :img-alt="course.title"
            img-top
            tag="article"
            class="mb-4"
            >
            <b-card-text>
              {{course.description}}
            </b-card-text>

            <template v-slot:footer>
              <b-button
                v-if="course.type == 'Guidance'"
                v-b-modal.guidance-modal
                variant="primary"
                @click="showGuidance(course)">
                View
              </b-button>

              <b-button
                v-else-if="course.type == 'In-Person Course'"
                v-b-modal.booking-modal
                variant="primary"
                @click="selectedCourse = course">
                Book
              </b-button>

              <b-button
                v-else-if="course.type == 'Textbook'"
                :href="course.link"
                target="_blank"
                variant="primary">
                Open
              </b-button>

              <b-button
                v-else-if="course.link"
                :href="course.link"
                target="_blank"
                variant="primary"
                id="tooltip-start-course">
                Start
              </b-button>

              <div v-else class="coming-soon"><i>Coming Soon</i></div>
            </template>
            <b-tooltip target="tooltip-start-course" triggers="hover" placement="bottom">
              This will open the training app in a new tab!
            </b-tooltip>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>

    <b-modal id="guidance-modal" size="xl" scrollable :title="selectedCourse.title">
      If this content doesn't load, <a :href="selectedCourse.richLink">click here</a> to open in a browser tab.
      </br>
      <vue-markdown class="guidance-md" :source="selectedCourse.md"></vue-markdown>
    </b-modal>

    <b-modal id="booking-modal" size="xl">
      <div v-if="selectedCourse.link">
        <iframe width="640px" height= "1550px" :src= "selectedCourse.link" frameborder= "0" marginwidth= "0" marginheight= "0" style= "border: none; width:100%" allowfullscreen webkitallowfullscreen mozallowfullscreen msallowfullscreen> </iframe>
      </div>

    </b-modal>



  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import VueMarkdown from 'vue-markdown'
import courses from '@/assets/courses.json'

export default {
  components: { Multiselect, VueMarkdown },
  data(){
    return {
      courses,
      selectedTags: [],
      selectedTypes: [],
      selectedCourse: {},
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
        courses = this.courses.filter(course =>
          course.link != "")
      }

      if(this.search.length > 0 && this.search.length <= 3){
        courses = courses.filter( course => {
          if(course.tags.includes(this.search.toLowerCase())) return true
          else return false
        })
      } else if (this.search.length > 4){
        courses = courses.filter( course => {
          if(course.title.toLowerCase().includes(this.search.toLowerCase()+' ')) return true
          else if(course.description.toLowerCase().includes(this.search.toLowerCase()+' ')) return true
          else return false
        })
      }

      courses = courses.filter( course => {
        if(this.filterSelected.includes(course.type)) return true
        else return false
      })



      // if(this.selectedTags.length){
      //   courses = this.courses.filter(course =>
      //      course.tags.some(tag => this.selectedTags.includes(tag))
      //   )
      // }
      //
      // if(this.selectedTypes.length){
      //   courses = this.courses.filter(course =>
      //     this.selectedTypes.includes(course.type)
      //   )
      // }

      return courses
    }
  },
  methods:{
    async showGuidance(course){
      course.md = await this.$axios.$get('https://secret-ocean-49799.herokuapp.com/'+course.link)
      this.selectedCourse=course
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
