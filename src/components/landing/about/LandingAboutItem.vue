<template>
    <div class="card xl-p">
        <h2 class="header-secondary title-upper">{{ about.header }}</h2>
        <p>{{ about.body }}</p>
    </div>
</template>

<script>
export default {
    name: 'landing-about-item',
    props: {
        about: { type: Object, required: true },
    },
}
</script>
