<template>
  <div id="header" :class="[headerAnimationClassDown, headerAnimationClassUp]">
    <div class="headerWrap">
      <a class="headerLogo" href="/" @click="activeIndex = 0">
        <img src="~/assets/images/header.png" alt="" width="130" height="48" />
      </a>

      <div class="headerCon">
        <ul class="headerList">
          <li
            v-for="(item, index) in activeName"
            :key="index"
            :class="{
              active: activeAddress[index] === $route.path ? true : '',
            }"
            @click="toAddress(activeAddress[index])"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: [],
  data() {
    return {
      activeName: ["生成问卷", "我的问卷","联系我们"],
      activeAddress: ["/addpaper", "/mypaper", "/contact"],
      // activeIndex: 0,
      headerClass: false,
    };
  },
  created() {},
  mounted() {
    window.addEventListener("scroll", this.getScrollHeight(), true);
  },
  computed: {
    // 通过headerClass控制class
    headerAnimationClassDown() {
      return {
        headerAnimationDown: this.headerClass,
      };
    },
    headerAnimationClassUp() {
      return {
        headerAnimationUp: !this.headerClass,
      };
    },
  },
  methods: {
    // 跳转链接
    toAddress(address) {
      window.location.href=address;
      // this.$router.push({
      //   path: address,
      // });
    },
    // 获取滚动条高度
    getScrollHeight() {
      let timer = null;
      let _this = this;

      return function () {
        if (
          document.body.scrollTop === 0 ||
          document.documentElement.scrollTop === 0
        ) {
          _this.handleScroll();
        } else if (!timer) {
          timer = setTimeout(() => {
            console.log(1);
            _this.handleScroll();
            timer = null;
          }, 500);
        }
      };
    },
    // 判断滚动条高度并给header头样式
    handleScroll() {
      // 节流方法
      if (
        document.body.scrollTop > 0 ||
        document.documentElement.scrollTop > 0
      ) {
        this.headerClass = true;
      } else {
        this.headerClass = false;
      }
    },
  },
};
</script>

<style scoped>
#header {
  background-color: transparent;
  position: fixed;
  left: 0;
  top: 0;
  margin: 0 auto;
  width: 100%;
  height: 68px;
  z-index: 10;
}

.headerAnimationDown {
  animation: headerDown 1s forwards;
}

.headerAnimationUp {
  animation: headerUp 1s forwards;
}

.headerList {
  font-size: 20px;
}

@keyframes headerDown {
  from {
    background: transparent;
  }
  to {
    background: #fff;
  }
}

@-webkit-keyframes headerDown {
  from {
    background: transparent;
  }
  to {
    background: #fff;
  }
}

@keyframes headerUp {
  from {
    background: #fff;
  }
  to {
    background: transparent;
  }
}

@-webkit-keyframes headerUp {
  from {
    background: #fff;
  }
  to {
    background: transparent;
  }
}

#header .headerWrap {
  width: 100%;
  height: 100%;
  padding: 10px 200px 0px 200px;
}

#header .headerWrap .headerLogo {
  display: inline-block;
  margin-right: 430px;
  vertical-align: middle;
}

#header .headerWrap .headerCon {
  display: inline-block;
  vertical-align: middle;
}

#header .headerWrap .headerCon .headerList {
  list-style: none;
}

#header .headerWrap .headerCon .headerList > li {
  float: left;
  margin-right: 50px;
  cursor: pointer;
}

#header .headerWrap .headerCon .headerList > li:hover {
  color: #03a9f4;
}

.active {
  color: #ff941a;
}

/* ----------修改组件内部样式------------------- */
.el-menu.el-menu--horizontal {
  border-bottom: transparent;
}

.el-submenu {
  margin: 0 80px 0 0;
}

.el-menu-item {
  margin: 0 80px 0 0;
}
</style>
