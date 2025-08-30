<template>
  <div class="bg-gray-100 min-h-screen test-tailwind-class">
    <NavBar />
    <HeroSection />
    <AboutSection />
    <PortfolioSection />
    <ContactSection />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import PortfolioSection from './components/PortfolioSection.vue'
import ContactSection from './components/ContactSection.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    HeroSection,
    AboutSection,
    PortfolioSection,
    ContactSection
  }
}
</script>
