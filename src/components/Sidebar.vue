<template>
  <div id="sidebar">
    <el-menu class="icons" background-color="#404040" default-active="2">
      <avatar></avatar>
      <el-menu-item index="1">
        <router-link to="/note" title="笔记"><i class="iconfont icon-note"></i><span> 笔记页</span></router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/notebooks" title="笔记本"><i class="iconfont icon-notebook"></i><span> 笔记本</span></router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link to="/trash" title="回收站"><i class="iconfont icon-trash"></i><span> 回收站</span></router-link>
      </el-menu-item>
      <el-menu-item index="4" class="logout">
        <div title="注销"><i class="iconfont icon-logout" @click="logout"></i><span> 注销</span></div>
      </el-menu-item>
    </el-menu>
    <!-- <div class="icons">
      <router-link to="/note" title="笔记"
        ><i class="iconfont icon-note"></i
      ></router-link>
      <router-link to="/notebooks" title="笔记本"
        ><i class="iconfont icon-notebook"></i
      ></router-link>
      <router-link to="/trash" title="回收站"
        ><i class="iconfont icon-trash"></i
      ></router-link>
      <div class="logout" title="注销">
        <i class="iconfont icon-logout"  @click="logout"></i>
      </div>
    </div> -->
  </div>
</template>

<script>
import avatar from "@/components/Avatar";
import Auth from "@/apis/auth";
import Bus from '@/helpers/bus';

export default {
  components: {
    avatar,
  },
  methods: {
    logout() {
      Auth.logout().then((data) => {
        Bus.$emit('userInfo',{username:"未登录"})
        this.$router.push('login')
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
  .icons{
    height: 100%;
    .el-menu-item{
      a,div{
        color: #fff;
      }
      &.is-active{
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