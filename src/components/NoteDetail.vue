<template>
  <div id="note" class="detail"> 
    <NoteSidebar @noteInfo="shownNoteInfo"/>
      <div class="note-detail">
    <div class="note-empty" v-show="!curNote.id">请选择笔记</div>
    <div v-show="curNote.id">
        <div class="note-bar">
          <span>创建日期：{{friendlyDate(curNote.createdAt)}}</span>
          <span>更新日期：{{friendlyDate(curNote.updatedAt)}}</span>
          <span>{{statusText}}</span>
          <span class="iconfont icon-delete"></span>
          <span class="iconfont icon-fullscreen"></span>
        </div>
        <div class="note-title">
          <input type="text" v-model="curNote.title" @input="updateNote" @keydown="statusText='正在输入...'" placeholder="输入标题">
        </div>
        <div class="editor">
          <textarea v-show='true' v-model="curNote.content" @input="updateNote" @keydown="statusText='正在输入...'" placeholder="输入内容，支持 markdown 语法" name="" id="" cols="30" rows="30"></textarea>
          <div class="preview markdown-body" v-show="false"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "@/apis/auth";
import Notes from '@/apis/notes'
import NoteSidebar from '@/components/NoteSidebar.vue';
import {friendlyDate} from '@/helpers/utils';
import Bus from '@/helpers/bus'
import _ from 'lodash'

export default {
  name: "Login",
  components:{
    NoteSidebar
  },
  data() {
    return {
      curNote: {
        title:'',
        createdAt:'',
        updatedAt:'',
        content:''
      },
      statusText: '未改动'
    };
  },
  created() {
    Auth.getInfo().then((res) => {
      if (!res.isLogin) {
        this.$router.push("login");
      }
    });
    Bus.$once('noteInfo',val =>{
      this.curNote = val.find(note=> note.id == this.$route.query.noteId) || {}
    })
  },
  methods:{
    friendlyDate,
    shownNoteInfo(data){
      this.curNote = data
    },
    updateNote: _.debounce(function() {
      Notes.updateNote({noteId: this.curNote.id},{title: this.curNote.title,content: this.curNote.content})
      .then(res=>{
        this.statusText = '已保存'
      }).catch((res)=>{
        this.statusText ='保存失败'
      })
    }, 300)
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