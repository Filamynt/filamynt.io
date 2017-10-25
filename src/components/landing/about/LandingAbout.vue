<template>
    <div class="about-layout xl-p">
        <landing-about-item
            v-for="section in about"
            :key="section.id"
            :about="section">
        </landing-about-item>
    </div>
</template>

<script>
import about from '../../../resources/about'
import LandingAboutItem from './LandingAboutItem'

export default {
    name: 'landing-about',
    components: { LandingAboutItem },
    data: () => ({
        about,
    }),
}
</script>
