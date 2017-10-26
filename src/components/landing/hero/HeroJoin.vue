<template>
    <div v-if="submitted">
      <p>Thanks, we'll be in touch!</p>
    </div>
    <form v-else @submit.prevent="submit" class="hero-form" novalidate>
        <div class="form-control flex">
            <input id="text" type="email" placeholder="you@example.com" v-model="email">
            <button type="submit" class="button primary">Sign Up</button>
            <small v-if="error">{{ error }}</small>
        </div>
    </form>
</template>

<script>
import axios from 'axios'

export default {
    name: 'hero-join',
    data() {
        return {
            email: null,
            submitted: false,
            error: null,
        }
    },
    methods: {
        submit() {
            console.log(this.email)
            axios.post('/subscribe', { email: this.email })
              .then(() => {
                  this.submitted = true;
              })
              .catch((error) => {
                  this.error = error.response.data.error
              })
        },
    },
}
</script>
