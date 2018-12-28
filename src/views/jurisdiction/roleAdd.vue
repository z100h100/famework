<template>
  <div class="app-container">
    <el-form :model="formInline" :rules="rules" ref="ruleForm" class="demo-form-inline" label-width="100px">
      <el-form-item label="角色名" prop="name">
        <el-input class="formInlineClass" v-model="formInline.name" placeholder="用户名"></el-input>
      </el-form-item>
      <!--<el-form-item label="密码" prop="password">-->
        <!--<el-input class="formInlineClass" v-model="formInline.password" placeholder="密码"></el-input>-->
      <!--</el-form-item>-->
      <el-form-item label="权限" prop="username">
        <el-tree
          ref="treeAuth"
          :data="SETMENU"
          :props="defaultProps"
          default-expand-all
          highlight-current
          show-checkbox
          node-key="id">
        </el-tree>
      </el-form-item>
    </el-form>

    <el-button type="primary" icon="el-icon-search" @click="onSubmit">保存</el-button>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  export default {
    data() {
      var validateTreeAuth = (rule, value, callback) => {
        let aa = this.$refs.treeAuth.getCheckedKeys().concat(this.$refs.treeAuth.getHalfCheckedKeys())
        if (aa.length == 0) {
          callback(new Error('请选择权限'))
        } else {
          callback()
        }
      }
      return {
        actions: [],
        formInline: {
          name: ''
        },
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          // password: [
          //   { required: true, message: '请输入密码', trigger: 'blur' }
          // ],
          username: [
            { required: true, validator: validateTreeAuth, trigger: 'change' }
          ]
        }
      }
    },
    mounted() {},
    computed: {
      ...mapState({
        SETMENU: state => state.user.currentSign
      })
    },
    methods: {
      ...mapActions([
        'getRoleAuthsList',
        'getRoleAuthsSave'
      ]),
      onSubmit () {
        this.getCheckedKeys()
      },
      getCheckedKeys () {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            let params = {
              // id: parseInt(this.$route.query.id),
              ...this.formInline,
              actions: []
            }
            let authsActions = this.$refs.treeAuth.getCheckedKeys().concat(this.$refs.treeAuth.getHalfCheckedKeys())
            params.actions = authsActions.map(item => {
              return {
                id: item
              }
            })
            this.getRoleAuthsSave(params).then(res => {
              this.$message({
                type: 'success',
                message: '保存成功'
              })
              this.$router.push({name: 'roleList'})
            })
          }
        })
      },
      setCheckedKeys() {
        this.$refs.treeAuth.setCheckedKeys(['Auths_justList'])
      }
    }
  }
</script>

<style>
  .blk_border {
    border: 1px solid #d1dbe5;
    padding-bottom: 15px;
  }

  .blk_border ul {
    padding-left: 15px;
  }

  ul {
    list-style: none;
  }

  i.icon {
    display: inline-block;
    width: 15px;
    height: 15px;
    background-repeat: no-repeat;
    vertical-align: middle;
  }

  .tree-menu li {
    line-height: 1.5;
  }

  li.btnCls {
    float: left;
    margin-right: 10px;
  }

  li.menuCls {
    clear: both;
    line-height: 30px;
  }

  .checkCls {
    vertical-align: middle;
  }

  .el-tabs__content {
    color: #48576A;
  }
</style>
