<template>
    <div class="slide">
      <slot></slot>
    </div>
</template>

<script>
	export default {
		// eslint-disable-next-line vue/multi-word-component-names
		name: "Slide"
	}
</script>

<style scoped>
  .slide {
    width: 100%;
    flex-shrink: 0;
  }

  .slide img {
    width: 100%;
  }
</style>
