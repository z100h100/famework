<template>
  <div class="app-wrapper" :class="classObj">
    <div class="side-logo" :class="{hideSidebar:!sidebar.opened}" @click="pushToIndex"></div>
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapGetters([
      'sidebar',
      'device'
    ]),
    classObj () {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    ...mapActions([
      'CloseSideBar'
    ]),
    pushToIndex () {
      this.$router.push('/')
    },
    handleClickOutside () {
      this.CloseSideBar({ withoutAnimation: false })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../styles/mixin";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
  .side-logo {
    cursor: pointer;
    transition: width 0.28s;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    height: 72px;
    width: 220px !important;
    overflow: hidden;
    z-index: 1001;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url("../../assets/images/logo-big.png") #016ad5 center no-repeat;
  }
  .side-logo.hideSidebar {
    transition: width 0.28s;
    width: 60px !important;
    background: url("../../assets/images/logo-small.png") #016ad5 center no-repeat;
  }
  .mobile{
    .side-logo.hideSidebar {
      display: none;
    }
  }
</style>
