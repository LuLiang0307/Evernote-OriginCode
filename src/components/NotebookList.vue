<template>
  <div id="notebook-list" class="detail">
    <header>
      <el-button
        class="btn"
        type="primary"
        size="medium"
        icon="el-icon-plus"
        @click="onCreate"
        >新建笔记本</el-button
      >
      <el-divider></el-divider>
    </header>

    <main>
      <h3>笔记本列表（{{ notebooks.length }}）</h3>
      <el-card class="layout">
        <div class="book-list">
          <el-row
            :gutter="20"
            class="notebook"
            type="flex"
            align="middle"
            v-for="(notebook, index) in notebooks"
            :key="index"
          >
            <el-col :span="6">
              <span class="iconfont icon-notebook"></span>
              {{ notebook.title }}
              <span>{{ notebook.noteCounts }}</span>
            </el-col>
            <el-col :span="3" :offset="15">
              <span class="date">{{ friendlyDate(notebook.updatedAt) }}</span>
              <span class="action"
                ><el-button
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="onEdit(notebook)"
                ></el-button
              ></span>
              <span class="action"
                ><el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="onDelete(notebook.id)"
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
import Notebooks from "@/apis/notebooks";
import { friendlyDate } from "@/helpers/utils";

export default {
  name: "Login",
  data() {
    return {
      msg: "笔记本列表",
      notebooks: {},
    };
  },
  created() {
    Auth.getInfo().then((res) => {
      if (!res.isLogin) {
        this.$router.push("login");
      }
    });
    this.init();
  },
  methods: {
    friendlyDate,
    init() {
      Notebooks.getAll().then((res) => {
        this.notebooks = res.data;
      });
    },
    onCreate() {
      this.$prompt("输入新笔记本标题", "创建笔记本", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: "标题不能为空，且不超过30个字符",
        inputPlaceholder:'标题不能为空，且不超过30个字符'
      })
        .then(({ value }) => {
          return Notebooks.addNoteBook({ title: value });
        })
        .then((res) => {
          this.init();
          // this.notebooks.unshift(res.data)
          this.$message.success( res.msg);
        });
    },
    onEdit(notebook) {
      this.$prompt("输入新笔记本标题", "修改笔记本", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^.{1,30}$/,
        inputValue: notebook.title,
        inputErrorMessage: "标题不能为空，且不超过30个字符",
        inputPlaceholder:'标题不能为空，且不超过30个字符'
      })
        .then(({ value }) => {
          return Notebooks.updateNoteBook(notebook.id, { title: value });
        })
        .then((res) => {
          this.$message.success( res.msg);
          this.init();
        })
    },
    onDelete(id) {
      this.$confirm("确认要删除笔记本吗？", "删除笔记本", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(() => {
        return Notebooks.deleteNoteBook(id);
      })
      .then((res) => {
        this.$message.success(res.msg);
        this.init();
        // this.notebooks.splice(this.notebooks.indexOf(notebook),1)
      })
    },
  },
};
</script>

<style lang="less" scoped>
@import url(../assets/css/notelist.less);
</style>