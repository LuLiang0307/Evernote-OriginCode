<template>
  <div id="notebook-list" class="detail">
    <header>
      <el-button class="btn" type="primary" size="medium" icon="el-icon-plus" @click="onCreate">新建笔记本</el-button>
      <el-divider></el-divider>
    </header>

    <main>
      <h3>笔记本列表（{{ notebooks.length }}）</h3>
      <el-card class="layout">
        <div class="book-list">
          <el-row :gutter="20" class="notebook" type="flex" align="middle" v-for="(notebook, index) in notebooks" :key="index">
            <el-col :span="6">
              <div @click="getNotes(notebook.id)">
                <span class="iconfont icon-notebook"></span>
                {{ notebook.title }}
                <span>{{ notebook.noteCounts }}</span>
              </div>
            </el-col>
            <el-col :span="4" :offset="15">
              <el-row :gutter="20">
                <el-col :span="12">
                  <span class="date">
                    {{ friendlyDate(notebook.updatedAt) }}
                  </span>
                </el-col>
                <el-col :span="6">
                  <span class="action">
                    <el-button type="primary" icon="el-icon-edit" circle @click="onEdit(notebook)"></el-button>
                  </span>
                </el-col>
                <el-col :span="6">
                  <span class="action">
                    <el-button type="danger" icon="el-icon-delete" circle @click="onDelete(notebook.id)"></el-button>
                  </span>
                </el-col>
              </el-row>             
            </el-col>
          </el-row>
        </div>
      </el-card>
    </main>
  </div>
</template>

<script>
import { friendlyDate } from "@/helpers/utils";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      // notebooks: {},
    };
  },
  created() {
    this.checkLogin({path: '/login'})
    this.getNotebooks()
  },
  computed: {
    ...mapGetters(["notebooks"]),
  },
  methods: {
    friendlyDate,
    ...mapActions([
      'getNotebooks',
      'addNotebook',
      'updateNotebook',
      'deleteNotebook',
      'checkLogin'
    ]),
    getNotes(notebookId){
      this.$router.push('/note?notebookId='+ notebookId)
    },
    onCreate() {
      this.$prompt("输入新笔记本标题", "创建笔记本", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: "标题不能为空，且不超过30个字符",
        inputPlaceholder: "标题不能为空，且不超过30个字符",
        closeOnClickModal: false, //点击遮罩层是否关闭弹窗
      }).then(({ value }) => {
        this.addNotebook({title: value})
        // return Notebooks.addNoteBook({ title: value });
      })
    },
    onEdit(notebook) {
      this.$prompt("输入新笔记本标题", "修改笔记本", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^.{1,30}$/,
        inputValue: notebook.title,
        inputErrorMessage: "标题不能为空，且不超过30个字符",
        inputPlaceholder: "标题不能为空，且不超过30个字符",
        closeOnClickModal: false, //点击遮罩层是否关闭弹窗
      }).then(({ value }) => {
        this.updateNotebook({notebookId: notebook.id, title: value });
      })
    },
    onDelete(id) {
      this.$confirm("确认要删除笔记本吗？", "删除笔记本", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        closeOnClickModal: false, //点击遮罩层是否关闭弹窗
      }).then(() => {
        this.deleteNotebook({notebookId: id});
      })
    },
  },
};
</script>

<style lang="less" scoped>
@import url(../assets/css/notelist.less);
</style>