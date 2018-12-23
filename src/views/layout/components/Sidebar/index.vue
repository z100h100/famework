<template>
    <el-scrollbar wrapClass="scrollbar-wrapper">
      <el-menu
        mode="vertical"
        :collapse="isCollapse"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        :default-active="currentMenu">
        <sidebar-item :routes="sidebarMenu"></sidebar-item>
        {{sidebarMenu}}
      </el-menu>
    </el-scrollbar>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    ...mapState({
      sidebarMenu: (state) => state.user.sidebarMenu,
      currentMenu: (state) => state.user.currentMenu
    }),
    isCollapse () {
      return !this.sidebar.opened
    }
  }
}
</script>
