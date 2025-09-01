<template>
  <section id="contact" class="py-16 bg-white">
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">Contact</h2>
      <p v-if="alertMessage" class="mb-2 inline-block px-2.5 py-1 border rounded-md text-white" :class="{ 'bg-green-700': alertState === 'success', 'bg-red-600': alertState === 'error' }">{{ alertMessage }}</p>
      <form ref="form" class="grid grid-cols-1 gap-6 max-w-xl" @submit.prevent="sendEmail">
        <input v-model="name" type="text" name="user_name" placeholder="Nom" class="border border-gray-300 rounded-md p-2" />
        <input v-model="email" type="email" name="user_email" placeholder="Email" class="border border-gray-300 rounded-md p-2" />
        <textarea v-model="message" name="user_message" rows="4" placeholder="Message" class="border border-gray-300 rounded-md p-2"></textarea>
        <button type="submit" class="bg-indigo-600 text-white py-2 px-4 rounded-md">Envoyer</button>
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
            console.log('SUCCESS!');
            this.alertState = 'success';
            this.alertMessage = 'Message sent successfully!';
            this.$refs.form.reset();
          },
          (error) => {
            console.log('FAILED...', error.text);
            this.alertState = 'error';
            this.alertMessage = 'Failed to send message. Please try again later.';
          },
        );
    },
  },
}
</script>