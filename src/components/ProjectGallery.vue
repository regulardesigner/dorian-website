<script setup>
import { ref, computed, watch } from 'vue'
import projects from '@/data/projects.json'
import { CATEGORIES } from '@/data/categories'
import { projectKey } from '@/utils/video'
import ProjectCard from './ProjectCard.vue'
import VideoDialog from './VideoDialog.vue'

const ALL = 'all'
const SORT_OPTIONS = [
  { id: 'desc', label: 'Newest first' },
  { id: 'asc', label: 'Oldest first' },
]

// Only offer filters that actually have projects, with counts for scent
const filters = computed(() => [
  { id: ALL, label: 'All', count: projects.length },
  ...CATEGORIES.map((c) => ({
    ...c,
    count: projects.filter((p) => p.category === c.id).length,
  })).filter((c) => c.count > 0),
])

// Filter state is mirrored to ?category= so filtered views are shareable
const params = new URLSearchParams(window.location.search)
const initialCategory = params.get('category')
const selectedCategory = ref(
  filters.value.some((f) => f.id === initialCategory) ? initialCategory : ALL,
)
const sortOrder = ref('desc')
const activeProject = ref(null)

watch(selectedCategory, (category) => {
  const url = new URL(window.location.href)
  if (category === ALL) url.searchParams.delete('category')
  else url.searchParams.set('category', category)
  window.history.replaceState(null, '', url)
})

// ISO dates sort correctly as strings
const visibleProjects = computed(() => {
  const list = selectedCategory.value === ALL
    ? [...projects]
    : projects.filter((p) => p.category === selectedCategory.value)
  const direction = sortOrder.value === 'asc' ? 1 : -1
  return list.sort((a, b) => a.date.localeCompare(b.date) * direction)
})

const resultsSummary = computed(() => {
  const n = visibleProjects.value.length
  const label = filters.value.find((f) => f.id === selectedCategory.value)?.label
  const scope = selectedCategory.value === ALL ? '' : ` in ${label}`
  return `${n} ${n === 1 ? 'project' : 'projects'}${scope}`
})
</script>

<template>
  <section id="work" class="wrap" aria-labelledby="work-heading">
    <h2 id="work-heading" class="sr-only">Selected work</h2>

    <div class="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-hairline">
      <div
        class="-mb-px flex flex-wrap gap-x-7"
        role="group"
        aria-label="Filter projects by category"
      >
        <button
          v-for="filter in filters"
          :key="filter.id"
          type="button"
          class="relative whitespace-nowrap pb-3.5 pt-2 text-[0.92rem] text-dim transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-accent after:opacity-0 hover:text-text aria-pressed:text-text aria-pressed:after:opacity-100"
          :aria-pressed="selectedCategory === filter.id"
          @click="selectedCategory = filter.id"
        >
          {{ filter.label }}
          <span class="ml-1 font-mono text-[0.7rem] text-dim">{{ filter.count }}</span>
        </button>
      </div>

      <label class="flex items-center gap-2 pb-3.5 font-mono text-[0.85rem] text-dim">
        <span class="sr-only">Sort projects</span>
        <select
          v-model="sortOrder"
          class="cursor-pointer rounded bg-transparent py-1 pr-1 text-dim transition-colors hover:text-text"
        >
          <option v-for="opt in SORT_OPTIONS" :key="opt.id" :value="opt.id" class="bg-raised text-text">
            {{ opt.label }}
          </option>
        </select>
      </label>
    </div>

    <p class="sr-only" aria-live="polite">{{ resultsSummary }}</p>

    <!-- overflow-hidden clips the cards' outer outlines so only inner hairlines remain -->
    <div class="mt-px grid grid-cols-1 gap-px overflow-hidden min-[561px]:grid-cols-2 min-[901px]:grid-cols-3">
      <ProjectCard
        v-for="project in visibleProjects"
        :key="projectKey(project)"
        :project="project"
        @play="activeProject = $event"
      />
    </div>

    <VideoDialog :project="activeProject" @close="activeProject = null" />
  </section>
</template>
