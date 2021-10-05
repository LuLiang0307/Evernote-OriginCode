# vue-evernote-client

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
# Evernote-OriginCode

+ 登录注册页面
  + 路由： /login
  + 对应的组件： @/components/Login.vue , @表示我们的 src 目录
+ 笔记本列表页面
  + 路由： /notebooks
  + 对应的组件： @/components/NotebookList.vue
+ 笔记详情页面
  + 路由: /note/:noteId
  + 对应的组件: @/components/NoteDetail.vue
        其中:notebookId 是具体的笔记本 Id， :noteId 是具体的笔记 Id
+ 回收站笔记详情页面
  + 路由: /trash/:noteId
  + 对应的组件: @/components/TashDetail.vue

