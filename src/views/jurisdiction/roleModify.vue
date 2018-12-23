<template>
  <div class="app-container">
    <el-form :model="formInline" :rules="rules" ref="ruleForm" class="demo-form-inline" label-width="100px">
      <el-form-item label="用户名" prop="name">
        <el-input class="formInlineClass" v-model="formInline.name" placeholder="用户名"></el-input>
      </el-form-item>
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
          ]
        }
      }
    },
    mounted() {
      if (this.$route.query.id) {
        let params = {
          id: parseInt(this.$route.query.id)
        }
        this.getRoleAuthsList(params).then(res => {
          this.formInline.name = res.data.data.name
          this.actions = res.data.data.actions
          let actionList = res.data.data.actions.map(item => {
            if (item.parentId) {
              return item.id
            }
          })
          this.$refs.treeAuth.setCheckedKeys(actionList)
        })
      }
    },
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
              id: parseInt(this.$route.query.id),
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
