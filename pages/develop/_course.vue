<template lang="html">
  <div class="">
    <b-breadcrumb>
      <b-breadcrumb-item href="/">Home</b-breadcrumb-item>
      <b-breadcrumb-item href="/develop">Develop</b-breadcrumb-item>
      <b-breadcrumb-item active>{{course.title}}</b-breadcrumb-item>
    </b-breadcrumb>

    <b-row class="pt-4">
      <b-col>
        <h3>{{course.title}}</h3>


      </b-col>
    </b-row>

    <b-row class="pt-5" cols="1" cols-lg="2">
      <b-col cols="12" lg="8" class="pb-5">
        <h4>Description</h4>
        <p>{{course.description}}</p>
        <span style="white-space: pre-wrap">{{course.overview}}</span>
      </b-col>
      <b-col cols="12" lg="4">
        <b-card class="mb-4" v-if="course.f2f != ''">
          <div class="d-flex justify-content-between align-items-center">
            <h5>In-Person Course</h5>
            <b-button
              v-b-modal.booking-modal
              variant="primary"
              @click="selectedCourse = course">
              Book
            </b-button>
          </div>
        </b-card>
        <b-card class="mb-4" v-if="course.online != ''">
          <div class="d-flex justify-content-between align-items-center">
            <h5>Online Course</h5>
            <b-button
            :href="course.link"
            target="_blank"
            variant="primary">
              Start
            </b-button>
          </div>
        </b-card>

        <b-card class="mb-5 pathway-notice" v-if="course.technology == 'R'">
            <h6 class="pathway-notice">Part of the <strong><b-link class="pathway-notice" href="/develop/r-pathway">R technology pathway</b-link></strong></h6>
        </b-card>

      </b-col>
    </b-row>

    <b-row cols="1" cols-lg="2">
      <b-col cols="12" lg="8">
        <h4>Details</h4>
        <h5 class="pt-3">Prerequisites</h5>
        <p v-if="course.prereqs == 'none'">There are <strong>no</strong> prerequisites for this course.</p>

        <ul v-else >
          <li v-for="prereq in courses.filter(c => course.prereqs.includes(c.title))"><NuxtLink :to="'/develop/' + prereq.slug">{{prereq.title}}</NuxtLink></li>
        </ul>
        <h5 v-if="course.f2f != '' && course.timetable != ''" class="pt-2">In-Person Timetable</h5>
        <p v-if="course.f2f != '' && course.timetable != ''">This course is ran over <strong>{{course.timetable}}</strong>.</p>
        <h5 v-if="course.f2f != '' && course.materials != ''" class="pt-2">In-Person Materials</h5>
        <p v-if="course.f2f != '' && course.materials != ''"><a :href="course.materials" target="_blank">{{course.materials}}</a></p>
      </b-col>
    </b-row>

    <b-modal id="booking-modal" size="xl">
      If this content doesn't load, <a target="_blank" :href="course.f2f">click here</a> to open in a browser tab.
      </br>
      <div>
        <iframe width="640px" height= "1550px" :src= "course.f2f" frameborder= "0" marginwidth= "0" marginheight= "0" style= "border: none; width:100%" allowfullscreen webkitallowfullscreen mozallowfullscreen msallowfullscreen> </iframe>
      </div>

    </b-modal>

  </div>
</template>

<script>
import courses from '@/assets/courses.json'

export default {
  data(){
    return {
      courses
    }
  },
  computed:{
    course(){
      let course = courses.filter(course => course.slug == this.$route.params.course)[0]



      return course || {}
    }
  }
}
</script>

<style lang="css" scoped>
  .breadcrumb {
    background-color: white;

  }

  .pathway-notice {
    background-color: #3f3685;
    border: none;
    color: #ffffff;
    font-size: 1.1rem;
  }

</style>
