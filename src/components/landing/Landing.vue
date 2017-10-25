<template>
    <section class="landing-layout">
        <main-nav></main-nav>
        <hero></hero>
        <landing-about></landing-about>
        <landing-footer></landing-footer>
    </section>
</template>

<script>
import Hero from './hero/Hero'
import MainNav from '../../components/nav/MainNav'
import LandingAbout from './about/LandingAbout'
import LandingFooter from './footer/LandingFooter'

export default {
    components: { Hero, LandingAbout, LandingFooter, MainNav },
}
</script>

