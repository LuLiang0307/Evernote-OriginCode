<template>
  <div class="note-sidebar">
    <el-dropdown
      class="notebook-title"
      @command="handleCommand"
      placement="bottom"
    >
      <span class="el-dropdown-link">
        {{notebooksTile}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="notebook in notebooks"
          :key="notebook.id"
          :command="notebook.id"
        >
          {{ notebook.title }}
        </el-dropdown-item>
        <el-dropdown-item command="trash">回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-button classs="btn add-note" size="small">添加笔记</el-button>
    <div class="menu">
      <el-table class="menu" :data="notes" :row-style="{height:0+'px'}" :cell-style="{padding:0+'px'}" style="width:100%">
        <el-table-column prop="updatedAt" label="更新时间">
          <template slot-scope="scope">
            <div>
              {{friendlyDate(scope.row.updatedAt)}}
             </div>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题">
            <template slot-scope="scope">
              <router-link  :to="`/note?noteId=${scope.row.id}`">{{scope.row.title}}</router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import Notebooks from '@/apis/notebooks';
import Notes from '@/apis/notes'
import {friendlyDate} from '@/helpers/utils';

export default {
  data() {
    return {
      notebooksTile:'笔记本列表',
      notebooks: {},
      notes: [{
          id:1,
          updatedAt: '2016-05-02',
          title: '王小虎',
        }, {
          id:2,
          updatedAt: '2016-05-04',
          title: '王小虎',
        }],
    };
  },
  created(){
    Notebooks.getAll().then(res=>{
      this.notebooks = res.data
      this.notebooksTile = this.notebooks[0].title
    }).then(()=>{
      Notes.getAll({notebookId: this.notebooks[0].id}).then(res=>{
        this.notes = res.data
      })
    })
  },
  methods: {
    friendlyDate,
    handleCommand(notebookId) {
      if(notebookId!=='trash'){
        Notes.getAll({notebookId})
          .then(res=>{
            this.notes = res.data
          })
      }
      
    },
  },
};
</script>
<style lang="less" scoped>
@import url(../assets/css/note-sidebar.less);
</style>