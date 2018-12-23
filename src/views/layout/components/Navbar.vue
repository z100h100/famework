<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <el-button type="primary" class="navbarButton" @click.stop.prevent="pushToOrderAdd">创建运单</el-button>
        {{UserToken.username}}
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            Home
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">LogOut</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import avatarDefault from '@/assets/images/avtor.png'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  data () {
    return {
      avatarDefault
    }
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapState({
      UserToken: state => state.user.UserToken
    }),
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    ...mapActions([
      'ToggleSideBar', 'LogOut'
    ]),
    toggleSideBar () {
      this.ToggleSideBar()
    },
    pushToOrderAdd () {
      // console.log(1)
      this.$router.push('/order/orderAdd')
    },
    logout () {
      this.LogOut().then(() => {
        location.reload() // 为了重新实例化vue-router对象
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0 !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      display: flex;
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .navbarButton {
        width: 100px;
        height: 40px;
        margin-right: 10px;
      }
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 20px;
        font-size: 12px;
      }
    }
  }
}
</style>

