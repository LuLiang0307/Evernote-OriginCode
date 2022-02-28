<template>
  <div id="notebook-list" class="detail">
    <header>
      <el-button class="btn" type="primary" size="medium" icon="el-icon-plus"
        >新建笔记本</el-button
      >
      <el-divider></el-divider>
    </header>

    <main>
      <h3>笔记本列表（10）</h3>
      <el-card class="layout">
        <div class="book-list">
          <el-row :gutter="20" class="notebook" type="flex" align="middle">
            <el-col :span="6">
              <span class="iconfont icon-notebook"></span>
              笔记本标题1
              <span>3</span>
            </el-col>
            <el-col :span="3" :offset="15">
              <span class="date">3天前</span>
              <span class="action"
                ><el-button
                  type="primary"
                  icon="el-icon-edit"
                  circle
                ></el-button
              ></span>
              <span class="action"
                ><el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                ></el-button
              ></span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="notebook" type="flex" align="middle">
            <el-col :span="6">
              <span class="iconfont icon-notebook"></span>
              笔记本标题2
              <span>1</span>
            </el-col>
            <el-col :span="3" :offset="15">
              <span class="date">5天前</span>
              <span class="action"
                ><el-button
                  type="primary"
                  icon="el-icon-edit"
                  circle
                ></el-button
              ></span>
              <span class="action"
                ><el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                ></el-button
              ></span>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </main>
  </div>
</template>

<script>
import Auth from "@/apis/auth";
export default {
  name: "Login",
  data() {
    return {
      msg: "笔记本列表",
    };
  },
  created() {
    Auth.getInfo().then((res) => {
      if (!res.isLogin) {
        this.$router.push("login");
      }
    });
  },
};
</script>

<style lang="less" scoped>
@import url(../assets/css/notelist.less);
</style>