<template>
    <form class="hero-form">
        <div class="form-control flex">
            <input type="text" placeholder="you@example.com" v-model="name">
            <button type="submit" class="button primary">Sign Up</button>
        </div>
    </form>
</template>

<script>
export default {
    name: 'hero-join',
    data: () => ({
        name: null,
    }),
}
</script>
