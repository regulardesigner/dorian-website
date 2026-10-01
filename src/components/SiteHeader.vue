<script setup>
import TimelineRule from './TimelineRule.vue'
</script>

<template>
  <header class="wrap pt-12 sm:pt-[4.5rem]">
    <div class="flex flex-wrap items-start justify-between gap-8">
      <div>
        <h1 class="font-display mb-3.5 text-[clamp(2.4rem,6vw,4.4rem)] leading-[0.98] tracking-[-0.01em]">
          Dorian Tailhades
        </h1>
        <p class="m-0 max-w-[46ch] text-[1.05rem] leading-normal text-dim">
          <strong class="font-medium text-text">Video editor &amp; cinematographer</strong>
          — camera, sound, color grading, and 3D/motion graphics, across corporate interviews,
          documentaries, and self-produced spots.
        </p>
        <p class="mt-2.5 flex items-center gap-1.5 text-sm text-dim">
          <svg class="h-[15px] w-[15px] shrink-0 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          Based in Paris
        </p>
      </div>

      <!-- Availability doubles as the primary call to action -->
      <a
        href="#contact"
        class="group flex items-center gap-2 whitespace-nowrap rounded pt-2.5 text-sm text-dim transition-colors hover:text-text"
      >
        <span class="h-[7px] w-[7px] shrink-0 rounded-full bg-accent shadow-[0_0_0_3px_rgb(var(--accent)/0.14)]" aria-hidden="true"></span>
        Available for new projects
        <span class="text-accent transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true">→</span>
      </a>
    </div>

    <TimelineRule />
  </header>
</template>
