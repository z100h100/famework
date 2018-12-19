<template>
  <div class="app-container">
    <el-tree
      ref="treeAuth"
      :data="data2"
      :props="defaultProps"
      default-expand-all
      highlight-current
      show-checkbox
      node-key="key">
    </el-tree>
    <el-button type="primary" icon="el-icon-search" @click="onSubmit">保存</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    mounted() {
    },
    computed: {
      data2() {
        let aa = []
        this.$router.options.routes.map(item => {
          if (!item.hidden) {
            aa.push(item)
          }
        })
        return aa
      }
    },
    methods: {
      onSubmit () {
        this.setCheckedKeys()
      },
      getCheckedKeys () {
        console.log(this.$refs.treeAuth.getCheckedKeys());
      },
      setCheckedKeys() {
        this.$refs.treeAuth.setCheckedKeys(['Auths_justList']);
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
