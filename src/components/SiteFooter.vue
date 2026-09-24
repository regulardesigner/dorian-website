<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="wrap mt-24 pb-10">
    <div class="flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-6 text-sm text-dim">
      <p>© 2018–{{ year }} Dorian Tailhades</p>
      <a href="#top" class="rounded transition-colors hover:text-text">Back to top ↑</a>
    </div>
  </footer>
</template>
