<script setup>
import { ref } from 'vue'
import { getEmbedUrl, getYoutubeId } from '@/utils/video'

const SHOWREEL = {
  title: 'Showreel 2026',
  link: 'https://youtu.be/PyqAmVDgmzM',
}

const poster = `https://i.ytimg.com/vi/${getYoutubeId(SHOWREEL.link)}/maxresdefault.jpg`
const embedUrl = getEmbedUrl(SHOWREEL)

// Facade: the YouTube iframe (~1 MB of JS) only loads once the visitor asks for it
const playing = ref(false)
</script>

<template>
  <section class="wrap mb-14 sm:mb-20" aria-labelledby="showreel-heading">
    <h2 id="showreel-heading" class="mb-4 font-mono text-[0.76rem] uppercase tracking-[0.12em] text-dim">
      {{ SHOWREEL.title }}
    </h2>

    <div class="group relative aspect-video overflow-hidden rounded bg-raised">
      <iframe
        v-if="playing"
        :src="embedUrl"
        :title="`Video player: ${SHOWREEL.title}`"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowfullscreen
        class="h-full w-full border-0"
      ></iframe>

      <button
        v-else
        type="button"
        class="absolute inset-0 h-full w-full focus-visible:outline-none focus-visible:after:absolute focus-visible:after:inset-0 focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-accent"
        @click="playing = true"
      >
        <img
          :src="poster"
          alt=""
          width="1280"
          height="720"
          fetchpriority="high"
          decoding="async"
          class="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.02] motion-reduce:transition-none"
        />
        <!-- film-grain texture, matching the project cards -->
        <span class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.035)_1px,transparent_0)] bg-[length:3px_3px]" aria-hidden="true"></span>
        <span class="absolute inset-0 bg-gradient-to-b from-transparent from-50% to-bg/60" aria-hidden="true"></span>

        <span class="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <svg
            class="h-16 w-16 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-out-expo group-hover:scale-110 motion-reduce:transition-none sm:h-20 sm:w-20"
            viewBox="0 0 40 40"
          >
            <circle cx="20" cy="20" r="19" fill="rgba(11,12,14,0.5)" stroke="rgba(255,255,255,0.4)" />
            <path d="M16 13l12 7-12 7z" fill="currentColor" />
          </svg>
        </span>

        <span class="absolute bottom-4 left-4 flex items-center gap-2 text-sm text-text sm:bottom-6 sm:left-6">
          <span class="h-[7px] w-[7px] rounded-full bg-accent" aria-hidden="true"></span>
          Play showreel
        </span>
      </button>
    </div>
  </section>
</template>
