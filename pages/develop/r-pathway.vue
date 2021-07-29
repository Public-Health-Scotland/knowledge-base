<template>
  <div>
    Hello World
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import VueMarkdown from 'vue-markdown'
import courses from '@/assets/courses.json'

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
