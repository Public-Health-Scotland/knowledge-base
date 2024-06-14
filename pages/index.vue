<template>
  <div>
    <div class="title-container">
      <b-card no-body class="overflow-hidden head-card">
        <b-row no-gutters>
          <b-col sm="12">
            <b-card-body>
              <h3>Hey, you ready to learn?</h3>
              <b-card-text>
                Welcome to the PHS Data Science Knowledge Base. It is here that
                you'll find access to all resources related to Data Science (R,
                Python, git, etc.) created by and for PHS staff. This includes
                in-person and online training, internally developed textbooks,
                and all technical documentation, including guidance, how-tos,
                and best practice.
              </b-card-text>
              <b-card-text>
                <strong>Data Science</strong> is used in the broadest possible
                sense, capturing introductory content to technologies, and
                pulling existing and creating new more advanced content from the
                topic experts across the organisation. If you have something to
                offer, get in touch by
                <a href="mailto:phs.datascience@phs.scot?Subject=DSKB - Enquiry"
                  >emailing the Data Science team.</a
                >
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </div>

    <div>
      <b-row cols="1" cols-sm="2" cols-lg="4" class="text-center mb-3">
        <b-col class="mb-4">
          <NuxtLink :to="{ path: '/develop' }"
            ><lord-icon
              src="https://cdn.lordicon.com/rahouxil.json"
              trigger="hover"
              colors="primary:#3f3685,secondary:#80ba27"
              stroke="light"
              style="width: 200px; height: 200px"
              title="Courses icon"
            >
            </lord-icon
          ></NuxtLink>
          <h5><b-link :to="{ path: '/develop' }">Courses</b-link></h5>
          <p>
            Internally developed courses from foundations to specific topics
            relevant to all data-informed roles.
          </p>
        </b-col>
        <b-col class="mb-4">
          <NuxtLink :to="{ path: '/develop', query: { type: ['Textbook'] } }"
            ><lord-icon
              src="https://cdn.lordicon.com/lenjvibx.json"
              trigger="morph-two-way"
              colors="primary:#3f3685,secondary:#80ba27"
              stroke="light"
              style="width: 200px; height: 200px"
              title="Textbook icon"
            >
            </lord-icon
          ></NuxtLink>
          <h5><b-link :to="{ path: '/develop', query: { type: ['Textbook'] } }">Textbooks</b-link></h5>
          <p>
            For learning or reference, see a complete textbook on one of the
            technologies.
          </p>
        </b-col>
        <b-col class="mb-4">
          <NuxtLink :to="{ path: '/docs' }"
            ><lord-icon
              src="https://cdn.lordicon.com/wzwygmng.json"
              trigger="hover"
              colors="primary:#3f3685,secondary:#80ba27"
              stroke="light"
              style="width: 200px; height: 200px"
              title="Guidance document icon"
            >
            </lord-icon
          ></NuxtLink>
          <h5><b-link :to="{ path: '/docs' }">Documentation</b-link></h5>
          <p>
            Keeping everyone on the same page, sharing common knowledge. This
            includes style guides, FAQs, etc.
          </p>
        </b-col>
        <b-col class="mb-4">
          <NuxtLink :to="{ path: '/docs/Posit%20Infrastructure?doc=FAQs.md' }"
            ><lord-icon
              src="https://cdn.lordicon.com/wzrwaorf.json"
              trigger="hover"
              colors="primary:#3f3685,secondary:#80ba27"
              stroke="light"
              style="width: 200px; height: 200px"
              title="FAQs icon"
            >
            </lord-icon
          ></NuxtLink>
          <h5><b-link :to="{ path: '/docs/Posit%20Infrastructure?doc=FAQs.md' }">FAQs</b-link></h5>
          <p>Frequently asked questions about the Posit infrastructure.</p>
        </b-col>
      </b-row>
    </div>

    <div class="mt-4">
      <b-row>
          <b-col class="grid">
            <b-card-group deck>
              <b-card class="m-4">
              <div class="d-flex justify-content-between align-items-center">
                <h4>Quick Start Guides</h4>
                <eva-icon name="flash-outline" fill="#bd27b9"></eva-icon>
              </div>
            </br>
              <div class="d-flex mb-4">
                <b-card-text>
                  Get started with a guided brief overview of setup, access, and best practice.
                </b-card-text
                >
              </div>
              <b-row class="mb-3">
                <b-col>
                  <b-list-group flush>
                    <b-list-group-item to='/quick-start/posit-workbench'>
                      <h5 class="mb-1">Posit Workbench</h5>
                      <p class="mb-1">
                        Quick start guide to using Posit Workbench, including access and starting a session.
                      </p>
                    </b-list-group-item>
                    <b-list-group-item to='/quick-start/git' disabled>
                      <h5 class="mb-1">Git <em>(Coming Soon)</em></h5>
                      <p class="mb-1">
                        Quick start guide to using Git, including installation and configuration on desktop and Posit Workbench.
                      </p>
                    </b-list-group-item>
                  </b-list-group>
                </b-col>
              </b-row>
            </b-card>
            
            <b-card class="m-4">
              <div class="d-flex justify-content-between align-items-center">
                <h4>Learning Pathways</h4>
                <eva-icon name="compass-outline" fill="#bd27b9"></eva-icon>
              </div>
            </br>
              <div class="d-flex mb-4">
                <b-card-text>
                  Structured learning pathways to find the right courses for your development.
                </b-card-text>
              </div>
              <b-row class="mb-3">
                <b-col>
                  <b-list-group flush>
                    <b-list-group-item to='/develop/r-pathway'>
                      <h5 class="mb-1">R Pathway</h5>
                      <p class="mb-1">
                        A structured pathway to learning R, including topic-led training modules, guidance, and related technologies.
                      </p>
                    </b-list-group-item>
                    <b-list-group-item to='/develop/python-pathway' disabled>
                      <h5 class="mb-1">Python <em>(Coming Soon)</em></h5>
                      <p class="mb-1">
                        A structured pathway to learning Python, including topic-led training modules, guidance, and related technologies.
                      </p>
                    </b-list-group-item>
                  </b-list-group>
                </b-col>
              </b-row>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import VueMarkdown from "vue-markdown";
import courses from "@/assets/courses.json";

export default {
  components: { Multiselect, VueMarkdown },
  data() {
    return {
      courses,
      selectedTags: [],
      selectedTypes: [],
      selectedCourse: {},
      search: "",
      filterSelected: [
        "Online Course",
        "In-Person Course",
        "Textbook",
        "Guidance",
      ],
    };
  },
  computed: {
    tags() {
      let tags = [];
      this.courses.forEach((course) => (tags = tags.concat(course.tags)));
      return [...new Set(tags)];
    },
    types() {
      let types = [];
      this.courses.forEach((course) => (types = types.concat(course.type)));
      return [...new Set(types)];
    },

    displayCourses() {
      // Add all the courses that have at least 1 matching tags
      // to the list of selectedTags
      //
      let courses = this.courses;

      if (!this.filterSelected.includes("Coming Soon")) {
        courses = this.courses.filter((course) => course.link != "");
      }

      if (this.search.length > 0 && this.search.length <= 1) {
        courses = courses.filter((course) => {
          if (course.tags.includes(this.search.toLowerCase())) return true;
          else return false;
        });
      } else if (this.search.length > 1) {
        courses = courses.filter((course) => {
          if (course.title.toLowerCase().includes(this.search.toLowerCase()))
            return true;
          else if (
            course.description.toLowerCase().includes(this.search.toLowerCase())
          )
            return true;
          else return false;
        });
      }

      courses = courses.filter((course) => {
        if (this.filterSelected.includes(course.type)) return true;
        else return false;
      });

      return courses;
    },
  },

  methods: {
    async showGuidance(course) {
      course.md = await this.$axios.$get(
        "https://secret-ocean-49799.herokuapp.com/" + course.link
      );
      this.selectedCourse = course;
    },
  },
};
</script>

<style>
.filter-row {
  display: flex;
  align-items: center;
}

input {
  min-width: 120px;
  flex-grow: 1;
}

.filter {
  flex: 0 1 auto;
}

.title-container {
  margin-bottom: 20px;
}

.head-card {
  border: none;
}

.tag-cloud {
  padding: 0 10px;
}

.tag-button {
  margin: 2px 0;
}

h5 a {
  color: black;
}

h5 a:hover {
  color: black;
  text-decoration: none;
}

b-button {
  margin-top: red;
}

b-dropdown {
  margin-right: 15px;
}

.grid {
  display: grid;
}

.multiselect__option--highlight,
.multiselect__option--highlight::after {
  background: #80ba27 !important;
}

.multiselect__option--selected.multiselect__option--highlight,
.multiselect__option--selected.multiselect__option--highlight::after {
  background: #bd27b9 !important;
}

.multiselect__tag {
  background: #80ba27 !important;
}

.btn-primary {
  background-color: #0078d4;
  float: right;
}

.btn-block {
  margin-bottom: 20px;
}
.coming-soon {
  color: #0078d4;
  float: right;
}
.guidance-md {
  padding: 0 20px;
}
.guidance-md img {
  width: 100%;
}
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
