<template>
  <div class="app-container">
    <el-form :model="formInline" :rules="rules" ref="ruleForm" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-input class="formInlineClass" v-model="formInline.username" placeholder="用户名" disabled></el-input>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input class="formInlineClass" v-model="formInline.phone" placeholder="电话号码"></el-input>
      </el-form-item>
      <el-form-item label="角色">
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
            { required: true, message: '请选择用户名', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请选择电话号码', trigger: 'blur' }
          ]
        }
      }
    },
    mounted() {
      if (this.$route.query.id) {
        let params = {
          id: parseInt(this.$route.query.id)
        }
        this.getJustAuthsList(params).then(res => {
          this.formInline = res.data.data
          this.justRolesList = res.data.data.roles
        })
      }
    },
    computed: {
      ...mapState({
        justList: state => state.just.justModifyList.roles
      })
    },
    methods: {
      ...mapActions([
        'getJustAuthsList',
        'getJustAuthsModify'
      ]),
      onSubmit () {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            let params = Object.assign({}, this.formInline)
            this.getJustAuthsModify(params).then(res => {
              console.log(res)
            })
          } else {
            console.log('error submit!!');
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
