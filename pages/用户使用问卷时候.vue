
<template>
  <div id="addpaper">
    <div class="qrcodeCon" v-show="qrcodeConSwi">
      <span
        >原本是扫描跳转到“我的问卷”，由于没有部署到线上，目前暂时跳到百度</span
      >
      <div class="qrcode" ref="qrcode"></div>
    </div>

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
                      <i class="el-icon-location"></i>
                      <span>电商模板</span>
                    </template>
                    <el-menu-item-group>
                      <template slot="title">合同模板</template>
                      <el-menu-item index="1-1">签订订单模板</el-menu-item>
                      <el-menu-item index="1-2">签订合作模板</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                      <template slot="title">保密协议模板</template>
                      <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                      <template slot="title">博博3</template>
                      <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu>
                  </el-submenu>
                  <el-menu-item index="3">
                    <i class="el-icon-menu"></i>
                    <span slot="title">学术模板</span>
                  </el-menu-item>
                </el-menu>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="addform">
          <h2>问卷模板</h2>
          <div class="addformCon">
            <el-form
              ref="form"
              :model="form"
              label-position="top"
              label-width="50px"
            >
              <!-- 循环遍历多选框 -->
              <el-form-item
                :label="item.label"
                v-for="(item, index) in form.arrCheckbox"
                :key="index"
                :prop="'arrCheckbox.' + index + ('.type' + index)"
                :rules="{
                  type: 'array',
                  required: true,
                  message: '请至少选择一个',
                  trigger: 'change',
                }"
                :inline-message="true"
              >
                <div>
                  <el-checkbox-group v-model="item['type' + index]">
                    <el-checkbox
                      v-for="(itemChe, indexChe) in item.infoCheckbox"
                      :label="itemChe.label"
                      :name="itemChe.name"
                      :key="indexChe"
                    ></el-checkbox>
                  </el-checkbox-group>
                  <div class="checkboxSwi">
                    <el-button
                      type="info"
                      size="mini"
                      @click="addArrCheckboxBtn(index)"
                      >该节点后添加多选</el-button
                    >
                    <el-button
                      type="danger"
                      size="mini"
                      @click="delArrCheckbox(index)"
                      >删除</el-button
                    >
                  </div>
                </div>
              </el-form-item>

              <el-form-item>
                <div class="formBtn">
                  <el-button
                    type="primary"
                    @click="
                      addArrCheckboxBtn(
                        form.arrCheckbox.length === 0
                          ? 0
                          : form.arrCheckbox.length - 1
                      )
                    "
                    >添加多选</el-button
                  >
                  <el-button type="primary" @click="onSubmit('form')"
                    >保存问卷</el-button
                  >
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 多选框弹出框 -->
    <el-dialog
      title="添加多选"
      :visible.sync="dialogAddCheckbox"
      width="35%"
      :show-close="false"
    >
      <div class="dialogCheckbox">
        <el-form
          ref="dialogCheckbox"
          :model="dialogCheckbox"
          label-width="200px"
          label-position="left"
          :rules="dialogCheckRules"
        >
          <el-form-item label="选项名称" prop="label">
            <el-input v-model="dialogCheckbox.label"></el-input>
          </el-form-item>
          <el-form-item
            :label="'多选框名称' + index"
            v-for="(item, index) in dialogCheckbox.nameArr"
            :key="index"
            :prop="'nameArr.' + index + ('.name' + index)"
            :rules="dialogCheckRules['name' + index]"
          >
            <el-input v-model="item['name' + index]"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialogCheckboxSwi">
        <el-button type="primary" @click="addCheckbox">添加多选框+</el-button>
        <el-button type="primary" @click="delCheckbox">删减多选框-</el-button>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddCheckbox = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogCheckbox_submit('dialogCheckbox')"
          >保 存</el-button
        >
      </span>
    </el-dialog>
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
      // 二维码设置信息
      qrcode: "",
      // 二维码开关
      qrcodeConSwi: false,
      // 当前节点的序号
      checkboxItemIndex: "",
      // 多选框表单
      form: {
        // 多选框数据结构
        arrCheckbox: [
          {
            label: "题目一",
            type0: [],
            infoCheckbox: [
              { label: "美食/餐厅线上活动", name: "type0" },
              { label: "地推活动", name: "type0" },
              { label: "线下主题活动", name: "type0" },
              { label: "单纯品牌曝光", name: "type0" },
            ],
          },
        ],
        // 单选框数据结构（未完成）
        // arrRadio: [],
        // resource: "",
      },
      // 多选框弹出框dialog数据结构
      dialogAddCheckbox: false,
      dialogCheckbox: {
        label: "",
        nameArr: [
          // {
          //   name0: "",
          //   name:"name0"
          // }
        ],
      },
      dialogCheckRules: {
        label: [{ required: true, message: "请输入选项名称", trigger: "blur" }],
        // name0: [
        //   { required: true, message: '请输入多选框名称', trigger: 'blur' },
        // ],
      },
    };
  },
  components: {
    baseMod,
  },
  asyncData() {},
  created() {},
  mounted() {
    // 生成二维码
    var qrcode = new QRCode(this.$refs.qrcode, {
      width: 100,
      height: 100,
    });
    this.qrcode = qrcode;
  },
  computed: {},
  methods: {
    // 左侧导航栏
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    onSubmit(form) {
      console.log("提交表单!");

      this.$refs[form].validate((valid) => {
        if (valid) {
          var _this = this;

          // 提交表单数据
          this.$axios({
            method: "post",
            url: "/process_post",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            data: {
              mydata: this.form,
            },
          })
            .then(function (response) {
              // let form=JSON.stringify(_this.form);
              let form = JSON.stringify(response.data);

              window.localStorage.setItem("form", form);
            })
            .catch(function (error) {
              console.log(error);
            });

          // 生成二维码
          var makeCode = () => {
            var elText = "http://www.baidu.com/";

            this.qrcode.makeCode(elText);
            this.qrcodeConSwi = true;
          };

          makeCode();
        } else {
          return false;
        }
      });
    },

    // 当前节点添加节点------------------
    addArrCheckboxBtn(index) {
      this.dialogAddCheckbox = true;
      // 当前操作的当前节点选项序号
      this.checkboxItemIndex = index;

      // 重置清空当前节点弹出框里的内容
      this.dialogCheckbox.label = "";
      this.dialogCheckbox.nameArr = [];
    },

    // 当前节点删除节点
    delArrCheckbox(index) {
      // 当前操作的当前节点选项序号
      this.checkboxItemIndex = index;
      // 删除当前节点
      this.form.arrCheckbox.splice(index, 1);
    },

    // ----------------多选对话框-----------------
    // 添加多选框checkbox
    addCheckbox() {
      let obj = {};
      let name = `name${this.dialogCheckbox.nameArr.length}`;
      obj.name = name;
      obj[name] = "";

      // 表单数据
      this.dialogCheckbox.nameArr.push(obj);
      // 验证规则
      this.dialogCheckRules[name] = [
        { required: true, message: "请输入多选框名称", trigger: "blur" },
      ];
    },
    // 删减多选框
    delCheckbox() {
      this.dialogCheckbox.nameArr.pop();
      if (this.dialogCheckRules.length > 1) {
        this.dialogCheckRules.pop();
      }
    },
    // 保存多选框
    dialogCheckbox_submit(dialogCheckbox) {
      this.$refs[dialogCheckbox].validate((valid) => {
        if (valid) {
          var index = this.checkboxItemIndex;

          // 这一步复制数据结构,并转化数据格式
          let obj = new Object();
          obj.label = this.dialogCheckbox.label;
          obj["type" + (index + 1)] = [];

          obj.infoCheckbox = this.dialogCheckbox.nameArr.map((val, myindex) => {
            let infoObj = new Object();
            infoObj.label = val["name" + myindex];
            infoObj.name = "type" + (index + 1);
            return infoObj;
          });

          // 在该节点后添加数据
          this.form.arrCheckbox.splice(index + 1, 0, obj);
          // 关闭对话框
          this.dialogAddCheckbox = false;
        } else {
          return false;
        }
      });
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
  text-align: center;
  margin-bottom: 25px;
}

#addpaper .navBarCon {
  background: white;
  height: 100%;
  width: 100%;
}

/*表单*/

#addpaper .addform {
  margin: 0 auto;
  margin-top: 30px;
  box-sizing: border-box;
  text-align: center;
}

#addpaper .addform h2 {
  text-align: center;
  padding-bottom: 25px;
}

#addpaper .addform .addformCon {
  background: white;
  height: 660px;
  overflow: auto;
}

.dialogCheckbox {
  height: 400px;
  overflow: auto;
  padding: 20px;
}

.dialogCheckboxSwi {
  margin-top: 10px;
}

.qrcodeCon {
  width: 300px;
  position: absolute;
  left: 10%;
  top: 20%;
}

.qrcode {
  width: 160px;
  height: 160px;
  margin: 10px auto;
}
</style>