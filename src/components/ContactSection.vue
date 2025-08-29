<template>
  <section id="contact" class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">Contact</h2>
      <form class="grid grid-cols-1 gap-6 max-w-xl">
        <input type="text" placeholder="Nom" class="border border-gray-300 rounded-md p-2" />
        <input type="email" placeholder="Email" class="border border-gray-300 rounded-md p-2" />
        <textarea rows="4" placeholder="Message" class="border border-gray-300 rounded-md p-2"></textarea>
        <button type="submit" class="bg-indigo-600 text-white py-2 px-4 rounded-md">Envoyer</button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ContactSection'
}
</script>

<style scoped>
</style>

