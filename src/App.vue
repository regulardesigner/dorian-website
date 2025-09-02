<template>
  <div class="bg-gray-950 min-h-screen test-tailwind-class">
    <PortolioLightBox />
    <ContactSection />
  </div>
</template>

<script>
import ContactSection from './components/ContactSection.vue';
import PortolioLightBox from './components/PortolioLightBox.vue'

export default {
  name: 'App',
  components: {
    PortolioLightBox,
    ContactSection,
  }
}
</script>
