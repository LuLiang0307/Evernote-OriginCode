<template>
  <div id="note-detail">
    <h1> noteId: {{ $route.query.noteId }}</h1>
    <h1> notebookId: {{ $route.query.notebookId }}</h1>
  </div>
</template>

<script>
import Auth from "@/apis/auth";
export default {
  name: "Login",
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
</style>