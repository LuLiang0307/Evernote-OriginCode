<template>
  <div id="note" class="detail">
    <note-sidebar @update:notes="val => notes = val"></note-sidebar>
    <div class="note-detail">
      <div class="note-empty" v-show="!curNote.id">请选择笔记</div>
      <div class="note-detail-ct" v-show="curNote.id">
        <div class="note-bar">
          <span>创建日期：{{ friendlyDate(curNote.createdAt) }}</span>
          <span>更新日期：{{ friendlyDate(curNote.updatedAt) }}</span>
          <span>{{ statusText }}</span>
          <span class="iconfont icon-delete" @click="onDeleteNote"></span>
          <span class="iconfont icon-fullscreen" @click="isShowPreview = !isShowPreview"></span>
        </div>
        <div class="note-title">
          <input type="text" v-model="curNote.title" @input="onUpdateNote" @keydown="statusText = '正在输入...'" placeholder="输入标题"/>
        </div>
        <div class="editor">
          <textarea v-show="!isShowPreview" v-model="curNote.content" @input="onUpdateNote" @keydown="statusText = '正在输入...'" placeholder="输入内容，支持 markdown 语法"></textarea>
          <div class="preview markdown-body" v-html="previewContent" v-show="isShowPreview"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoteSidebar from "@/components/NoteSidebar.vue";
import { friendlyDate } from "@/helpers/utils";
import _ from "lodash";
import MarkdownIt from 'markdown-it'
import {mapMutations, mapGetters, mapActions, mapState} from 'vuex'

let md = new MarkdownIt()

export default {
  components: {
    NoteSidebar,
  },
  data() {
    return {
      statusText: "未改动",
      isShowPreview: false
    };
  },
  created() {
    this.checkLogin({path: '/login'})
  },
  computed:{
    ...mapGetters([
      'notes',
      'curNote'
    ]),
    previewContent(){
      return md.render(this.curNote.content || '')
    }
  },
  methods: {
    friendlyDate,
    ...mapMutations([
      'setCurNote'
    ]),
    ...mapActions([
      'updateNote',
      'deleteNote',
      'checkLogin'
    ]),
    onUpdateNote: _.debounce(function () {
      this.updateNote({ noteId: this.curNote.id , title: this.curNote.title, content: this.curNote.content }).then((data) => {
        this.statusText = "已保存";
      }).catch((data) => {
        this.statusText = "保存失败";
      });
    }, 300),

    onDeleteNote() {
      this.deleteNote({ noteId: this.curNote.id })
        .then((res) => {
          this.$router.replace({ path: '/note' })
        });
    },
    
  },
  beforeRouteUpdate(to, from, next){
      this.setCurNote({curNoteId: to.query.noteId})
      next()
    }
};
</script>

<style lang="less" scoped>
@import url(../assets/css/note-detail.less);
#note {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
}
</style>