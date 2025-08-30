<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue"
import projects from "@/data/projects.json"

// données
const videos = ref(projects)

// catégories
const categories = ["all", ...new Set(videos.value.map(v => v.category))]
const selectedCategory = ref("all")
const sortOrder = ref("desc")

// lightbox state
const activeVideo = ref(null) // video sélectionnée pour le player

// filtrage + tri
const filteredVideos = computed(() => {
  let list = [...videos.value]

  if (selectedCategory.value !== "all") {
    list = list.filter(v => v.category === selectedCategory.value)
  }

  list.sort((a, b) => {
    const da = new Date(a.date)
    const db = new Date(b.date)
    return sortOrder.value === "asc" ? da - db : db - da
  })

  return list
})

// --- fonctions YouTube ---
function getYoutubeId(url) {
  if (Array.isArray(url)) url = url[0]
  if (typeof url !== "string") return null
  const regExp =
    /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[1].length === 11 ? match[1] : null
}

function getYoutubeThumbnail(url) {
  const id = getYoutubeId(url)
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : ""
}

// ouvrir/fermer lightbox
function openPlayer(video) {
  activeVideo.value = video
}

function closePlayer() {
  activeVideo.value = null
}

// --- fermer avec Esc ---
function handleKeydown(e) {
  if (e.key === "Escape" && activeVideo.value) {
    closePlayer()
  }
}

function toggleCategory(cat) {
  if (selectedCategory.value === cat) {
    selectedCategory.value = "all"
  } else {
    selectedCategory.value = cat
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown)
})
</script>

<template>
  <div class="p-6 max-w-6xl mx-auto">
    <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
  <h1 class="text-3xl md:text-4xl font-bold text-gray-500">
    Dorian Tailhades - Videofolio
  </h1>
  <a href="tel:+1234567890"
     class="w-full md:w-auto px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition text-center"
  >
    🤙 Available for Hire
  </a>
</div>

<!-- barre de filtres -->
<div class="flex flex-wrap gap-3 mt-4 mb-6 items-center">
  <button
    v-for="cat in categories"
    :key="cat"
    @click="toggleCategory(cat)"
    class="px-4 py-2 rounded-full border text-sm font-medium transition hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    :class="{
      'bg-blue-600 text-white border-blue-600': selectedCategory === cat,
      'border-gray-300 text-gray-600': selectedCategory !== cat
    }"
  >
    {{ cat.charAt(0).toUpperCase() + cat.slice(1) }}
  </button>

  <div class="ml-auto hidden md:block">
    <button
      @click="sortOrder = sortOrder === 'desc' ? 'asc' : 'desc'"
      class="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
    >
      Sort: {{ sortOrder === "desc" ? "Newest first" : "Oldest first" }}
    </button>
  </div>
</div>

    <!-- video cards -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(video, index) in filteredVideos"
        :key="index"
        class="border rounded-md shadow-sm hover:shadow-md transition bg-white overflow-hidden cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-500"
        @click="openPlayer(video)"
        tabindex="0"
        @keydown.enter.prevent="openPlayer(video)"
        @keydown.space.prevent="openPlayer(video)"
      >
        <img
          :src="getYoutubeThumbnail(video.link)"
          :alt="video.title"
          class="w-full aspect-video object-cover"
        />
        <div class="p-4">
          <h2 class="text-lg font-semibold mb-1">{{ video.title }}</h2>
          <p class="text-xs text-gray-500 mb-1"><span class="font-medium capitalize text-white bg-blue-600 px-1 rounded-sm">{{ video.category }}</span> {{ video.date }}</p>
          <p class="text-sm text-gray-700">{{ video.desc }}</p>
        </div>
      </div>
    </div>

    <!-- lightbox -->
    <div
      v-if="activeVideo"
      class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
      @click="closePlayer"
    >
      <div class="relative w-full max-w-4xl">
        <button
          @click="closePlayer"
          class="absolute top-2 right-2 text-white text-2xl font-bold hover:text-gray-300"
          aria-label="Close player"
        >
          ×
        </button>
        <div class="w-full aspect-video">
          <iframe
            :src="`https://www.youtube.com/embed/${getYoutubeId(activeVideo.link)}?autoplay=1`"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="w-full h-full rounded-xl"
          ></iframe>
        </div>
        <h2 class="text-white text-lg font-semibold mt-4">{{ activeVideo.title }}</h2>
      </div>
    </div>
    <footer class="mt-6">
      <p class="text-center text-gray-500 text-sm">©2018-{{ new Date().getFullYear() }} Dorian Tailhades. All rights reserved.</p>
    </footer>
  </div>
</template>
