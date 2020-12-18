
<template>
  <div id="addpaper">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="navBar">
          <h2>模板选择</h2>
          <div class="navBarCon">
            <el-row>
              <el-col :span="24">
                <el-menu
                  default-active="1"
                  class="el-menu-vertical-demo"
                  @open="handleOpen"
                  @close="handleClose"
                >
                  <el-menu-item index="1">
                    <i class="el-icon-document"></i>
                    <span slot="title">基础模板</span>
                  </el-menu-item>
                  <el-submenu index="2">
                    <template slot="title">
                      <i class="el-icon-document"></i>
                      <span>电商模板</span>
                    </template>
                    <el-menu-item-group>
                      <template slot="title">合同模板</template>
                      <el-menu-item index="2-1">签订订单模板</el-menu-item>
                      <el-menu-item index="2-2">签订合作模板</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                      <template slot="title">保密协议模板</template>
                      <el-menu-item index="2-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="2-4">
                      <template slot="title">博博3</template>
                      <el-menu-item index="2-4-1">选项1</el-menu-item>
                    </el-submenu>
                  </el-submenu>
                  <el-menu-item index="3">
                    <i class="el-icon-menu"></i>
                    <span slot="title">学术模板</span>
                  </el-menu-item>
                  <el-menu-item index="4">
                    <i class="el-icon-menu"></i>
                    <span slot="title">我的问卷</span>
                  </el-menu-item>
                </el-menu>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <base-mod></base-mod>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import baseMod from "@/components/addPaperMod/baseMod.vue";

export default {
  name: "addpaper",
  transition: "bounce",
  props: [],
  data() {
    return {
      navBarActive:"1"
    };
  },
  components: {
    baseMod,
  },
  asyncData() {},
  created() {},
  mounted() {},
  computed: {},
  methods: {
    // 左侧导航栏
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style scoped>
#addpaper {
  display: inline-block;
  margin-top: 68px;
  width: 100%;
  min-height: 800px;
  background-color: #f5f8fa;
}

#addpaper .navBar {
  width: 380px;
  height: 660px;
  margin-top: 30px;
  float: right;
}

#addpaper .navBar h2 {
  font-size: 20px;
  text-align: center;
  margin-bottom: 25px;
}

#addpaper .navBarCon {
  background: white;
  height: 100%;
  width: 100%;
}


</style>