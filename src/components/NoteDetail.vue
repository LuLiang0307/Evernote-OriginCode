<template>
  <div id="note" class="detail"> 
    <NoteSidebar/>
    <div id="note-detail">
      <h1> noteId: {{ $route.query.noteId }}</h1>
      <h1> notebookId: {{ $route.query.notebookId }}</h1>
    </div>
  </div>
</template>

<script>
import Auth from "@/apis/auth";
import NoteSidebar from '@/components/NoteSidebar.vue';

export default {
  name: "Login",
  components:{
    NoteSidebar
  },
  data() {
    return {
      msg: "笔记详情页",
    };
  },
  created() {
    Auth.getInfo().then((res) => {
      if (!res.isLogin) {
        this.$router.push("login");
      }
    });
  },
};
</script>

<style scoped>
h1 {
  color: blue;
}
.detail{
  display: flex;
}
</style>