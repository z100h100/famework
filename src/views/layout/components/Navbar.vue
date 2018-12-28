<template>
  <el-menu class="navbar aside__top" mode="horizontal">
    <hamburger
      class="hamburger-container"
      :toggleClick="toggleSideBar"
      :isActive="sidebar.opened">
    </hamburger>
    <breadcrumb></breadcrumb>

    <div class="aside__top--right">
      <div class="email">
        <span class="user-msg" @click.stop.prevent="pushToOrderAdd">
          创建订单
        </span>
      </div>
      <div class="user-msg">
        <!--<img class="user-img" :src="require('@/assets/image/a.png')" alt="">-->
        <span class="user-name">{{UserToken.username}}</span>
        <el-dropdown trigger="click" placement="top" @command="handleCommand">
          <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">修改密码</el-dropdown-item>
            <el-dropdown-item command="b">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!--<el-dropdown class="avatar-container" trigger="click">-->
      <!--<div class="avatar-wrapper">-->
        <!--<el-button type="primary" class="navbarButton" @click.stop.prevent="pushToOrderAdd">创建运单</el-button>-->
        <!--{{UserToken.username}}-->
        <!--<i class="el-icon-caret-bottom"></i>-->
      <!--</div>-->
      <!--<el-dropdown-menu class="user-dropdown" slot="dropdown">-->
        <!--&lt;!&ndash;<router-link class="inlineBlock" to="/">&ndash;&gt;-->
          <!--&lt;!&ndash;<el-dropdown-item>&ndash;&gt;-->
            <!--&lt;!&ndash;Home&ndash;&gt;-->
          <!--&lt;!&ndash;</el-dropdown-item>&ndash;&gt;-->
        <!--&lt;!&ndash;</router-link>&ndash;&gt;-->
        <!--<el-dropdown-item>-->
          <!--<span @click="logout" style="display:block;">退出登录</span>-->
        <!--</el-dropdown-item>-->
      <!--</el-dropdown-menu>-->
    <!--</el-dropdown>-->
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose">
      <template>
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" autocomplete="off" style="width: 150px"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off" style="width: 150px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">保存</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </template>
    </el-dialog>
  </el-menu>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import avatarDefault from '@/assets/images/avtor.png'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm2: {
        pass: '',
        checkPass: ''
      },
      dialogVisible: false,
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
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
      'ToggleSideBar', 'LogOut', 'getDelJust'
    ]),
    handleClose () {
      this.dialogVisible = false
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            ...this.UserToken.user,
            password: this.ruleForm2.pass
          }
          this.getDelJust(params).then(() => {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.dialogVisible = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleCommand (command) {
      if (command === 'a') {
        console.log(this.UserToken)
        this.dialogVisible = true
        // this.getDelJust().then(res => {
        //
        // })
      } else {
        // 退出接口
        this.logout()
      }
    },
    toggleSideBar () {
      this.ToggleSideBar()
    },
    pushToOrderAdd () {
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
  .aside__top--right {
    position: absolute;
    right: 10px;
    top: -1px;
    bottom: 0;
    > div {
      position: relative;
      display: inline-block;
      text-align: center;
      vertical-align: middle;
      margin-left: 10px;
      padding: 0 15px;
      cursor: pointer;
      &:hover::after {
        transform-origin: 0 0;
        transform: scaleX(1);
      }
      &:first-child:before {
        border: none;
      }
      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        background: #ef4747;
        transform: scaleX(0);
        transform-origin: right 0;
        transition: transform 0.5s;
      }
      &::before {
        content: '';
        position: absolute;
        height: 20px;
        top: 50%;
        left: -8px;
        margin-top: -10px;
        border-left: 1px solid #ccc;
      }
      &.email {
        i {
          position: absolute;
          left: 18px;
          top: -12px;
          border-radius: 20px;
          background: red;
          color: #fff;
          text-align: center;
          font-size: 12px;
          line-height: 1.5;
          min-width: 20px;
          min-height: 20px;
        }
      }
      &.user-msg {
        .user-img {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          vertical-align: middle;
        }
        .user-name {
          font-size: 14px;
          color: #758eb5;
          padding: 0 4px;
        }
      }
      .iconfont {
        position: relative;
        font-size: 24px;
        color: #758eb5;
      }
    }
  }
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

