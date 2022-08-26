<template>
  <div id="sidebar">
    <el-menu class="icons" background-color="#404040" :default-active="activeIndex" :router="true">
      <avatar></avatar>
      <el-menu-item index="/note">
        <i class="iconfont icon-note"></i><span> 笔记页</span>
      </el-menu-item>
      <el-menu-item index="/notebooks">
        <i class="iconfont icon-notebook"></i><span> 笔记本</span>
      </el-menu-item>
      <el-menu-item index="/trash">
        <i class="iconfont icon-trash"></i><span> 回收站</span>
      </el-menu-item>
      <el-menu-item index="4" class="logout">
        <div title="注销">
          <i class="iconfont icon-logout" @click="logout"></i><span> 注销</span>
        </div>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import avatar from "@/components/Avatar";
import Auth from "@/apis/auth";
import Bus from "@/helpers/bus";

export default {
  components: {
    avatar,
  },
  data() {
    return {
    };
  },
  computed: {
    activeIndex() {
      let activeIndex = "2";
      return activeIndex;//实现子路由转换也高亮
    },
  },
  methods: {
    logout() {
      Auth.logout().then((data) => {
        Bus.$emit("userInfo", { username: "未登录" });
        this.$router.push("login");
      });
    },
  },
};
</script>

<style lang="less" scoped>
#sidebar {
  //   position: relative;
  width: 140px;
  text-align: center;
  .icons {
    height: 100%;
    .el-menu-item {
        color: #fff;
      &.is-active {
        background-color: #666666 !important;
      }
      &.logout {
        position: absolute;
        bottom: 20px;
        width: 100%;
        text-align: center;
        cursor: pointer;
      }
    }
  }
}

.iconfont {
  color: #fff;
  font-size: 20px;
}
</style>