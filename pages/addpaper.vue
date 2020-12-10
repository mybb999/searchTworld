
<template>
  <div id="addpaper">
    <div class="qrcodeCon" v-show="qrcodeConSwi">
      <span
        >原本是扫描跳转到“我的问卷”，由于没有部署到线上，目前暂时跳到百度</span
      >
      <div class="qrcode" ref="qrcode"></div>
    </div>

    <el-row :gutter="20">
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    </el-row>

    <div class="addform">
      <el-form ref="form" :model="form" label-width="80px">
        <!-- 循环遍历多选框 -->
        <el-form-item
          :label="item.label"
          v-for="(item, index) in form.arrCheckbox"
          :key="index"
        >
          <div>
            <el-checkbox-group v-model="item['type' + index]">
              <el-checkbox
                :label="itemChe.label"
                :name="itemChe.name"
                v-for="(itemChe, indexChe) in item.infoCheckbox"
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
              <!-- <el-button type="info" size="mini" @click="addCheckbox(index)"
                >该节点添加选项</el-button
              > -->
              <el-button
                type="danger"
                size="mini"
                @click="delArrCheckbox(index)"
                >删除</el-button
              >
            </div>
          </div>
        </el-form-item>

        <!-- 循环遍历单选框 -->
        <!-- <el-form-item label="特殊资源">
          <div>
            <el-radio-group v-model="form.resource">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
            <div class="radioSwi">
              <el-button type="info" size="mini" @click="addArrradio(index)"
                >该节点后添加多选</el-button
              >
              <el-button type="info" size="mini" @click="addradio(index)"
                >该节点添加选项</el-button
              >
              <el-button type="danger" size="mini" @click="delArrradio(index)"
                >删除</el-button
              >
            </div>
          </div>
        </el-form-item> -->
        <el-form-item>
          <!-- <el-button type="primary">添加单选</el-button> -->
          <el-button
            type="primary"
            @click="
              addArrCheckboxBtn(
                form.arrCheckbox.length === 0 ? 0 : form.arrCheckbox.length - 1
              )
            "
            >添加多选</el-button
          >
          <el-button type="primary" @click="onSubmit">保存问卷</el-button>
        </el-form-item>
      </el-form>
    </div>

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
        >
          <el-form-item label="选项名称（可不写）">
            <el-input v-model="dialogCheckbox.label"></el-input>
          </el-form-item>
          <el-form-item
            label="多选框名称（可不写）"
            v-for="(item, index) in dialogCheckbox.name"
            :key="index"
          >
            <el-input v-model="dialogCheckbox.name[index]"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialogCheckboxSwi">
        <el-button type="primary" @click="addCheckbox">添加多选框+</el-button>
        <el-button type="primary" @click="delCheckbox">删减多选框-</el-button>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddCheckbox = false">取 消</el-button>
        <el-button type="primary" @click="dialogCheckbox_submit"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
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
      // 当前多选框所需要添加节点的序号
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
        arrRadio: [],
        resource: "",
      },
      // 多选框弹出框dialog数据结构
      dialogAddCheckbox: false,
      dialogCheckbox: {
        label: "",
        name: [],
      },
    };
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
    onSubmit() {
      console.log("submit!");
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
    },

    // 当前节点添加节点------------------
    addArrCheckboxBtn(index) {
      this.dialogAddCheckbox = true;
      // 当前操作的当前节点选项序号
      this.checkboxItemIndex = index;

      // 重置清空当前节点弹出框里的内容
      this.dialogCheckbox.label = "";
      this.dialogCheckbox.name = [];
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
      this.dialogCheckbox.name.push("");
    },
    // 删减多选框
    delCheckbox() {
      this.dialogCheckbox.name.pop();
    },
    // 保存多选框
    dialogCheckbox_submit() {
      var index = this.checkboxItemIndex;

      // 这一步复制数据结构
      let obj = new Object();
      obj.label = this.dialogCheckbox.label;
      obj["type" + (index + 1)] = [];

      obj.infoCheckbox = this.dialogCheckbox.name.map((val, myindex) => {
        let infoObj = new Object();
        infoObj.label = val;
        infoObj.name = "type" + (index + 1);
        return infoObj;
      });

      // 在该节点后添加数据
      this.form.arrCheckbox.splice(index + 1, 0, obj);
      // 关闭对话框
      this.dialogAddCheckbox = false;
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

#addpaper .addform {
  margin: 0 auto;
  width: 580px;
  box-sizing: border-box;
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