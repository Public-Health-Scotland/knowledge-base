<template>
  <div class="doc-page">
    <DocBreadcrumbs :page="page" />

    <div class="doc-layout">
      <aside class="doc-aside">
        <DocSidebar :page="page" />
      </aside>

      <div class="doc-main">
        <!-- Rendered and sanitised at build time (lib/docs/render.mjs). -->
        <!-- eslint-disable vue/no-v-html -->
        <article
          v-if="page.html"
          ref="article"
          class="kb-content"
          v-html="page.html"
        ></article>
        <!-- eslint-enable vue/no-v-html -->
        <article v-else class="kb-content">
          <h1>{{ page.title }}</h1>
          <ul>
            <li v-for="doc in page.docs" :key="doc.url">
              <NuxtLink :to="doc.url">{{ doc.title }}</NuxtLink>
              <p v-if="doc.description" class="mb-2">{{ doc.description }}</p>
            </li>
          </ul>
        </article>

        <DocPager :previous="page.previous" :next="page.next" />
      </div>
    </div>

    <div role="status" class="visually-hidden">{{ announcement }}</div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref, watch } from "vue";

const props = defineProps({
  page: { type: Object, required: true },
});

useHead({
  title: () => `${props.page.title} - PHS Data Science - Knowledge Base`,
  meta: () =>
    props.page.description
      ? [{ name: "description", content: props.page.description }]
      : [],
});

// Copy buttons are added in the browser, so without JavaScript the code is
// still there to select.
const article = ref(null);
const announcement = ref("");

function addCopyButtons() {
  if (!article.value || !navigator.clipboard) return;
  for (const pre of article.value.querySelectorAll("pre")) {
    // Blocks with a language label are already wrapped when the site is built.
    let wrapper = pre.parentElement;
    if (wrapper.querySelector(":scope > .code-copy")) continue;
    if (!wrapper.classList.contains("code-block")) {
      wrapper = document.createElement("div");
      wrapper.className = "code-block";
      pre.replaceWith(wrapper);
      wrapper.append(pre);
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn-sm btn-light code-copy d-print-none";
    button.textContent = "Copy";
    button.setAttribute("aria-label", "Copy code");
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(pre.innerText.replace(/\n$/, ""));
        button.textContent = "Copied";
        announcement.value = "Code copied";
      } catch {
        announcement.value =
          "Couldn't copy the code. Select it and copy it instead.";
      }
      setTimeout(() => {
        button.textContent = "Copy";
        announcement.value = "";
      }, 2000);
    });
    wrapper.append(button);
  }
}

onMounted(addCopyButtons);
watch(
  () => props.page.html,
  () => nextTick(addCopyButtons),
);
</script>
