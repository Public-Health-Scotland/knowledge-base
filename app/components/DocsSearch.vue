<template>
  <div class="docs-search" @focusout="onFocusOut">
    <label :for="ids.input" class="visually-hidden">
      Search the documentation
    </label>
    <input
      :id="ids.input"
      v-model="query"
      class="form-control"
      type="search"
      placeholder="Search the docs"
      autocomplete="off"
      role="combobox"
      aria-autocomplete="list"
      :aria-expanded="expanded ? 'true' : 'false'"
      :aria-controls="ids.list"
      :aria-activedescendant="active >= 0 ? optionId(active) : undefined"
      :aria-describedby="ids.hint"
      @focus="load"
      @input="onInput"
      @keydown="onKeydown"
    />
    <span :id="ids.hint" class="visually-hidden">
      Results appear as you type. Use the up and down arrow keys to choose one
      and Enter to open it.
    </span>

    <ul
      v-show="expanded"
      :id="ids.list"
      role="listbox"
      aria-label="Search results"
      class="list-group docs-search-results"
    >
      <li
        v-for="(result, index) in results"
        :id="optionId(index)"
        :key="result.url"
        role="option"
        :aria-selected="index === active ? 'true' : 'false'"
        class="list-group-item list-group-item-action"
        :class="{ active: index === active }"
        @mousedown.prevent="open(result)"
      >
        <span class="d-block fw-bold">{{ result.title }}</span>
        <span class="d-block small">{{ result.section }}</span>
        <span class="d-block small mt-1">
          <template v-for="(part, i) in result.snippet" :key="i">
            <mark v-if="part.match">{{ part.text }}</mark>
            <template v-else>{{ part.text }}</template>
          </template>
        </span>
      </li>
    </ul>

    <div role="status" class="visually-hidden">{{ status }}</div>
  </div>
</template>

<script setup>
import MiniSearch from "minisearch";
import { computed, onBeforeUnmount, ref, useId, watch } from "vue";
import { SEARCH_OPTIONS, snippet } from "~~/lib/docs/search.mjs";

const MAX_RESULTS = 8;

const id = useId();
const ids = { input: `${id}-input`, list: `${id}-list`, hint: `${id}-hint` };
const optionId = (index) => `${id}-option-${index}`;

const config = useRuntimeConfig();
const query = ref("");
const active = ref(-1);
const dismissed = ref(false);
const state = ref("idle"); // idle, loading, ready, failed
const status = ref("");

let searchIndex;
let pages = new Map();

// The search text is only downloaded when someone starts to search.
async function load() {
  if (state.value !== "idle") return;
  state.value = "loading";
  try {
    const documents = await $fetch(`${config.app.baseURL}api/docs/search.json`);
    searchIndex = new MiniSearch(SEARCH_OPTIONS);
    searchIndex.addAll(documents);
    pages = new Map(documents.map((doc) => [doc.id, doc]));
    state.value = "ready";
  } catch {
    state.value = "failed";
  }
}

const matches = computed(() => {
  const text = query.value.trim();
  if (state.value !== "ready" || text.length < 2) return [];
  return searchIndex.search(text);
});

const results = computed(() =>
  matches.value.slice(0, MAX_RESULTS).map((match) => ({
    ...match,
    snippet: snippet(pages.get(match.id)?.text ?? "", match.terms),
  })),
);

const expanded = computed(() => !dismissed.value && results.value.length > 0);

// Screen readers hear the number of results once typing pauses, not on
// every key press.
let timer;
watch([query, matches, state], () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    const text = query.value.trim();
    if (state.value === "failed") {
      status.value = "Search isn't available just now.";
    } else if (text.length < 2 || state.value !== "ready") {
      status.value = "";
    } else if (!matches.value.length) {
      status.value = `No results for ${text}.`;
    } else {
      const total = matches.value.length;
      status.value =
        total > MAX_RESULTS
          ? `${total} results, showing the best ${MAX_RESULTS}.`
          : `${total} result${total === 1 ? "" : "s"}.`;
    }
  }, 500);
});
onBeforeUnmount(() => clearTimeout(timer));

function onInput() {
  active.value = -1;
  dismissed.value = false;
}

function open(result) {
  query.value = "";
  active.value = -1;
  navigateTo(result.url);
}

function onKeydown(event) {
  const count = results.value.length;
  if (event.key === "ArrowDown" && count) {
    event.preventDefault();
    dismissed.value = false;
    active.value = (active.value + 1) % count;
  } else if (event.key === "ArrowUp" && count) {
    event.preventDefault();
    dismissed.value = false;
    active.value = active.value <= 0 ? count - 1 : active.value - 1;
  } else if (event.key === "Enter" && expanded.value) {
    event.preventDefault();
    open(results.value[Math.max(active.value, 0)]);
  } else if (event.key === "Escape") {
    if (expanded.value) {
      // Close the results but keep the words. A second Escape clears them.
      event.preventDefault();
      dismissed.value = true;
      active.value = -1;
    } else {
      query.value = "";
    }
  }
}

function onFocusOut(event) {
  if (!event.currentTarget.contains(event.relatedTarget)) {
    dismissed.value = true;
    active.value = -1;
  }
}
</script>

<style lang="scss">
.docs-search {
  position: relative;
}

.docs-search-results {
  position: absolute;
  z-index: 1000;
  left: 0;
  right: 0;
  max-height: 70vh;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  box-shadow: 0 4px 10px 0 rgb(0 0 0 / 15%);

  .list-group-item {
    cursor: pointer;
  }

  .list-group-item.active mark {
    color: inherit;
    background-color: rgb(255 255 255 / 30%);
  }
}
</style>
