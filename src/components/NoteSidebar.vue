<template>
  <div class="note-sidebar">

    <el-dropdown class="notebook-title" @command="handleCommand" placement="bottom">
      <span class="el-dropdown-link">
        {{ curBook.title }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="notebook in notebooks" :key="notebook.id" :command="notebook.id">
          {{ notebook.title }}
        </el-dropdown-item>
        <el-dropdown-item command="trash">
          回收站
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-button classs="btn add-note" size="small" @click="onAddNote">添加笔记</el-button>

    <div class="menu">
      <el-table class="menu" :data="notes" :row-style="{ height: 0 + 'px' }" :cell-style="{ padding: 0 + 'px' }" style="width: 100%" :highlight-current-row="true" @row-click="handleRowClick">
        <el-table-column prop="updatedAt" label="更新时间">
          <template slot-scope="scope">
            <div>{{ friendlyDate(scope.row.updatedAt) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
import { friendlyDate } from "@/helpers/utils";
import {mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  created() {
    //获取所有的notebooks
    this.getNotebooks()
      .then(()=>{
        //设置当前curBook
        this.setCurBook({ curBookId: this.$route.query.notebookId })
        //获取所有的notes
        return this.getNotes({notebookId: this.curBook.id})
      }).then(()=>{
        this.setCurNote({ curNoteId: this.$route.query.noteId})
      })
  },
  data() {
    return {};
  },
  computed:{
    ...mapGetters([
      'notebooks',
      'notes',
      'curBook'
    ])
  },  
  methods: {
    friendlyDate,
    ...mapMutations([
      'setCurBook',
      'setCurNote'
    ]),
    ...mapActions([
      'getNotebooks',
      'getNotes',
      'addNote'
    ]),

    handleCommand(notebookId) {
      if (notebookId == "trash") {
        this.$router.push({ path: "/trash" });
      }
      //找到当前的notebook
      this.$store.commit('setCurBook', {curBookId: notebookId})
      //获取所有的notes
      this.getNotes({ notebookId })
    },

    onAddNote(){
      this.addNote({notebookId: this.curBook.id})
    },

    handleRowClick(row) {
      this.$router.push({path: `/note?noteId=${row.id}&notebookId=${this.curBook.id}`});
    }
  },
};
</script>

<style lang="less" scoped>
@import url(../assets/css/note-sidebar.less);
</style>