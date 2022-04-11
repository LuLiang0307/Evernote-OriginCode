<template>
  <div class="note-sidebar">
    <el-dropdown
      class="notebook-title"
      @command="handleCommand"
      placement="bottom"
    >
      <span class="el-dropdown-link">
        {{ curBook.title }}<i class="el-icon-arrow-down el-icon--right"></i>
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
      <el-table
        class="menu"
        :data="notes"
        :row-style="{ height: 0 + 'px' }"
        :cell-style="{ padding: 0 + 'px' }"
        style="width: 100%"
        :highlight-current-row="true"
        @row-click="handleRowClick"
      >
        <el-table-column prop="updatedAt" label="更新时间">
          <template slot-scope="scope">
            <div>
              {{ friendlyDate(scope.row.updatedAt) }}
            </div>
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
import Notebooks from "@/apis/notebooks";
import Notes from "@/apis/notes";
import { friendlyDate } from "@/helpers/utils";

export default {
  data() {
    return {
      curBook: {},
      notebooks: {},
      notes: [],
    };
  },
  created() {
    Notebooks.getAll()
      .then((res) => {
        this.notebooks = res.data;
        this.curBook =
          this.notebooks.find(
            (notebook) => notebook.id == this.$route.query.notebookId
          ) ||
          this.notebooks[0] ||
          {};
        console.log(this.curBook);
        return Notes.getAll({ notebookId: this.curBook.id });
      })
      .then((res) => {
        this.notes = res.data;
        console.log("notes", this.notes);
      });
  },
  methods: {
    friendlyDate,
    handleCommand(notebookId) {
      if (notebookId == "trash") {
        this.$router.push({ path: "/trash" });
      }
      this.curBook = this.notebooks.find(
        (notebook) => notebook.id === notebookId
      );
      Notes.getAll({ notebookId }).then((res) => {
        this.notes = res.data;
      });
    },
    handleRowClick(row) {
      this.$router.push({
        path: `/note?noteId=${row.id}&notebookId=${this.curBook.id}`,
      });
      this.$emit("noteInfo", row);
    },
  },
};
</script>
<style lang="less" scoped>
@import url(../assets/css/note-sidebar.less);
</style>