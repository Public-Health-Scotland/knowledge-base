<template>
  <div>

    <div class="title-container">
      <b-card no-body class="overflow-hidden head-card">
        <b-row no-gutters>
          <b-col sm="12" md="9">
            <b-card-body title="Hey, you ready to learn?">
              <b-card-text>
                Welcome to the PHS Data Science Knowledge Base. It is here that you'll find access to all resources related to Data Science (R, Python, git, etc.) created by and for PHS staff. This includes in-person and online training, guidance documents, and internally developed textbooks.
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </div>

    <div>
      <b-row cols="1" cols-sm="2" cols-lg="4" class="text-center">
        <b-col>
          <lord-icon
            src="https://cdn.lordicon.com/zpxybbhl.json"
            trigger="hover"
            colors="primary:#3f3685,secondary:#80ba27"
            stroke=25
            style="width:200px;height:200px"
            title="In-person course icon">
          </lord-icon>
          <h5>In-Person Courses</h5>
          <p>Internally developed courses ran by the PHS staff who use the tools in their day-to-day jobs.</p>
        </b-col>
        <b-col>
          <lord-icon
            src="https://cdn.lordicon.com/qhgmphtg.json"
            trigger="hover"
            colors="primary:#3f3685,secondary:#80ba27"
            stroke=25
            style="width:200px;height:200px"
            title="Online course icon">
          </lord-icon>
          <h5>Online Courses</h5>
          <p>The same courses available online in addition to or instead of the in-person options.</p>
        </b-col>
        <b-col>
          <lord-icon
            src="https://cdn.lordicon.com/nocovwne.json"
            trigger="hover"
            colors="primary:#3f3685,secondary:#80ba27"
            stroke=25
            style="width:200px;height:200px"
            title="Guidance document icon">
          </lord-icon>
          <h5>Guidance</h5>
          <p>Keeping everyone on the same page, sharing common knowledge. This includes style guides, FAQs, etc.</p>
        </b-col>
        <b-col>
          <lord-icon
            src="https://cdn.lordicon.com/wxnxiano.json"
            trigger="morph-two-way"
            colors="primary:#3f3685,secondary:#80ba27"
            stroke=25
            style="width:200px;height:200px"
            title="Textbook icon">
          </lord-icon>
          <h5>Textbooks</h5>
          <p>For learning or reference, see a complete textbook on one of the technologies.</p>
        </b-col>
      </b-row>
    </div>

    <div class="mt-5">
      <b-row justify-content-between>
        <b-col>
          <b-card class="mb-4"
          title="Learning Pathways">
            <div class="d-flex mb-4">
              <b-card-text>Sometimes it's easier to get started when you can plan for the road ahead...</b-card-text>
            </div>
            <b-row class="mb-3">
              <b-col>
                <b-button block variant="outline-primary" class="mt-2">R Pathway</b-button>
              </b-col>
              <b-col cols="12" md="10">
                <b-card-text>The R content has been desgined to be topic-led, letting you pick up the concepts and tools for when you need them. However, the R pathway page outlines a structure for all of the R content. This includes training modules, guidance, and related technologies.</b-card-text>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </div>

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

      courses = courses.filter( course => {
        if(this.filterSelected.includes(course.type)) return true
        else return false
      })

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
