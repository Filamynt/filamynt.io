<template>
    <section class="hero-join card elevation-4 b-radius xl-p">
        <p class="lead l-m-b text-center">If you're interested in <span class="text-primary text-bold">Filamynt</span> and want to sign up for more information, give us your email and we will provide let you know when it's finished.</p>
        <form @submit.prevent="submit" class="hero-form" novalidate>
            <div class="form-control flex">
                <input id="text" type="email" class="l-g-b" placeholder="you@example.com" v-model="email">
                <button type="submit" class="button primary">Sign Up</button>
            </div>
        </form>

        <div class="well fixed-alert l-m-t bg-success l-p xl-p-l b-radius flex f-s-b f-v-c" v-if="submitted">
            <p class="text-white">Thanks for joining our newsletter, we'll be in touch!</p>
            <button class="button medium hallow text-white" @click="submitted = false">Close</button>
        </div>

        <div class="well fixed-alert l-m-t bg-error l-p xl-p-l b-radius flex j-c-s-b flex f-s-b f-v-c" v-if="error && !submitted">
            <p class="text-white">{{ error }}</p>
            <button class="button medium hallow text-white" @click="error = false">Close</button>
        </div>
    </section>
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
