<template>
  <div id="notebook-list" class="detail">
    <header>
      <el-button class="btn" type="primary" size="medium" icon="el-icon-plus" @click="onCreate"
        >新建笔记本</el-button
      >
      <el-divider></el-divider>
    </header>

    <main>
      <h3>笔记本列表（{{notebooks.length}}）</h3>
      <el-card class="layout">
        <div class="book-list">
          <el-row :gutter="20" class="notebook" type="flex" align="middle" v-for="(notebook,index) in notebooks" :key="index">
            <el-col :span="6">
              <span class="iconfont icon-notebook"></span>
              {{notebook.title}}
              <span>{{notebook.noteCounts}}</span>
            </el-col>
            <el-col :span="3" :offset="15">
              <span class="date">{{friendlyDate(notebook.updatedAt)}}</span>
              <span class="action"><el-button type="primary" icon="el-icon-edit" circle @click="onEdit(notebook)"></el-button></span>
              <span class="action" ><el-button type="danger" icon="el-icon-delete" circle @click="onDelete(notebook.id)"></el-button></span>
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
import {friendlyDate} from '@/helpers/utils';

export default {
  name: "Login",
  data() {
    return {
      msg: "笔记本列表",
      notebooks:{},
    };
  },
  created() {
    Auth.getInfo().then((res) => {
      if (!res.isLogin) {
        this.$router.push("login");
      }
    });
    this.init()
  },
  methods:{
    friendlyDate,
    init(){
      Notebooks.getAll().then(res=>{
        this.notebooks=res.data
      })
    },
    onCreate(){

    },
    onEdit(notebook){
      let title="修改之后的title"
      Notebooks.updateNoteBook(notebook.id,{title}).then(res=>{
        this.$message({
          message: res.msg,
          type: 'success'
        });
        notebook.title = title
      }).catch(e=>{
        this.$message.error(e.msg);
      })
    },
    onDelete(id){
      Notebooks.deleteNoteBook(id).then(res=>{
        this.$message({
          message: res.msg,
          type: 'success'
        });
        this.notebooks.splice(this.notebooks.indexOf(notebook),1)
      }).catch(e=>{
        this.$message.error(e.msg);
      })
    }
  }
};
</script>

<style lang="less" scoped>
@import url(../assets/css/notelist.less);
</style>