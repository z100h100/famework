<template>
  <div class="index_banner">
    <img src="@/assets/images/index_banner.png" alt=""/>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .index_banner {
    width: 100%;
    height: 100%;
    margin-top: 30px;
    text-align: center;
    /*display: flex;*/
    /*justify-content: flex-start;*/

    > img {
      min-width: 1225px;
    }
  }
</style>
