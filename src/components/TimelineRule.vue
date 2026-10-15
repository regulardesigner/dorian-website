<script setup>
// Decorative separator styled like an NLE timeline track.
// 4n + 1 ticks so the rule starts and ends on a major tick (major, 3 minor, major…)
const TICKS = 25
</script>

<template>
  <div class="relative mb-[3.25rem] mt-11 h-[34px]" aria-hidden="true">
    <div class="absolute inset-x-0 top-1/2 h-px bg-hairline-strong"></div>
    <div class="absolute inset-0 flex items-center justify-between">
      <span
        v-for="n in TICKS"
        :key="n"
        class="w-px"
        :class="(n - 1) % 4 === 0 ? 'h-3.5 bg-faint' : 'h-2 bg-hairline-strong'"
      ></span>
    </div>
  </div>
</template>
