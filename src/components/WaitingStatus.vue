<template>
  <div class="waiting-status">
    <div class="spinner-icon">
      <div class="spinner-border" role="status"></div>
    </div>
    <div class="waiting-msg">
      <span><slot></slot></span>
    </div>
  </div>
</template>

<script>
export default {
    name: 'waiting-status'
}
</script>

<style lang="scss" scoped>

</style>

