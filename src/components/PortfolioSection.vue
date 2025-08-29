<template>
  <section id="portfolio" class="py-16 bg-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-gray-900 mb-8">Portfolio</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="n in 6" :key="n" class="bg-white rounded-lg shadow h-48 flex items-center justify-center text-gray-500">
          Vidéo {{ n }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PortfolioSection'
}
</script>

<style scoped>
</style>

