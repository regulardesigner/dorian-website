<script setup>
import { ref, computed } from "vue"
import projects from "@/data/projects.json"

// --- données ---
const videos = ref(projects)

const categories = ["all", ...new Set(videos.value.map(v => v.category))]
const selectedCategory = ref("all")
const sortOrder = ref("desc")

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

// --- fonction pour extraire l'ID YouTube ---
function getYoutubeId(url) {
  if (Array.isArray(url)) url = url[0] // si plusieurs liens, prendre le premier
  if (typeof url !== "string") return null
  const regExp =
    /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[1].length === 11 ? match[1] : null
}
</script>

<template>
  <div class="p-6 max-w-6xl mx-auto">
    <!-- filtres -->
    <div class="flex flex-wrap gap-3 mb-6 items-center">
      <button
        v-for="cat in categories"
        :key="cat"
        @click="selectedCategory = cat"
        class="px-4 py-2 rounded-full border text-sm font-medium transition
               hover:bg-blue-100 hover:text-blue-700"
        :class="{
          'bg-blue-600 text-white border-blue-600': selectedCategory === cat,
          'border-gray-300 text-gray-600': selectedCategory !== cat
        }"
      >
        {{ cat.charAt(0).toUpperCase() + cat.slice(1) }}
      </button>

      <div class="ml-auto">
        <button
          @click="sortOrder = sortOrder === 'desc' ? 'asc' : 'desc'"
          class="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
        >
          Sort: {{ sortOrder === "desc" ? "Newest first" : "Oldest first" }}
        </button>
      </div>
    </div>

    <!-- liste vidéos -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="video in filteredVideos"
        :key="video.title + video.date"
        class="border rounded-2xl shadow-sm hover:shadow-md transition bg-white overflow-hidden flex flex-col"
      >
        <!-- lecteur YouTube -->
        <div class="w-full aspect-video">
          <iframe
            v-if="getYoutubeId(video.link)"
            :src="`https://www.youtube.com/embed/${getYoutubeId(video.link)}`"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="w-full h-full"
          ></iframe>
        </div>

        <!-- contenu -->
        <div class="p-4 flex flex-col flex-grow">
          <h2 class="text-lg font-semibold mb-1">{{ video.title }}</h2>
          <p class="text-xs text-gray-500 mb-2">
            {{ video.category }} • {{ video.date }}
          </p>
          <p class="text-sm text-gray-700 mb-4 flex-grow">{{ video.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
