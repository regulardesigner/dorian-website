<template>
  <section id="contact" class="wrap mt-24 scroll-mt-8" aria-labelledby="contact-heading">
    <div class="grid gap-10 border-t border-hairline pt-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
      <div>
        <h2 id="contact-heading" class="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight">
          Let’s work together
        </h2>
        <p class="mt-4 max-w-[38ch] leading-relaxed text-dim">
          Interviews, documentaries, brand spots or motion design — tell me about your project and
          I’ll get back to you shortly.
        </p>
      </div>

      <form ref="form" class="grid gap-5" @submit.prevent="sendEmail">
        <div class="grid gap-5 sm:grid-cols-2">
          <div class="grid gap-2">
            <label for="contact-name" class="text-sm text-dim">Name</label>
            <input id="contact-name" v-model.trim="name" type="text" name="user_name" autocomplete="name" required class="field" />
          </div>
          <div class="grid gap-2">
            <label for="contact-email" class="text-sm text-dim">Email</label>
            <input id="contact-email" v-model.trim="email" type="email" name="user_email" autocomplete="email" required class="field" />
          </div>
        </div>
        <div class="grid gap-2">
          <label for="contact-message" class="text-sm text-dim">Message</label>
          <textarea id="contact-message" v-model.trim="message" name="user_message" rows="5" required class="field resize-y"></textarea>
        </div>

        <div class="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            :disabled="status === 'sending'"
            class="rounded border border-accent-dim px-5 py-2.5 text-sm font-medium text-text transition-colors hover:border-accent hover:bg-accent/10 disabled:cursor-wait disabled:opacity-60"
          >
            {{ status === 'sending' ? 'Sending…' : 'Send message' }}
          </button>

          <!-- Always rendered so screen readers pick up changes -->
          <p
            role="status"
            class="text-sm"
            :class="status === 'error' ? 'text-red-400' : 'text-dim'"
          >
            {{ statusMessage }}
          </p>
        </div>
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
      status: 'idle', // idle | sending | success | error
      statusMessage: '',
    };
  },

  methods: {
    sendEmail() {
      this.status = 'sending';
      this.statusMessage = '';

      emailjs
        .sendForm(emailService, emailTemplate, this.$refs.form, { publicKey: emailPublicKey })
        .then(
          () => {
            this.status = 'success';
            this.statusMessage = 'Thanks — your message has been sent.';
            this.email = '';
            this.name = '';
            this.message = '';
          },
          (error) => {
            // EmailJS rejects with { status, text }; keep the detail for debugging
            console.error('EmailJS send failed:', error?.status, error?.text ?? error);
            this.status = 'error';
            this.statusMessage = 'Something went wrong. Please try again in a moment.';
          },
        );
    },
  },
}
</script>

<style scoped>
.field {
  @apply w-full rounded border border-hairline-strong bg-raised px-3 py-2.5 text-text transition-colors;
}
.field:hover {
  @apply border-faint;
}
.field:focus-visible {
  @apply border-accent outline-none;
}
</style>
