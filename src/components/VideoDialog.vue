<script setup>
import { ref, watch, nextTick, computed } from 'vue'
import { categoryLabel } from '@/data/categories'
import { formatMonthYear, getEmbedUrl } from '@/utils/video'

// Native <dialog> gives us focus trapping, Esc-to-close, an inert background
// and focus restoration to the triggering card for free.
const props = defineProps({
  project: { type: Object, default: null },
})

const emit = defineEmits(['close'])

const dialog = ref(null)
const embedUrl = computed(() => (props.project ? getEmbedUrl(props.project) : ''))

watch(
  () => props.project,
  async (project) => {
    await nextTick()
    if (project && !dialog.value.open) dialog.value.showModal()
    else if (!project && dialog.value.open) dialog.value.close()
  },
)

// Clicks on the ::backdrop target the <dialog> element itself
function onClick(event) {
  if (event.target === dialog.value) dialog.value.close()
}
</script>

<template>
  <dialog
    ref="dialog"
    class="m-auto w-[calc(100%-2rem)] max-w-4xl bg-transparent p-0 text-text backdrop:bg-black/90"
    aria-labelledby="video-dialog-title"
    @click="onClick"
    @close="emit('close')"
  >
    <!-- Iframe only exists while open, so playback stops on close -->
    <div v-if="project" class="rounded bg-raised p-3 sm:p-4">
      <div class="mb-3 flex items-start justify-between gap-4">
        <div>
          <h2 id="video-dialog-title" class="text-lg font-semibold leading-snug">{{ project.title }}</h2>
          <p class="mt-1 flex items-baseline gap-3 text-[0.82rem]">
            <span class="text-accent">{{ categoryLabel(project.category) }}</span>
            <time :datetime="project.date" class="font-mono text-[0.76rem] text-dim">
              {{ formatMonthYear(project.date) }}
            </time>
          </p>
        </div>
        <button
          type="button"
          class="-mr-1 -mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded text-dim transition-colors hover:bg-hairline hover:text-text"
          aria-label="Close video"
          autofocus
          @click="dialog.close()"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <div class="aspect-video w-full overflow-hidden rounded bg-bg">
        <iframe
          :src="embedUrl"
          :title="`Video player: ${project.title}`"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowfullscreen
          class="h-full w-full border-0"
        ></iframe>
      </div>

      <p v-if="project.desc" class="mt-4 max-w-prose text-sm leading-relaxed text-dim first-letter:uppercase">
        {{ project.desc }}
      </p>
    </div>
  </dialog>
</template>
