<template lang="html">
  <div class="">
    <pre>$route.params: {{$route.params}}</pre>

    <pre>{{course}}</pre>
  </div>
</template>

<script>
import courses from '@/assets/courses.json'

export default {
  computed:{
    course(){
      let course = courses.filter(course => course.slug == this.$route.params.course)[0]



      return course || {}
    }
  }
}
</script>

<style lang="css" scoped>
</style>
