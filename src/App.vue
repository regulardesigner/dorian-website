<template>
  <div id="top" class="min-h-screen">
    <a
      href="#work"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-bg"
    >
      Skip to work
    </a>
    <SiteHeader />
    <main>
      <ProjectGallery />
      <ContactSection />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup>
import SiteHeader from './components/SiteHeader.vue'
import ProjectGallery from './components/ProjectGallery.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>
