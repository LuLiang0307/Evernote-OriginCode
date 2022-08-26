<template>
  <div id="note" class="detail">
    <NoteSidebar @noteInfo="shownNoteInfo" />
    <div class="note-detail">
      <div class="note-empty" v-show="!curNote.id">请选择笔记</div>
      <div class="note-detail-ct" v-show="curNote.id">
        <div class="note-bar">
          <span>创建日期：{{ friendlyDate(curNote.createdAt) }}</span>
          <span>更新日期：{{ friendlyDate(curNote.updatedAt) }}</span>
          <span>{{ statusText }}</span>
          <span class="iconfont icon-delete" @click="deleteNote"></span>
          <span class="iconfont icon-fullscreen" @click="isShowPreview = !isShowPreview"></span>
        </div>
        <div class="note-title">
          <input type="text" v-model="curNote.title" @input="updateNote" @keydown="statusText = '正在输入...'" placeholder="输入标题"/>
        </div>
        <div class="editor">
          <textarea v-show="!isShowPreview" v-model="curNote.content" @input="updateNote" @keydown="statusText = '正在输入...'" placeholder="输入内容，支持 markdown 语法"></textarea>
          <div class="preview markdown-body" v-html="mdContent" v-show="isShowPreview"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "@/apis/auth";
import Notes from "@/apis/notes";
import NoteSidebar from "@/components/NoteSidebar.vue";
import { friendlyDate } from "@/helpers/utils";
import Bus from "@/helpers/bus";
import _ from "lodash";
import MarkdownIt from 'markdown-it'

let md = new MarkdownIt()

export default {
  name: "Login",
  components: {
    NoteSidebar,
  },
  data() {
    return {
      notes:[],
      curNote: {
        title: "",
        createdAt: "",
        updatedAt: "",
        content: "",
      },
      statusText: "未改动",
      isShowPreview: false
    };
  },
  created() {
    Auth.getInfo().then((res) => {
      if (!res.isLogin) {
        this.$router.push("login");
      }
    });
    Bus.$once("noteInfo", (val) => {
      this.curNote =
        val.find((note) => note.id == this.$route.query.noteId) || {};
    });
  },
  computed:{
    mdContent(){
     return md.render(this.curNote.content)
    }
  },
  methods: {
    friendlyDate,
    shownNoteInfo(notes) {
      this.notes = notes
      this.curNote = this.notes.find(note => this.$route.query.noteId == note.id);
    },
    updateNote: _.debounce(function () {
      Notes.updateNote(
        { noteId: this.curNote.id },
        { title: this.curNote.title, content: this.curNote.content }
      )
        .then((res) => {
          this.statusText = "已保存";
        })
        .catch((res) => {
          this.statusText = "保存失败";
        });
    }, 300),
    deleteNote() {
      Notes.deleteNote({ noteId: this.curNote.id }).then((res) => {
        this.$message.success({ message: res.msg });
        this.notes.splice(this.notes.indexOf(this.curNote),1)
        this.curNote = {}
        this.$router.push({ path: "/note" });
      });
    },
  },
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