<template>
  <section id="contact" class="py-16 bg-gray-950">
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="text-3xl font-bold text-gray-100 mb-4">Contact</h2>
      <p v-if="alertMessage" aria-live="polite" class="mb-2 inline-block px-2.5 py-1 border rounded-sm text-white" :class="{ 'bg-green-700': alertState === 'success', 'bg-red-600': alertState === 'error' }">{{ alertMessage }}</p>
      <form ref="form" class="grid grid-cols-1 gap-6 max-w-xl" @submit.prevent="sendEmail">
        <input v-model="name" type="text" name="user_name" placeholder="name" required class="border border-gray-300 rounded-sm p-2" />
        <input v-model="email" type="email" name="user_email" placeholder="email" required class="border border-gray-300 rounded-sm p-2" />
        <textarea v-model="message" name="user_message" rows="4" placeholder="message" required class="border border-gray-300 rounded-sm p-2"></textarea>

        <button type="submit" class="p-2 rounded-sm border border-gray-600 text-sm font-medium transition focus:outline-none border-gray-600 text-gray-400">Send</button>
      </form>
    </div>
  </section>
</template>

<script>
import emailjs from '@emailjs/browser';

const emailService = process.env.VUE_APP_EMAIL_SERVICE;
const emailTemplate = process.env.VUE_APP_EMAIL_TEMPLATE;
const emailPublicKey = process.env.VUE_APP_EMAIL_PUBLICKEY;

export default {
  name: 'ContactSection',

  data() {
    return {
      email: '',
      name: '',
      message: '',
      alertState: '',
      alertMessage: '',
      emailService,
      emailTemplate,
      emailPublicKey,
    };
  },

  methods: {
    sendEmail() {
      emailjs
        .sendForm(this.emailService, this.emailTemplate, this.$refs.form, {
          publicKey: this.emailPublicKey,
        })
        .then(
          () => {
            this.alertState = 'success';
            this.alertMessage = 'Message sent successfully!';
            // reset the form fields
            this.email = '';
            this.name = '';
            this.message = '';
          },
          (error) => {
            this.alertState = 'error';
            this.alertMessage = `Failed to send message. Please try again later. ${error?.text}`;
          },
        );
    },
  },
}
</script>