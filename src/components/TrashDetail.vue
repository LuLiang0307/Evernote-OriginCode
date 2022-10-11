<template>
  <div id="trash" class="detail">
    <div class="note-sidebar">
      <h3 class="notebook-title">回收站</h3>
      <div class="menu">
        <el-table class="menu" :data="trashNotes" border :row-style="{ height: 0 + 'px' }" :cell-style="{ padding: 0 + 'px' }" style="width: 100%" :highlight-current-row="true" @row-click="handleRowClick">
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

    <div class="note-detail">
      <div class="note-detail-ct">
        <div class="note-bar" v-if="curTrashNote">
          <span>创建日期：{{friendlyDate(curTrashNote.createdAt)}}</span>
          <span>|</span>
          <span>更新日期：{{friendlyDate(curTrashNote.updatedAt)}}</span>
          <span>|</span>
          <span>所属笔记本：{{belongTo}}</span>

          <el-button class="btn action" @click="onRevert">恢复</el-button>
          <el-button class="btn action" @click="onDelete">彻底删除</el-button>
        </div>
        <div class="note-title">
          <span>{{curTrashNote.title}}</span>
        </div>
        <div class="editor">
          <div class="preview markdown-body" v-html="compiledMarkdown"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { friendlyDate } from "@/helpers/utils";
import MarkdownIt from 'markdown-it'
import { mapGetters, mapMutations, mapActions} from 'vuex'

let md = new MarkdownIt()

export default {
  data() {
    return {
      belongTo: '我的笔记本'
    };
  },
  created() {
    this.checkLogin({ path: '/login'})
    this.getTrashNotes()
      .then(() => {
        this.setCurTrashNote({ curTrashNoteId: this.$route.query.noteId })
      })
  },
  computed:{
    ...mapGetters([
      'curTrashNote',
      'trashNotes'
    ]),
    compiledMarkdown() {
      return md.render(this.curTrashNote.content || '')
    }
  },
  methods:{
    ...mapMutations([
      'setCurTrashNote'
    ]),
    ...mapActions([
      'checkLogin',
      'getTrashNotes',
      'revertTrashNote',
      'deleteTrashNote'
    ]),
    friendlyDate,
    onRevert(){
      this.revertTrashNote({ noteId: this.curTrashNote.id })
    },
    onDelete(){
      this.deleteTrashNote({ noteId: this.curTrashNote.id })
    },
    handleRowClick(row) {
      this.$router.push({path: `/trash?noteId=${row.id}`});
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.setCurTrashNote({ curTrashNoteId: to.query.noteId })
    next()
  }
};
</script>

<style lang="less">
@import url(../assets/css/note-detail.less);
@import url(../assets/css/note-sidebar.less);

#trash {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;

  .note-bar {
    .action {
      float: right;
      margin-left: 10px;
      padding: 2px 4px;
      font-size: 12px;
    }
  }
}
</style>