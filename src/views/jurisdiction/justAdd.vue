<template>
  <div class="app-container">
    <el-form :model="formInline" :rules="rules" ref="ruleForm" class="demo-form-inline" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input class="formInlineClass" v-model="formInline.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input class="formInlineClass" v-model="formInline.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop="phone">
        <el-input class="formInlineClass" v-model="formInline.phone" placeholder="电话号码"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="roles">
        <el-checkbox-group v-model="formInline.roles" size="medium">
          <el-checkbox v-for="role in justRolesList" :label="role" :key="role.id">{{role.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <el-button type="primary" icon="el-icon-search" @click="onSubmit">保存</el-button>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'

  export default {
    data() {
      return {
        justRolesList: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        formInline: {
          username: '',
          phone: '',
          roles: []
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入电话号码', trigger: 'blur' }
          ],
          roles: [
            { required: true, message: '请选择角色', trigger: 'change' }
          ]
        }
      }
    },
    mounted() {
      this.getAllRole().then(res => {
        this.justRolesList = res.data.data
      })
    },
    computed: {
      ...mapState({
        justList: state => state.just.justModifyList.roles
      })
    },
    methods: {
      ...mapActions([
        'getAllRole',
        'getJustAuthsAdd'
      ]),
      onSubmit () {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            let params = Object.assign({}, this.formInline)
            this.getJustAuthsAdd(params).then(res => {
              // console.log(res)
            })
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
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
