<template>
  <div id="note" class="detail"> 
    <NoteSidebar @noteInfo="shownNoteInfo"/>
      <div class="note-detail">
    <div class="note-empty" v-show="!curNote.id">请选择笔记</div>
    <div v-show="curNote.id">
        <div class="note-bar">
          <span>创建日期：{{friendlyDate(curNote.createdAt)}}</span>
          <span>更新日期：{{friendlyDate(curNote.updatedAt)}}</span>
          <span>已保存</span>
          <span class="iconfont icon-delete"></span>
          <span class="iconfont icon-fullscreen"></span>
        </div>
        <div class="note-title">
          <input type="text" :value="curNote.title" placeholder="输入标题">
        </div>
        <div class="editor">
          <textarea v-show='true' :value="curNote.content" placeholder="输入内容，支持 markdown 语法" name="" id="" cols="30" rows="10"></textarea>
          <div class="preview markdown-body" v-show="false"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "@/apis/auth";
import NoteSidebar from '@/components/NoteSidebar.vue';
import {friendlyDate} from '@/helpers/utils';
import Bus from '@/helpers/bus'

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
    }
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