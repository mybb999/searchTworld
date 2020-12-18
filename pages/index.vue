<template>
  <div id="container">
    <div class="warp">
      <div class="header_banner" :style="{ height: header_bannerHei + 'px' }">
        <div class="header_bannerCon">
          <h1 class="banner_title">最简单的问卷网站，最优化的操作模式</h1>
          <el-button class="banner_makeBtn" type="warning" @click="toAddPaper"
            >生成问卷</el-button
          >
        </div>
      </div>
      <div class="sec_banner">
        <div class="sec_content">
          <div class="sec_img">
            <img src="~/assets/images/sec_txt.png" alt="" />
          </div>
          <div class="sec_txt">
            <h2>这里提供最优秀的学术模板</h2>
            <p>
              一步到位，内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍
            </p>
          </div>
        </div>
      </div>
      <div class="thr_banner">
        <div class="thr_content">
          <div class="thr_img">
            <img src="~/assets/images/thr_txt.png" alt="" />
          </div>
          <div class="thr_txt">
            <h2>这里提供最优秀的学术模板</h2>
            <p>
              一步到位，内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import header from "@/component"

export default {
  name: "index",
  props: [],
  data() {
    return {
      header_bannerHei: 0,
    };
  },
  created() {
    
  },  
  mounted() {
    this.header_bannerHeiGet();
  },
  computed: {},
  methods: {
    header_bannerHeiGet() {
      this.header_bannerHei = document.documentElement.clientHeight;
    },
    toAddPaper() {
      window.location.href='/addpaper';
      // this.$router.push({
      //   path: "/addpaper",
      // });
    },
  },
};
</script>

<style scoped>
/* 头 */
#container .warp .header_banner {
  width: 100%;
  height: 800px;
  background: url("~assets/images/banner1.jpg") no-repeat center;
  background-size: cover;
  color: white;
  font-size: 54px;
}

#container .warp .header_banner .header_bannerCon .banner_makeBtn {
  width: 200px;
  height: 50px;
  border-radius: 25px;
  font-size: 25px;
  margin-top: 25px;
}

#container .warp .header_banner .header_bannerCon {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -150%);
  text-align: center;
}

/* 第二板块 */

#container .warp .sec_banner {
  width: 100%;
  background: #fff;
  height: 560px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#container .warp .sec_banner .sec_content {
  width: 800px;
}

#container .warp .sec_banner .sec_img {
  display: inline-block;
  box-sizing: border-box;
}

#container .warp .sec_banner .sec_txt {
  display: inline-block;
  vertical-align: top;
  box-sizing: border-box;
  width: 400px;
}

#container .warp .sec_banner .sec_txt > h2 {
  text-align: center;
}

#container .warp .sec_banner .sec_txt > p {
  margin-top: 10px;
}

/* 第三板块 */

#container .warp .thr_banner {
  width: 100%;
  background: #f5f8fa;
  height: 560px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#container .warp .thr_banner .thr_content {
  width: 800px;
}

#container .warp .thr_banner .thr_img {
  display: inline-block;
  box-sizing: border-box;
}

#container .warp .thr_banner .thr_txt {
  display: inline-block;
  vertical-align: top;
  box-sizing: border-box;
  width: 400px;
}

#container .warp .thr_banner .thr_txt > h2 {
  text-align: center;
}

#container .warp .thr_banner .thr_txt > p {
  margin-top: 10px;
}
</style>
