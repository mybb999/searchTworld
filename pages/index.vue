<template>
  <div id="container">
    <div class="warp">
      <div class="header_banner" :style="{ height:header_bannerHei +'px'}">

      </div>
      <div class="sec_banner">

      </div>
      <div class="thr_banner">

      </div>
    </div>
  </div>
</template>

<script>
// import header from "@/component"

export default {
  name: 'index',
  props:[],  
  data(){
    return{
      header_bannerHei:0
    }
  },
  created(){

  },
  mounted(){
    this.header_bannerHeiGet();
  },
  computed:{
    
  },
  methods:{
    header_bannerHeiGet(){
      this.header_bannerHei=document.documentElement.clientHeight;
    }
  }
  
}
</script>

<style scoped>
#container .warp .header_banner{
  width: 100%;
  background: url("~assets/images/headerBG.jpg") no-repeat center;
  background-size: cover;
}

#container .warp .sec_banner{
  width: 100%;
  background: #fff;
  height: 560px;  
}

#container .warp .thr_banner{
  width: 100%;
  background: #f5f8fa; 
  height: 560px; 
}
</style>
