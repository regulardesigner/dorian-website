<script setup>
import { computed } from 'vue'
import { categoryLabel } from '@/data/categories'
import { formatMonthYear, getThumbnail } from '@/utils/video'

const props = defineProps({
  project: { type: Object, required: true },
})

const emit = defineEmits(['play'])

const thumbnail = computed(() => getThumbnail(props.project))
</script>

<template>
  <!-- Whole card is clickable via the title button's stretched ::after;
       the heading stays a real heading for screen-reader navigation. -->
  <article class="group relative bg-bg pb-7 outline outline-1 outline-hairline">
    <div class="relative aspect-video overflow-hidden bg-raised">
      <img
        :src="thumbnail"
        alt=""
        width="480"
        height="270"
        loading="lazy"
        decoding="async"
        class="h-full w-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.045] motion-reduce:transition-none"
      />
      <!-- film-grain texture -->
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.035)_1px,transparent_0)] bg-[length:3px_3px]"></div>
      <div
        class="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-transparent from-55% to-bg/55 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none"
        aria-hidden="true"
      >
        <svg class="drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]" width="40" height="40" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="19" fill="rgba(11,12,14,0.5)" stroke="rgba(255,255,255,0.35)" />
          <path d="M16 13l12 7-12 7z" fill="currentColor" />
        </svg>
      </div>
    </div>

    <div class="px-0.5 pt-[1.1rem]">
      <h3 class="mb-2 text-[1.05rem] font-semibold leading-snug tracking-[-0.005em]">
        <button
          type="button"
          class="text-left after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-accent"
          @click="emit('play', project)"
        >
          {{ project.title }}
          <span class="sr-only">— play video</span>
        </button>
      </h3>
      <p class="flex items-baseline gap-3 text-[0.82rem]">
        <span class="text-accent">{{ categoryLabel(project.category) }}</span>
        <time :datetime="project.date" class="font-mono text-[0.76rem] text-dim">
          {{ formatMonthYear(project.date) }}
        </time>
      </p>
    </div>
  </article>
</template>
