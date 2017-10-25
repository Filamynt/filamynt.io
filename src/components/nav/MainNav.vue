<template>
    <nav class="main-nav flex f-v-c xl-p">
        <router-link to="/" class="logo">
            <logo style="width: 200px;"></logo>
        </router-link>
        <!-- <div class="f-m-l-a">
            <router-link active-class="active" :to="{ name: 'case-studies' }" class="title-upper">About</router-link>
            <router-link active-class="active" :to="{ name: 'case-studies' }" class="title-upper">Contribute</router-link>
            <router-link active-class="active" :to="{ name: 'job-board' }" class="title-upper featured m-p b-radius">Sign Up</router-link>
        </div> -->
    </nav>
</template>

<script>
import Logo from '../../assets/Logo'

export default {
    components: { Logo },
}
</script>
