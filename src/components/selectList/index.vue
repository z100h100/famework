<template>
  <div class="list">
    <div
      v-for="item in list"
      @click="searchValueHandle(item)"
    >{{item.person}}</div>
  </div>
</template>

<script>
export default {
  name: 'selectList',
  props: {
    list: {
      type: Array,
      required: true,
      default: []
    }
  },
  methods: {
    searchValueHandle (item) {
      this.$emit('value1', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.list>div {
  background: #ffffff;
  position: relative;
  width: 100%;
  z-index: 11;
  float: left;
  height: 22px;
  cursor: pointer;
  &:hover {
    background: #96d2ff;
  }
}
</style>
